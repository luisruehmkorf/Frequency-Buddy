# Produkt-Spezifikation

## Navigation

Tab-Leiste (eigene SVG-Symbole) mit **fünf Tabs von Anfang an**. Mehr als fünf nie.

1. **Heute:** Startseite mit heller Begrüßungskarte (Datum, Begrüßung, weiche Wellen), Morgen-Ritual, Abend-Ritual (je nach Tageszeit hervorgehoben, Wechsel ab 16 Uhr, einstellbar), einer Zeile **Training** (siehe Abschnitt 10), einer Zeile **Stille** (siehe Abschnitt 9) und einer Zeile **Rückblick**, die Tagebuch und Wochenrückblick öffnet. Zahnrad oben rechts für die Einstellungen.
2. **Vorsätze** mit Segmentschalter "Vorsätze | Aufgaben" (siehe Abschnitt 3)
3. **Küche**
4. **Connection**
5. **Inspiration** (dunkle Fokusbühne)

Der Rückblick ist kein eigener Tab, sondern über Heute erreichbar. Kein Badge auf dem App-Icon.

## Leere Zustände, keine Beispieldaten

Die echte App liefert keine Beispieldaten. Leere Bereiche laden ruhig zum ersten Eintrag ein:
- Vorsätze: "Noch nichts hier. Ein Vorsatz beginnt mit einem Satz."
- Küche: "Noch kein Gericht. Was kochst du gern?"
- Connection: "Noch niemand hier. Wer fällt dir als Erstes ein?"
- Inspiration: bleibt zu Beginn leer und wird vom Nutzer in einem ruhigen Moment befüllt

## 1. Morgen-Ritual (unter einer Minute)

Ablauf, jeder Schritt überspringbar:

1. **Atemzug**: Atemlinie (Wellen), 4 Sekunden
2. **Impuls des Tages** (Wechsel, siehe unten). Freitext, ein Satz genügt, optional.
3. **Vorsatz des Tages**: Auswahl aus aktiven Vorsätzen oder "keinen". Zeigt Was und Warum.
4. **Abschluss**: ruhige Animation, Text "Guten Tag." (oder ähnlich aus Pool), dann zurück zu "Heute". Kein Weiterführen.

**Impuls-Wechsel**: Einstellung mit drei Optionen: Wechsel (Standard), immer Identität, immer Dankbarkeit.
- Identität: "Wer willst du heute sein?"
- Dankbarkeit: "Wofür bist du gerade dankbar?"
- Wechsel deterministisch nach Tag des Jahres (gerade/ungerade), damit testbar

## 2. Abend-Ritual (unter zwei Minuten)

1. Atemzug
2. "Was war gut heute?" (optional, Freitext). Dies ist der Beleg-Baustein und die Dankbarkeit am Abend.
3. "Was darf gehen?" (optional, Freitext)
4. Sanfte Extra-Option, eingeklappt: "Stress oder Angst?" Nur wenn der Nutzer sie öffnet. Kurze Freitextzeile, kein Pflichtfeld. Ausdrücklich als Frage, nicht als Diagnose.
5. Abschluss: ruhiger Satz ("Gute Nacht." o. ä.), Ende, keine Weiterleitung

Kein Abschlussscreen mit Statistik. Kein "Gut gemacht".

## 3. Vorsätze (Was, nicht wie oft)

Ein Vorsatz besteht aus:
- **Was** (Pflicht): z. B. "Mindestens dreimal pro Woche ins Gym"
- **Warum** (optional): eigener Satz
- **Wann/Wo** (optional): z. B. "Mo, Mi, Fr nach der Arbeit"
- Status: aktiv oder pausiert (kein "erledigt", kein "gescheitert")

Regeln:
- Es gibt kein Abhaken, kein Zählen und keine Auswertung.
- Empfohlene Obergrenze: 5 aktive Vorsätze. Bei Überschreitung ein freundlicher Hinweis ("Weniger trägt weiter."), aber keine harte Sperre.
- Pausieren und Löschen sind jederzeit ohne Rückfrage-Drama möglich.
- Optional: Wochentage und Uhrzeit für eine Erinnerung (siehe NOTIFICATIONS.md)

### Aufgaben (einfache To-do-Liste)

Im Tab Vorsätze gibt es oben einen Segmentschalter **Vorsätze | Aufgaben**. Aufgaben sind das Kleine, Konkrete ("Paket abholen"), Vorsätze das Grundsätzliche. Beides bleibt bewusst getrennt.

- **Eine einzige Liste**, keine Ordner, keine Projekte
- Oben ein Eingabefeld "Neue Aufgabe" mit Button "Hinzufügen" (Return fügt ebenfalls hinzu). Neue Aufgaben erscheinen **oben**.
- Jede Zeile: runder Haken, Text, dezentes Entfernen-Symbol. Tippen auf den Text bearbeitet ihn, Ziehen ändert die Reihenfolge, Wischen entfernt (iOS-Standard).
- Abhaken streicht die Zeile durch und verschiebt sie in den Bereich **Erledigt**. Der ist zunächst eingeklappt: Text-Links "Erledigte anzeigen" / "Erledigte ausblenden" und "Erledigte entfernen". Die Links nennen **keine Anzahl**.
- Ab mehr als 12 offenen Aufgaben ein leiser Hinweis: "Eine kurze Liste ist leichter zu tragen." Keine Sperre.
- Leerer Zustand: "Nichts offen. Das darf auch mal so sein."
- Kein Konfetti, keine Haptik (im Web nicht verfügbar), nur ein ruhiger Übergang des Hakens

