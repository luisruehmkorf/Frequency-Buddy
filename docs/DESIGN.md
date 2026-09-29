# Design-System

Richtung: modern, ruhig, hochwertig, minimalistisch. Orientierung an der Klarheit von Apple und ähnlichen Marken (wechselnde helle und dunkle Bühnen, eine einzige Farbstimme, Pillen-Buttons, gruppierte Listen, wenig Schatten), ohne etwas zu kopieren. Nah an iOS: iOS-typische Formen und Muster, umgesetzt mit HTML und CSS (siehe `docs/WEBAPP.md`).

**Starke Inspirationsquelle:** `docs/referenz/entwurf.html` (klickbarer Entwurf, im Browser öffnen und im Quelltext lesen). Daran orientieren, auch bei Abständen, Formen und Bewegung. Bei Widersprüchen gelten dieses Dokument und `SPEC.md`. Der Entwurf enthält zusätzlich eine Schriftauswahl, die es in der App nicht geben wird (Manrope ist fest).

## Leitprinzipien

- Neutral und kühl statt warm. Kein Beige, kein Messing.
- Eine einzige Farbstimme: die Wellenlinie in Blautönen. Alles andere ist Off-White, Navy, Schwarz.
- Hell und dunkel wechseln sich als Bühnen ab: helle Alltagsflächen, dunkle "Fokusbühnen" für Rituale und Inspiration.
- Kein Science-Fiction-Look: kein Neon, kein starkes Leuchten, keine schwebenden Linien auf der Startseite.

## Farben

Alle Farben als CSS-Variablen (Design-Tokens) mit Hell-, Dunkel- und Fokusbühnen-Variante, Muster im Entwurf `docs/referenz/entwurf.html`. Kontraste mindestens WCAG AA prüfen.

### Hellmodus (Standard-Flächen)

| Rolle | Wert |
|---|---|
| Hintergrund | Off-White `#F4F3EE` |
| Fläche (Listen, Karten) | `#FBFAF7` |
| Füllung (Chips, Segmentschalter-Spur) | `#E9E8E2` |
| Linien | `#E2E0D8` |
| Text primär, Buttons | Navy `#12213F` |
| Text sekundär | `#5A6579` |
| Hervorhebung (kleiner Punkt, Balken) | Blau `#4D8FE3` |

### Fokusbühne im Hellmodus (Rituale, Inspiration)

Navy statt Schwarz: Hintergrund `#0F1B36`, Fläche `#182848`, Füllung `#1F3156`, Linien `#23355A`, Text `#F4F3EE`, Text sekundär `#9AA8C2`, Button-Fläche `#F4F3EE` mit Text `#0F1B36`.

### Dunkelmodus

Hintergrund Schwarz `#050608`, Fläche `#0F1217`, Füllung `#171B22`, Linien `#1C2028`, Text Off-White `#F4F3EE`, Text sekundär `#8B909A`, Button-Fläche `#F4F3EE` mit Text `#050608`. Die Fokusbühne entspricht im Dunkelmodus dem normalen Dunkelmodus (Schwarz).

### Wellenfarben

- **Hellmodus, Linienwellen (Atemmoment):** Verlauf `#7DB8F7`, `#A9D3FB`, `#D7EBFE` (Abstufungen von Hellblau)
- **Hellmodus, Startseite (gefüllte Wellen):** Karte `#E8F1FB`, Schichten hinten `#D6E7F9`, Mitte `#BFD9F4`, vorne `#A6C9EF`
- **Dunkelmodus, Startseite:** Karte `#0F1A2E`, Schichten `#15264A`, `#1B3260`, `#234072`
- **Dunkelmodus, Linienwellen: Tageslicht.** Morgens (05 bis 16 Uhr) Amber `#FFC15E` nach Koralle `#FF7F5B`, abends Eisblau `#7CC4FF` nach Violett `#9A8CFF`, mit dem Mittelwert als mittlerer Stufe. Einstellbar: Tageszeit, Morgen, Abend.

### Buttons

Hellmodus: Navy-Pille mit Off-White-Text. Dunkelmodus und Fokusbühne: Off-White-Pille mit dunklem Text. Kein Akzentfarben-Button.

## Typografie

