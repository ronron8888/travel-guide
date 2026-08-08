(() => {
  const init = () => {
    const targets = Array.from(document.querySelectorAll(
      '.section-head, .section-title, .intro-copy, .facts, .schedule, .schedule .item, .spots, .spots .spot, .spot-image, .stay-list, .stay-card, .packing, .manifesto, .checklist, .checklist .check, .contacts, .contact, .hero-image, .footer'
    ));

    if (!targets.length) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targets.forEach((el) => {
      if (el.matches('.facts, .schedule, .spots, .stay-list, .packing, .checklist, .contacts')) {
        el.classList.add('reveal-stagger');
      } else if (el.matches('.spot-image, .hero-image')) {
        el.classList.add('reveal-image');
      } else {
        el.classList.add('reveal');
      }
    });

    if (reduced) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const reveal = () => {
      const viewport = window.innerHeight || document.documentElement.clientHeight;
      targets.forEach((el) => {
        if (el.classList.contains('is-visible')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < viewport * 0.92 && rect.bottom > 0) {
          el.classList.add('is-visible');
        }
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        reveal();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', reveal, { passive: true });
    window.addEventListener('orientationchange', reveal, { passive: true });

    // Initial check and a delayed check for images/fonts/layout shifts.
    reveal();
    window.setTimeout(reveal, 150);
    window.setTimeout(reveal, 600);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
