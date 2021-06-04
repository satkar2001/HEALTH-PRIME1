const bodyParser = require('body-parser');
const express = require('express')
const app = express();
var fetch =require('node-fetch');
const path = require('path');
const controller = require('./server/controller/controller');
app.use(express.json());
const fs = require('fs');
var upload=require('express-fileupload');
const mongoose = require('mongoose');
const route = require('express').Router()
var FormData = require('form-data');



const uploadRouter = require('./server/router/upload');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

//add the manifest
app.get("/manifest.json", function(req, res){
  //send the correct headers
  res.header("Content-Type", "text/cache-manifest");
  //console.log(path.join(__dirname,"manifest.json"));
  //send the manifest file
  //to be parsed bt express
  res.sendFile(path.join(__dirname,"manifest.json"));
});

//add the service worker
app.get("/sw.js", function(req, res){
  //send the correct headers
  res.header("Content-Type", "text/javascript");
  
  res.sendFile(path.join(__dirname,"sw.js"));
});

// adding the main.css
app.get("/main.css", function(req, res){
  //send the correct headers
  res.header("Content-Type", "text/css");
  
  res.sendFile(path.join(__dirname, 'public', 'css',"main.css"));
});

// serving static file
//ok
app.use(express.static(path.join(__dirname, 'public')));

// connect mongodb database
require('./server/database/database')();
// setup view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))

// calling routes
app.use('/', require('./server/router/router'));

app.get('/nutriinfo',function( req, res ) {
    res.sendFile(path.join( __dirname, 'public', 'pp.html' ));
  });
app.get('/calorieintake',function( req, res ) {
    res.sendFile(path.join( __dirname, 'public', 'cr.html' ));
  });
app.listen(8080, () => console.log(`Server is stated on http://localhost:8080`));


//foodnutri
