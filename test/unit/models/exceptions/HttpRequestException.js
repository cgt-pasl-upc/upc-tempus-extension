import assert from 'assert';
import HttpRequestException from '../../../../src/models/exceptions/HttpRequestException.js';

describe('HttpRequestException', function() {
  describe('contructor()', function() {
    it('assignació valors', function() {
      var exception = new HttpRequestException({ statusText: "Error 404" });
      assert.strictEqual(exception.message, "La resposta HTTP és incorrecta");
      assert.strictEqual(exception.data, "Error 404");
    });
  });
});