**Ausdrücklich nicht:** keine Fälligkeitsdaten mit "überfällig"-Anzeige, keine rote Farbe, keine Zähler oder Fortschritt ("3 von 7", Prozent, Balken), keine Streaks, keine Prioritäten mit Punktesystem, keine Erinnerungen pro Aufgabe in Version 1.

## 4. Inspiration

Zweck: Dinge, die der Nutzer in einem neutralen Moment als hilfreich und motivierend gewählt hat, zum Verinnerlichen und Rebalancen. Kein Nachschub.

### Zugang (bewusste Reibung)
1. Frage: **"Was brauchst du gerade?"** Antworten: Ruhe, Mut, Klarheit, Mein Warum
2. Bewusster Atemzug (Atemlinie 5 Sekunden, Weiter-Button erst danach aktiv)
3. Anzeige der passenden Einträge

Wichtig: Die Frage fragt nach dem Bedarf, NICHT nach der Stimmung. Sie ist für alle Zustände dieselbe. Keine Bewertung der Antwort.

### Anzeige
- Höchstens 5 Einträge gleichzeitig, kein Nachladen, kein Scrollen ins Unendliche
- Jeder Eintrag zeigt zuerst das **Warum** (eigener Text des Nutzers), Titel und ggf. Zitat
- Darunter sekundär, je nachdem was der Eintrag hat: das **eigene Video** (Vorschaubild mit Abspielen-Symbol), der Button "Video öffnen" (öffnet den Link extern), die Sprachnotiz
- Das eigene Video spielt **nur nach Tippen**, nie automatisch, ohne Schleife, ohne Vorschlag eines nächsten Videos. Nach dem Ende bleibt es stehen. Wiedergabe mit Ton, auch bei aktivem Stumm-Schalter.
- Kein Autoplay, keine Einbettung von Playern externer Dienste (nur Videos, die der Nutzer selbst in die App geladen hat)
- Kein Zufalls-/Aktualisieren-Button

### Kuratieren (separater Modus "Sammlung pflegen")
- Hinzufügen, Bearbeiten, Löschen nur hier
- Felder: Titel (optional), Zitat oder Warum-Text (Pflicht), Link (optional, Zeitstempel kann Teil der URL sein), **Video (optional)**, Sprachnotiz (optional), Kategorie (Ruhe, Mut, Klarheit, Mein Warum)
- Link, Video und Sprachnotiz sind unabhängig voneinander optional. Ein Eintrag kann mehrere haben oder nur den Text.

### Eigenes Video (optional pro Eintrag)
- Der Nutzer wählt ein Video aus der Fotos-Mediathek (z. B. eine Bildschirmaufnahme). Die Auswahl erfolgt über das Dateifeld des Browsers (`accept="video/*"`), das die Fotos-Mediathek öffnet. Die App bekommt nur die gewählte Datei. **Auf dem iPhone prüfen.**
- Die App **kopiert** das Video in den lokalen Speicher der Web-App (IndexedDB). So bleibt der Eintrag intakt, auch wenn das Original in Fotos gelöscht wird.
- **Längenbegrenzung 90 Sekunden.** Ist das Video länger: "Dieses Video ist länger als 90 Sekunden. Kürze es in Fotos und versuche es erneut."
- Die App erzeugt ein Vorschaubild. Beim Entfernen des Eintrags oder des Videos wird die Datei gelöscht.
- In den Einstellungen unter Info steht, wie viel Speicher die Videos belegen (nur diese eine Angabe, ohne Auswertung).
- Videos bleiben ausschließlich auf dem Gerät und sind nicht Teil des Exports (der Export nennt nur den Dateinamen). Der Browser kann Videos bei Speichermangel entfernen; der Eintrag mit dem Warum-Text bleibt dann erhalten, das Video fehlt mit einem ruhigen Hinweis.
- Ton: Bildschirmaufnahmen enthalten in der Regel den Ton der App. Der Nutzer testet das vorab mit einer kurzen Aufnahme.
- **Harte Obergrenze 33 Einträge.** Beim Erreichen muss zuerst einer entfernt werden. Das ist Absicht.
- Beim Öffnen des Kuratier-Modus eine sanfte Erinnerung: "Neues gehört hierher, nicht auf die Suche." (Text als Vorschlag)

## 5. Rückblick

Erreichbar über die Zeile "Rückblick" auf Heute (kein eigener Tab).

### Tagebuch
- Chronologische Leseliste der Einträge (Morgen und Abend), neueste zuerst
- Kein Zählen, keine Kalender-Heatmap, keine Markierung von Lücken
- Einträge lesbar und editierbar

### Wochenrückblick
- Wird sonntagabends angeboten (Zeit einstellbar, abschaltbar), aber nie erzwungen
- Zeigt: die eigenen "Was war gut"-Einträge dieser Woche als Text, die aktiven Vorsätze als Kontext
- Eine offene Frage: **"Wie war die Woche im Verhältnis zu deinen Vorsätzen?"** Antwort in eigenen Worten (Freitext), keine Skala
- Optional ein älterer "Beleg" (zufällig gewählter früherer "Was war gut"-Eintrag), in den Einstellungen abschaltbar

## 6. Küche

Ein persönliches Verzeichnis der Gerichte, die der Nutzer gern isst und selbst kochen kann. Ziel: leichter entscheiden, nicht ideenlos beim Einkaufen sein. Gleiche Logik wie die Inspirationssammlung: eine Sammlung, kein Feed.

Oben ein Segmentschalter mit drei Ansichten: **Gerichte**, **Was koche ich?**, **Einkauf**.

