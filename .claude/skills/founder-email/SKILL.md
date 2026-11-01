---
name: founder-email
description: Draft a short one-to-one email from the founder to one account for the founder to send personally. Use when an account scores as a strong fit and someone asks for outreach.
allowed-tools: Read Grep Glob Write
disable-model-invocation: true
metadata:
  category: create
  external-copy: "true"
---

# Founder email

Draft a one-to-one email the founder reviews, edits and sends from their own inbox. This skill writes a file. It never sends, never drafts in an inbox, never adds anyone to a sequence.

## Inputs

Load all three before writing:

- `foundation/voice.md` for how the founder sounds.
- `foundation/do-not-say.md` for banned words and claims.
- `foundation/icp-list.csv` for the account's facts and public signals.

Also read `foundation/personas.md` for the pain behind the signal.

The person asking supplies the account name and the recipient's role. Use a role, such as "VP of Operations," until the founder fills in a name.

## Steps

1. Look up the account in icp-list.csv. If it scores under 8 in icp-fit, say so and ask whether to continue.
2. Pick the one public signal that gives a reason to write now. If there isn't one, stop and say the email would be cold for no reason.
3. Write a subject line of six words or fewer. Lowercase is fine. No clickbait.
4. Write the body in under 120 words:
   - Open with the signal, in your own words.
   - Name the problem that signal usually points to, from personas.md.
   - Say in one sentence what Northwind changes.
   - Ask one small question the recipient can answer in a line.
5. Sign as the founder. No signature block, no links, no attachments.
6. Run pre-publish-gate on the draft and apply its fixes.

## Output

```
To: <role> at <account>
Signal used: <quote from icp-list.csv>
Subject: <subject>

<body>

Gate: <pass, or remaining fixes>
Founder to fill in: <recipient name, anything personal>
```

Write it to `outputs/founder-email-<account-slug>.md`.

## Rules

- One email, one person. No mail merge fields beyond the recipient's name.
- Never claim a customer count, result or peer customer.
- The founder sends it. Nothing here touches an email account.
