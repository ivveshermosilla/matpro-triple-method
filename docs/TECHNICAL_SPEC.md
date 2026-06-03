# MatPro Technical Specification

## Overview

MatPro v1.6.0 is a vanilla HTML/CSS/JavaScript web app published through GitHub Pages. The app helps students practice multiplication tables with a bilingual ES/EN interface, a quick active-practice warmup, timed smart practice, local ranking, and focused error review.

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
| `assets/js/config.js` | Difficulty presets, sliders, table selector, select-all/deselect-all behavior, start-button validation, and Maxitablas setup. |
| `assets/js/quick-practice.js` | Untimed active-practice warmup with a random multiplication, typed answer, and bilingual feedback. |
| `assets/js/game.js` | Timed smart practice: question pool, smart distractors, timer, scoring, pause/quit flow, final grades, and error review rendering. |
| `assets/js/ranking.js` | Top 10 local scoreboard, saved-record sorting, historical review, and reset behavior. |
| `assets/js/events.js` | Centralized DOM event wiring for clicks, sliders, keyboard Enter, table chips, answer options, and ranking history. |
| `assets/js/app.js` | Boot sequence. Initializes events, table chips, quick practice, text rendering, presets, and mode labels. |
| `docs/TECHNICAL_SPEC.md` | This technical reference for maintenance and future upgrades. |
| `README.md` | Human story, project intent, live link, and high-level feature summary. |
| `changelog.md` | Historical version log. |
| `Versions/` | Archived historical HTML builds. |

## Screens

- `init-lang-screen`: first-use language choice with the same EN/ES switch style used across the site.
- `mode-screen`: home dashboard with hero copy, active-practice warmup, ranking, GitHub link, and DivisionPro placeholder.
- `config-screen`: practice configuration with difficulty presets, smart-practice explanation, question/time sliders, and table selection.
- `game-screen`: timed smart practice with four option buttons, visual timer, live score, live review strip, and quit confirmation.
- `result-screen`: final grade, USA letter grade, Chilean numeric grade, stats, error review, and save controls.

## Practice Modes

- Active Practice: untimed written recall on the home screen. It asks a random multiplication from 1x1 through 12x12 on load and when "Another multiplication" is pressed.
- Smart Practice: timed game with four answer options. Distractors are generated from adjacent table values, plus/minus one errors, and reversed-digit patterns when possible.
- Custom Practice: user chooses number of questions, seconds per question, and active tables.
- Maxitablas Pro: automatic 144-question session covering all 12 tables.
- Expert preset: deducts one effective correct answer for every two wrong answers.

## Table Selection Rules

- Tables 1 through 12 can be toggled individually.
- "Select all" activates all tables.
- "Deselect all" clears every table.
- The start button is disabled while no table is selected, and a bilingual warning is shown.

## Scoring

- Chilean grade: `(effectiveCorrect / totalQuestions) * 6 + 1`, displayed with one decimal.
- USA grade: A+ through F, including plus/minus ranges.
- Result stats track correct, wrong, and skipped answers.
- Error review shows only wrong or skipped questions. Perfect rounds show a positive empty-review message.

## Persistence

Records are stored locally on the current device only.

Storage key: `tablas_pro_universal_records`

Saved record shape:

```js
{
  name: "Player",
  time: 42,
  gradeCL: "6.4",
  gradeUSA: "A-",
  stats: { c: 18, w: 1, s: 1 },
  tables: "1,2,3,4,5",
  mode: "👑",
  diff: "Manual",
  answerMode: "options",
  history: [
    { q: "7×8", ans: 56, user: 54, status: "wrong" }
  ]
}
```

## Internationalization

- The active language is held in `curLang`.
- All visible copy lives in `assets/js/i18n.js`.
- `updateTexts()` in `assets/js/navigation.js` applies translations to the DOM.
- The language switch updates labels, placeholders, ranking messages, review messages, ARIA text, and saved-record display labels.

## Responsive And Accessibility Notes

- Layout is responsive for desktop, iPad/tablets, iPhone, and Android phones.
- Major breakpoints are handled in `assets/css/styles.css` with mobile layouts at `max-width: 960px` and `max-width: 680px`.
- Buttons use touch-friendly sizes and `type="button"` to avoid accidental form behavior.
- Table chips and language buttons use `aria-pressed`.
- Quick-practice feedback uses `aria-live="polite"`.
- Numeric inputs use `inputmode="numeric"` for mobile keyboards.
- Focus states are visible for keyboard navigation.

## Maintenance Rules

- Keep structure in `index.html`, presentation in `assets/css/styles.css`, and behavior in the JavaScript family files.
- Add new visible text in both `es` and `en` dictionaries before referencing it in UI code.
- Prefer delegated events in `assets/js/events.js` for generated elements.
- Preserve the `Versions/` archive when replacing the official root build.
- Test both the local file and the GitHub Pages URL after publishing.
