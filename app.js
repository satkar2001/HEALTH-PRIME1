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
app.listen(8080, () => console.log(`Server is stated on http://localhost:8080`));





//foodnutri
