module.exports = 
	
	compileServerFiles :
		expand: true
		flatten: false
		cwd: 'app'
		src: ['**/*.coffee']
		dest: 'app'
		ext: '.js'

	compilePublicFiles:
    options:
      sourceMap: true
      sourceMapDir: 'public/js'
      bare:true
    expand: true
    flatten: true
    cwd: 'public'
    src: ['coffee/*.coffee']
    dest: 'public/js'
    ext: '.js'

	compileWithNodeMaps : 
  	options: 
    	sourceMap: true
  	files:
    	'public/js/app.js': 'public/coffee/**/*.coffee' # concat then compile into single file