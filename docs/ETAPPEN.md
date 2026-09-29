# Bau-Etappen

Arbeite eine Etappe nach der anderen. Am Ende jeder Etappe: Akzeptanzkriterien prüfen, harte Regeln aus `CLAUDE.md` gegenprüfen, dem Nutzer eine kurze Zusammenfassung geben und auf Abnahme warten. Die App ist nach Etappe 3 bereits im Alltag nutzbar, danach wachsen Küche und Connection dazu.

## Etappe 0: Fundament (Web-App)

Repository, Vite und TypeScript, Ordnerstruktur laut `docs/WEBAPP.md`, Design-Bausteine als CSS-Variablen, Manrope lokal, Komponenten, leere Tab-Navigation mit fünf Tabs, IndexedDB-Schicht mit Migrationen, PWA-Grundlagen (Manifest, Service Worker, Icons), automatische Veröffentlichung auf einem kostenlosen Hoster.

Akzeptanz:
- Die App ist unter einer HTTPS-Adresse erreichbar und lässt sich in Safari zum Home-Bildschirm hinzufügen. Sie startet danach im Vollbild ohne Browserleiste.
- Fünf Tabs sichtbar (Heute, Vorsätze, Küche, Connection, Inspiration), Safe Areas stimmen (Notch, Home-Indikator)
- Farben als CSS-Variablen, Hell, Dunkel und Fokusbühne laut `docs/DESIGN.md`
- Manrope lokal geladen (keine externen Anfragen), Schriftgrößen in rem
- Wiederverwendbare Komponenten: Atemlinie (Wellen), Startseiten-Karte mit Wellen, Frage-Screen, Pillen-Buttons, gruppierte Liste, Segmentschalter, Karte
- Wellenfarben laut `docs/DESIGN.md` (Hellmodus Blau, Dunkelmodus Tageslicht)
- Nach dem ersten Laden startet die App auch im Flugmodus
- Speicherschicht: IndexedDB mit Versionsnummer und Migrationen, Grundgerüst für Export und Import (JSON)
- Nur erlaubte Pakete (`vite`, `typescript`, `vitest`)

## Etappe 1: Morgen- und Abend-Ritual

Beide Flows mit Atemlinie, Fragen, Überspringen, Abschluss-Moment, Speicherung. Impuls-Wechsel-Logik (Identität/Dankbarkeit). Tagebuch als einfache Leseliste. Startseite "Heute" mit Begrüßungskarte.

Akzeptanz:
- Morgen-Flow ist in unter einer Minute durchlaufbar, Abend in unter zwei
- Jeder Schritt ist überspringbar, nichts ist Pflicht
- Einträge werden gespeichert, sind im Tagebuch lesbar und editierbar
- Wechsel-Logik ist per Unit-Test abgesichert (gerade/ungerade Tage, drei Modi)
- Abschluss führt zurück zu "Heute", kein Weiterführen, kein Score
- "Stress oder Angst?" ist eingeklappt und optional
- Bewegung-reduzieren-Modus funktioniert

## Etappe 2: Vorsätze und Aufgaben

Anlegen, bearbeiten, pausieren, löschen. Auswahl im Morgen-Flow. Dazu die einfache Aufgabenliste im selben Tab (Segmentschalter "Vorsätze | Aufgaben").

Akzeptanz:
- Felder Was, Warum, Wann/Wo, Status aktiv/pausiert
- Kein Abhaken, kein Zähler, kein Erledigt-Zustand bei Vorsätzen
- Sanfter Hinweis ab mehr als 5 aktiven Vorsätzen, keine harte Sperre
- Morgen-Flow zeigt Vorsatz mit Was und Warum
- Aufgaben: hinzufügen (Button und Return), abhaken, bearbeiten, Reihenfolge ändern, wischen zum Entfernen
- Erledigte Aufgaben landen in einem eingeklappten Bereich "Erledigt", die Links nennen keine Anzahl, "Erledigte entfernen" leert den Bereich
- Sanfter Hinweis ab mehr als 12 offenen Aufgaben
- Keine Fristen, keine rote Farbe, keine Zähler, keine Fortschrittsanzeige, keine Streaks (Abgleich mit den harten Regeln in `CLAUDE.md`)

