const bcrypt = require('bcrypt');
const userModel = require('../models/userModel'); 
const jwt = require("jsonwebtoken");

exports.login = function (req, res,next) { 

    let username = req.body.username; 
    let password = req.body.password; 

    userModel.lookup(username, function (err, user) {
    if (err) { 
        console.log("error looking up user", err); 
        return res.status(401).send();
     } 
     if (!user) { 
        console.log("user ", username, " not found"); 
        return res.redirect("/login");
     }
    //compare provided password with stored password
    bcrypt.compare(password, user.password, function (err, result) {
    if (result) {
        let payload = { username: user.user, role: user.role, store: user.store};
        console.log("PAYLOAD: " , payload);
        let accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);

        if (payload.role == "admin") {
            return res.render("admin", {
                title: "Admin Dashboard",
                user: "user",
            });
          }
          if (payload.role == "volunteer") {
            //return res.redirect(`/items/${encodeURIComponent(payload.store)}`);
            return res.redirect('/addItem');
        }
    
    next();
    } else { 
        return res.render("login");
    }});
});
}


exports.verify = function (req, res, next) {
    let accessToken = req.cookies.jwt;
     
    if(!accessToken) { 
        res.redirect('login');
    } 
     
    try{
        // passes username parameter to next page
        let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.username = payload.username;
        next(); } catch (e) {
        //if an error occurred return request unauthorized error
        res.status(401).send();
    }
  };


exports.verifyAdmin = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    if (payload.role != "admin") {
      return res.status(403).send();
    }
    try {
      next();
    } catch (e) {
      //if an error ocurred return request unauthorized error
      res.status(401).send();
    }
};

exports.verifyVolunteer = function (req, res, next) {
    let accessToken = req.cookies.jwt;
    let payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    req.store = payload.store;
    if (payload.role != "volunteer") {
      return res.status(403).send();
    }
    try {
      next();
    } catch (e) {
      //if an error ocurred return request unauthorized error
      res.status(401).send();
    }
};
    
