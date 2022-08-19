const Joi = require('joi');

const createProduct = {
  body: Joi.object().keys({
    code_ean13: Joi.string().required(),
  }),
};

module.exports = {
  createProduct,
};
