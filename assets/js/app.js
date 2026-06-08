// MatPro v1.6.1 - app
var _mpAutoLang = (function() {
  var u = new URLSearchParams(window.location.search).get('lang');
  var s = localStorage.getItem('ivves_preferred_lang');
  if (u === 'es' || u === 'en') { curLang = u; localStorage.setItem('ivves_preferred_lang', u); return u; }
  if (s === 'es' || s === 'en') { curLang = s; return s; }
  return null;
})();
initEventHandlers();
loadSavedConfig();
initTablesGrid();
updateTexts();
updatePresetButtons(getPresetFromDiff(config.diffName));
updateModeLabels();
nextQuickPractice();
if (_mpAutoLang) showScreen('mode-screen');
