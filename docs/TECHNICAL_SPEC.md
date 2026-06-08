# MatPro Technical Specification

## Overview

MatPro v1.6.3 is a vanilla HTML/CSS/JavaScript web app published through GitHub Pages. The app helps students practice multiplication tables with a bilingual ES/EN interface, active recall warmup, configurable smart practice, tutor guidance, local session history, and focused error review.

Official URL: <https://ivveshermosilla.github.io/matpro-triple-method/>

## Deployment

- GitHub Pages entrypoint: `index.html` at the repository root.
- Runtime dependencies: none. The site runs with browser-native HTML, CSS, JavaScript, `localStorage`, and standard DOM APIs.
- Asset loading order: `index.html` loads `assets/css/styles.css`, then each JavaScript family file in dependency order.
- Legacy backup: `Versions/Matpro V1.5.0 Official Legacy.html` preserves the previous single-file official build.

## File Map

| File | Purpose |
| --- | --- |
| `index.html` | Semantic page structure, screen containers, controls, result areas, footer links, and script/style references. No inline event handlers or inline styles. |
| `assets/css/styles.css` | Full visual system: tokens, layout, responsive behavior, buttons, language switch, panels, ranking, configuration, game, results, and mobile breakpoints. |
| `assets/js/state.js` | Shared state, constants, DOM helpers, text escaping, and persistence key. |
| `assets/js/i18n.js` | Spanish and English dictionaries for every visible UI string. |
| `assets/js/navigation.js` | Screen switching, initial language selection, live language updates, and translated UI rendering. |
| `assets/js/config.js` | Difficulty presets, sliders, table selector, select-all/deselect-all behavior, question limit validation, saved configuration, no-timer mode, and Maxitablas setup. |
| `assets/js/game.js` | Smart practice: unique question pool, smart distractors, optional timer, scoring, pause/quit flow, final grades, and error review rendering. |
| `assets/js/ranking.js` | Local history for the 10 most recent saved sessions, per-session configuration snapshots, historical review, and reset behavior. |
| `assets/js/quick-practice.js` | Active practice warmup with a random multiplication, typed answer, and bilingual feedback. |
| `assets/js/events.js` | Centralized DOM event wiring for clicks, sliders, table chips, answer options, ranking history, and modals. |
| `assets/js/app.js` | Boot sequence. Initializes events, saved config, table chips, text rendering, presets, and mode labels. |
| `assets/printables/matpro-grid-es.html` | Spanish printable source for the Triple Method blank 12x12 grid sheet. |
| `assets/printables/matpro-grid-es.pdf` | Spanish one-page letter landscape printable grid. |
| `assets/printables/matpro-grid-en.html` | English printable source for the Triple Method blank 12x12 grid sheet. |
| `assets/printables/matpro-grid-en.pdf` | English one-page letter landscape printable grid. |
| `docs/TECHNICAL_SPEC.md` | This technical reference for maintenance and future upgrades. |
| `README.md` | Human story, project intent, live link, and high-level feature summary. |
| `changelog.md` | Historical version log. |
| `Versions/` | Archived historical HTML builds. |

## Screens

- `init-lang-screen`: first-use language choice with the same EN/ES switch style used across the site.
- `mode-screen`: player-focused home dashboard with hero copy, practice buttons, active practice warmup, recent-session history, GitHub link, live DivisionPro cross-link (appends `?lang=` dynamically), and about-project action.
- `config-screen`: practice configuration with difficulty presets, smart-practice explanation, question/time sliders, and table selection.
- `game-screen`: smart practice with four option buttons, optional visual timer, live score, live review strip, and quit confirmation.
- `result-screen`: final grade, USA letter grade, Chilean numeric grade, stats, error review, and save controls.
- `tutor-guide-modal`: global tutor guide with Triple Method principles, how to play, downloadable language-specific grid, and full methodology link.
- `about-modal`: global project context based on the README story and dedication.

## Practice Modes

