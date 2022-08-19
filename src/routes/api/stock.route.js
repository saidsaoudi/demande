const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const productValidation = require('../../validations/stock.validation');
const productController = require('../../controllers/stock.controller');
const uploadMW = require('../../middlewares/filesUpload');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post('/', auth('getUsers'), validate(productValidation), productController.createProduct);
router.get('/', auth('getUsers'), productController.getProducts);

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

router.post('/upload', auth('getUsers'), upload.single('products_upload'), productController.uploadProducts);
router.post('/update_stock', auth('getUsers'), upload.single('products_update'), productController.updateStock);
module.exports = router;
