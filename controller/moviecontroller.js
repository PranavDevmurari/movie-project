// const hospital = require('../modle/')
const register = require('../modle/register');
const user_register = require('../modle/user_register');
const nodemailer = require("nodemailer");
const movie = require('../modle/movie');
const shows = require('../modle/show');
const cart = require('../modle/cart');
// const cookies = require('co')

module.exports.add_register = function(req,res){
    return res.render('add_register')
}
module.exports.login = function(req,res){
    return res.render('login')
}

module.exports.add_registerdata = async function(req,res){ 
    let oldregisterdata = await register.findOne({'email':req.body.email});
    if(oldregisterdata){
        console.log("already register data");
        return res.redirect('back');
    }else{
        req.body.role= 'admin'
        let add_registerdata = await register.create(req.body);
        if(add_registerdata){
            console.log("register data inserted");
            return res.redirect('login')
        }
        else{
            console.log("register data not inserted")
            return res.redirect('back')
        }
    }
}

module.exports.sessioncreate = function(req,res){
    return res.redirect('/mainindex');
}

module.exports.forgetpassword = function(req,res){
    return res.render('lostpass')
}

module.exports.changepass = async function(req,res){
    return res.render('changepassword')
};

module.exports.editpassword = async function(req,res){    
    var oldpass = req.user.password;   
    var oldpassword =  req.body.password;
    var npass =  req.body.npass;
    var copass =  req.body.copass;

    if(oldpass == oldpassword){
        if(oldpassword != npass){
            if(npass == copass){
                let registerdata = await register.findByIdAndUpdate(req.user.id,{
                    password : npass })               
                    return res.redirect('/logout')                                                    
                }
            
            else{
                console.log("new password and conform password match")
                return res.redirect('back')            
            }
        }
        else{
            console.log("old password and new password match")
            return res.redirect('back')            
        }
    }
    else{
        console.log("old password not match")
        return res.redirect('back')
    }
}


module.exports.sendemail = async function(req,res){
    let emaildata = await register.findOne({email:req.body.email}) ;
    if(emaildata){
        var otp = Math.ceil(Math.random()*10000);
        console.log(otp);
        console.log(emaildata)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "aa28b6b27b2d4f",
              pass: "5d03114fd3bc0f"
            }
          });
        
          // send mail with defined transport object
          let info =  transport.sendMail({
            from: 'pranavad76@gmail.com', // sender address
            to: emaildata.email, // list of receivers
            subject: "otp", // Subject line
            text: "Hello world?", // plain text body
            html:  `<b>your otp is:${otp}</b>` , // html body
          });
          res.cookie('otp', otp);
          res.cookie('email', emaildata.email);
        //   req.flash('success', ' OTP sending successfully')
          return res.redirect('/checkotp');
          
        //   else{
        //     console.log("email not sent");
        //     return res.redirect('/back')
        //   }
    }
    else{
        console.log("record not found");
            return res.redirect('/forgetpassword')
    }
      
}

module.exports.checkotp = function (req, res) {
    return res.render('checkotp');
}

module.exports.verifyotp = function (req, res) {

    if (req.body.otp == req.cookies.otp) {
        return res.redirect('/generatenewpass');        
    }
    else {
        
        return res.redirect('/checkotp');
    }
}

module.exports.generatenewpass = function (req, res) {
    return res.render('generatenewpass');
}

module.exports.resetpassword = async function (req, res) {
    if (req.body.npassword == req.body.copassword) {
        let email = await req.cookies.email;
        console.log(email)
        let emaildata = await register.findOne({ 'email': email });
        
            // if (err) {
            //     console.log(err);
            //     return res.redirect('back');
            // }
            console.log(emaildata.id)
            if (emaildata) {
                // console.log(record, 'reset');
                let newpass = await register.findByIdAndUpdate(emaildata.id, {password: req.body.npassword });
                    if (newpass) {
                        return res.redirect('/logout');
                    }
                    else {
                        return res.redirect('back');
                    }
                }
        }
        }
        // else{
        // return res.redirect('back');
        //     console.log("password and conform password not match");
        // }

    // else {
    //     req.flash('error', 'Password not match');
    //     return res.redirect('/generatenewpass');
    // }
    
// 
// 
// 
module.exports.mainindex = function(req,res){
    return res.render('index')
}
module.exports.add_movies = function(req,res){
    return res.render('add_movie')
}

module.exports.add_moviedata = async function(req,res){
    req.body.isactive = "true";
  
   
    if(req.file){
                   
        imagepath = await movie.avtarpath+"/"+req.file.filename;
        req.body.avtar = imagepath
        var moviedata = await movie.create(req.body);
    } 
    if(moviedata)           
    {
        console.log("record inserted successfully")
    }
    else{
        console.log("record not inserted")
    }
    return res.redirect('back');

}

