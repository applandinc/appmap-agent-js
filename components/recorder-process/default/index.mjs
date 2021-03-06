export default (dependencies) => {
  const {
    util: { assert },
    agent: {
      createAgent,
      executeAgentAsync,
      createTrack,
      controlTrack,
      interruptAgent,
    },
  } = dependencies;
  return {
    mainAsync: (process, configuration) => {
      const { recorder } = configuration;
      assert(recorder === "process", "expected process recorder");
      const agent = createAgent(configuration);
      const promise = executeAgentAsync(agent);
      const track = createTrack(agent, {});
      controlTrack(agent, track, "start");
      const errors = [];
      process.on("uncaughtExceptionMonitor", (error) => {
        errors.push(error);
      });
      process.on("exit", (status, signal) => {
        controlTrack(agent, track, "stop");
        interruptAgent(agent, { errors, status });
      });
      return promise;
    },
  };
};
