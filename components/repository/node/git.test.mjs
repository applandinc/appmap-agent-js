import { mkdir } from "fs/promises";
import { execSync } from "child_process";
import { strict as Assert } from "assert";
import { tmpdir } from "os";
import { buildTestDependenciesAsync } from "../../build.mjs";
import Git from "./git.mjs";

const { equal: assertEqual, throws: assertThrows } = Assert;
const { isArray } = Array;
const { random } = Math;

const testAsync = async () => {
  const { extractGitInformation } = Git(
    await buildTestDependenciesAsync(import.meta.url),
  );

  const url = "https://github.com/lachrist/sample.git";
  const path = `${tmpdir()}/${random().toString(36).substring(2)}`;

  assertThrows(() => extractGitInformation(path), /^AppmapError:.*ENOENT/);
  await mkdir(path);
  assertEqual(extractGitInformation(path), null);
  execSync(`git clone ${url} ${path}`, {
    stdio: "ignore",
  });

  {
    const infos = extractGitInformation(path);
    assertEqual(infos.repository, url);
    assertEqual(infos.branch, "main");
    assertEqual(typeof infos.commit, "string");
    assertEqual(isArray(infos.status), true);
    assertEqual(typeof infos.annotated_tag, "string");
    assertEqual(typeof infos.tag, "string");
    assertEqual(typeof infos.commits_since_annotated_tag, "number");
    assertEqual(typeof infos.commits_since_tag, "number");
  }
};

testAsync();
