# What the sensor counts as a probe

This page explains the categories used in the weekly records (the `name` values in `kinds`) and the rules that decide whether a request is recorded at all. It describes the rules in plain words. The exact matching rules are not published, so that the record stays useful.

See [METHODOLOGY.md](METHODOLOGY.md) for how the data is collected and what we never do, and [weekly/README.md](weekly/README.md) for the meaning of each field.

## When a request is recorded

A request is recorded only when both of these are true:

1. **The website answered "not found" (HTTP 404) or "method not allowed" (HTTP 405).** A request for a page that exists is never recorded, whatever it looks like.
2. **The path requested fits one of the categories below.** These are paths that a static company website like digimasi.com has never had, and that scanners ask for. A mistyped address of an ordinary page does not fit any category and is not recorded.

The request method does not matter for being recorded: `GET`, `HEAD`, `POST` and others are all counted in the same way. Only the path is matched; the query string (the part after `?`) is not used for the category and is not published.

Each recorded request belongs to exactly one category. When a path fits more than one, it is counted in the first that fits, in this order: `wordpress`, `env-file`, `git`, `config`, `backup`, `php`, `admin-panel`, `cloud-keys`, `framework`, `shell`. For example, a WordPress configuration file is counted under `wordpress`, not `config`, and a PHP file that fits no earlier category is counted under `php`.

A few hard limits apply to what is stored (fields are cut to a fixed length, and one source address can add only a limited number of records in a short time), so very fast bursts from a single address are counted only in part. The counts are therefore a lower bound.

## Categories

The example paths below are all already public in our weekly records or on [digimasi.com/en/research/](https://digimasi.com/en/research/).

| `name` | Label in the readable `.md` files | What kind of request counts |
|---|---|---|
| `env-file` | Secret configuration files (.env) | A `.env` file, or a copy or variant of it, in any folder. These files usually hold database passwords and API keys. Examples: `/.env`, `/.env.local`, `/.env.backup`, `/.env.production`, `/.env.bak`, `/app/.env`, `/config/.env`, `/api/.env`. |
| `git` | Code history folder (.git) | Anything inside a version control folder (Git, and the older Subversion and Mercurial ones). An exposed folder of this kind can give away a site's whole code and history. Example: `/.git/HEAD`. |
| `wordpress` | WordPress | WordPress login, admin, content, programming interface and configuration paths, including the XML-RPC endpoint. Examples: `/wp-login.php`, `/xmlrpc.php`. |
| `php` | PHP files | Any other PHP file. digimasi.com runs no PHP, so every such request is a guess. |
| `config` | Other configuration files | Files with names such as config, settings, database or credentials, with a code, configuration, text or backup extension. |
| `cloud-keys` | Cloud and server keys | Files and folders where cloud command-line tools, SSH, Docker, Kubernetes or package managers keep keys and tokens, and web server password files. |
| `backup` | Backup files | Database dumps and archives (SQL dumps, zip, tar and similar), and files with a backup extension. |
| `admin-panel` | Admin panels | Well-known database, hosting and server admin panels and consoles. |
| `framework` | Framework-specific paths | Debug and test paths of popular web frameworks, server status pages, old CGI script folders, mail server endpoints, and the setup pages of some home and office routers. |
| `shell` | Web shells | Names typical of web shells and file uploaders, files an attacker leaves behind on a server they broke into, for ASP, ASP.NET and JSP servers. Web shells written in PHP are counted under `php`, because that category comes first. |

There is no separate `login` category. A login guess is counted on top of the category of the path it was sent to (see below).

A week's `kinds` lists only the categories that had at least one request that week, so the list can be shorter than this table.

## How a login guess is detected

A login guess is a recorded request (so: a "not found" answer to a path in one of the categories above) that was sent with `POST` and whose body carries a username or a password. Two body formats are read:

- **A login form**, sent the way a browser sends an HTML form, with a username field, a password field, or both. This is what a bot sends to a WordPress login page.
- **An XML-RPC call** with at least two text values. The first two are taken as the username and the password, which is how the WordPress XML-RPC login methods carry them.

Only a short part at the start of the body is read, and only for `POST` requests. Nothing else in the request is treated as a login guess.

These pages do not exist on digimasi.com, so no guess can ever succeed, and no real account or real form of ours is involved. The weekly `loginGuesses` field counts the requests that carried a username, a password, or both. Guessed passwords are never published in this repository. Guessed usernames are published only when they look like a bot's stock name such as `admin`; see [weekly/README.md](weekly/README.md).
