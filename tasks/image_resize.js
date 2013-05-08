/*
 * grunt-image-resize
 * https://github.com/excellenteasy.com/grunt-image-resize
 *
 * Copyright (c) 2013 David Pfahler
 * Licensed under the MIT license.
 */

'use strict';

var imagemagick = require('node-imagemagick'),
    async       = require('async');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('image_resize', 'resize images made easy', function() {

    var done = this.async(),
        options = this.options({
          overwrite: true
        }),
        queue = [];

    if (options.height == null && options.width == null) {
      return grunt.fail.warn("Neither height now width defined.");
    }
    if (options.height == null && options.width) {
      options.height = 0;
    }
    if (options.width == null && options.height) {
      options.width = 0;
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var filepath = f.src[0], imOptions = {
        srcPath:  filepath,
        dstPath:  f.dest,
        width:    options.width,
        height:   options.height
      };

      // Fail for more than one source file per file group.
      if (f.src.length !== 1) {
        return grunt.fail.fatal("Can not optimize more than one image per destination.\n"+
          "You need to use a different 'files' format in your Gruntfile.");
      }
      if (options.overwrite === false && grunt.file.isFile(f.dest)) {
        return grunt.log.writeln("Skipping "+filepath+" because destination already exists.\n"+
          "Set options 'overwrite' to true to enable overwriting of files.");
      }

      queue.push(function(callback) {
        imagemagick.resize(imOptions, function(err, stdout, stderr) {
          if (err) {
            grunt.fail.warn(err.message);
          } else {
            grunt.log.writeln('Image '+filepath+' resized to '+f.dest);
          }
          return callback();
        });
      });
    });

    async.parallel(queue, function() {
      done();
    });
  });

};
