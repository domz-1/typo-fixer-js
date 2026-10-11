#!/usr/bin/env node
import { fix, fixDetailed } from "../dist/index.mjs";
import fs from "fs";

const args = process.argv.slice(2);

if (args.includes("-h") || args.includes("--help")) {
  console.log(`
✨ TypoFixer CLI - Smart Bilingual Typo & Layout Fixer

Usage:
  typo-fixer "<text>"             Fix text and print result
  echo "<text>" | typo-fixer      Read from standard input
  typo-fixer --json "<text>"      Output detailed JSON analysis

Options:
  --json          Output detailed JSON result
  -v, --version   Show version
  -h, --help      Show this help menu

Examples:
  typo-fixer "teh wnat to amke pelase"   => "The want to make please"
  typo-fixer "sghl ugd;l"                => "سلام عليكم"
  typo-fixer "غخعفعلاث"                  => "Youtube"
`);
  process.exit(0);
}

if (args.includes("-v") || args.includes("--version")) {
  console.log("typo-fixer v1.0.0");
  process.exit(0);
}

const isJson = args.includes("--json");
const textArgs = args.filter((a) => a !== "--json");

function processText(input) {
  if (!input || !input.trim()) {
    process.exit(0);
  }
  if (isJson) {
    const res = fixDetailed(input);
    console.log(JSON.stringify(res, null, 2));
  } else {
    console.log(fix(input));
  }
}

if (textArgs.length > 0) {
  processText(textArgs.join(" "));
} else {
  // Read from stdin
  if (process.stdin.isTTY) {
    console.error(
      "Please provide text to fix. Run 'typo-fixer --help' for usage.",
    );
    process.exit(1);
  }
  let input = "";
  process.stdin.on("data", (chunk) => {
    input += chunk;
  });
  process.stdin.on("end", () => {
    processText(input.trim());
  });
}
