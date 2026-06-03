// MatPro v1.6.0 - game
function initGame() {
  if (config.tables.length === 0) {
    updateStartState();
    return;
  }
  config.answerMode = "options";
  pool = buildQuestionPool();
  currentIdx = 0;
  score = { c: 0, w: 0, s: 0 };
  history = [];
  isPaused = false;
  startTime = Date.now();
  setText("total-num", pool.length);
  $("cancel-confirm").classList.add("hidden");
  showScreen("game-screen");
  showQ();
}

function buildQuestionPool() {
  const combinations = [];
  config.tables.forEach(a => {
    for (let b = 1; b <= 12; b++) combinations.push({ a, b });
  });
  const questions = [];
  let guard = 0;
  while (questions.length < config.q && guard < config.q * 40) {
    guard++;
    const batch = [...combinations].sort(() => Math.random() - 0.5);
    for (const q of batch) {
      if (questions.length >= config.q) break;
      const last = questions[questions.length - 1];
      if (last && combinations.length > 1 && last.a === q.a && last.b === q.b) continue;
      questions.push(q);
    }
  }
  while (questions.length < config.q && combinations.length) {
    questions.push(combinations[Math.floor(Math.random() * combinations.length)]);
  }
  return questions;
}

function generateSmartOptions(a, b) {
  const correct = a * b;
  const options = new Set([correct]);
  const strategy = [
    () => correct + a,
    () => correct - a,
    () => correct + b,
    () => correct - b,
    () => correct + 1,
    () => correct - 1,
    () => parseInt(String(correct).split("").reverse().join(""), 10) || correct + 5
  ];
  while (options.size < 4) {
    const fake = Math.random() > 0.25
      ? strategy[Math.floor(Math.random() * strategy.length)]()
      : correct + (Math.floor(Math.random() * 11) - 5);
    if (fake > 0 && fake !== correct) options.add(fake);
  }
  return Array.from(options).sort(() => Math.random() - 0.5);
}

function showQ() {
  if (currentIdx >= pool.length) {
    finish();
    return;
  }
  const q = pool[currentIdx];
  setText("current-num", currentIdx + 1);
  setText("question", `${q.a} × ${q.b}`);
  const opts = generateSmartOptions(q.a, q.b);
  $("options-container").innerHTML = opts.map(option =>
    `<button class="option-btn" type="button" data-answer="${option}">${option}</button>`
  ).join("");
  timeLeft = config.t;
  updateGameStats();
  renderLiveReview();
  resetBar(config.t, 100);
  startTimer();
}

function resetBar(duration, startPct) {
  const bar = $("timer-bar");
  bar.style.transition = "none";
  bar.style.width = `${startPct}%`;
  void bar.offsetWidth;
  if (!isPaused) {
    bar.style.transition = `width ${duration}s linear`;
    bar.style.width = "0%";
  }
}

function startTimer() {
  clearInterval(timer);
  setText("timer-value", `${timeLeft}s`);
  timer = setInterval(() => {
    if (isPaused) return;
    timeLeft--;
    setText("timer-value", `${Math.max(0, timeLeft)}s`);
    if (timeLeft <= 0) handleSelect(null);
  }, 1000);
}

function handleSelect(val) {
  if (isPaused) return;
  clearInterval(timer);
  const q = pool[currentIdx];
  const ans = q.a * q.b;
  const status = val === ans ? "correct" : (val === null ? "skipped" : "wrong");
  if (status === "correct") score.c++;
  else if (status === "skipped") score.s++;
  else score.w++;
  history.push({ q: `${q.a}×${q.b}`, ans, user: val, status });
  currentIdx++;
  updateGameStats();
  renderLiveReview();
  showQ();
}

function updateGameStats() {
  setText("live-score-chip", `${score.c} / ${score.w} / ${score.s}`);
}

