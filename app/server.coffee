# server.js
require("coffee-script")

# modules =================================================
express        = require 'express'
app            = express()
mongoose       = require 'mongoose'
bodyParser     = require 'body-parser'
methodOverride = require 'method-override'

# configuration ===========================================
	
# config files
{url} = require './config/db' 
mongoose.connect url

port = process.env.PORT or 3000 # set our port
# mongoose.connect(db.url); # connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

# get all data/stuff of the body (POST) parameters
app.use(bodyParser.urlencoded({ extended: true })) # parse application/x-www-form-urlencoded
app.use(bodyParser.json()) # parse application/vnd.api+json as json

app.use(methodOverride('X-HTTP-Method-Override')) # override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static("#{__dirname}/../public")) # set the static files location /public/img will be /img for users

# routes ==================================================
require('./routes')(app, express) # configure our routes

# start app ===============================================
app.listen(port);										# startup our app at http://localhost:8080
console.log "Magic happens on port #{port}" 			# shoutout to the user
exports = module.exports = app; 						# expose app
