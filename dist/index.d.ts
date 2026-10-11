import type {
  TypoFixerOptions,
  FixDetailedResult,
  LayoutDetectionResult,
} from "./types";
export * from "./types";
export * from "./data";
/**
 * Convert English QWERTY characters to Arabic layout characters
 */
export declare function enToAr(text: string): string;
/**
 * Convert Arabic layout characters to English QWERTY characters
 */
export declare function arToEn(text: string): string;
/**
 * Check if a string contains Arabic characters
 */
export declare function isArabic(text: string): boolean;
/**
 * Check if a string contains Latin English characters
 */
export declare function isEnglish(text: string): boolean;
/**
 * Detect if text was typed using the wrong keyboard layout
 */
export declare function detectAccidentalLayout(
  text: string,
  arabicWords?: Set<string>,
  englishWords?: Set<string>,
  typoMap?: Record<string, string>,
): LayoutDetectionResult;
/**
 * Correct an individual word while preserving punctuation and capitalization
 */
export declare function correctWord(
  word: string,
  customMap?: Record<string, string>,
  typoMap?: Record<string, string>,
  ignoreList?: Set<string>,
): {
  word: string;
  changed: boolean;
};
/**
 * Format capitalization and punctuation
 */
export declare function formatPunctuationAndCaps(text: string): string;
/**
 * Fix text with detailed report
 */
export declare function fixDetailed(
  text: string,
  options?: TypoFixerOptions,
): FixDetailedResult;
/**
 * Fix text and return the clean string directly
 */
export declare function fix(text: string, options?: TypoFixerOptions): string;
/**
 * Default class for configurable instances
 */
export declare class TypoFixer {
  private options;
  constructor(options?: TypoFixerOptions);
  /**
   * Fix typos & layout and return the corrected string
   */
  fix(text: string, overrideOptions?: TypoFixerOptions): string;
  /**
   * Fix typos & layout and return a detailed result object
   */
  fixDetailed(
    text: string,
    overrideOptions?: TypoFixerOptions,
  ): FixDetailedResult;
  /**
   * Add custom snippet expansion (e.g. `brb` -> `Be right back`)
   */
  addSnippet(shortcut: string, expansion: string): this;
  /**
   * Add words to ignore list
   */
  addIgnoreWord(...words: string[]): this;
}
declare const _default: {
  fix: typeof fix;
  fixDetailed: typeof fixDetailed;
  enToAr: typeof enToAr;
  arToEn: typeof arToEn;
  isArabic: typeof isArabic;
  isEnglish: typeof isEnglish;
  detectAccidentalLayout: typeof detectAccidentalLayout;
  correctWord: typeof correctWord;
  formatPunctuationAndCaps: typeof formatPunctuationAndCaps;
  TypoFixer: typeof TypoFixer;
};
export default _default;