module.exports.view_movies= async function(req,res){
    
    let activedata = await movie.find({'isactive' : 1});
    let deactivedata = await movie.find({'isactive' : 0});
        return res.render('view_movies',{
            movieactivedata : activedata,
            moviedeactivedata : deactivedata
        })
}

module.exports.deactive = async function(req,res){
    let movdata = await movie.findByIdAndUpdate(req.params.id, 
        {isactive : 0}
    );

    return res.redirect('back')
}   
module.exports.active = async function(req,res){
    let movdata = await movie.findByIdAndUpdate(req.params.id, 
        {isactive : 1}
    );

    return res.redirect('back')
}   


// user

module.exports.usermainpage = async function(req,res){
    
    let showdata = await shows.find({}).populate('movieid');    
    
    return res.render('frontmain',{      
        'showdetail' : showdata
    })
}

module.exports.userregister = async function(req,res){
    return res.render('add_user_register')
}

module.exports.add_user_registerdata = async function(req,res){
    let oldregisterdata = await user_register.findOne({'email':req.body.email});
    if(oldregisterdata){
        console.log("already register data");
        return res.redirect('back');
    }else{
        req.body.role= 'user'
        let  user_registerdata = await user_register.create(req.body);
        if(user_registerdata){
            console.log("user register data inserted");
            return res.redirect('/userlogin')
        }
        else{
            console.log("user register data not inserted")
            return res.redirect('back')
        }
    }
}


module.exports.userlogin = async function(req,res){
   
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }   


    return res.render('userlogin')
  
}

module.exports.userlogindata = function(req, res) {
   
    return res.redirect('/');
    

};

module.exports.bookticket = async function(req,res){    
    let showdata = await shows.findById(req.params.id).populate('movieid')
    return res.render('bookticket',{
        showdata : showdata
    })
}

module.exports.addtocart = async function (req,res){
    console.log(req.user)
   console.log(req.body)
    let userid = await req.user.id;
    let moviename = await req.body.moviename;
    let seats = await req.body.seat;
    let total = await req.body.total;
    let time = await req.body.time;
    let date = await req.body.date;
    let email = await req.user.email;

    let cartdata = await cart.create({
        'userid' : userid,
        'moviename' : moviename,
        'seats' : seats,
        'total' : total,
        'email' : email,
        'time' : time,
        'date' : date
    })
    if(cartdata){        
        return res.redirect('/');
    }else{        
        return res.redirect('/')
    }
   
}

module.exports.showcart = async function(req,res){
    let userid = await req.params.id;
    console.log(userid)
    let cartdata = await cart.find({'userid':userid});
    if(cartdata){
        return res.render('showcart',{
            cartdata : cartdata
        })
    }else{
        return res.redirect('/')
    }
}

module.exports.deleteitem = async function(req,res){
    let itemid = await req.params.id;
    let cartdata = await cart.findByIdAndDelete(itemid);
    return res.redirect('back')
}

// user forget

module.exports.userforgetpassword = function(req,res){
    return res.render('userlostpass')
}

module.exports.usersendemail = async function(req,res){
    let emaildata = await user_register.findOne({email:req.body.email}) ;
    if(emaildata){
        var otp = Math.ceil(Math.random()*10000);
        console.log(otp);
        console.log(emaildata)
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "aa28b6b27b2d4f",
              pass: "5d03114fd3bc0f"
            }
          });
        
          // send mail with defined transport object
          let info =  transport.sendMail({
            from: 'pranavad76@gmail.com', // sender address
            to: emaildata.email, // list of receivers
            subject: "otp", // Subject line
            text: "Hello world?", // plain text body
            html:  `<b>your otp is:${otp}</b>` , // html body
          });
          res.cookie('otp', otp);
          res.cookie('email', emaildata.email);
        //   req.flash('success', ' OTP sending successfully')
          return res.redirect('/usercheckotp');
          
        //   else{
        //     console.log("email not sent");
        //     return res.redirect('/back')
        //   }
    }
    else{
        console.log("record not found");
            return res.redirect('/userforgetpassword')
    }
      
}

module.exports.usercheckotp = function (req, res) {
    return res.render('usercheckotp');
}

module.exports.userverifyotp = function (req, res) {

    if (req.body.otp == req.cookies.otp) {
        return res.redirect('/usergeneratenewpass');        
    }
    else {
        
        return res.redirect('/checkotp');
    }
}

module.exports.usergeneratenewpass = function (req, res) {
    return res.render('usergeneratenewpass');
}

module.exports.userresetpassword = async function (req, res) {
    if (req.body.npassword == req.body.copassword) {
        let email = await req.cookies.email;
        console.log(email)
        let emaildata = await user_register.findOne({ 'email': email });
        
         
            console.log(emaildata.id)
            if (emaildata) {
           
                let newpass = await user_register.findByIdAndUpdate(emaildata.id, {password: req.body.npassword });
                    if (newpass) {
                        return res.redirect('/userlogout');
                    }
                    else {
                        return res.redirect('back');
                    }
                }
        }
        }