## Etappe 3: Inspiration

Bedarfsfrage, bewusste Pause, gefilterte Anzeige (max. 5), Kuratier-Modus, Link öffnen, optionales eigenes Video, optionale Sprachnotiz.

Akzeptanz:
- Zugang nur über Bedarfsfrage plus Atempause, für alle identisch
- Anzeige zeigt das Warum zuerst, Link sekundär
- Kein Autoplay, keine Einbettung externer Player, kein Refresh, keine Endlosliste
- Eigenes Video pro Eintrag optional: Auswahl aus der Fotos-Mediathek (nur Videos), Kopie in den lokalen Speicher der Web-App (IndexedDB), Längenbegrenzung 90 Sekunden mit freundlichem Hinweis
- Video spielt nur nach Tippen, mit Ton (auf dem iPhone prüfen, ob er trotz Stumm-Schalter hörbar ist), ohne Schleife, ohne Folgevideo, bleibt am Ende stehen
- Video- und Vorschaubilddatei werden beim Entfernen des Eintrags oder Videos gelöscht
- Auf dem iPhone prüfen: Das Dateifeld für Videos öffnet die Fotos-Mediathek, das Video wird lokal gespeichert, die Wiedergabe hat Ton
- Speicherangabe der Videos in den Einstellungen, ohne Auswertung
- Harte Obergrenze 33 Einträge, beim Erreichen muss erst einer entfernt werden
- Hinzufügen, Bearbeiten, Löschen nur im Kuratier-Modus
- Kategorien Ruhe, Mut, Klarheit, Mein Warum funktionieren als Filter
- Leerer Anfangszustand ohne Beispieldaten

## Etappe 4: Küche

Kachelansicht, Kategorien, Zutaten und optionale Zutaten, Suche nach Zutaten, "Was koche ich?", Einkaufsliste laut `docs/SPEC.md`, Abschnitt 6.

Akzeptanz:
- Gerichte erscheinen als Kacheln (zwei Spalten) mit Kategorien, Name, Aufwand und Anlass, Wellenkante unten, Häkchen bei Gerichten auf der Einkaufsliste
- Gericht anlegen, bearbeiten, entfernen. **Ohne mindestens eine Zutat lässt sich nicht speichern.**
- Mehrere Kategorien pro Gericht, Startset (Vegetarisch, Vegan, Fleisch, Fisch, Süßes), eigene Kategorien anlegbar, umbenennen und löschen möglich
- Optionale Zutaten getrennt von Zutaten erfassbar und in der Detailansicht getrennt angezeigt
- **Suchfeld** filtert live über Zutaten, optionale Zutaten und Namen, ignoriert Groß-/Kleinschreibung und Umlaute, findet Teilwörter, mehrere Zutaten mit Komma bedeuten "alle". Der Treffer wird auf der Kachel genannt ("mit Feta", "(optional)" bei optionalen Zutaten).
- Kategoriefilter und Suche lassen sich kombinieren
- "Was koche ich?" zeigt höchstens drei Kacheln und bietet kein erneutes Würfeln an, bis ein Filter geändert wird (Filter: Aufwand, Anlass, Kategorie)
- Einkaufsliste führt Zutaten zusammen, optionale Zutaten stehen in einem eigenen Bereich "Optional"
- Häkchen und Auswahl bleiben nach App-Neustart erhalten, "Leeren" setzt beides zurück
- Liste lässt sich über das iOS-Teilen-Menü teilen
- Keine Kalorien, kein Wochenplaner, keine Bewertungen, keine "zuletzt gekocht"-Anzeige
- Unit-Tests für die Suche (Groß-/Kleinschreibung, Umlaute, Komma-Logik, optionale Zutaten), die Vorschlagsfilter (Maximum drei) und die Zusammenführung der Einkaufsliste

## Etappe 5: Connection

Liste "Meine Menschen", Frage "Wer kommt dir gerade in den Sinn?", Rotation und den Button "WhatsApp öffnen" laut `docs/SPEC.md`, Abschnitt 7.

