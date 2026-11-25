# Oathfilter – Arbeitsregeln

## Branch & Release
- Arbeite ausschließlich auf dem Branch `test`. Nie direkt auf `main`, außer ausdrücklich angewiesen.
- Fast-Forward-Merge nur auf `"merge"`: `git push origin test:main`.
- `CHANGELOG.md` (Englisch, nur spielerrelevant: `Added` / `Changed` / `Fixed` / `Removed`) nur beim Merge pflegen und die neuen Einträge kurz nennen.
- Commit-Nachrichten enden mit den Attribution-Zeilen (`Co-Authored-By`, Claude-Session).

## Stack, UI & Dateien
- UI/Styling nutzt **Vue**, **Tailwind** und **Lucide**; bestehende Strukturen sowie `css/theme.css` und `css/fonts.css` respektieren[cite: 1] und keine fremden UI-Frameworks einführen.
- Rechtliche Bereiche (Impressum, Privacy, Legal) niemals anfassen.
- Große Spieldaten- oder Affix-Dateien nie komplett in den Kontext lesen; Struktur und Einträge gezielt per `head` oder Node-Einzeiler prüfen.

## Format, Limits & Tests
- `BOFILTER`-Export strikt spielkompatibel halten: keine Filter-, Regel- oder Autorennamen in den Ingame-Code schreiben (Namen nur in `localStorage` und Share-Daten).
- Das Filter-Limit von 200 Regeln sowie pro-Regel-Limits aus Patch 87 beachten; unbestätigte Spiel- oder Formatdetails klar als solche kennzeichnen statt zu raten.
- Nach Änderungen Syntax-Checks und `tests/run.mjs` ausführen[cite: 1].

## Broken-Oath-API (Regeln des Entwicklers, Details: Projekt-Doc `claude/broken-oath-api-regeln.md`)
- Die Seite ruft die API nicht zur Laufzeit ab; Spieldaten sind eingebaut (lokale Spieldateien bzw. gecachte API-Stände). Nie pro Besucher von `api.playbrokenoath.com` laden.
- Beim Aktualisieren: erst `version.json`; Ladder höchstens alle 15 min, Builds/Meta höchstens stündlich, `game-data` nur bei neuem `game_data.patch`; ETag/`If-None-Match` nutzen.
- Nur die API-Dateien verwenden, nie Spielserver, Login oder In-Game-Ladder scrapen. Keine Heldendaten einer realen Person zuordnen.
- Seite zeigt Credit "Data: Broken Oath public API" (mit Link zum Spiel) und stellt sich nicht als offiziell dar ("A fan project, not official data").

## Kommunikation
- Seitentexte auf Englisch, Antworten an Mathies auf Deutsch, kurz und knapp.
- Änderungen direkt ausführen, nicht erst fragen.
