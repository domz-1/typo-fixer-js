// src/data.ts
var EN_TO_AR = {
  q: "ض",
  w: "ص",
  e: "ث",
  r: "ق",
  t: "ف",
  y: "غ",
  u: "ع",
  i: "ه",
  o: "خ",
  p: "ح",
  "[": "ج",
  "]": "د",
  a: "ش",
  s: "س",
  d: "ي",
  f: "ب",
  g: "ل",
  h: "ا",
  j: "ت",
  k: "ن",
  l: "م",
  ";": "ك",
  "'": "ط",
  z: "ئ",
  x: "ء",
  c: "ؤ",
  v: "ر",
  b: "لا",
  n: "ى",
  m: "ة",
  ",": "و",
  ".": "ز",
  "/": "ظ",
  "`": "ذ",
  "~": "ّ",
  Q: "َ",
  W: "ً",
  E: "ُ",
  R: "ٌ",
  T: "لإ",
  Y: "إ",
  U: "‘",
  I: "÷",
  O: "×",
  P: "؛",
  "{": "<",
  "}": ">",
  A: "ِ",
  S: "ٍ",
  D: "]",
  F: "[",
  G: "لأ",
  H: "أ",
  J: "ـ",
  K: "،",
  L: "/",
  ":": ":",
  '"': '"',
  Z: "~",
  X: "ْ",
  C: "}",
  V: "{",
  B: "لآ",
  N: "آ",
  M: "'",
  "<": ",",
  ">": ".",
  "?": "؟"
};
var AR_TO_EN = {};
for (const [k, v] of Object.entries(EN_TO_AR)) {
  AR_TO_EN[v] = k;
}
AR_TO_EN["لا"] = "b";
AR_TO_EN["لإ"] = "T";
AR_TO_EN["لأ"] = "G";
AR_TO_EN["لآ"] = "B";
var DEFAULT_COMMON_TYPOS = {
  teh: "the",
  wnat: "want",
  amke: "make",
  waht: "what",
  taht: "that",
  thsi: "this",
  thse: "these",
  wiht: "with",
  fro: "for",
  ot: "to",
  adn: "and",
  nad: "and",
  shcool: "school",
  becuase: "because",
  cuz: "because",
  bc: "because",
  bcoz: "because",
  definately: "definitely",
  definetly: "definitely",
  seperate: "separate",
  seperated: "separated",
  occured: "occurred",
  untill: "until",
  recieve: "receive",
  recieved: "received",
  recieving: "receiving",
  wierd: "weird",
  alot: "a lot",
  accommodate: "accommodate",
  accomodate: "accommodate",
  embarass: "embarrass",
  embarassed: "embarrassed",
  tommorrow: "tomorrow",
  tomorow: "tomorrow",
  neccessary: "necessary",
  necesary: "necessary",
  exiosn: "extension",
  exiossn: "extension",
  exison: "extension",
  exiosns: "extensions",
  shorcir: "shortcut",
  pelae: "please",
  pelase: "please",
  pleae: "please",
  pls: "please",
  plz: "please",
  speieng: "spelling",
  meistck: "mistake",
  mistakc: "mistake",
  etx: "text",
  past: "paste",
  kb: "keyboard",
  woneely: "wrongly",
  mistyeneg: "mistyping",
  punktuaion: "punctuation",
  arbci: "Arabic",
  wheil: "while",
  wokrirng: "working",
  woudl: "would",
  coudl: "could",
  shoudl: "should",
  idk: "I don't know",
  imo: "in my opinion",
  thx: "thanks",
  ty: "thank you",
  u: "you",
  ur: "your",
  r: "are",
  hes: "he's",
  shes: "she's",
  cant: "can't",
  wont: "won't",
  dont: "don't",
  didnt: "didn't",
  isnt: "isn't",
  arent: "aren't",
  couldnt: "couldn't",
  wouldnt: "wouldn't",
  shouldnt: "shouldn't",
  thats: "that's",
  whats: "what's",
  wheres: "where's",
  hows: "how's",
  whens: "when's",
  theres: "there's",
  theyre: "theyre",
  youre: "you're",
  weve: "we've",
  im: "I'm",
  ive: "I've",
  ill: "I'll",
  الان: "الآن",
  انشاءالله: "إن شاء الله",
  انشالله: "إن شاء الله",
  "انشاء الله": "إن شاء الله",
  لاكن: "لكن",
  هاذا: "هذا",
  هاذه: "هذه",
  اللذي: "الذي",
  التي: "التي",
  شكراا: "شكراً",
  شكرا: "شكراً",
  جدا: "جداً",
  ايضا: "أيضاً",
  دائما: "دائماً",
  مبروك: "مبارك"
};
var DEFAULT_ARABIC_WORDS = new Set([
  "سلام",
  "عليكم",
  "مرحبا",
  "اهلا",
  "أهلا",
  "الان",
  "الآن",
  "كيف",
  "حالك",
  "شكرا",
  "شكراً",
  "نعم",
  "لا",
  "صباح",
  "مساء",
  "الخير",
  "النور",
  "الله",
  "إن",
  "شاء",
  "في",
  "من",
  "على",
  "عن",
  "مع",
  "الى",
  "إلى",
  "هذا",
  "هذه",
  "ذلك",
  "تلك",
  "هو",
  "هي",
  "هم",
  "نحن",
  "أنا",
  "انا",
  "انت",
  "أنت",
  "انتم",
  "أنتم",
  "كان",
  "يكون",
  "تكون",
  "تم",
  "تطبيق",
  "نظام",
  "برنامج",
  "ملف",
  "كتابة",
  "عايز",
  "محتاج",
  "ممكن",
  "فين",
  "ليه",
  "ازاي",
  "إزاي",
  "شغال",
  "مش",
  "كله",
  "تمام",
  "يا",
  "اخي",
  "أخي",
  "جميل",
  "حلو",
  "كويس",
  "شكر",
  "معك",
  "معي",
  "عندي",
  "عندك",
  "فيه",
  "فيها",
  "منك",
  "مني",
  "جوجل",
  "يوتيوب",
  "فيسبوك",
  "تويتر",
  "واتساب",
  "انستغرام",
  "موقع",
  "صفحة",
  "رابط",
  "كود",
  "مشروع",
  "تطوير",
  "بيانات",
  "تصميم"
]);
var DEFAULT_ENGLISH_WORDS = new Set([
  "the",
  "be",
  "to",
  "of",
  "and",
  "a",
  "in",
  "that",
  "have",
  "i",
  "it",
  "for",
  "not",
  "on",
  "with",
  "he",
  "as",
  "you",
  "do",
  "at",
  "this",
  "but",
  "his",
  "by",
  "from",
  "they",
  "we",
  "say",
  "her",
  "she",
  "or",
  "an",
  "will",
  "my",
  "one",
  "all",
  "would",
  "there",
  "their",
  "what",
  "so",
  "up",
  "out",
  "if",
  "about",
  "who",
  "get",
  "which",
  "go",
  "me",
  "when",
  "make",
  "can",
  "like",
  "time",
  "no",
  "just",
  "him",
  "know",
  "take",
  "people",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "see",
  "other",
  "than",
  "then",
  "now",
  "look",
  "only",
  "come",
  "its",
  "over",
  "think",
  "also",
  "back",
  "after",
  "use",
  "two",
  "how",
  "our",
  "work",
  "first",
  "well",
  "way",
  "even",
  "new",
  "want",
  "because",
  "any",
  "these",
  "give",
  "day",
  "most",
  "us",
  "is",
  "are",
  "was",
  "were",
  "been",
  "has",
  "had",
  "google",
  "youtube",
  "github",
  "git",
  "docker",
  "node",
  "python",
  "react",
  "next",
  "vue",
  "code",
  "project",
  "test",
  "build",
  "run",
  "dev",
  "terminal",
  "extension",
  "file",
  "folder",
  "install",
  "setup",
  "server",
  "port",
  "host",
  "api",
  "url",
  "link",
  "data",
  "database",
  "user",
  "admin",
  "password",
  "email",
  "name",
  "search",
  "page",
  "website",
  "app",
  "error",
  "fix",
  "update",
  "remove",
  "delete",
  "create",
  "add",
  "edit",
  "view",
  "click",
  "press",
  "shortcut",
  "key",
  "value",
  "type",
  "number",
  "string",
  "function",
  "class"
]);

