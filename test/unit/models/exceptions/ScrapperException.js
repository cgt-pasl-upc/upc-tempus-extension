import assert from 'assert';
import ScrapperException from '../../../../src/models/exceptions/ScrapperException.js';

describe('ScrapperException', function() {
  describe('contructor()', function() {
    it('assignació valors', function() {
      var exception = new ScrapperException({ html: function() { return "<div>Content</div>"} });
      assert.strictEqual(exception.message, "No es pot tractar la informació de la pàgina");
      assert.strictEqual(exception.data, "<div>Content</div>");
    });
    it('assignació valors amb selector', function() {
      var exception = new ScrapperException({ html: function() { return "<div>Content</div>"} }, "body div.main");
      assert.strictEqual(exception.message, "No es pot tractar la informació de la pàgina");
      assert.strictEqual(exception.data, "[selector=body div.main]<div>Content</div>");
    });
  });
});