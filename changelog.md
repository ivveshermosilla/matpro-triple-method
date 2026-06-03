Matpro Changelog
v1.0.0: Initial prototype release. Features a basic multiplication quiz with 15 questions covering tables 1, 2, 3, 5, and 10, utilizing a 30-second text-based timer per question.

v1.0.1: Increased overall difficulty by reducing the timer to 10 seconds per question and adding a visual timer bar. Replaced the 1 times table with the 4 times table and improved the algorithm for generating challenging incorrect options.

v1.0.2 - v1.0.3: Upgraded the game to a 20-question challenge. Implemented the Chilean grading system (1.0 to 7.0 scale) with a 60% passing threshold and added visual achievement icons to the results screen.

v1.0.4: Added total game time tracking. Updated the question generation logic to guarantee 20 completely unique questions per session without any repetition.

v1.0.5: Introduced the Top 10 Leaderboard. Added local storage functionality to save, sort, and display the highest scores based first on grades and then on completion time.

v1.0.6: Added an Error Review feature allowing players to see their correct, incorrect, and skipped answers at the end of a match. Enabled a feature where clicking past records on the leaderboard displays the specific answer history for that game.

v1.0.7: Improved database stability and added a button allowing users to clear all saved historical records.

v1.0.8 - v1.0.9: General UI/UX improvements. Added clear game instructions to the start screen and standardized the color palette using CSS variables for a more cohesive design.

v1.1.0: Introduced player name registration for the scoreboard via a browser prompt. Updated the question pool to include the 6 times table and factors up to 12, while limiting the 10 times table to a maximum of 3 questions.

v1.1.1: Improved UX by replacing the native browser prompt with an integrated, styled UI container for name entry at the end of the game.

v1.1.2: Implemented a strict "no reciprocals" rule, ensuring that if "A x B" is asked, "B x A" will not appear in the same session. Shifted the focus to harder tables (3, 4, and 6) while strictly limiting tables 2, 5, and 10.

v1.1.3 - v1.1.4: Refined the distractor generation logic to offer more challenging incorrect options, such as adjacent values and factors from the same table. Updated UI instructions to clarify the 4.0 passing grade based on the 60% Chilean scale.

v1.1.5: Expanded the question pool by adding the 11 times table to the hard category. Improved the leaderboard UI to smoothly handle long player names using text truncation.

v1.1.6: Major structural overhaul introducing a Difficulty Selection Menu with four tiers: Fácil, Medio, Difícil, and Experto. Each difficulty features unique configurations, timers (ranging from 15s to 8s), and dedicated local storage scoreboards. Introduced a strict penalty system in "Experto" mode that subtracts one correct answer for every two mistakes.

v1.1.7: Added a fifth endurance difficulty mode called "MAXITABLAS PRO". This mode challenges players with 144 questions, covering all combinations from 1x1 to 12x12. Added hover animations to buttons for better interactive feedback.

v1.1.8 - v1.1.9: Enhanced the review system, allowing players to click on historical records in the preparation screen to view detailed past mistakes. Upgraded the review UI with color-coded borders (green, red, gray) to quickly distinguish correct, incorrect, and skipped answers.

v1.2.0 - v1.2.1: UI and UX refinements. Introduced scrollable sub-windows (scroll-subwindow) to cleanly display extensive review histories without breaking the layout.

v1.2.2: Enhanced the scoring system to explicitly track and display "Skipped" (⚪) answers on the results screen. Updated the penalty logic in "Experto" mode so that skipped answers are now also penalized alongside incorrect ones.

v1.2.3: Major structural overhaul replacing static difficulties with a fully interactive "Custom Configuration" menu. Players can now manually select specific multiplication tables via a grid, set custom timers (1s - 30s), define the total number of questions (1 - 100), and toggle the penalty rule. Updated the final grade calculation to accurately reflect the standard Chilean formula (score / total) * 6 + 1.

v1.2.4 - v1.2.5: Revamped the Global Ranking system to accommodate custom games. The leaderboard now saves and dynamically displays the specific tables practiced, the amount of questions, and assigns a difficulty tag (Fácil, Medio, Difícil, Experto, Custom, or Maxi) based on the chosen parameters.

v1.2.6: Expanded the review system integration into the Global Ranking. Clicking any top record on the main screen now opens a historical review window showing the exact sequence of questions, answers, and mistakes made in that specific match.

v1.2.7: Experimental implementation of a sound engine using the Web Audio API (audioCtx). Added distinct audio feedback for correct answers, wrong/skipped answers, and UI button clicks.

v1.2.8: Released the "Silent Edition", cleanly reverting the Web Audio API implementation and removing sound effects to improve performance or user preference.

v1.2.9: Quality of Life (QoL) update. Added a "Cancel Game" button mid-match and a "Clear All Records" utility for the leaderboard. Improved the question generation algorithm to smoothly handle custom setups where the requested number of questions exceeds the possible unique combinations, allowing intelligent repetition while preventing immediate back-to-back identical questions.

