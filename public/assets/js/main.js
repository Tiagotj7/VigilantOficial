// public/assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // ---- Tema claro/escuro ----
    const rootHtml = document.documentElement; // <html>
    const THEME_KEY = 'vigilant-theme';

    function applyTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') {
            theme = 'light';
        }
        rootHtml.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

    // Tema inicial: usa localStorage ou prefere dark se sistema for dark
    let storedTheme = localStorage.getItem(THEME_KEY);
    if (!storedTheme) {
        const prefersDark = window.matchMedia &&
            window.matchMedia('(prefers-color-scheme: dark)').matches;
        storedTheme = prefersDark ? 'dark' : 'light';
    }
    applyTheme(storedTheme);

    const toggleBtn = document.getElementById('themeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const current = rootHtml.getAttribute('data-theme') || 'light';
            const next = current === 'light' ? 'dark' : 'light';
            applyTheme(next);
        });
    }
});