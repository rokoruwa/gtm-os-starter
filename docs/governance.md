# Governance

The system drafts. People decide. This page covers where that line sits and how to move it on purpose.

## Approval flow

1. A skill writes a draft to `outputs/`.
2. If the draft is external copy, pre-publish-gate checks it and returns pass or fixes.
3. Fixes go back to the drafting skill, for up to three rounds.
4. A person reads the passing draft, edits it, and publishes it from their own account.

A gate pass means "ready for review." It never means "approved."

## Permissions

`.claude/settings.json` ships with deny rules for tools that send, publish, schedule, delete or write CRM records, plus reads of `.env`. Deny rules win over allow rules, so a local setting can't quietly undo them. A `git push` asks first.

To let a skill call a tool that's denied, remove that one rule in your own copy and note why in CHANGELOG.md. Don't replace the list with a wildcard allow.

## Numbers

A number reaches a draft only from `foundation/metrics.md`, `foundation/company.md` or a report the person supplied. Anything else reads TBD. The scorecard skill treats TBD as a correct answer, not a gap to fill.

## Claim tags

Positioning work tags each claim:

- **[Fact]** when a foundation file supports it.
- **[Inference]** when it follows from facts but nobody has confirmed it.
- **[Unknown]** when it needs a person to check.

Reviewers start with Unknown, then Inference.

## Adding a gate

A gate is a skill in the `review` category that reads a draft and returns pass or fixes. To add one:

1. Copy `.claude/skills/pre-publish-gate/` to a new folder and rename it in the frontmatter.
2. Write the checks under Steps. Quote-based findings only, each with a line number.
3. List which foundation files it loads under Inputs.
4. Add a worked run to `examples/` and run `bun test`.
5. Call the new gate from the drafting skills that need it.

Gates that run several reviewers and merge their findings belong in a separate project. This repo keeps one gate so the flow stays easy to follow.
