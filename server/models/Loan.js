const mongoose = require("mongoose");

const loanSchema = mongoose.Schema(
  {
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    status: {
      type: String,
      required: true,
      enum: ["onloan", "canceled", "ended", "onlate"],
    },
    description: { type: String, required: true },
    book: { type: mongoose.Types.ObjectId, ref: "Book", required: true },
    customer: [
      { type: mongoose.Types.ObjectId, ref: "Resident", required: true },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", loanSchema);
