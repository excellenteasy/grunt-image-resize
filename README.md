# grunt-image-resize

> Resizing images made easy - thanks to imagemagick.

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-image-resize --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-image-resize');
```

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

A number value that is passed as pixel value to imagemagick.

#### options.height
Type: `Number`
Default value: `0` (only if width is defined)

A number value that is passed as pixel value to imagemagick.

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
        width: 50
        overwrite: false
      },
      files: {
        'tmp/wikipedia.png': 'test/fixtures/wikipedia.png'
      }
    }
  }
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
Initial release