**Manrope** (variable Schriftdatei, Open Font License) in der ganzen App. Als lokale woff2-Datei mitliefern (nicht von Google Fonts laden), per `@font-face` einbinden, Größen in rem, damit die iOS-Schriftgröße greift. Keine Serifen. Bei Bedarf ist ein kleiner Größenfaktor nötig, weil Manrope breit läuft.

Wirksame Größen im Entwurf (Punkte):

| Rolle | Größe | Gewicht | Zeichenabstand |
|---|---|---|---|
| Titel Startseite | 40 | 700 | -3 % |
| Seitentitel | 37 | 700 | -3 % |
| Fragen im Ritual | 35 | 700 | -3 % |
| Zitat / Inspiration | 26 | 600 | -3 % |
| Abschnittstitel | 20 | 600 | -3 % |
| Listentitel | 18 | 600 | -3 % |
| Fließtext | 16 bis 17 | 400 | -1 % |
| Kleintext | 13 | 400 | 0 |

Keine Großbuchstaben-Etiketten. Zeilenhöhe bei Überschriften ca. 1,1.

## Layout und Komponenten

- Seitenränder 20 pt, großzügige Abstände (8-Punkt-Raster)
- **Gruppierte Listen** wie in iOS: Fläche-Farbe, Radius 20, feine Trennlinien, kein Rahmen
- **Karten** nur für Wichtiges (Zitat, Person in Connection): Radius 24
- **Startseiten-Karte:** Radius 30, helle Blau-Tönung, Begrüßung in großer Schrift, Datum klein, darunter drei gefüllte Wellenschichten
- **Buttons:** volle Pillenform, Höhe ca. 52, ein Hauptbutton pro Bildschirm
- **Chips:** Pille mit Füllung, ausgewählt = invertiert (Button-Farben)
- **Segmentschalter:** wie iOS, Spur in Füllfarbe, ausgewählter Teil erhält "Daumen" mit leichtem Schatten
- **Tab-Leiste:** nativ, gewählter Tab mit kleinem blauen Punkt
- **Schatten:** nur beim Segmentschalter-Daumen, sonst Kontrast statt Schatten

## Wellenmotiv (Markenzeichen)

- **Startseite:** drei gefüllte Wellenschichten am unteren Rand der Karte, sehr langsam treibend (unterschiedliche Geschwindigkeiten, gegenläufig), Amplitude ca. 9 bis 10 Punkte. Kein Glühen.
- **Atemmoment:** drei dünne Linien mit Farbverlauf über die volle Breite. Die Amplitude folgt einem Atemzyklus (von flach zu hoch zu flach): 4 Sekunden in den Ritualen, 5 Sekunden vor der Inspiration. Nach dem Atemzug liegt die Linie flach. Leichter Lichtschein ist erlaubt, aber dezent.
- **Abschluss:** eine flache Linie zeichnet sich von links nach rechts.
- **Bewegung reduzieren:** Wellen statisch, Atemzähler als Text ("Noch 4 Sekunden").

## Fokusbühne

Rituale (Morgen und Abend) und der gesamte Inspirationsbereich verwenden die Fokusbühne (Navy im Hellmodus, Schwarz im Dunkelmodus). Die Tab-Leiste übernimmt die Farben der Bühne.

## Bewegung

- Übergänge kurz (0,25 bis 0,4 Sekunden), keine Sprungeffekte
- Keine Haptik (im Web nicht verfügbar). Rückmeldung nur über ruhige visuelle Übergänge, z. B. den Wechsel des Hakens.
- `prefers-reduced-motion` respektieren: Wellen statisch, Übergänge durch Überblenden ersetzen

## Icons

Eigene schlanke SVG-Symbole (Strichstärke 1,5, wie im Entwurf). Vorschläge: Heute = Wellenlinie, Vorsätze = Zielscheibe, Küche = Schale mit Dampf, Connection = zwei sich überlappende Kreise, Inspiration = Funkeln.

## App-Icon

Tiefes Navy mit drei feinen hellblauen Wellenlinien. Kein Text, keine Verläufe in Signalfarben.

## Küche und Connection

