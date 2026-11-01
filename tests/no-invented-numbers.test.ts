import { describe, expect, test } from "bun:test";
import { readdirSync } from "node:fs";
import { join } from "node:path";
import { EXAMPLES_DIR, ROOT, exists, read, section } from "./lib";

// A number that claims a result: a percentage, money, or a count of
// something marketing reports on.
const METRIC =
  /\d[\d,.]*\s*%|\$\s?\d|\b\d[\d,.]*\s+(leads|impressions|clicks|replies|signups|demos|meetings|customers|followers|visits|views|reactions|comments|reposts)\b/i;

const examples = readdirSync(EXAMPLES_DIR).filter(
  (f) => f.endsWith(".md") && f !== "README.md",
);

for (const file of examples) {
  describe(`examples/${file}`, () => {
    const output = section(read(join(EXAMPLES_DIR, file)), "Output") ?? "";
    const sourceLine = output.split("\n").find((l) => l.startsWith("Source: "));

    test("a declared source file exists", () => {
      if (!sourceLine) return;
      const path = sourceLine.slice("Source: ".length).trim();
      expect(exists(join(ROOT, path))).toBe(true);
    });

    test("every metric in the output has a source, a TBD, or an unsourced flag", () => {
      const bad = output
        .split("\n")
        .filter((l) => METRIC.test(l))
        .filter((l) => !sourceLine && !/TBD|unsourced/i.test(l));
      expect(bad).toEqual([]);
    });
  });
}

test("the scorecard example marks missing metrics TBD", () => {
  const output = section(read(join(EXAMPLES_DIR, "scorecard.md")), "Output") ?? "";
  expect(output).toContain("TBD");
});

test("foundation/metrics.md leaves current values TBD", () => {
  const rows = read(join(ROOT, "foundation", "metrics.md"))
    .split("\n")
    .filter((l) => l.startsWith("|") && !l.startsWith("|---") && !l.startsWith("| Metric"));
  for (const row of rows) expect(row.trim().endsWith("| TBD |")).toBe(true);
});

test("company.md facts are sourced or TBD", () => {
  const block = section(read(join(ROOT, "foundation", "company.md")), "Facts a skill may state") ?? "";
  const rows = block
    .split("\n")
    .filter((l) => l.startsWith("|") && !l.startsWith("|---") && !l.startsWith("| Fact"));
  expect(rows.length).toBeGreaterThan(0);
  for (const row of rows) {
    const [, value, source] = row.split("|").map((c) => c.trim()).filter(Boolean);
    expect(value === "TBD" || source !== "No source yet").toBe(true);
  }
});
