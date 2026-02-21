// public/assets/js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Foco automático no campo de email do login, se existir
    const emailInput = document.querySelector('input[name="email"]');
    if (emailInput && window.location.pathname.includes('login.php')) {
        emailInput.focus();
    }

    // Pequeno helper para menus (no futuro, se você criar mais páginas)
    const currentPath = window.location.pathname;
    const navItems = document.querySelectorAll('.sidebar .nav-item');

    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (!href || href === '#') return;
        try {
            const linkPath = new URL(href, window.location.origin).pathname;
            if (linkPath === currentPath) {
                item.classList.add('active');
            }
        } catch (e) {
            // Em caso de href relativo estranho, ignora
        }
    });

    // Exemplo de listener de pesquisa (apenas console.log por enquanto)
    const searchInput = document.querySelector('.search');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const value = e.target.value.trim();
            // Aqui você pode no futuro filtrar tabela, alvos, etc.
            console.log('Pesquisar:', value);
        });
    }
});