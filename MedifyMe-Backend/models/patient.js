const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
  token: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: null,
  },
  age: {
    type: String,
    default: null,
  },
  photo: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  height: { type: Number, default: null },
  weight: { type: Number, default: null },
  allergies: {
    type: String,
    default: null,
  },
  otherConditions: {
    type: String,
    default: null,
  },
  medications: {
    type: String,
    default: null,
  },
  overview: {
    type: String,
    default: null,
  },
  visits: [
    {
      type: Schema.Types.ObjectId,
      ref: "Visit",
    },
  ],
  prescription: [
    {
      type: String,
      default: null,
    },
  ],
  test: [
    {
      type: String,
      default: null,
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
