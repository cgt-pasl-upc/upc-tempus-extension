import assert from 'assert';
import TempsInvalidFormatException from '../../../../src/models/exceptions/TempsInvalidFormatException.js';

describe('TempsInvalidFormatException', function() {
  describe('contructor()', function() {
    it('assignació valors', function() {
      var exception = new TempsInvalidFormatException("14/13/2020");
      assert.strictEqual(exception.message, "El format del temps és incorrecte");
      assert.strictEqual(exception.data, "14/13/2020");
    });
  });
});