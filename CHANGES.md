# Changes

What changed in this data set and how it is counted, newest first. Dates are Jakarta time (UTC+7).

## 2026-10-19

### Login guesses: WordPress pingbacks no longer count (from the week of 2026-10-19)

A login guess is a request that posted a username or password to a login page that does not exist here: a login form, or a WordPress XML-RPC call. Until now every XML-RPC call carrying two text values was counted as a login guess. A WordPress pingback (`pingback.ping`) has that shape too, but its two values are web addresses, not a username and a password.

From the week starting Monday 2026-10-19, an XML-RPC call counts as a login guess only when it is a method that logs in. Pingbacks, and other XML-RPC calls that do not log in, are no longer counted in `loginGuesses`, and their values never appear in `users`.

Earlier weeks are not changed. `weekly/2026-10-12.json` keeps the count it was published with, under the old rule, so its `loginGuesses` may include pingbacks. Keep this in mind when you compare that week with later ones.

### Weekly paths: a stricter publishing rule

The `paths` list of a week now follows the same rule as the statistics page on digimasi.com: a path is listed only if it carries nothing shaped like an email address, an IP address, a long token or a long secret. Bots sometimes put such things in the path they request. A path that fails the rule is left out of the list, so a week's top list can have fewer than ten rows. The counts of the week (`probes`, `sources`, `loginGuesses` and the rest) are not affected.

### METHODOLOGY.md

- Added: "From the week of 19 October 2026, WordPress pingback calls are no longer counted as login guesses."
- Reporting attackers: "One stray file request is not reported; a single login guess is." (it said "One stray request is not reported.").
- Added the date the sensor started recording (12 October 2026) and that all dates and times are Jakarta time (UTC+7).
- Last updated: 19 October 2026.

### PATTERNS.md and field notes

- New `PATTERNS.md`: what counts as a probe, the categories used in the data (`env-file`, `git`, `wordpress`, `php`, `config`, `cloud-keys`, `backup`, `admin-panel`, `framework`, `shell`) with a short description of each, and how a login guess is detected.
- `weekly/README.md`: week boundaries (Monday 00:00 to Monday 00:00, UTC+7), a full table of the fields with what can be empty or zero and why, the row fields shared by `kinds`, `paths`, `networks` and `countryList`, which usernames are listed, and why the week of 2026-10-12 has login guesses but no usernames.
- `README.md`: links to `PATTERNS.md` and to the field notes in `weekly/README.md`.
