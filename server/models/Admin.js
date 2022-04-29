const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: false },
    lastLogin: { type: Date, default: Date.now },
    createdBy: { type: mongoose.Types.ObjectId, required: false, ref: 'Admin' },
    activated: {type: Boolean, required: true, default: true}
  },
  {
    timestamps: true,
  }
);

adminSchema.plugin(uniqueValidator);
adminSchema.statics.newLogin = function login(id, callback) {
  return this.findByIdAndUpdate(
    id,
    { $set: { lastLogin: Date.now() } },
    { new: true },
    callback
  );
};

module.exports = mongoose.model("Admin", adminSchema);
