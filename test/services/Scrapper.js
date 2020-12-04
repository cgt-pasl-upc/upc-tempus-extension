import assert from "assert";
import sinon from "sinon";
import jQuery from "jquery";
import { JSDOM } from "jsdom";
import fs from "fs";
import Temps from "../../src/models/Temps.js";
import Scrapper from "../../src/services/Scrapper.js";
import PermisManager from "../../src/services/PermisManager.js";

describe("Scrapper", function() {

  var stubs = {};
  var sandbox = sinon.createSandbox();

  function stubCreate(name) {
    var stub = sandbox.stub($, name);
    stub.callsFake(function () {
      var deferred = $.Deferred();
      deferred.resolve("");
      return deferred;
    });
    stubs[name] = stub;
  }

  function stubSetUrl(stub, filename) {
    var html = fs.readFileSync(`test/fixtures/${filename}.html`, "utf-8");
    var json = fs.readFileSync(`test/fixtures/${filename}.json`, "utf-8");
    stub.callsFake(function (url) {
      var deferred = $.Deferred();
      deferred.resolve(html);
      return deferred;
    });
    return JSON.parse(json);
  }

  function stubGetSetUrl(url, filename) {
    return stubSetUrl(stubs["get"].withArgs(`https://tempus.upc.edu/RLG/${url}`), filename);
  }

  function stubPageJQuery(html = "") {
    var jsdom = new JSDOM(html);
    global.document = jsdom.document;    
    global.window = jsdom.window;
    global.$ = global.jQuery = new jQuery(jsdom.window);
  }

  function stubPageSetContent(filename) {
    var html = fs.readFileSync(`test/fixtures/${filename}.html`, "utf-8");
    var json = fs.readFileSync(`test/fixtures/${filename}.json`, "utf-8");
    stubPageJQuery(html);
    return JSON.parse(json);
  }


  before(function() {
    stubPageJQuery();

    sinon.stub(PermisManager, "createPermisDiesPerNom").callsFake(function(data, temps) {
      return `${data} | ${temps}`;
    });
    sinon.stub(PermisManager, "createPermisHoresPerNom").callsFake(function(data, temps, nom) {
      return `${data} | ${temps.formatCurt()} | ${nom}`;
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe("getPermisosPerDies()", function() {
    beforeEach(function () {
      stubCreate("get");
    });

    it("sense permisos", async function() {
      await Scrapper.getPermisosPerDies("01/01/2020","02/02/2020").then(function(permisos) {
        assert.deepStrictEqual([], permisos);
      });
    });
    it("test 01", async function() {
      var data1 = stubGetSetUrl("permisDies/list?filtreAnyGaudiment=Tots&dataInici=01/01/2020&dataFi=02/02/2020&max=30&offset=0", "permisDies.test01.00-29");
      var data2 = stubGetSetUrl("permisDies/list?filtreAnyGaudiment=Tots&dataInici=01/01/2020&dataFi=02/02/2020&max=30&offset=30", "permisDies.test01.30-59");

      await Scrapper.getPermisosPerDies("01/01/2020","02/02/2020").then(function(permisos) {
        assert.deepStrictEqual(permisos, [].concat(data1, data2));
      });
    });

  });

  describe("getPermisosPerHores()", function() {
    beforeEach(function () {
      stubCreate("get");
    });

    it("sense permisos", async function() {
      await Scrapper.getPermisosPerHores("01/01/2020","02/02/2020").then(function(permisos) {
        assert.deepStrictEqual(permisos, []);
      });
    });
    it("test 01", async function() {
      var data1 = stubGetSetUrl("permisHores/list?dataInici=01/01/2020&dataFi=02/02/2020&_action_list=Cerca&max=30&offset=0", "permisHores.test01.00-29");
      var data2 = stubGetSetUrl("permisHores/list?dataInici=01/01/2020&dataFi=02/02/2020&_action_list=Cerca&max=30&offset=30", "permisHores.test01.30-59");
      
      await Scrapper.getPermisosPerHores("01/01/2020","02/02/2020").then(function(permisos) {
        assert.deepStrictEqual(permisos, [].concat(data1, data2));
      });
    });

  });

  describe("getPermisos()", function() {
    beforeEach(function () {
      stubCreate("get");
    });

    it("sense permisos", async function() {
      await Scrapper.getPermisos("01/01/2020","02/02/2020").then(function(permisos) {
        assert.deepStrictEqual(permisos, []);
      });
    });
    it("test 01", async function() {
      var data1 = stubGetSetUrl("permisDies/list?filtreAnyGaudiment=Tots&dataInici=01/01/2020&dataFi=02/02/2020&max=30&offset=0", "permisDies.test01.00-29");
      var data2 = stubGetSetUrl("permisDies/list?filtreAnyGaudiment=Tots&dataInici=01/01/2020&dataFi=02/02/2020&max=30&offset=30", "permisDies.test01.30-59");
      var data3 = stubGetSetUrl("permisHores/list?dataInici=01/01/2020&dataFi=02/02/2020&_action_list=Cerca&max=30&offset=0", "permisHores.test01.00-29");
      var data4 = stubGetSetUrl("permisHores/list?dataInici=01/01/2020&dataFi=02/02/2020&_action_list=Cerca&max=30&offset=30", "permisHores.test01.30-59");

      await Scrapper.getPermisos("01/01/2020","02/02/2020").then(function(permisos) {
        assert.deepStrictEqual(permisos, [].concat(data1, data2, data3, data4));
      });
    });
  });

  describe("getSaldo()", function() {
    it("obtenir saldo mensual", function() {
      sinon.stub(Temps, "fromString").callsFake(function(s) {
        return s;
      });

      var data = stubPageSetContent("saldoMensual.test01");

      var saldo = Scrapper.getSaldo();

      assert.deepStrictEqual(saldo, data);
    });
  });
});