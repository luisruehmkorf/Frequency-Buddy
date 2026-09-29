# Spätere Erweiterungen (nicht in Version 1)

Nichts hieraus wird gebaut, ohne dass der Nutzer es ausdrücklich freigibt. Voraussetzung: Alle Etappen sind abgenommen und die App wurde mindestens ein bis zwei Wochen im Alltag genutzt.

Küche und Connection gehören inzwischen zu Version 1 (siehe `docs/SPEC.md`).

## Kandidaten

- **Native iOS-App** (SwiftUI, SwiftData) mit echten lokalen Benachrichtigungen, Haptik, Face-ID-Sperre, Widgets und Siri-Kurzbefehlen. Braucht das Apple-Developer-Programm (meines Wissens etwa 99 € im Jahr). Die Daten lassen sich über den JSON-Export übernehmen, deshalb bleibt das Format stabil.
- **Web-Push** über einen kleinen eigenen Server (nur Anmeldung und Zeitplan, keine Tagebuchinhalte) statt der Kalenderdatei. Vorher auf dem iPhone des Nutzers in Deutschland testen, ob es zuverlässig funktioniert.
- **App-Sperre per Passkey** (WebAuthn mit Face ID).
- **"Telefon öffnen"** in Connection, nur wenn ein zuverlässiges Verfahren gefunden wird.
- **KI-Buddy:** Reflexion nach dem Abend-Eintrag per API. Bringt Mehrwert, hat aber Datenschutzkosten (Texte verlassen das Gerät) und öffnet die Tür zum Dauer-Chatten. Nur mit klarer Zustimmung und lokal begrenzter Nutzung.
- **iCloud-Sync:** Daten zwischen Geräten. Datenschutz und Verschlüsselung vorher klären.
- **Widgets:** z. B. ein ruhiger Wellen-Widget oder der Vorsatz des Tages, ohne Zähler.
- **Apple Watch:** Atemmoment am Handgelenk.
- **Fotos bei Gerichten** in der Küche.
- **Pausentimer im Training** (leise, ohne Auswertung).
- **Apple Health**: abgeschlossene Trainings dorthin schreiben. Nur auf ausdrücklichen Wunsch, weil es Tracking-Charakter hat.
- **Längerer Verlauf der Wochen-Sätze** über mehr als die Vorwoche hinaus, je Muskelgruppe (nur auf ausdrücklichen Wunsch), eigene Muskelgruppen, Nebenmuskeln anteilig zählen.
- **Weitere Trainingsangaben** wie Anstrengungsgefühl (RPE) oder Notiz pro Satz.
- **Weitere Impulsarten** im Morgen-Ritual, z. B. "Wer bin ich NICHT?" oder "Wem könntest du heute etwas Gutes tun?".
- **Eingebettete Player externer Dienste** (YouTube, Instagram) in der Inspiration. Nicht empfohlen (Sog durch Empfehlungen, Lizenzfragen). Eigene, selbst importierte Videos sind dagegen schon Teil von Version 1.

## Visuelle Referenz

Der klickbare Entwurf `docs/referenz/entwurf.html` zeigt alle fünf Tabs der Version 1.
