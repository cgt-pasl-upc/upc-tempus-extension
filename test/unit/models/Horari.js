import assert from 'assert';
import Horari from '../../../src/models/Horari.js';
import Temps from '../../../src/models/Temps.js';

describe('Horari', function() {
  describe('contructor()', function() {
    it('assignació valors', function() {
      var h = new Horari(new Temps(5,30), new Temps(7,30), "01/01/2010", "31/12/2010");
      assert.deepStrictEqual(h.dedicacioSetmanal, new Temps(5,30));
      assert.deepStrictEqual(h.dedicacioNominal, new Temps(7,30));
      assert.strictEqual(h.inici, "01/01/2010");
      assert.strictEqual(h.final, "31/12/2010");
    });
  });

  describe('getPercetatgeDedicacio()', function() {
    it('dedicació 100%', function() {
      var h = new Horari(new Temps(7,30), new Temps(7,30), "01/01/2010", "31/12/2010");
      assert.strictEqual(h.getPercetatgeDedicacio(), 100);
    });
    it('dedicació 66%', function() {
      var h = new Horari(new Temps(5,0), new Temps(7,30), "01/01/2010", "31/12/2010");
      assert.strictEqual(h.getPercetatgeDedicacio(), 100*2/3);
    });
    it('dedicació 50%', function() {
      var h = new Horari(new Temps(3,45), new Temps(7,30), "01/01/2010", "31/12/2010");
      assert.strictEqual(h.getPercetatgeDedicacio(), 100*1/2);
    });
  });

});