### Gerichte (Kacheln)
- **Kachelraster** mit zwei Spalten. Jede Kachel zeigt: bis zu zwei Kategorien als kleine Chips (bei mehr ein "+n"), den Namen, darunter Aufwand und Anlass, unten eine dezente Wellenkante (Farbe wie die Startseiten-Wellen). Ein kleines Häkchen oben rechts, wenn das Gericht auf der Einkaufsliste steht. Tippen öffnet das Gericht.
- **Suchfeld** ganz oben: "Zutat oder Gericht suchen". Es filtert live beim Tippen und durchsucht Zutaten, optionale Zutaten und Gerichtsnamen. Groß-/Kleinschreibung, Umlaute und Akzente werden ignoriert. Ein Teilwort genügt ("zucc" findet Zucchini).
- **Mehrere Zutaten** mit Komma getrennt: Es erscheinen nur Gerichte, die **alle** genannten Zutaten enthalten (normale oder optionale).
- Bei einem Treffer über eine Zutat steht auf der Kachel z. B. "mit Feta", bei einer optionalen Zutat "mit Feta (optional)".
- **Kategoriefilter:** Chips unter dem Suchfeld. Antippen filtert, erneutes Antippen hebt den Filter auf. Suche und Kategoriefilter lassen sich kombinieren.
- Button "Neues Gericht". Keine Obergrenze.

### Gericht (Detailansicht)
Name, Kategorien, Aufwand und Anlass als Chips, dann **Zutaten** und (falls vorhanden) **Optional** als getrennte gruppierte Listen, Notiz, Link. Aktionen: "Auf die Einkaufsliste" (schaltbar), "Bearbeiten", "Entfernen" (mit Bestätigung).

### Neues Gericht / Bearbeiten
- **Pflicht:** Name und **mindestens eine Zutat**. Ohne Zutat lässt sich nicht speichern ("Ein Gericht braucht mindestens eine Zutat.").
- Kategorien: Mehrfachauswahl per Chips. Startset: **Vegetarisch, Vegan, Fleisch, Fisch, Süßes**. Eigene Kategorien lassen sich direkt im Formular anlegen und stehen danach überall zur Verfügung.
- Anlass: Unter der Woche, Wochenende, Mit Gästen (eine Auswahl)
- Aufwand: Schnell (bis etwa 20 Minuten), Mittel, Aufwendig (eine Auswahl)
- **Zutaten:** Freitext, eine pro Zeile, Mengen dürfen dabei stehen
- **Optionale Zutaten:** Freitext, eine pro Zeile, zusätzlich und nicht Pflicht
- Notiz und Link optional

### Kategorien verwalten
Am Ende der Gerichte-Ansicht ein Link "Kategorien verwalten": umbenennen und löschen. Beim Löschen einer Kategorie wird sie bei allen Gerichten entfernt, die Gerichte bleiben erhalten.

### Was koche ich?
- Drei Filter: **Aufwand**, **Anlass**, **Kategorie** (jeweils antippen zum Wählen, erneut antippen zum Abwählen)
- Button "Vorschläge zeigen" zeigt **höchstens drei** passende Gerichte als Kacheln, zufällig gewählt
- Solange Ergebnisse sichtbar sind, gibt es **keinen** Button zum erneuten Würfeln. Erst eine Filteränderung setzt zurück.
- Passt nichts: "Dazu passt gerade nichts in deiner Sammlung. Ändere einen Filter."

### Einkauf
- Zeigt die **Zutaten** aller Gerichte auf der Einkaufsliste, zusammengeführt (gleiche Schreibweise ohne Beachtung von Groß-/Kleinschreibung und Leerzeichen erscheint einmal; Mengen bleiben, wie eingetragen)
- Darunter ein eigener Bereich **Optional** mit den optionalen Zutaten (nur solche, die nicht schon bei den Zutaten stehen)
- Abhaken im Supermarkt (runde Häkchen), Durchstreichen der erledigten Zeilen
- **Liste teilen** über das iOS-Teilen-Menü (Text mit den Zutaten, darunter "Optional"), **Leeren** setzt Auswahl und Häkchen zurück
- Auswahl und Häkchen bleiben erhalten, bis der Nutzer die Liste leert

### Ausdrücklich nicht
- Keine Kalorien, keine Nährwerte, keine Ziele, keine Diät-Auswertung
- Kein Wochenplaner, der Mahlzeiten vorplant
- Keine Rezeptsuche im Netz, kein Feed mit neuen Rezepten
- Keine Sterne, Bewertungen, keine Anzeige "zuletzt gekocht", keine Zähler
- Kein Eintrag ohne Zutatenliste

## 7. Connection

Eine schlichte Liste aller wichtigen Menschen im Leben des Nutzers und eine sanfte Erinnerung, sich mal wieder zu melden: schreiben, wie es geht, oder anrufen. Mehr nicht.

### Bildschirm
- Oben eine Karte mit der Frage **"Wer kommt dir gerade in den Sinn?"** und dem Button "Zeigen" (deaktiviert, solange die Liste leer ist)
- "Zeigen" wählt eine Person aus der Liste und zeigt: "Vielleicht magst du dich melden bei", Name groß, Notiz, darunter der Button "WhatsApp öffnen" sowie "Fertig"
- **Rotation:** Alle Personen kommen nacheinander dran, keine wiederholt sich, bis alle einmal gezeigt wurden. Danach beginnt die Runde neu. Intern wird nur gespeichert, wer in der aktuellen Runde schon gezeigt wurde. Das wird dem Nutzer nirgends angezeigt.
- Darunter die Liste **"Meine Menschen"**: Name, Notiz, Entfernen. Kein Limit, keine Reihenfolge nach Nähe, keine Gruppen.
- **Hinzufügen:** Name (Pflicht), Notiz optional (z. B. "mal wieder anrufen")

