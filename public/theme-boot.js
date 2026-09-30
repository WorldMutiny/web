// Before the page paints: the visitor's theme, so it never flashes the default.
(function () {
  var themes = ['mutiny', 'blackgold', 'black-arch', 'matrix', 'tokyo-night', 'city-783'];
  var t = 'mutiny';
  try { var saved = localStorage.getItem('mutiny-theme'); if (themes.indexOf(saved) !== -1) t = saved; } catch (e) { /* storage blocked */ }
  document.documentElement.setAttribute('data-theme', t);
})();
