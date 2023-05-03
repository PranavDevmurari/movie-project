const mongoose = require('mongoose');

const cartschema = mongoose.Schema({
    
    userid : {
        type :mongoose.Schema.Types.ObjectId,
        ref :'user_registers',
        required : true
    },
    seats : {
        type : String,
        required : true
    },
    total:{
        type : String,
        required:true
    },
    email:{
        type : String,
        required:true
    },
    moviename: {
        type :String,
        required : true
    },
    time:{
        type :String,
        required : true
    },
    date:{
        type :String,
        required : true
    }
})

const cart = mongoose.model('cart',cartschema);

module.exports = cart;