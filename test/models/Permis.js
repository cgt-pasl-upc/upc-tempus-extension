import assert from 'assert';
import Temps from '../../src/models/Temps.js';
import TipusPermis from '../../src/models/TipusPermis.js';
import Permis from '../../src/models/Permis.js';

describe('Permis', function() {
  describe('contructor()', function() {
    it('assignació valors', function() {
      var temps = new Temps(2, 30);
      var tipus = new TipusPermis('00', 'Permís 00', true);
      var permis = new Permis('30/01/2020', temps, tipus);
      assert.strictEqual(permis.data, '30/01/2020');
      assert.strictEqual(permis.temps, temps);
      assert.strictEqual(permis.tipus, tipus);
    });
  });
  describe('toString()', function() {
    it('representació String()', function() {
      var temps = new Temps(2, 30);
      var tipus = new TipusPermis('00', 'Permís 00').recuperable().perHores();
      var permis = new Permis('30/01/2020', temps, tipus);
      assert.strictEqual(String(permis), '[data=30/01/2020,temps=[minuts=150],tipus=[codi=00,nom=Permís 00,recuperable=true,dies=false]]');
    });
  });
});