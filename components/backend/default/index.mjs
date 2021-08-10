export default (dependencies) => {
  const {
    util: { assert, createBox, setBox, getBox },
    expect: { expectSuccess },
    storage: { createStorage, store },
    trace: { compileTrace },
  } = dependencies;
  const persist = (trace, configuration, reason) => {
    const storage = createStorage(configuration);
    for (const { name, data } of compileTrace(configuration, trace, reason)) {
      expectSuccess(
        () => store(storage, name, data),
        "failed to store appmap >> %e",
      );
    }
  };
  return {
    openBackend: () => ({
      trace: [],
      box: createBox(null),
    }),
    sendBackend: ({ trace, box }, { type, data }) => {
      if (type === "trace") {
        trace.push(data);
      } else if (type === "initialize") {
        assert(getBox(box) === null, "backend has already been initialized");
        setBox(box, data);
      } else if (type === "terminate") {
        const configuration = getBox(box);
        assert(configuration !== null, "backend is not currently running");
        setBox(box, null);
        persist(trace, configuration, data);
      } else {
        assert(false, "invalid message type", type);
      }
    },
    closeBackend: ({ trace, box }) => {
      const configuration = getBox(box);
      if (configuration !== null) {
        setBox(box, null);
        persist(trace, configuration, {
          errors: [{ name: "AppmapError", message: "client disconnection" }],
          status: 1,
        });
      }
    },
  };
};