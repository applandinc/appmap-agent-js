import { strict as Assert } from "assert";
import { AppmapExternalError } from "../../../util/index.mjs";
// import { visit } from "./visit.mjs";
import { test } from "./__fixture__.mjs";
import "./visit-program.mjs";
import "./visit-statement.mjs";
import "./visit-expression.mjs";
import "./visit-identifier.mjs";

Assert.throws(() => test(`$;`, { runtime: "$" }), AppmapExternalError);

test(`foo;`);

test(
  `
    $: while (true) {
      break $;
      continue $;
    }
  `,
  { runtime: "$" },
);

test(
  `
    export {foo as $};
    import {$ as foo} from "./bar.mjs";
  `,
  { type: "module", runtime: "$" },
);

test(
  `
    ({$: foo});
    foo.$;
  `,
  { runtime: "$" },
);