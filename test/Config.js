import assert from "assert";
import Config from "../src/Config.js";
import fs from 'fs'

describe("Config", function() {
  describe("getVersion()", function() {  
    it("coherència entre versions", function() {
      let manifest = JSON.parse(fs.readFileSync("src/manifest.json"));
      assert.strictEqual(Config.getVersion(), manifest["version"]);
    });
  });
});