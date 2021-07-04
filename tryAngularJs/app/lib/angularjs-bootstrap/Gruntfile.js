/*
 * Twitter Bootstrap plugin for AngularJS.
 * Copyright (c) 2016-2018 Rodziu <mateusz.rohde@gmail.com>
 * License: MIT
 */
module.exports = function(grunt){
	const banner = '/*! <%= pkg.description %> v.<%= pkg.version %> | (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %> */';
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		concat: {
			dist: {
				src: [
					'src/js/**.js'
				],
				dest: 'dist/js/<%= pkg.name %>.js'
			}
		},
		uglify: {
			options: {
				banner: banner
			},
			build: {
				src: 'dist/js/<%= pkg.name %>.js',
				dest: 'dist/js/<%= pkg.name %>.min.js'
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify-es');

	grunt.registerTask('default', ['concat', 'uglify']);

};