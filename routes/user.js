const express = require('express');
const route = express.Router();
const usercontroller = require('../controller/usercontroller')
const passport = require('passport');
const movie = require('../modle/movie');

route.get('/view_users',passport.checkauthentication,usercontroller.view_users)



module.exports= route;
