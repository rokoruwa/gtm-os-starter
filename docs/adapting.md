# Adapting it to your company

Plan on an afternoon. Work through the files in this order, because later files lean on earlier ones.

1. **company.md.** What you sell, who buys it, and the facts a skill may state. Put TBD next to any fact you can't source yet.
2. **personas.md.** Two or three buyer types, written as roles. Don't name real people.
3. **competitors.md.** Start with the status quo, then the vendors. Note where each alternative wins.
4. **icp.md.** Five criteria scored 0 to 2, plus disqualifiers. Keep criteria you can check from public information.
5. **icp-list.csv.** Your target accounts, same columns. Keep this file out of a public fork. See below.
6. **positioning.md.** Run the positioning skill against your new files, then edit the draft by hand.
7. **voice.md.** Rules plus two examples that sound like you and two that don't.
8. **do-not-say.md.** Keep the "Banned words" heading and one entry per bullet. The voice lint reads it.
9. **metrics.md.** Definitions and sources. Leave values as TBD until a report fills them.

Run `bun test` after each file. The validators point at what's missing.

## Keep private things private

A public fork of this repo should still hold fictional data. Your real account list, positioning and voice card belong in a private copy. Two ways to do that:

- Keep a private fork and never make it public.
- Keep this repo public with Northwind's files, and point your agent at a private `foundation/` folder that lives somewhere else.

The `validate-foundation` test fails if any row in icp-list.csv isn't marked `fictional=yes`. Turn that check off only in a private copy.

## Swapping the agent

The skills are markdown. Any agent that can read a file and follow instructions can run them. Hosts that discover `.claude/skills/` pick them up as slash commands. For others, paste the SKILL.md and its inputs into the conversation.