function renderLiveReview() {
  const fullTotal = pool.length || config.q;
  const total = Math.min(fullTotal, 24);
  const start = Math.max(0, Math.min(currentIdx - 18, fullTotal - total));
  const items = [];
  for (let index = start; index < start + total; index++) {
    const record = history[index];
    let cls = "";
    if (record?.status === "correct") cls = "ok";
    else if (record?.status === "wrong") cls = "bad";
    else if (record?.status === "skipped") cls = "skip";
    else if (index === currentIdx) cls = "current";
    items.push(`<span class="bubble ${cls}">${index + 1}</span>`);
  }
  $("live-review-strip").innerHTML = items.join("");
}

function triggerCancel() {
  isPaused = true;
  clearInterval(timer);
  const bar = $("timer-bar");
  const computedWidth = window.getComputedStyle(bar).width;
  const currentPct = (parseFloat(computedWidth) / bar.parentElement.offsetWidth) * 100;
  bar.dataset.pausePct = Number.isFinite(currentPct) ? currentPct : 0;
  bar.style.transition = "none";
  bar.style.width = computedWidth;
  $("cancel-confirm").classList.remove("hidden");
  let count = 5;
  setText("cancel-timer", count);
  clearInterval(cancelInterval);
  cancelInterval = setInterval(() => {
    count--;
    setText("cancel-timer", count);
    if (count <= 0) confirmQuit();
  }, 1000);
}

function abortCancel() {
  isPaused = false;
  clearInterval(cancelInterval);
  $("cancel-confirm").classList.add("hidden");
  resetBar(Math.max(timeLeft, 1), parseFloat($("timer-bar").dataset.pausePct || "0"));
  startTimer();
}

function confirmQuit() {
  clearInterval(timer);
  clearInterval(cancelInterval);
  isPaused = false;
  $("cancel-confirm").classList.add("hidden");
  backHome();
}

function finish() {
  clearInterval(timer);
  totalTimeSeconds = Math.floor((Date.now() - startTime) / 1000);
  const effC = config.penalty ? Math.max(0, score.c - Math.floor(score.w / 2)) : score.c;
  const ratio = pool.length ? effC / pool.length : 0;
  const gradeCL = (ratio * 6 + 1).toFixed(1);
  const gradeUSA = getUsGrade(ratio);
  setText("res-time", `${totalTimeSeconds}s`);
  setText("grade-cl", gradeCL);
  setText("grade-cl-small", gradeCL);
  setText("grade-usa", gradeUSA);
  setText("grade-usa-small", gradeUSA);
  setText("res-correct", score.c);
  setText("res-wrong", score.w);
  setText("res-skipped", score.s);
  $("grade-ring").style.setProperty("--score-pct", `${Math.round(ratio * 100)}%`);
  const badOnes = history.filter(item => item.status !== "correct");
  $("result-scroll-window").innerHTML = badOnes.length
    ? renderReviewItems(badOnes)
    : `<div class="review-item rev-correct">${safeText(i18n[curLang].perf)}</div>`;
  showScreen("result-screen");
}

function getUsGrade(ratio) {
  if (ratio >= 0.97) return "A+";
  if (ratio >= 0.93) return "A";
  if (ratio >= 0.90) return "A-";
  if (ratio >= 0.87) return "B+";
  if (ratio >= 0.83) return "B";
  if (ratio >= 0.80) return "B-";
  if (ratio >= 0.77) return "C+";
  if (ratio >= 0.73) return "C";
  if (ratio >= 0.70) return "C-";
  if (ratio >= 0.67) return "D+";
  if (ratio >= 0.63) return "D";
  if (ratio >= 0.60) return "D-";
  return "F";
}

function renderReviewItems(items) {
  const t = i18n[curLang];
  return items.map(item => {
    const cls = item.status === "skipped" ? "rev-skipped" : item.status === "correct" ? "rev-correct" : "rev-wrong";
    const answer = item.user === null ? t.omit : safeText(item.user);
    return `<div class="review-item ${cls}"><strong>${safeText(item.q)} = ${safeText(item.ans)}</strong><br>${safeText(t.your)} ${answer}</div>`;
  }).join("");
}