// src/index.ts
function enToAr(text) {
  let result = "";
  for (let i = 0;i < text.length; i++) {
    const c = text[i];
    result += EN_TO_AR[c] || c;
  }
  return result;
}
function arToEn(text) {
  const t = text.replace(/لإ/g, "T").replace(/لأ/g, "G").replace(/لآ/g, "B").replace(/لا/g, "b");
  let result = "";
  for (let i = 0;i < t.length; i++) {
    const c = t[i];
    result += AR_TO_EN[c] || c;
  }
  return result;
}
function isArabic(text) {
  return /[\u0600-\u06FF]/.test(text);
}
function isEnglish(text) {
  return /[a-zA-Z]/.test(text);
}
function detectAccidentalLayout(text, arabicWords = DEFAULT_ARABIC_WORDS, englishWords = DEFAULT_ENGLISH_WORDS, typoMap = DEFAULT_COMMON_TYPOS) {
  if (!text || !text.trim())
    return { text: "", swapped: false, direction: "none" };
  const hasAr = isArabic(text);
  const hasEn = isEnglish(text);
  if (hasAr && !hasEn) {
    const arWords = text.split(/\s+/).map((w) => w.replace(/[^\u0600-\u06FF]/g, "")).filter(Boolean);
    const validArCount = arWords.filter((w) => arabicWords.has(w)).length;
    const converted = arToEn(text);
    const enWords = converted.toLowerCase().split(/\s+/).map((w) => w.replace(/[^a-z]/g, "")).filter(Boolean);
    const validEnCount = enWords.filter((w) => englishWords.has(w) || typoMap[w]).length;
    if (validEnCount > 0 && (validEnCount >= enWords.length * 0.4 || validEnCount > validArCount)) {
      return { text: converted, swapped: true, direction: "ar-to-en" };
    }
    return { text, swapped: false, direction: "ar" };
  }
  if (!hasAr) {
    const converted = enToAr(text);
    const arWords = converted.split(/\s+/).map((w) => w.replace(/[^\u0600-\u06FF]/g, "")).filter(Boolean);
    const validArCount = arWords.filter((w) => arabicWords.has(w)).length;
    const enWords = text.toLowerCase().split(/\s+/).map((w) => w.replace(/[^a-z]/g, "")).filter(Boolean);
    const validEnCount = enWords.filter((w) => englishWords.has(w) || typoMap[w] || w.length <= 2).length;
    if (validArCount > 0 && (validArCount >= arWords.length * 0.35 || validArCount > validEnCount)) {
      return { text: converted, swapped: true, direction: "en-to-ar" };
    }
    if (validEnCount >= enWords.length * 0.4) {
      return { text, swapped: false, direction: "en" };
    }
    return { text, swapped: false, direction: "en" };
  }
  return { text, swapped: false, direction: "mixed" };
}
function correctWord(word, customMap = {}, typoMap = DEFAULT_COMMON_TYPOS, ignoreList = new Set) {
  const matchPunct = word.match(/^([^a-zA-Z0-9\u0600-\u06FF]*)(.*?)([^a-zA-Z0-9\u0600-\u06FF]*)$/);
  if (!matchPunct)
    return { word, changed: false };
  const prefix = matchPunct[1];
  const core = matchPunct[2];
  const suffix = matchPunct[3];
  if (!core)
    return { word, changed: false };
  const lowerCore = core.toLowerCase();
  if (ignoreList.has(lowerCore)) {
    return { word, changed: false };
  }
  if (customMap && customMap[lowerCore]) {
    return { word: prefix + customMap[lowerCore] + suffix, changed: true };
  }
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
function formatPunctuationAndCaps(text) {
  if (!text)
    return "";
  let t = text.trim();
  if (/^[a-z]/.test(t)) {
    t = t.charAt(0).toUpperCase() + t.slice(1);
  }
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
    "will"
  ];
  const firstWord = t.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "");
  if (questionWords.includes(firstWord) && !/[?.!]$/.test(t)) {
    t += "?";
  }
  return t;
}
function fixDetailed(text, options = {}) {
  if (!text || !text.trim()) {
    return {
      original: text,
      fixed: text,
      isChanged: false,
      layoutSwapped: false,
      layoutDirection: "none",
      changes: []
    };
  }
  let current = text;
  let layoutSwapped = false;
  let layoutDirection = "none";
  const changes = [];
  if (options.autoLayout !== false) {
    const layoutRes = detectAccidentalLayout(current);
    if (layoutRes.swapped) {
      changes.push({
        from: current,
        to: layoutRes.text,
        type: "layout"
      });
      current = layoutRes.text;
      layoutSwapped = true;
      layoutDirection = layoutRes.direction;
    }
  }
  const customMap = options.customSnippets || {};
  const ignoreSet = new Set((options.ignoreWords || []).map((w) => w.toLowerCase()));
  const chunks = current.split(/(\s+)/);
  current = chunks.map((chunk) => {
    if (/\s+/.test(chunk))
      return chunk;
    const res = correctWord(chunk, customMap, DEFAULT_COMMON_TYPOS, ignoreSet);
    if (res.changed) {
      changes.push({
        from: chunk,
        to: res.word,
        type: customMap[chunk.toLowerCase()] ? "snippet" : "typo"
      });
    }
    return res.word;
  }).join("");
  if (options.autoFormat !== false) {
    const formatted = formatPunctuationAndCaps(current);
    if (formatted !== current) {
      changes.push({
        from: current,
        to: formatted,
        type: "format"
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
    changes
  };
}
function fix(text, options = {}) {
  return fixDetailed(text, options).fixed;
}

class TypoFixer {
  options;
  constructor(options = {}) {
    this.options = {
      autoLayout: true,
      autoFormat: true,
      customSnippets: {},
      ignoreWords: [],
      ...options
    };
  }
  fix(text, overrideOptions) {
    return fix(text, { ...this.options, ...overrideOptions });
  }
  fixDetailed(text, overrideOptions) {
    return fixDetailed(text, { ...this.options, ...overrideOptions });
  }
  addSnippet(shortcut, expansion) {
    if (!this.options.customSnippets)
      this.options.customSnippets = {};
    this.options.customSnippets[shortcut.toLowerCase()] = expansion;
    return this;
  }
  addIgnoreWord(...words) {
    if (!this.options.ignoreWords)
      this.options.ignoreWords = [];
    this.options.ignoreWords.push(...words);
    return this;
  }
}
var src_default = {
  fix,
  fixDetailed,
  enToAr,
  arToEn,
  isArabic,
  isEnglish,
  detectAccidentalLayout,
  correctWord,
  formatPunctuationAndCaps,
  TypoFixer
};
export {
  isEnglish,
  isArabic,
  formatPunctuationAndCaps,
  fixDetailed,
  fix,
  enToAr,
  detectAccidentalLayout,
  src_default as default,
  correctWord,
  arToEn,
  TypoFixer,
  EN_TO_AR,
  DEFAULT_ENGLISH_WORDS,
  DEFAULT_COMMON_TYPOS,
  DEFAULT_ARABIC_WORDS,
  AR_TO_EN
};
