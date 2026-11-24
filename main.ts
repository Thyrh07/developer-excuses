// Make the AI Judge Laugh: Developer Excuses — entry program (v2)
// Writes one funny single-line developer excuse to /output/entry.txt
// (1-200 chars, single line, no trailing newline).
// v2: gate validation hardened — explicit single-line split check, UTF-8
// byte count alongside char count, and a no-trailing-newline guard.
import { mkdirSync, writeFileSync } from "node:fs";

const EXCUSE =
  "Two reviewers approved it. Each thought the other one read it.";
const OUTPUT = "/output/entry.txt";
const MIN_CHARS = 1;
const MAX_CHARS = 200;

function validate(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(`excuse must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (text.split("\n").length !== 1) {
    throw new Error("excuse must be exactly one line");
  }
  if (text.endsWith("\n")) {
    throw new Error("excuse must not end with a newline");
  }
  const bytes = Buffer.byteLength(text, "utf8");
  if (bytes > MAX_CHARS) {
    throw new Error(`excuse must be at most ${MAX_CHARS} bytes, got ${bytes}`);
  }
}

validate(EXCUSE);

mkdirSync("/output", { recursive: true });
writeFileSync(OUTPUT, EXCUSE, "utf8");
console.log(`wrote ${EXCUSE.length} chars to ${OUTPUT}`);
