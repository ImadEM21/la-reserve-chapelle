const Resident = require("../models/Resident");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getResident = (req, res) => {
  Resident.findById(req.params.id)
    .exec((error, resident) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ resident });
    });
};

exports.createResident = (req, res) => {
  Resident.findOne({ email: req.body.email })
    .then((resident) => {
      if (resident)
        return res.status(409).json({
          error: `Un compte avec l'adresse mail ${req.body.email} existe déjà`,
        });
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const resident = new Resident({
            ...req.body,
            password: hash,
          });
          resident
            .save()
            .then((resident) => res.status(201).json({ resident }))
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

exports.getResidents = (req, res) => {
  Resident.find()
    .then((residents) => res.status(200).json({ residents }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.updateResident = (req, res) => {
  const resident = {
    ...req.body,
  };
  Resident.findByIdAndUpdate(req.params.id, { ...resident }, { new: true })
    .then((resident) => res.status(200).json({ resident }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.deleteResident = (req, res) => {
  Resident.findByIdAndDelete(req.params.id)
    .then(() => res.status(204))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.login = (req, res) => {
  Resident.findOne({ email: req.body.email })
    .select("+password")
    .then((resident) => {
      if (!resident)
        return res.status(404).json({ error: "Aucun utilisateur trouvé" });
      Resident.newLogin(resident._id, (err, data) => {
        if (err) console.log("last login error", err);
      });
      bcrypt
        .compare(req.body.password, resident.password)
        .then((valid) => {
          if (!valid)
            return res.status(401).json({ error: "Mot de passe incorrect" });
          return res.status(200).json({
            userId: resident._id,
            resident: resident,
            token: jwt.sign({ userId: resident._id }, process.env.TOKEN, {
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
