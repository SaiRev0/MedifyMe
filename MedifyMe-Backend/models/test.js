const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  name: {
    type: String,
  },
  testComments: {
    type: String,
  },
  date: {
    type: String,
  },
  files: [
    {
      url: {
        type: String,
        required: true,
      },
      ocr: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Test", TestSchema);
