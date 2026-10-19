# Weekly records

One file pair per finished week, named after the week's Monday (Jakarta time): `YYYY-MM-DD.json` holds the numbers, `YYYY-MM-DD.md` the same in a readable form. The sensor started on 12 October 2026, so the first record is `2026-10-12`, written on Monday 19 October 2026.

A week runs from Monday 00:00 to the following Monday 00:00, Jakarta time (UTC+7). A week is counted once, after it has finished, and the file is never changed afterwards. What counts as a recorded request, and what each category in `kinds` means, is explained in [PATTERNS.md](../PATTERNS.md).

## JSON fields

Every count is a number of recorded requests or of distinct source addresses; none is a share or a percentage. The addresses themselves are never in the file.

| Field | Type | Meaning | Can be empty or zero? |
|---|---|---|---|
| `start` | string, `YYYY-MM-DD` | The Monday the week starts on, Jakarta date. Also the file name. | Never. |
| `end` | string, `YYYY-MM-DD` | The Sunday the week ends on, Jakarta date (the last full day included). | Never. |
| `probes` | integer | Requests recorded during the week. | Zero only in a week with no recorded requests. |
| `sources` | integer | Distinct source addresses among those requests. | Zero only when `probes` is zero. |
| `countries` | integer | Distinct source countries. Requests whose country is unknown are left out of this count. | Can be zero when `probes` is zero. |
| `loginGuesses` | integer | Requests that carried a guessed username, a guessed password, or both (see [PATTERNS.md](../PATTERNS.md#how-a-login-guess-is-detected)). Also counts guesses whose username is not listed in `users`. | Zero in a week without login guesses. |
| `kinds` | array of rows | Requests per category, every category seen that week, most requests first. | Empty only when `probes` is zero. A category with no requests that week is left out. |
| `paths` | array of rows | The ten most requested paths, most requests first (ties in alphabetical order). The path only, without the query string. | Fewer than ten rows in a week with fewer distinct paths. |
| `networks` | array of rows | The ten network operators that sent the most requests, as registered for the source address (the organisation of the address's autonomous system). | Requests without a known operator are left out, so the list can be shorter than ten. |
| `countryList` | array of rows | The ten countries that sent the most requests, as two-letter country codes (ISO 3166-1 alpha-2) assigned to the source address by our hosting network. | Requests without a known country are left out. |
| `users` | array of `{name, n}` | Up to ten guessed usernames, most guesses first: `name` is the username, `n` the number of requests that carried it. Only stock names are listed (see below). | Empty when no guessed username passes the publishing rule, even if `loginGuesses` is above zero. |

The rows in `kinds`, `paths`, `networks` and `countryList` have the same three fields:

| Field | Type | Meaning |
|---|---|---|
| `name` | string | The category, path, operator name or country code. |
| `n` | integer | Requests in that row during the week. |
| `sources` | integer | Distinct source addresses that sent those requests. One address often sends many kinds of request, so the `sources` of the rows add up to more than the week's `sources`. |

All dates are Jakarta dates (UTC+7). The files hold no times of day.

Countries and networks describe where the requesting server is, not necessarily where the person behind it is. Paths are cut to 300 characters, operator names to 120.

## Usernames: what is listed

A guessed username is listed in `users` only when it looks like a bot's stock name such as `admin` or `root`: 3 to 40 characters long, with at least one letter, no `@`, and no run of six or more digits. Anything shaped like an email address or a phone number, very short or very long values, and values with no letters (some XML-RPC calls carry a number where the username would be) are left out. They still count in `loginGuesses`. Guessed passwords are never published here.

## Week of 2026-10-12: 16 login guesses, no usernames

`2026-10-12.json` has `"loginGuesses": 16` and an empty `users` list. This is the publishing rule above at work, not missing data: the 16 requests did carry a guess, but none of the usernames in them passed the rule (and a guess that carries only a password has no username to list). In other words, no request that week guessed a stock name such as `admin`.
