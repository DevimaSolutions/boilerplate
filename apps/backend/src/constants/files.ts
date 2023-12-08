const mimeTypes = {
  png: 'image/png',
  jpeg: 'image/jpeg',
  jpg: 'image/jpg',
  webp: 'image/webp',
  gif: 'image/gif',
};

export const singleImageUploadLimits = {
  fileSize: 1024 * 1024 * 5, // 5 MB
  files: 1,
};

const fileConstants = {
  mimeTypes,
  imageMimeTypes: [mimeTypes.jpeg, mimeTypes.jpg, mimeTypes.png, mimeTypes.webp, mimeTypes.gif],
  singleImageUploadLimits,
};

export default fileConstants;
