const Author = require("../models/Author");
const fs = require("fs");

exports.getAuthors = (req, res) => {
  Author.find()
    .populate("categories")
    .exec((error, authors) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ authors });
    });
};

exports.getAuthor = (req, res) => {
  Author.findById(req.params.id)
    .populate("categories")
    .exec((error, author) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ author });
    });
};

exports.createAuthor = (req, res) => {
  const author = new Author({
    ...req.body,
    categories: JSON.parse(req.body.categories),
    avatar: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  });
  author
    .save()
    .then((author) => res.status(201).json(author))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.updateAuthor = (req, res) => {
  Author.findById(req.params.id)
    .then((author) => {
      if (req.file) {
        const filename = author.avatar.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          console.log(
            `Avatar of author ID ${author._id} has been removed. Filename: ${filename}`
          );
        });
      }
      const newAuthor = {
        ...req.body,
      };
      if (req.file) {
        newAuthor.avatar = `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`;
      }
      Author.findByIdAndUpdate(req.params.id, { ...newAuthor }, { new: true })
        .then((author) => res.status(200).json(author))
        .catch((error) =>
          res.status(500).json({ error: error.stack.split("\n")[0] })
        );
    })
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.deleteAuthor = (req, res) => {
  Author.findById(req.params.id)
    .then((author) => {
      const filename = author.avatar.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        Author.findByIdAndDelete(req.params.id)
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
