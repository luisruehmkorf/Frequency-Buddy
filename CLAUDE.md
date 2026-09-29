# Frequency Buddy (Web-App für das iPhone)

Eine persönliche, ruhige App für das iPhone (installierbare Web-App) für Morgen- und Abend-Ritual, Vorsätze und einen kleinen, selbst kuratierten Inspirationsbereich. Sie ist ein Werkzeug zum Erinnern und Reflektieren, kein Coach, kein Feed und kein Score-System.

Nutzer und Auftraggeber: Tiger (Einzelnutzer, eigenes Gerät, deutsche Sprache).

Lies vor jeder Etappe: `docs/WEBAPP.md` (Technik, hat bei Widersprüchen Vorrang), `docs/PHILOSOPHIE.md`, `docs/SPEC.md`, `docs/DESIGN.md`, `docs/NOTIFICATIONS.md` (Erinnerungen), `docs/ETAPPEN.md`.

## Leitidee

Die App soll gern genutzt werden, weil sie sich gut anfühlt und kurz ist, nicht weil sie süchtig macht. Sie soll dich schneller zurück ins Leben entlassen, nicht länger festhalten. Jede Sitzung hat ein klares Ende.

Grundlage ist die Selbstbestimmungstheorie: Autonomie (Nutzer entscheidet selbst), Kompetenzerleben (aus eigenen Belegen, nicht aus Punkten), Verbundenheit (optional, in V1 nicht gebaut).

## Harte Regeln (nicht verhandelbar)

Diese Dinge werden NICHT gebaut, auch wenn sie naheliegen oder "nett" wären:

- Keine Streaks, keine Zähler für erledigte Tage, keine Prozentwerte, keine Erfolgsquoten
- Keine Diagramme oder Statistik-Dashboards
- Keine Badges, Level, Punkte, Konfetti-Belohnungssysteme
- Keine rote Farbe für "verpasst", keine "überfällig"-Zustände
- Keine Benachrichtigung, die Verpasstes erwähnt oder Schuld erzeugt
- Kein Feed, keine Endlosliste, keine Suche nach neuen Inhalten, kein Autoplay, kein Pull-to-refresh
- Keine Gamification-Mechaniken mit variabler Belohnung
- Keine Analytics, kein Tracking, keine Werbe-SDKs, keine Drittanbieter-Abhängigkeiten ohne Rückfrage
- Keine KI-/Netzwerkfunktionen in Version 1 (alles lokal; die Web-App lädt nur ihre eigenen Dateien und läuft danach offline; einzige Ausnahme: Links öffnen)
- Nichts aus `docs/SPAETER.md` bauen, solange der Nutzer es nicht ausdrücklich freigibt
- Training: als Diagramm ausschließlich die Load-Kurve **pro Übung** (siehe `docs/SPEC.md`, Abschnitt 10). Als Summe über mehrere Übungen ausschließlich die **Wochen-Sätze je Muskelgruppe** der aktuellen Woche und der Vorwoche, ohne weiteren Verlauf, Balken, Pfeile, Prozentwerte, Farben oder Bewertung. Sonst keine Summen oder Statistiken (kein Gesamtvolumen, keine Monatswerte), keine Balken- oder Kreisdiagramme, keine Zähler für Trainingstage, keine Serien, keine Anzeige verpasster Trainings, keine Bestleistungs-Abzeichen oder Konfetti, keine Warnung oder rote Farbe bei verfehltem Progressionsziel oder Wochenrichtwert, kein Eintrag in Apple Health, keine automatische Verbindung zu Vorsätzen. Zahlen dienen als Erinnerung ("Letztes Mal"), Eingabe und als Vorschlag.
- Stille: kein Verlauf, keine Minutensumme, keine Zykluszählung, kein Eintrag in Apple Health, Restzeit standardmäßig ausgeblendet
- Aufgaben: keine Fälligkeiten mit "überfällig"-Anzeige, keine rote Farbe, keine Zähler oder Fortschrittsanzeigen (kein "3 von 7", keine Prozente oder Balken), keine Streaks, keine Prioritäten mit Punktesystem
- Küche: keine Kalorien oder Nährwerte, kein Wochenplaner, keine Rezeptsuche oder -feeds, keine Bewertungen, keine "zuletzt gekocht"-Anzeige
- Connection: kein Speichern oder Anzeigen, wann zuletzt Kontakt war, keine Rangfolge, kein Zugriff auf Kontakte oder das Adressbuch
- Keine Pflichtfelder in Journal-Flows. Alles ist überspringbar.

