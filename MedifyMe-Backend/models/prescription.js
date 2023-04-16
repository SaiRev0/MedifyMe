const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrescriptionSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  medications: {
    type: String,
  },
  prescriptionComments: {
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
      },
    },
  ],
});

module.exports = mongoose.model("Prescription", PrescriptionSchema);
