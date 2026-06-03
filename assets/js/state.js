// MatPro v1.6.0 - state
const DB_KEY = "tablas_pro_universal_records";
const screenIds = ["init-lang-screen", "mode-screen", "config-screen", "game-screen", "result-screen"];
let curLang = "es";
let config = { q: 20, t: 15, tables: [1,2,3,4,5,6,7,8,9,10,11,12], penalty: false, diffName: "Manual", answerMode: "options" };
let pool = [];
let currentIdx = 0;
let score = { c: 0, w: 0, s: 0 };
let history = [];
let timer;
let timeLeft = 0;
let currentMode = "custom";
let cancelInterval;
let isPaused = false;
let startTime = 0;
let totalTimeSeconds = 0;
let quickPractice = { a: 7, b: 8, feedback: "", user: null };

const $ = (id) => document.getElementById(id);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

function safeText(value) {
  const span = document.createElement("span");
  span.textContent = value == null ? "" : String(value);
  return span.innerHTML;
}

function setText(id, value) {
  const el = $(id);
  if (el) el.textContent = value;
}

function setPlaceholder(id, value) {
  const el = $(id);
  if (el) el.placeholder = value;
}
