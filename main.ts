// The Moon Finally Answers Back
// Writes a single Moon comeback (1-240 chars) to /output/entry.txt.
import { mkdirSync, writeFileSync } from "node:fs";

const ENTRY =
  "Four billion years of wishes, howls, and 2 a.m. promises — and not one of you has ever wished ME a happy birthday.";

const MIN_CHARS = 1;
const MAX_CHARS = 240;

// Gate: the scorer only accepts UTF-8 text of 1-240 chars, not only
// whitespace, on a single line. Refuse to write anything that fails it.
function validateEntry(text: string): string {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `Entry is ${text.length} chars, must be ${MIN_CHARS}-${MAX_CHARS}.`,
    );
  }
  if (text.includes("\n") || text.trim().length === 0) {
    throw new Error("Entry must be a single non-blank line.");
  }
  // A scored one-liner must be clean printable text: reject control
  // characters (other than the line break already excluded above), which
  // would corrupt the entry or the scorer's read of it.
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if (code < 0x20 || code === 0x7f) {
      throw new Error(
        `Entry contains a control character U+${code.toString(16).toUpperCase().padStart(4, "0")}.`,
      );
    }
  }
  return text;
}

function writeEntry(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text + "\n", "utf8");
  console.log(`Wrote ${text.length} chars to /output/entry.txt`);
}

writeEntry(validateEntry(ENTRY));
