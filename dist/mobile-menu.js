(() => {
    const toggle = document.querySelector('[data-mobile-menu-toggle]');
    const menu = document.querySelector('[data-mobile-menu]');
    const backdrop = document.querySelector('[data-mobile-menu-backdrop]');
    const nav = document.querySelector('header');
    if (!toggle || !menu || !backdrop || !nav) return;

    let lastScrollY = window.scrollY;
    const scrollThreshold = 8;

    const setOpen = (open) => {
        menu.classList.toggle('-translate-x-full', !open);
        backdrop.classList.toggle('opacity-0', !open);
        backdrop.classList.toggle('pointer-events-none', !open);
        menu.setAttribute('aria-hidden', String(!open));
        toggle.setAttribute('aria-expanded', String(open));
        if (open) nav.classList.remove('is-mobile-nav-hidden');
    };

    const updateNavVisibility = () => {
        const currentScrollY = window.scrollY;
        const menuIsOpen = !menu.classList.contains('-translate-x-full');
        if (!menuIsOpen && currentScrollY > 0 && Math.abs(currentScrollY - lastScrollY) < scrollThreshold) return;

        const scrollingUp = currentScrollY < lastScrollY - scrollThreshold;
        const scrollingDown = currentScrollY > lastScrollY + scrollThreshold;

        if (menuIsOpen || currentScrollY <= 0 || scrollingUp) {
            nav.classList.remove('is-mobile-nav-hidden');
        } else if (scrollingDown && currentScrollY > nav.offsetHeight) {
            nav.classList.add('is-mobile-nav-hidden');
        }

        lastScrollY = currentScrollY;
    };

    toggle.addEventListener('click', () => setOpen(menu.classList.contains('-translate-x-full')));
    backdrop.addEventListener('click', () => setOpen(false));
    menu.querySelector('[data-mobile-menu-close]').addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
    window.addEventListener('scroll', updateNavVisibility, { passive: true });
})();