- **Küche:** Segmentschalter oben (Gerichte, Was koche ich?, Einkauf). Darunter das Suchfeld und Kategorie-Chips. **Gerichte als Kacheln** in zwei Spalten: Fläche-Farbe, Radius 22, mindestens 150 Punkt hoch, oben kleine graue Kategorie-Chips, dann der Name in Manrope 600, darunter Aufwand und Anlass in klein, unten eine flache Wellenkante in der hellsten Wellenfarbe. Gerichte auf der Einkaufsliste tragen oben rechts einen kleinen runden Haken. Detailansicht: Kategorien als Pillen, Zutaten und Optional als gruppierte Listen. Einkaufsliste mit runden Häkchen, erledigte Zeilen durchgestrichen, darunter der Bereich "Optional".
- **Connection:** Große Karte mit der Frage "Wer kommt dir gerade in den Sinn?". Die gezeigte Person mit dem Namen in Zitatgröße, darunter einen Pillen-Button "WhatsApp öffnen". Darunter die Liste "Meine Menschen" als gruppierte Liste.
- **Aufgaben:** im Tab Vorsätze über den Segmentschalter. Eingabefeld mit Pillen-Button, darunter eine gruppierte Liste mit runden Häkchen (24 Punkt), erledigte Zeilen durchgestrichen und grau. Kein Rot, keine Zähler.
- **Eigenes Video (Inspiration):** Karte mit Vorschaubild in abgerundeter Form (Radius 16), darüber ein ruhiges Abspielen-Symbol in einer Off-White-Pille. Kein Autoplay, keine Steuerung außer dem Standard-Player von iOS. Das Warum steht immer zuerst, das Video danach.
- **Stille:** Fokusbühne. Einrichtung als gruppierte Radio-Liste (Rhythmus) mit Namen in 600 und Beschreibung klein, bei "Eigener" vier Zeilen mit Plus/Minus-Chips, darunter Dauer-Chips und ein Hauptbutton "Beginnen". Ablauf im Vollbild mit den drei Linienwellen des Atemmoments und der Phase darüber in Manrope 600, Restzeit standardmäßig unsichtbar. Im Rhythmus Huberman steht nur in den ersten Sekunden dezent "In deinem Tempo", danach bleibt der Text leer und die Welle bewegt sich langsam und frei.
- **Klänge:** sehr leise, weiche Töne. Kein Klang beim Tippen. Einstellungen zeigen "Aus" und "An" als Segmentschalter.
- **Urlaubsmodus:** in den Einstellungen als Segmentschalter mit Zeiträumen. Auf Heute eine unaufdringliche Zeile in Kleintext unter dem Untertitel der Karte.
- **Training:** Startseite als gruppierte Liste der Trainingstage mit den Übungsnamen als Kleintext, darunter zwei Textlinks. Das Training selbst auf der Fokusbühne: pro Übung eine Karte mit Name, Zeile "Letztes Mal" und "Vorschlag" in Kleintext und den Sätzen als Zeilen. Jede Zeile: Satznummer, Gewicht und Wiederholungen mit runden Minus/Plus-Knöpfen (28 Punkt, Füllfarbe) und rundem Haken (26 Punkt) am rechten Rand, darunter in grauem Kleintext der Wert desselben Satzes vom letzten Mal. Die Zahlen in Manrope 600. Keine bunten Fortschrittsanzeigen. Die **Load-Kurve** pro Übung: eine schmale Linie (2 Punkt) in der Textfarbe mit kleinen Punkten (Radius 3), eine gestrichelte, graue Ziellinie (1,2 Punkt, Sekundärfarbe), nur eine dünne Grundlinie, keine Gitterlinien, kleine Zahlen am ersten und letzten Punkt sowie Datum links und rechts unten. Kein Farbverlauf, kein Rot, keine Füllung unter der Kurve. Die Kurve liegt in einer Karte, darunter der Erklärsatz zur Load und eine Liste der letzten Trainings. Trainingstage werden in einem einfachen Editor bearbeitet: Name oben, Übungen als Liste mit Pfeilen und Entfernen-Symbol, darunter die Übungen zum Hinzufügen.
- **Wochen-Sätze (Training):** Block "Sätze diese Woche" als gruppierte Liste, links die Muskelgruppe in Manrope 600, rechts die Zahl der aktuellen Woche in Manrope 600 und daneben in grauem Kleintext "Vorwoche 12". Der optionale Richtwert steht als graue Kleintext-Zeile unter dem Block. Keine Balken, keine Farben, keine Symbole für erreicht oder nicht erreicht. Auf der Übungskarte eine Kleintext-Zeile in der Sekundärfarbe.
