/******************************************
 *  Author : Bob Townsend
 *  Created On : Mon Feb 12 2018
 *  File : bear.js
 *******************************************/
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var BearSchema = new Schema({
  name: String
});

module.exports = mongoose.model("Bear", BearSchema); // export our model
