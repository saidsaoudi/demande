const httpStatus = require('http-status');
const XLSX = require('xlsx');
const { uuid } = require('uuidv4');
const catchAsync = require('../utils/catchAsync');
const productService = require('../services/stock.service');
const { declarationService } = require('../services');

const createProduct = catchAsync(async (req, res) => {
  const request = { ...req.body };
  request.uuid = uuid();
  const dec_data = {
    uuid: uuid(),
    name: `Declaration de ${request.date_of_declaration.toLocaleDateString('fr-FR')}`,
    date_of_declaration: request.date_of_declaration,
    createdBy: req.user._id,
  };
  const declaration = await declarationService.createDeclaration(dec_data);
  request.declaration_id = declaration.id;
  const product = await productService.createProduct(request);
  res.status(httpStatus.CREATED).send({ message: 'Product created!', data: product });
});

const getProducts = catchAsync(async (req, res) => {
  const products = await productService.getProducts();
  res.status(httpStatus.OK).send({ message: 'All products listed!', data: products });
});

const uploadProducts = catchAsync(async (req, res) => {
  const products_file = XLSX.readFile(req.file.path);
  const sheet_name_list = products_file.SheetNames;
  const data = XLSX.utils.sheet_to_json(products_file.Sheets[sheet_name_list[0]]);
  const dec_data = {
    name: `Declaration de ${new Date().toLocaleString('fr-FR')}`,
    date_of_declaration: new Date(),
    createdBy: req.user._id,
    number_of_products: data.length,
  };
  const declaration = await declarationService.createDeclaration(dec_data);
  const data_prod = [];
  data.forEach((product) => {
    const products = {
      code_ean13: '',
      speciality: '',
      dosage: '',
      year_consumption: '',
      stock: 0,
      pfht: '',
      tva: '',
      EPI: '',
      lab_commit: ' ',
      remarque: '',
      situation_date: '',
      ao_prevu: '',
      quantity_total: 0,
    };

    let i = 0;
    for (const key of Object.keys(products)) {
      products[key] = product[Object.keys(product)[i]];
      i += 1;
    }
    products.uuid = uuid();
    products.declaration_id = declaration.id;
    data_prod.push(products);
  });
  await productService.uploadProducts(data_prod);
  res.status(httpStatus.CREATED).send({ message: 'All products saved!', data: data_prod });
});

const updateStock = catchAsync(async (req, res) => {
  const products_file = XLSX.readFile(req.file.path);
  const sheet_name_list = products_file.SheetNames;
  const data = XLSX.utils.sheet_to_json(products_file.Sheets[sheet_name_list[0]]);
  const data_prod = [];
  data.forEach((product) => {
    const products = {
      code_ean13: '',
      speciality: '',
      dosage: '',
      year_consumption: '',
      stock: 0,
      pfht: '',
      tva: '',
      EPI: '',
      lab_commit: ' ',
      remarque: '',
      situation_date: '',
      ao_prevu: '',
      quantity_total: 0,
    };

    let i = 0;
    for (const key of Object.keys(products)) {
      products[key] = product[Object.keys(product)[i]];
      i += 1;
    }
    data_prod.push(products);
  });

  await productService.updateStock(req.body.declaration_id, data_prod);
  res.status(httpStatus.CREATED).send({ message: 'Stock updated!', data: data_prod });
});

module.exports = {
  createProduct,
  getProducts,
  uploadProducts,
  updateStock,
};
