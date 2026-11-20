# Oathfilter

Loot filter builder and drop simulator for **Broken Oath**. Uses the real BOFILTER 1 format: import, edit, test and export in one HTML file.

Unofficial fan tool, not affiliated with Crater Studios.

**Live: https://2m22.github.io/Oathfilter/**

## Use

Open `index.html` in a browser. No build, no install.

- **Filter Editor**: rule cards with action, rarity, item type, level, line, quality, count, colour and sound. Search and filter the rule list.
- **Drop Test**: roll random drops against your filter and see which rule catches each item.
- **Import / Export**: paste a `BOFILTER:1,...` code or export one for the game, plus a readable text version.
- Game presets: the menu above the rule list loads the five in-game filters (All loot, Tidy, Strict, Very strict, End Game).

## Format

`BOFILTER:1,<preset>` followed by rules `|on,type,rarity,level,line,action,colour,quality,count,sound` (10 integers per rule). The first matching rule wins; items that match no rule are shown. Maximum 40 rules (tested in game on 2026-11-20). Extra fields after the 10th are kept unchanged.

## Credits

- Drop simulator idea: Lilshrimper
- Community filter builder: its author, for the sound list and format reference

## Privacy

Everything runs in your browser. No filter data is sent anywhere, and there are no cookies or analytics. The current filter is kept in your browser's local storage. Fonts are loaded from Google Fonts, and the page is hosted on GitHub Pages.

## License

GPL-3.0, see `LICENSE`.
