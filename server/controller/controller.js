const UploadModel = require('../model/schema');
const fs = require('fs');
const express = require('express')
var fetch =require('node-fetch');
const path=require('path');
const app = express();
const request = require('request');
const multer = require('multer')

// Upload User
function readUser(cb) {
    var user = fs.readFile(path.join(__dirname, '..', '..', '/public', 'user.json'), (err, fileContent) => {
        if(err){
            cb(err)
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

// get data
function readData(cb) {
    var user = fs.readFile(path.join(__dirname, '..', '..', '/public', 'db.json'), (err, fileContent) => {
        if(err){
            cb(err)
        } else {
            cb(JSON.parse(fileContent))
        }
    })
}

app.use(multer({dest: './uploads/'}).single('image'))

exports.login = async (req, res) => {
    res.render('login')
}

var prot;

exports.postLogin = async (req, res, next) => {
    
    
    readData(data => {
        //console.log(data.n)

        var usr = req.body.usrname.trim()
        if(req.body.pwd == data[usr]){
            console.log("yes")
            
            var obj = {
                "usrname": usr,
                "pwd": req.body.pwd
            }
            
            fs.writeFile(path.join(__dirname, '..', '..', '/public', 'user.json'), JSON.stringify(obj), (err) => {if(err) console.log(err)})
            
            readUser(usr => {
                prot = user
            })

            res.redirect('/')
        }
        else {
            console.log("No")
        }
        
    })
    
}

exports.user = prot 

exports.home = async (req, res) => {
    const all_images = await UploadModel.find()
    res.render('main');
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

    var up ='./uploads/';
    var pic;
    var fil = fs.readdirSync(up);
    for(var i in fil) {
    if(path.extname(fil[i]) === ".jpg") {
        pic=fil[i];
        break;
    }
    else{
    console.log('there is no .jpg file in the folder');
    }
    }
    const pict=up+pic;

    


    var formdata = new FormData();
    formdata.append('image',fs.createReadStream(pict));

    

    var requestOptions = {
    method: 'POST',
    headers: {
        'Authorization': ' project f65ba9b5e48979377e5f52e7cf86fb7448a8029f'
            } ,
    body: formdata,
    redirect: 'follow'
    };

    app.use(upload());
    var file;
    var filenm;
    app.post('/random', (req, res) => {
         if(req.files){
          file =req.files.image
           filenm=file.name;
          file.mv('./uploads/'+filenm,function(err){
              if(err)
              {
                  res.send(err);
                  res.render('random',{name:null})
              }
              else{
                    fetch("https://api.logmeal.es/v2/recognition/complete/v0.9", requestOptions)
                     .then(response => response.json())
                     .then(result =>{
                         console.log(result);
                        const name=result.recognition_results[0].name;
                         res.render('random',{name});
                    })
              }
          })
         }
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






