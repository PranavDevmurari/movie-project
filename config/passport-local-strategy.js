const { use } = require('passport');
const passport = require('passport');
const Admindata = require('../modle/register');

const passportlocal = require('passport-local').Strategy;

console.log("Passport Is Running");

passport.use('admin',new passportlocal({
    usernameField : 'email'
}, async function(email,password,done){
    
    let admindata = await Admindata.findOne({email : email})
    if(admindata && admindata.password == password)
    {
        return done(null,admindata);
    }
    else{
        console.log("Invaliad Details !!");
        return done(null,false);
    }

}))


passport.checkauthentication = function(req,res,next){
    
    if(req.isAuthenticated()){
        if(req.user.role = "admin"){
            return next();
        }
        return res.redirect('/login');
    }
    return res.redirect('/login');   
   
}

passport.setauthenticationuser =function(req,res,next){    
    if(req.isAuthenticated()){
        if(req.user.role = "admin"){
            res.locals.user = req.user;
        }
    }
    next();  
}

module.exports = passport;