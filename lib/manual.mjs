import Configuration from "../dist/node-configuration.mjs";
import ManualRecorder from "../dist/node-recorder-manual.mjs";
import { createBlueprint } from "./blueprint.mjs";

const { createConfiguration, extendConfiguration } = Configuration({
  log: "info",
});

export const createAppmap = (repository, config, directory = null) => {
  const configuration = extendConfiguration(
    createConfiguration(repository),
    {... config, recorder: "manual"},
    directory,
  );
  const {Appmap} = ManualRecorder(createBlueprint(configuration));
  return new Appmap(configuration);
};
