import { describe, expect, test } from "bun:test";
import { join } from "node:path";
import {
  CATEGORIES,
  EXAMPLES_DIR,
  ROOT,
  exists,
  loadSkill,
  read,
  section,
  skillNames,
} from "./lib";

const EXPECTED = [
  "angle-finder",
  "founder-email",
  "icp-fit",
  "linkedin-post",
  "positioning",
  "post-performance",
  "pre-publish-gate",
  "scorecard",
];

const SECTIONS = ["Inputs", "Steps", "Output", "Rules"];

test("the eight skills are present", () => {
  expect(skillNames().sort()).toEqual(EXPECTED);
});

for (const dir of skillNames()) {
  describe(dir, () => {
    const skill = loadSkill(dir);
    const fm = skill.frontmatter;

    test("frontmatter name matches the folder", () => {
      expect(fm.name).toBe(dir);
    });

    test("has a description", () => {
      expect(typeof fm.description).toBe("string");
      expect(fm.description.length).toBeGreaterThan(40);
    });

    test("has a valid category", () => {
      expect(CATEGORIES).toContain(fm.metadata?.category);
    });

    test("declares external-copy", () => {
      expect(["true", "false"]).toContain(fm.metadata?.["external-copy"]);
    });

    for (const name of SECTIONS) {
      test(`has a ${name} section`, () => {
        const body = section(skill.body, name);
        expect(body).not.toBeNull();
        expect(body!.trim().length).toBeGreaterThan(0);
      });
    }

    const inputs = section(skill.body, "Inputs") ?? "";
    const loads = [...inputs.matchAll(/`(foundation\/[^`]+)`/g)].map((m) => m[1]);

    test("Inputs lists at least one foundation file", () => {
      expect(loads.length).toBeGreaterThan(0);
    });

    test("every file in Inputs exists", () => {
      for (const path of loads) expect(exists(join(ROOT, path))).toBe(true);
    });

    if (fm.metadata?.["external-copy"] === "true") {
      test("external copy loads voice.md and do-not-say.md", () => {
        expect(loads).toContain("foundation/voice.md");
        expect(loads).toContain("foundation/do-not-say.md");
      });
    }

    test("has a worked example", () => {
      const path = join(EXAMPLES_DIR, `${dir}.md`);
      expect(exists(path)).toBe(true);
      const text = read(path);
      expect(text).toContain("**Fictional.**");
      expect(section(text, "Input")).not.toBeNull();
      expect(section(text, "Output")).not.toBeNull();
    });

    test("is listed in the README skills table", () => {
      const readme = read(join(ROOT, "README.md"));
      expect(readme).toContain(`[${dir}](.claude/skills/${dir}/SKILL.md)`);
    });
  });
}

test("settings.json denies send and publish tools and .env reads", () => {
  const settings = JSON.parse(read(join(ROOT, ".claude", "settings.json")));
  const deny: string[] = settings.permissions.deny;
  expect(deny).toContain("Read(./.env)");
  expect(deny.some((r) => r.includes("send"))).toBe(true);
  expect(deny.some((r) => r.includes("publish"))).toBe(true);
  expect(settings.permissions.allow ?? []).not.toContain("*");
});

test(".env.example holds names only", () => {
  const lines = read(join(ROOT, ".env.example"))
    .split("\n")
    .filter((l) => l.trim() && !l.startsWith("#"));
  for (const line of lines) expect(line).toMatch(/^[A-Z][A-Z0-9_]*=$/);
});