- Practice Tables: user chooses active tables, difficulty, number of questions, and seconds per question. Setting time to `0` creates an untimed round.
- Active Practice: home warmup that asks one random 1x1 through 12x12 multiplication, accepts a typed answer, and gives immediate feedback without affecting saved history.
- Smart Practice: game with four answer options. Distractors are generated from adjacent table values, plus/minus one errors, and reversed-digit patterns when possible.
- Maxitablas Pro: automatic 144-question session covering every multiplication from 1x1 through 12x12.
- Expert preset: deducts one effective correct answer for every two wrong answers.

## Table Selection Rules

- Tables 1 through 12 can be toggled individually.
- "Select all" activates all tables.
- "Deselect all" clears every table.
- The question slider max is always `selectedTables * 12`, so rounds cannot ask more questions than the selected unique combinations.
- The start button is disabled while no table is selected, and a bilingual warning is shown.

## Scoring

- Chilean grade: `(effectiveCorrect / totalQuestions) * 6 + 1`, displayed with one decimal.
- USA grade: A+ through F, including plus/minus ranges.
- Result stats track correct, wrong, and skipped answers.
- Error review shows only wrong or skipped questions. Perfect rounds show a positive empty-review message.

## Persistence

Records and the player's last practice configuration are stored locally on the current device only.

Scoreboard key: `tablas_pro_universal_records`

Configuration key: `matpro_player_config_v1`

The scoreboard stores the 10 most recent saved sessions, not a global ranking. Each saved session includes its game type, timestamp, score, selected practice settings, and complete answer history for later error review.

Saved record shape:

```js
{
  id: "matpro-1760000000000",
  createdAt: "2026-06-03T13:00:00.000Z",
  name: "Player",
  time: 42,
  gradeCL: "6.4",
  gradeUSA: "A-",
  stats: { c: 18, w: 1, s: 1 },
  tables: "1,2,3,4,5",
  mode: "👑",
  gameType: "practice",
  diff: "Manual",
  answerMode: "options",
  config: {
    tables: [1, 2, 3, 4, 5],
    questions: 20,
    requestedQuestions: 20,
    timer: 0,
    difficulty: "Manual",
    penalty: false,
    answerMode: "options"
  },
  history: [
    { q: "7×8", ans: 56, user: 54, status: "wrong" }
  ]
}
```

## Internationalization

- The active language is held in `curLang`.
- All visible copy lives in `assets/js/i18n.js`.
- `updateTexts()` in `assets/js/navigation.js` applies translations to the DOM.
- The language switch updates labels, placeholders, ranking messages, review messages, ARIA text, saved-record display labels, and the tutor grid download target.

## Cross-App Language Bridge

MatPro and DivisionPro share a language preference so players stay in the same language across both apps.

- On load, `assets/js/app.js` reads the `?lang=es` or `?lang=en` URL parameter first. If present, it sets `curLang` and writes it to localStorage.
- If no URL parameter is present, the app reads the `ivves_preferred_lang` localStorage key as a fallback.
- Every time the player toggles the language, `assets/js/navigation.js` writes the new value to `ivves_preferred_lang`.
- `updateTexts()` in `assets/js/navigation.js` rebuilds the footer DivisionPro link as `https://ivveshermosilla.github.io/DivisionPro/?lang=<curLang>` on every language update, so the cross-app link always carries the active language.
- DivisionPro uses the same `ivves_preferred_lang` key and the same `?lang=` parameter convention, making the bridge bidirectional.

## Responsive And Accessibility Notes

- Layout is responsive for desktop, iPad/tablets, iPhone, and Android phones.
- Major breakpoints are handled in `assets/css/styles.css` with mobile layouts at `max-width: 960px` and `max-width: 680px`.
- Buttons use touch-friendly sizes and `type="button"` to avoid accidental form behavior.
- Table chips and language buttons use `aria-pressed`.
- Focus states are visible for keyboard navigation.

## Maintenance Rules

- Keep structure in `index.html`, presentation in `assets/css/styles.css`, and behavior in the JavaScript family files.
- Add new visible text in both `es` and `en` dictionaries before referencing it in UI code.
- Prefer delegated events in `assets/js/events.js` for generated elements.
- Preserve the `Versions/` archive when replacing the official root build.
- Test both the local file and the GitHub Pages URL after publishing.
