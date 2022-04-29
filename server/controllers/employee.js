const Employee = require("../models/Employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.getEmployee = (req, res) => {
  Employee.findById(req.params.id)
    .populate("createdBy")
    .exec((error, employee) => {
      if (error)
        return res.status(500).json({ error: error.stack.split("\n")[0] });
      return res.status(200).json({ employee });
    });
};

exports.createEmployee = (req, res) => {
  Employee.findOne({ email: req.body.email })
    .then((employee) => {
      if (employee)
        return res.status(409).json({
          error: `Un compte avec l'adresse mail ${req.body.email} existe déjà`,
        });
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          const employee = new Employee({
            ...req.body,
            password: hash,
          });
          employee
            .save()
            .then((employee) => res.status(201).json({ employee }))
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

exports.getEmployees = (req, res) => {
  Employee.find()
    .then((employees) => res.status(200).json({ employees }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.updateAEmployee = (req, res) => {
  const employee = {
    ...req.body,
  };
  Employee.findByIdAndUpdate(req.params.id, { ...employee }, { new: true })
    .then((employee) => res.status(200).json({ employee }))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.deleteEmployee = (req, res) => {
  Employee.findByIdAndDelete(req.params.id)
    .then(() => res.status(204))
    .catch((error) =>
      res.status(500).json({ error: error.stack.split("\n")[0] })
    );
};

exports.login = (req, res) => {
  Employee.findOne({ email: req.body.email })
    .select("+password")
    .then((employee) => {
      if (!employee)
        return res.status(404).json({ error: "Aucun utilisateur trouvé" });
      Employee.newLogin(employee._id, (err, data) => {
        if (err) console.log("last login error", err);
      });
      bcrypt
        .compare(req.body.password, employee.password)
        .then((valid) => {
          if (!valid)
            return res.status(401).json({ error: "Mot de passe incorrect" });
          return res.status(200).json({
            userId: employee._id,
            employee: employee,
            token: jwt.sign({ userId: employee._id }, process.env.TOKEN, {
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
