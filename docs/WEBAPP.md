# Web-App (PWA): Technik und Vorgaben

Die App wird als **installierbare Web-App (PWA) für das iPhone** gebaut, nicht als natives iOS-Projekt. Gründe: keine Kosten für das Apple-Developer-Programm, Entwicklung auch auf einem Windows-Rechner möglich, der klickbare Entwurf ist bereits eine Web-App. Später kann eine native Version folgen (siehe `docs/SPAETER.md`), deshalb bleiben Datenmodell und Export-Format stabil.

Alles in `SPEC.md`, `DESIGN.md`, `PHILOSOPHIE.md` und `ETAPPEN.md` gilt weiter. Wo dort native Begriffe stehen (SwiftUI, Haptik, Face-ID und Ähnliches), gilt diese Datei. Sie hat bei Widersprüchen Vorrang.

## 1. Technik

- **TypeScript und Vite.** Kein UI-Framework ohne Rückfrage. Der Entwurf `docs/referenz/entwurf.html` ist reines JavaScript und dient als Ausgangsbasis, wird aber in Module aufgeteilt.
- **Erlaubte Pakete:** `vite`, `typescript`, `vitest`. Alles Weitere nur nach Rückfrage (auch kleine Hilfen für IndexedDB).
- **Reine Logik getrennt von der Oberfläche** und mit Vitest getestet: Rotation von Texten, Erinnerungsplanung, Impuls-Wechsel, Suche der Küche, Vorschläge und Load im Training, Wochenzählung, Kalenderdatei.
- **Kein Server, keine Konten, keine Analytics, keine Cookies.** Die App lädt nach dem ersten Mal nur ihre eigenen Dateien.
- **Sprache:** nur Deutsch. Alle Texte in einer Textdatei (`src/texts/de.ts`).

## 2. Projektstruktur (Vorschlag)

```
src/
  core/        Datenbank (IndexedDB), Router, Ansichten-Helfer, Design-Bausteine
  logic/       Reine Funktionen (mit Tests): rotation, suggest, load, weeks, search, ics
  features/    heute, rituale, vorsaetze, kueche, connection, inspiration, training, stille, rueckblick, einstellungen
  texts/       de.ts
public/        manifest.webmanifest, icons, fonts (Manrope, woff2), service worker
```

## 3. Hosting und Installation

- **Kostenloser statischer Hoster mit HTTPS** (z. B. GitHub Pages, Cloudflare Pages oder Netlify). Claude Code richtet gemeinsam mit dem Nutzer ein Git-Repository ein und sorgt dafür, dass jeder Push automatisch veröffentlicht wird.
- Weder Repository noch Hoster enthalten jemals persönliche Daten. Die Adresse der App ist öffentlich erreichbar, sie zeigt aber ohne die Daten im Browser des Nutzers nur eine leere App.
- **Installieren:** In Safari Teilen, dann "Zum Home-Bildschirm". Auf aktuellen iOS-Versionen öffnet sich das dann im Vollbild wie eine App. Nur Safari verwenden.
- Öffnet der Nutzer die Seite im Browser (nicht installiert), zeigt die App eine ruhige, kurze Anleitung zum Installieren (Erkennung über `display-mode: standalone` bzw. `navigator.standalone`).
- **Manifest:** Name "Frequency Buddy", Anzeigemodus `standalone`, Farben laut `DESIGN.md`, Symbole 192 und 512 Pixel sowie ein Apple-Touch-Icon 180 Pixel (Motiv: Navy mit drei feinen hellblauen Wellenlinien).
- `viewport-fit=cover` und Safe Areas beachten (wie im Entwurf).

## 4. Offline und Updates

- **Service Worker** mit Cache der App-Dateien. Nach dem ersten Laden startet die App auch ohne Netz.
- **Updates:** Neue Versionen werden im Hintergrund geladen und beim nächsten Start aktiv. Eine ruhige Zeile "Neue Version wird beim nächsten Öffnen aktiv" genügt. Versionsnummer in den Einstellungen unter Info.
- Achtung vor veralteten Zwischenspeichern: Ein Update darf nie Daten in IndexedDB beschädigen. Datenmigrationen sind versioniert und getestet.

## 5. Speicher, Persistenz und Sicherung

