var mongoose = require('mongoose');

var GardenSchema = mongoose.Schema({
  name: String,
  user_id: String
});

module.exports = mongoose.model('Garden', GardenSchema);