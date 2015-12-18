var mongoose = require('mongoose');

var DataSchema = mongoose.Schema({
  user_id: String,
  garden_id: String,
  date: Date,
  data: Object
});

module.exports = mongoose.model('Data', DataSchema);
