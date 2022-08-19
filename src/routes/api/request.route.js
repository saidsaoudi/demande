const express = require('express');
const multer = require('multer');
const validate = require('../../middlewares/validate');
const requestValidation = require('../../validations/request.validation');
const requestController = require('../../controllers/request.controller');
const uploadMW = require('../../middlewares/filesUpload');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.post(
  '/',
  auth('getUsers'),
  validate(requestValidation),
  uploadMW.fields([{ name: 'letter' }, { name: 'uploaded_doc' }, { name: 'uploaded_fl' }]),
  requestController.createRequest
);

router.get('/', auth('getUsers'), requestController.getRequests);
router.get('/:id', auth('getUsers'), requestController.getRequestById);
router.post('/authorized/:id/', auth('getUsers'), requestController.getAuthorization);
router.put('/accept/:id/', auth('getUsers'), requestController.acceptRequest);
router.put('/refuse/:id/', auth('getUsers'), requestController.refuseRequest);

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

router.post(
  '/upload-auth-template',
  auth('getUsers'),
  upload.single('authorization_template'),
  requestController.uploadAuthTemplate
);

router.post(
  '/upload-doc-template',
  auth('getUsers'),
  upload.single('demanded_for_list'),
  requestController.uploadDocTemplate
);

router.get('/download/auth_template', requestController.downloadAuthTemplate);
router.get('/download/doc_template', requestController.downloadDocTemplate);

module.exports = router;
