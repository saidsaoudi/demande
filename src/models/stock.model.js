const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const stockSchema = mongoose.Schema({
  uuid: { type: String, require: true, unique: true },
  code_ean13: { type: String, require: true, unique: true, dropDups: true },
  speciality: { type: String },
  dosage: { type: String },
  year_consumption: { type: String },
  stock: { type: Number },
  pfht: { type: String },
  tva: { type: String },
  EPI: { type: String },
  lab_commit: { type: String },
  remarque: { type: String },
  situation_date: { type: Date },
  ao_prevu: { type: String },
  quantity_total: { type: Number },
  date_of_declaration: { type: Date, default: new Date() },
  declaration_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Declaration',
  },
});

stockSchema.plugin(toJSON);
stockSchema.plugin(paginate);

const Product = mongoose.model('Stock_declaration', stockSchema);
module.exports = Product;
