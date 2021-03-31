var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

//Index Route
router.get("/" , function(req,res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    })
});

//Create - Create new campground to DB
router.post("/", isLoggedIn, function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, image: image, description: desc, author: author};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
    
});

//New - Show from to create new route
router.get("/new", isLoggedIn, function(req,res){
    res.render("campgrounds/new_camp");
});

//Show - Shows more info about new campground
router.get("/:id" , function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })
})

//middleware
//is logged in
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;