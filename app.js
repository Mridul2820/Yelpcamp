var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs")

var campgrounds = [
    {name : "Roof of the World", image : "https://t-ec.bstatic.com/images/hotel/max1024x768/647/64748006.jpg"},
    {name : "Cloud's Rest", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwj2-KBUFStyTsVQ5o-bVOD_cfFiLE0FjO5gvzjw1CJJ_BKRkd"},
    {name : "Lost Coast Trail", image : "http://www.camp-liza.com/wp-content/uploads/2017/10/20170708_093155_HDR-2.jpg"},
    {name : "Roof of the World", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHH5riFeipmBi5bcMb3445m7yu5Of0T5tVpzOFndTbq5Gox0BS"},
    {name : "Cloud's Rest", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0nmGdjuNrRu4vnU6_7VIOTo0s6I2uf7iL4PWc-EqaJD-oncxS"},
    {name : "Lost Coast Trail", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGkmX4p1Q39gN48OxFNwYNRXc2qTgMEpn968S7zXEhD9Pv4xgKaw"},
    {name : "Roof of the World", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1zJ98wA-Zqu4Bf3_1tNYUxhLRma9p0VhZ85e0ZLxXh76cGNfp2g"},
    {name : "Cloud's Rest", image : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7_gBSZXD_Mqyw8NpBnXjN5VTHWqhZ-rIK87g8gpYE6nZmORe7"},
]

app.get("/" , function(req,res){
    res.render("landing")
})

app.get("/campgrounds" , function(req,res){
    res.render("campgrounds", {campgrounds:campgrounds})
});

app.post("/campgrounds" , function(req,res){
    var name = req.body.name;
    var image = req.body.image;
    var newCampground = {name: name, image: image};
    campgrounds.push(newCampground);
    res.redirect("/campgrounds")
});

app.get("/campgrounds/new" , function(req,res){
    res.render("new_camp");
});

app.listen(3000 , function(){
    console.log("The Yelpcamp server has started")
})