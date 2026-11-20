# Changelog

All notable changes for players. Newest first.

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
