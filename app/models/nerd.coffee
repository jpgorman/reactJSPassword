mongoose     = require 'mongoose'
Schema       = mongoose.Schema

NerdSchema   = new Schema
	name: String
	password: String
	strength:
		rate: Number

module.exports = mongoose.model('Nerd', NerdSchema)