const UploadModel = require('../model/schema');
const fs = require('fs');
const express = require('express')
var fetch =require('node-fetch');
const path=require('path');
const app = express();
const request = require('request');


exports.home = async (req, res) => {
    const all_images = await UploadModel.find()
    res.render('main', { images : all_images });
}
exports.exercise=(req,res)=>{
    res.render('exercise');
}
exports.history=(req,res)=>{
    res.render('history');
}
// exports.pp=(req,res)=>{
//     res.sendFile(path.join( __dirname, '.../public', 'index.html' ));
// }



exports.uploads = (req, res , next) => {
    const files = req.files;

    if(!files){
        const error = new Error('Please choose files');
        error.httpStatusCode = 400;
        return next(error)
    }

    // convert images into base64 encoding
    let imgArray = files.map((file) => {
        let img = fs.readFileSync(file.path)

        return encode_image = img.toString('base64');
    })

    let result = imgArray.map((src, index) => {

        // create object to store data in the collection
        let finalImg = {
            filename : files[index].originalname,
            contentType : files[index].mimetype,
            imageBase64 : src
        }


        let newUpload = new UploadModel(finalImg);

        return newUpload
                .save()
                .then(() => {
                    return { msg : `${files[index].originalname} Uploaded Successfully...!`}
                    })
                .catch(error =>{
                    if(error){
                        if(error.name === 'MongoError' && error.code === 11000){
                            return Promise.reject({ error : `Duplicate ${files[index].originalname}. File Already exists! `});
                        }
                        return Promise.reject({ error : error.message || `Cannot Upload ${files[index].originalname} Something Missing!`})
                    }
                })
    });
    Promise.all(result)
    .then( msg => {
        res.redirect('/')
    })
    .catch(err =>{
        res.json(err);
    })

}




// let query;
// exports.food = (req, res) => {
//      query = req.body.foodname;
//      fet(query);
// }
// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };
//   function fet(query){
//   fetch(`https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&pageSize=2&api_key=0fcGu5OEOHTQHf6hOehD7UVEoOhET91iZ2anMXKB`, requestOptions)
//     .then(response => response.json())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
//   }
//     //let url =`https://api.nal.usda.gov/fdc/v1/foods/search?api_key=xhKg1syJUuRTQVfIISCWgAp2IT2OIaDySf44aSfM&query=${query}`//&dataType="Survey%20(FNDDS)"&pagesize=${pagesize}






