const { expect, assert, expectSuccess } = require("../check.js");
const { expectVersion } = require("../version.js");
const { makeOptions } = require("./options.js");
const { makeAppmap } = require("../appmap.js");

const global_Reflect_getOwnPropertyDescriptor =
  Reflect.getOwnPropertyDescriptor;
const global_undefined = undefined;
const global_String = String;

{
  const Mocha = expectSuccess(
    () => require("mocha"),
    "could not load mocha module >> %s",
  );
  expect(
    typeof Mocha === "function",
    "mocha should be a function but got: %o",
    Mocha,
  );
  expect(
    global_Reflect_getOwnPropertyDescriptor(Mocha, "prototype") !==
      global_undefined,
    "missing mocha.prototype",
  );
  expect(
    typeof Mocha.prototype === "object" && Mocha.prototype !== null,
    "mocha.prototype should be a non-null object but got: %s",
    Mocha.prototype,
  );
  expect(
    global_Reflect_getOwnPropertyDescriptor(Mocha.prototype, "version") !==
      global_undefined,
    "mocha.prototype.version is missing",
  );
  expect(
    typeof Mocha.prototype.version === "string",
    "mocha.prototype.version should be a string but got: %o",
    Mocha.prototype.version,
  );
  expectVersion("mocha", Mocha.prototype.version, "8.0.0");
}

export default (dependencies) => {};

exports.makeMochaHooks = (process) => {
  const appmap = makeAppmap(makeOptions(process));

  process.on("exit", (code, signal) => {
    appmap.terminate({ type: "exit", code, signal });
  });

  let recording = null;

  const cache = { __proto__: null };

  return {
    beforeEach() {
      assert(recording === null);
      const suite = this.currentTest.parent.fullTitle();
      if (!(suite in cache)) {
        cache[suite] = 0;
      }
      const filename = `${suite}-${global_String(cache[suite])}`;
      cache[suite] += 1;
      recording = appmap.start({
        cwd: process.cwd(),
        recorder: "mocha",
        base: ".",
        "class-map-pruning": true,
        "event-pruning": false,
        "map-name": this.currentTest.fullTitle(),
        output: {
          "file-name": filename,
        },
      });
    },
    afterEach() {
      assert(recording !== null);
      recording.stop();
      recording = null;
    },
  };
};