# Changelog

All notable changes for players. Newest first.

## 2026-11-27

### Added
- Import build: paste a build link (`#buildz=`) or code in the Advanced editor (Rules column) or in Easy Mode. The build's gear lines are highlighted per item type and by tier, shaped by the chosen strictness (Leveling, Endgame or Uber Strict). Lines are grouped into rules by their tier limit, and lines with mixed limits all stay highlighted.
- Easy Mode: an imported build stays loaded (shown by name with a "+ builds" badge) until you press "Remove build". Build focus pills can be picked during import.
- Builds without rolled lines (only bases) import as well. Their Rare bases are highlighted from item level 82.

### Changed
- Easy Mode Leveling hides Normal and Magic gear from item level 20 when you have Build focus picks or an imported build. Without either, nothing is hidden by this rule.
- Easy Mode Endgame and Uber Strict hide rules also apply to an imported build without Gear picks. With Gear picks nothing changes.

### Fixed
- Build import keeps Rare Ashen and Gnome-made bases visible above the import's hide rules.
- Build import: Skill level lines take the build's tier in Endgame and Uber Strict, like other build lines. Leveling is unchanged.

## 2026-11-25

### Added
- Game data of Patch 90 (local game files): 49 more bases, 14 more uniques, updated drop weights, the Hewing Axe and the Signet names.
- New affix "X% faster Energy Shield Recharge" (amulets, belts and Energy Shield armour), also in the Easy Mode Energy Shield group.
- Easy Mode: new "Chaos" button under Ailments.
- Easy Mode: 9 rules keep every Rare Ashen and Gnome-made base highlighted in Ash colour. They sit below your tier highlights and above every hide. Switch: "Highlight Rare Ashen and Gnome-made" (on by default).
- Easy Mode: optional "Hide Normal and Magic Dwarven Runes" (off by default). Sell does not work on Dwarven Runes in the game, so it hides them.
- Copy filter code and Share Filter Link check the 200 rule limit when the filter leaves the page. Over 200, the page offers a safe merge of neighbouring rules (nothing is copied until you confirm) or tells you it cannot fit. The game cuts a pasted filter at rule 200 and drops the rules after it. Editing is never blocked.
- Order check at copy and share: it warns when a Hide or Sell sits above the Ashen block, when a tier highlight sits below it, and about Sell on Dwarven Runes.
- Share links made offline also carry the game data build and a check hash, and the code from before a merge.
- Rules that can never match are marked "never matches". Nothing is deleted.
- Easy Mode is now three steps: pick a filter strictness (Leveling, Endgame or Uber Strict), optionally a build focus, then keep or hide extras. Uber Strict also keeps top-roll Rare gear (item level 82+) and hides the other Rares. A badge shows Leveling, Endgame, Uber Strict, + builds or Custom.
- The language selector now translates the whole page (buttons, tabs, Easy Mode, Drop Test, Import), not only game texts. 28 languages are covered; Thai and the long Guide, About and help texts stay English.
- Leveling now steps its tier limits by item level on its own (under 20, 40, 60 and 75, then 75+), keeping the best tier that can drop plus one more. It only affects the lines of your Build focus picks.
- Leveling always shows "+X to Level of all Skill Gems" (skill level affixes), whatever the tier or item level.
- Advanced editor: choosing an item type now filters the lists at once. The Named line and Not these lines pickers show only mods that can roll on that item type ("Show mods": All mods, Can roll on this item type, Only on this item type), and the Base and Named red pickers show only bases and reds of that type.
- Advanced editor: Defence type narrows the base, mod and red lists as well, together with the item type (for example Body armour + Armour shows plate chests only).
- Advanced editor: "Item kind" splits Shields, foci and quivers in the mod, base and red lists.
- Advanced editor: with bases picked, the mod lists hide mods that cannot roll on those bases, and the red list shows only reds on them. Two switches in the column headers turn this off.

### Changed
- Patch 90 affixes: the top tier of 26 affixes (attack, cast and move speed, leech, on-kill, ailment chance and effect, minion speed, curse effect and limit) now needs item level 84. New Added Damage ranges. Curse limit is rarer.
- Patch 90 uniques: Halo of the Restless Saint and Quarrybreaker Fists drop far less often; the Ashen-style Rotfang Cleaver, Codex, Quiver, Claw and Fist uniques now sit on their normal bases.
- New layout: centred 1280px page, calmer top bars, equal cards and one slim status bar with the rule count (X / 200) on all tabs.
- Leveling keeps 2 tiers (was 3). Lines without any tier limit, such as the Max Resistance lines, stop showing from item level 75 in Leveling.
- The Easy Mode rarity-0 catch-all no longer hides Normal and Magic gear when only one of them is hidden; it now has separate Hide rules for each.
- Named lines: the tier limit and the line counts (n, Any N, All of them) now count only the named lines, as the game does. Without named lines they still count all lines. Top roll still looks at the whole item.

