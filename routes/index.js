var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

//root route
router.get("/" , function(req,res){
    res.render("landing")
})

//auth routes
//register form
router.get("/register", function(req,res){
    res.render("register")
})

//handel sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
           req.flash("success", "Welcome to YelpCamp " + user.username);
           res.redirect("/campgrounds"); 
        });
    });
});

//show log in form
router.get("/login", function(req,res){
    res.render("login")
})
//handel login logic
router.post("/login", passport.authenticate("local", {
    successRedirect: "/campgrounds",
    failureRedirect: "/login"
    }), function(req,res){
});

//log out
router.get("/logout", function(req,res){
    req.logOut();
    req.flash("success", "Logged Out Succesfully");
    res.redirect("/campgrounds")
});


module.exports = router;