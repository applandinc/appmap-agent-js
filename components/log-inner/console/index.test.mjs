import { buildTestDependenciesAsync } from "../../build.mjs";
import LogInner from "./index.mjs";

const testAsync = async () => {
  const { logInfo } = LogInner(
    await buildTestDependenciesAsync(import.meta.url),
  );
  logInfo("foo %s", "bar");
};

testAsync();
