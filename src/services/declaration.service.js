const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Declaration } = require('../models');

const createDeclaration = async (body) => {
  if (Object.keys(body).length === 0) throw new ApiError(httpStatus.BAD_REQUEST, 'La déclaration est vide!');
  return Declaration.create(body);
};

const getDeclarations = async () => {
  return Declaration.find({});
};

const getById = async (id) => {
  return Declaration.findById(id);
};

module.exports = {
  createDeclaration,
  getDeclarations,
  getById,
};
