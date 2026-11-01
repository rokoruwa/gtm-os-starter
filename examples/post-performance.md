# Example: post-performance

**Fictional.** Northwind Rentals and every post below are invented.

## Input

> What worked on LinkedIn in September?

Loaded: `foundation/metrics.md`, `foundation/voice.md`. Supplied: `examples/data/northwind-linkedin-export.csv`.

## Output

Source: examples/data/northwind-linkedin-export.csv
Posts analyzed: 8 (1 dropped for low impressions, the 2026-09-26 webinar post at 700 against a cutoff of 950)

| Rank | Date | Hook | Impressions | Engagement rate |
|---|---|---|---|---|
| 1 | 2026-09-09 | Our maintenance tech fielded 14 calls about one leak. | 5,100 | 3.8% |
| 2 | 2026-09-16 | What a 7 a.m. call to the leasing office costs you | 4,700 | 3.5% |
| 3 | 2026-09-23 | Paper notices still work. Here's when. | 3,800 | 3.4% |
| 4 | 2026-09-02 | The water's off in Building C from 9 to noon. | 4,200 | 3.2% |
| 5 | 2026-09-30 | Nobody reads the elevator notice after day two. | 4,400 | 3.1% |
| 6 | 2026-09-12 | Announcing read receipts by building | 2,600 | 1.4% |
| 7 | 2026-09-05 | Five tips for better resident communication | 3,100 | 0.8% |
| 8 | 2026-09-19 | Resident experience matters more than ever | 2,900 | 0.7% |

Patterns to repeat:
1. Posts whose hook named a specific moment ranked higher. Seen in: 2026-09-09, 2026-09-16, 2026-09-02, 2026-09-30. None of the bottom three did this.

Patterns to drop:
1. Posts whose hook named a topic or an announcement ranked lower. Seen in: 2026-09-12, 2026-09-05, 2026-09-19.

Watching, not enough posts yet: hooks that push back on a common belief. Seen in 2026-09-23 and 2026-09-30, two posts, under the three-post minimum.
