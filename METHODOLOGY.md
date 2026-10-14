# Research methodology

The same text as https://digimasi.com/en/research/methodology/, kept here with the data it describes.

Last updated: 14 October 2026.

This page explains where our research data comes from, the limits we keep to, and how we publish the results.

## The data we collect

digimasi.com receives requests from automated programs every day. They look for files our website has never had, such as a WordPress login page, a configuration file or a backup archive.

We record a request only when two things are true: the website answered "not found", and the address requested matches a known scanning pattern. What is recorded:

- the time, the address requested and the request method
- the IP address, country and originating network
- the identifier of the program used (user agent)
- the username and password the program tried on a login page that does not exist

Ordinary visits are not recorded this way, including mistyped addresses. Records are deleted after 90 days.

## What we never do

- Scan, test or try to log in to systems that are not ours.
- Change the website's answers to lure scanners. They get the same "not found" page as any other visitor.
- Show IP addresses on digimasi.com or in this repository. We name the country and network only.
- Publish ready-to-use attack code.

## Reporting attackers

Addresses that clearly attack us are reported to [AbuseIPDB](https://www.abuseipdb.com), the public database administrators around the world use to block attackers.

We report only an address that, within 24 hours, asked for five or more sensitive files that do not exist on this website, or sent a login guess. One stray request is not reported. A report holds the IP address, the time and examples of the addresses requested. Guessed passwords and usernames are not sent.

## Open-source software review

When we examine open-source software, we install it on our own machines and test only that copy. We do not test anyone else's running website.

## Reporting problems

A problem we find is reported privately to its developers first, through the project's official security channel. We publish a write-up after a fix is released, or 90 days after the report was sent, whichever comes first. We tell the developers that date in our first message.

## How we publish results

- We publish totals, rankings and patterns, with the date range of the data.
- Passwords that attackers tried may be published as a ranking, because they come from the attackers' guess lists, not from anyone's account.
- Our data comes from one website. The results describe what a company website like ours experiences, not the whole internet.

## Reporting a problem to us

If you find a security problem on digimasi.com, write to [security@digimasi.com](mailto:security@digimasi.com). The same contact is available at [/.well-known/security.txt](https://digimasi.com/.well-known/security.txt).
