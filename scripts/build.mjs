import { mkdir, readFile, writeFile } from "node:fs/promises";

const source = new URL("../src/ecowitt-ws90-card.js", import.meta.url);
const destination = new URL("../dist/ecowitt-ws90-card.js", import.meta.url);
const sourceCode = await readFile(source, "utf8");
const banner = [
  "/*",
  " * Ecowitt WS-90 Card",
  " * Home Assistant Lovelace custom card",
  " */",
  ""
].join("\n");

await mkdir(new URL("../dist/", import.meta.url), { recursive: true });
await writeFile(destination, `${banner}${sourceCode}`);

console.log("Built dist/ecowitt-ws90-card.js");
