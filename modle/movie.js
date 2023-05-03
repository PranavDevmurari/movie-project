const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { stringify } = require('querystring');

const avtarpath = ('/images')

const movieschema = mongoose.Schema({
    mname : {
        type : String,
        required : true
    },
    rating : {
        type : String,
        required : true
    },
    cast : {
        type : String,
        required : true
    },
    isactive :{
        type : Boolean
    },
    avtar :{
      type : String,
      required : true
    },
    description: {
      type : String,
      required : true
    },
    movietype: {
      type : String,
      required : true
    }

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,'..',avtarpath))
    },
    filename: function (req, file, cb) {      
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  
  movieschema.statics.uploadedavtar = multer({storage : storage}).single('avtar');
  movieschema.statics.avtarpath = avtarpath;




const movies = mongoose.model('movies',movieschema);

module.exports = movies