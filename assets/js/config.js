// MatPro v1.6.0 - config
function initTablesGrid() {
  const grid = $("tables-grid");
  grid.innerHTML = "";
  for (let i = 1; i <= 12; i++) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "table-chip active";
    button.textContent = i;
    button.dataset.table = i;
    button.setAttribute("aria-pressed", "true");
    grid.appendChild(button);
  }
}

function toggleTable(table) {
  config.diffName = "Manual";
  updatePresetButtons();
  if (config.tables.includes(table)) {
    config.tables = config.tables.filter(item => item !== table);
  } else {
    config.tables.push(table);
    config.tables.sort((a, b) => a - b);
  }
  syncTableButtons();
  updateConfigStats();
}

function selectAllTables() {
  config.tables = [1,2,3,4,5,6,7,8,9,10,11,12];
  config.diffName = "Manual";
  updatePresetButtons();
  syncTableButtons();
  updateConfigStats();
}

function clearTables() {
  config.tables = [];
  config.diffName = "Manual";
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
  config[type] = parseInt(val, 10);
  setText(`val-${type}`, val);
  $(`range-${type}`).value = val;
  if (manual) {
    config.diffName = "Manual";
    config.penalty = false;
    $("expert-alert").classList.add("hidden");
    updatePresetButtons();
  }
  updateConfigStats();
}

function updateConfigStats() {
  setText("stat-q", config.q);
  setText("stat-t", `${config.t}s`);
  setText("val-q", config.q);
  setText("val-t", config.t);
  $("range-q").value = config.q;
  $("range-t").value = config.t;
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
    updateVal("q", 20, false);
    updateVal("t", 15, false);
    config.diffName = "Fácil";
  } else if (preset === "medio") {
    updateVal("q", 20, false);
    updateVal("t", 12, false);
    config.diffName = "Medio";
  } else if (preset === "dificil") {
    updateVal("q", 20, false);
    updateVal("t", 10, false);
    config.diffName = "Difícil";
  } else if (preset === "experto") {
    updateVal("q", 20, false);
    updateVal("t", 7, false);
    config.penalty = true;
    config.diffName = "Experto";
    $("expert-alert").classList.remove("hidden");
  }
  updatePresetButtons(preset);
}

function updatePresetButtons(activePreset) {
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
  currentMode = "custom";
  config.answerMode = "options";
  syncTableButtons();
  updateConfigStats();
  updateModeLabels();
  showScreen("config-screen");
}

function startMaxi() {
  currentMode = "maxi";
  config = {
    q: 144,
    t: 10,
    tables: [1,2,3,4,5,6,7,8,9,10,11,12],
    penalty: false,
    diffName: "Maxi",
    answerMode: "options"
  };
  initGame();
}
