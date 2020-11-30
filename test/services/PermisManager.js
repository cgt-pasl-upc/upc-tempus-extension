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
    it('permís existent', function() {
      var tipus = new TipusPermis('0001', 'Permís 0001').perDies().recuperable();
      PermisManager.tipusPermisos = [ tipus ];

      var permis = PermisManager.createPermisDiesPerNom('01/01/2020', 'Permís 0001');
      assert.deepStrictEqual(permis.data, '01/01/2020');
      assert.deepStrictEqual(permis.temps, new Temps(7, 30));
      assert.deepStrictEqual(permis.tipus, new TipusPermis('0001', 'Permís 0001').perDies().recuperable());
    });
    it('permís no existent', function() {
      PermisManager.tipusPermisos = [];
      var permis = PermisManager.createPermisDiesPerNom('01/02/2020', 'Permís 0002');
      assert.deepStrictEqual(permis.data, '01/02/2020');
      assert.deepStrictEqual(permis.temps, new Temps(7, 30));
      assert.deepStrictEqual(permis.tipus, new TipusPermis('undefined', 'Permís 0002').perDies().noRecuperable());
    });
  });

  describe('createPermisHoresPerNom()', function() {
    it('permís existent', function() {
      var tipus = new TipusPermis('0001', 'Permís 0001').perHores().recuperable();
      PermisManager.tipusPermisos = [ tipus ];

      var permis = PermisManager.createPermisHoresPerNom('01/01/2020', new Temps(3, 30), 'Permís 0001');
      assert.deepStrictEqual(permis.data, '01/01/2020');
      assert.deepStrictEqual(permis.temps, new Temps(3, 30));
      assert.deepStrictEqual(permis.tipus, new TipusPermis('0001', 'Permís 0001').perHores().recuperable());
    });
    it('permís no existent', function() {
      PermisManager.tipusPermisos = [];
      var permis = PermisManager.createPermisHoresPerNom('01/02/2020', new Temps(2, 15), 'Permís 0002');
      assert.deepStrictEqual(permis.data, '01/02/2020');
      assert.deepStrictEqual(permis.temps, new Temps(2, 15));
      assert.deepStrictEqual(permis.tipus, new TipusPermis('undefined', 'Permís 0002').perHores().noRecuperable());
    });
  });

  describe('getTipusPermisPerNom()', function() {
    it('permisos existents', function() {
      var tipus1 = new TipusPermis('0001', 'Permís 0001').perDies().recuperable();
      var tipus2 = new TipusPermis('0002', 'Permís 0002').perHores().noRecuperable();
      PermisManager.tipusPermisos = [ tipus1, tipus2 ];
      assert.deepStrictEqual(PermisManager.getTipusPermisPerNom('Permís 0001'), tipus1);
      assert.deepStrictEqual(PermisManager.getTipusPermisPerNom('Permís 0002'), tipus2);
    });
    it('permisos per defecte', function() {
      var tipus = new TipusPermis('undefined', 'Permís 0001').perHores().noRecuperable();
      PermisManager.tipusPermisos = [];
      assert.deepStrictEqual(PermisManager.getTipusPermisPerNom('Permís 0001'), tipus);
    });
  });
});