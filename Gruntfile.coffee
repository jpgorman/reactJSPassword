# load all grunt packages from package.json
module.exports = (grunt) ->

	# measures the time each task takes
	require('time-grunt')(grunt)

	# load grunt config
	require('load-grunt-config')(grunt)