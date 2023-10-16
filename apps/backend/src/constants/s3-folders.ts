const s3Folders = {
  imagesFolder: 'images/',
  userAvatarFolder: (userId: string) => `${s3Folders.imagesFolder}${userId}/avatar/`,
};

export default s3Folders;