Akzeptanz:
- Auf dem iPhone prüfen, dass sich WhatsApp über den Link öffnen lässt. Einen "Telefon öffnen"-Button gibt es im Web nicht.
- Personen hinzufügen, bearbeiten, entfernen, ohne Limit und ohne Rangfolge
- "Zeigen" wählt eine Person, alle kommen nacheinander dran, keiner wiederholt sich in einer Runde (Unit-Test)
- Der Button "WhatsApp öffnen" öffnet nur die App, ohne Nummer und ohne Kontaktzugriff
- Nirgends ein Hinweis auf "zuletzt gemeldet" oder Ähnliches
- Die App greift nie auf Kontakte zu und fragt keine Kontakte-Berechtigung an

## Etappe 6: Erinnerungen (Kalenderdatei)

Einstellungen für Zeiten und Kategorien, Textpool, Erzeugung der Kalenderdatei (.ics) für die nächsten 28 Tage, Urlaubsmodus-Ausnahmen, Anleitung zum Import laut `docs/NOTIFICATIONS.md`.

Akzeptanz:
- Alle Regeln aus `docs/NOTIFICATIONS.md` umgesetzt und per Unit-Test abgedeckt (Rotation, Tageslimit 3, Kategorien abschaltbar, Connection wöchentlich und ohne Namen, Urlaubsmodus, gültiges .ics-Format)
- Die erzeugte Datei lässt sich auf dem iPhone in einen neuen Kalender "Frequency Buddy" importieren. Die Erinnerungen erscheinen zur eingestellten Zeit als Benachrichtigung mit dem Text als Titel. Claude Code prüft das auf dem Gerät und berichtet dem Nutzer ehrlich, wie es sich verhält (auch dass ein Tipp den Kalender öffnet).
- Kurze Anleitung in der App (drei Schritte) und ein Satz, wie man den Kalender wieder entfernt
- In den Einstellungen steht ruhig, bis wann die Erinnerungen reichen. Kein Hinweis außerhalb der Einstellungen.
- Texte lassen sich kopieren, für manuelle Erinnerungen in der Erinnerungen-App
- Keine Nachricht über Verpasstes, keine Rückkehr-Nachricht
- Vor einem eventuellen Web-Push (später): auf dem iPhone des Nutzers testen, ob er in Deutschland zuverlässig funktioniert

## Etappe 7: Stille, Klänge und Urlaubsmodus

Stille-Bereich, leise Klänge, Urlaubsmodus laut `docs/SPEC.md`, Abschnitt 9 und Einstellungen.

Akzeptanz:
- Stille erreichbar über die Zeile auf Heute, Fokusbühne, Wellen folgen dem Rhythmus (genau vier: Nur Stille, Huberman, Box, Eigener), Dauer 3, 5 oder 10 Minuten
- Restzeit standardmäßig ausgeblendet, "Zeit zeigen" schaltet um, ohne die Übung neu zu starten
- Bildschirm bleibt während der Übung an (Screen Wake Lock), "Beenden" jederzeit möglich
- Am Ende flache Welle, "Gut." und Rückkehr zu Heute
- Kein Verlauf, keine Minutensumme, keine Zykluszählung, kein Apple-Health-Eintrag
- Huberman: keine Zeitangaben und keine Phasenwörter, meditativer Grundklang (selbst erzeugt, läuft unabhängig von "Leise Klänge", Ton auch bei Stumm-Schalter hörbar, auf dem iPhone prüfen, ein- und ausgeblendet), Welle bewegt sich frei
- Rhythmuslogik per Unit-Test abgesichert (Phasenwechsel, Halten oben und unten, Eigener Rhythmus ohne gültige Phase fällt auf einen Standard zurück)
- Bewegung reduzieren: Welle statisch, nur der Phasentext wechselt
- Leise Klänge (Standard aus) als erzeugte Sinustöne, Web Audio, nach Tippen gestartet, unterbricht keine Musik, darf durch den Stumm-Schalter stumm werden
- Optional Töne beim Phasenwechsel in Stille (Standard aus)
- Urlaubsmodus: Aus, 3 Tage, 1 Woche, 2 Wochen, Ohne Ende. Lässt alle Erinnerungen in der Kalenderdatei aus (per Unit-Test abgedeckt), Hinweiszeile auf Heute, endet automatisch nach Ablauf
- Kein Text über Verpasstes nach dem Urlaub

