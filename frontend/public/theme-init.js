// Runs before first paint so the page never flashes the wrong theme.
// Kept as an external file because the CSP forbids inline scripts. Logic mirrors src/lib/theme.ts.
;(function () {
  var theme = null
  try {
    var stored = localStorage.getItem('gkjw-theme')
    if (stored === 'light' || stored === 'dark') theme = stored
  } catch {
    /* storage blocked (private mode): fall back to the system preference */
  }
  if (!theme) theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
})()
