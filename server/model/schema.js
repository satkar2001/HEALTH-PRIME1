const mongoose = require('mongoose');

const uploadSchema = new mongoose.Schema({
    filename : {
        type : String,
        unique : true,
        required: true
    },
    contentType : {
        type: String,
        required : true
    },
    imageBase64 : {
        type : String,
        required: true
    }
})
let UploadModel = mongoose.model('uploads', uploadSchema);
module.exports = UploadModel