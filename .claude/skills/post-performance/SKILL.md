---
name: post-performance
description: Rank published posts from an analytics export and name the patterns the top posts share. Use after a month of posting, or when someone asks what's working on LinkedIn.
allowed-tools: Read Grep Glob Write
metadata:
  category: measure
  external-copy: "false"
---

# Post performance

Rank posts by the engagement definition in metrics.md, then compare the top posts to the bottom ones against the voice card. The goal is a short list of patterns to repeat, each backed by rows in the export.

## Inputs

Load both before analyzing:

- `foundation/metrics.md` for how engagement rate is defined and where the export comes from.
- `foundation/voice.md` for the rules to compare posts against.

The person asking supplies a LinkedIn analytics export as a CSV, with at least post date, hook or first line, impressions, reactions, comments and reposts.

## Steps

1. Check the export has the columns the engagement rate definition needs. If one is missing, stop and name it.
2. Compute engagement rate for each post exactly as metrics.md defines it.
3. Drop posts with fewer impressions than the median of the export divided by four. Say how many were dropped and why, because tiny samples skew rates.
4. Rank the rest by engagement rate.
5. Compare the top third with the bottom third on: hook type, length, whether it names a specific moment, whether it ends with a question, and any voice.md rule it breaks.
6. Keep a pattern only when it shows up in most top posts and few bottom posts. Cite the post dates that support it.

## Output

```
Source: <export file name>
Posts analyzed: <n> (<k> dropped for low impressions)

| Rank | Date | Hook | Impressions | Engagement rate |
|---|---|---|---|---|
...

Patterns to repeat:
1. <pattern>. Seen in: <dates>.

Patterns to drop:
1. <pattern>. Seen in: <dates>.
```

Write it to `outputs/post-performance-<period>.md`.

## Rules

- Every number comes from the export. Cite the file as the source.
- Correlation isn't cause. Write patterns as "posts that did X ranked higher," not "X drives engagement."
- Don't name a winning pattern from fewer than three posts.
