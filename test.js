'use strict';

let assert = require('assert'),
    TextReader = require('./index');

describe('TextReader', function() {

  let content = 'BEGIN \r\nFoo\r\nBar\r\nHello World\r\n\r\nEND';
  let reader;

  beforeEach(function() {
    reader = TextReader.create(content);
  });

  describe('#peek', function() {

    it('should be ok', function() {
      assert.equal(reader.peek(), 'B');
      assert.equal(reader.peek(5), 'BEGIN');
      assert.equal(reader.peek(6), 'BEGIN ');
      assert.equal(reader.position, 0);
      reader.seek(content.indexOf('END'));
      assert.equal(reader.available, 3);
      assert.equal(reader.peek(3), 'END');
      assert.equal(reader.peek(6), 'END');
      assert.equal(reader.read(6), 'END');
      assert.equal(reader.available, 0);
    });

  });

  describe('#skip', function() {

    it('should be ok', function() {
      assert.equal(reader.position, 0);
      reader.skip();
      assert.equal(reader.position, 1);
      assert.equal(reader.peek(), 'E');
      reader.skip(1);
      assert.equal(reader.position, 2);
      assert.equal(reader.peek(), 'G');
      reader.skip(2);
      assert.equal(reader.position, 4);
      assert.equal(reader.peek(), 'N');
      reader.skip(4);
      assert.equal(reader.position, 8);
      assert.equal(reader.peek(), 'F');
      assert.equal(reader.seek(0).skip(content.length).peek(), '');
      assert.equal(reader.seek(0).skip(content.length).available, 0);
      assert.equal(reader.seek(0).skip(content.length + 1).available, 0);
    });

  });

  describe('#seek', function() {

    it('should be ok', function() {
      assert(reader.seek(8).peek(3), 'Foo');
      assert(reader.seek(13).peek(3), 'Bar');
    });

  });

  describe('#read', function() {

    it('should be ok', function() {

      assert.equal(reader.read(), 'B');
      assert.equal(reader.position, 1);
      reader.seek(0);
      assert.equal(reader.read(5), 'BEGIN');
      assert.equal(reader.position, 5);
      reader.seek(content.indexOf('END'));
      assert.equal(reader.read(5), 'END');

    });

  });

  describe('#readLine', function() {

    it('should be ok', function() {

      let arr = [];
      while (reader.available > 0) {
        let str = reader.readLine();
        arr.push(str);
      }

      assert.deepEqual(arr, ['BEGIN ', 'Foo', 'Bar', 'Hello World', '', 'END']);

    });

  });

  describe('#readToEnd', function() {

    it('should be ok', function() {
      assert.equal(reader.readToEnd(), content);
      assert.equal(reader.available, 0);
      assert.equal(reader.seek(content.indexOf('Hello')).readToEnd(), 'Hello World\r\n\r\nEND');
      assert.equal(reader.available, 0);
      assert.equal(reader.seek(content.length).readToEnd(), '');
      assert.equal(reader.available, 0);
    });

  });

});
