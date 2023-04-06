const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VisitSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctorName: {
    type: String,
  },
  date: {
    type: String,
  },
  isLatest: {
    type: Boolean,
    required: true,
    default: false,
  },
  doctorComments: {
    type: String,
  },
  patientComments: {
    type: String,
  },
  fileUrl: {
    type: [String],
  },
});

module.exports = mongoose.model("Visit", VisitSchema);
