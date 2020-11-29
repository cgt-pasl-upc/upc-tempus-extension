import assert from 'assert';
import Temps from '../../src/models/Temps.js';
import Permis from '../../src/models/Permis.js';
import TipusPermis from '../../src/models/TipusPermis.js';
import PermisManager from '../../src/services/PermisManager.js';
import PermisNotFoundException from '../../src/models/exceptions/PermisNotFoundException.js';

describe('PermisManager', function() {
  describe('getTipusPermisRecuperables()', function() {
    it.skip('obtenir permisos recuberables', function() {
    });
  });
  describe('getTipusPermisNoRecuperables()', function() {
    it.skip('obtenir permisos no recuberables', function() {
    });
  });
  describe('sumatoriPerTipus()', function() {
    it('sumatori d\'array buit', function() {
      var tipus = new TipusPermis('00', 'Permis 0', true);
      var permisos = [];
      assert.deepStrictEqual(PermisManager.sumatoriPerTipus([tipus], permisos), new Temps(0, 0));
    });
    it('sumatori d\'array no buit', function() {
      var tipus = new TipusPermis('00', 'Permis 0', true);
      var permisos = [
        new Permis('01/01/2010', new Temps(1), tipus),
        new Permis('02/01/2010', new Temps(1,30), tipus),
        new Permis('03/01/2010', new Temps(0,30), tipus)
      ];
      assert.deepStrictEqual(PermisManager.sumatoriPerTipus([tipus], permisos), new Temps(3));
    });
    it('sumatori amb diferents tipus', function() {
      var tipus1 = new TipusPermis('00', 'Permis 0', true);
      var tipus2 = new TipusPermis('01', 'Permis 1', false);
      var permisos = [
        new Permis('01/01/2010', new Temps(1), tipus1),
        new Permis('02/01/2010', new Temps(1,30), tipus2),
        new Permis('03/01/2010', new Temps(0,30), tipus2)
      ];
      assert.deepStrictEqual(PermisManager.sumatoriPerTipus([tipus2], permisos), new Temps(2));
    });
    it('sumatori amb diferents tipus i multiples tipus', function() {
      var tipus1 = new TipusPermis('00', 'Permis 0', true);
      var tipus2 = new TipusPermis('01', 'Permis 1', true);
      var tipus3 = new TipusPermis('02', 'Permis 2', false);
      var permisos = [
        new Permis('01/01/2010', new Temps(1), tipus1),
        new Permis('02/01/2010', new Temps(1,30), tipus2),
        new Permis('03/01/2010', new Temps(2,30), tipus2),
        new Permis('04/01/2010', new Temps(3,30), tipus3),
        new Permis('05/01/2010', new Temps(0,30), tipus3)
      ];
      assert.deepStrictEqual(PermisManager.sumatoriPerTipus([tipus2,tipus3], permisos), new Temps(8));
    });
  });

  describe('createPermisDiesPerNom()', function() {
    it('permís "Assumptes propis 2020"', function() {
      var permis = PermisManager.createPermisDiesPerNom('01/01/2020', 'Assumptes propis 2020');
      assert.deepStrictEqual(permis.data, '01/01/2020');
      assert.deepStrictEqual(permis.temps, new Temps(7, 30));
      assert.deepStrictEqual(permis.tipus, new TipusPermis('7073', 'Assumptes propis 2020').perDies().noRecuperable());
    });
    it('permís no existent', function() {
      assert.throws(function () { 
        PermisManager.createPermisDiesPerNom('01/01/2020', 'Permís no existent') 
      }, PermisNotFoundException,  /No s\'ha trobat el permís "Permís no existent"./);
    });
  });

  describe('createPermisHoresPerNom()', function() {
    it('permís "Assistència a assemblea"', function() {
      var permis = PermisManager.createPermisHoresPerNom('31/12/2020', new Temps(3,45), 'Assistència a assemblea');
      assert.deepStrictEqual(permis.data, '31/12/2020');
      assert.deepStrictEqual(permis.temps, new Temps(3, 45));
      assert.deepStrictEqual(permis.tipus, new TipusPermis('7046', 'Assistència a assemblea').perHores().noRecuperable());
    });
    it('permís no existent', function() {
      assert.throws(function () { 
        PermisManager.createPermisHoresPerNom('31/12/2020', new Temps(6,0), 'Permís no existent') 
      }, PermisNotFoundException,  /No s\'ha trobat el permís "Permís no existent"./);
    });
  });

  describe('getTipusPermisPerNom()', function() {
    it('permís "Assistència a assemblea"', function() {
      var tipus = PermisManager.getTipusPermisPerNom('Assistència a assemblea');
      assert.deepStrictEqual(tipus, new TipusPermis('7046', 'Assistència a assemblea').perHores().noRecuperable());
    });
    it('permís no existent', function() {
      assert.throws(function () { 
        PermisManager.getTipusPermisPerNom('Permís no existent') 
      }, PermisNotFoundException,  /No s\'ha trobat el permís "Permís no existent"./);
    });
  });
});