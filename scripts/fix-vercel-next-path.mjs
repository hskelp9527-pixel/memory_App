import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();
const baseName = path.basename(cwd);
const nextDir = path.join(cwd, ".next");
const nestedRoot = path.join(cwd, baseName);
const nestedNextDir = path.join(nestedRoot, ".next");

if (!fs.existsSync(nextDir)) {
  process.exit(0);
}

fs.mkdirSync(nestedRoot, { recursive: true });
fs.rmSync(nestedNextDir, { recursive: true, force: true });
fs.cpSync(nextDir, nestedNextDir, { recursive: true });

console.log(`Mirrored .next into ${path.relative(cwd, nestedNextDir)}`);
