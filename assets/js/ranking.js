// MatPro v1.6.0 - ranking
function saveResult() {
  const t = i18n[curLang];
  const name = $("player-name-input").value.trim() || t.anonymous;
  const tables = [...config.tables].sort((a, b) => a - b).join(",");
  const rec = {
    name,
    time: totalTimeSeconds,
    gradeCL: $("grade-cl").textContent,
    gradeUSA: $("grade-usa").textContent,
    stats: { c: score.c, w: score.w, s: score.s },
    tables,
    mode: currentMode === "maxi" ? "⭐" : "👑",
    diff: config.diffName,
    answerMode: config.answerMode,
    history
  };
  const recs = getRecords();
  recs.push(rec);
  recs.sort((a, b) => parseFloat(b.gradeCL) - parseFloat(a.gradeCL) || a.time - b.time);
  recs.splice(10);
  localStorage.setItem(DB_KEY, JSON.stringify(recs));
  $("player-name-input").value = "";
  backHome();
}

function getRecords() {
  try {
    const parsed = JSON.parse(localStorage.getItem(DB_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function renderRanking() {
  const recs = getRecords();
  const t = i18n[curLang];
  $("ranking-body").innerHTML = recs.length ? recs.map((record, index) => {
    const stats = record.stats || { c: 0, w: 0, s: 0 };
    const diff = t.diffs[record.diff] || record.diff || "Manual";
    const modeName = t.modes[record.answerMode || "options"] || "";
    const tables = safeText(record.tables || "-");
    const time = safeText(record.time || 0);
    return `
      <button class="rank-item" type="button" data-rank-index="${index}">
        <span class="rank-place">#${index + 1}</span>
        <span class="rank-name">
          <strong>${safeText(record.name || t.anonymous)}</strong>
          <span>${safeText(diff)} · ${safeText(modeName)} · ${time}s · ${safeText(stats.c)}/${safeText(stats.w)}/${safeText(stats.s)} · ${safeText(t.tabsLabel)}: ${tables}</span>
        </span>
        <span class="grade">${safeText(record.gradeCL || "-")}<small>${safeText(record.gradeUSA || "")}</small></span>
      </button>
    `;
  }).join("") : `<div class="empty-state">${safeText(t.emptyRanking)}</div>`;
}

function showHist(idx) {
  const recs = getRecords();
  const data = recs[idx];
  const t = i18n[curLang];
  if (!data || !data.history) return;
  const badOnes = data.history.filter(item => item.status !== "correct");
  $("historical-scroll-window").innerHTML = badOnes.length
    ? renderReviewItems(badOnes)
    : `<div class="review-item rev-correct">${safeText(t.noE)}</div>`;
  $("historical-review-area").classList.remove("hidden");
}

function resetRanking() {
  if (window.confirm(i18n[curLang].resetConfirm)) {
    localStorage.removeItem(DB_KEY);
    $("historical-review-area").classList.add("hidden");
    renderRanking();
  }
}
