// MatPro v1.6.1 - config
function cloneConfig(source) {
  return { ...source, tables: [...source.tables] };
}

function getMaxQuestions() {
  return Math.max(1, config.tables.length * 12);
}

function getPresetFromDiff(diffName) {
  return {
    "Fácil": "facil",
    "Medio": "medio",
    "Difícil": "dificil",
    "Experto": "experto"
  }[diffName] || "";
}

function formatTimeLabel(seconds) {
  return seconds === 0 ? i18n[curLang].noTimer : `${seconds}s`;
}

function normalizeConfig() {
  const uniqueTables = new Set(
    (Array.isArray(config.tables) ? config.tables : [])
      .map(table => parseInt(table, 10))
      .filter(table => table >= 1 && table <= 12)
  );
  config.tables = Array.from(uniqueTables).sort((a, b) => a - b);
  config.q = Math.max(1, Math.min(parseInt(config.q, 10) || DEFAULT_CONFIG.q, getMaxQuestions()));
  config.t = Math.max(0, Math.min(parseInt(config.t, 10) || 0, 30));
  config.answerMode = "options";
}

function loadSavedConfig() {
  try {
    const saved = JSON.parse(localStorage.getItem(CONFIG_KEY) || "null");
    if (saved && typeof saved === "object") {
      config = {
        ...DEFAULT_CONFIG,
        ...saved,
        tables: Array.isArray(saved.tables) ? saved.tables : [...DEFAULT_CONFIG.tables]
      };
    }
  } catch {
    config = cloneConfig(DEFAULT_CONFIG);
  }
  normalizeConfig();
}

function saveConfig() {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify({
      q: config.q,
      t: config.t,
      tables: config.tables,
      penalty: config.penalty,
      diffName: config.diffName,
      answerMode: "options"
    }));
  } catch {
    // localStorage can be unavailable in private or restricted browser contexts.
  }
}

function initTablesGrid() {
  const grid = $("tables-grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const button = document.createElement("button");
    const active = config.tables.includes(i);
    button.type = "button";
    button.className = `table-chip ${active ? "active" : ""}`;
    button.textContent = i;
    button.dataset.table = i;
    button.setAttribute("aria-pressed", active ? "true" : "false");
    grid.appendChild(button);
  }
}

function toggleTable(table) {
  config.diffName = "Manual";
  config.penalty = false;
  $("expert-alert").classList.add("hidden");
  if (config.tables.includes(table)) {
    config.tables = config.tables.filter(item => item !== table);
  } else {
    config.tables.push(table);
  }
  normalizeConfig();
  updatePresetButtons();
  syncTableButtons();
  updateConfigStats();
}

function selectAllTables() {
  config.tables = [...ALL_TABLES];
  config.diffName = "Manual";
  config.penalty = false;
  $("expert-alert").classList.add("hidden");
  normalizeConfig();
  updatePresetButtons();
  syncTableButtons();
  updateConfigStats();
}

function clearTables() {
  config.tables = [];
  config.diffName = "Manual";
  config.penalty = false;
  $("expert-alert").classList.add("hidden");
  normalizeConfig();
  updatePresetButtons();
  syncTableButtons();
  updateConfigStats();
}

function syncTableButtons() {
  $$("[data-table]").forEach(button => {
    const table = parseInt(button.dataset.table, 10);
    const active = config.tables.includes(table);
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", active ? "true" : "false");
  });
}

function updateVal(type, val, manual) {
  if (type === "q") {
    config.q = Math.max(1, Math.min(parseInt(val, 10) || 1, getMaxQuestions()));
  } else if (type === "t") {
    config.t = Math.max(0, Math.min(parseInt(val, 10) || 0, 30));
  }
  if (manual) {
    config.diffName = "Manual";
    config.penalty = false;
    $("expert-alert").classList.add("hidden");
    updatePresetButtons();
  }
  updateConfigStats();
}

function updateConfigStats() {
  normalizeConfig();
  const availableQuestions = config.tables.length * 12;
  const maxQuestions = getMaxQuestions();
  const rangeQ = $("range-q");
  const rangeT = $("range-t");
  setText("val-q", config.q);
  setText("val-t", formatTimeLabel(config.t));
  setText("txt-question-limit", i18n[curLang].questionLimit.replace("{max}", availableQuestions));
  setText("txt-preview-subtitle", `${i18n[curLang].gameQ} 1 / ${config.q}`);
  rangeQ.max = maxQuestions;
  rangeQ.value = config.q;
  rangeT.value = config.t;
  saveConfig();
  updateStartState();
}

function updateStartState() {
  const disabled = config.tables.length === 0;
  const startButton = $("txt-btn-start");
  if (startButton) {
    startButton.disabled = disabled;
    startButton.setAttribute("aria-disabled", disabled ? "true" : "false");
  }
  const warning = $("tables-warning");
  if (warning) warning.classList.toggle("hidden", !disabled);
}

function applyPreset(preset) {
  config.penalty = false;
  $("expert-alert").classList.add("hidden");
  if (preset === "facil") {
    config.q = 20;
    config.t = 15;
    config.diffName = "Fácil";
  } else if (preset === "medio") {
    config.q = 20;
    config.t = 12;
    config.diffName = "Medio";
  } else if (preset === "dificil") {
    config.q = 20;
    config.t = 10;
    config.diffName = "Difícil";
  } else if (preset === "experto") {
    config.q = 20;
    config.t = 7;
    config.penalty = true;
    config.diffName = "Experto";
    $("expert-alert").classList.remove("hidden");
  }
  normalizeConfig();
  updatePresetButtons(preset);
  updateConfigStats();
}

function updatePresetButtons(activePreset = getPresetFromDiff(config.diffName)) {
  $$("[data-preset]").forEach(button => {
    button.classList.toggle("active", button.dataset.preset === activePreset);
  });
}

function updateModeLabels() {
  const t = i18n[curLang];
  config.answerMode = "options";
  setText("txt-game-mode", t.optionsMode);
}

function showConfig() {
  if (currentMode === "maxi" && customConfigSnapshot) {
    config = cloneConfig(customConfigSnapshot);
    customConfigSnapshot = null;
  }
  currentMode = "custom";
  config.answerMode = "options";
  normalizeConfig();
  syncTableButtons();
  updateConfigStats();
  updatePresetButtons();
  updateModeLabels();
  showScreen("config-screen");
}

function startMaxi() {
  if (currentMode !== "maxi") {
    customConfigSnapshot = cloneConfig(config);
  }
  currentMode = "maxi";
  config = {
    q: 144,
    t: 10,
    tables: [...ALL_TABLES],
    penalty: false,
    diffName: "Maxi",
    answerMode: "options"
  };
  initGame();
}
