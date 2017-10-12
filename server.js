

//npm config set proxy http://wwwproxy.hud.ac.uk:3128

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');
const routes = require('./routes');
const asda = require('./routes/asda');

const app = express();

const mongoose   = require('mongoose');
const promise = mongoose.connect('mongodb://localhost/restfulServer', {
  useMongoClient: true,
});
// mongoose.connect('mongodb://localhost/restfulServer');



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const	port = process.env.PORT || 5000;

// ROUTES

// REGISTER OUR ROUTES

app.use('/api', routes);
app.use('/asda', asda);


app.listen(port);

console.log('API started on Port:' + port);




// app.get('/scrape', function(req, res){
//
//    url = 'http://www.imdb.com/title/tt1229340/';
//
//    request(url, function(error, response, html){
//
//
//       if(!error){
//
//            var $ = cheerio.load(html);
//
//            var title, release, rating;
//            var json = { title : "", release : "", rating : ""};
//       }
//    })
//
// })