## 2026-11-24

### Added
- Game data of Build 89: 106 more red uniques (including 12 new chase reds) in the pickers and the Drop Test, plus the new Entropy affixes (Entropy Multiplier, Entropy implodes sooner, Implosions ignore Chaos Resistance).
- Easy Mode: new Chaos button under Ailments with the Entropy lines.

### Changed
- Drop weights and flags of a few existing uniques follow Build 89 (for example Kimono, three uniques that no longer count as sold-only).
- Red labels no longer show internal ids for the new Afterimage uniques.

## 2026-11-23

### Added
- Game data of Build 88: 42 more red uniques (16 normal reds, 7 chase reds and 19 Primal versions) in the pickers and the Drop Test.
- Module & Rule Organizer: the Modules button opens a two-pane window with your modules on one side and your rules on the other. Reorder by dragging a row (on touch: press and hold) or with the arrow buttons, tick several modules at once, use tags, and collapse or expand all cards. Create and Import sit at the top of the library.
- Advanced Mode: the preset, order check, rule list, What happens, Item conditions and Look and sound areas can be folded, and the page remembers which ones you closed.
- Sound select: a Play button previews the chosen sound (the sound files are not included yet, so it shows a short message for now).
- Affix database export (JSON and CSV) and an Easy Mode matrix, generated from the code.
- Notes next to the controls: SHOW* lines in the Drop Test, "Sell is not confirmed in the game", and the difference between the game code and a share link.

### Changed
- Easy Mode groups are reorganised: attributes sit under their defence group, max resistances and Physical taken are under Resists, and some lines are excluded. Separate rules per pick are now the default.
- Idol tiers were checked against the game files (Grand tier item levels, two wrong Grand tags, one line alias). Idol rules in Easy Mode never carry a tier limit.
- All fold and arrow controls use the same chevron icons with a gold hover. Clear filter is set apart from the other buttons, and the language select looks like the other selects.
- "The Ninefold Wound" is now called "The Ninth Cut", as in the game.
- Drop weights of existing reds follow Build 88 (24 reds can no longer drop in the Drop Test, a few drop less often or more often).

### Fixed
- Easy Mode: Hide magic no longer limits Idol rules to Rare. Idol rules match any rarity.
- Module Insert stayed disabled after switching from Easy Mode to Advanced Mode.
- Update message and toasts were hidden behind the organizer window.
- In the Organizer, the module list overlapped the rules column on narrow screens.

## 2026-11-22 (8)

### Changed
- Named line pickers: lines that roll on the weapon itself (Adds X to Y Damage, Increased Physical Damage) now say "(local)", for example on bows. The Adds Physical, Fire, Cold and Lightning Attack Damage lines show a "?" that explains they roll on quivers, gloves, rings, amulets and boots, not on the weapon.

## 2026-11-22 (7)

### Added
- Penetration lines (Fire, Cold and Lightning, one-handed and two-handed, and the Elemental amulet line) with their four tiers from the game files. Easy Mode uses them for its tier limits. They do not drop in the Drop Test, because the game loads them only while a game switch is on.
- Easy Mode: the Bow / Projectile pick now covers bows and quivers (Adds Physical, Fire, Cold and Lightning Attack Damage, Increased and Added Physical Damage, Attack Speed, Crit Chance, Crit Multiplier and +Level of all Skill Gems). Before, it had no gear lines at all.

### Changed
- Easy Mode puts a line without a tier limit into a rule whose limit already covers all its tiers, so some picks need one rule fewer (for example Attacks + Cold at Rupture Level 60: two rules instead of three).
- Reds that share a name are told apart in the picker: Primal copies show "(Primal)", the Signets of the Lost Order show their variant.

### Fixed
- The pick lists stopped after 4 entries. They now allow the game limits again: 6 named lines, 6 not-these lines, 12 bases and 12 reds.
- "X% increased effect of your Vows" was listed twice.
- Thunderwake Maul uses the right base (Mace 1h 2) and level 10 in the Drop Test.

## 2026-11-22 (6)

