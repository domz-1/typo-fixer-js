export type LayoutDirection =
  "en-to-ar" | "ar-to-en" | "none" | "en" | "ar" | "mixed";
export interface LayoutDetectionResult {
  text: string;
  swapped: boolean;
  direction: LayoutDirection;
}
export interface TypoFixerOptions {
  /**
   * Automatically detect and swap accidental keyboard layout (Arabic <-> English).
   * @default true
   */
  autoLayout?: boolean;
  /**
   * Automatically capitalize sentences and detect missing question marks.
   * @default true
   */
  autoFormat?: boolean;
  /**
   * Custom dictionary of typos or word expansions (e.g. { "ty": "Thank you" }).
   * @default {}
   */
  customSnippets?: Record<string, string>;
  /**
   * Words to ignore and never autocorrect.
   * @default []
   */
  ignoreWords?: string[];
}
export interface FixDetailedResult {
  /** Original input text */
  original: string;
  /** Resulting corrected text */
  fixed: string;
  /** Whether any modification was made */
  isChanged: boolean;
  /** Whether the keyboard layout was converted (Arabic <-> English) */
  layoutSwapped: boolean;
  /** Direction of keyboard layout swap */
  layoutDirection: LayoutDirection;
  /** List of words that were corrected */
  changes: Array<{
    from: string;
    to: string;
    type: "layout" | "typo" | "format" | "snippet";
  }>;
}