Wenn eine Idee eine dieser Regeln berührt: nicht bauen, sondern beim Nutzer nachfragen.

## Tonalität der Texte (Deutsch, du-Form)

- Kurz, meist ein Satz, höchstens zwei
- Einladung statt Aufforderung ("wenn du willst", "wenn du magst")
- Identität und Präsenz vor Leistung ("Wer willst du heute sein?")
- Nie Vorwurf, nie Zahl, nie Rückblick auf Verpasstes
- Keine Ausrufezeichen, keine Emojis, keine Motivationsfloskeln
- Fragen statt Behauptungen. Keine medizinischen oder wissenschaftlichen Tatsachenbehauptungen in App-Texten ohne belastbaren Beleg. Denkbilder wie "Stress oder Angst?" sind als Frage formuliert, nicht als Fakt.
- Alle Texte liegen in einer Textdatei (`src/texts/de.ts`), nicht verstreut im Code

## Technische Leitplanken

Die App ist eine **installierbare Web-App (PWA) für das iPhone**, kein natives Projekt. Alle Details stehen in `docs/WEBAPP.md`.

- TypeScript und Vite. Kein UI-Framework ohne Rückfrage. Erlaubte Pakete: `vite`, `typescript`, `vitest`. Alles andere nur nach ausdrücklicher Freigabe.
- Persistenz: IndexedDB, ausschließlich lokal, versioniert mit Migrationen. Kein Konto, kein Server, keine Analytics, keine Cookies.
- Hosting: kostenloser statischer Hoster mit HTTPS. Repository und Hoster enthalten nie persönliche Daten.
- Offline: Service Worker, die App startet nach dem ersten Laden auch ohne Netz.
- Erinnerungen: Kalenderdatei (.ics), siehe `docs/NOTIFICATIONS.md`. Kein Server in Version 1.
- Keine Haptik und keine Face-ID-Sperre (im Web nicht verfügbar), Rückmeldung nur über ruhige visuelle Übergänge
- Safe Areas, Dark Mode über `prefers-color-scheme`, Schriftgrößen in rem
- Schrift: Manrope als lokale woff2-Datei, keine externen Schriftanfragen. Keine Schriftauswahl in der App.
- **Starke Inspirationsquelle:** `docs/referenz/entwurf.html` ist ein klickbarer Entwurf der gesamten App und die Ausgangsbasis für die Web-App. Öffne ihn im Browser und orientiere dich stark daran: Aufbau, Abstände, Formen, Farben, Bewegung der Wellen, Texte und Abläufe. Lies auch den Quelltext (HTML, CSS, JavaScript): Dort stehen konkrete Werte und Logik, zum Beispiel die Wellenanimation, die Suche der Küche, die Rotation in Connection und die Vorschlagsrechnung im Training. Du darfst Code daraus übernehmen, teilst ihn aber in Module auf. Wenn Entwurf und Beschreibung sich widersprechen, gelten `docs/WEBAPP.md`, `docs/SPEC.md` und `docs/DESIGN.md`. Nicht übernehmen: die Schriftauswahl, die Beispieldaten, das Laden von Google Fonts und das Speichern in localStorage.
- Keine Beispieldaten in der echten App, nur leere, einladende Zustände
- Klänge: Web Audio, selbst erzeugte, sehr leise Sinustöne, Standard aus, nur nach Tippen des Nutzers gestartet. Keine Fremd-Audiodateien ohne Rückfrage. Ausnahme: Der Grundklang im Stille-Rhythmus Huberman läuft unabhängig von dieser Einstellung; er soll auch bei Stumm-Schalter hörbar sein, soweit der Browser das zulässt. Auf dem iPhone testen und dem Nutzer ehrlich berichten.
- Eigene Videos in der Inspiration: Dateifeld (`accept="video/*"`), als Blob in IndexedDB speichern, auf 90 Sekunden begrenzen. Wiedergabe mit `<video controls playsinline>` nur nach Tippen, ohne Autoplay, ohne Schleife, ohne Folgevideo.
- Barrierefreiheit: ARIA-Labels, `prefers-reduced-motion` respektieren, Kontrast mindestens WCAG AA
- Datenschutz und Sicherung: Alle Daten bleiben im Browser-Speicher des Geräts. Export (JSON und Markdown), Import (JSON) und komplettes Löschen in den Einstellungen. Die Sicherung ist wichtig, weil der Browser Web-App-Daten unter Umständen löschen kann (siehe `docs/WEBAPP.md`).
- Architektur: einfach halten. Ein Ordner pro Bereich, Oberfläche dünn, Logik (Rotation, Erinnerungsplanung, Suche, Vorschläge, Load, Wochenzählung, Kalenderdatei) in reinen, testbaren Funktionen
- Unit-Tests (Vitest) für: Text-Rotation, Erinnerungsplanung, Impuls-Wechsel (Identität/Dankbarkeit), Suche der Küche, Vorschläge und Load im Training, Wochenzählung

