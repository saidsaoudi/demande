const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Product } = require('../models');

const createProduct = async (productBody) => {
  if (Object.keys(productBody).length === 0) throw new ApiError(httpStatus.BAD_REQUEST, 'Aucun produit à stocker!');
  return Product.create(productBody);
};

const getProducts = async () => {
  return Product.find({});
};

const uploadProducts = async (products) => {
  return Product.insertMany(products);
};

const updateStock = async (declaration_id, products) => {
  const bulkOps = products.map((product) => ({
    updateOne: {
      filter: { declaration_id, code_ean13: product.code_ean13 },
      update: product,
      upsert: true,
    },
  }));

  return Product.bulkWrite(bulkOps);
};

module.exports = {
  createProduct,
  getProducts,
  uploadProducts,
  updateStock,
};
