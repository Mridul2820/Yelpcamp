var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Campground = require("./models/campground");
var seedDB = require("./seeds");
var Comment = require("./models/comment");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")
app.use(express.static(__dirname + "/public"))
seedDB();


// Campground.create(
//     {
//         name: "Roof of the World",
//         image: "https://t-ec.bstatic.com/images/hotel/max1024x768/647/64748006.jpg",
//         description: "The Roof of the World or Top of the World is a metaphoric description of the high region in the world, also known as High Asia. The term usually refers to the mountainous interior of Asia, i.e. the Himalayas"
//     }, function(err, campground){
//         if(err){
//             console.log(err);
//         }else{
//             console.log("New Campground Created");
//             console.log(campground);
//         }
//     }
// )


app.get("/" , function(req,res){
    res.render("landing")
})

app.get("/campgrounds" , function(req,res){
    Campground.find({}, function(err, allcampgrounds){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/index", {campgrounds:allcampgrounds});
        }
    })
});

app.post("/campgrounds" , function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var desc = req.body.description;
    var newCampground = {name: name, image: image, description: desc};
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            console.log(err);
        }else{
            res.redirect("/campgrounds");
        }
    })
    
});

app.get("/campgrounds/new" , function(req,res){
    res.render("campgrounds/new_camp");
});

app.get("/campgrounds/:id" , function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("campgrounds/show", {campground: foundCampground});
        }
    })    
})

// ==============
// Comment Route
// ==============
app.get("/campgrounds/:id/comments/new", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        }else{
           res.render("comments/new", {campground: campground}); 
        }
    })
});

app.post("/campgrounds/:id/comments", function(req,res){
    Campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
            res.redirect("/campgrounds")
        }else{
           Comment.create(req.body.comment, function(err,comment){
               if(err){
                   console.log(err);
               }else{
                   campground.comments.push(comment);
                   campground.save();
                   res.redirect("/campgrounds/" + campground._id)
               }
           })
        }
    });
})

app.listen(3000 , function(){
    console.log("The Yelpcamp server has started")
})