## Arbeitsweise

1. Arbeite Etappe für Etappe gemäß `docs/ETAPPEN.md`. Gehe erst zur nächsten, wenn der Nutzer die aktuelle abgenommen hat.
2. Kleine, nachvollziehbare Commits mit deutschen oder englischen Nachrichten, konsistent.
3. Beginne jede Etappe mit einem kurzen Plan (Dateien, Modelle) und warte auf ein Okay, wenn Entscheidungen offen sind.
4. Bei Unklarheit lieber eine Frage stellen als etwas dazuzubauen. Weniger ist hier das Ziel.
5. Prüfe am Ende jeder Etappe die Akzeptanzkriterien und die harten Regeln oben.

## Philosophie (Pflichtlektüre)

Die App verkörpert den "Frequency Buddy": einen Mentor, der Nutzer Tiger hilft, seine eigene Frequenz zu finden, im Jetzt zu leben und den Kreislauf der Selbstoptimierung zu durchbrechen. Grundlage ist das SCAT-Framework (Silence the Static, Clarify the Signal, Earn your Frequency, Transmit Relentlessly) mit Ideen wie Power Questions, Identität vor Verhalten, Don't leave crumbs, Post-Meal Walk und Dankbarkeit.

Vollständig und mit Zuordnung zu den App-Bausteinen steht das in `docs/PHILOSOPHIE.md`. Lies es, bevor du Texte, Fragen oder Rituale schreibst.

Zwei Prinzipien für den Umgang damit:
1. Die Philosophie liefert Inhalt, Fragen und Haltung. Die harten Regeln oben liefern den Rahmen. Bei Konflikt gewinnen die harten Regeln.
2. Denkbilder werden als Fragen oder Perspektiven formuliert, nie als Tatsachenbehauptung.
3. Leitbild: Selbstwirksamkeit durch ein gesundes Leben auf drei Ebenen (sozial, Gesundheit, spirituell). Die Ebenen sind eine Linse, kein Bewertungssystem. Details in `docs/PHILOSOPHIE.md`, Abschnitt 8.

Die App ersetzt keine Therapie oder Beratung.
