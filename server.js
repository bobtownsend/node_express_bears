/******************************************
 *  Author : Bob Townsend
 *  Created On : Mon Feb 12 2018
 *  File : server.js
 *******************************************/
// BASE SETUP
// ******************************************
// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");
var Bear = require("./app/models/bear");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// DATABASE CONNECTION SETTINGS
// ******************************************
var mongoose = require("mongoose");
mongoose.connect("mongodb://admin:admin@ds233208.mlab.com:33208/testexpress4"); // connect to the database

// ROUTES FOR OUR API
// ******************************************
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log(req.method.toString + " is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  res.json({ message: "This is not the route you were looking for" });
});

// more routes for our API will happen here
// on routes that end in /bears
// ******************************************
router
  .route("/bears")

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    var bear = new Bear(); // create a new instance of the Bear model
    bear.name = req.body.name; // set the bears name (comes from the request)

    // save the bear and check for errors
    bear.save(function(err) {
      if (err) res.send(err);
      res.json({ message: bear.name + " Bear created!" });
    });
  })

  // get all the bears (accessed at GET http://localhost:8080/api/bears)
  .get(function(req, res) {
    Bear.find(function(err, bears) {
      if (err) res.send(err);
      res.json(bears);
    });
  });
router
  .route("/bears/:bear_id")
  .get(function(req, res) {
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);
      res.json(bear);
    });
  })

  // update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
  .put(function(req, res) {
    // use our bear model to find the bear we want
    Bear.findById(req.params.bear_id, function(err, bear) {
      if (err) res.send(err);

      bear.name = req.body.name; // update the bears info

      // save the bear
      bear.save(function(err) {
        if (err) res.send(err);
        res.json({ message: bear.name + " Bear updated!" });
      });
    });
  })

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/bear_id)
  .delete(function(req, res) {
    Bear.remove(
      {
        _id: req.params.bear_id
      },
      function(err, bear) {
        if (err) res.send(err);
        res.json({ message: req.params.bear_id + " Bear deleted!" });
      }
    );
  });

// REGISTER OUR ROUTES
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// ******************************************
app.listen(port);
console.log("Magic happens on port " + port);
