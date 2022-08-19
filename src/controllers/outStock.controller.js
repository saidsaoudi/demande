const httpStatus = require('http-status');
const XLSX = require('xlsx');
const { uuid } = require('uuidv4');
const catchAsync = require('../utils/catchAsync');
const { outStockService } = require('../services');

const get_all_out_of_stock = catchAsync(async (req, res) => {
  const products = await outStockService.get_all_out_of_stock();
  res.status(httpStatus.OK).send({ message: 'Les produits en rupture de stock!', data: products });
});

const upload_all_out_of_stock = catchAsync(async (req, res) => {
  const products_file = XLSX.readFile(req.file.path);
  const sheet_name_list = products_file.SheetNames;
  const data = XLSX.utils.sheet_to_json(products_file.Sheets[sheet_name_list[0]]);
  const products = {
    code_ean13: '',
    speciality: '',
    DCI: '',
    dosage: '',
    EPI: '',
    available_stock: '',
    stock_shortage: '',
    breakup_date: '',
    availability_date: '',
    solution: '',
  };
  const body = [];
  data.map((product) => {
    let i = 0;
    for (const [key, value] of Object.entries(products)) {
      products[key] = product[Object.keys(product)[i]];
      i += 1;
    }

    products.uuid = uuid();
    body.push(products);
    return body;
  });

  await outStockService.upload_all_out_of_stock(body);
  res.status(httpStatus.CREATED).send({ message: 'Tous les produits en rupture de stock enregistrés!', data: body });
});

module.exports = {
  get_all_out_of_stock,
  upload_all_out_of_stock,
};
