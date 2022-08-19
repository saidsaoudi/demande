const Joi = require('joi');

const createRequest = {
  body: Joi.object().keys({
    letter: Joi.string().required(),
    uploaded_doc: Joi.string().required(),
    uploaded_fl: Joi.string().required(),
  }),
};

module.exports = {
  createRequest,
};
