import { buildTestAsync } from "../../build/index.mjs";
import { generateLog } from "./log.mjs";

const testAsync = async () => {
  const { logInfo, logError } = generateLog("WARNING")(
    await buildTestAsync(import.meta),
  );
  logInfo("foo");
  logError("bar");
};

testAsync();