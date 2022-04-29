const Category = require("../models/Category");

exports.getCategories = (req, res) => {
  Category.find()
    .exec((error, categories) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ categories });
    });
};

exports.getCategory = (req, res) => {
  Category.findById(req.params.id)
    .exec((error, category) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ category });
    });
};

exports.createCategory = (req, res) => {
  const category = new Category({
    ...req.body,
  });
  category
    .save()
    .then((category) => res.status(201).json(category))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.updateCategory = (req, res) => {
  Category.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true })
    .then((category) => res.status(200).json(category))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.deleteCategory = (req, res) => {
  Category.findByIdAndDelete(req.params.id)
    .then(() => res.status(204))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};
