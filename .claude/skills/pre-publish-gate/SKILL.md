---
name: pre-publish-gate
description: Check a draft against the voice card and the do-not-say list, then return pass or a numbered list of fixes with line numbers. Use before any external copy goes to a person for approval.
allowed-tools: Read Grep Glob
metadata:
  category: review
  external-copy: "true"
---

# Pre-publish gate

Read a draft line by line and decide: pass, or fix. The gate doesn't rewrite the draft. It says exactly what to change and where, so the writer or the drafting skill can fix it.

## Inputs

Load both before reading the draft:

- `foundation/voice.md` for the voice rules and punctuation rules.
- `foundation/do-not-say.md` for banned words, claims and formats.

Also read `foundation/metrics.md` and `foundation/company.md` when the draft contains a number.

The input is a draft, as a file path or pasted text.

## Steps

1. Number every line of the draft, starting at 1.
2. Check each line for:
   - banned words from do-not-say.md, matched case-insensitively as whole words or phrases,
   - em dashes, en dashes, semicolons and exclamation marks,
   - numbers, percentages or money without a source in metrics.md or company.md,
   - customer, prospect or partner names,
   - banned formats, such as hashtag walls or emoji at the start of lines.
3. Check the whole draft against voice.md: outcome before mechanism, one idea per paragraph, contractions, ending without a call to action.
4. Sort findings into **Blocking** (do-not-say hits, unsourced numbers, names) and **Voice** (style rules from voice.md).
5. Return pass only when there are no blocking findings. Voice findings alone still pass, listed as suggestions.

## Output

```
Result: PASS | FIX

Blocking:
1. Line <n>: "<quoted text>" <rule broken>. Fix: <specific change>.

Voice:
1. Line <n>: "<quoted text>" <rule>. Suggest: <change>.
```

Write "none" under a heading with no findings. Append one line to `outputs/gate-log.md` with the date, the draft file and the result, if the person asking wants a log.

## Rules

- Quote the exact text. "Tone is off" isn't a finding.
- Never approve on the human's behalf. PASS means the draft is ready for a person to review, not to publish.
- Don't fix the draft yourself. The writer applies the fixes.
