var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

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
            res.render("index", {campgrounds:allcampgrounds});
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
    res.render("new_camp");
});

app.get("/campgrounds/:id" , function(req,res){
    Campground.findById(req.params.id, function(err,foundCampground){
        if(err){
            console.log(err);
        }else{
            res.render("show", {campground: foundCampground});
        }
    })    
})

app.listen(3000 , function(){
    console.log("The Yelpcamp server has started")
})