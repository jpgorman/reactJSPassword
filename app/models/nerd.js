(function() {
  var NerdSchema, Schema, mongoose;

  mongoose = require('mongoose');

  Schema = mongoose.Schema;

  NerdSchema = new Schema({
    name: String
  });

  module.exports = mongoose.model('Nerd', NerdSchema);

}).call(this);
