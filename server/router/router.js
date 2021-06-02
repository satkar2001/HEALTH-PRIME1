const route = require('express').Router()
const controller = require('../controller/controller');
const store = require('../middleware/multer')
const express = require('express')
var FormData = require('form-data');
const fs = require('fs');
const app=express();
var upload=require('express-fileupload');
const hbs = require('express-handlebars');


// routes
route.get('/', controller.home);
route.post('/uploadmultiple', store.array('images', 12) , controller.uploads);

route.get('/exercise',controller.exercise);

 route.get('/history',controller.history);
//  route.get('/pp',controller.pp);

//  route.post('/food',controller.food);


// route.post('/uploadfood',controller.uploadfood);

module.exports = route;
