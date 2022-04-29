const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const helmet = require("helmet");

const adminRoute = require("./routes/admin");
const employeeRoute = require("./routes/employee");
const residentRoute = require("./routes/resident");
const authorRoute = require("./routes/author");
const bookRoute = require("./routes/book");
const categoryBook = require("./routes/category");

const foldersUtil = require("./utils/folders");
const accountsUtil = require("./utils/accounts");

const apiPrefix = "api";

const app = express();

mongoose
  .connect("mongodb://localhost/chapelle", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à MongoDB réussie");
    foldersUtil.createImagesAndFilesFolders();
    accountsUtil.createFirstAdmin();
    accountsUtil.createFirstEmployee();
    accountsUtil.createFirstResident();
  })
  .catch((error) => console.error("Connxion à MongoDB échouée: ", error));

app.use(helmet());
app.use(cors());
app.use((req, res, next) => {
  res.header("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/files", express.static(path.join(__dirname, "files")));

app.use(`/${apiPrefix}/admins`, adminRoute);
app.use(`/${apiPrefix}/employees`, employeeRoute);
app.use(`/${apiPrefix}/residents`, residentRoute);
app.use(`/${apiPrefix}/books`, bookRoute);
app.use(`/${apiPrefix}/authors`, authorRoute);
app.use(`/${apiPrefix}/categories`, categoryBook);

module.exports = app;
