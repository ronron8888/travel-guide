(() => {
  const esc = (value) => String(value ?? '').replace(/[&<>\"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#039;'}[m]));
  const fallbackImage = 'https://koedo.or.jp/wp-content/uploads/018499d5096841e2ac350b62fa6c2fee-scaled.jpg';
  const screenshot = (url) => url ? `https://image.thum.io/get/width/1200/crop/800/noanimate/${url}` : fallbackImage;
  const renderSpots = () => {
    const foodGrid = document.getElementById('foodGrid');
    const head = document.querySelector('#spots .section-head');
    if (!foodGrid || !window.travel?.food) return;
    foodGrid.classList.remove('spots'); foodGrid.classList.add('food-grid');
    if (head && foodGrid.parentElement !== head) head.appendChild(foodGrid);
    foodGrid.innerHTML = travel.food.map((item) => {
      const image = item.image || screenshot(item.url);
      const map = item.map ? `<a class="spot-map-button" href="${esc(item.map)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(item.name)}のMAP"><span class="spot-map-label">MAP</span><span class="spot-map-icon" aria-hidden="true">⌖</span></a>` : '';
      return `<article class="food-card"><a class="food-card-image-link" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer"><div class="food-card-image-wrap"><img class="food-card-image" src="${esc(image)}" alt="${esc(item.name)}" loading="lazy" decoding="async" onerror="this.onerror=null;this.src='${fallbackImage}'"></div></a><div class="food-card-body"><div class="eyebrow">FOOD / KAWAGOE</div><h3 class="food-card-name"><a class="food-card-name-link" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer">${esc(item.name)}</a></h3><p class="food-card-note">${esc(item.note)}</p><div class="food-card-actions"><a class="food-card-detail" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer">DETAILS <span>↗</span></a>${map}</div></div></article>`;
    }).join('');
  };
  const renderStay = () => {
    const stayList = document.querySelector('.stay-list');
    if (!stayList || !window.travel?.stay?.length) return;
    stayList.innerHTML = travel.stay.map((item) => { const image = item.image || screenshot('https://hanayu-bettei.com/'); return `<article class="stay-card stay-card-with-image"><a class="stay-card-link" href="${esc(item.url || '#')}" target="_blank" rel="noopener noreferrer"><div class="stay-image-wrap"><img class="stay-image" src="${esc(image)}" alt="${esc(item.name)}" loading="lazy" decoding="async"></div><div class="stay-card-content"><div class="eyebrow">ACCOMMODATION</div><h3 class="stay-name">${esc(item.name)}</h3><p class="spot-note">${esc(item.note)}</p><span class="link">OFFICIAL SITE</span></div></a></article>`; }).join('');
    stayList.classList.add('stay-list-with-image');
  };
  const injectSpotStyle = () => {
    if (document.getElementById('final-spot-style')) return;
    const style = document.createElement('style'); style.id = 'final-spot-style';
    style.textContent = `
      #spots .section-head{display:grid;grid-template-columns:1fr 2fr;gap:40px;align-items:start}
      #spots #foodGrid{grid-column:1 / -1;width:100%;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:18px;margin-top:45px;align-items:stretch;margin-bottom:120px}
      #spots .food-card{display:flex!important;flex-direction:column!important;min-width:0!important;height:100%!important;min-height:390px!important;opacity:1!important;visibility:visible!important;transform:none!important;overflow:hidden!important;background:var(--bg)!important;border:1px solid rgba(17,17,17,.14)!important;transition:box-shadow .3s var(--ease),border-color .3s var(--ease)!important}
      #spots .food-card:hover{transform:translateY(-3px)!important;box-shadow:0 12px 24px rgba(17,17,17,.08)!important;border-color:var(--ink)!important}
      #spots .food-card-image-link{display:block!important;text-decoration:none!important;color:inherit!important;flex:none!important}
      #spots .food-card-image-wrap{width:100%!important;aspect-ratio:1.45 / 1!important;overflow:hidden!important;background:#e5e5e1!important}
      #spots .food-card-image{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;opacity:1!important;visibility:visible!important;transition:transform .45s var(--ease),filter .45s var(--ease)!important}
      #spots .food-card:hover .food-card-image{transform:scale(1.025)!important;filter:saturate(1.03)!important}
      #spots .food-card-body{display:flex!important;flex:1 1 auto!important;flex-direction:column!important;padding:18px 18px 20px!important;opacity:1!important;visibility:visible!important;transform:none!important;color:var(--ink)!important}
      #spots .food-card-body .eyebrow{display:block!important;opacity:1!important;visibility:visible!important;color:var(--sub)!important}
      #spots .food-card-name{display:block!important;opacity:1!important;visibility:visible!important;margin:8px 0 7px!important;font-size:21px!important;line-height:1.25!important;font-weight:800!important;color:var(--ink)!important}
      #spots .food-card-name-link{color:inherit!important;text-decoration:none!important}
      #spots .food-card-note{display:block!important;opacity:1!important;visibility:visible!important;min-height:3.3em!important;margin:0!important;color:var(--sub)!important;font-size:11px!important;line-height:1.65!important}
      #spots .food-card-actions{display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important;margin-top:auto!important;padding-top:24px!important;min-height:48px!important;opacity:1!important;visibility:visible!important}
      #spots .food-card-detail{display:inline-flex!important;align-items:center!important;gap:6px!important;margin:0!important;padding-bottom:3px!important;border-bottom:1px solid var(--ink)!important;color:var(--ink)!important;font-size:9px!important;font-weight:700!important;letter-spacing:.14em!important;text-decoration:none!important;opacity:1!important;visibility:visible!important}
      #spots .spot-map-button{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;min-height:38px!important;padding:5px 8px 5px 12px!important;border:1px solid var(--ink)!important;border-radius:999px!important;background:transparent!important;color:var(--ink)!important;font-size:11px!important;font-weight:800!important;letter-spacing:.14em!important;line-height:1!important;text-decoration:none!important;opacity:1!important;visibility:visible!important;position:relative!important;z-index:20!important;pointer-events:auto!important;transition:background .3s var(--ease),color .3s var(--ease),transform .3s var(--ease)!important}
      #spots .spot-map-icon{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:25px!important;height:25px!important;border:1px solid currentColor!important;border-radius:50%!important;font-size:17px!important;line-height:1!important}
      #spots .spot-map-button:hover{background:var(--ink)!important;color:var(--white)!important;transform:translateY(-2px)!important}
      #spots .spot-map-button:hover .spot-map-icon{background:var(--accent)!important;color:var(--ink)!important}
      #spots .food-card-image-link,#spots .food-card-name-link,#spots .food-card-detail,#spots .spot-map-button{pointer-events:auto!important}
      @media(max-width:1100px){#spots #foodGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}
      @media(max-width:700px){#spots .section-head{display:grid;grid-template-columns:1fr;gap:25px}#spots #foodGrid{grid-column:1;grid-template-columns:1fr;margin-top:30px;margin-bottom:80px;gap:16px}#spots .food-card{min-height:0!important}.food-card:hover{transform:none!important;box-shadow:none!important}.food-card:hover .food-card-image{transform:none!important;filter:none!important}}
    `; document.head.appendChild(style);
  };
  const applyHero = () => { const hero=document.querySelector('.hero-image'); if(!hero)return; const image='https://local-best.jp/wp-content/themes/localbest/images/detail/jp/ho/ref/saitama/ja_Y381064138.webp?v=20260810'; hero.style.setProperty('background-image',`url("${image}")`,'important'); hero.style.setProperty('background-size','cover','important'); hero.style.setProperty('background-position','center center','important'); hero.style.setProperty('background-repeat','no-repeat','important'); };
  const initReveal = () => {
    const targets=Array.from(document.querySelectorAll('.section-head,.section-title,.intro-copy,.facts,.schedule,.schedule .item,.spots,.spots .spot,.spot-image,.stay-list,.stay-card,.stay-image-wrap,.packing,.manifesto,.checklist,.checklist .check,.contacts,.contact,.hero-image,.footer'));
    const reduced=window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    targets.forEach((el)=>{if(el.matches('.facts,.schedule,.spots,.stay-list,.packing,.checklist,.contacts'))el.classList.add('reveal-stagger');else if(el.matches('.spot-image,.hero-image,.stay-image-wrap'))el.classList.add('reveal-image');else el.classList.add('reveal');});
    if(reduced){targets.forEach((el)=>el.classList.add('is-visible'));return;}
    const reveal=()=>{const viewport=innerHeight||document.documentElement.clientHeight;targets.forEach((el)=>{if(el.classList.contains('is-visible'))return;const r=el.getBoundingClientRect();if(r.top<viewport*.92&&r.bottom>0)el.classList.add('is-visible');});};
    let ticking=false;addEventListener('scroll',()=>{if(ticking)return;ticking=true;requestAnimationFrame(()=>{reveal();ticking=false;});},{passive:true});addEventListener('resize',reveal,{passive:true});reveal();setTimeout(reveal,150);setTimeout(reveal,600);
  };
  const removeCheckoutMap=()=>document.querySelectorAll('#scheduleList .item').forEach((item)=>{const title=item.querySelector('.event-title');if(title?.textContent.trim()==='チェックアウト')item.querySelector('.map')?.remove();});
  const init=()=>{renderSpots();renderStay();injectSpotStyle();applyHero();initReveal();removeCheckoutMap();setTimeout(removeCheckoutMap,300);setTimeout(removeCheckoutMap,900);};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();