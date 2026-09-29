# Erinnerungen

Die App erzeugt eine **Kalenderdatei (.ics)** mit sanften Erinnerungen für die nächsten Wochen. Der Nutzer importiert sie einmal in einen eigenen Kalender auf dem iPhone. So kommen die Erinnerungen als normale Benachrichtigungen, ohne Server. Zweck: sanfte Einladung, nie Druck.

Hinweis: Diese Datei heißt aus Gewohnheit weiter `NOTIFICATIONS.md`.

## Regeln

1. **Höchstens 3 Erinnerungen pro Tag** (harte Grenze bei der Erzeugung)
2. Zeiten und Kategorien stellt der Nutzer selbst ein, jede Kategorie ist einzeln abschaltbar
3. Nie eine Nachricht über Verpasstes, nie eine Zahl, nie ein Vorwurf
4. Höchstens zwei Sätze, keine Emojis, keine Ausrufezeichen
5. Derselbe Text erscheint frühestens nach 5 Tagen wieder (Rotation ohne Wiederholung, danach Pool durchlaufen)
6. **Urlaubsmodus:** Für Tage im Urlaubszeitraum (siehe `SPEC.md`, Einstellungen) werden **keine** Erinnerungen erzeugt, auch nicht Connection und Wochenrückblick. Bei "Ohne Ende" enthält die Datei keine Erinnerungen, bis der Modus ausgeschaltet wird.
7. Es gibt **keine Rückkehr-Nachricht** und keine Erinnerung, die vom Verhalten des Nutzers abhängt (im Web nicht möglich)

## Textpool (Deutsch)

Als Startbestand. Änderungen nur in der Textdatei (`src/texts/de.ts`). Der Nutzer hat diese Texte ausgewählt: "Wer willst du heute sein?", "Kurz raus?", "Heute ist ein Gym-Tag, wenn du willst. Du hast es dir vorgenommen.", "Zeit, den Tag loszulassen. Zwei Minuten reichen.", "Schön, dass du da bist, wann immer du willst."

### Morgen (`morning`)
- Wer willst du heute sein?
- Guten Morgen. Nimm dir einen ruhigen Moment für dich.
- Neuer Tag. Womit möchtest du beginnen?
- Was wäre heute genug?

### Bewegung (`movement`, nach dem Essen, standardmäßig aus)
- Kurz raus?
- Frische Luft, wenn du magst.
- Ein paar Schritte gefällig?

### Vorsatz (`intention`)
Generisch:
- Dein Vorsatz wartet auf dich. Heute passt er, wenn du magst.
- Wenn heute nicht dein Tag ist, ist das auch okay.

Vorsatz mit hinterlegtem Wochentag (Platzhalter `{was}`, kurzer Titel des Vorsatzes):
- Heute passt: {was}. Wenn du willst.
- Heute ist ein Tag für {was}, wenn du magst. Du hast es dir vorgenommen.

Hinweis: Die zweite Variante ("Du hast es dir vorgenommen") kann an müden Tagen wie Druck wirken. Deshalb Variante 1 als Standard. In den Einstellungen wählbar, welcher Stil gilt.

### Abend (`evening`)
- Zeit, den Tag loszulassen. Zwei Minuten reichen.
- Was darf heute gehen?
- Ein ruhiger Abschluss, wenn du magst.

### Connection (`connection`, höchstens einmal pro Woche, Standard aus)
Ohne Namen (Standard):
- Wer kommt dir gerade in den Sinn?
- Vielleicht magst du dich heute bei jemandem melden.

Mit Namen (nur wenn der Nutzer es einschaltet; Platzhalter `{name}`):
- Magst du dich mal bei {name} melden?

### Wochenrückblick (`weekly`, Sonntag, Standard aus bis aktiviert)
- Ein kurzer Blick auf die Woche, wenn du magst.

## Kalenderdatei

Die App erzeugt auf Knopfdruck eine Datei `frequency-buddy-erinnerungen.ics` für die **nächsten 28 Tage**:

- Kalendername `Frequency Buddy` (`X-WR-CALNAME`), damit der Nutzer beim Import einen **neuen Kalender** wählt und alles später mit einem Löschen entfernen kann
- Pro Erinnerung ein Termin: Titel = der Text aus dem Pool (er erscheint in der Benachrichtigung), Beginn zur eingestellten Uhrzeit in **lokaler Zeit ohne Zeitzone** (floating), Dauer 5 Minuten, eindeutige `UID`, eine Erinnerung (`VALARM`) zum Beginn (`TRIGGER:PT0M`, `ACTION:DISPLAY`) mit demselben Text
- Kategorien und Zeiten laut Einstellungen; Vorsatz-Erinnerungen aus den Wochentagen und der Uhrzeit der aktiven Vorsätze. Wenn dadurch mehr als 3 pro Tag entstünden, gewinnt die Reihenfolge Morgen, Vorsatz, Abend, Connection, Bewegung.
- Pro Kategorie und Tag wird ein Text gezogen, der in den letzten 5 Tagen nicht verwendet wurde. Die Rotation merkt sich die verwendeten Texte lokal.
- Text mit Namen bei Connection nur, wenn der Nutzer es eingeschaltet hat

**Bereitstellung:** Die App bietet die Datei zum Öffnen an (Download oder Teilen-Menü, Claude Code testet, was auf dem iPhone den Dialog "Zum Kalender hinzufügen" zeigt).

**Anleitung in der App** (kurz, drei Schritte): Datei öffnen, "Alle hinzufügen" und den Kalender "Frequency Buddy" neu anlegen, Fertig. Dazu ein Satz, wie man den Kalender wieder löscht.

**Auffrischen:** In den Einstellungen steht ruhig, bis wann die Erinnerungen reichen ("Deine Erinnerungen reichen bis zum 24. Oktober."). Nach etwa vier Wochen erzeugt der Nutzer eine neue Datei. Kein Hinweis außerhalb der Einstellungen.

**Grenzen (bekannt und akzeptiert):** Ein Tipp auf die Benachrichtigung öffnet den Kalender, nicht die App. Keine Rückkehr-Nachricht. Das Verhalten ist auf dem iPhone des Nutzers zu prüfen (siehe `WEBAPP.md`, Checkliste).

**Alternative ohne Datei:** In den Einstellungen können die Texte kopiert werden, damit sich der Nutzer selbst wiederkehrende Erinnerungen in der Erinnerungen-App anlegen kann.

## Später

Web-Push über einen kleinen eigenen Server ist ein Kandidat für später (siehe `SPAETER.md`). Vorher muss auf dem iPhone des Nutzers getestet werden, ob Web-Push in einer installierten Web-App in Deutschland zuverlässig funktioniert.

## Tests (Pflicht)

- Rotation: kein Text wiederholt sich innerhalb von 5 Tagen, Pool wird nie leer
- Tageslimit: nie mehr als 3 pro Tag
- Ausgeschaltete Kategorien erzeugen keine Termine
- Connection: höchstens eine Erinnerung pro Woche, ohne Namen im Text, solange die Option nicht eingeschaltet ist
- Urlaubsmodus: Im Zeitraum entstehen keine Termine; nach Ablauf wird wieder normal erzeugt
- Kalenderdatei: gültiges .ics-Format (Kopfzeilen, Zeilenenden, Escaping von Kommas und Semikolons), eindeutige UIDs, Erinnerung zum Beginn
