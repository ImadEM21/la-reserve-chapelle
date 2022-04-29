const Loan = require("../models/Loan");

exports.getLoans = (req, res) => {
  Loan.find()
    .populate("book")
    .populate("customer")
    .exec((error, loans) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ loans });
    });
};

exports.getLoan = (req, res) => {
  Loan.findById(req.params.id)
    .populate("book")
    .populate("customer")
    .exec((error, loan) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ loan });
    });
};

exports.getResidentLoans = (req, res) => {
  Loan.find({ customer: req.params.id })
    .populate("book")
    .exec((error, loans) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ loans });
    });
};
