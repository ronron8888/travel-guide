var travel = window.travel = {
  eyebrow: "TRAVEL GUIDE",
  title: "TRAVEL GUIDE",
  dates: "2026.09.03 — 2026.09.04",
  overview: [
    { label: "行き先", value: "長瀞・川越" },
    { label: "集合", value: "10:30 熊谷駅 / 11:00" },
    { label: "テーマ", value: "長瀞温泉と川越食べ歩きの旅" }
  ],
  schedule: [
    { time: "10:30", title: "一部メンバー集合", description: "一部メンバーは10:30に熊谷駅へ集合", map: "https://www.google.com/maps/search/?api=1&query=熊谷駅" },
    { time: "11:00", title: "集合", description: "集合時間 11:00。集合場所は確定後に入力", map: "https://www.google.com/maps" },
    { time: "12:00", title: "ランチ", description: "12:00からランチ。", map: "https://www.google.com/maps" },
    { time: "13:00", title: "長瀞へ移動", description: "ランチ後、長瀞の花湯別邸へ移動", map: "https://www.google.com/maps" },
    { time: "15:00", title: "花湯別邸 チェックイン", description: "15:00〜 チェックイン。温泉・岩盤浴などを楽しむ", map: "https://www.google.com/maps" },
    { time: "18:00", title: "花湯別邸", description: "夕食・温泉・岩盤浴を楽しみながらゆっくり過ごす", map: "https://www.google.com/maps" },
    { time: "10:00", title: "チェックアウト", description: "花湯別邸をチェックアウト。2日目は川越へ移動", map: "https://www.google.com/maps" },
    { time: "11:00", title: "2日目・川越散策", description: "川越で食べ歩き・お土産探し。気になるスポットを自由に巡る", map: "https://www.google.com/maps" },
    { time: "—", title: "各自帰宅", description: "川越散策後、各自のタイミングで帰宅", map: "https://www.google.com/maps" }
  ],
  stay: [
    { name: "花湯別邸", note: "埼玉県秩父郡長瀞町本野上47-1｜チェックイン15:00〜・チェックアウト10:00｜オールインクルーシブ", map: "https://www.google.com/maps/search/?api=1&query=花湯別邸", url: "https://hanayu-bettei.com/", image: "https://trvimg.r10s.jp/share/image_up/178289/origin/84f3722485fbfb8d8d5e5b7056fd223de1b75009.47.1.26.2.jpg?fit=inside%7C2850%3A1602" }
  ],
  food: [
    { name: "みっふぃー蔵のきっちん＆べーかりー川越店", note: "焼きたてパンやお土産・キッチン雑貨をチェック", url: "https://miffykitchenbakery.jp/", image: null },
    { name: "小江戸川越 元町テラス", note: "芋チップスやクロッフルなどのスイーツ", url: "https://kawagoe-motomachi-terrace.com/", image: null },
    { name: "えびす庵", note: "だし巻玉子串など、川越の蔵造りの街並みで食べ歩き", url: "https://www.instagram.com/ebisuan.222/", image: "https://tblg.k-img.com/restaurant/images/Rvw/339436/640x640_rect_acc56f012d63170579a91f79057d9038.jpg" },
    { name: "川越バターサンド", note: "川越でチェックしたいバターサンド候補", url: "https://kawagoe-buttersand.com/", image: null },
    { name: "抹茶あらた", note: "狭山茶と抹茶を使ったドリンクや和スイーツ", url: "https://matcha-arata.jp/", image: null },
    { name: "リビスコ川越店", note: "毎朝、新鮮な牛乳と生の果物から作るジェラート", url: "https://libisco.com/", image: null },
    { name: "小江戸釜めし 鳥清（とりせい）", note: "時の鐘すぐ近く。炊きたての釜めしと鶏料理が楽しめる", url: "https://kawagoe.fun/magazine/gourmet/kawagoe-torisei/", image: "https://stat.ameba.jp/user_images/20240408/11/korokoro0105/72/c6/j/o3303220215423097735.jpg" },
    { name: "亀屋", note: "川越の老舗菓子店。公式サイトから商品・店舗情報を確認", url: "https://www.koedo-kameya.com/", image: null },
    { name: "Mio Casalo", note: "川越の気になるグルメ候補", url: "https://san-tatsu.jp/spots/421359/", image: "https://stat.ameba.jp/user_images/20221203/22/tmoumou43/f8/9b/j/o1080081015211622878.jpg" },
    { name: "うし川", note: "川越の気になるグルメ候補", url: "https://san-tatsu.jp/spots/415669/", image: "https://ximg.retty.me/crop/s400x400/q80/das/-/retty/img_repo/2l/01/33423834.jpg" }
  ],
  packing: [
    "スマートフォン・充電器",
    "財布・交通系ICカード",
    "身分証・必要な予約情報",
    "モバイルバッテリー",
    "着替え・洗面用品"
  ],
  contacts: []
};

