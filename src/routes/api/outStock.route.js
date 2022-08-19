const express = require('express');
const multer = require('multer');
const auth = require('../../middlewares/auth');
const { outStockController } = require('../../controllers');

const router = express.Router();

router.get('/', auth('getUsers'), outStockController.get_all_out_of_stock);

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${file.originalname}`);
  },
});
const upload = multer({
  storage,
});

router.post('/upload', auth('getUsers'), upload.single('products_upload'), outStockController.upload_all_out_of_stock);
module.exports = router;