### Button "WhatsApp öffnen"
- Der Button öffnet nur die App WhatsApp. Der Nutzer sucht dort selbst die Person. Es gibt keine Verknüpfung mit Kontakten und keine gespeicherten Telefonnummern.
- Umsetzung als Link `whatsapp://`. Ist WhatsApp nicht installiert oder öffnet sich die App nicht, erscheint ein ruhiger Hinweis. Auf dem iPhone prüfen.
- **Kein "Telefon öffnen"-Button:** Ohne Nummer ist das im Web nicht sicher möglich. Der Nutzer öffnet die Telefon-App wie gewohnt selbst.
- Die App greift nie auf Kontakte oder das Adressbuch zu.

### Erinnerung
Höchstens einmal pro Woche, Wochentag und Zeit einstellbar, Standard aus. Text ohne Namen als Standard, damit der Sperrbildschirm privat bleibt (Pool in `NOTIFICATIONS.md`). Optional in den Einstellungen mit Namen.

### Ausdrücklich nicht
- Kein Speichern oder Anzeigen, wann zuletzt Kontakt war. Keine Meldung wie "zu lange nicht gemeldet".
- Keine Zähler, keine Ziele wie "zweimal im Monat", keine Rangfolge oder Nähe-Stufen
- Kein Feed, kein Teilen, kein Vergleich

## 8. Einstellungen

- **Erinnerungen** (Kalenderdatei, siehe `NOTIFICATIONS.md`): Zeiten für Morgen-, Abend-, Bewegungs-Erinnerung und Wochenrückblick (jeweils abschaltbar), Button "Kalenderdatei erzeugen", kurze Anleitung, Angabe bis wann die Erinnerungen reichen, Texte kopierbar
- Maximal drei Erinnerungen pro Tag (harte Grenze)
- Impuls-Modus (Wechsel, Identität, Dankbarkeit)
- Darstellung (Automatisch, Hell, Dunkel)
- Licht der Wellenlinie im Dunkelmodus (Tageszeit, Morgen, Abend)
- Erinnerung "Connection": Wochentag und Zeit, Standard aus; Namen im Text optional (Standard aus)
- **Leise Klänge:** Aus (Standard) oder An (siehe Abschnitt 9)
- **Töne bei Phasenwechsel in Stille:** Aus (Standard) oder An
- Trainingseinstellungen (Progressionsziel, Vorschläge, Körpergewicht) liegen im Training unter "Einstellungen" (siehe Abschnitt 10)
- **Urlaubsmodus:** Aus, 3 Tage, 1 Woche, 2 Wochen oder Ohne Ende. Solange er aktiv ist, enthält die Kalenderdatei **keine** Erinnerungen für diesen Zeitraum (auch nicht Connection und Wochenrückblick). Auf Heute steht dezent eine Zeile "Urlaubsmodus bis ...". Nach Ablauf läuft alles wieder wie eingestellt. Keine Meldung über Verpasstes.
- Tageswechsel Morgen/Abend (Uhrzeit)
- **Sicherung:** Daten exportieren (JSON und Markdown), Daten importieren (JSON, Ersetzen oder Zusammenführen), Datum der letzten Sicherung (nur dort ein ruhiger Hinweis, wenn sie über 30 Tage her ist), alle Daten löschen. Warum: Der Browser kann Web-App-Daten unter Umständen löschen.
- Info (Datenschutz-Kurztext)

## 9. Stille (Mut zur Langeweile)

Ein ruhiger Ort für reines Atmen und Da-Sein, angelehnt an einfache Atem-Apps wie iBreathe (fertige Rhythmen, eigene Rhythmen, keine Überfrachtung), aber ohne Auswertung. Erreichbar über die Zeile **Stille** auf Heute. Fokusbühne (dunkel), Wellenmotiv.

### Einrichten
- **Rhythmus** (eine Auswahl, genau diese vier, keine weiteren):
  - **Nur Stille:** kein Rhythmus, eine sehr ruhige, fast flache Welle, kein Grundklang
  - **Huberman:** kein Atemrhythmus und **keine Zeitangaben**. Ein meditativer **Grundklang** trägt die Sitzung, die Welle bewegt sich langsam und frei, das Atmen bleibt ganz beim Nutzer ("Du atmest in deinem eigenen Tempo."). Auf dem Bildschirm steht nur in den ersten Sekunden dezent "In deinem Tempo", danach kein Text.
  - **Box:** 4 ein, 4 halten, 4 aus, 4 halten
  - **Eigener:** Einatmen, Halten, Ausatmen, Halten jeweils 0 bis 12 Sekunden per Plus/Minus, Voreinstellung 4 ein, 6 aus
- **Dauer:** 3, 5 oder 10 Minuten
- Button "Beginnen". Die zuletzt gewählte Kombination bleibt als Voreinstellung erhalten, sonst wird nichts gespeichert.

### Ablauf
- Vollbild, Tab-Leiste ausgeblendet. Die drei Wellenlinien folgen dem Atemrhythmus: Einatmen hebt die Welle, Halten hält die Höhe, Ausatmen senkt sie, das zweite Halten liegt flach. Darüber steht die Phase ("Einatmen", "Halten", "Ausatmen").
- **Restzeit ist standardmäßig ausgeblendet** (kein Countdown). Unten ein Textlink "Zeit zeigen" / "Zeit ausblenden" und "Beenden".
- Bildschirm bleibt während der Übung an (Screen Wake Lock, in Home-Bildschirm-Web-Apps meines Wissens seit Safari 18.4; auf dem iPhone prüfen)
- Am Ende: Welle liegt flach, "Gut.", leiser Klang (wenn Klänge an sind), nach kurzer Pause zurück zu Heute
- **Bewegung reduzieren:** Welle statisch, nur der Phasentext wechselt

