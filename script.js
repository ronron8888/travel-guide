(() => {
  function initScrollReveal() {
    const targets = document.querySelectorAll(
      '.section-head, .section-title, .intro-copy, .facts, .schedule, .schedule .item, .spots, .spots .spot, .spot-image, .stay-list, .stay-card, .packing, .manifesto, .checklist, .checklist .check, .contacts, .contact, .hero-image, .footer'
    );

    if (!targets.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targets.forEach((el) => {
      if (el.matches('.facts, .schedule, .spots, .stay-list, .packing, .checklist, .contacts')) {
        el.classList.add('reveal-stagger');
      } else if (el.matches('.spot-image, .hero-image')) {
        el.classList.add('reveal-image');
      } else {
        el.classList.add('reveal');
      }
    });

    if (reduceMotion || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.01,
      rootMargin: '0px 0px -5% 0px'
    });

    targets.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal, { once: true });
  } else {
    initScrollReveal();
  }
})();
