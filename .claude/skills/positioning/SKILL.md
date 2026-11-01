---
name: positioning
description: Draft or revise the six-step positioning doc from company, competitor and persona facts. Use when positioning is missing, stale, or someone asks "how should we describe what we do."
allowed-tools: Read Grep Glob Write
metadata:
  category: know-the-market
  external-copy: "false"
---

# Positioning

Build a positioning doc in six steps, starting from what buyers would do without you. The result replaces foundation/positioning.md only after a person approves it.

## Inputs

Load these before drafting:

- `foundation/company.md` for what the company sells and the facts it may state.
- `foundation/competitors.md` for the alternatives a buyer weighs.
- `foundation/personas.md` for who cares and what they want to hear.

The person asking may add new facts, such as a feature that shipped or a segment that's winning. Treat anything they add as a claim to confirm, not a fact.

## Steps

1. **Competitive alternatives.** List what a buyer does today without you, starting with the status quo. Pull from competitors.md.
2. **Unique attributes.** List what you have that the alternatives don't. Only attributes that company.md or the person asking supports.
3. **Value.** For each attribute, write what changes for the buyer. If an attribute has no value anyone would pay for, drop it.
4. **Who cares most.** Name the segment and persona where that value is sharpest. Point at icp.md and personas.md.
5. **Market category.** Name the category that makes the value obvious. Say what you're not, too.
6. **Relevant trends.** Add at most two trends that make the value more urgent. Each one needs a reason, not a statistic you can't source.
7. Write a one-sentence short version. It should hold up if a buyer reads only that.
8. Diff the draft against the current foundation/positioning.md and list what changed and why.

## Output

A markdown doc with the six numbered sections, the short version, and a "Changes from current" list. Tag each claim **[Fact]** when a foundation file supports it, **[Inference]** when it's your reasoning, or **[Unknown]** when nobody has confirmed it yet.

## Rules

- Don't overwrite foundation/positioning.md. Write the draft to `outputs/positioning-draft-<date>.md` and let a person replace the file.
- No numbers without a source in company.md or metrics.md.
- Compare against alternatives, not vendor flaws.
