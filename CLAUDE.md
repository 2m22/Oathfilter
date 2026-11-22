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

## Kommunikation
- Seitentexte auf Englisch, Antworten an Mathies auf Deutsch, kurz und knapp.
- Änderungen direkt ausführen, nicht erst fragen.
