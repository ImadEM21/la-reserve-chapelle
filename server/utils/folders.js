const fs = require("fs");

exports.createImagesAndFilesFolders = () => {
  if (!fs.existsSync("./images")) {
    fs.mkdirSync("./images");
    console.log("Folder images has been successfully created");
  }
  if (!fs.existsSync("./files")) {
    fs.mkdirSync("./files");
    console.log("Folder files has been successfully created");
  }
};
