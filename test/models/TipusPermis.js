import assert from 'assert';
import TipusPermis from '../../src/models/TipusPermis.js';

describe('TipusPermis', function() {
  describe('contructor()', function() {
    it('assignació valors per defecte (no recuperable per hores)', function() {
      var t = new TipusPermis('00', 'Permís 00');
      assert.strictEqual(t.codi, '00');
      assert.strictEqual(t.nom, 'Permís 00');
      assert.ok(t.esNoRecuperable());
      assert.ok(t.esPerHores());
    });
  });
  describe('recuperable()', function() {
    it('assignació recuperable', function() {
      var t = new TipusPermis('01', 'Permís 01').recuperable();
      assert.ok(t.esRecuperable());
    });
  });
  describe('noRecuperable()', function() {
    it('assignació recuperable', function() {
      var t = new TipusPermis('02', 'Permís 02').noRecuperable();
      assert.ok(!t.esRecuperable());
    });
  });
  describe('perDies()', function() {
    it('assignació per dies', function() {
      var t = new TipusPermis('03', 'Permís 03').perDies();
      assert.ok(t.esPerDies());
      assert.ok(!t.esPerHores());
    });
  });
  describe('perHores()', function() {
    it('assignació per hores', function() {
      var t = new TipusPermis('04', 'Permís 04').perHores();
      assert.ok(t.esPerHores());
      assert.ok(!t.esPerDies());
    });
  });
  describe('toString()', function() {
    it('representació String() permís recuperable per dies', function() {
      var t = new TipusPermis('00', 'Permís 00').recuperable().perDies();
      assert.strictEqual(String(t), '[codi=00,nom=Permís 00,recuperable=true,dies=true]');
    });
    it('representació String() permís no recuperable per hores', function() {
      var t = new TipusPermis('01', 'Permís 01').noRecuperable().perHores();
      assert.strictEqual(String(t), '[codi=01,nom=Permís 01,recuperable=false,dies=false]');
    });
  });
});