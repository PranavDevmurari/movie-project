const { findByIdAndDelete } = require('../modle/movie');
const movies = require('../modle/movie');
const cart = require('../modle/cart');
const fs = require('fs')

module.exports.view_users = async function(req,res){
    let cartdata = await cart.find({});
    return res.render('cartbackend',{
        'cartdata' : cartdata
    })
}



