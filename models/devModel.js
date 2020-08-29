const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DevSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    level: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Dev = mongoose.model('devs', DevSchema);

module.exports = Dev;
