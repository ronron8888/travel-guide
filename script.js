(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = [
    '.section-head', '.section-title', '.intro-copy', '.facts', '.schedule',
    '.schedule .item', '.spots', '.spots .spot', '.spot-image', '.stay-list',
    '.stay-card', '.packing', '.manifesto', '.checklist', '.checklist .check',
    '.contacts', '.contact', '.hero-image', '.footer'
  ].join(',');

  function initScrollReveal() {
    const elements = [...document.querySelectorAll(targets)];
    if (!elements.length) return;

    if (reduceMotion || !('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -10% 0px'
    });

    elements.forEach((el) => {
      if (el.matches('.facts, .schedule, .spots, .stay-list, .packing, .checklist, .contacts')) {
        el.classList.add('reveal-stagger');
      } else if (el.matches('.spot-image, .hero-image')) {
        el.classList.add('reveal-image');
      } else {
        el.classList.add('reveal');
      }
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollReveal, { once: true });
  } else {
    initScrollReveal();
  }
})();
