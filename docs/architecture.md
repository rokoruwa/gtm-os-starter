# Architecture

Three layers, each in its own folder. Context lives in one place, skills read it, and people make the last call.

## foundation/

Plain markdown and one CSV. Each file opens with a "Load this file when" line. Nothing in this folder is code, so anyone on the team can edit it.

## .claude/skills/

One folder per skill, each with a `SKILL.md`. Folders are flat because agent hosts discover skills at `.claude/skills/<name>/SKILL.md`. Grouping lives in frontmatter instead:

```yaml
metadata:
  category: create
  external-copy: "true"
```

Every skill has the same four sections:

- **Inputs** lists the foundation files to load, by path. The test suite checks that each path exists.
- **Steps** says what to do, in order.
- **Output** shows the exact shape of the result and where it's saved.
- **Rules** lists what the skill must never do.

Drafting skills that people trigger on purpose set `disable-model-invocation: true`, so the agent won't start a post or an email on its own.

## outputs/

Where drafts, scorecards and gate logs land. Git ignores it, so drafts don't end up in history by accident.

## tests/

Four validators run with `bun test`:

| Test | Fails when |
|---|---|
| validate-foundation | A foundation file is missing, lacks its load header, or the account list has a row not marked fictional |
| validate-skills | A skill lacks frontmatter, a section, a valid category, an example, or loads a file that doesn't exist |
| voice-lint | Prose has an em dash, en dash, semicolon, exclamation mark or a banned word |
| no-invented-numbers | An example's output shows a percentage, money or a count without a source or TBD |

## Data flow

A person asks for something. The agent picks a skill, loads that skill's inputs, and writes a draft to `outputs/`. Drafts meant for the outside world go through pre-publish-gate. Fixes go back to the drafting skill. A pass goes to a person, who edits, approves and publishes it themselves.
