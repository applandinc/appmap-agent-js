
import {buildProdAsync} from "../build/index.mjs";

const {main:{mainAsync}} = await buildProdAsync(["main"], {
  violation: "exit",
  client: "inline",
  "interpretation": "node",
  "instrumentation": "default",
  "hook-module": "node",
  "hook-group": "node",
  "hook-query": "node",
  main: "process",
});

mainAsync(process);
