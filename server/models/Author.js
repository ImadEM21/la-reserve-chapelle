const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slugify = require("slugify");

const authorSchema = mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pseudo: { type: String, required: false },
    categories: [
      { type: mongoose.Types.ObjectId, required: false, ref: "Category" },
    ],
    avatar: { type: String, required: false },
    resume: { type: String, required: false },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

authorSchema.pre("validate", function (next) {
  if ((this.firstName && this.lastName) || this.pseudo) {
    this.slug = slugify(
      this.pseudo
        ? this.pseudo + Date.now()
        : `${this.firstName}-${this.lastName} ${Date.now()}`,
      {
        lower: true,
        strict: true,
        locale: "fr",
      }
    );
  }
  next();
});
authorSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Author", authorSchema);
