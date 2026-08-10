(() => {
  const init = () => {
    const foodGrid = document.getElementById('foodGrid');
    const stayList = document.querySelector('.stay-list');
    const esc = (value) => String(value ?? '').replace(/[&<>\"']/g, (m) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '\"':'&quot;', "'":'&#039;' }[m]));
    const fallbackImage = 'https://koedo.or.jp/wp-content/uploads/018499d5096841e2ac350b62fa6c2fee-scaled.jpg';
    const screenshot = (url) => url ? `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}` : fallbackImage;
    if (foodGrid && window.travel?.food) {
      foodGrid.classList.remove('spots'); foodGrid.classList.add('food-grid');
      foodGrid.innerHTML = travel.food.map((item) => { const image = item.image || screenshot(item.url); return `<article class="food-card reveal"><a class="food-card-link" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer"><div class="food-card-image-wrap"><img class="food-card-image" src="${esc(image)}" alt="${esc(item.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackImage}'"></div><div class="food-card-body"><div class="eyebrow">FOOD / KAWAGOE</div><h3 class="food-card-name">${esc(item.name)}</h3><p class="food-card-note">${esc(item.note)}</p><span class="food-card-detail">DETAILS <span>↗</span></span></div></a></article>`; }).join('');
    }
    if (stayList && window.travel?.stay?.length) {
      stayList.innerHTML = travel.stay.map((item) => { const image = item.image || screenshot('https://hanayu-bettei.com/'); return `<article class="stay-card stay-card-with-image reveal"><a class="stay-card-link" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer"><div class="stay-image-wrap"><img class="stay-image" src="${esc(image)}" alt="${esc(item.name)}" loading="lazy" decoding="async"></div><div class="stay-card-content"><div class="eyebrow">ACCOMMODATION</div><h3 class="stay-name">${esc(item.name)}</h3><p class="spot-note">${esc(item.note)}</p><span class="link">OFFICIAL SITE</span></div></a></article>`; }).join('');
      stayList.classList.add('stay-list-with-image');
    }
    const style = document.createElement('style');
    style.textContent = `
      .map{display:inline-flex;align-items:center;justify-content:flex-end;gap:9px;min-height:30px;padding:0 0 0 10px;border:1px solid transparent;border-radius:999px;text-decoration:none;transition:transform .4s var(--ease),padding .4s var(--ease),background .4s var(--ease),border-color .4s var(--ease)}
      .map:before{content:"MAP";font-size:8px;letter-spacing:.16em}
      .map:after{content:"↗";display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border:1px solid currentColor;border-radius:50%;font-size:12px;line-height:1;transition:transform .4s var(--ease),background .4s var(--ease),color .4s var(--ease)}
      .map:hover{padding-left:14px;padding-right:4px;background:var(--accent);border-color:var(--accent);transform:translateX(2px)}
      .map:hover:after{transform:translate(2px,-2px) rotate(3deg);background:var(--ink);color:var(--white)}
      .map:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
      .food-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;margin-top:0;align-items:start}.food-card{position:relative;min-width:0;overflow:hidden;background:var(--bg);border:1px solid rgba(17,17,17,.12);transition:transform .55s var(--ease),box-shadow .55s var(--ease),border-color .4s var(--ease)}.food-card:nth-child(4n+2){transform:translateY(24px)}.food-card:nth-child(4n+3){transform:translateY(44px)}.food-card:nth-child(4n+4){transform:translateY(68px)}.food-card:hover{transform:translateY(-5px)!important;border-color:var(--ink);box-shadow:0 18px 34px rgba(17,17,17,.10)}.food-card-link{display:block;text-decoration:none;color:inherit;height:100%}.food-card-image-wrap{aspect-ratio:1.3/1;overflow:hidden;background:linear-gradient(135deg,#d6d6d1,#ededeb)}.food-card-image{display:block;width:100%;height:100%;object-fit:cover;image-rendering:auto;transition:transform .8s var(--ease),filter .8s var(--ease)}.food-card:hover .food-card-image{transform:scale(1.055);filter:saturate(1.06) contrast(1.02)}.food-card-body{padding:18px 18px 20px}.food-card-name{font-size:21px;line-height:1.25;letter-spacing:-.035em;margin:8px 0 7px;font-weight:800}.food-card-note{font-size:11px;color:var(--sub);line-height:1.65;margin:0;min-height:3.3em}.food-card-detail{display:inline-flex;gap:6px;margin-top:15px;padding-bottom:3px;border-bottom:1px solid var(--ink);font-size:9px;font-weight:700;letter-spacing:.14em}.food-card-detail span{transition:transform .35s var(--ease)}.food-card:hover .food-card-detail span{transform:translate(3px,-3px)}.stay-list-with-image{display:grid!important;grid-template-columns:1fr!important;gap:1px!important;background:var(--ink)}.stay-card-with-image{padding:0!important;min-height:0!important;overflow:hidden;background:var(--bg)}.stay-card-link{display:grid;grid-template-columns:minmax(300px,46%) 1fr;color:inherit;text-decoration:none;min-height:300px}.stay-image-wrap{min-height:300px;overflow:hidden;background:#ddd}.stay-image{display:block;width:100%;height:100%;min-height:300px;object-fit:cover;transition:transform .8s var(--ease),filter .8s var(--ease)}.stay-card-with-image:hover .stay-image{transform:scale(1.035);filter:saturate(1.04)}.stay-card-content{padding:38px;display:flex;flex-direction:column;justify-content:center}
      @media(max-width:1100px){.food-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.food-card:nth-child(4n+2),.food-card:nth-child(4n+3),.food-card:nth-child(4n+4){transform:none}.food-card:nth-child(even){transform:translateY(24px)}}
      @media(max-width:900px){.stay-card-link{grid-template-columns:1fr}.stay-image-wrap,.stay-image{min-height:260px;height:260px}.stay-card-content{padding:28px}}
      @media(max-width:700px){.map{justify-content:flex-start}.map:after{width:26px;height:26px}.food-grid{grid-template-columns:1fr}.food-card:nth-child(even){transform:none}.food-card-image-wrap{aspect-ratio:1.3/1}.stay-image-wrap,.stay-image{min-height:220px;height:220px}.stay-card-content{padding:22px 20px}}
      @media(hover:none){.map:hover{transform:none;padding-left:10px;padding-right:0;background:transparent;border-color:transparent}.map:hover:after{transform:none;background:transparent;color:inherit}.food-card:hover{transform:none!important;box-shadow:none}.food-card:hover .food-card-image{transform:none;filter:none}}
    `;
    document.head.appendChild(style);
    const targets = Array.from(document.querySelectorAll('.section-head, .section-title, .intro-copy, .facts, .schedule, .schedule .item, .spots, .spots .spot, .spot-image, .food-card, .stay-list, .stay-card, .stay-image-wrap, .packing, .manifesto, .checklist, .checklist .check, .contacts, .contact, .hero-image, .footer'));
    if (!targets.length) return; const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((el) => { if (el.matches('.facts, .schedule, .spots, .stay-list, .packing, .checklist, .contacts')) el.classList.add('reveal-stagger'); else if (el.matches('.spot-image, .hero-image, .stay-image-wrap')) el.classList.add('reveal-image'); else if (!el.classList.contains('reveal')) el.classList.add('reveal'); });
    if (reduced) { targets.forEach((el) => el.classList.add('is-visible')); return; }
    const reveal = () => { const viewport = window.innerHeight || document.documentElement.clientHeight; targets.forEach((el) => { if (el.classList.contains('is-visible')) return; const rect = el.getBoundingClientRect(); if (rect.top < viewport * 0.92 && rect.bottom > 0) el.classList.add('is-visible'); }); };
    let ticking = false; const onScroll = () => { if (ticking) return; ticking = true; window.requestAnimationFrame(() => { reveal(); ticking = false; }); };
    window.addEventListener('scroll', onScroll, { passive: true }); window.addEventListener('resize', reveal, { passive: true }); window.addEventListener('orientationchange', reveal, { passive: true }); reveal(); window.setTimeout(reveal,150); window.setTimeout(reveal,600);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once:true }); else init();
})();
(() => { const applyHero = () => { const hero=document.querySelector('.hero-image'); if(!hero)return; const image='https://local-best.jp/wp-content/themes/localbest/images/detail/jp/ho/ref/saitama/ja_Y381064138.webp?v=20260810'; hero.style.setProperty('background-image',`url("${image}")`,'important'); hero.style.setProperty('background-size','cover','important'); hero.style.setProperty('background-position','center center','important'); hero.style.setProperty('background-repeat','no-repeat','important'); }; if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyHero,{once:true});else applyHero(); window.setTimeout(applyHero,100);window.setTimeout(applyHero,500);})();

/* Final MAP refinement: keep the existing MAP text and add only one circular arrow. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .schedule .map:before{content:none!important;display:none!important}
    .schedule .map:after{content:"↗"!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;width:24px!important;height:24px!important;border:1px solid currentColor!important;border-radius:50%!important;font-size:12px!important;letter-spacing:0!important;line-height:1!important}
    .schedule .map{gap:8px!important;min-height:30px!important;padding:2px 4px 2px 10px!important;border:1px solid transparent!important;border-radius:999px!important;font-size:8px!important;font-weight:700!important;letter-spacing:.16em!important;text-decoration:none!important;transition:transform .35s var(--ease),background .35s var(--ease),border-color .35s var(--ease),padding .35s var(--ease)!important}
    .schedule .map:hover{transform:translateX(2px)!important;padding-left:12px!important;background:var(--accent)!important;border-color:var(--accent)!important}
    .schedule .map:hover:after{transform:translate(2px,-2px)!important;background:var(--ink)!important;color:var(--white)!important}
    @media(max-width:700px){.schedule .map{justify-content:flex-start!important;text-align:left!important}}
  `;
  document.head.appendChild(style);
})();