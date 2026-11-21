# Oathfilter

Loot filter builder and drop simulator for **Broken Oath**. Uses the real BOFILTER 1 format: import, edit, test and export in one HTML file.

Unofficial fan tool, not affiliated with Crater Studios.

**Live: https://2m22.github.io/Oathfilter/**

**Changelog: [CHANGELOG.md](CHANGELOG.md)** (what changed, newest first)

## Use

Open `index.html` in a browser. No build, no install.

- **Editor**: rule cards with action, rarity, item type, level, line, quality, count, colour and sound. Search and filter the rule list. The **Easy | Advanced** switch at the top turns on Easy Mode, which builds a whole filter from a Rupture Level floor and a few clicks.
- **Drop Test**: roll random drops against your filter and see which rule catches each item. You can also check a drop screenshot against your filter.
- **Import / Export**: paste a `BOFILTER:1,...` code or export one for the game.
- Game presets: the menu above the rule list loads the five in-game filters (All loot, Tidy, Strict, Very strict, End Game).

## Format

`BOFILTER:1,<preset>` followed by rules `|on,type,rarity,level,line,action,colour,quality,count,sound` (10 integers per rule). The first matching rule wins; items that match no rule are shown. Maximum 40 rules (tested in game on 2026-11-20). The options of the game's MORE window follow the ten numbers as `,3:key=value;key=value` (`3` is the filter version): `t` tier, `n` lines, `s` sockets, `i` item level `from-to`, `q` required level `from-to`, `g` grade, `gx` top grade, `r` red (1 reds only, 2 chase reds), `u` unsworn (1 not, 2 only), `rt` runes up to tier, `b` base, `a` named line, `rn` named red (several entries joined with `+`, up to 4). The keys were read from filter codes exported in the game. Fields this page does not know are kept unchanged.

## Release (merging `test` into `main`)

The Pages workflow (`.github/workflows/pages.yml`) builds `main` to `/` and `test` to `/test/`. It writes `version.json` and the build id into `index.html` of each site; the page uses them for the "new version" banner. When merging `test` into `main`, make sure `.github/workflows/pages.yml` is part of the merge (check `git diff main test -- .github/workflows/pages.yml` is empty afterwards). The workflow fails the build if a page has the update check but no build id or `version.json`. The "new version" banner also shows a compact "What's new" list. It reads `CHANGELOG.md` (published next to the page) and shows the first sentence of each top-level entry, so start every changelog entry with a short headline sentence. Every merge adds a **new** `## <date>` section on top (for a second merge on the same day use `## <date> (2)`): the build writes the newest heading into the page as its release, and the banner (and, after a reload, a one-time "Oathfilter was updated" box for people who dismissed the banner) lists only the sections above the release the visitor had.

## License

The code is under the GPL-3.0 (see `LICENSE`). Broken Oath names, item data and game content belong to Crater Studios and are not covered by it.

## Credits

- Drop simulator idea: Lilshrimper
- Community filter builder: its author, for the sound list and format reference

## Privacy

Everything runs in your browser. No filter data is sent anywhere, and there are no cookies or analytics. The current filter is kept in your browser's local storage. The fonts (Cinzel and Barlow, SIL Open Font License) are built into the page, so nothing is loaded from Google. The page is hosted on GitHub Pages.

## License

GPL-3.0, see `LICENSE`.
