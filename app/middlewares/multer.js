const { status } = require('http-status');
const multer = require('multer');
const path = require('path');

// set memory storage configuration
const storage = multer.memoryStorage();

// filter images
const imageFileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  const mimetype = allowedTypes.test(file.mimt);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    const error = new Error('Only image files (jpeg, jpg, png ) are allowed.');
    error.statusCode = status.UNSUPPORTED_MEDIA_TYPE;
    cb(error, false);
  }
};

const upload = multer({
  storage,
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

module.exports = upload;