v1.3.0: Introduced a refined UI with modern button hover animations and a dedicated game cancellation overlay (cancel-overlay) featuring a 5-second abort countdown.

v1.3.1: Integrated an immediate historical review window (scroll-subwindow) directly into the final results screen, allowing players to review their mistakes immediately before saving their score.

v1.3.2: Expanded the scoreboard and results UI to explicitly track and display skipped answers (⚪) alongside correct (✅) and incorrect (❌) ones.

v1.3.3: Re-implemented the "Expert Mode" penalty logic into the custom configuration, calculating the effective score based on correct, wrong, and skipped answers.

v1.3.4: Overhauled the Result Screen using a cleaner, card-based layout (.res-card) to display final statistics.

v1.3.5: Upgraded the Global Ranking table to record and display the specific game mode (👑 for Custom, ⭐ for Maxitablas) and the exact difficulty preset used (Fácil, Medio, Difícil, Experto, Manual, or Maxi) via dynamic UI badges.

v1.3.6 - v1.3.7: "Fair Penalty" update. Adjusted the penalty logic for "Experto" mode so that skipped answers (⚪) no longer penalize the final score; only direct errors (❌) trigger the penalty (-1 correct answer per 2 errors).

v1.3.8: Improved the game's pause mechanics. When the cancel overlay is triggered mid-game, the CSS visual timer bar now accurately pauses its exact width state instead of completely resetting.

v1.3.9: Implemented a Dual Grading System. To make the app more universal, the game and leaderboard now calculate and display both the standard Chilean numeric grade (1.0 - 7.0) and the corresponding US letter grade equivalent (A, B, C, D, F).

v1.4.0: Transition release consolidating the dual grading system and user interface refinements.

v1.4.1 - v1.4.2: Overhauled the distractor generation algorithm with a new generateSmartOptions function. Instead of generating purely random numbers for wrong options, the game now dynamically creates logical cognitive distractors, such as adjacent table values, ±1 errors, or reversed digits (e.g., 12 instead of 21) to significantly increase the challenge.

v1.4.3: Added Total Game Time tracking (⏱️) to the global ranking and final results screen. Optimized the post-game review window to filter and exclusively display mistakes and skipped questions, hiding correct answers to provide a cleaner and more focused learning review.

v1.4.4 - v1.4.6: Advanced Pause System Mechanics. Upgraded the "Abandon Game" overlay to function as a true pause menu. The CSS visual timer bar now captures its exact computed width percentage when paused (dataset.pausePct) and seamlessly resumes the animation from that exact visual state when the player returns to the game.

v1.4.7: Implemented a Persistent Universal Database update (tablas_pro_universal_records). Engineered an automatic data migration IIFE (Immediately Invoked Function Expression) that detects, rescues, and merges top scores from previous disparate version records into the new unified leaderboard format to prevent data loss.

v1.4.8: Fine-tuned the "Expert Mode" penalty calculation logic to reliably compute and deduct exactly 1 correct point for every 2 incorrect answers during the final grade resolution.

v1.4.9: Major Internationalization (i18n) update. Implemented a dynamic language dictionary and a startup language selection screen, allowing users to seamlessly toggle the entire application's UI, instructions, and leaderboard labels between Spanish and English.

v1.5.0 (Final Release): Complete Application Internationalization (i18n). Abstracted all hardcoded text into a centralized language dictionary architecture, fully translating all UI elements, dynamic alerts, and historical reviews into both Spanish and English. Implemented an initial language selection splash screen (init-lang-screen) and a persistent language toggle button (#lang-toggle-btn) for seamless live switching. Ensured that leaderboard difficulty tags and system dialogues completely adapt to the active language preference.

v1.6.0 (Modern Modular Release): Rebuilt the official GitHub Pages app with a modern responsive interface inspired by the updated mockup while preserving the original learning purpose and scoreboard model. Split the former single-file app into `index.html`, `assets/css/styles.css`, and JavaScript family files under `assets/js/` for state, i18n, navigation, configuration, active practice, game logic, ranking, events, and bootstrapping. Added the untimed Active Practice warmup, maintained Smart Practice as the timed four-option game mode, added select-all/deselect-all controls for tables, disabled start when no table is selected, refined USA grades with plus/minus ranges, and documented the system in `docs/TECHNICAL_SPEC.md`. Archived the previous official single-file build as `Versions/Matpro V1.5.0 Official Legacy.html`.

v1.6.1 (Tutor Guide and Printables): Moved the Triple Method methodology into a global tutor guide modal so the player home stays focused on practice. Added Spanish and English printable 12x12 grid PDFs, wired the guide download button to the active language, added an About This Project modal based on the README story and dedication, changed the GitHub footer link to the repository, removed the active-practice warmup as a separate mode, added a no-timer setting at 0 seconds, capped question count to selected tables x 12, and persisted the player's last practice configuration locally.