## Etappe 8: Training

Übungen, individuell konfigurierbare Trainingstage, Training durchführen mit "Letztes Mal" und Vorschlag, Progressionsziel, Load-Kurve pro Übung, Verlauf laut `docs/SPEC.md`, Abschnitt 10.

Akzeptanz:
- Übungen anlegen und entfernen (Name, optionaler Wiederholungsbereich, Gewichtsschritt, Körpergewichtsübung, optionale Notiz)
- Trainingstage (Vorlagen) beliebig anlegen, umbenennen, duplizieren, entfernen und mit eigenen Übungen in eigener Reihenfolge füllen (z. B. "Oberkörper" und "Oberkörper 2"). Beim Start sind deren Übungen standardmäßig dabei. Freies Training möglich.
- Trainingsansicht: pro Übung "Letztes Mal", Vorschlag (abschaltbar, formuliert als "Vorschlag für jeden Satz" mit dem Zusatz "Im Schnitt pro Satz etwa +x % gegenüber letztem Mal"), unter jeder Satzzeile der Wert desselben Satzes vom letzten Mal, vorbefüllte Sätze mit Plus/Minus für Gewicht und Wiederholungen, Haken pro Satz, Satz hinzufügen und entfernen, Übung hinzufügen und entfernen
- **Nur abgehakte Sätze werden gespeichert**, ohne Haken erscheint ein freundlicher Hinweis
- Trainingseinstellungen: Progressionsziel (Aus/An, Zuwachs in Prozent, Zeitraum in Wochen), Vorschläge an/aus, optionales Körpergewicht
- **Load** je Übung und Training = Schnitt aus Gewicht × Wiederholungen über die Arbeitssätze (Sätze mit dem Arbeitsgewicht), Körpergewichtsübungen laut `SPEC.md`. Die Satzzahl verzerrt weder Vorschlag noch Kurve.
- Mit Ziel: Zielwert aus dem letzten Training (auf höchstens einen Zeitraum begrenzt), Umrechnung in die kleinste Kombination aus Gewicht und Wiederholungen. Die Vorschlagszeile zeigt den ungefähren Zuwachs. Kein Hinweis und keine Farbe, wenn das Ziel nicht erreicht wird.
- **Load-Kurve pro Übung** (Übungen → Verlauf und Link auf der Übungskarte), mit gestrichelter Ziellinie bei aktivem Ziel, nur Datum am Anfang und Ende, keine Gitterlinien, mindestens zwei Einträge nötig
- Zielrechnung per Unit-Test abgesichert (Tagebegrenzung, 2 statt 3 Sätze liefert vergleichbare Vorschläge, Aufwärmsätze zählen nicht in die Load, Kandidat nahe am Ziel statt grober Wiederholungssprünge, Wiederholungen zuerst, dann Gewichtsschritt, Körpergewichtsübung mit und ohne Körpergewicht, ohne Verlauf kein Vorschlag)
- Vorschlagslogik ohne Ziel per Unit-Test abgesichert: alle Sätze am oberen Ende des Bereichs ergibt Gewicht plus Schritt und unteres Ende, sonst gleiches Gewicht und schwächster Satz plus eins (höchstens oberes Ende), ohne Verlauf keine Zeile, Körpergewichtsübungen
- Verlauf als Textliste, Löschen und Bearbeiten möglich, gelöschte Übungen erscheinen als "Gelöschte Übung"
- Übungen haben eine optionale **Hauptmuskelgruppe** (Brust, Rücken, Schultern, Bizeps, Trizeps, Beine, Bauch), einstellbar beim Anlegen, im Bearbeiten-Formular und direkt in der Übungsdetailansicht per Chips. Eine Änderung wirkt sofort auf die Wochen-Sätze der aktuellen Woche. Die Gruppe steht als Kleintext in den Auswahllisten.
- Übungen lassen sich vollständig bearbeiten (alle Felder)
- **Wochen-Sätze:** Zahl der Arbeitssätze je Muskelgruppe in der aktuellen Woche (Montag bis Sonntag) **und in der Vorwoche** als Kleintext-Zeile auf der Übungskarte (die aktuelle Woche live inklusive abgehakter Sätze des laufenden Trainings) und als Block "Sätze diese Woche" auf der Trainingsstartseite. Kein weiterer Verlauf, keine Balken, keine Pfeile oder Prozentwerte, keine Farbe, keine Bewertung.
- Optionaler grauer Wochenrichtwert (Standard aus, Standardbereich 10 bis 20, einstellbar), keine Meldung bei Unter- oder Überschreitung
- Unit-Tests für die Wochenzählung: Wochengrenze Montag 00:00, nur Arbeitssätze (Aufwärmsätze zählen nicht), nur abgehakte Sätze, live-Zählung im laufenden Training, keine Doppelzählung nach dem Abschluss, Vorwoche = ganze Woche davor und nie vom laufenden Training beeinflusst, Wochengrenzen auch bei Zeitumstellung
- Training auf der Fokusbühne, Tab-Leiste ausgeblendet, Bildschirm bleibt an (Screen Wake Lock)
- Abschluss ohne Zahlen (Wellenlinie, "Gut.")
- Außer der Load-Kurve pro Übung keine Diagramme, keine Zähler, keine Auszeichnungen, keine Statistik über mehrere Übungen (Ausnahme: die Wochen-Sätze je Muskelgruppe), kein Apple-Health-Eintrag, keine automatische Verbindung zu Vorsätzen (Abgleich mit den harten Regeln in `CLAUDE.md`)

