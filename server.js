// ExpressJS Setup
const express = require('express');
const app = express();

const PORT = process.env.PORT;

var bodyParser = require('body-parser');
const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

// Constants
const PORT = 8000;
const HOST = "0.0.0.0";

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// ejs view template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Index page
app.get('/', function (req, res) {
  res.render('index', { title: "Main Page", activate: "index"});
});

// Viecle GET page
app.get('/viecleget', function (req, res) {
  res.render('query', { title: "Query", activate: "query" });
});

// Viecle POST page
app.get('/viechlepost', function (req, res) {
  res.render('viechlepost', { title: "Viecle POST", activate: "viechlepost"  });
});

// Viecle POST handle
app.post('/viechlepost/', async function (req, res) {
  try {
          var vin = req.body.vin;
          var owner = req.body.owner;
          const data = {
              $class:"org.acme.vehicle.auction.Vehicle",
              vin: vin,
              owner: owner
          }        
      await fetch('http://localhost:3001/api/Vehicle' ,{
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

// Member POST  page
app.get('/memberpost', function (req, res) {
  res.render('memberpost', { title: "Member POST", activate: "memberpost" });
}); 

// Member POST handle
app.post('/memberpost/', async function (req, res) {
  try {
          var balance = req.body.balance;
          var email = req.body.email;
          var firstname = req.body.firstname;
          var lastname = req.body.lastname;
          const data = {
              $class:"org.acme.vehicle.auction.Member",
              balance: balance,
              email: email,
              firstname: firstname,
              lastname: lastname
          }        
      await fetch('http://localhost:3001/api/Member' ,{
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

// // server start
// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

app.listen(PORT)
