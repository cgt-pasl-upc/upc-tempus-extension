import assert from 'assert';
import PermisNotFoundException from '../../../src/models/exceptions/PermisNotFoundException.js';

describe('Permis', function() {
  describe('contructor()', function() {
    it('assignació valors', function() {
      var exception = new PermisNotFoundException('Permís 00');
      assert.strictEqual(exception.message, 'No s\'ha trobat el permís "Permís 00".');
    });
  });
});