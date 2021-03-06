var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
// var seedDB = require("./seeds");

//Requiring routes
var campgroundsRoutes = require("./routes/campgrounds");
var commentRoutes = require("./routes/comments");
var indexRoutes = require("./routes/index");

// mongoose.connect("mongodb://localhost/yelp_camp_v12", { useNewUrlParser: true });
mongoose.connect("mongodb://Mridul:riya2820@ds247223.mlab.com:47223/yelpcampmp", { useNewUrlParser: true });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the DB

//passport configuration
app.use(require("express-session")({
    secret: "Pika Pika",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    res.locals.info = req.flash("info");
    res.locals.warning = req.flash("warning");
    next();
})

app.use("/campgrounds", campgroundsRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(indexRoutes);

app.listen(process.env.PORT ||3000 , function(){
    console.log("The Yelpcamp server has started")
})