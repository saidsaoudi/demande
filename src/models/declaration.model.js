const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const declarationSchema = mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    date_of_declaration: { type: Date, default: new Date() },
    number_of_products: { type: Number, default: 0 },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

declarationSchema.plugin(toJSON);
declarationSchema.plugin(paginate);

const Declaration = mongoose.model('Declaration', declarationSchema);
module.exports = Declaration;
