const express = require('express');
const passport = require('passport')

const route = express.Router();
const showcontroller = require('../controller/showcontroller')
route.get('/add_show',passport.checkauthentication,showcontroller.add_show);
route.post('/add_showdata',passport.checkauthentication,showcontroller.add_showdata);
route.get('/view_show',passport.checkauthentication,showcontroller.view_show);

route.get('/deleteshow/:id',passport.checkauthentication,showcontroller.deleteshow)



module.exports = route;