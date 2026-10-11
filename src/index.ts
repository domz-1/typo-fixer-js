import {
  EN_TO_AR,
  AR_TO_EN,
  DEFAULT_COMMON_TYPOS,
  DEFAULT_ARABIC_WORDS,
  DEFAULT_ENGLISH_WORDS,
} from "./data";
import type {
  TypoFixerOptions,
  FixDetailedResult,
  LayoutDetectionResult,
  LayoutDirection,
} from "./types";

export * from "./types";
export * from "./data";

/**
 * Convert English QWERTY characters to Arabic layout characters
 */
export function enToAr(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    result += EN_TO_AR[c] || c;
  }
  return result;
}

/**
 * Convert Arabic layout characters to English QWERTY characters
 */
export function arToEn(text: string): string {
  const t = text
    .replace(/لإ/g, "T")
    .replace(/لأ/g, "G")
    .replace(/لآ/g, "B")
    .replace(/لا/g, "b");
  let result = "";
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    result += AR_TO_EN[c] || c;
  }
  return result;
}

/**
 * Check if a string contains Arabic characters
 */
export function isArabic(text: string): boolean {
  return /[\u0600-\u06FF]/.test(text);
}

/**
 * Check if a string contains Latin English characters
 */
export function isEnglish(text: string): boolean {
  return /[a-zA-Z]/.test(text);
}

/**
 * Detect if text was typed using the wrong keyboard layout
 */
export function detectAccidentalLayout(
  text: string,
  arabicWords: Set<string> = DEFAULT_ARABIC_WORDS,
  englishWords: Set<string> = DEFAULT_ENGLISH_WORDS,
  typoMap: Record<string, string> = DEFAULT_COMMON_TYPOS,
): LayoutDetectionResult {
  if (!text || !text.trim())
    return { text: "", swapped: false, direction: "none" };

  const hasAr = isArabic(text);
  const hasEn = isEnglish(text);

  // 1. Text contains Arabic letters: check if it was typed accidentally instead of English
  if (hasAr && !hasEn) {
    const arWords = text
      .split(/\s+/)
      .map((w) => w.replace(/[^\u0600-\u06FF]/g, ""))
      .filter(Boolean);
    const validArCount = arWords.filter((w) => arabicWords.has(w)).length;

    const converted = arToEn(text);
    const enWords = converted
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/[^a-z]/g, ""))
      .filter(Boolean);
    const validEnCount = enWords.filter(
      (w) => englishWords.has(w) || typoMap[w],
    ).length;

    if (
      validEnCount > 0 &&
      (validEnCount >= enWords.length * 0.4 || validEnCount > validArCount)
    ) {
      return { text: converted, swapped: true, direction: "ar-to-en" };
    }
    return { text, swapped: false, direction: "ar" };
  }

  // 2. Text is in Latin/English layout or symbols: check if it was typed accidentally instead of Arabic
  if (!hasAr) {
    // Check if directly converting to Arabic produces valid Arabic words
    const converted = enToAr(text);
    const arWords = converted
      .split(/\s+/)
      .map((w) => w.replace(/[^\u0600-\u06FF]/g, ""))
      .filter(Boolean);
    const validArCount = arWords.filter((w) => arabicWords.has(w)).length;

    const enWords = text
      .toLowerCase()
      .split(/\s+/)
      .map((w) => w.replace(/[^a-z]/g, ""))
      .filter(Boolean);
    const validEnCount = enWords.filter(
      (w) => englishWords.has(w) || typoMap[w] || w.length <= 2,
    ).length;

    if (
      validArCount > 0 &&
      (validArCount >= arWords.length * 0.35 || validArCount > validEnCount)
    ) {
      return { text: converted, swapped: true, direction: "en-to-ar" };
    }

    if (validEnCount >= enWords.length * 0.4) {
      return { text, swapped: false, direction: "en" };
    }

    return { text, swapped: false, direction: "en" };
  }

  return { text, swapped: false, direction: "mixed" };
}

/**
 * Correct an individual word while preserving punctuation and capitalization
 */
export function correctWord(
  word: string,
  customMap: Record<string, string> = {},
  typoMap: Record<string, string> = DEFAULT_COMMON_TYPOS,
  ignoreList: Set<string> = new Set(),
): { word: string; changed: boolean } {
  const matchPunct = word.match(
    /^([^a-zA-Z0-9\u0600-\u06FF]*)(.*?)([^a-zA-Z0-9\u0600-\u06FF]*)$/,
  );
  if (!matchPunct) return { word, changed: false };

  const prefix = matchPunct[1];
  const core = matchPunct[2];
  const suffix = matchPunct[3];

  if (!core) return { word, changed: false };

  const lowerCore = core.toLowerCase();
  if (ignoreList.has(lowerCore)) {
    return { word, changed: false };
  }

  // 1. Custom user snippet expansions
  if (customMap && customMap[lowerCore]) {
    return { word: prefix + customMap[lowerCore] + suffix, changed: true };
  }

  // 2. Common typo map
  if (typoMap[lowerCore]) {
    let rep = typoMap[lowerCore];
    if (core === core.toUpperCase() && core.length > 1) {
      rep = rep.toUpperCase();
    } else if (core[0] === core[0].toUpperCase()) {
      rep = rep.charAt(0).toUpperCase() + rep.slice(1);
    }
    return { word: prefix + rep + suffix, changed: true };
  }

  return { word, changed: false };
}

