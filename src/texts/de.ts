// Alle App-Texte (Deutsch, du-Form). Tonalität: kurz, einladend, keine Zahlen, keine Vorwürfe.
// Regeln stehen in CLAUDE.md, Abschnitt "Tonalität der Texte".

export const de = {
  app: { name: 'Frequency Buddy' },

  tabs: {
    heute: 'Heute',
    vorsaetze: 'Vorsätze',
    kueche: 'Küche',
    connection: 'Connection',
    inspiration: 'Inspiration',
  },

  heute: {
    greetingMorning: 'Guten Morgen.',
    greetingDay: 'Guten Tag.',
    greetingEvening: 'Guten Abend.',
    sub: 'Ein ruhiger Ort für Morgen und Abend.',
    settings: 'Einstellungen',
    morning: { title: 'Morgen-Ritual', meta: 'Unter einer Minute' },
    evening: { title: 'Abend-Ritual', meta: 'Unter zwei Minuten' },
    training: { title: 'Training', meta: 'Deine Zahlen von letztem Mal' },
    stille: { title: 'Stille', meta: 'Atmen und einfach da sein' },
    rueckblick: { title: 'Rückblick', meta: 'Tagebuch' },
  },

  ritual: {
    next: 'Weiter',
    skip: 'Überspringen',
    finish: 'Fertig',
    close: 'Schließen',
    back: 'Zurück',
    morning: {
      identity: 'Wer willst du heute sein?',
      gratitude: 'Wofür bist du gerade dankbar?',
      placeholder: 'Ein Satz genügt.',
      done: 'Guten Tag.',
    },
    evening: {
      good: 'Was war gut heute?',
      goodPlaceholder: 'Auch Kleines zählt.',
      letGo: 'Was darf gehen?',
      letGoPlaceholder: 'Was du nicht mit in die Nacht nehmen willst.',
      stress: 'Stress oder Angst?',
      stressHelp: 'Wenn dich etwas beschäftigt: Ist es eher Stress oder Angst? Ein Satz reicht.',
      optional: 'Optional',
      done: 'Gute Nacht.',
    },
  },

  rueckblick: {
    title: 'Rückblick',
    sub: 'Deine eigenen Worte, neueste zuerst.',
    empty: 'Hier erscheinen deine Einträge, sobald du welche schreibst.',
    morning: 'Morgen',
    evening: 'Abend',
    noText: 'Ohne Text.',
    letGo: 'Losgelassen:',
    stress: 'Stress oder Angst?',
    edit: 'Bearbeiten',
    save: 'Speichern',
    editTitle: 'Eintrag bearbeiten',
  },

  vorsaetze: {
    segmentIntentions: 'Vorsätze',
    segmentTasks: 'Aufgaben',
    empty: 'Noch nichts hier. Ein Vorsatz beginnt mit einem Satz.',
    tasksEmpty: 'Nichts offen. Das darf auch mal so sein.',
  },

  einstellungen: {
    title: 'Einstellungen',
    back: 'Zurück',
    appearance: 'Darstellung',
    themeAuto: 'Automatisch',
    themeLight: 'Hell',
    themeDark: 'Dunkel',
    impulse: 'Impuls am Morgen',
    impulseAlternate: 'Wechsel',
    impulseIdentity: 'Identität',
    impulseGratitude: 'Dankbarkeit',
    info: 'Info',
    version: 'Version',
    privacy: 'Deine Daten liegen nur auf diesem iPhone.',
  },

  kueche: {
    empty: 'Noch kein Gericht. Was kochst du gern?',
  },

  connection: {
    empty: 'Noch niemand hier. Wer fällt dir als Erstes ein?',
    question: 'Wer kommt dir gerade in den Sinn?',
  },

  inspiration: {
    question: 'Was brauchst du gerade?',
    empty: 'Hier sammelst du, was dir in einem ruhigen Moment gutgetan hat.',
  },
} as const;
