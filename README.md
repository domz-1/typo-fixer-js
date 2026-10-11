# ✨ @domz-1/typo-fixer

[![npm version](https://img.shields.io/npm/v/@domz-1/typo-fixer.svg?style=flat-square)](https://www.npmjs.com/package/@domz-1/typo-fixer)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen.svg?style=flat-square)](https://bundlephobia.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg?style=flat-square)](https://www.typescriptlang.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square)](LICENSE)
[![Built with Bun](https://img.shields.io/badge/Built%20with-Bun-f472b6.svg?style=flat-square)](https://bun.sh)

> **Ultra-fast, zero-dependency bilingual typo fixer & accidental keyboard layout converter (Arabic ⇄ English)** for Node.js, Bun, browsers, and the CLI.

---

## ⚡ Features

- **🔀 Bilingual Layout Recovery**: Automatically recovers text typed while on the wrong keyboard layout:
  - English on Arabic layout: `sghl ugd;l` ➔ `سلام عليكم`, `;dt phg;` ➔ `كيف حالك`.
  - Arabic on English layout: `غخعفعلاث` ➔ `Youtube`, `لخخلمث` ➔ `Google`, `فثسف` ➔ `Test`.
- **✨ Common Typo Correction**: Corrects common English & Arabic misspellings (`teh wnat to amke pelase` ➔ `The want to make please`).
- **🔤 Sentence & Punctuation Auto-Formatting**: Capitalizes sentence beginnings and detects question words to append `?`.
- **🚀 Zero Dependencies**: Pure TypeScript/JavaScript with 0 external runtime dependencies. Lightning fast (< 0.1ms per execution).
- **📦 Dual ESM & CJS**: Full support for `import` and `require()` in Node.js, Bun, Next.js, Vite, and Deno.
- **🖥️ Built-in CLI**: Run anywhere with `npx @domz-1/typo-fixer`.

---

## 📥 Installation

```bash
# Using Bun (Recommended)
bun add @domz-1/typo-fixer

# Using npm
npm install @domz-1/typo-fixer

# Using pnpm / yarn
pnpm add @domz-1/typo-fixer
yarn add @domz-1/typo-fixer
```

---

## 🚀 Quick Start

### 1. Simple Correction (`fix`)

```typescript
import { fix } from "@domz-1/typo-fixer";

// Fix English typos
console.log(fix("teh wnat to amke pelase"));
// => "The want to make please"

// Fix accidental keyboard layout (Arabic -> English)
console.log(fix("غخعفعلاث"));
// => "Youtube"

// Fix accidental keyboard layout (English -> Arabic)
console.log(fix("sghl ugd;l"));
// => "سلام عليكم"

console.log(fix(";dt phg;"));
// => "كيف حالك"

// Auto question mark & capitalization
console.log(fix("how do you do thsi"));
// => "How do you do this?"
```

### 2. Detailed Inspection (`fixDetailed`)

Get comprehensive metadata, layout swap direction, and exact list of modifications made:

```typescript
import { fixDetailed } from "@domz-1/typo-fixer";

const result = fixDetailed("sghl ugd;l");

console.log(result);
/*
{
  original: 'sghl ugd;l',
  fixed: 'سلام عليكم',
  isChanged: true,
  layoutSwapped: true,
  layoutDirection: 'en-to-ar',
  changes: [
    { from: 'sghl ugd;l', to: 'سلام عليكم', type: 'layout' }
  ]
}
*/
```

### 3. Configurable Instance (`TypoFixer`)

```typescript
import { TypoFixer } from "@domz-1/typo-fixer";

const fixer = new TypoFixer({
  autoLayout: true,
  autoFormat: true,
  customSnippets: {
    brb: "be right back",
    ty: "thank you",
    gm: "good morning",
  },
  ignoreWords: ["customBrand"],
});

console.log(fixer.fix("gm, brb"));
// => "Good morning, be right back"

// Fluent API
fixer.addSnippet("np", "no problem");
console.log(fixer.fix("np"));
// => "No problem"
```

### 4. Direct Character Layout Translators

```typescript
import { enToAr, arToEn } from "@domz-1/typo-fixer";

console.log(enToAr("test"));
// => "فثسف"

console.log(arToEn("فثسف"));
// => "test"
```

---

## 💻 CLI Usage

You can use `typo-fixer` directly from your terminal with `npx` or `bun x`:

```bash
# Direct argument
npx @domz-1/typo-fixer "sghl ugd;l"
# => سلام عليكم

npx @domz-1/typo-fixer "teh wnat to amke pelase"
# => The want to make please

# Detailed JSON output
npx @domz-1/typo-fixer --json "غخعفعلاث"

# Pipe through stdin
echo "sghl" | npx @domz-1/typo-fixer
# => سلام
```

---

## 🛠️ Options Reference

| Option           | Type                     | Default | Description                                             |
| :--------------- | :----------------------- | :------ | :------------------------------------------------------ |
| `autoLayout`     | `boolean`                | `true`  | Automatically convert reversed Arabic ⇄ English layouts |
| `autoFormat`     | `boolean`                | `true`  | Capitalize sentences and add missing `?`                |
| `customSnippets` | `Record<string, string>` | `{}`    | Custom shortcuts & expansion dictionary                 |
| `ignoreWords`    | `string[]`               | `[]`    | Words that should never be modified                     |

---

## 🧪 Testing & Build

```bash
# Run unit tests with Bun
bun test

# Build ESM & CJS bundles + TypeScript declarations
bun run build

# Format codebase
bun run format
```

---

## 📄 License

MIT License © 2026 Adham ([@domz-1](https://github.com/domz-1))