### Ausdrücklich nicht
- Kein Verlauf, keine Minutensumme, keine Serien, keine Statistik
- **Kein Eintrag in Apple Health** (Achtsamkeitsminuten wären Tracking)
- Keine Zählung von Zyklen (weder verbleibend noch absolviert)

### Grundklang (nur im Rhythmus Huberman)
- Selbst erzeugter, sehr ruhiger Klangteppich: tiefer Grundton (etwa 110 Hz) mit Quinte und Oktave, sehr langsame Lautstärkewellen (Perioden von etwa 10 bis 20 Sekunden), 5 Sekunden Einblenden, 4 Sekunden Ausblenden
- Läuft **unabhängig** von der Einstellung "Leise Klänge", weil der Nutzer ihn mit dem Start der Sitzung bewusst wählt
- Der Grundklang soll auch bei aktivem Stumm-Schalter hörbar sein (wie bei Meditations-Apps). Im Web ist das Verhalten des Browsers maßgeblich; Claude Code testet es auf dem iPhone und wählt die Variante, bei der der Ton hörbar bleibt. Gelingt das nicht, sagt er es dem Nutzer.
- Keine Fremddateien. In App-Texten keine Aussagen über heilende Wirkungen bestimmter Frequenzen.

### Leise Klänge
- Einstellung "Leise Klänge", Standard **aus**. Wenn an: ein sehr leiser, weicher Ton am Ende jedes Atemmoments in den Ritualen und in der Inspiration und am Ende der Stille. Optional ("Töne bei Phasenwechsel") ein noch leiserer, tieferer Ton beim Wechsel zu Einatmen und Ausatmen in der Stille.
- Klänge werden **in der App erzeugt** (weiche Sinustöne mit langsamem Ein- und Ausblenden, etwa 1,5 bis 2,5 Sekunden), keine Fremddateien, keine Lizenzfragen
- Die kurzen Klänge dürfen durch den Stumm-Schalter stumm werden. Sie starten nur nach Tippen des Nutzers, laufende Musik anderer Apps soll nicht unterbrochen werden, soweit der Browser das erlaubt.

## 10. Training (progressive Überlastung)

Ein einfaches Trainingsprotokoll mit **einem** Zweck: Beim nächsten Training sehen, was beim letzten Mal war, damit sich leichter ein kleines Stück mehr schaffen lässt (progressive Überlastung). Die Zahlen sind der **Arbeitsspeicher fürs Gym**, keine Anzeigetafel. Erreichbar über die Zeile **Training** auf Heute.

### Startseite des Trainings
- Liste der **Trainingstage** (Vorlagen wie "Push", "Pull", "Beine"), jeweils mit den enthaltenen Übungen. Tippen startet das Training.
- Eintrag **Freies Training**: leer starten, Übungen unterwegs hinzufügen
- Vier ruhige Textlinks: **Verlauf**, **Übungen**, **Trainingstage**, **Einstellungen**
- Hinweis unten: "Kein Zählen der Trainingstage, keine Wochenstatistik."

### Training durchführen
- Oben Name des Trainingstags und Datum. Für jede Übung eine Karte:
  - Name der Übung
  - **"Letztes Mal:"** die Sätze des letzten Trainings mit dieser Übung, z. B. "60 kg × 10, 10, 9"
  - **"Vorschlag für jeden Satz:"** eine leise Zeile für heute, z. B. "60 kg × 10. Im Schnitt pro Satz sind das etwa +3,4 % gegenüber letztem Mal." Der Prozentwert bedeutet: Wenn **alle** Arbeitssätze dem Vorschlag entsprechen, liegt die Load im Schnitt pro Satz um diesen Wert über der vom letzten Mal. Er gilt nicht für einen einzelnen Satz. Siehe unten (abschaltbar).
  - Sätze als Zeilen: Satznummer, Gewicht mit Minus und Plus (Schritt = Gewichtsschritt der Übung), Wiederholungen mit Minus und Plus, runder Haken "Satz geschafft". **Unter jeder Satzzeile** steht in grauem Kleintext der Wert desselben Satzes vom letzten Mal, z. B. "Letztes Mal: 60 kg × 10". Für Sätze über die Zahl des letzten Trainings hinaus steht "Zusätzlicher Satz". Die Vorbefüllung der Zeile ist der Vorschlag.
  - Die Sätze sind **vorbefüllt** (mit dem Vorschlag, oder mit den Werten vom letzten Mal, wenn Vorschläge aus sind), in der Zahl der Arbeitssätze vom letzten Mal. So genügt oft ein Tippen auf den Haken.
  - Links: "Satz hinzufügen", "Letzten Satz entfernen", "Verlauf" (öffnet die Load-Kurve der Übung und kehrt zum laufenden Training zurück), "Übung entfernen"
- Button "Übung hinzufügen", Button "Training beenden"
- **Gespeichert werden nur abgehakte Sätze.** Ist nichts abgehakt: "Hake mindestens einen Satz ab, dann wird das Training gespeichert."
- Abbrechen mit Rückfrage, ob das Training verworfen werden soll
- Am Ende der ruhige Abschluss (Wellenlinie, "Gut."), **keine Zusammenfassung mit Zahlen**
- Fokusbühne (dunkel) während des Trainings, Tab-Leiste ausgeblendet, Bildschirm bleibt an

### Vorschlag für heute
Der Vorschlag ist eine Anregung, keine Vorgabe. Es gibt zwei Arten, je nach Einstellung:

