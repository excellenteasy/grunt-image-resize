'use strict';

var grunt = require('grunt'),
    im    = require('node-imagemagick'),
    async = require('async');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.image_resize = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  resize: function(test) {
    test.expect(4);

    var createTest = function(filename) {
      return function(callback) {
        im.identify('tmp/'+filename, function(err, features) {
          im.identify('test/expected/'+filename, function(err, expected) {
            test.equal(features.width, expected.width);
            callback();
          });
        });
      };
    };

    async.series([
      createTest('gnu.jpg'),
      createTest('Rhododendron.jpg'),
      createTest('wikipedia.png'),
      createTest('TeslaTurbine.png'),
    ], test.done);

  }
};
