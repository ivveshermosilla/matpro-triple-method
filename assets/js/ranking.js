// MatPro v1.6.2 - session history
function saveResult() {
  const t = i18n[curLang];
  const name = $("player-name-input").value.trim() || t.anonymous;
  const tables = [...config.tables].sort((a, b) => a - b);
  const gameType = currentMode === "maxi" ? "maxi" : "practice";
  const rec = {
    id: `matpro-${Date.now()}`,
    createdAt: new Date().toISOString(),
    name,
    time: totalTimeSeconds,
    gradeCL: $("grade-cl").textContent,
    gradeUSA: $("grade-usa").textContent,
    stats: { c: score.c, w: score.w, s: score.s },
    tables: tables.join(","),
    mode: gameType === "maxi" ? "⭐" : "👑",
    gameType,
    diff: config.diffName,
    answerMode: config.answerMode,
    config: {
      tables,
      questions: pool.length || config.q,
      requestedQuestions: config.q,
      timer: config.t,
      difficulty: config.diffName,
      penalty: config.penalty,
      answerMode: config.answerMode
    },
    history: history.map(item => ({ ...item }))
  };
  const recs = [rec, ...getRecords()].slice(0, 10);
  saveRecords(recs);
  $("player-name-input").value = "";
  backHome();
}

function getRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
    if (Array.isArray(parsed)) return parsed.filter(Boolean).slice(0, 10);
    return parsed && typeof parsed === "object" ? [parsed] : [];
  } catch {
    return [];
  }
}

function saveRecords(records) {
  try {
    localStorage.setItem(DB_KEY, JSON.stringify(records));
  } catch {
    // localStorage can be unavailable in private or restricted browser contexts.
  }
}

function getRecordGameType(record) {
  if (record.gameType) return record.gameType;
  return record.diff === "Maxi" || record.mode === "⭐" ? "maxi" : "practice";
}

function parseRecordTables(record) {
  const tables = record.config?.tables || record.tables || [];
  if (Array.isArray(tables)) return tables.map(table => parseInt(table, 10)).filter(Boolean);
  return String(tables)
    .split(",")
    .map(table => parseInt(table.trim(), 10))
    .filter(Boolean);
}

function getRecordTotalQuestions(record) {
  const stats = record.stats || {};
  return record.config?.questions || (stats.c || 0) + (stats.w || 0) + (stats.s || 0) || "-";
}

function getRecordDifficulty(record, t) {
  const difficulty = record.config?.difficulty || record.diff || "Manual";
  return t.diffs[difficulty] || difficulty;
}

function getRecordTimer(record, t) {
  const timer = record.config?.timer;
  if (typeof timer === "number") return timer === 0 ? t.noTimer : `${timer}s`;
  return "-";
}

function getRecordModeLabel(record, t) {
  return getRecordGameType(record) === "maxi" ? t.modeMaxi : t.modePractice;
}

function formatRecordDate(record) {
  if (!record.createdAt) return "";
  const date = new Date(record.createdAt);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleString(curLang === "es" ? "es-US" : "en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatRecordConfig(record, t) {
  const gameType = getRecordGameType(record);
  if (gameType === "maxi") {
    return `${t.rankingQuestions}: ${getRecordTotalQuestions(record)} · ${t.rankingTables}: ${t.rankingAllTables}`;
  }

  const tables = parseRecordTables(record).join(", ") || "-";
  return [
    `${t.rankingTables}: ${tables}`,
    `${t.rankingQuestions}: ${getRecordTotalQuestions(record)}`,
    `${t.rankingTimer}: ${getRecordTimer(record, t)}`,
    `${t.rankingDifficulty}: ${getRecordDifficulty(record, t)}`
  ].join(" · ");
}

function renderRanking() {
  const recs = getRecords();
  const t = i18n[curLang];
  $("ranking-body").innerHTML = recs.length ? recs.map((record, index) => {
    const stats = record.stats || { c: 0, w: 0, s: 0 };
    const modeName = getRecordModeLabel(record, t);
    const configText = formatRecordConfig(record, t);
    const savedAt = formatRecordDate(record);
    const time = safeText(record.time || 0);
    return `
      <button class="rank-item" type="button" data-rank-index="${index}">
        <span class="rank-place">#${index + 1}</span>
        <span class="rank-name">
          <strong>${safeText(record.name || t.anonymous)}</strong>
          <span class="rank-meta">${safeText(modeName)} · ${time}s · ${safeText(t.rankingScore)} ${safeText(stats.c)}/${safeText(stats.w)}/${safeText(stats.s)}${savedAt ? ` · ${safeText(savedAt)}` : ""}</span>
          <span class="rank-config">${safeText(configText)}</span>
        </span>
        <span class="grade">${safeText(record.gradeCL || "-")}<small>${safeText(record.gradeUSA || "")}</small></span>
      </button>
    `;
  }).join("") : `<div class="empty-state">${safeText(t.emptyRanking)}</div>`;
}

function renderRecordSummary(record, t) {
  const stats = record.stats || { c: 0, w: 0, s: 0 };
  const savedAt = formatRecordDate(record);
  return `
    <div class="review-item history-summary">
      <strong>${safeText(t.rankingDetailTitle)} · ${safeText(getRecordModeLabel(record, t))}</strong>
      <span>${safeText(record.name || t.anonymous)}${savedAt ? ` · ${safeText(savedAt)}` : ""}</span>
      <span>${safeText(t.rankingScore)} ${safeText(stats.c)}/${safeText(stats.w)}/${safeText(stats.s)} · ${safeText(t.resGrad)} ${safeText(record.gradeCL || "-")} / ${safeText(record.gradeUSA || "-")}</span>
      <span>${safeText(formatRecordConfig(record, t))}</span>
    </div>
  `;
}

function showHist(idx) {
  const recs = getRecords();
  const data = recs[idx];
  const t = i18n[curLang];
  if (!data || !data.history) return;
  const badOnes = data.history.filter(item => item.status !== "correct");
  const review = badOnes.length
    ? renderReviewItems(badOnes)
    : `<div class="review-item rev-correct">${safeText(t.noE)}</div>`;
  $("historical-scroll-window").innerHTML = `${renderRecordSummary(data, t)}<div class="section-label history-review-title">${safeText(t.rankingErrorDetail)}</div>${review}`;
  $("historical-review-area").classList.remove("hidden");
}

function resetRanking() {
  if (window.confirm(i18n[curLang].resetConfirm)) {
    localStorage.removeItem(DB_KEY);
    $("historical-review-area").classList.add("hidden");
    renderRanking();
  }
}
