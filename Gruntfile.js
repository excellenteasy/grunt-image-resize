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
          {'tmp/gnu.jpg': 'test/fixtures/gnu.jpg'},
          {'tmp/wikipedia.png': 'test/fixtures/wikipedia.png'},
          {'tmp/Rhododendron.jpg': 'test/fixtures/Rhododendron.jpg'},
          {'tmp/TeslaTurbine.png': 'test/fixtures/TeslaTurbine.png'}
        ]
      },
      no_overwrite: {
        options: {
          width: 0,
          height: 50,
          overwrite: false
        },
        files: [
          {'tmp/gnu.jpg': 'test/fixtures/gnu.jpg'},
          {'tmp/wikipedia.png': 'test/fixtures/wikipedia.png'},
          {'tmp/Rhododendron.jpg': 'test/fixtures/Rhododendron.jpg'},
          {'tmp/TeslaTurbine.png': 'test/fixtures/TeslaTurbine.png'}
        ]
      },
      upscale: {
        options: {
          width: 600,
          height: 0,
          upscale: true
        },
        files: [
          {'tmp/upscale.png': 'test/fixtures/upscale.png'}
        ]
      },
      upscale2: {
        options: {
          width: 600,
          height: 600,
          upscale: true
        },
        files: [
          {'tmp/upscale2.png': 'test/fixtures/upscale2.png'}
        ]
      },
      no_upscale: {
        options: {
          width: 600,
          height: 0,
          upscale: false
        },
        files: [
          {'tmp/no_upscale.png': 'test/fixtures/no_upscale.png'}
        ]
      },
      crop: {
        options: {
          width: 400,
          height: 300,
          upscale: false,
          crop: true
        },
        files: [
          {'tmp/crop.png': 'test/fixtures/crop.png'}
        ]
      },
      quality: {
        options: {
          width: 600,
          height: 0,
          upscale: false,
          quality: 0.2
        },
        files: [
          {'tmp/quality.jpg': 'test/fixtures/quality.jpg'}
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
  grunt.registerTask('test', [
    'clean',
    'image_resize',
    'nodeunit'
  ]);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
