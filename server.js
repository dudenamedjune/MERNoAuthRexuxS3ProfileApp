//require express for routing
var express = require("express");
var path = require("path");
//require boduParser
var bodyParser = require("body-parser");
var dbURL = require('./keys').dbURL;

//require MonogoClient to query data
var MongoClient = require('mongodb').MongoClient,
assert = require('assert');

var mongoose = require('mongoose');
var logger = require('morgan');
var routes = require('./routes/routes');

//set app to express() for a more semantic naming convention
var app = express();


//set apiRoutes
var apiRoutes = express.Router();


//create variable PORT so exprss can host on either or
var PORT = process.env.PORT || 3030;

//set up pbodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(logger('dev'));
// Make public a static dir
app.use(express.static("./public"));




routes(app);


mongoose.Promise = global.Promise;

// Database configuration with mongoose
// var url = "mongodb://52.25.41.113";






if(process.env.NODE_ENV !== 'production'){
  var url = "mongodb://localhost"

  var promise = mongoose.connect(url + "/Keystokes", {
    useMongoClient: true,
    /* other options */
  });
  promise.then(function(db) {
    // Show any mongoose errors
    db.on("error", function(error) {
      console.log("Mongoose Error: ", error);
    });

    // Once logged in to the db through mongoose, log a success message
    db.once("open", function() {
      console.log("Mongoose connection successful.");
    });

  });

  const webpackMiddleware = require("webpack-dev-middleware");
  const webpack = require("webpack");
  const webpackConfig = require("./webpack.config.js");
  app.use(webpackMiddleware(webpack(webpackConfig)))
}else{
  // Database configuration with mongoose

  var url = dbURL

  var promise = mongoose.connect(dbURL, {
    useMongoClient: true,
    /* other options */
  });
  promise.then(function(db) {
    // Show any mongoose errors
    db.on("error", function(error) {
      console.log("Mongoose Error: ", error);
    });

    // Once logged in to the db through mongoose, log a success message
    db.once("open", function() {
      console.log("Mongoose connection successful.");
    });

  });


  app.use(express.static('./public'));
  // Main "/" Route. This will redirect the user to our rendered React application
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));

  });
}



// Listen on port 3030
app.listen(PORT, function() {

  console.log("App running on port: " + PORT);

});

module.exports = app;