**Ohne Progressionsziel (einfache Doppelprogression):**
- Hat die Übung einen Wiederholungsbereich (z. B. 8 bis 12) und waren beim letzten Mal **alle Arbeitssätze am oberen Ende**, lautet der Vorschlag: **Gewicht plus Gewichtsschritt, Wiederholungen am unteren Ende des Bereichs**
- Sonst: **gleiches (Arbeits-)Gewicht, Wiederholungen des schwächsten Arbeitssatzes plus eins** (höchstens das obere Ende des Bereichs)
- Ohne Bereich: nur die zweite Regel
- Ohne Verlauf: keine Vorschlagszeile, stattdessen "Noch keine Werte. Dein erster Eintrag ist dein Startpunkt."
- Einstellung "Vorschläge im Training": Aus blendet die Zeile aus und befüllt mit den Werten vom letzten Mal

**Mit Progressionsziel:** siehe nächster Abschnitt.

### Sätze pro Woche und Muskelgruppe
Die Load misst die Qualität pro Satz, die Wochen-Sätze die Menge. Beides sind getrennte Größen. Für Muskelwachstum gilt die Zahl der harten Sätze pro Muskelgruppe und Woche als besonders wichtig, deshalb zeigt die App sie an. Es ist die **einzige** Summe über mehrere Übungen.

- **Was gezählt wird:** die abgehakten **Arbeitssätze** (Sätze mit dem Arbeitsgewicht der Übung im jeweiligen Training) aller Übungen einer Muskelgruppe. Aufwärmsätze zählen nicht.
- **Zeitraum:** die aktuelle Woche (Montag 00:00 bis Sonntag) und **zusätzlich die Vorwoche** (die ganze Woche davor) als Vergleich. Die Vorwoche ist nötig, weil die laufende Woche mitten in der Woche zwangsläufig noch niedrig ist. Weiter zurück gibt es keinen Verlauf. Die Vorwoche zählt nie das laufende Training mit.
- **Auf der Übungskarte im Training:** eine Kleintext-Zeile, z. B. "Brust diese Woche: 9 Sätze, letzte Woche: 12". Sie zählt die abgehakten Sätze des laufenden Trainings **live** mit.
- **Auf der Trainingsstartseite:** ein Block **"Sätze diese Woche"** als einfache Liste: Muskelgruppe links, rechts die Zahl der aktuellen Woche und in grau daneben "Vorwoche 12", nur für Muskelgruppen, denen mindestens eine Übung zugeordnet ist. Darunter der Hinweis "Aktuelle Woche ab Montag, daneben die Vorwoche. Kein weiterer Verlauf, kein Ziel, keine Bewertung." (bei aktivem Wochenrichtwert zusätzlich "Richtwert 10 bis 20 Sätze pro Muskelgruppe und Woche.")
- **Optionaler Wochenrichtwert** (Trainingseinstellungen, Standard aus): wenn an, erscheint als **grauer Hinweis** "Richtwert 10 bis 20" (auf der Übungskarte in Klammern, auf der Startseite als Zeile unter dem Block), Von und Bis einstellbar (Standard 10 bis 20). Die Zahl ändert weder Farbe noch Aussehen, es gibt keine Meldung darüber oder darunter. Der Bereich ist eine häufig genannte Faustregel und individuell verschieden.
- Kein Balken, keine Farbe, **keine Pfeile oder Prozentwerte** zwischen den Wochen, kein Vergleich mit anderen, kein automatisches Hinzufügen von Sätzen. Die beiden Zahlen stehen nebeneinander, mehr nicht. Die Satzzahl im einzelnen Training bleibt unbewertet.

### Annahme zur Anstrengung
Der Nutzer trainiert konsequent nah am Muskelversagen (0 bis 2 Wiederholungen in Reserve). Deshalb ist die Load (Gewicht × Wiederholungen) ein guter Maßstab für den Fortschritt, und es gibt in Version 1 **kein Anstrengungsfeld** (RIR/RPE) und **keine 1RM-Schätzung**. Beides bleibt Kandidat in `SPAETER.md`.

### Progressionsziel (Trainingseinstellungen)
Trainingseinstellungen erreicht man im Training über den Link **Einstellungen**. Dort:
- **Progressionsziel:** Aus (Standard) oder An
- Wenn An: **Zuwachs der Load** (0,5 bis 15 Prozent, Schritte von 0,5) und **Zeitraum** (1 bis 8 Wochen). Beispiel: 5 Prozent alle 2 Wochen.
- **Vorschläge im Training:** An (Standard) oder Aus
- **Wochenrichtwert je Muskelgruppe:** Aus (Standard) oder An, mit Von und Bis (Standard 10 bis 20 Sätze)
- **Körpergewicht** in kg (optional, bleibt auf dem Gerät), nur für die Load-Berechnung bei Körpergewichtsübungen

**Arbeitsgewicht** einer Übung in einem Training = das am häufigsten benutzte Gewicht unter den abgehakten Sätzen (bei Gleichstand das höhere). **Arbeitssätze** = die Sätze mit dem Arbeitsgewicht. Leichtere Aufwärm- oder Einstiegssätze zählen dadurch nicht in die Load.

**Load** einer Übung in einem Training = **Schnitt über die Arbeitssätze** von **Gewicht × Wiederholungen**. Der Schnitt pro Satz (statt der Summe) macht ein Training mit 2 Sätzen direkt vergleichbar mit einem mit 3 Sätzen. Bei Körpergewichtsübungen zählt (Körpergewicht + Zusatzgewicht) × Wiederholungen. Ist kein Körpergewicht eingetragen, ist die Load der Schnitt der Wiederholungen.

