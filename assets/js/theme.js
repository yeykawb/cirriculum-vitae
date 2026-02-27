// Theme Toggle — dark mode by default
(function () {
    const body = document.body;

    function getIcon(isDark) {
        return isDark ? 'fas fa-sun' : 'fas fa-moon';
    }

    function applyTheme(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        const toggle = document.getElementById('darkModeToggle');
        if (toggle) {
            toggle.querySelector('i').className = getIcon(isDark);
            toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
        }
    }

    // Initialise: dark by default, respect saved preference
    const saved = localStorage.getItem('theme');
    const prefersDark = saved ? saved === 'dark' : true;
    applyTheme(prefersDark);

    // Wire up toggle button once DOM is ready
    document.addEventListener('DOMContentLoaded', function () {
        const toggle = document.getElementById('darkModeToggle');
        if (!toggle) return;

        // Re-apply so the icon renders correctly after DOM loads
        applyTheme(body.classList.contains('dark-mode'));

        toggle.addEventListener('click', function () {
            const isDark = body.classList.toggle('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            applyTheme(isDark);
        });
    });
})();
