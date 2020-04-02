import { state } from './state';

let isPreferDark: boolean | undefined;

export function isDarkMode() {
  let color_theme = state.color_theme;
  if (color_theme === null) {
    color_theme = isPreferDark ? 'dark' : 'light';
  }
  return color_theme === 'dark';
}

function renderTheme() {
  document.body.classList.remove('slim-dark');
  if (isDarkMode()) {
    document.body.classList.add('dark');
    document.body.classList.remove('light');
  } else {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  }
}

export function setDarkMode(o: { isDark: boolean }) {
  state.color_theme = o.isDark ? 'dark' : 'light';
  renderTheme();
}

export function toggleDarkMode() {
  const isDark = state.color_theme === 'dark';
  setDarkMode({ isDark: !isDark });
}

try {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  isPreferDark = prefersDark.matches;
  prefersDark.addEventListener('change', e => {
    isPreferDark = e.matches;
    renderTheme();
  });
} catch (e) {
  console.error('matchMedia is not supported:', e);
}

renderTheme();
