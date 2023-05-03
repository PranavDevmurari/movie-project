const { findByIdAndDelete } = require('../modle/movie');
const movies = require('../modle/movie');
const show = require('../modle/show');
const fs = require('fs')

module.exports.add_show = async function(req,res){
    let moviedata = await movies.find({});
    return res.render('add_show',{
        'movie' : moviedata
    })
}

module.exports.add_showdata = async function(req,res){
    req.body.isactive = true;
    let showdata = await show.create(req.body);
    if(showdata){
        console.log("showdata inserted");
        return res.redirect('back')
    }
    else{
        console.log("showdata not inserted");
        return res.redirect('back')
    }
}

module.exports.view_show= async function(req,res){
    
    let showdata = await show.find({}).populate('movieid');    
        return res.render('view_show',{
           showdata : showdata
        })
}

module.exports.deleteshow = async function(req,res){
    let showdata = await show.findByIdAndDelete(req.params.id);    
    return res.redirect('back');
}

