(() => {
  const initMapFix = () => {
    const style = document.createElement('style');
    style.textContent = `
      .map-fix-link{display:inline-flex;align-items:center;gap:8px;margin-top:14px;padding:4px 9px 4px 11px;border:1px solid rgba(17,17,17,.18);border-radius:999px;color:inherit;text-decoration:none;font-size:11px;font-weight:800;letter-spacing:.12em;line-height:1;transition:background .35s var(--ease),transform .35s var(--ease),border-color .35s var(--ease)}
      .map-fix-link .map-fix-icon{display:inline-flex;align-items:center;justify-content:center;width:21px;height:21px;font-size:21px;line-height:1;letter-spacing:0;transition:transform .35s var(--ease)}
      .map-fix-link:hover{background:var(--accent);border-color:var(--accent);transform:translateX(2px)}
      .map-fix-link:hover .map-fix-icon{transform:translateY(-2px)}
      .schedule .map.map-fix-link{margin-top:0}.food-card-map{margin-top:13px}
      @media(max-width:700px){.map-fix-link{font-size:11px;padding:5px 10px 5px 12px}.map-fix-link .map-fix-icon{width:22px;height:22px;font-size:22px}.schedule .map.map-fix-link{justify-content:flex-start}}
      @media(hover:none){.map-fix-link:hover{transform:none;background:transparent;border-color:rgba(17,17,17,.18)}.map-fix-link:hover .map-fix-icon{transform:none}}
    `;
    document.head.appendChild(style);
    const makeMapLink = (url, extraClass = '') => {
      if (!url) return null;
      const a = document.createElement('a'); a.className=`map-fix-link ${extraClass}`.trim(); a.href=url; a.target='_blank'; a.rel='noopener noreferrer'; a.setAttribute('aria-label','MAPを開く'); a.innerHTML='<span class="map-fix-label">MAP</span><span class="map-fix-icon" aria-hidden="true">⌖</span>'; return a;
    };
    if (window.travel?.schedule) {
      document.querySelectorAll('#scheduleList .item').forEach((item,index)=>{const existing=item.querySelector('.map');const data=travel.schedule[index];if(existing)existing.remove();if(!data?.map)return;const map=makeMapLink(data.map,'map');const title=item.querySelector('.event-title');const description=item.querySelector('.event-desc');(description||title||item).insertAdjacentElement('afterend',map);});
    }
    if (window.travel?.food) {
      document.querySelectorAll('#foodGrid .food-card').forEach((card,index)=>{card.querySelector('.food-card-map')?.remove();const data=travel.food[index];if(!data?.map)return;const detail=card.querySelector('.food-card-detail');const map=makeMapLink(data.map,'food-card-map');if(detail)detail.insertAdjacentElement('afterend',map);});
    }
    document.querySelectorAll('#scheduleList .item').forEach((item)=>{const title=item.querySelector('.event-title');if(title?.textContent.trim()==='チェックアウト')item.querySelector('.map-fix-link')?.remove();});
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',initMapFix,{once:true});else initMapFix();
  window.setTimeout(initMapFix,500);
})();

/* Final SPOTS visual/interaction safeguard.  This runs after the card renderer and the MAP fixer. */
(() => {
  const repair = () => {
    const grid=document.getElementById('foodGrid');
    if(!grid || !window.travel?.food?.length) return;
    const head=document.querySelector('#spots .section-head');
    if(head && grid.parentElement!==head) head.appendChild(grid);
    grid.classList.remove('spots'); grid.classList.add('food-grid');
    grid.style.setProperty('grid-auto-rows','auto','important');
    grid.style.setProperty('height','auto','important');
    const cards=Array.from(grid.querySelectorAll('.food-card'));
    cards.forEach((card,index)=>{
      const item=travel.food[index]; if(!item)return;
      card.classList.remove('reveal','is-visible');
      card.style.setProperty('opacity','1','important'); card.style.setProperty('visibility','visible','important'); card.style.setProperty('transform','none','important');
      let body=card.querySelector('.food-card-body');
      if(!body){
        body=document.createElement('div'); body.className='food-card-body'; card.appendChild(body);
      }
      body.innerHTML=`<div class="eyebrow">FOOD / KAWAGOE</div><h3 class="food-card-name"><a class="food-card-name-link" href="${item.url||'#'}" target="_blank" rel="noopener noreferrer">${String(item.name||'')}</a></h3><p class="food-card-note">${String(item.note||'')}</p><div class="food-card-actions"><a class="food-card-detail" href="${item.url||'#'}" target="_blank" rel="noopener noreferrer">DETAILS <span>↗</span></a></div>`;
      body.style.setProperty('display','flex','important'); body.style.setProperty('opacity','1','important'); body.style.setProperty('visibility','visible','important'); body.style.setProperty('color','var(--ink)','important'); body.style.setProperty('transform','none','important');
      const actions=body.querySelector('.food-card-actions');
      let map=card.querySelector('.food-card-map');
      if(!map && item.map){map=makeMapLink(item.map,'food-card-map'); if(actions)actions.appendChild(map); else card.appendChild(map);}
      if(map){map.style.setProperty('opacity','1','important');map.style.setProperty('visibility','visible','important');map.style.setProperty('pointer-events','auto','important');}
    });
    const s=document.getElementById('final-spots-visibility-style'); if(s)s.remove();
    const style=document.createElement('style');style.id='final-spots-visibility-style';style.textContent=`
      #spots .section-head{display:grid!important;grid-template-columns:1fr 2fr!important;gap:40px!important;align-items:start!important}
      #spots #foodGrid{grid-column:1/-1!important;width:100%!important;display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:18px!important;margin-top:45px!important;margin-bottom:120px!important;grid-auto-rows:auto!important;height:auto!important}
      #spots #foodGrid .food-card{display:flex!important;flex-direction:column!important;height:auto!important;min-height:390px!important;overflow:hidden!important;opacity:1!important;visibility:visible!important;transform:none!important;color:var(--ink)!important}
      #spots #foodGrid .food-card:hover{transform:translateY(-3px)!important}
      #spots #foodGrid .food-card-body{display:flex!important;flex:1 1 auto!important;flex-direction:column!important;justify-content:flex-start!important;opacity:1!important;visibility:visible!important;color:var(--ink)!important}
      #spots #foodGrid .food-card-name,#spots #foodGrid .food-card-note,#spots #foodGrid .food-card-actions,#spots #foodGrid .food-card-detail,#spots #foodGrid .food-card-map{opacity:1!important;visibility:visible!important}
      #spots #foodGrid .food-card-name-link,#spots #foodGrid .food-card-detail,#spots #foodGrid .food-card-map{color:var(--ink)!important;text-decoration:none!important}
      #spots #foodGrid .food-card-note{color:var(--sub)!important}
      #spots #foodGrid .food-card-actions{margin-top:auto!important;padding-top:24px!important;display:flex!important;align-items:center!important;justify-content:space-between!important;gap:12px!important}
      #spots #foodGrid .food-card-map{display:inline-flex!important;align-items:center!important;justify-content:center!important;gap:8px!important;min-height:38px!important;padding:5px 8px 5px 12px!important;border:1px solid var(--ink)!important;border-radius:999px!important;background:transparent!important;color:var(--ink)!important;font-size:11px!important;font-weight:800!important;letter-spacing:.14em!important;pointer-events:auto!important;position:relative!important;z-index:50!important}
      #spots #foodGrid .food-card-map .map-fix-icon{display:inline-flex!important;align-items:center!important;justify-content:center!important;width:25px!important;height:25px!important;border:1px solid currentColor!important;border-radius:50%!important;font-size:17px!important}
      #spots #foodGrid .food-card-map:hover{background:var(--ink)!important;color:var(--white)!important;transform:translateY(-2px)!important}
      @media(max-width:1100px){#spots #foodGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
      @media(max-width:700px){#spots .section-head{grid-template-columns:1fr!important}#spots #foodGrid{grid-column:1!important;grid-template-columns:1fr!important;margin-top:30px!important;margin-bottom:80px!important;gap:16px!important}#spots #foodGrid .food-card{min-height:0!important}#spots #foodGrid .food-card:hover{transform:none!important}}
    `;document.head.appendChild(style);
  };
  const makeMapLink=(url,extraClass='')=>{const a=document.createElement('a');a.className=`map-fix-link ${extraClass}`.trim();a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','MAPを開く');a.innerHTML='<span class="map-fix-label">MAP</span><span class="map-fix-icon" aria-hidden="true">⌖</span>';return a;};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',repair,{once:true});else repair();
  [200,700,1400,2200].forEach(ms=>setTimeout(repair,ms));
})();