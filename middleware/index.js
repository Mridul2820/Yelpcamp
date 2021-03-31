var Campground = require("../models/campground");
var Comment = require("../models/comment");
var middlewareObj = {}

middlewareObj.checkCampgroundOwnerShip = function(req,res,next){
    if (req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Campground not found!!");
                res.redirect("back");
            }else{
                if(foundCampground.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Permission Denied!!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Login first!!");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnerShip = function(req,res,next){
    if (req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    next();
                }else{
                    req.flash("error", "Permission Denied!!");
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Login first!!");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Login first!!");
    res.redirect("/login")
}

module.exports = middlewareObj;