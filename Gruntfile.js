// load all grunt packages from package.json

module.exports = function(grunt) {

	// Load NPM Tasks, exlude the static-handlebars plugin as it's not loading automatically
  require('load-grunt-tasks')(grunt, ['grunt-*', '!grunt-static-handlebars']);

  // static handlers must be loaded manually as it isn't detected by load-grunt-tasks
  grunt.loadNpmTasks('grunt-static-handlebars');

	// measures the time each task takes
	require('time-grunt')(grunt);


	// Project configuration.
    grunt.initConfig({

    	// Watch
    	watch : {
    		options: {
  				files: ['*.html', 'js/**/*.{js,json}', 'css/**/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
  			},
        react: {
          files: ['coffee/*.jsx'],
          tasks: ['react']
        }, 
  			sass: {
  				files: ['sass/**/*.{scss,sass}','sass/_partials/**/*.{scss,sass}','sass/_modules/**/*.{scss,sass}'],
  				tasks: ['sass:dist','autoprefixer:dist']
          //tasks: ['sass:dist','autoprefixer:dist']
  			},
        coffee: {
          files: ['coffee/**/*.coffee'],
          tasks: ['coffee:glob_to_multiple']
        },
		    livereload: {
		      // Here we watch the files the sass task will compile to
		      // These files are sent to the live reload server after sass compiles to them
		      options: { livereload: true },
		      files: ['*.html', 'js/**/*.js','css/**/*.css','img/**/*.{png,jpg,jpeg,gif,webp,svg}','haml/dist/*.html'],
		    }
    	},

    	// Sass
    	sass : {
    		dist: {
  				options: {
  					sourceComments: 'map',
  					outputStyle: 'nested'
  				},
  				files: {
  					'css/src/app.css': 'sass/app.scss'
  				}
  			}
    	},

      // Coffee Script
      coffee: {
        glob_to_multiple: {
          options: {
            sourceMap: true,
            sourceMapDir: 'js',
            bare:true
          },
          expand: true,
          flatten: true,
          cwd: 'coffee',
          src: ['*.coffee'],
          dest: 'js',
          ext: '.js'
        }
      },

    	// Autoprefixer
    	autoprefixer :{
    		dist: {
				options: {
  					map: true,
            browsers: ['last 2 versions', 'ie >= 9', 'Firefox >= 10', 'Opera >= 5']
  				},
  				src : 'css/src/app.css',
  				dest : 'css/dist/app.css'
  			}
    	},

    	// Sprites
    	sprite : {
    		dist: {
				src: 'css/img/ui/*.png',
				destImg: '/css/img/spritesheet.png',
				destCSS: 'sass/_sprites.scss',
		        cssFormat: 'scss',
		        algorithm: 'binary-tree'
		    }
    	},

    	// Handlebars - https://github.com/techtribe/grunt-static-handlebars
    	staticHandlebars : {
  			dist : {
  				options:{
  			    	sourceView:true //optional
  				},
  	        	files:{'handlebars/dist/*.html':'handlebars/src/*.hbt'}
  	    	}
  		},

       // -------------------------------------------------------------------
      // REACT
      // -------------------------------------------------------------------
      react: {
        "js/jsx-build.js" : [
          "coffee/button.jsx",
          "coffee/input.jsx",
          "coffee/label.jsx",
          "coffee/passwordStrengthIndicator.jsx",
          "coffee/row.jsx",
          "coffee/message.jsx",
          "coffee/form.jsx",
          "coffee/passwordController.jsx"
        ]
      },



    });

    // Default Task
    grunt.registerTask('default', ['watch']);

    // Templates Task
    grunt.registerTask('templates', ['staticHandlebars:dist']);

    // Sprite Task
    grunt.registerTask('sprites', ['sprite:dist']);
};