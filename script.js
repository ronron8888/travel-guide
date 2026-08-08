const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    revealObserver.unobserve(entry.target);
  });
}, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

function initScrollReveal() {
  const staggerTargets = document.querySelectorAll('.facts, .schedule, .spots, .stay-list, .packing, .checklist, .contacts');
  staggerTargets.forEach((el) => {
    el.classList.add('reveal-stagger');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.section-head, .section-title, .intro-copy, .manifesto, .stay-card, .contact').forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.spot-image, .hero-image').forEach((el) => {
    el.classList.add('reveal-image');
    revealObserver.observe(el);
  });

  document.querySelectorAll('.schedule .item, .spots .spot, .checklist .check').forEach((el) => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
