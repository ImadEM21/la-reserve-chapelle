const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slugify = require("slugify");

const bookSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    image: { type: String, required: false },
    releaseDate: { type: Date, required: false },
    description: { type: String, required: true },
    author: { type: mongoose.Types.ObjectId, ref: "Author", required: false },
    categories: [{ type: mongoose.Types.ObjectId, ref: "Category" }],
    quantity: { type: Number, required: true, default: 1 },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

bookSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title + Date.now(), {
      lower: true,
      strict: true,
      locale: "fr",
    });
  }
  next();
});
bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model("Book", bookSchema);
