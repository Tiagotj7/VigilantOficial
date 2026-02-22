// public/assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // ---- Tema claro/escuro ----
    const rootHtml = document.documentElement;
    const THEME_KEY = 'vigilant-theme';

    function applyTheme(theme) {
        if (theme !== 'dark' && theme !== 'light') {
            theme = 'light';
        }
        rootHtml.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
    }

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

    // ---- TROCA DE SEÇÕES NO DASHBOARD (abas) ----
    const navItems = document.querySelectorAll('.sidebar .nav-item[data-section]');
    const sections = document.querySelectorAll('.main-section');

    function showSection(sectionKey) {
        sections.forEach(sec => {
            if (sec.id === 'section-main-' + sectionKey) {
                sec.style.display = '';
            } else {
                sec.style.display = 'none';
            }
        });
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('data-section');
            if (!targetSection) return;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            showSection(targetSection);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Garantir que Dashboard apareça ao carregar
    showSection('dashboard');
});