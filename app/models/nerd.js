(function() {
  var NerdSchema, Schema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  NerdSchema = new Schema({
    name: String,
    password: String,
    strength: {
      rate: Number
    }
  });

  module.exports = mongoose.model('Nerd', NerdSchema);

}).call(this);
