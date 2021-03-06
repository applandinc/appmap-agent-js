import { strict as Assert } from "assert";
import { buildTestDependenciesAsync } from "../../build.mjs";
import Track from "./track.mjs";

Error.stackTraceLimit = Infinity;

const {
  deepEqual: assertDeepEqual,
  // equal: assertEqual,
} = Assert;

const testAsync = async () => {
  const dependencies = await buildTestDependenciesAsync(import.meta.url);

  const { splitByTrack } = Track(dependencies);

  assertDeepEqual(
    splitByTrack([
      {
        type: "track",
        data: {
          type: "start",
          index: 123,
          configuration: { output: { filename: "filename" } },
        },
      },
      {
        type: "event",
        data: "event1",
      },
      {
        type: "track",
        data: {
          type: "pause",
          index: 123,
        },
      },
      {
        type: "event",
        data: "event2",
      },
      {
        type: "track",
        data: {
          type: "play",
          index: 123,
        },
      },
      {
        type: "event",
        data: "event3",
      },
    ]),
    [
      {
        configuration: { output: { filename: "filename" } },
        marks: [
          {
            type: "event",
            data: "event1",
          },
          {
            type: "event",
            data: "event3",
          },
        ],
      },
    ],
  );
};

testAsync();
