const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const multer = require('multer');

const routes = require('./routes');
const config = require('./config');
const auth = require('./routes/auth');


const app = express();
const upload = multer();

mongoose.connect(config.database,{
  useMongoClient: true,
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.array()); 

app.use(morgan('dev'));


const	port = process.env.PORT || 5000;

app.use('/api', routes);
app.use('/auth', auth);

app.listen(port);

console.log('API started on Port:' + port);

