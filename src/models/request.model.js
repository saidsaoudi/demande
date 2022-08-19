const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const statusEnum = {
  pending: 'Pending',
  refused: 'Refused',
  confirmed: 'Confirmed',
};

const requestSchema = mongoose.Schema(
  {
    letter: {
      type: String,
      require: true,
    },
    uploaded_doc: {
      type: String,
      require: true,
    },
    uploaded_fl: {
      type: String,
      require: true,
    },
    demandedFor: [
      {
        type: Object,
      },
    ],
    status: {
      type: statusEnum,
      default: statusEnum.pending,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
);

// add plugin that converts mongoose to json
requestSchema.plugin(toJSON);
requestSchema.plugin(paginate);

const Request = mongoose.model('Requests', requestSchema);
module.exports = Request;
