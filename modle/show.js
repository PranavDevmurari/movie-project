const mongoose = require('mongoose');

const showschema = mongoose.Schema({
    movieid:{
        type :mongoose.Schema.Types.ObjectId,
        ref :'movies',
        required : true
    },
    
    place:{
        type: String,
        required:true
    },
    date :{
        type : String,
        required : true
    },
    time:{
        type: String,
        required : true
    },
    ticketprice :{
        type: String,
        required : true
    },
   
    
});

const shows = mongoose.model('shows',showschema);

module.exports = shows;