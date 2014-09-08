module.exports =

	options: 
  	livereload: true
	coffee: 
		files: ['app/**/*.coffee', 'public/**/*.coffee']
		tasks: ['coffee:compileServerFiles', 'coffee:compilePublicFiles']
	react:
		files: ['public/coffee/*.jsx']
		tasks: ['react']