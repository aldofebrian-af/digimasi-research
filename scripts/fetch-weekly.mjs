// Writes every finished week from digimasi.com's public summary into weekly/ (once; a written week is never changed).
// Run by .github/workflows/weekly.yml; `node scripts/fetch-weekly.mjs` works locally too (Node 20+).
import { existsSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SOURCE = 'https://digimasi.com/api/research/weekly.json'
const OUT = join(import.meta.dirname, '..', 'weekly')
const KINDS = { 'env-file': 'Secret configuration files (.env)', git: 'Code history folder (.git)', wordpress: 'WordPress', php: 'PHP files', 'cloud-keys': 'Cloud and server keys', config: 'Other configuration files', backup: 'Backup files', 'admin-panel': 'Admin panels', framework: 'Framework-specific paths', shell: 'Web shells' }

const res = await fetch(SOURCE, { signal: AbortSignal.timeout(30_000) })
if (!res.ok) throw new Error(`${SOURCE}: HTTP ${res.status}`)
const { weeks = [] } = await res.json()

const md = (s) => String(s).replace(/[|\\`*_[\]<>]/g, (c) => `\\${c}`)
const table = (title, head, rows) => (rows?.length ? `## ${title}\n\n| ${head} | Requests |\n|---|---:|\n${rows.map((r) => `| ${r[0]} | ${r[1]} |`).join('\n')}\n` : '')
function render(w) {
  return [
    `# Week of ${w.start} to ${w.end}\n`,
    'Jakarta time (UTC+7). Source: the passive sensor on digimasi.com. See [METHODOLOGY.md](../METHODOLOGY.md).\n',
    `| Requests | Source addresses | Countries | Login guesses |\n|---:|---:|---:|---:|\n| ${w.probes} | ${w.sources} | ${w.countries} | ${w.loginGuesses} |\n`,
    table('What was looked for', 'Category', w.kinds.map((k) => [KINDS[k.name] ?? md(k.name), k.n])),
    table('Most requested paths', 'Path', w.paths.map((p) => [`\`${p.name.replace(/`/g, "'")}\``, p.n])),
    table('Source networks', 'Network', w.networks.map((n) => [md(n.name), n.n])),
    table('Source countries', 'Country (ISO code)', w.countryList.map((c) => [md(c.name), c.n])),
    table('Usernames guessed', 'Username', w.users.map((u) => [`\`${u.name.replace(/`/g, "'")}\``, u.n])),
  ].filter(Boolean).join('\n')
}

let written = 0
for (const w of weeks) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(w.start)) continue
  const json = join(OUT, `${w.start}.json`)
  if (existsSync(json)) continue
  writeFileSync(json, `${JSON.stringify(w, null, 2)}\n`)
  writeFileSync(join(OUT, `${w.start}.md`), render(w))
  written++
  console.log(`wrote ${w.start}`)
}
console.log(written ? `${written} new week(s)` : 'nothing new')
