const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getAdmin = (req, res) => {
  Admin.findById(req.params.id)
    .populate("createdBy")
    .exec((error, admin) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ admin });
    });
};

exports.createAdmin = (req, res) => {
  Admin.findOne({ email: req.body.email })
    .then((admin) => {
      if (admin)
        return res.status(409).json({
          error: `Un compte avec l'adresse mail ${req.body.email} existe déjà`,
        });
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const admin = new Admin({
            ...req.body,
            password: hash,
          });
          admin
            .save()
            .then((admin) => res.status(201).json({ admin }))
            .catch((error) =>
              res.status(500).json({ error: error.stack.split("\n")[0] })
            );
        })
        .catch((error) =>
          res.status(500).json({ error: error.stack.split("\n")[0] })
        );
    })
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.getAdmins = (req, res) => {
  Admin.find()
    .then((admins) => res.status(200).json({ admins }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.updateAdmin = (req, res) => {
  const admin = {
    ...req.body,
  };
  Admin.findByIdAndUpdate(req.params.id, { ...admin }, { new: true })
    .then((admin) => res.status(200).json({ admin }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.deleteAdmin = (req, res) => {
  Admin.findByIdAndDelete(req.params.id)
    .then(() => res.status(204))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.login = (req, res) => {
  Admin.findOne({ email: req.body.email })
    .select("+password")
    .then((admin) => {
      if (!admin)
        return res.status(404).json({ error: "Aucun utilisateur trouvé" });
      Admin.newLogin(admin._id, (err, data) => {
        if (err) console.log("last login error", err);
      });
      bcrypt
        .compare(req.body.password, admin.password)
        .then((valid) => {
          if (!valid)
            return res.status(401).json({ error: "Mot de passe incorrect" });
          return res.status(200).json({
            userId: admin._id,
            admin: admin,
            token: jwt.sign({ userId: admin._id }, process.env.TOKEN, {
              expiresIn: "72h",
            }),
          });
        })
        .catch((error) =>
          res.status(500).json({ error: error.stack.split("\n")[0] })
        );
    })
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};
