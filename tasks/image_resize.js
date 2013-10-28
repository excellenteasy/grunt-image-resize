/*
 * grunt-image-resize
 * https://github.com/excellenteasy.com/grunt-image-resize
 *
 * Copyright (c) 2013 David Pfahler
 * Licensed under the MIT license.
 */

'use strict';

var gm    = require('gm').subClass({ imageMagick: true });
var async = require('async');
var path  = require('path');
var os    = require('os');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('image_resize', 'resize images made easy', function() {

    var done = this.async();
    var originalOptions = this.options();
    var options = this.options({
      overwrite: true,
      upscale: false,
      concurrency: os.cpus().length,
      crop: false,
      quality: 1
    });
    var series = [];

    if (options.height == null && options.width == null) {
      return grunt.fail.warn("Neither height nor width defined.");
    }
    if (options.height == null && options.width) {
      options.height = 0;
    }
    if (options.width == null && options.height) {
      options.width = 0;
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      var dirname = path.dirname(f.dest),
          filepath = f.src[0], imOptions = {
        srcPath:  filepath,
        dstPath:  f.dest,
        width:    options.width,
        height:   options.height,
        quality:  options.quality
      };

      // Prevent failing if destination directory does not exist.
      if (!grunt.file.isDir(dirname)) {
        grunt.file.mkdir(dirname);
      }
      // Fail for more than one source file per file group.
      if (f.src.length !== 1) {
        return grunt.fail.fatal("Can not optimize more than one image per destination.\n"+
          "You need to use a different 'files' format in your Gruntfile.");
      }
      if (options.overwrite === false && grunt.file.isFile(f.dest)) {
        return grunt.log.writeln("Skipping "+filepath+" because destination already exists.\n"+
          "Set options 'overwrite' to true to enable overwriting of files.");
      }

      series.push(function(callback) {
        // Fail when image would be upscaled unless explicitly allowed
        gm(filepath).size(function(err, size) {
          if (!options.upscale &&
            ((originalOptions.width && size.width < originalOptions.width) ||
            (originalOptions.height && size.height < originalOptions.height))) {
            grunt.log.writeln("Copying "+filepath+" instead of resizing, because image would be upscaled.\n"+
              "To allow upscaling, set option 'upscale' to true.");
            grunt.file.copy(filepath, imOptions.dstPath);
            grunt.log.ok("Image "+filepath+" copied to "+imOptions.dstPath);
            callback();
          }
          else {
            if (options.crop) {
              var resizer = gm(filepath)
                .resize(imOptions.width, imOptions.height, "^")
                .gravity("Center")
                .crop(imOptions.width, imOptions.height);
            } else {
              var resizer = gm(filepath)
                .resize(imOptions.width, imOptions.height);
            }

            resizer
              .quality(Math.floor(imOptions.quality * 100))
              .write(imOptions.dstPath, function(err) {
              if (err) {
                grunt.fail.warn(err.message);
              } else {
                grunt.log.ok('Image '+filepath+' resized to '+f.dest);
              }
              return callback();
            });
          }
        });
      });
    });

    async.parallelLimit(series, options.concurrency, done);
  });

};
