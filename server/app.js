const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const fs = require('fs');

const apiPrefix = "api";

const app = express();

mongoose
  .connect('mongodb://localhost/chapelle', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    if (!fs.existsSync('./images')) {
      fs.mkdirSync('./images');
      console.log('Folder images has been successfully created');
    }
    if (!fs.existsSync('./files')) {
      fs.mkdirSync('./files');
      console.log('Folder files has been successfully created');
    }
    console.log('Connexion à MongoDB réussie');
  })
  .catch((error) => console.error('Connxion à MongoDB échouée: ', error));

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/files', express.static(path.join(__dirname, 'files')));

app.use(`/${apiPrefix}/tests`, testRouter);

module.exports = app;