- **IndexedDB** für alle Daten (Datenmodell laut `SPEC.md`). Videos als Blobs in einem eigenen Speicherbereich. Versionierte Migrationen.
- **Der Browser kann Web-App-Daten unter Umständen löschen** (Speicherknappheit, lange Nichtnutzung). Deshalb:
  - Bei passender Gelegenheit (nach dem ersten Eintrag) `navigator.storage.persist()` anfragen und das Ergebnis ruhig in den Einstellungen anzeigen. Mehr nicht, kein Drängeln. Auf iOS ist das nur eingeschränkt möglich.
  - **Sicherung ist Pflicht-Funktion:** Export als JSON (vollständig, mit Schemaversion) und als Markdown, Import aus JSON mit Bestätigung ("Ersetzen" oder "Zusammenführen"). Videos sind nicht Teil des Exports.
  - In den Einstellungen unter Sicherung steht dezent das Datum der letzten Sicherung. Ist sie über 30 Tage her, erscheint dort (nur dort) ein ruhiger Hinweis. Keine Benachrichtigung und kein Hinweis auf Heute.
- Speicherbedarf der Videos in den Einstellungen unter Info (eine Angabe, keine Auswertung).
- Das Exportformat bleibt stabil, damit die Daten später in eine native App übernommen werden können.

## 6. Erinnerungen

Im Web gibt es keine geplanten lokalen Benachrichtigungen. Version 1 nutzt deshalb **Kalendererinnerungen aus einer Datei**, siehe `docs/NOTIFICATIONS.md`. Web-Push über einen eigenen Server ist ein späterer Kandidat und muss zuerst auf dem iPhone des Nutzers getestet werden (Deutschland, EU).

## 7. Was im Web anders ist

| Thema | Native Vorgabe im Briefing | Im Web |
|---|---|---|
| Haptik | Feedback beim Abschluss und Abhaken | **Entfällt.** Rückmeldung nur über ruhige visuelle Übergänge |
| Face-ID-Sperre | Optionale App-Sperre | **Entfällt in Version 1** (Kandidat: Passkey, siehe `SPAETER.md`) |
| Benachrichtigungen | Lokale Benachrichtigungen | **Kalenderdatei** mit Erinnerungen, keine Rückkehr-Nachricht |
| Connection | "WhatsApp öffnen" und "Telefon öffnen" | **Nur "WhatsApp öffnen"** (Link `whatsapp://`). Ein Telefon-Button ohne Nummer ist im Web nicht sicher möglich |
| Videos | Systemeigene Fotoauswahl | **Dateifeld** (`accept="video/*"`), das die Fotos-Mediathek öffnet. Blob in IndexedDB |
| Ton | Audio-Sitzung Ambient und Playback | **Web Audio**, nur nach Tippen gestartet. Verhalten beim Stumm-Schalter auf dem iPhone testen |
| Bildschirm an | Nicht ausschalten während der Übung | **Screen Wake Lock** (meines Wissens in Home-Bildschirm-Web-Apps seit Safari 18.4) |
| Einkaufsliste teilen | iOS-Teilen-Menü | **Web Share API**, Zwischenablage als Rückfall |
| Symbole | SF Symbols | **Eigene SVG-Symbole** (wie im Entwurf) |
| Schrift | Mitgelieferte Datei | **Lokale woff2-Datei**, keine Google Fonts |
| Datenschutzklasse | Verschlüsselung der Datenbank durch das System | **Nicht verfügbar.** Daten liegen unverschlüsselt im Browser-Speicher des Geräts |

## 8. Auf dem iPhone zu testen (Checkliste für Claude Code und den Nutzer)

1. Installieren über Teilen, Start im Vollbild, Safe Areas, Hell/Dunkel
2. Start im Flugmodus nach dem ersten Laden
3. Daten bleiben nach Schließen und mehreren Tagen erhalten
4. **Kalenderdatei:** Import in einen neuen Kalender "Frequency Buddy", Erinnerungen erscheinen zur eingestellten Zeit als Benachrichtigung mit dem Text als Titel
5. WhatsApp-Link öffnet die App
6. Video: Auswahl aus Fotos, Speichern, Wiedergabe mit Ton, Verhalten beim Stumm-Schalter
7. Klänge und Grundklang: Verhalten beim Stumm-Schalter, Start nur nach Tippen
8. Bildschirm bleibt während Stille und Training an
9. Einkaufsliste teilen
10. Export und Import: Rundlauf ohne Datenverlust
11. **Optional, zuerst testen bevor Web-Push gebaut wird:** Funktioniert Web-Push in einer installierten Web-App auf diesem iPhone in Deutschland?

Findet Claude Code Abweichungen, sagt er es dem Nutzer ehrlich und schlägt die einfachste Lösung vor, statt still etwas anderes zu bauen.