## Etappe 9: Wochenrückblick

Sonntägliches Angebot, Anzeige der eigenen Texte der Woche, offene Frage, Freitext, optionaler früherer Beleg.

Akzeptanz:
- Keine Zahlen, keine Skalen, keine Diagramme
- Angebot ist abschaltbar und nie erzwungen
- Antwort wird gespeichert und im Tagebuch/Rückblick lesbar
- Der "Beleg" ist in den Einstellungen abschaltbar

## Etappe 10: Feinschliff

Onboarding (inklusive Installationshinweis), Animationen, Sicherung (Export als JSON und Markdown, Import aus JSON), Alles-löschen, Info-Seite (Datenschutz-Kurztext, Speicherbedarf der Videos, Versionsnummer), Barrierefreiheit, App-Icon, Kontrast-Check, Performance, Offline-Check.

Akzeptanz:
- Onboarding maximal 4 kurze Schritte, der Installationshinweis erscheint nur, wenn die App im Browser und nicht installiert geöffnet ist
- **Export und Import laufen verlustfrei im Kreis** (per Test: exportieren, alles löschen, importieren, Daten identisch). Export enthält Aufgaben, Küche, Connection, Training und alle Einträge, aber keine Videos.
- Import fragt vor dem Überschreiben nach ("Ersetzen" oder "Zusammenführen")
- In den Einstellungen unter Sicherung steht das Datum der letzten Sicherung, bei über 30 Tagen ein ruhiger Hinweis (nur dort)
- Speicher-Persistenz wird nach dem ersten Eintrag einmal angefragt und ruhig angezeigt, ohne zu drängeln
- "Alle Daten löschen" funktioniert vollständig und mit klarer Bestätigung
- VoiceOver-Durchlauf aller Flows ohne Sackgassen
- Kontrast AA in Hell, Dunkel und auf der Fokusbühne
- Abschlussprüfung gegen die harten Regeln in `CLAUDE.md` und die Checkliste in `docs/WEBAPP.md`

## Danach (nicht Teil der Etappen)

Nutzung über 1 bis 2 Wochen, dann gemeinsam entscheiden: Was wird wirklich genutzt? Erst dann Kandidaten aus `docs/SPAETER.md` erwägen.
