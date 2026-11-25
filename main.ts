// The Moon Finally Answers Back
// Writes a single Moon comeback (1-240 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Four billion years of wishes, howls, and 2 a.m. promises — and not one of you has ever wished ME a happy birthday.";

// Gate: the scorer only accepts UTF-8 text of 1-240 chars, not only whitespace,
// on a single line. Refuse to write anything that fails it.
if (ENTRY.length < 1 || ENTRY.length > 240) {
  throw new Error(`Entry is ${ENTRY.length} chars, must be 1-240.`);
}
if (ENTRY.includes("\n") || ENTRY.trim().length === 0) {
  throw new Error("Entry must be a single non-blank line.");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY + "\n", "utf8");
console.log(`Wrote ${ENTRY.length} chars to /output/entry.txt`);
