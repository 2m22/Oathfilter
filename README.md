# Oathfilter

A single-page loot filter builder and drop simulator for **Broken Oath**. Import, edit, test, and export filters using the native `BOFILTER 1` format directly in your browser.

* **Live:** https://2m22.github.io/Oathfilter/
* **Changelog:** [`CHANGELOG.md`](CHANGELOG.md) *(newest first)*
* **Note:** Unofficial fan tool, not affiliated with Crater Studios.

---

## Features & Usage

Open `index.html` in any modern browser — no build step, no installation required. The UI uses Vue 3 (module library), Tailwind CSS (utilities) and Lucide (icons) from a CDN; the filter logic (`js/filter-engine.js`, `js/modules.js`) has no DOM or framework dependency, and `node tests/run.mjs` runs without a browser.

* **Editor:** Create and organize rule cards with action, rarity, item type, level, line, quality, count, colour, and sound. Search and filter across your rule list.
* **Easy / Advanced Mode:** Toggle **Easy Mode** at the top to generate a complete filter from a Rupture Level floor and a few clicks, or switch to **Advanced** for full rule-level control.
* **Drop Test:** Simulate random drops against your active filter to see which rule matches each item, or check a drop screenshot directly against your rules.
* **Import, Copy & Share:** Paste a `BOFILTER:1,...` code, load a saved/shared filter, or copy and share your setup from the top editor bar.
* **Modules:** Insert built-in modules (armour base tiers, defence types, chase reds, caster affix control, Dwarven Runes and Quivers, gems, cleanup) or your own. Before inserting, the check shows the new rule count out of 200, the position and rules that would be shadowed. Oversized lists are split into several rules at the game limits (`an=N` rules are never split). **Sell** needs a confirmation for Hide Magic, Hide Normal and custom rules. Module, rule and author names stay in the browser and in share files, never in the game code.
* **Game Presets:** Load the five built-in game filters (*All loot*, *Tidy*, *Strict*, *Very strict*, *End Game*) from the preset menu above the rule list.

---

## `BOFILTER 1` Format Reference

Filters start with `BOFILTER:1,<preset>` followed by pipe-separated rules (`|`). Rules are evaluated top-to-bottom: **the first matching rule wins**, and items matching no rule remain visible.

* **Rule Limit:** Up to **200 rules** per filter *(increased from 40 in Patch 87)*.
* **Base Rule Structure:** `|on,type,rarity,level,line,action,colour,quality,count,sound` *(10 integers)*.
* **Extended Options (`MORE` window):** Appended as `,3:key=value;key=value` *(where `3` is the filter version)*. Unrecognized fields are preserved unchanged on export.

| Key | Description | Notes / Limits |
| :--- | :--- | :--- |
| `t` | Tier | |
| `n` | Number of lines | |
| `s` | Sockets | |
| `i` | Item level range (`from-to`) | |
| `q` | Required level range (`from-to`) | |
| `g` / `gx` | Grade / Top grade | |
| `r` | Red items | `1` = reds only, `2` = chase reds |
| `u` | Unsworn | `1` = not unsworn, `2` = unsworn only |
| `rt` | Runes up to tier | |
| `b` | Base item(s) | Joined with `+` *(max 12)* |
| `a` | Named line(s) | Joined with `+` *(max 6)* |
| `rn` | Named red(s) | Joined with `+` *(max 12)* |
| `k` | Prefix / Suffix line count *(Patch 87)* | `1` = prefix only, `2` = suffix only (for `t`/`n`) |
| `d` | Defence type *(Patch 87)* | `1` Armour, `2` Evasion, `3` Energy Shield, `4` Ar+Ev, `5` Ar+ES, `6` Ev+ES |
| `na` | Not these lines *(Patch 87)* | Joined with `+` *(max 6)* |
| `nb=1` / `nr=1` | Invert base / red list *(Patch 87)* | Turns `b` / `rn` into *"none of these"* |
| `an=N` / `all=1` | Named line match mode *(Patch 87)* | `an=N` = any `N` lines, `all=1` = all of them *(incompatible with `nb`/`nr`)* |

* **New Item Types (Patch 87):** `33` (Dwarven Runes), `34` (Quivers).

---

## Release Workflow (`test` → `main`)

GitHub Pages (`.github/workflows/pages.yml`) deploys `main` to `/` and `test` to `/test/`, injecting `version.json` and the build ID into `index.html` for the in-app update banner.

1. **Changelog Format:** Add a new top heading `## <date>` *(or `## <date> (2)` for multiple merges on the same day)* at the top of `CHANGELOG.md`. Start every entry with a concise headline sentence, as the *"What's new"* banner displays the first sentence of each top-level item.
2. **Merge Check:** Ensure `.github/workflows/pages.yml` is included when merging `test` into `main` (`git diff main test -- .github/workflows/pages.yml` should be empty afterwards). Builds fail if the update check is present without `version.json` or a build ID.

---

## Credits & License

* **Drop Simulator Idea:** Lilshrimper
* **Sound List & Format Reference:** Community filter builder author
* **License:** Code is licensed under **GPL-3.0** (see [`LICENSE`](LICENSE)). *Broken Oath* names, item data, and game content belong to Crater Studios and are not covered by GPL-3.0.
