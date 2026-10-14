# Weekly records

One file pair per finished week, named after the week's Monday (Jakarta time): `YYYY-MM-DD.json` holds the numbers, `YYYY-MM-DD.md` the same in a readable form. The sensor started on 12 October 2026, so the first record is `2026-10-12`, written on Monday 19 October 2026.

JSON fields:

| Field | Meaning |
|---|---|
| `start`, `end` | First and last day of the week (Jakarta time) |
| `probes` | Requests recorded |
| `sources` | Distinct source addresses |
| `countries` | Distinct source countries |
| `loginGuesses` | Requests that carried a username or password guess |
| `kinds` | Requests per category: `name`, `n` (requests), `sources` |
| `paths` | The ten most requested paths |
| `networks` | The ten most frequent network operators (as registered for the address) |
| `countryList` | The ten most frequent countries (ISO 3166-1 alpha-2) |
| `users` | Up to ten stock usernames guessed (never an email-like or phone-like value) |
