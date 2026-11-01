---
name: scorecard
description: Build a marketing scorecard from the metric definitions, with every value sourced or marked TBD. Use for a weekly or monthly results summary.
allowed-tools: Read Grep Glob Write
metadata:
  category: measure
  external-copy: "false"
---

# Scorecard

Turn the metric definitions into a scorecard for a period. Every number carries its source. A metric without a supplied report reads TBD.

## Inputs

Load this before building:

- `foundation/metrics.md` for the definitions, sources and owners.

The person asking supplies the period and any report exports, as files or pasted tables. Exports are the only place numbers come from.

## Steps

1. List every metric in metrics.md.
2. For each one, look for its named source among the supplied exports. Match on the source column, not on a similar-sounding file.
3. If the source is there, compute the value using the definition exactly as written. Show the inputs, such as "42 replies / 310 sent."
4. If the source is missing, the value is TBD. Write which export would fill it.
5. Compare to the prior period only when both periods have sourced values. Otherwise the change column reads TBD.
6. Write up to three observations. Each one must point at a sourced row. No observation about a TBD row beyond "missing."

## Output

```
# Scorecard: <period>

| Metric | Value | Change | Source | Owner |
|---|---|---|---|---|
...

Observations:
- ...

To fill the TBDs: <list of exports to pull, by owner>
```

Write it to `outputs/scorecard-<period>.md`.

## Rules

- Never estimate, extrapolate or round a missing value into existence.
- Never pull numbers from memory, past conversations or the open web.
- A TBD is a correct answer. Don't apologize for it.
