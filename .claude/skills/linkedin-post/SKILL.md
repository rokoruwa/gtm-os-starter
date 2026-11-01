---
name: linkedin-post
description: Draft a LinkedIn post in the company voice and hand it to the pre-publish gate. Use when someone asks for a post, a post from an angle, or a rewrite of a post draft.
allowed-tools: Read Grep Glob Write
disable-model-invocation: true
metadata:
  category: create
  external-copy: "true"
---

# LinkedIn post

Draft a post for a person to review and publish. This skill never posts. It ends by running pre-publish-gate on its own draft.

## Inputs

Load all three before writing a word:

- `foundation/voice.md` for how the company sounds.
- `foundation/do-not-say.md` for banned words, claims and formats.
- `foundation/positioning.md` for what the post is allowed to claim.

The person asking supplies a topic or an angle from angle-finder, and whose account it's for: the company page or the founder.

## Steps

1. Restate the one idea the post carries in a single sentence. If you can't, ask which idea matters most before drafting.
2. Write the hook as the first line. It names a specific moment or tension, not a topic.
3. Write the body in short paragraphs, one idea each. Put the outcome before the mechanism.
4. End with a question or an observation. No call to action, no link in the body.
5. Check every number against metrics.md and company.md. Replace an unsourced number with TBD and flag it.
6. Write two alternate hooks.
7. Run the pre-publish-gate skill on the draft. If it returns fixes, apply them and run it again. Stop after three rounds and hand back whatever is left.

## Output

```
Account: <company page or founder>
Idea: <one sentence>

<draft post>

Alternate hooks:
1. ...
2. ...

Gate: <pass, or the remaining fixes>
Flags: <unsourced numbers, claims to confirm, or "none">
```

Write it to `outputs/linkedin-<date>-<slug>.md`.

## Rules

- Never post, schedule or send. A person publishes.
- Never name a customer, prospect or partner.
- Two hashtags at most, at the end.
