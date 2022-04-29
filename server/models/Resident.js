const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const residentSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: false },
    lastLogin: { type: Date, default: Date.now },
    birthDate: { type: Date, required: false },
    address: { type: String, required: false },
    zipCode: { type: Number, required: false },
    city: { type: String, required: false },
    country: { type: String, required: false },
    activated: { type: Boolean, required: true, default: true },
  },
  {
    timestamps: true,
  }
);

residentSchema.plugin(uniqueValidator);
residentSchema.statics.newLogin = function login(id, callback) {
  return this.findByIdAndUpdate(
    id,
    { $set: { lastLogin: Date.now() } },
    { new: true },
    callback
  );
};

module.exports = mongoose.model("Resident", residentSchema);
