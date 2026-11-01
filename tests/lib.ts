import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = join(import.meta.dir, "..");
export const SKILLS_DIR = join(ROOT, ".claude", "skills");
export const FOUNDATION_DIR = join(ROOT, "foundation");
export const EXAMPLES_DIR = join(ROOT, "examples");

export const CATEGORIES = ["know-the-market", "create", "review", "measure"];

export function read(path: string): string {
  return readFileSync(path, "utf8");
}

export function rel(path: string): string {
  return relative(ROOT, path);
}

export function exists(path: string): boolean {
  return existsSync(path);
}

export function skillNames(): string[] {
  return readdirSync(SKILLS_DIR).filter((d) =>
    statSync(join(SKILLS_DIR, d)).isDirectory(),
  );
}

export type Skill = {
  name: string;
  path: string;
  frontmatter: Record<string, any>;
  body: string;
};

export function loadSkill(dir: string): Skill {
  const path = join(SKILLS_DIR, dir, "SKILL.md");
  const text = read(path);
  const match = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`${rel(path)} has no frontmatter block`);
  const frontmatter = Bun.YAML.parse(match[1]) as Record<string, any>;
  return { name: dir, path, frontmatter, body: match[2] };
}

/** Returns the text under a "## Heading" up to the next "## " heading. */
export function section(markdown: string, heading: string): string | null {
  const lines = markdown.split("\n");
  const start = lines.findIndex((l) => l.trim() === `## ${heading}`);
  if (start === -1) return null;
  const out: string[] = [];
  let inFence = false;
  for (const line of lines.slice(start + 1)) {
    if (line.startsWith("```")) inFence = !inFence;
    if (!inFence && line.startsWith("## ")) break;
    out.push(line);
  }
  return out.join("\n");
}

/** Removes fenced code blocks and inline code so lint only sees prose. */
export function proseOnly(markdown: string): string[] {
  const out: string[] = [];
  let inFence = false;
  for (const line of markdown.split("\n")) {
    if (line.startsWith("```")) {
      inFence = !inFence;
      out.push("");
      continue;
    }
    out.push(inFence ? "" : line.replace(/`[^`]*`/g, ""));
  }
  return out;
}

/** Every markdown file a reader sees, skipping tests and git internals. */
export function markdownFiles(dir = ROOT): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir)) {
    if ([".git", "node_modules", "outputs", "tests"].includes(entry)) continue;
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) files.push(...markdownFiles(full));
    else if (entry.endsWith(".md")) files.push(full);
  }
  return files;
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  for (const line of text.trim().split("\n")) {
    const cells: string[] = [];
    let cell = "";
    let quoted = false;
    for (const ch of line) {
      if (ch === '"') quoted = !quoted;
      else if (ch === "," && !quoted) {
        cells.push(cell);
        cell = "";
      } else cell += ch;
    }
    cells.push(cell);
    rows.push(cells);
  }
  return rows;
}

export function bannedWords(): string[] {
  const text = read(join(FOUNDATION_DIR, "do-not-say.md"));
  const block = section(text, "Banned words") ?? "";
  return block
    .split("\n")
    .filter((l) => l.startsWith("- "))
    .map((l) => l.slice(2).trim().toLowerCase())
    .filter(Boolean);
}