(() => {
  const applyTripLayout = () => {
    const schedule = document.getElementById('scheduleList');
    const contactSection = document.getElementById('contact');
    const contactNav = document.querySelector('.nav a[href="#contact"]');
    if (contactNav) contactNav.remove();
    if (contactSection) contactSection.remove();
    if (!schedule || schedule.dataset.daysApplied === 'true') return;
    const items = Array.from(schedule.querySelectorAll('.item'));
    if (!items.length) return;
    const makeHeading = (number, title, sub) => {
      const heading = document.createElement('div');
      heading.className = 'trip-day-heading reveal';
      heading.innerHTML = `<div class="trip-day-number">DAY ${number}</div><div><div class="trip-day-title">${title}</div><div class="trip-day-sub">${sub}</div></div>`;
      return heading;
    };
    if (items[0]) schedule.insertBefore(makeHeading('01', '長瀞・花湯別邸', '2026.09.03 / 1日目'), items[0]);
    if (items[6]) schedule.insertBefore(makeHeading('02', '川越散策', '2026.09.04 / 2日目・各自帰宅'), items[6]);
    schedule.dataset.daysApplied = 'true';
  };
  const style = document.createElement('style');
  style.textContent = `.trip-day-heading{display:grid;grid-template-columns:110px 1fr;gap:25px;align-items:end;padding:34px 0 18px;border-bottom:2px solid var(--ink);margin-top:18px;opacity:0;transform:translateY(22px);transition:opacity .7s var(--ease),transform .7s var(--ease)}.trip-day-heading.is-visible{opacity:1;transform:none}.trip-day-number{font-size:10px;font-weight:800;letter-spacing:.18em}.trip-day-title{font-size:clamp(2rem,4vw,4rem);font-weight:900;letter-spacing:-.07em;line-height:.9}.trip-day-sub{font-size:10px;color:var(--sub);letter-spacing:.1em;margin-top:8px}@media(max-width:700px){.trip-day-heading{grid-template-columns:1fr;gap:8px;padding:28px 0 16px}.trip-day-title{font-size:2.5rem}}`;
  document.head.appendChild(style);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyTripLayout, { once:true }); else applyTripLayout();
  window.setTimeout(applyTripLayout, 200);
  window.setTimeout(applyTripLayout, 800);
})();

// Two-image hero: Hanayu Bettei for day 1 + Kawagoe for day 2.
(() => {
  const applyHero = () => {
    const hero = document.querySelector('.hero-image');
    if (!hero) return;
    hero.style.backgroundImage = "url('https://trvimg.r10s.jp/share/image_up/178289/origin/84f3722485fbfb8d8d5e5b7056fd223de1b75009.47.1.26.2.jpg?fit=inside%7C2850%3A1602'),url('assets/hero-kawagoe.svg?v=20260809')";
    hero.style.backgroundSize = '50% 100%, 50% 100%';
    hero.style.backgroundPosition = 'left center, right center';
    hero.style.backgroundRepeat = 'no-repeat';
    const responsive = document.createElement('style');
    responsive.textContent = `.hero-image{background-color:#ddd}@media(max-width:700px){.hero-image{background-size:100% 50%,100% 50%;background-position:center top,center bottom;background-repeat:no-repeat}}`;
    document.head.appendChild(responsive);
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyHero, { once:true }); else applyHero();
})();
