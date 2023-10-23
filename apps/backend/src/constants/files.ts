const mimeTypes = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  webp: 'image/webp',
  gif: 'image/gif',
};

const fileConstants = {
  mimeTypes,
  fileSize: 1024 * 1024 * 8, // 8 MB
  imageMimeTypes: [mimeTypes.jpeg, mimeTypes.jpg, mimeTypes.png, mimeTypes.webp, mimeTypes.gif],
};

export default fileConstants;