/**
 * Format capitalization and punctuation
 */
export function formatPunctuationAndCaps(text: string): string {
  if (!text) return "";
  let t = text.trim();

  // Capitalize first English letter
  if (/^[a-z]/.test(t)) {
    t = t.charAt(0).toUpperCase() + t.slice(1);
  }

  // Detect English question
  const questionWords = [
    "what",
    "who",
    "where",
    "when",
    "why",
    "how",
    "is",
    "are",
    "can",
    "could",
    "would",
    "do",
    "does",
    "did",
    "should",
    "will",
  ];
  const firstWord = t
    .split(/\s+/)[0]
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  if (questionWords.includes(firstWord) && !/[?.!]$/.test(t)) {
    t += "?";
  }

  return t;
}

/**
 * Fix text with detailed report
 */
export function fixDetailed(
  text: string,
  options: TypoFixerOptions = {},
): FixDetailedResult {
  if (!text || !text.trim()) {
    return {
      original: text,
      fixed: text,
      isChanged: false,
      layoutSwapped: false,
      layoutDirection: "none",
      changes: [],
    };
  }

  let current = text;
  let layoutSwapped = false;
  let layoutDirection: LayoutDirection = "none";
  const changes: FixDetailedResult["changes"] = [];

  // 1. Accidental layout swap
  if (options.autoLayout !== false) {
    const layoutRes = detectAccidentalLayout(current);
    if (layoutRes.swapped) {
      changes.push({
        from: current,
        to: layoutRes.text,
        type: "layout",
      });
      current = layoutRes.text;
      layoutSwapped = true;
      layoutDirection = layoutRes.direction;
    }
  }

  // 2. Word corrections
  const customMap = options.customSnippets || {};
  const ignoreSet = new Set(
    (options.ignoreWords || []).map((w) => w.toLowerCase()),
  );
  const chunks = current.split(/(\s+)/);

  current = chunks
    .map((chunk) => {
      if (/\s+/.test(chunk)) return chunk;
      const res = correctWord(
        chunk,
        customMap,
        DEFAULT_COMMON_TYPOS,
        ignoreSet,
      );
      if (res.changed) {
        changes.push({
          from: chunk,
          to: res.word,
          type: customMap[chunk.toLowerCase()] ? "snippet" : "typo",
        });
      }
      return res.word;
    })
    .join("");

  // 3. Formatting
  if (options.autoFormat !== false) {
    const formatted = formatPunctuationAndCaps(current);
    if (formatted !== current) {
      changes.push({
        from: current,
        to: formatted,
        type: "format",
      });
      current = formatted;
    }
  }

  return {
    original: text,
    fixed: current,
    isChanged: current !== text,
    layoutSwapped,
    layoutDirection,
    changes,
  };
}

/**
 * Fix text and return the clean string directly
 */
export function fix(text: string, options: TypoFixerOptions = {}): string {
  return fixDetailed(text, options).fixed;
}

/**
 * Default class for configurable instances
 */
export class TypoFixer {
  private options: TypoFixerOptions;

  constructor(options: TypoFixerOptions = {}) {
    this.options = {
      autoLayout: true,
      autoFormat: true,
      customSnippets: {},
      ignoreWords: [],
      ...options,
    };
  }

  /**
   * Fix typos & layout and return the corrected string
   */
  public fix(text: string, overrideOptions?: TypoFixerOptions): string {
    return fix(text, { ...this.options, ...overrideOptions });
  }

  /**
   * Fix typos & layout and return a detailed result object
   */
  public fixDetailed(
    text: string,
    overrideOptions?: TypoFixerOptions,
  ): FixDetailedResult {
    return fixDetailed(text, { ...this.options, ...overrideOptions });
  }

  /**
   * Add custom snippet expansion (e.g. `brb` -> `Be right back`)
   */
  public addSnippet(shortcut: string, expansion: string): this {
    if (!this.options.customSnippets) this.options.customSnippets = {};
    this.options.customSnippets[shortcut.toLowerCase()] = expansion;
    return this;
  }

  /**
   * Add words to ignore list
   */
  public addIgnoreWord(...words: string[]): this {
    if (!this.options.ignoreWords) this.options.ignoreWords = [];
    this.options.ignoreWords.push(...words);
    return this;
  }
}

// Default export
export default {
  fix,
  fixDetailed,
  enToAr,
  arToEn,
  isArabic,
  isEnglish,
  detectAccidentalLayout,
  correctWord,
  formatPunctuationAndCaps,
  TypoFixer,
};
