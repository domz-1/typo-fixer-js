import { describe, expect, test } from "bun:test";
import {
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
} from "../src/index";

describe("typo-fixer npm package tests", () => {
  test("fix(): fixes common English typos", () => {
    expect(fix("teh wnat to amke pelase")).toBe("The want to make please");
    expect(fix("thsi is wierd")).toBe("This is weird");
    expect(fix("dont worry")).toBe("Don't worry");
  });

  test("fix(): converts accidental English on Arabic layout", () => {
    expect(fix("sghl ugd;l")).toBe("سلام عليكم");
    expect(fix(";dt phg;")).toBe("كيف حالك");
    expect(fix("hghk")).toBe("الآن");
  });

  test("fix(): converts accidental Arabic on English layout", () => {
    expect(fix("غخعفعلاث")).toBe("Youtube");
    expect(fix("لخخلمث")).toBe("Google");
    expect(fix("فثسف")).toBe("Test");
    expect(fix("ِةثثى 'خاشةثي ÷س فاث لاثسف غخعفعلاثق")).toBe(
      "Ameen Mohamed Is the best youtuber",
    );
  });

  test("fixDetailed(): returns comprehensive change metadata", () => {
    const res = fixDetailed("sghl ugd;l");
    expect(res.original).toBe("sghl ugd;l");
    expect(res.fixed).toBe("سلام عليكم");
    expect(res.layoutSwapped).toBe(true);
    expect(res.layoutDirection).toBe("en-to-ar");
    expect(res.isChanged).toBe(true);
  });

  test("enToAr() and arToEn() bidirectional conversion", () => {
    const en = "test";
    const ar = enToAr(en);
    expect(ar).toBe("فثسف");
    expect(arToEn(ar)).toBe(en);
  });

  test("isArabic() and isEnglish() helpers", () => {
    expect(isArabic("مرحبا")).toBe(true);
    expect(isArabic("hello")).toBe(false);
    expect(isEnglish("hello")).toBe(true);
    expect(isEnglish("مرحبا")).toBe(false);
  });

  test("formatPunctuationAndCaps(): capitalizes sentences and adds ?", () => {
    expect(formatPunctuationAndCaps("how are you doing")).toBe(
      "How are you doing?",
    );
    expect(formatPunctuationAndCaps("hello world")).toBe("Hello world");
  });

  test("TypoFixer class: supports custom snippets and ignore list", () => {
    const fixer = new TypoFixer({
      customSnippets: {
        gm: "Good morning",
        brb: "be right back",
      },
      ignoreWords: ["mybrand"],
    });

    expect(fixer.fix("gm and brb")).toBe("Good morning and be right back");
    expect(fixer.fix("teh wnat")).toBe("The want");
    expect(fixer.fix("mybrand wnat")).toBe("Mybrand want");

    // Fluent API
    fixer.addSnippet("np", "No problem");
    expect(fixer.fix("np")).toBe("No problem");
  });
});
