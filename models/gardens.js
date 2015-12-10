var mongoose = require('mongoose');

var GardenSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Garden', GardenSchema);