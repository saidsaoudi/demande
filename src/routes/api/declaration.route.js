const express = require('express');
const auth = require('../../middlewares/auth');
const { declarationController } = require('../../controllers');

const router = express.Router();

router.get('/', auth('getUsers'), declarationController.getDeclarations);
router.get('/:id', auth('getUsers'), declarationController.getById);

module.exports = router;