**Zielwert für heute** je Übung: Load beim letzten Training × (1 + Zuwachs) hoch (Tage seit dem letzten Training geteilt durch den Zeitraum in Tagen). Die Tage werden auf höchstens einen Zeitraum begrenzt, damit nach einer Pause kein übergroßer Sprung verlangt wird. Beispiel: 5 Prozent alle 14 Tage, letztes Training vor 7 Tagen ergibt etwa plus 2,5 Prozent.

**Umrechnung in Gewicht und Wiederholungen (pro Arbeitssatz):** Ausgehend vom Arbeitsgewicht des letzten Trainings werden Kandidaten geprüft, zuerst mit gleichem Gewicht, dann mit ein bis vier Gewichtsschritten mehr. Für jedes Gewicht gilt die kleinste Wiederholungszahl, die den Zielwert erreicht (höchstens das obere Ende des Wiederholungsbereichs, ohne Bereich bis 30; mindestens das untere Ende). Gewählt wird der **erste Kandidat, der nicht zu weit über dem Ziel liegt** (Zuwachs höchstens doppelt so hoch wie der Zielzuwachs, mindestens aber 6 Prozent). Gibt es keinen, gewinnt der Kandidat mit dem kleinsten Zuwachs. So werden grobe Sprünge vermieden (z. B. 60 kg × 11 = plus 10 Prozent, wenn 62,5 kg × 10 = plus 4 Prozent das Ziel besser trifft). Ohne Verlauf gibt es keinen Vorschlag.

### Sätze, Satzzahl und Aufwärmen
- Die **Satzzahl ist frei.** Ob 2 oder 3 Sätze: Vorschläge und Kurve sind davon unabhängig, weil die Load ein Schnitt ist.
- Die Übungskarte wird mit der Zahl der **Arbeitssätze vom letzten Mal** vorbefüllt. Sätze lassen sich jederzeit hinzufügen oder entfernen. Gespeichert wird nur, was abgehakt ist.
- **Aufwärmsätze** einfach nicht abhaken (oder als leichteren Satz abhaken, der wegen des Arbeitsgewichts nicht zählt).
- Die App wertet die Satzzahl nicht: keine Meldung, wenn weniger Sätze gemacht wurden. Die Wochen-Sätze pro Muskelgruppe (siehe oben) sind reine Information.

Der Vorschlag zeigt zusätzlich den ungefähren Zuwachs gegenüber dem letzten Training. Bleibt ein Training mal darunter, passiert **nichts**: keine Meldung, keine Farbe, keine Anzeige "Ziel verfehlt". Das Ziel ist ein Rahmen, kein Prüfstein.

### Load-Kurve pro Übung
- Erreichbar über **Übungen → Verlauf** (pro Übung) und über den Link **Verlauf** auf der Übungskarte im Training
- Ein Liniendiagramm der **Load pro Training** dieser Übung: schmale Linie, kleine Punkte, nur Datum links (erstes Training) und rechts (letztes Training), die Load-Werte am ersten und letzten Punkt, keine Gitterlinien
- Ist das Progressionsziel an, zeigt eine **gestrichelte graue Linie** den Zielverlauf, ausgehend vom ersten Eintrag (gleiches Wachstum wie das Ziel). Keine Bewertung, keine Farbe, kein Text wie "hinter dem Ziel".
- Darunter ein Satz zur Erklärung ("Load = Gewicht × Wiederholungen, im Schnitt pro Arbeitssatz") und die letzten Trainings als Textliste
- Mindestens zwei Einträge nötig, sonst der Hinweis "Ab dem zweiten Training entsteht hier deine Kurve."
- **Nur pro Übung.** Es gibt keine Kurve über mehrere Übungen oder ein ganzes Training, keine Wochen- oder Monatssumme (außer der Zahl der Wochen-Sätze je Muskelgruppe, siehe oben).

### Übungen
- Name (Pflicht), **Wiederholungsbereich** von/bis (optional), **Gewichtsschritt** (1, 1,25, 2, 2,5 oder 5 kg), **Körpergewichtsübung** (ja/nein: Gewicht ist dann ein Zusatzgewicht, 0 wird als "Körpergewicht" angezeigt)
- **Hauptmuskelgruppe** (optional, genau eine): Brust, Rücken, Schultern, Bizeps, Trizeps, Beine, Bauch. Sie steuert die Wochen-Sätze (siehe unten). Nebenmuskeln werden nicht mitgezählt, die Zahlen sind eine Näherung.
  - **Einstellbar an drei Stellen:** beim Anlegen einer Übung, im **Bearbeiten-Formular** und direkt in der **Übungsdetailansicht** (Tippen auf eine Übung bzw. auf "Verlauf"): dort gibt es Chips für die sieben Gruppen, erneutes Antippen entfernt die Zuordnung.
  - Die Zuordnung ist eine Eigenschaft der **Übung**, nicht des einzelnen Trainings. Ändert der Nutzer sie, gelten die Wochen-Sätze der aktuellen Woche sofort mit der neuen Zuordnung.
  - In den Auswahllisten (Übung zum Training oder Trainingstag hinzufügen) steht die Hauptmuskelgruppe als Kleintext unter dem Namen.
- Optional eine dauerhafte **Notiz** pro Übung (z. B. Sitzhöhe, Griffbreite), sichtbar auf der Übungskarte im Training
- Einheit ist Kilogramm
- **Bearbeiten** jederzeit (alle Felder: Name, Hauptmuskelgruppe, Wiederholungsbereich, Gewichtsschritt, Körpergewichtsübung, Notiz). Entfernen jederzeit; alte Trainings behalten die Einträge ("Gelöschte Übung").

