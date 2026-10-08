(() => {
    const toggle = document.querySelector('[data-mobile-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    const backdrop = document.querySelector('[data-mobile-menu-backdrop]');
    if (!toggle || !menu || !backdrop) return;

    const setOpen = (open) => {
        menu.classList.toggle('-translate-x-full', !open);
        backdrop.classList.toggle('opacity-0', !open);
        backdrop.classList.toggle('pointer-events-none', !open);
        menu.setAttribute('aria-hidden', String(!open));
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', () => setOpen(menu.classList.contains('-translate-x-full')));
    backdrop.addEventListener('click', () => setOpen(false));
    menu.querySelector('[data-mobile-menu-close]').addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
})();
