import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import { FOUNDATION_DIR, exists, parseCsv, read } from "./lib";

const REQUIRED = [
  "README.md",
  "company.md",
  "icp.md",
  "icp-list.csv",
  "personas.md",
  "positioning.md",
  "voice.md",
  "do-not-say.md",
  "metrics.md",
  "competitors.md",
];

const CSV_COLUMNS = [
  "account",
  "domain",
  "hq",
  "units",
  "management_model",
  "asset_type",
  "messaging_today",
  "public_signals",
  "fictional",
];

describe("foundation", () => {
  for (const file of REQUIRED) {
    test(`${file} exists`, () => {
      expect(exists(join(FOUNDATION_DIR, file))).toBe(true);
    });
  }

  for (const file of REQUIRED.filter((f) => f.endsWith(".md"))) {
    test(`${file} opens with a load header and a fictional notice`, () => {
      const head = read(join(FOUNDATION_DIR, file)).split("\n").slice(0, 8).join("\n");
      expect(head).toContain("**Load this file when:**");
      expect(head).toContain("**Fictional.**");
    });

    test(`${file} has no empty sections`, () => {
      const lines = read(join(FOUNDATION_DIR, file)).split("\n");
      const empty: string[] = [];
      lines.forEach((line, i) => {
        if (!/^#{2,} /.test(line)) return;
        const next = lines.slice(i + 1).find((l) => l.trim() !== "");
        if (next === undefined || /^#{1,} /.test(next)) empty.push(line);
      });
      expect(empty).toEqual([]);
    });
  }

  describe("icp-list.csv", () => {
    const rows = parseCsv(read(join(FOUNDATION_DIR, "icp-list.csv")));
    const [header, ...data] = rows;

    test("has the expected columns", () => {
      expect(header).toEqual(CSV_COLUMNS);
    });

    test("has 25 accounts", () => {
      expect(data.length).toBe(25);
    });

    test("every row is complete and marked fictional", () => {
      for (const row of data) {
        expect(row.length).toBe(CSV_COLUMNS.length);
        expect(row.every((c) => c.trim() !== "")).toBe(true);
        expect(row[CSV_COLUMNS.indexOf("fictional")]).toBe("yes");
      }
    });

    test("domains use the reserved .example TLD", () => {
      for (const row of data) {
        expect(row[CSV_COLUMNS.indexOf("domain")]).toMatch(/\.example$/);
      }
    });

    test("unit counts are whole numbers", () => {
      for (const row of data) {
        expect(row[CSV_COLUMNS.indexOf("units")]).toMatch(/^\d+$/);
      }
    });
  });

  test("metrics.md has a source for every metric", () => {
    const lines = read(join(FOUNDATION_DIR, "metrics.md"))
      .split("\n")
      .filter((l) => l.startsWith("|") && !l.startsWith("|---") && !l.startsWith("| Metric"));
    expect(lines.length).toBeGreaterThan(0);
    for (const line of lines) {
      const cells = line.split("|").map((c) => c.trim()).filter(Boolean);
      expect(cells.length).toBe(5);
      expect(cells[2]).not.toBe("");
    }
  });
});
