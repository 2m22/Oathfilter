# Oathfilter – Arbeitsregeln

- Arbeite nur auf Branch `test`. Nie direkt auf `main`, außer ausdrücklich angewiesen. Merge nur auf "merge": `git push origin test:main` (fast-forward).
- Rechtliche Bereiche (Impressum, Privacy, Legal) niemals anfassen.
- Große Spieldaten-/Affix-Dateien nie komplett in den Kontext lesen. Struktur und Einträge gezielt per `head` oder Node-Einzeiler prüfen.
- `BOFILTER`-Export strikt spielkompatibel halten: keine Filter-, Regel- oder Autorennamen in den Ingame-Code schreiben (Namen nur in Local Storage und Share-Daten).
- Seitentexte auf Englisch, Antworten an Mathies auf Deutsch, kurz und knapp. Änderungen direkt ausführen, nicht erst fragen.
- `CHANGELOG.md` (englisch, nur spielerrelevant: Added/Changed/Fixed/Removed) nur beim Merge pflegen und die neuen Einträge dem User kurz nennen.
- Commit-Nachrichten enden mit den Attribution-Zeilen (Co-Authored-By, Claude-Session).
