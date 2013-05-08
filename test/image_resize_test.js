'use strict';

var grunt = require('grunt');

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
    test.expect(2);

    var actual = grunt.file.read('tmp/gnu.jpg');
    var expected = grunt.file.read('test/expected/gnu.jpg');
    test.equal(actual, expected, 'should be the same file');

    actual = grunt.file.read('tmp/wikipedia.png');
    expected = grunt.file.read('test/expected/wikipedia.png');
    test.equal(actual, expected, 'should be the same file');

    test.done();
  },
  no_overwrite: function(test) {
    test.expect(2);

    var actual = grunt.file.read('tmp/gnu.jpg');
    var expected = grunt.file.read('test/expected/gnu.jpg');
    test.equal(actual, expected, 'should be the same file');

    actual = grunt.file.read('tmp/wikipedia.png');
    expected = grunt.file.read('test/expected/wikipedia.png');
    test.equal(actual, expected, 'should be the same file');

    test.done();
  }
};
