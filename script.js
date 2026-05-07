// ============================================
//   BAALI LHOUSSAINE — Portfolio Script
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ── SCROLL PROGRESS ──────────────────────
    const prog = document.getElementById('progressLine');
    window.addEventListener('scroll', () => {
        if (!prog) return;
        const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
        prog.style.width = pct + '%';
    }, { passive: true });

    // ── MOBILE NAV ───────────────────────────
    const burger = document.getElementById('burger');
    const menu = document.getElementById('mobileMenu');
    if (burger && menu) {
        burger.addEventListener('click', () => {
            const open = menu.classList.toggle('open');
            burger.setAttribute('aria-expanded', open);
            burger.querySelectorAll('span')[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : '';
            burger.querySelectorAll('span')[1].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : '';
        });
        menu.querySelectorAll('.mm-link').forEach(l => {
            if (!l.getAttribute('href').startsWith('http') && !l.getAttribute('href').startsWith('articles')) {
                l.addEventListener('click', () => {
                    menu.classList.remove('open');
                    burger.querySelectorAll('span').forEach(s => s.style.transform = '');
                });
            }
        });
        document.addEventListener('click', e => {
            if (!burger.contains(e.target) && !menu.contains(e.target)) {
                menu.classList.remove('open');
                burger.querySelectorAll('span').forEach(s => s.style.transform = '');
            }
        });
    }

    // ── SMOOTH SCROLL (hash links only) ──────
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const id = a.getAttribute('href').slice(1);
            const el = document.getElementById(id);
            if (el) {
                e.preventDefault();
                window.scrollTo({ top: el.offsetTop - 68, behavior: 'smooth' });
            }
        });
    });

    // ── PHOTO CAROUSEL ───────────────────────
    const slides = document.querySelectorAll('.cs');
    const prev = document.getElementById('prevBtn');
    const next = document.getElementById('nextBtn');
    let cur = 0, autoTimer;

    const go = i => {
        slides[cur].classList.remove('active');
        cur = (i + slides.length) % slides.length;
        slides[cur].classList.add('active');
    };
    if (slides.length > 1) {
        prev?.addEventListener('click', () => { go(cur - 1); resetAuto(); });
        next?.addEventListener('click', () => { go(cur + 1); resetAuto(); });
        function resetAuto() { clearInterval(autoTimer); autoTimer = setInterval(() => go(cur + 1), 4500); }
        resetAuto();
    }

    // ── SCROLL REVEAL ────────────────────────
    const io = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.reveal').forEach((el, i) => {
        el.style.transitionDelay = (i % 4) * 0.08 + 's';
        io.observe(el);
    });

    // ── ACTIVE NAV HIGHLIGHT ─────────────────
    const secs = document.querySelectorAll('section[id]');
    const nls = document.querySelectorAll('.nav-links .nl');
    window.addEventListener('scroll', () => {
        const sp = window.scrollY + 120;
        secs.forEach(s => {
            if (sp >= s.offsetTop && sp < s.offsetTop + s.offsetHeight) {
                nls.forEach(l => l.classList.remove('active'));
                const match = document.querySelector(`.nl[href="#${s.id}"]`);
                if (match) match.classList.add('active');
            }
        });
    }, { passive: true });

    console.log('%c[BL_PORTFOLIO] Loaded ✓', 'color:#c9a84c;font-family:serif;font-size:14px;font-style:italic');
});
