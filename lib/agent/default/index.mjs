export default (dependencies) => {
  const {
    util: { createBox, getBox },
    "hook-apply": { hookApplyAsync },
    "hook-group": { hookGroupAsync },
    "hook-module": { hookModuleAsync, transformSourceDefault },
    frontend: {
      createFrontend,
      initializeFrontend,
      terminateFrontend,
      createTrack,
      controlTrack,
    },
    client: { createClient, executeClientAsync, sendClient, interruptClient },
  } = dependencies;
  return {
    createAgent: () => ({
      frontend: createFrontend(),
      client: createClient(),
      transform: createBox(transformSourceDefault),
    }),
    getCurrentTransformSource: ({ transform }) => getBox(transform),
    executeAgentAsync: async (
      { client, frontend, transform },
      configuration,
    ) => {
      const promise1 = executeClientAsync(client, configuration);
      sendClient(client, initializeFrontend(frontend, configuration));
      const promise2 = Promise.all([
        hookApplyAsync(promise1, client, frontend, configuration),
        hookGroupAsync(promise1, client, frontend, configuration),
        hookModuleAsync(promise1, client, frontend, configuration, transform),
      ]);
      const result = await promise1;
      await promise2;
      return result;
    },
    interruptAgent: ({ frontend, client }, reason) => {
      sendClient(client, terminateFrontend(frontend, reason));
      interruptClient(client);
    },
    createTrack: ({ frontend }, options) => createTrack(frontend, options),
    controlTrack: ({ client, frontend }, track, action) => {
      sendClient(client, controlTrack(frontend, track, action));
    },
  };
};