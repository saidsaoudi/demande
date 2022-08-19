const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { declarationService } = require('../services');

const getDeclarations = catchAsync(async (req, res) => {
  const declarations = await declarationService.getDeclarations();
  res.status(httpStatus.OK).send({ message: 'All declarations listed!', data: declarations });
});

const getById = catchAsync(async (req, res) => {
  const declaration = await declarationService.getById(req.params.id);
  res.status(httpStatus.OK).send({ message: 'Declaration found!', data: declaration });
});

module.exports = {
  getDeclarations,
  getById,
};