### Added
- Module library in the Editor: built-in modules for armour base tiers, defence types, chase reds (including Shard of the Fourth Spark and Mardoth's Last Pebble), caster affix control (hides Adds X to Y Cold Damage and Adds Fire / Cold Attack Damage, keeps Cold Damage to Spells), Dwarven Runes and Quivers, gems and cleanup. Search by name, description, category, base or line, and filter by category.
- Before a module is inserted you see how many rules it adds, the total out of 200, the insert position, and a warning if it would pass 200 rules or earlier rules would catch its items first.
- Modules that are too long are split into several rules at the game limits (6 named lines, 12 bases, 12 reds, 6 not-these lines). "Any N" and "all" rules are never split.
- Your own modules: save from selected rules, rename, edit, duplicate, delete, add a description and category, copy and share. Module and rule names stay in your browser and in shared files, never in the game code.
- Sell asks for confirmation when it is used for Hide Magic, Hide Normal or custom rules, because a broad or misordered Sell rule can sell items you wanted.

### Changed
- Cleaner look: duplicate styles removed, hover and focus colours fixed, long names wrap inside lists, the Drop Test control bar scrolls on short windows, and dialogs and messages are no longer covered by help tooltips.

## 2026-11-22 (5)

### Added
- Gems rules in the Editor and in Easy Mode: Hide gems or Sell gems (Type Gems, Rarity Any, no other condition, as the game allows). The Drop Test shows gems and support gems; currency, runes, gold, flasks and uniques are never hidden.
- "Vow effect" in Has a line (group 27), linked to the named line.
- Easy Mode: a Gems setting (off, Hide gems, Sell gems). Fire and Cold picks now include Adds Fire and Cold Attack Damage.

### Changed
- Any N of them only counts named lines. For bases and reds the game keeps it in the code but ignores it, so Oathfilter blocks it there. It needs at least 3 lines.
- Oathfilter writes the conditions of a rule in the order the game exports them (Bases, Named lines, Not these lines, Tier, Count lines, Lines needed, Defence type, Item level, Quality, Gold, Max gold, Reroll, Not these reds, Reds, Unique, Rune tier). Codes you import keep their own order.
- Easy Mode only shares rules between picks when the filter would pass the 200 rule limit, so every pick keeps its own rules and colour.
- The Sources text now says: game files from build 87, public API checked at build 86.

## 2026-11-22 (4)

### Added
- Patch 87 filter options in the Editor (More conditions): Defence type (Armour, Evasion, Energy shield and the three mixes), Count lines of type (Prefix or Suffix lines only, for Tier and Lines), Not these lines (up to 6), None of these for bases and reds, and Any N of them for named lines.
- Item types Dwarven Runes and Quivers. Type 9 is now "Shields, foci & quivers".
- New named line: Vow effect (amulet suffix). Two missing lines, Adds Fire and Cold Attack Damage, were added too.
- Easy Mode: the Defences chip is split into Armour, Evasion and Energy Shield.
- Drop Test: 34 new Core Touched armour bases, 52 new reds (including the chase reds Shard of the Fourth Spark and Mardoth's Last Pebble) from game build 87.

### Changed
- New list limits as in the game: 6 named lines, 12 bases, 12 reds and 6 not-these lines per rule. The rule limit is 200.
- Easy Mode puts six lines into one rule instead of four, so the filter needs fewer rules.
- Easy Mode has a new layout: full width, a result bar at the bottom, grouped chips with a check mark, a Clear all button, and new chip icons and hover and selected states.
- Advanced Mode: modules start collapsed, an "Active only" toggle, a one-line summary on each rule, a badge when More conditions are set, a dimmed look section for Hide and Sell, a Clear link and Esc in the picker search. The RULES column stays in place while the rule editor scrolls.
- Rule editor: the Base, Named line and Named red pickers line up, Normal rarity dims Roll quality and Lines needed with a note, and More conditions are grouped into Level & tier, Item properties and Special flags. Changed dropdowns are highlighted.
- The tooltip text now says Good roll = T1-T2 and Top roll = T1, as in the game's filter text.
- Imported codes keep the key order they came with. Oathfilter writes new codes in the order the game uses.

### Removed
- The drag handle on rule cards (rules can still be moved with Alt+Shift+Arrow and by dragging the card).
- The Privacy & technical section, the privacy wording in the footer and the privacy section in the README.

### Fixed
- Ids that the game writes with a capital letter (Life, Mana, Bow_1) are now found. Before, their names were missing and the rule did not match in the Drop Test.

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
