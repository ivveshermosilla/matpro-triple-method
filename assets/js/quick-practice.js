// MatPro v1.6.3 - active practice
function nextQuickPractice() {
  quickPractice = {
    a: Math.floor(Math.random() * 12) + 1,
    b: Math.floor(Math.random() * 12) + 1,
    feedback: "",
    user: null
  };
  setText("quick-question", `${quickPractice.a} × ${quickPractice.b}`);
  $("quick-answer-input").value = "";
  renderQuickPracticeFeedback();
  if (!window.matchMedia("(max-width: 760px)").matches) {
    window.setTimeout(() => $("quick-answer-input").focus(), 80);
  }
}

function checkQuickPractice() {
  const raw = $("quick-answer-input").value.trim();
  if (!raw) {
    quickPractice.feedback = "empty";
    quickPractice.user = null;
    renderQuickPracticeFeedback();
    return;
  }
  const value = parseInt(raw, 10);
  if (Number.isNaN(value)) {
    quickPractice.feedback = "empty";
    quickPractice.user = null;
    renderQuickPracticeFeedback();
    return;
  }
  quickPractice.user = value;
  quickPractice.feedback = value === quickPractice.a * quickPractice.b ? "correct" : "wrong";
  renderQuickPracticeFeedback();
}

function renderQuickPracticeFeedback() {
  const feedback = $("quick-feedback");
  if (!feedback) return;
  const t = i18n[curLang];
  const answer = quickPractice.a * quickPractice.b;
  feedback.className = `quick-feedback ${quickPractice.feedback || ""}`;
  if (quickPractice.feedback === "correct") {
    feedback.textContent = t.quickCorrect;
  } else if (quickPractice.feedback === "wrong") {
    feedback.textContent = t.quickWrong.replace("{answer}", answer);
  } else if (quickPractice.feedback === "empty") {
    feedback.textContent = t.quickEmpty;
  } else {
    feedback.textContent = "";
  }
}
