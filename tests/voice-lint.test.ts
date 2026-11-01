import { describe, expect, test } from "bun:test";
import { bannedWords, markdownFiles, proseOnly, read, rel } from "./lib";

// do-not-say.md lists the banned words, and voice.md quotes them as
// counter-examples, so those two skip the word check but not punctuation.
const WORD_CHECK_SKIP = ["foundation/do-not-say.md", "foundation/voice.md"];
// LICENSE-style legal text and the changelog format aren't prose we write.
const PUNCT_CHECK_SKIP = ["CHANGELOG.md"];

const PUNCT: [RegExp, string][] = [
  [/\u2014/, "em dash"],
  [/\u2013/, "en dash"],
  [/;/, "semicolon"],
  [/!(?!\[)/, "exclamation mark"],
];

function escape(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const words = bannedWords();

test("do-not-say.md has banned words for the lint to use", () => {
  expect(words.length).toBeGreaterThan(5);
});

for (const file of markdownFiles()) {
  const name = rel(file);
  describe(name, () => {
    const lines = proseOnly(read(file));

    if (!PUNCT_CHECK_SKIP.includes(name)) {
      test("no banned punctuation in prose", () => {
        const hits: string[] = [];
        lines.forEach((line, i) => {
          if (line.startsWith("<!--")) return;
          for (const [re, label] of PUNCT) {
            if (re.test(line)) hits.push(`line ${i + 1}: ${label}`);
          }
        });
        expect(hits).toEqual([]);
      });
    }

    if (!WORD_CHECK_SKIP.includes(name)) {
      test("no banned words in prose", () => {
        const hits: string[] = [];
        lines.forEach((line, i) => {
          for (const w of words) {
            const re = new RegExp(`\\b${escape(w)}\\b`, "i");
            if (re.test(line)) hits.push(`line ${i + 1}: ${w}`);
          }
        });
        expect(hits).toEqual([]);
      });
    }
  });
}
