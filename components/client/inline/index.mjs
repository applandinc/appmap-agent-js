const _Promise = Promise;
export default ({
  util: { assert, createBox, setBox, getBox },
  backend: { openBackend, sendBackend, closeBackend },
}) => ({
  createClient: (configuration) => ({
    backend: openBackend(),
    box: createBox(null),
  }),
  executeClientAsync: ({ box }) =>
    new _Promise((resolve) => {
      assert(getBox(box) === null, "client is already running");
      setBox(box, resolve);
    }),
  interruptClient: ({ backend, box }) => {
    closeBackend(backend);
    getBox(box)();
  },
  sendClient: ({ backend }, message) => {
    if (message !== null) {
      sendBackend(backend, message);
    }
  },
});
