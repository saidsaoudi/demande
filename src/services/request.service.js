const httpStatus = require('http-status');
const libre = require('libreoffice-convert');
const ApiError = require('../utils/ApiError');
const { Request } = require('../models');
const { generateDocx, convertToPDF, readDir } = require('../helpers/docx-templater');
libre.convertAsync = require('util').promisify(libre.convert);

/**
 * Create a client request
 * @returns {Promise<Request>}
 * @param requestBody
 */

const createRequest = async (requestBody) => {
  if (Object.keys(requestBody).length === 0) throw new ApiError(httpStatus.BAD_REQUEST, 'Upload all documents');
  return Request.create(requestBody);
};

const getRequests = async () => {
  return Request.find({});
};

const getRequestById = async (id) => {
  return Request.findById(id);
};

const getAuthorization = async (data) => {
  await generateDocx(data);
  return convertToPDF();
};

const acceptRequest = async (id, requestBody) => {
  return Request.findByIdAndUpdate(id, requestBody, { new: true, upsert: true });
};

const refuseRequest = async (id, requestBody) => {
  return Request.findByIdAndUpdate(id, requestBody, { new: true, upsert: true });
};

const getAuthTemplate = async () => {
  return readDir('authorization_template');
};

const getDocTemplate = async () => {
  return readDir('demanded_for_list');
};

module.exports = {
  createRequest,
  getRequests,
  getRequestById,
  getAuthorization,
  acceptRequest,
  refuseRequest,
  getAuthTemplate,
  getDocTemplate,
};
