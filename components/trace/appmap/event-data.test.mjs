import { strict as Assert } from "assert";
import {
  buildTestDependenciesAsync,
  buildTestComponentAsync,
} from "../../build.mjs";
import Classmap from "./classmap.mjs";
import EventData from "./event-data.mjs";

Error.stackTraceLimit = Infinity;

const {
  deepEqual: assertDeepEqual,
  throws: assertThrows,
  // equal: assertEqual,
} = Assert;

const testAsync = async () => {
  const dependencies = await buildTestDependenciesAsync(import.meta.url);
  const { createConfiguration, extendConfiguration } =
    await buildTestComponentAsync("configuration", "test");
  const { createClassmap, addClassmapFile } = Classmap(dependencies);
  const {
    compileBeforeEventData,
    compileAfterEventData,
    compileParameterPrimitive,
    compileExceptionSerial,
    compileParameterSerial,
  } = EventData(dependencies);
  const configuration = extendConfiguration(createConfiguration("/cwd"), {
    "function-name-placeholder": "$",
  });
  const classmap = createClassmap(configuration);
  addClassmapFile(classmap, {
    index: 123,
    path: "/cwd/filename.js",
    type: "script",
    code: "function f (x) {}",
    exclude: [],
  });

  ////////////
  // serial //
  ////////////

  // compileParameterSerial //

  assertDeepEqual(
    compileParameterSerial([
      "name",
      { type: "string", truncated: true, print: "print" },
    ]),
    {
      name: "name",
      object_id: null,
      class: "string",
      value: "print ...",
    },
  );

  assertDeepEqual(
    compileParameterSerial([
      "name",
      {
        index: 123,
        constructor: "constructor",
        type: "object",
        print: "print",
      },
    ]),
    {
      name: "name",
      object_id: 123,
      class: "constructor",
      value: "print",
    },
  );

  // compileParameterPrimitive //

  assertDeepEqual(compileParameterPrimitive(["name", "primitive"]), {
    name: "name",
    object_id: null,
    class: "string",
    value: "primitive",
  });

  // compileExceptionSerial //

  assertDeepEqual(
    compileExceptionSerial({
      index: 123,
      constructor: "constructor",
      truncated: false,
      print: "print",
      specific: { type: "error", stack: "stack", message: "message" },
    }),
    {
      object_id: 123,
      class: "constructor",
      message: "message",
      path: "stack",
      lineno: null,
    },
  );

  assertDeepEqual(
    compileExceptionSerial({
      type: "string",
      print: "print",
    }),
    {
      object_id: null,
      class: "string",
      message: null,
      path: null,
      lineno: null,
    },
  );

  ////////////////////////
  // compileBeforeEvent //
  ////////////////////////

  // invalid //
  assertThrows(
    () => compileBeforeEventData({ type: "invalid" }),
    /^AssertionError: invalid \(before\) event type/,
  );

  // test //
  assertDeepEqual(compileBeforeEventData({ type: "test" }), {});

  // apply >> routing //
  assertDeepEqual(
    compileBeforeEventData(
      {
        type: "apply",
        function: "123/body/0",
        this: { type: "string", print: "print-this" },
        arguments: [{ type: "string", print: "print-arg" }],
      },
      classmap,
    ),
    {
      defined_class: "f",
      lineno: 1,
      method_id: "$",
      static: false,
      path: "filename.js",
      parameters: [
        {
          class: "string",
          name: "x",
          object_id: null,
          value: "print-arg",
        },
      ],
      receiver: {
        class: "string",
        name: "this",
        object_id: null,
        value: "print-this",
      },
    },
  );

  // apply >> missing routing //
  assertDeepEqual(
    compileBeforeEventData(
      {
        type: "apply",
        function: null,
        this: { type: "string", print: "print-this" },
        arguments: [{ type: "string", print: "print-arg" }],
      },
      classmap,
    ),
    {
      defined_class: "MANUFACTURED_APPMAP_CLASS",
      lineno: 0,
      method_id: "MANUFACTURED_APPMAP_METHOD",
      static: false,
      path: "MANUFACTURED_APPMAP_FILE.js",
      parameters: [],
      receiver: {
        class: "string",
        name: "this",
        object_id: null,
        value: "print-this",
      },
    },
  );

  // query //
  assertDeepEqual(
    compileBeforeEventData({
      type: "query",
      database: "database",
      version: "version",
      sql: "sql",
      parameters: [{ type: "string", print: "print" }],
    }),
    {
      sql_query: {
        database_type: "database",
        server_version: "version",
        sql: "sql",
        explain_sql: null,
      },
      message: [
        {
          name: "0",
          object_id: null,
          class: "string",
          value: "print",
        },
      ],
    },
  );

  // request >> message //
  assertDeepEqual(
    compileBeforeEventData({
      type: "request",
      method: "GET",
      protocol: "HTTP/1.1",
      url: "http://host:8080/path?search=param#hash",
      headers: {},
    }),
    {
      http_client_request: {
        request_method: "GET",
        url: "http://host:8080/path",
        headers: {},
      },
      message: [
        {
          name: "search",
          object_id: null,
          class: "string",
          value: "param",
        },
      ],
    },
  );
  // request >> headers //
  assertDeepEqual(
    compileBeforeEventData({
      type: "request",
      method: "GET",
      protocol: "HTTP/1.1",
      url: "/path",
      headers: { HOST: "host:8080" },
    }),
    {
      http_client_request: {
        request_method: "GET",
        url: "http://host:8080/path",
        headers: { HOST: "host:8080" },
      },
      message: [],
    },
  );

  // response >> message //
  assertDeepEqual(
    compileBeforeEventData({
      type: "response",
      method: "GET",
      protocol: "HTTP/1.1",
      url: "http://host:8080/path/info?search=param#hash",
      route: "/path/:info",
      headers: {},
    }),
    {
      http_server_request: {
        request_method: "GET",
        path_info: "/path/info",
        normalized_path_info: "/path/:info",
        protocol: "HTTP/1.1",
        authorization: null,
        mime_type: null,
        headers: {},
      },
      message: [
        {
          name: ":info",
          object_id: null,
          class: "string",
          value: "info",
        },
        {
          name: "search",
          object_id: null,
          class: "string",
          value: "param",
        },
      ],
    },
  );
  // response >> headers //
  assertDeepEqual(
    compileBeforeEventData({
      type: "response",
      method: "GET",
      protocol: "HTTP/1.1",
      url: "/path",
      route: null,
      headers: {
        AUTHORIZATION: "authorization",
        "CONTENT-TYPE": "content-type",
      },
    }),
    {
      http_server_request: {
        request_method: "GET",
        path_info: "/path",
        normalized_path_info: null,
        protocol: "HTTP/1.1",
        authorization: "authorization",
        mime_type: "content-type",
        headers: {
          AUTHORIZATION: "authorization",
          "CONTENT-TYPE": "content-type",
        },
      },
      message: [],
    },
  );

  ///////////////////////
  // compileAfterEvent //
  ///////////////////////

  // invalid //
  assertThrows(
    () => compileAfterEventData({ type: "invalid" }),
    /^AssertionError: invalid \(after\) event type/,
  );

  // test //
  assertDeepEqual(compileAfterEventData({ type: "test" }), {});

  // apply >> success //
  assertDeepEqual(
    compileAfterEventData(
      {
        type: "apply",
        error: null,
        result: { type: "string", print: "print" },
      },
      classmap,
    ),
    {
      exceptions: null,
      return_value: {
        class: "string",
        name: "return",
        object_id: null,
        value: "print",
      },
    },
  );
  // apply >> failure //
  assertDeepEqual(
    compileAfterEventData(
      {
        type: "apply",
        error: {
          index: 123,
          constructor: "constructor",
          print: "print",
          specific: { type: "error", message: "message", stack: "stack" },
        },
        result: null,
      },
      classmap,
    ),
    {
      exceptions: [
        {
          object_id: 123,
          class: "constructor",
          message: "message",
          path: "stack",
          lineno: null,
        },
      ],
      return_value: null,
    },
  );
  // query //
  assertDeepEqual(
    compileAfterEventData(
      {
        type: "query",
      },
      classmap,
    ),
    {},
  );
  // request //
  assertDeepEqual(
    compileAfterEventData(
      {
        type: "request",
        status: 200,
        headers: { "CONTENT-TYPE": "content-type" },
      },
      classmap,
    ),
    {
      http_client_response: {
        status_code: 200,
        mime_type: "content-type",
        headers: { "CONTENT-TYPE": "content-type" },
      },
    },
  );
  // response //
  assertDeepEqual(
    compileAfterEventData(
      {
        type: "response",
        status: 200,
        headers: { "CONTENT-TYPE": "content-type" },
      },
      classmap,
    ),
    {
      http_server_response: {
        status_code: 200,
        mime_type: "content-type",
      },
    },
  );
};

testAsync();
