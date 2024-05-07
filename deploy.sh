#!/bin/bash

# This script is triggered by Github actions when changes are pulled to production server

# The script will terminate after the first line that fails
set -e

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

CODE_FOLDER="/opt/boilerplate/source-code"
BUILD_FOLDER="/opt/boilerplate/builds"
NUMBER_OF_RELEASES_TO_KEEP="4" # keep latest 3 releases

# Fetch new version of the app
echo "Jump to app folder"
cd $CODE_FOLDER

echo "Update app from Git"
git pull
git status
GIT_COMMIT="$(git rev-parse HEAD)"

# Create new release and copy code to it's folder
mkdir -p $BUILD_FOLDER
cd $BUILD_FOLDER
{
  LATEST_BUILD_NUMBER_FOR_CURRENT_COMMIT="$(find $BUILD_FOLDER -type d -maxdepth 1 -name "release-$GIT_COMMIT-*" | sort -rn | head -1 | grep -Eo "[0-9]+$")"
} || {
  # if find command failed (nothing found) set ID to 0
  LATEST_BUILD_NUMBER_FOR_CURRENT_COMMIT=0
}
NEW_BUILD_NUMBER="$(echo "${LATEST_BUILD_NUMBER_FOR_CURRENT_COMMIT:=0}+1" | bc)"
NEW_BUILD_ID="$GIT_COMMIT-$NEW_BUILD_NUMBER"

echo "Creating build (ID:$NEW_BUILD_ID)"

mkdir -p $BUILD_FOLDER/release-$NEW_BUILD_ID

echo "Copying source code"
cp -a $CODE_FOLDER/ $BUILD_FOLDER/release-$NEW_BUILD_ID/

cd $BUILD_FOLDER/release-$NEW_BUILD_ID

# Build new version of the app
echo "Install app dependencies"
yarn

echo "Build your app"
yarn build

echo "Apply pending migrations"
yarn migration:run

echo "Create symlink to release (ID:$NEW_BUILD_ID)"

rm -f $BUILD_FOLDER/release-current 2> /dev/null
ln -sf $BUILD_FOLDER/release-$NEW_BUILD_ID/ $BUILD_FOLDER/release-current

cd $BUILD_FOLDER/release-current

echo "Reload start PM2 instances with 0 downtime"
pm2 reload ecosystem.config.js

echo "Save PM2 state"
pm2 save

echo "Show PM2 state"
pm2 ls

echo "Remove outdated releases:"
# print releases that will be deleted
cd $BUILD_FOLDER
echo ls -dt */ | grep -Eo "release-[a-z0-9]+-[0-9]+/" | tail -n +$NUMBER_OF_RELEASES_TO_KEEP

ls -dt */ | grep -Eo "release-[a-z0-9]+-[0-9]+/" | tail -n +$NUMBER_OF_RELEASES_TO_KEEP | xargs rm -rf