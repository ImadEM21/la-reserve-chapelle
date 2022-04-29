const Admin = require("../models/Admin");
const Employee = require("../models/Employee");
const Resident = require("../models/Resident");
const bcrypt = require("bcrypt");

exports.createFirstAdmin = () => {
  Admin.findOne({ email: "admin@chapelle.fr" })
    .then((admin) => {
      if (admin) return;
      bcrypt
        .hash("password", 10)
        .then((hash) => {
          const newAdmin = new Admin({
            firstName: "Admin",
            lastName: "Admin",
            email: "admin@chapelle.fr",
            password: hash,
          });
          newAdmin
            .save()
            .then(() => console.log("Default admin created"))
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

exports.createFirstResident = () => {
  Resident.findOne({ email: "resident@chapelle.fr" })
    .then((resident) => {
      if (resident) return;
      bcrypt
        .hash("password", 10)
        .then((hash) => {
          const newResident = new Resident({
            firstName: "Resident",
            lastName: "Resident",
            email: "resident@chapelle.fr",
            password: hash,
          });
          newResident
            .save()
            .then(() => console.log("Default resident created"))
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};

exports.createFirstEmployee = () => {
  Employee.findOne({ email: "employee@chapelle.fr" })
    .then((employee) => {
      if (employee) return;
      bcrypt
        .hash("password", 10)
        .then((hash) => {
          const newEmployee = new Employee({
            firstName: "Resident",
            lastName: "Resident",
            email: "employee@chapelle.fr",
            password: hash,
          });
          newEmployee
            .save()
            .then(() => console.log("Default employee created"))
            .catch((error) => console.error(error));
        })
        .catch((error) => console.error(error));
    })
    .catch((error) => console.error(error));
};
