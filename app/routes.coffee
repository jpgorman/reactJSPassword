# ROUTES FOR OUR API
# =============================================================================
express = require 'express'
router = express.Router()				#get an instance of the express Router

# Get Model for use
Nerd = require './models/nerd'

#app/routes.js
module.exports = (app) ->

	# server routes ===========================================================
	# handle things like api calls
	# authentication routes

	# middleware to use for all requests
	router.use (req, res, next) ->
		# do logging
		console.log 'Something is happening.'
		next() # make sure we go to the next routes and don't stop here

	# routes that end in /nerds
	router.route '/nerds'

		# create a nerd (accessed at POST http://localhost:8080/api/nerds)
		.post (req, res) ->
			
			nerd = new Nerd() 		# create a new instance of the Nerd model
			nerd.name = req.body.name  # set the bears name (comes from the request)

			# save the Nerd and check for errors
			nerd.save (err) ->

				if err
					res.send err
					return

				res.json message: 'Nerd created!'

		# get all the nerds (accessed at GET http://localhost:8080/api/nerds)
		.get (req, res) ->

			Nerd.find (err, nerds) ->

				if err
					res.send err
					return

				res.json nerds

	# on routes that end in /nerds/:nerd_id
	# ----------------------------------------------------
	router.route '/nerds/:nerd_id'

		# get the bear with that id (accessed at GET http://localhost:8080/api/nerds/:nerd_id)
		.get (req, res) ->

			Nerd.findById req.params.nerd_id, (err, nerd) ->

				if err
					res.send err
					return

				res.json nerd

		# update the bear with this id (accessed at PUT http://localhost:8080/api/bears/:bear_id)
		.put (req, res) ->

			Nerd.findById req.params.nerd_id, (err, nerd) ->

				if err
					res.send err
					return

				# set nerds name
				nerd.name = req.body.name

				# save nerd
				nerd.save (err) ->
					
					if err
						res.send err
						return
				
					res.json message: "Nerd '#{nerd.name}' updated!"

		# delete the bear with this id (accessed at DELETE http://localhost:8080/api/bears/:bear_id)
		.delete (req, res) ->

			Nerd.remove _id : req.params.nerd_id, (err, nerd) ->

				if err
					res.send err
					return
				res.json message: "Successfully deleted !!!!" 



	# REGISTER OUR ROUTES -------------------------------
	# all of our routes will be prefixed with /api
	app.use '/api', router