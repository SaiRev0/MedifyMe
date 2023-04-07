const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  token: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
    default: null,
  },
  patients: [
    {
      type: Schema.Types.ObjectId,
      ref: "Patient",
    },
  ],
  visits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Visit",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
});

module.exports = mongoose.model("Doctor", DoctorSchema);
