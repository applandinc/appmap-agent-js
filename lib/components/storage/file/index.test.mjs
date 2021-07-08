import FileSystem from "fs";
import { strict as Assert } from "assert";
import storage from "./index.mjs";

const unlinkSync = (path) => {
  try {
    FileSystem.unlinkSync(path);
  } catch (error) {
    Assert.equal(error.code, "ENOENT");
  }
};

const { store, storeAsync } = storage({}, {}).create({
  directory: "tmp",
});

unlinkSync("tmp/foo.appmap.json");
unlinkSync("tmp/foo-1.appmap.json");

store("foo", 123);
Assert.equal(
  JSON.parse(FileSystem.readFileSync("tmp/foo.appmap.json", "utf8")),
  123,
);
storeAsync("foo", 456).then(() => {
  Assert.equal(
    JSON.parse(FileSystem.readFileSync("tmp/foo-1.appmap.json", "utf8")),
    456,
  );
});