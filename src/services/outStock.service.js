const { OutStock } = require('../models');

const get_all_out_of_stock = async () => {
  return OutStock.find({});
};

const upload_all_out_of_stock = async (products) => {
  return OutStock.insertMany(products);
};

module.exports = {
  get_all_out_of_stock,
  upload_all_out_of_stock,
};
