(() => {
  const init = () => {
    const foodGrid = document.getElementById('foodGrid');

    // Food cards: photo + shop name + one-line note + detail link.
    if (foodGrid && window.travel?.food) {
      const esc = (value) => String(value ?? '').replace(/[&<>\"']/g, (m) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#039;' }[m]));
      const fallbackImage = 'https://koedo.or.jp/wp-content/uploads/018499d5096841e2ac350b62fa6c2fee-scaled.jpg';
      foodGrid.classList.add('food-grid');
      foodGrid.innerHTML = travel.food.map((item) => `
        <article class="food-card reveal">
          <a class="food-card-link" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer">
            <div class="food-card-image-wrap">
              <img class="food-card-image" src="${esc(item.image || fallbackImage)}" alt="${esc(item.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackImage}'">
            </div>
            <div class="food-card-body">
              <div class="eyebrow">FOOD / KAWAGOE</div>
              <h3 class="food-card-name">${esc(item.name)}</h3>
              <p class="food-card-note">${esc(item.note)}</p>
              <span class="food-card-detail">DETAILS <span>↗</span></span>
            </div>
          </a>
        </article>
      `).join('');
    }

    const style = document.createElement('style');
    style.textContent = `
      .food-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:0;align-items:start}
      .food-card{position:relative;min-width:0;overflow:hidden;background:var(--bg);border:1px solid rgba(17,17,17,.12);transition:transform .55s var(--ease),box-shadow .55s var(--ease),border-color .4s var(--ease)}
      .food-card:nth-child(3n+2){transform:translateY(34px)}
      .food-card:nth-child(3n+3){transform:translateY(68px)}
      .food-card:hover{transform:translateY(-5px)!important;border-color:var(--ink);box-shadow:0 18px 34px rgba(17,17,17,.10)}
      .food-card-link{display:block;text-decoration:none;color:inherit;height:100%}
      .food-card-image-wrap{aspect-ratio:1.18/1;overflow:hidden;background:linear-gradient(135deg,#d6d6d1,#ededeb)}
      .food-card-image{display:block;width:100%;height:100%;object-fit:cover;transition:transform .8s var(--ease),filter .8s var(--ease)}
      .food-card:hover .food-card-image{transform:scale(1.055);filter:saturate(1.06) contrast(1.02)}
      .food-card-body{padding:18px 18px 20px}
      .food-card-name{font-size:21px;line-height:1.25;letter-spacing:-.035em;margin:8px 0 7px;font-weight:800}
      .food-card-note{font-size:11px;color:var(--sub);line-height:1.65;margin:0;min-height:3.3em}
      .food-card-detail{display:inline-flex;gap:6px;margin-top:15px;padding-bottom:3px;border-bottom:1px solid var(--ink);font-size:9px;font-weight:700;letter-spacing:.14em;transition:padding .35s var(--ease),background .35s var(--ease)}
      .food-card-detail span{transition:transform .35s var(--ease)}
      .food-card:hover .food-card-detail{padding:3px 7px;background:var(--accent)}
      .food-card:hover .food-card-detail span{transform:translate(3px,-3px)}
      @media(max-width:900px){.food-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.food-card:nth-child(3n+2),.food-card:nth-child(3n+3){transform:none}.food-card:nth-child(2n){transform:translateY(24px)}.food-card:hover{transform:translateY(-5px)!important}}
      @media(max-width:700px){.food-grid{grid-template-columns:1fr;gap:24px}.food-card:nth-child(2n){transform:none}.food-card-image-wrap{aspect-ratio:1.3/1}.food-card-body{padding:16px 16px 18px}.food-card-name{font-size:20px}.food-card-note{min-height:0}}
      @media(hover:none){.food-card:hover{transform:none!important;box-shadow:none}.food-card:hover .food-card-image{transform:none;filter:none}.food-card:hover .food-card-detail{padding-bottom:3px;background:transparent}.food-card:hover .food-card-detail span{transform:none}}
    `;
    document.head.appendChild(style);

    const targets = Array.from(document.querySelectorAll(
      '.section-head, .section-title, .intro-copy, .facts, .schedule, .schedule .item, .spots, .spots .spot, .spot-image, .food-card, .stay-list, .stay-card, .packing, .manifesto, .checklist, .checklist .check, .contacts, .contact, .hero-image, .footer'
    ));

    if (!targets.length) return;

    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    targets.forEach((el) => {
      if (el.matches('.facts, .schedule, .spots, .stay-list, .packing, .checklist, .contacts')) {
        el.classList.add('reveal-stagger');
      } else if (el.matches('.spot-image, .hero-image')) {
        el.classList.add('reveal-image');
      } else if (!el.classList.contains('reveal')) {
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
        if (rect.top < viewport * 0.92 && rect.bottom > 0) el.classList.add('is-visible');
      });
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => { reveal(); ticking = false; });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', reveal, { passive: true });
    window.addEventListener('orientationchange', reveal, { passive: true });
    reveal();
    window.setTimeout(reveal, 150);
    window.setTimeout(reveal, 600);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true });
  else init();
})();
