// MatPro v1.6.0 - navigation
function showScreen(id) {
  screenIds.forEach(screenId => $(screenId).classList.add("hidden"));
  $(id).classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setInitialLang(lang) {
  setLanguage(lang);
  showScreen("mode-screen");
}

function setLanguage(lang) {
  curLang = lang;
  updateTexts();
  renderRanking();
  if (!$("historical-review-area").classList.contains("hidden")) {
    $("historical-review-area").classList.add("hidden");
  }
}

function updateTexts() {
  const t = i18n[curLang];
  document.documentElement.lang = curLang;
  setText("txt-nav-subtitle", t.navSubtitle);
  updateLanguageSwitch();
  setText("txt-lang-eyebrow", t.langEyebrow);
  setText("txt-lang-title", t.langTitle);
  setText("txt-lang-subtitle", t.langSubtitle);
  setText("txt-lang-es", t.langEs);
  setText("txt-lang-en", t.langEn);
  $("txt-title").innerHTML = `<span class="gradient-text">${safeText(t.title.split(" ")[0])}</span> ${safeText(t.title.split(" ").slice(1).join(" "))}`;
  setText("txt-home-eyebrow", t.homeEyebrow);
  setText("txt-home-copy", t.homeCopy);
  setText("txt-btn-practice", t.practice);
  setText("txt-btn-maxi", t.maxi);
  setText("txt-stat-questions-label", t.statQuestions);
  setText("txt-stat-time-label", t.statTime);
  setText("txt-stat-method-label", t.statMethod);
  setText("txt-method-title", t.methodTitle);
  setText("txt-method-copy", t.methodCopy);
  setText("txt-quick-title", t.quickTitle);
  setText("txt-quick-subtitle", t.quickSubtitle);
  setText("txt-quick-chip", t.quickChip);
  setText("txt-quick-label", t.quickLabel);
  setPlaceholder("quick-answer-input", t.quickPh);
  setText("txt-quick-check", t.quickCheck);
  setText("txt-quick-next", t.quickNext);
  setText("txt-ranking-title", t.ranking);
  setText("txt-ranking-hint", t.rankingHint);
  setText("txt-ranking-pill", t.scoreboard);
  setText("txt-reset-ranking", t.reset);
  setText("txt-review-label", t.rev);
  setText("txt-config-title", t.config);
  setText("txt-config-copy", t.configCopy);
  setText("txt-config-pill", t.setup);
  setText("txt-label-difficulty", t.difficulty);
  setText("txt-diff-1", t.easy);
  setText("txt-diff-2", t.med);
  setText("txt-diff-3", t.hard);
  setText("txt-diff-4", t.exp);
  setText("txt-label-answer-mode", t.answerMode);
  setText("txt-smart-practice-title", t.smartPracticeTitle);
  setText("txt-smart-practice-copy", t.smartPracticeCopy);
  setText("txt-expert-alert", t.expAlert);
  setText("txt-label-q", t.lQ);
  setText("txt-label-t", t.lT);
  setText("txt-label-tables", t.lTabs);
  setText("txt-select-all-tables", t.selectAll);
  setText("txt-clear-tables", t.clearTables);
  setText("tables-warning", t.tablesWarning);
  setText("txt-btn-start", t.start);
  setText("txt-btn-back", t.back);
  setText("txt-preview-label", t.previewLabel);
  setText("txt-preview-title", t.previewTitle);
  setText("txt-preview-subtitle", t.previewSubtitle);
  setText("txt-quit-confirm", t.qConf);
  setText("txt-quit-timer", t.qTimer);
  setText("txt-btn-keep", t.keep);
  setText("txt-btn-confirm-quit", t.confQ);
  setText("txt-btn-quit", t.quit);
  setText("txt-game-q", t.gameQ);
  setText("txt-timer-label", t.timer);
  setText("txt-res-title", t.resT);
  setText("txt-res-save-hint", t.resSaveHint);
  setText("txt-res-ring-label", t.resRing);
  setText("txt-res-time", t.resTime);
  setText("txt-res-grade", t.resGrad);
  setText("txt-res-note", t.resNote);
  setText("txt-res-correct", t.resC);
  setText("txt-res-wrong", t.resW);
  setText("txt-res-skipped", t.resS);
  setText("txt-res-review", t.resRev);
  setPlaceholder("player-name-input", t.namePh);
  setText("txt-btn-save", t.save);
  setText("txt-btn-exit", t.exit);
  setText("txt-footer-github", t.footerGithub);
  setText("txt-footer-division", t.footerDivision);
  updateConfigStats();
  updateModeLabels();
  updateStartState();
  renderQuickPracticeFeedback();
}

function updateLanguageSwitch() {
  const switcher = $("lang-toggle-btn");
  if (!switcher) return;
  switcher.setAttribute("aria-label", curLang === "es" ? "Cambiar idioma" : "Change language");
  $("lang-en-btn").classList.toggle("active", curLang === "en");
  $("lang-es-btn").classList.toggle("active", curLang === "es");
  $("lang-en-btn").setAttribute("aria-pressed", curLang === "en" ? "true" : "false");
  $("lang-es-btn").setAttribute("aria-pressed", curLang === "es" ? "true" : "false");
}

function backHome() {
  clearInterval(timer);
  clearInterval(cancelInterval);
  isPaused = false;
  $("cancel-confirm").classList.add("hidden");
  renderRanking();
  showScreen("mode-screen");
}
