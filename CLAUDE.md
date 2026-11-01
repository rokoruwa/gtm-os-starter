# CLAUDE.md

This repo is a marketing system for Northwind Rentals, a fictional company. Swap the files in `foundation/` to use it for a real one.

## Before any task

- Read the skill's Inputs section and load every foundation file it lists. Don't load the whole folder.
- If a needed fact isn't in `foundation/`, ask for it. Don't look it up or guess.

## Hard rules

- Never send email, post, schedule, write to a CRM or spend money. Write a draft to `outputs/` and stop.
- Every number in output needs a source from `foundation/metrics.md`, `foundation/company.md` or a file the person supplied. No source means TBD.
- Never name a customer, prospect or partner in a draft.
- Any external copy goes through the pre-publish-gate skill before a person sees it.
- Don't edit `foundation/` without being asked. Propose changes in `outputs/` instead.

## Writing

- Follow `foundation/voice.md` and `foundation/do-not-say.md` for anything a person outside the company will read.
- No em dashes, en dashes, semicolons or exclamation marks in prose.

## Layout

- `foundation/` holds company context. Each file says when to load it.
- `.claude/skills/<name>/SKILL.md` holds one skill each. Category is in the frontmatter.
- `examples/` holds one worked run per skill.
- `outputs/` is where drafts go. Git ignores it.
- `tests/` holds the validators. Run `bun test` after changing a skill or a foundation file.

## Adding a skill

Copy an existing skill folder, keep the Inputs, Steps, Output and Rules sections, set `metadata.category`, and add a run to `examples/`. Set `metadata.external-copy: "true"` if a person outside the company will read the output.
