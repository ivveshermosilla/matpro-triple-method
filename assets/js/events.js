// MatPro v1.6.0 - events
function initEventHandlers() {
  $("lang-en-btn").addEventListener("click", () => setLanguage("en"));
  $("lang-es-btn").addEventListener("click", () => setLanguage("es"));
  $("txt-lang-es").addEventListener("click", () => setInitialLang("es"));
  $("txt-lang-en").addEventListener("click", () => setInitialLang("en"));

  $("txt-btn-practice").addEventListener("click", showConfig);
  $("txt-btn-maxi").addEventListener("click", startMaxi);
  $("txt-quick-check").addEventListener("click", checkQuickPractice);
  $("txt-quick-next").addEventListener("click", nextQuickPractice);
  $("quick-answer-input").addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkQuickPractice();
  });
  $("txt-reset-ranking").addEventListener("click", resetRanking);

  $$("[data-preset]").forEach(button => {
    button.addEventListener("click", () => applyPreset(button.dataset.preset));
  });

  $("range-q").addEventListener("input", event => updateVal("q", event.target.value, true));
  $("range-t").addEventListener("input", event => updateVal("t", event.target.value, true));

  $("txt-select-all-tables").addEventListener("click", selectAllTables);
  $("txt-clear-tables").addEventListener("click", clearTables);
  $("txt-btn-start").addEventListener("click", initGame);
  $("txt-btn-back").addEventListener("click", backHome);

  $("txt-btn-quit").addEventListener("click", triggerCancel);
  $("txt-btn-keep").addEventListener("click", abortCancel);
  $("txt-btn-confirm-quit").addEventListener("click", confirmQuit);
  $("txt-btn-save").addEventListener("click", saveResult);
  $("txt-btn-exit").addEventListener("click", backHome);

  $("tables-grid").addEventListener("click", event => {
    const button = event.target.closest("[data-table]");
    if (!button) return;
    toggleTable(parseInt(button.dataset.table, 10));
  });

  $("options-container").addEventListener("click", event => {
    const button = event.target.closest("[data-answer]");
    if (!button) return;
    handleSelect(parseInt(button.dataset.answer, 10));
  });

  $("ranking-body").addEventListener("click", event => {
    const button = event.target.closest("[data-rank-index]");
    if (!button) return;
    showHist(parseInt(button.dataset.rankIndex, 10));
  });
}
