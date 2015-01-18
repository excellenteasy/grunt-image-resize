# grunt-image-resize

[![Build Status](https://travis-ci.org/excellenteasy/grunt-image-resize.svg)](https://travis-ci.org/excellenteasy/grunt-image-resize)
[![Dependency Status](https://david-dm.org/excellenteasy/grunt-image-resize.svg)](https://david-dm.org/excellenteasy/grunt-image-resize)
[![devDependency Status](https://david-dm.org/excellenteasy/grunt-image-resize/dev-status.svg)](https://david-dm.org/excellenteasy/grunt-image-resize#info=devDependencies)

> Resizing images made easy - thanks to ImageMagick.

## Getting Started
This plugin requires Grunt `^0.4.5` and ImageMagick.

### Grunt
If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-resize --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-resize');
```

### ImageMagick
Make sure ImageMagick is installed on your system and properly set up in your `PATH`.

Ubuntu:

```shell
$ apt-get install imagemagick
```

Mac OS X (using [Homebrew](http://brew.sh/)):

```shell
$ brew install imagemagick
```

Windows & others: 

[http://www.imagemagick.org/script/binary-releases.php](http://www.imagemagick.org/script/binary-releases.php)

Confirm that ImageMagick is properly set up by executing `convert -help` in a terminal.

## The "image_resize" task

### Overview
In your project's Gruntfile, add a section named `image_resize` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  image_resize: {
    options: {
      width: 100,
      height: 100,
      overwrite: true
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.width
Type: `Number`
Default value: `0` (only if height is defined)

A number value that is passed as pixel or percentage value to imagemagick.

#### options.height
Type: `Number`
Default value: `0` (only if width is defined)

A number value that is passed as pixel or percentage value to imagemagick.

#### options.overwrite
Type: `Boolean`
Default value: `true`

Determines whether file that already exist under this destination will be overwritten.

#### options.upscale
Type: `Boolean`
Default value: `false`

Determines whether images will be upscaled. If set to `false` (default), image will be copied instead of resized if it would be upscaled by resizing.

#### options.crop
Type: `Boolean`
Default value: `false`

Determines whether images will be cropped after resizing to exactly match `options.width` and `options.height`.

#### options.gravity
Type: `String`
Default value: `Center`
Possible values: `NorthWest`, `North`, `NorthEast`, `West`, `Center`, `East`, `SouthWest`, `South`, `SouthEast`

When cropping images this sets the image gravity. Doesn't have any effect, if `options.crop` is `false`.

#### options.concurrency
Type: `Number`
Default value: Number of CPUs

Determines how many resize operations are executed in parallel.

#### options.quality
Type: `Number`
Default value: `1`

Determines the output quality of the resized image. Ranges from `0` (really bad) to `1` (almost lossless). Only applies to jpg images.

#### options.autoOrient
Type: `Boolean`
Default value: `false`

Determines if resized image will be rotated according to EXIF information. Only applies to jpg images.

### Usage Examples

#### Default Options
In this example, the default options are used to resize an image to 100px width. So if the `test/fixtures/wikipedia.png` file has a width of 500px, the generated result would be a 100px wide `tmp/wikipedia.png`.

```js
grunt.initConfig({
  image_resize: {
    resize: {
      options: {
        width: 100
      },
      files: {
        'tmp/wikipedia.png': 'test/fixtures/wikipedia.png'
      }
    }
  }
})
```

#### Prevent overwriting
In this example, we prevent the destination file from being overwritten if it already exists. It the file `tmp/wikipedia.png` already exists, for example because we just ran the task configuration above, this would **not** overwrite `tmp/wikipedia.png`. The file `tmp/wikipedia.png` would still be 100px wide.

```js
grunt.initConfig({
  image_resize: {
    no_overwrite: {
      options: {
        width: 50,
        overwrite: false
      },
      files: {
        'tmp/wikipedia.png': 'test/fixtures/wikipedia.png'
      }
    }
  }
})
```

#### Allow upscaling
By default, the task does not resize images which would be upscaled. It only allows downscaling. You can allow upscaling by setting the `upscale` option to `true`. Otherwise images will copied instead of resized when they would be upscaled by resizing.

```js
grunt.initConfig({
  image_resize: {
    no_overwrite: {
      options: {
        width: 600,
        upscale: true
      },
      files: {
        'tmp/wikipedia.png': 'test/fixtures/wikipedia.png'
      }
    }
  }
})
```

#### Resize all the images in a directory

```js
grunt.initConfig({
  image_resize: {
    resize: {
      options: {
        width: 100,
      },
      src: 'src/*.JPG',
      dest: 'dest/'
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).
