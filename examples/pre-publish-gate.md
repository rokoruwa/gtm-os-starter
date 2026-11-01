# Example: pre-publish-gate

**Fictional.** Northwind Rentals and the draft are invented.

## Input

> Check this company page draft.

Loaded: `foundation/voice.md`, `foundation/do-not-say.md`, `foundation/metrics.md`.

```
1  We're thrilled to share something new.
2
3  Read receipts by building are live — so regional managers finally see who got the notice.
4  Teams using it cut resident calls by 30%.
5
6  Book a demo today!
```

## Output

```
Result: FIX

Blocking:
1. Line 1: "thrilled" banned word in do-not-say.md. Fix: open with the change itself, such as "Regional managers can now see which buildings read a notice."
2. Line 3: "—" em dash. Fix: split into two sentences at the dash.
3. Line 4: "cut resident calls by 30%" unsourced number, no matching metric in metrics.md. Fix: remove the sentence.
4. Line 6: "!" exclamation mark. Fix: replace with a period, or cut the line.

Voice:
1. Line 6: "Book a demo today" ends on a call to action. Suggest: end with a question about how the reader tracks notices now.
```
