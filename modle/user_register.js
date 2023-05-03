const mongoose = require('mongoose');

const userregisterschema = mongoose.Schema({
    
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    role :{
        type : String,
        required : true
    }
})

const user_register = mongoose.model('user_register',userregisterschema);

module.exports = user_register;