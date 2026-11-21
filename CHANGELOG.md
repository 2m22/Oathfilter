# Changelog

All notable changes for players. Newest first.

## 2026-11-21 (3)

### Changed
- Easy Mode uses affix tiers instead of an item level floor. Rupture Level (slider, Any to 90) tells the page which affix tiers can drop at that level. Every gear pick gets a tier limit per line (Keep tiers: best tier, best 2 or best 3), so gear with only low lines is hidden. Idol rules are not affected.
- The update box shows "What's new" below its buttons. After a reload, the same box shows the changes once instead of a separate box.

### Fixed
- Easy Mode no longer fails with too many rules when you pick many options. Over the 40-rule limit, your picks share rules and one colour (43 rules become 33 with every pick on).

## 2026-11-21 (2)

### Added
- Update box shows what is new. When a new version is ready, the box lists only the changes since the version you have. If you dismissed it and reloaded later, a one-time "Oathfilter was updated" box shows what changed since your last visit. Nothing is sent anywhere.

### Changed
- Easy Mode picks follow your Magic setting. While Magic gear is hidden, every match rule (gear, Idols, level floor) uses Rarity Rare. When Magic gear is not hidden, they use any Rarity. Magic gear is now hidden by default.
- Easy Mode rule order: the Hide rule for Normal and Magic gear now sits after your picks and before "Everything else", so shown matches are never caught by it. With only a level floor it still comes before the floor's Show rule.

## 2026-11-21

### Added
- Easy Mode. A big **Easy | Advanced** switch at the top of the Editor. In Easy Mode you set a Rupture Level floor and click what you want to see, and the page builds the whole filter for you.
  - Rupture Level steps 10, 20, 30, 40, 50, 60, 70 and 84+, with an adjustable "item level = RL + offset" assumption and a level floor (Off, Relaxed, Normal, Strict). RL = item level from RL 10 is reported by players and not confirmed in the game files.
  - One list of picks: Attacks, Spells, Minions, Damage over time, Elemental, Curse / Vow, Move Speed, Melee, Slam, Bow / Projectile, Chain, Trap, Totem / Ballista, Channelling, Orbiting, Life, Resists and Defences. A pick keeps the matching gear and the matching Idols and hides the other Idols. Picks without gear lines only change Idols.
  - Hide Normal gear and/or Magic gear. "Always keep" for Core-touched, Rune bases and Truesworn bases. Show or Highlight for your picks.
  - Lines that two picks share (for example crit chance) are listed once, so they never waste a Named Line slot or a rule.
  - The page chooses the strategy: only a few Hide rules when nothing else restricts the loot, otherwise Show or Highlight rules first and "Everything else" as the last Hide rule.
  - A result panel with the rule count of the active filter and of the Easy Mode preview, the strategy, the rule list and warnings for rules that can never be reached. When a result would need more than 40 rules, it shows an error with the exact number and does not apply it.
  - "Copy Easy Mode filter code" in the result panel copies the preview rules without applying them.
  - Easy Mode never overwrites rules you changed in Advanced: it asks first, and Ctrl+Z brings your previous rules back. Its settings are stored in your browser only.
- Check a drop screenshot (Drop Test). Paste, drop or choose a screenshot of a drop or tooltip. The text is read on your device, you can fix it, and the page finds the first matching rule top to bottom (rarity, type, item level, tiers, lines). If the tooltip names a rule, it is compared with the result. Things the screenshot cannot show are listed as open points. It recognises rune bases, skips runes and jewels with a note, and reads right-aligned tier markers and wrapped lines. The first scan downloads the text reader (tesseract.js) once; your image is never uploaded.

### Changed
- The top-right "Active filter" badge shows the rule count of the filter you have now. The "Copy filter code" button is hidden while Easy Mode is open, because Easy Mode has its own copy button.
- Copying a filter with more than 40 rules still works, but now warns that the game takes 40.
- "Any gear" no longer matches Idols in the Drop Test, like in the game. Rules for Idols need the Idol type.
- Hide now works on Idols in the Drop Test, like in the game.

### Fixed
- Drop Test: loot on the ground view no longer overlaps or runs outside the stage when you zoom or resize the window. The stage scrolls when there is more loot than fits.

## 2026-11-20

### Added
- Optional rule names. Give each rule a name in the Rule Editor; it shows in the rule list and the Drop Test log. Names are never part of the game code.
- Local filters in Import / Export: "Save existing filters" and "Load existing filters". Filters are stored in your browser only, with rename, delete and a confirmation before replacing your current filter. Undo brings the previous filter back.
- The Drop Test log shows which rule (`Rule #N`) showed, highlighted, sold or hid an item, or that no rule matched and the item is shown normally.
- Rules can be dragged and dropped to change their order, and removed with the red X next to the rule number.
- Sell action for rules (marked as unconfirmed, since the game's exact behaviour is not known).
- "Any of them / All of them" for the mods you pick on a rule.
- Guide and About cards can be collapsed.
- More Named Lines: Riven lines, Penetration lines (Fire / Cold / Lightning, Elemental on amulets) and "increased effect of your Vows". Lines that only exist while a game switch is on are tagged "switch-dependent".
- Searching Named Lines now also finds raw game terms and ids, and several words must all match.
- Pick lists keep their scroll position when you select or deselect entries.
- Share links: "Create link" in Import / Export makes a short link to your filter and its rule names. One click copies it as a Discord link. Opening a link shows a preview (rule count, rule names, how often it was opened) and lets you replace your filter or save it to your local filters. Sharing the same filter again gives the same link. If the share service is down, an offline link is created instead. Your game code is never changed by this.
- Rule preview: hover over a rule in the list to see its named lines, bases, reds and conditions. Shows "Any of them" or "All of them", shortens long lists and says so when no specific mods are picked.

### Changed
- All lists are sorted alphabetically: item types, line groups, sounds, colours, presets, saved lists and filters, and picked lines. Your own rules keep your order.
- Local filters hint now says that saving there uploads nothing.
- The Drop Test is now described as a rule test, not a drop-rate simulation. Guide and About are regrouped and easier to scan.
- The "new version available" prompt is centered on screen with a light backdrop and works with the keyboard (Esc = remind me later).
- The Sell counter only appears when a Sell rule exists or Sell samples were counted.
- The Rule Editor no longer shows test-drop hit counts or the roll strip.
- Named Lines, Bases and Reds are sorted alphabetically by their readable text.
- Affix texts are shown in plain readable form (no template syntax like `#|plural(...)`). Long entries are shortened in the list, with the full text and game ids in the tooltip.

### Removed
- The "Readable" export view. The export area now shows the game code only.

### Fixed
- Attack Speed is now one Named Line, as in the game. It used to show twice ("Attack Speed" and "Attack Attack Speed").
- The Named Lines list no longer stops after 80 entries, so every line can be found.
- Searching in the rule list now filters while you type.
- Copy fixes: stray empty brackets, doubled spaces, and the lone dot before "Source on GitHub".
