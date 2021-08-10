/* eslint-env node */

import { resolve } from "path";
import { strict as Assert } from "assert";
import { buildDependenciesAsync } from "../../build.mjs";
import Configuration from "./index.mjs";

const { cwd } = process;
const {
  deepEqual: assertDeepEqual,
  // equal: assertEqual
} = Assert;

const testAsync = async () => {
  const {
    createConfiguration,
    extendConfiguration,
    extractEnvironmentConfiguration,
  } = Configuration(await buildDependenciesAsync(import.meta.url, "test"));

  const configuration = createConfiguration(cwd());

  const extend = (name, value1) => {
    const { [name]: value2 } = extendConfiguration(
      configuration,
      { [name]: value1 },
      cwd(),
    );
    return value2;
  };

  // extract //

  assertDeepEqual(
    extractEnvironmentConfiguration({
      APPMAP_FOO_BAR: "value1",
      QUX: "value2",
    }),
    { "foo-bar": "value1" },
  );

  // main //

  assertDeepEqual(extend("main", "foo.js"), resolve("foo.js"));

  // port //

  assertDeepEqual(
    extend("port", "unix-domain-socket"),
    `${cwd()}/unix-domain-socket`,
  );

  // language //

  assertDeepEqual(extend("language", "foo@bar"), {
    name: "foo",
    version: "bar",
  });

  assertDeepEqual(extend("language", { name: "foo", version: "bar" }), {
    name: "foo",
    version: "bar",
  });

  // recording //

  assertDeepEqual(extend("recording", "foo.bar"), {
    "defined-class": "foo",
    "method-id": "bar",
  });

  // frameworks //

  assertDeepEqual(extend("frameworks", ["foo@bar"]), [
    {
      name: "foo",
      version: "bar",
    },
  ]);

  // children //

  assertDeepEqual(extend("children", [["exec", "argv0"]]), [
    {
      fork: null,
      exec: "exec",
      argv: ["argv0"],
      configuration: {
        data: {},
        directory: cwd(),
      },
      options: {
        encoding: "utf8",
        cwd: cwd(),
        env: {},
        stdio: "inherit",
        timeout: 0,
        killSignal: "SIGTERM",
      },
    },
  ]);

  // output //

  assertDeepEqual(extend("output", "foo"), {
    directory: resolve("foo"),
    filename: null,
    postfix: ".appmap",
    indent: 0,
  });

  assertDeepEqual(extend("output", { filename: "foo" }), {
    directory: resolve("tmp", "appmap"),
    filename: "foo",
    postfix: ".appmap",
    indent: 0,
  });

  // enabled //

  assertDeepEqual(extend("enabled", true), [
    [{ source: "^", flags: "", basedir: cwd() }, true],
  ]);

  assertDeepEqual(extend("enabled", ["/foo"]), [
    [
      {
        source: "^\\/foo($|/[^/]*$)",
        flags: "",
        basedir: cwd(),
      },
      true,
    ],
  ]);

  // packages //

  assertDeepEqual(extend("packages", ["/foo"]), [
    [
      {
        source: "^\\/foo($|/[^/]*$)",
        flags: "",
        basedir: cwd(),
      },
      { shallow: false, enabled: true, exclude: [], source: null },
    ],
  ]);
};

testAsync();