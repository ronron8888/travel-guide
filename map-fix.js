(() => {
  const initMapFix = () => {
    const style = document.createElement('style');
    style.textContent = `
      /* Unified MAP treatment for PLAN + SPOTS */
      .map-fix-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        margin-top: 14px;
        padding: 4px 9px 4px 11px;
        border: 1px solid rgba(17,17,17,.18);
        border-radius: 999px;
        color: inherit;
        text-decoration: none;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .12em;
        line-height: 1;
        transition: background .35s var(--ease), transform .35s var(--ease), border-color .35s var(--ease);
      }
      .map-fix-link .map-fix-icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 21px;
        height: 21px;
        font-size: 21px;
        line-height: 1;
        letter-spacing: 0;
        transition: transform .35s var(--ease);
      }
      .map-fix-link:hover {
        background: var(--accent);
        border-color: var(--accent);
        transform: translateX(2px);
      }
      .map-fix-link:hover .map-fix-icon { transform: translateY(-2px); }
      .schedule .map.map-fix-link { margin-top: 0; }
      .food-card-map { margin-top: 13px; }
      @media(max-width:700px) {
        .map-fix-link { font-size: 11px; padding: 5px 10px 5px 12px; }
        .map-fix-link .map-fix-icon { width: 22px; height: 22px; font-size: 22px; }
        .schedule .map.map-fix-link { justify-content: flex-start; }
      }
      @media(hover:none) {
        .map-fix-link:hover { transform:none; background:transparent; border-color:rgba(17,17,17,.18); }
        .map-fix-link:hover .map-fix-icon { transform:none; }
      }
    `;
    document.head.appendChild(style);

    const makeMapLink = (url, extraClass = '') => {
      if (!url) return null;
      const a = document.createElement('a');
      a.className = `map-fix-link ${extraClass}`.trim();
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.setAttribute('aria-label', 'MAPを開く');
      a.innerHTML = '<span class="map-fix-label">MAP</span><span class="map-fix-icon" aria-hidden="true">⌖</span>';
      return a;
    };

    // PLAN: replace any previous MAP presentation with one consistent real DOM link.
    if (window.travel?.schedule) {
      document.querySelectorAll('#scheduleList .item').forEach((item, index) => {
        const existing = item.querySelector('.map');
        const data = travel.schedule[index];
        if (existing) existing.remove();
        if (!data?.map) return;
        const map = makeMapLink(data.map, 'map');
        const title = item.querySelector('.event-title');
        const description = item.querySelector('.event-desc');
        const target = description || title || item;
        target.insertAdjacentElement('afterend', map);
      });
    }

    // SPOTS: add MAP under each card's existing DETAILS link.
    if (window.travel?.food) {
      document.querySelectorAll('#foodGrid .food-card').forEach((card, index) => {
        card.querySelector('.food-card-map')?.remove();
        const data = travel.food[index];
        if (!data?.map) return;
        const detail = card.querySelector('.food-card-detail');
        const map = makeMapLink(data.map, 'food-card-map');
        if (detail) detail.insertAdjacentElement('afterend', map);
      });
    }

    // Explicitly keep CHECKOUT without a MAP.
    document.querySelectorAll('#scheduleList .item').forEach((item) => {
      const title = item.querySelector('.event-title');
      if (title?.textContent.trim() === 'チェックアウト') item.querySelector('.map-fix-link')?.remove();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMapFix, { once: true });
  else initMapFix();
  window.setTimeout(initMapFix, 500);
})();
