/*
 * grunt-image-resize
 * https://github.com/excellenteasy.com/grunt-image-resize
 *
 * Copyright (c) 2013 David Pfahler
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp/*']
    },

    // Configuration to be run (and then tested).
    image_resize: {
      options: {
        width: 100
      },
      resize: {
        files: [
          {dest: 'tmp/gnu.jpg', src: 'test/fixtures/gnu.jpg'},
          {dest: 'tmp/wikipedia.png', src: 'test/fixtures/wikipedia.png'}
        ]
      },
      no_overwrite: {
        options: {
          width: 0,
          height: 50,
          overwrite: false
        },
        files: [
          {dest: 'tmp/gnu.jpg', src: 'test/fixtures/gnu.jpg'},
          {dest: 'tmp/wikipedia.png', src: 'test/fixtures/wikipedia.png'}
        ]
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'image_resize:resize', 'image_resize:no_overwrite', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