### Trainingstage (Vorlagen) individuell einrichten
- Erreichbar über den Link **Trainingstage**: Liste mit **Bearbeiten**, **Duplizieren**, **Entfernen** und dem Button "Neuer Trainingstag"
- Ein Trainingstag hat einen **Namen** (z. B. "Oberkörper") und eine **geordnete Liste von Übungen**. Unter "Übungen" bekommt er genau die, die der Nutzer hineinlegt; sie sind beim Start des Trainings standardmäßig dabei.
- **Beliebig viele Trainingstage.** Zum Beispiel "Oberkörper" und "Oberkörper 2" mit jeweils anderen Übungen.
- **Duplizieren** legt eine Kopie mit dem Zusatz " 2" an, die danach frei geändert werden kann
- Im Editor: Übungen hinzufügen (aus der Übungsliste), entfernen und die Reihenfolge ändern (Pfeile oder Ziehen). Speichern braucht Name und mindestens eine Übung.
- Es gibt keinen Zwang, einen Trainingstag zu nutzen. "Freies Training" bleibt möglich.

### Verlauf (Liste)
Liste der Trainings, neueste zuerst: Datum, Name, pro Übung die Sätze als Text ("60 kg × 10, 10, 9"). Löschen möglich, Bearbeiten möglich. **Nur zum Nachschauen**, ohne Auswertung. Die Kurve steht pro Übung, siehe oben.

### Ausdrücklich nicht
- **Keine Diagramme außer der Load-Kurve pro Übung.** Keine Summen über ganze Trainings (kein Gesamtvolumen), keine Wochen- oder Monatsstatistik, keine Balken- oder Kreisdiagramme. **Einzige Ausnahme:** die Zahl der Arbeitssätze je Muskelgruppe in der aktuellen Woche und der Vorwoche, ohne weiteren Verlauf
- **Keine Zähler** für Trainingstage ("3 von 4"), keine Serien, keine Anzeige verpasster Trainings
- Keine Bestleistungs-Auszeichnungen, Abzeichen, Konfetti, Ranglisten oder Vergleiche mit anderen
- Keine Kalorien, keine Herzfrequenz, keine Eintragung in Apple Health (in Version 1)
- **Keine automatische Verbindung zu Vorsätzen:** Ein Training hakt einen Vorsatz wie "dreimal pro Woche ins Gym" nicht ab. Vorsätze bleiben ohne Zählen.
- Keine Erinnerungen ans Training außer den bestehenden Vorsatz-Erinnerungen
- Kein Hinweis, Warnung oder Farbe, wenn das Progressionsziel nicht erreicht wurde

## Datenmodell (IndexedDB, lokal)

```
Intention        id, what, why?, whenWhere?, isActive, reminderWeekdays?, reminderTime?, createdAt
MorningEntry     id, date, promptKind (identity|gratitude), text?, intentionID?
EveningEntry     id, date, good?, letGo?, stressOrFear?
InspirationItem  id, title?, body, url?, videoFile?, voiceNoteFile?, category, createdAt
WeeklyReview     id, weekStart, answer?
Dish            id, name, categoryNames[], occasion, effort, ingredients[] (mind. 1), optionalIngredients[], note?, url?
Category        name (Startset: Vegetarisch, Vegan, Fleisch, Fisch, Süßes; eigene möglich)
ShoppingSelection dishID (Gerichte auf der Einkaufsliste)
CheckedIngredient key (normalisierte Zutat, abgehakt)
Person          id, name, note?
Task            id, text, isDone, sortOrder, createdAt
Exercise        id, name, repMin?, repMax?, weightStep, isBodyweight, muscleGroup?, note?
WorkoutTemplate id, name, exerciseIDs[] (geordnet)
WorkoutSession  id, date, templateName?, items[] mit exerciseID und sets[] (weight, reps) (nur abgehakte Sätze)
ConnectionRound personIDs[] (intern: in dieser Runde bereits gezeigt)
StilleDefaults   rhythm, minutes, customIn, customHold1, customOut, customHold2
AppSettings      Zeiten, Modi, Flags, soundEnabled, phaseTonesEnabled, vacationUntil?, vacationOpenEnded, trainingHints, goalEnabled, goalPercent, goalWeeks, weeklyGuideEnabled, weeklyGuideMin, weeklyGuideMax, bodyWeightKg? (Singleton)
```

Kein Feld für "erledigt", "Streak" oder "Punkte". Pro Tag darf es mehrere Einträge geben (nur der neueste zählt für die Anzeige, keiner wird gelöscht).

## Erstes Öffnen (Onboarding, kurz)

1. Willkommen, ein Satz zur Idee ("Ein ruhiger Ort für Morgen und Abend.")
2. **Nur wenn die App im Browser geöffnet ist (nicht installiert):** ruhige, kurze Anleitung "Tippe auf Teilen und dann auf Zum Home-Bildschirm. Öffne die App danach von dort."
3. Zeiten für Morgen und Abend wählen (Standard 7:30 und 21:00)
4. Ein Hinweis: "Erinnerungen erzeugst du später in den Einstellungen als Kalenderdatei. Deine Daten liegen nur auf diesem iPhone. Unter Sicherung kannst du sie jederzeit exportieren." Fertig, kein Tutorial-Marathon.

## Bewusst nicht in Version 1

KI-Buddy, iCloud-Sync, Widgets, Apple Watch, eingebettete Videos, Fotos bei Gerichten, Teilen von Einträgen mit anderen Personen (die Einkaufsliste über das iOS-Teilen-Menü ist erlaubt). Kandidaten für später, siehe `SPAETER.md`.
