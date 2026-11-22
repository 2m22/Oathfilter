# Changelog

All notable changes for players. Newest first.

## 2026-11-22 (3)

### Changed
- Easy Mode: the Life chip is split into three chips. Life keeps only +Life. Mana (+Mana and Mana Regen) and Leech & Regen (Life Leech, Mana Leech, Energy Shield Leech and Life Regen) are new. If you had Life picked before, only +Life stays, so pick Mana or Leech & Regen again if you want them.
- Easy Mode: all chips now use the same colour (white), and picks share rules. Lines from several picks fill the same rule, four lines per rule, with the same result as before but fewer rules. With all chips picked, the filter fits in 37 rules instead of falling back to one shared colour and list.

## 2026-11-22 (2)

### Changed
- Easy Mode: Rupture Level now stops at 84. Item level 84 is the highest tier level for affixes, so 90 never gave anything new. A saved 90 is loaded as 84.

### Fixed
- Easy Mode tier limits were too loose in some rules, so a rule could show "T2 or better" where "Best tier only" should give T1. Two causes: a line without known tier data (for example fire_pen95_2h) took the whole rule's tier limit away, and Idol lines with the same text loosened the limit for gear. Such lines now get their own rule, and Idol lines no longer count for gear.

## 2026-11-22 (1)

### Added
- Modules can be shared as a link ("Share" on a module, Copy link or Copy for Discord). A shared link can be inserted into your own filter from the share preview ("Insert into my filter"), at the top, after the selected rule or at the end. An insert that would go over 40 rules is blocked.
- Easy Mode: new AoE chip (under Other). It keeps gear and Idols with the "increased Area of Effect" line.

## 2026-11-21 (11)

### Added
- Clear filter button next to Share (Advanced Mode). It removes all rules, and Ctrl+Z brings them back.

## 2026-11-21 (10)

### Added
- Modules (Editor, Advanced Mode): save one rule, several rules or your whole filter as a reusable module. Insert it at the top, after the selected rule or at the end, or replace your filter with it ("Replace filter", Ctrl+Z brings yours back). Modules keep rule names, MORE options and all rule fields. An insert that would go over 40 rules is blocked, with a preview like 27 + 16 = 43 / 40.
- Shared filters can be saved as a module from the share preview.

### Changed
- Local filters are now modules. Your saved local filters are copied into Modules automatically.

### Removed
- The Local filters section in the Import tab.

## 2026-11-21 (9)

### Changed
- Screenshot reader: works with other game languages (beta). The text is translated back to English before reading, and the text reader language follows the Language selector. It still works best with the game in English.

## 2026-11-21 (8)

### Added
- Language selector in the header: affix lines, item bases and unique names can be shown in any of the game's 30 languages, using the game's own texts. The page itself, the filter code and shared filters stay English. Search in the pick lists finds both the translated and the English name.
- Easy Mode: Holy chip (Holy Damage exists on Idols only, so it adds an Idol rule)

## 2026-11-21 (7)

### Changed
- Easy Mode: when Normal and Magic gear are both hidden, the last rule ("Everything else") now hides Rare gear only. Normal and Magic are already hidden by the rule above it, so the result is the same, but the filter code is cleaner.

## 2026-11-21 (6)

### Changed
- Easy Mode: "Elemental" and "Damage over time" are replaced by Physical, Fire, Cold, Lightning, Poison, Bleed and Ignite. The picks are grouped into Playstyle, Damage type, Ailments and Other. Saved Easy Mode picks are converted automatically.
- Easy Mode: a damage type or ailment narrows Attacks and Spells. With Spells + Cold, Fire and Lightning spell lines are no longer kept, so gear that only has those lines is hidden. Gear that also has another picked line (for example Spell Damage) stays visible. Spells alone still keeps every Spell line.
- Easy Mode: Attacks now also keep flat Fire, Cold and Lightning damage on weapons. Shock, Chill, Freeze and Penetration lines belong to their element.

## 2026-11-21 (5)

### Added
- Small ? help buttons next to Easy Mode, Rupture Level, Tier strictness, What I want to see, Copy filter code, Share, the rule order, Hide, Sell, More conditions, the screenshot reader, the tier marker, the Sell counter and Local filters. They open on hover, keyboard focus or click/tap and close with Esc.
- The Guide explains Easy Mode (Rupture Level, Tier strictness, picks, preview) and the Drop Test Easy preview.

### Changed
- Easy Mode texts for Rupture Level and Tier strictness are shorter and clearer. The result panel has a collapsible Details section and the controls are wider.
- Messages that appear in several places now use the same wording (rule limit, Undo, Sell not confirmed, copy blocked, browser storage full). Too many rules in Easy Mode now reads "Too many rules: n / 40. Uncheck some options."
- Local filters and Import now point to Copy filter code instead of the old Export.
- The Guide says that Ctrl+D and Alt+Up / Down work in Advanced Mode only.

## 2026-11-21 (4)

### Changed
- The Drop Test simulates the Easy Mode preview while Easy Mode is on (up to 40 rules), and a line in the Result panel says which rules are simulated.
- The Copy filter code button shows the rule count in red when the filter is over the 40-rule limit.
- Easy Mode changes you have not applied yet can be undone with Ctrl+Z.
- Loading a saved filter that is unreadable, has more than 40 rules or a rule with more than 4 named lines now shows a warning.
- Share links with an oversized payload are refused instead of freezing the page.
- The Easy / Advanced bar, the Share panel and the Rupture Level ticks fit narrow screens and zoomed pages better.

### Fixed
- Ctrl+D and Alt+Up / Down no longer change your hidden Advanced rules while Easy Mode is on.
- A share link shown in the Editor is hidden as soon as the filter changes.
- Ctrl+Z no longer undoes your filter while you type in a form field or work outside the Editor.

## 2026-11-21 (3)

### Changed
- Easy Mode uses affix tiers instead of an item level floor. Rupture Level (slider, Any to 90) tells the page which affix tiers can drop at that level. Every gear pick gets a tier limit per line (Keep tiers: best tier, best 2 or best 3), so gear with only low lines is hidden. Idol rules are not affected.
- The update box shows "What's new" below its buttons. After a reload, the same box shows the changes once instead of a separate box.
- Copy filter code and Share are now two buttons in the Easy / Advanced bar at the top of the Editor. In Easy Mode, Share first replaces your filter with the Easy Mode rules. The Import / Export tab is now just Import, and the top-right Copy button and Download .txt are gone.

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
