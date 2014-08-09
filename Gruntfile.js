module.exports = function(grunt) {

 // Project configuration.
 grunt.initConfig({
   pkg: grunt.file.readJSON('package.json'),

   watch: {
   	css: {
   		files: 'assets/css/*.scss',
   		tasks: ['sass', 'autoprefixer', 'recess']
   	},
   	html: {
   		files: 'index.html',
   		tasks: ['']
   	},
      javascript: {
         files: 'assets/app.js',
         tasks: ['']
      },
   	options: {
   		livereload: true
   	}
   },

   sass: {
   	dist: {
   		files: {
   			'assets/css/style.css' : 'assets/css/style.scss'
   		}
   	}
   },

   autoprefixer: {
   	options: {
   		browsers: ['last 5 version', 'ie 8', 'ie 9']
   	},
   	no_dest: {
   		src: 'assets/css/style.css'
   	}
   },

   connect: {
   	server: {
   		options: {
   			port: '9009',
   			base: ''
   		}
   	}
   },

   recess: {
   	dist: {
   		options: {
   			compile: false,
   			compress: true
   		},
   		files: {
   			'assets/css/mini.css' : 'assets/css/style.css'
   		}
   	}
   }

 });

grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-autoprefixer');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-recess');

 // Default task(s).
 grunt.registerTask('default', ['sass','autoprefixer','recess','connect','watch']);
};
