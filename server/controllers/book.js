const Book = require("../models/Book");
const fs = require("fs");

exports.getBooks = (req, res) => {
  Book.find()
    .populate("categories")
    .populate("author")
    .exec((error, books) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ books });
    });
};

exports.getBook = (req, res) => {
  Book.findById(req.params.id)
    .populate("categories")
    .populate("author")
    .exec((error, book) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ book });
    });
};

exports.createBook = (req, res) => {
  const book = new Book({
    ...req.body,
    categories: JSON.parse(req.body.categories),
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  book
    .save()
    .then((book) => res.status(201).json({ book }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.updateBook = (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      if (req.file) {
        const filename = book.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          console.log(
            `Image of book ID ${book._id} has been removed. Filename: ${filename}`
          );
        });
      }
      const newBook = {
        ...req.body,
      };
      if (req.file) {
        newBook.image = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      Book.findByIdAndUpdate(req.params.id, { ...newBook }, { new: true })
        .then((book) => res.status(200).json({ book }))
        .catch((error) =>
          res.status(500).json({ error: error.stack.split("\n")[0] })
        );
    })
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.deleteBook = (req, res) => {
  Book.findById(req.params.id)
    .then((book) => {
      const filename = book.image.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Book.findByIdAndDelete(req.params.id)
          .then(() => res.status(204))
          .catch((error) =>
            res.status(500).json({ error: error.stack.split("\n")[0] })
          );
      });
    })
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};
