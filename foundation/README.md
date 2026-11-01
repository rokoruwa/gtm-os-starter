# foundation

**Load this file when:** you're adapting the repo to your company or a skill can't find the context it needs.

**Fictional.** Everything in this folder describes Northwind Rentals, an invented company. No real company, person or customer appears here.

Every skill reads from this folder before it writes. Edit a fact here once and every skill picks it up on its next run.

| File | Holds | Read by |
|---|---|---|
| company.md | What Northwind sells, to whom, and why it exists | positioning |
| icp.md | The fit rubric and disqualifiers | icp-fit |
| icp-list.csv | 25 invented target accounts | icp-fit, founder-email |
| personas.md | The three buyers and what each one cares about | icp-fit, positioning |
| positioning.md | The current positioning, in six steps | angle-finder, linkedin-post |
| voice.md | How Northwind sounds in public | linkedin-post, founder-email, pre-publish-gate, post-performance |
| do-not-say.md | Banned words, banned claims, banned punctuation | linkedin-post, founder-email, pre-publish-gate |
| metrics.md | Metric definitions and where each number comes from | scorecard, post-performance |
| competitors.md | The alternatives a buyer weighs | positioning, angle-finder |

## Rules for this folder

- Each file opens with a "Load this file when" line so a skill or a person knows when it matters.
- A fact you can't source gets written as TBD, not guessed.
- Keep files short. A skill loads the whole file, so padding costs every run.
