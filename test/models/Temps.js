import assert from 'assert';
import { kMaxLength } from 'buffer';
import Temps from '../../src/models/Temps.js';

describe('Temps', function() {
  describe('contructor()', function() {
    it('assignació valors per defecte == 0', function() {
      var t = new Temps();
      assert.strictEqual(t.minuts, 0);
    });
    it('assignació valors normalitzats', function() {
      var t = new Temps(7, 30);
      assert.strictEqual(t.minuts, 7*60+30);
    });
    it('assignació valors no normalitzats', function() {
      var t = new Temps(6, 95);
      assert.strictEqual(t.minuts, 7*60+35);
    });
    it('assignació valors negatius', function() {
      var t = new Temps(5, -95);
      assert.strictEqual(t.minuts, 5*60-95);
    });
  });
  describe('clone()', function() {
    it('còpia', function() {
      var t1 = new Temps(4,15);
      var t2 = t1.clone();
      assert.ok(t1.minuts !== t2);
      assert.strictEqual(t2.minuts, 4*60+15);
    });
  });
  describe('esPositiu()', function() {
    it('és positiu', function() {
      var t = new Temps(1,0);
      assert.ok(t.esPositiu());
    });
    it('no és positiu', function() {
      var t = new Temps(-1,0);
      assert.ok(!t.esPositiu());
    });
    it('zero és postiu', function() {
      var t = new Temps(0,0);
      assert.ok(t.esPositiu());
    });
  });
  describe('esNegatiu()', function() {
    it('és negatiu', function() {
      var t = new Temps(-1,0);
      assert.ok(t.esNegatiu());
    });
    it('no és negatiu', function() {
      var t = new Temps(1,0);
      assert.ok(!t.esNegatiu());
    });
    it('zero no és negatiu', function() {
      var t = new Temps(0,0);
      assert.ok(!t.esNegatiu());
    });
  });
  describe('abs()', function() {
    it('positiu', function() {
      var t = new Temps(1,30);
      assert.strictEqual(t.abs().minuts, 90);
    });
    it('negatiu', function() {
      var t = new Temps(-1,-30);
      assert.strictEqual(t.abs().minuts, 90);
    });
  });
  describe('suma()', function() {
    it('suma valors positius', function() {
      var t1 = new Temps(4,15);
      var t2 = new Temps(2,30);
      var t = t1.suma(t2);
      assert.strictEqual(t.minuts, 6*60+45);
    });
    it('suma valors negatius', function() {
      var t1 = new Temps(-5,0);
      var t2 = new Temps(-2,-15);
      var t = t1.suma(t2);
      assert.strictEqual(t.minuts, -(7*60+15));
    });
    it('suma valors positius i negatius', function() {
      var t1 = new Temps(5,30);
      var t2 = new Temps(-2,-40);
      var t = t1.suma(t2);
      assert.strictEqual(t.minuts, 2*60+50);
    });
  });
  describe('resta()', function() {
    it('resta valors positius', function() {
      var t1 = new Temps(5,45);
      var t2 = new Temps(2,15);
      var t = t1.resta(t2);
      assert.strictEqual(t.minuts, 3*60+30);
    });
    it('resta resultat negatiu', function() {
      var t1 = new Temps(2,10);
      var t2 = new Temps(3,30);
      var t = t1.resta(t2);
      assert.strictEqual(t.minuts, -(1*60+20));
    });
  });
  describe('format()', function() {
    it('representació ', function() {
      var t = new Temps(5,34);
      assert.strictEqual(t.format(), '5 hores i 34 minuts');
    });
  });
  describe('format()', function() {
    it('representació sense hores', function() {
      var t = new Temps(0,2);
      assert.strictEqual(t.format(), '2 minuts');
    });
    it('representació 1 hora i 1 minut', function() {
      var t = new Temps(1,1);
      assert.strictEqual(t.format(), '1 hora i 1 minut');
    });
    it('representació sense minuts', function() {
      var t = new Temps(5,0);
      assert.strictEqual(t.format(), '5 hores');
    });
    it('representació amb separador de milers', function() {
      var t = new Temps(3401,20);
      assert.strictEqual(t.format(), '3.401 hores i 20 minuts');
    });
    it('representació amb números negatius', function() {
      var t = new Temps(-25,-30);
      assert.strictEqual(t.format(), '-25 hores i 30 minuts');
    });
  });  
  describe('toString()', function() {
    it('representació String() ', function() {
      var t = new Temps(2,50);
      assert.strictEqual(String(t), '[minuts=170]');
    });
  });
});