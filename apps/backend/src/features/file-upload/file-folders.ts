const fileFolders = {
  imagesFolder: 'images/',
  userAvatarFolder: (userId: string) => `${fileFolders.imagesFolder}${userId}/avatar/`,
};

export default fileFolders;
