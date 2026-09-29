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
    rueckblick: { title: 'Rückblick', meta: 'Tagebuch und Woche' },
  },

  vorsaetze: {
    segmentIntentions: 'Vorsätze',
    segmentTasks: 'Aufgaben',
    empty: 'Noch nichts hier. Ein Vorsatz beginnt mit einem Satz.',
    tasksEmpty: 'Nichts offen. Das darf auch mal so sein.',
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
