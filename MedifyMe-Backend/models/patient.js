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
  prescriptions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Prescription",
    },
  ],
  tests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Test",
    },
  ],
  requests: [
    {
      type: Schema.Types.ObjectId,
      ref: "Request",
    },
  ],
  doctors: [
    {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
    },
  ],
});

module.exports = mongoose.model("Patient", PatientSchema);
