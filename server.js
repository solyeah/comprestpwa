// ExpressJS Setup
const express = require('express');
const app = express();
const PORT = process.env.PORT
var bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Constants
// const PORT = 8000;
// const HOST = "0.0.0.0";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ejs view template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Index page
app.get('/', function (req, res) {
  res.render('index', { title: "Main Page", activate: "index"});
});

// Qeury all cars page
app.get('/api/queryallcars', function (req, res) {
  res.render('query', { title: "Query", activate: "query" });
});

// Create car page
app.get('/api/createcar', function (req, res) {
  res.render('createcar', { title: "Create Car", activate: "createcar"  });
});

// Create car handle
app.post('/api/createcar/', async function (req, res) {
  try {
          var vin = req.body.vin;
          var owner = req.body.owner;
          const data = {
              $class:"org.acme.vehicle.auction.Vehicle",
              vin: vin,
              owner: owner
          }        
      await fetch('http://13.124.148.191:3000/api/Vehicle' ,{
          method :'POST',
          headers : {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
          },
          body:JSON.stringify(data)
      })
      console.log('Transaction has been submitted');
      res.redirect('/');
  } catch (error) {
      console.error(`Failed to submit transaction: ${error}`);
      res.status(400).json(error);
  }   
});

// Change car owner page
app.get('/api/changeowner', function (req, res) {
  res.render('changeowner', { title: "Change Owner", activate: "changeowner" });
}); 

// server start
// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

//heroku start
app.listen(PORT);