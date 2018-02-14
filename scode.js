/******************************************
 *  Author : Bob Townsend
 *  Created On : Mon Feb 12 2018
 *  File : server.js
 *******************************************/
// BASE SETUP
// ******************************************


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

  // delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
  .delete(function(req, res) {
    Bear.remove(
      {
        _id: req.params.bear_id
      },
      function(err, bear) {
        if (err) res.send(err);
        res.json({ message: bear.name + " Bear deleted!" });
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
