const express = require('express');
const route = express.Router();
const moviecontroller = require('../controller/moviecontroller')
const passport = require('passport');
const movie = require('../modle/movie');


route.get('/add_register',moviecontroller.add_register)
route.get('/login',moviecontroller.login)
route.post('/add_registerdata',moviecontroller.add_registerdata);
route.get('/changepass',passport.checkauthentication,moviecontroller.changepass);
route.post('/editpassword',passport.checkauthentication,moviecontroller.editpassword);


route.get('/logout', function(req,res,next){
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/login')
    })
})

route.get('/forgetpassword',moviecontroller.forgetpassword);

route.post('/sendemail',moviecontroller.sendemail);

route.get('/checkotp',moviecontroller.checkotp);
route.post('/verifyotp', moviecontroller.verifyotp);
route.get('/generatenewpass',moviecontroller.generatenewpass)
route.post('/resetpassword', moviecontroller.resetpassword);


route.post('/sessioncreate',passport.authenticate('admin', {failureRedirect : '/login'}),moviecontroller.sessioncreate);
// 


route.get('/backendpanel',passport.checkauthentication,moviecontroller.mainindex)
route.get('/mainindex',passport.checkauthentication,moviecontroller.mainindex)
route.get('/add_movies',passport.checkauthentication,moviecontroller.add_movies)

route.post('/add_moviedata',passport.checkauthentication,movie.uploadedavtar,moviecontroller.add_moviedata)

route.get('/view_movies',passport.checkauthentication,moviecontroller.view_movies);

route.get('/deactive/:id',passport.checkauthentication,moviecontroller.deactive);
route.get('/active/:id',passport.checkauthentication,moviecontroller.active);

// user



route.get('/',moviecontroller.usermainpage);

route.get('/userregister',moviecontroller.userregister)

route.post('/add_user_registerdata',moviecontroller.add_user_registerdata)

route.get('/userlogin',moviecontroller.userlogin)

route.post("/userlogindata",passport.authenticate('user', {failureRedirect : '/userlogin'}) , moviecontroller.userlogindata);

route.get("/bookticket/:id",passport.checkauthentication,moviecontroller.bookticket);

route.get('/userlogout', function(req,res,next){
    req.logOut(function(err){
        if(err){
            return next(err);
        }
        return res.redirect('/')
    })
})

route.post('/addtocart',passport.checkauthentication,moviecontroller.addtocart)

route.get('/showcart/:id',passport.checkauthentication,moviecontroller.showcart);

route.get('/deleteitem/:id',passport.checkauthentication,moviecontroller.deleteitem);

route.use('/showdetail',require('./showroutes.js'))


// user forget

route.get('/userforgetpassword',moviecontroller.userforgetpassword);

route.post('/usersendemail',moviecontroller.usersendemail);

route.get('/usercheckotp',moviecontroller.usercheckotp);
route.post('/userverifyotp', moviecontroller.userverifyotp);
route.get('/usergeneratenewpass',moviecontroller.usergeneratenewpass)
route.post('/userresetpassword', moviecontroller.userresetpassword);


route.use('/users',require('./user'))


module.exports= route;
