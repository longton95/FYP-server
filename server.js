//npm config set proxy http://wwwproxy.hud.ac.uk:3128

const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const morgan = require('morgan');

const config = require('./config');
const User = require('./models/user');
const routes = require('./routes');

const app = express();

// mongoose.connect(config.database);
app.set('superSecret', config.secret); // secret variable


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(morgan('dev'));


const	port = process.env.PORT || 5000;

app.use('/api', routes);

app.listen(port);

console.log('API started on Port:' + port);



// const DB = mongoose.connect('mongodb://localhost/restfulServer', {
//   useMongoClient: true,
// });

