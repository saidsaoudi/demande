const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    fs.mkdir('./uploads/', () => {
      cb(null, './uploads/');
    });
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}-${file.originalname}`);
  },
});

// const fileFilter = (req, file, cb) => {
//   // reject a file
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const upload = multer({
  storage,
  // limits: {
  //   fileSize: 1024 * 1024 * 5,
  // },
  // fileFilter,
});

module.exports = upload;
