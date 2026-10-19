# Digimasi security research

[![DOI](https://zenodo.org/badge/DOI/10.5281/zenodo.23466873.svg)](https://doi.org/10.5281/zenodo.23466873)

Open data from the passive sensor on [digimasi.com](https://digimasi.com/en/research/): what automated programs look for on a company website, week by week.

digimasi.com is a static company website. It has no WordPress, no `.env` file, no `.git` folder and no admin panel, yet bots ask for them every day. The sensor records those requests (and only those; ordinary visits are never recorded), and this repository publishes the weekly summary.

## What is here

| Path | What it is |
|---|---|
| [`weekly/`](weekly/) | One summary per finished week (Monday to Sunday, Jakarta time, UTC+7), as `<monday>.json` and a readable `<monday>.md` |
| [`METHODOLOGY.md`](METHODOLOGY.md) | How the data is collected, and what we never do |
| [`SECURITY.md`](SECURITY.md) | How to report a security problem to us |
| [`CITATION.cff`](CITATION.cff) | How to cite this data |

The same numbers are on [digimasi.com/en/research/weekly/](https://digimasi.com/en/research/weekly/), where the running week is updated daily.

## What a weekly summary contains

- the number of requests, of distinct source addresses, of source countries, and of login guesses;
- what was looked for, by category (secret configuration files, code history folders, WordPress, cloud keys, …);
- the most requested paths;
- the network operators and countries the requests came from;
- usernames bots guessed, when they are stock names such as `admin`.

## What it never contains

IP addresses, passwords, request bodies, browser identifiers, raw sensor records, or usernames shaped like an email address or a phone number. Addresses that clearly attack us are reported to [AbuseIPDB](https://www.abuseipdb.com/user/359616) instead; see the methodology.

## Limits

The data comes from one website in Indonesia. It describes what a company website like ours experiences, not the whole internet. Countries and networks are where the requesting servers are, not necessarily where the people behind them are.

## How to cite

Febrian, A. (2026). *Digimasi security research: weekly sensor records* (Version 1.0.0) [Data set]. Zenodo.
https://doi.org/10.5281/zenodo.23466873

That DOI always points to the latest version. To cite one exact version, use its own DOI (v1.0.0:
[10.5281/zenodo.23466874](https://doi.org/10.5281/zenodo.23466874)). [`CITATION.cff`](CITATION.cff) has the same
details for reference managers.

## Licence

[CC BY 4.0](LICENSE): you may share and adapt the data for any purpose, including commercially, as long as you credit "Febrian, A. (2026), Digimasi security research: weekly sensor records, Digimasi" and link to this repository or the DOI.

## Updates

A scheduled workflow ([`.github/workflows/weekly.yml`](.github/workflows/weekly.yml)) reads the public summary at `https://digimasi.com/api/research/weekly.json` every Monday morning and commits the weeks that have finished. Each finished week is written once and never changed afterwards.
