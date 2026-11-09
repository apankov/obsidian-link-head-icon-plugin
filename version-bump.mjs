// Runs from `npm version <patch|minor|major>`: copies the new package.json
// version into manifest.json and records it in versions.json together with
// the current minAppVersion.
import { readFileSync, writeFileSync } from "node:fs";
import process from "node:process";

const targetVersion = process.env.npm_package_version;
if (!targetVersion) {
	throw new Error("Run this through `npm version`, which sets npm_package_version.");
}

const write = (file, data) => writeFileSync(file, JSON.stringify(data, null, 2) + "\n");

const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
manifest.version = targetVersion;
write("manifest.json", manifest);

const versions = JSON.parse(readFileSync("versions.json", "utf8"));
versions[targetVersion] = manifest.minAppVersion;
write("versions.json", versions);
