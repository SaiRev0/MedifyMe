const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  patient: {
    type: Schema.Types.ObjectId,
    ref: "Patient",
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  isAccepted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model("Request", RequestSchema);
