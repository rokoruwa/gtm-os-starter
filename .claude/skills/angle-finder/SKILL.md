---
name: angle-finder
description: Find six content angles that move away from the take everyone in the category already posts. Use before writing a post or campaign when the topic feels flat or obvious.
allowed-tools: Read Grep Glob Write
metadata:
  category: create
  external-copy: "false"
---

# Angle finder

Take a topic, name the take everyone already has on it, then find six angles that move away from it. Each angle stays inside what the positioning supports.

## Inputs

Load these before brainstorming:

- `foundation/positioning.md` for the story every angle has to fit.
- `foundation/competitors.md` for what the alternatives say, which is usually the consensus take.

The person asking supplies a topic, such as "maintenance updates" or "renewal season."

## Steps

1. Write the consensus take in one sentence. It's what a competitor or a generic vendor would post on this topic.
2. Generate angles using six moves, one angle each:
   - **Invert.** Argue the opposite of the consensus and find the part that's true.
   - **Zoom in.** Pick one moment, one building, one 7 a.m. phone call.
   - **Cost.** Show what the status quo costs the onsite team in time or attention.
   - **Who's missing.** Tell it from the person the consensus ignores, such as the maintenance tech or the resident.
   - **Before and after.** Describe the same day with and without the change.
   - **Admit the limit.** Say what Northwind doesn't fix, and why that's fine.
3. For each angle, write a working hook, the positioning step it ties to, and the persona it's for.
4. Score each angle 1 to 3 on distance from the consensus and on fit with positioning. Drop any angle that scores 1 on fit.
5. Recommend one angle and say why in one sentence.

## Output

```
Consensus take: <one sentence>

| # | Move | Hook | Ties to | For | Distance | Fit |
|---|---|---|---|---|---|---|
...

Recommended: #<n> because <reason>.
```

## Rules

- Angles aren't copy. Hand the recommended angle to linkedin-post or founder-email to draft.
- No angle can depend on a number that isn't in metrics.md or company.md.
- Don't build an angle on a competitor's flaw.
