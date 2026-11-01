---
name: icp-fit
description: Score an account against the ICP rubric and explain the score. Use when someone asks whether a company is a fit, who to contact next, or to rank a list of accounts.
allowed-tools: Read Grep Glob Write
metadata:
  category: know-the-market
  external-copy: "false"
---

# ICP fit

Score one account, or a list of them, against the rubric in foundation/icp.md. Every point in the score comes with the reason it was given.

## Inputs

Load these before scoring:

- `foundation/icp.md` for the rubric, the signals that count, and the disqualifiers.
- `foundation/icp-list.csv` for the accounts already researched.
- `foundation/personas.md` for who to contact once an account scores well.

The person asking supplies an account name, or says "rank the list."

## Steps

1. Find the account in icp-list.csv. If it isn't there, say so and ask for the missing columns: units, management model, asset type, messaging today, public signals. Don't look them up and don't guess.
2. Check the disqualifiers first. If one applies, the score is 0. Name the disqualifier and stop.
3. Score each rubric criterion 0, 1 or 2. Quote the cell from icp-list.csv that justifies it.
4. Add the points for a score out of 10 and map it to a band from icp.md.
5. Pick the persona from personas.md whose pain matches the account's signals. Name the persona type, never a real person.
6. For "rank the list," score every row, sort by score, and break ties by number of public signals.

## Output

A markdown block per account:

```
### <Account> (score X of 10, <band>)
| Criterion | Points | Why |
|---|---|---|
...
Contact first: <persona> because <signal>.
Next step: <next step from icp.md>.
Unknowns: <anything missing, or "none">.
```

For a ranked list, start with a summary table of account, score and band, then the per-account blocks for the top five.

Save the result to `outputs/icp-fit-<date>.md` when asked to keep it.

## Rules

- A missing value scores 0 and gets listed under Unknowns. Never fill it in.
- Quote the data. "Has signals" isn't a reason. "Job post for resident experience manager" is.
- Don't write outreach here. Hand strong fits to founder-email.
