const { use } = require('passport');
const passport = require('passport');
const Admindata = require('../modle/register');
const userdata = require('../modle/user_register');

const passportlocal = require('passport-local').Strategy;

console.log("Passport Is Running");

passport.use('user',new passportlocal({
    usernameField : 'email'
}, async function(email,password,done){
    
    let userdatas = await userdata.findOne({email : email});
    // console.log(userdatas)
    if(userdatas && userdatas.password == password)
    {
        return done(null,userdatas);
    }
    else{
        console.log("Invaliad Details !!");
        return done(null,false);
    }

}))

passport.serializeUser(function(user,done){
    return done(null,user.id);
})




passport.deserializeUser(async function(id,done){
    var data = await Admindata.findById(id);
    var data1 = await userdata.findById(id);
    if(data1?.role == 'user'){
        return done(null,data1);
    }
    else if(data?.role == 'admin'){
        return done(null,data);
    }
    else{
        return done(null,false);
    }
    })




module.exports = passport;