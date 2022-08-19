const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const outStockSchema = mongoose.Schema(
  {
    code_ean13: { type: String, require: true, unique: true },
    speciality: { type: String },
    DCI: { type: String },
    dosage: { type: String },
    EPI: { type: String },
    available_stock: { type: Number },
    stock_shortage: { type: String },
    breakup_date: { type: Date },
    availability_date: { type: Date },
    solution: { type: String },
    declaration: {},
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

outStockSchema.plugin(toJSON);
outStockSchema.plugin(paginate);

const OutStock = mongoose.model('Out_of_stock', outStockSchema);
module.exports = OutStock;
