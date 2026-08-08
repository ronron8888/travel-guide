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
    { name: "花湯別邸", note: "埼玉県秩父郡長瀞町本野上47-1｜チェックイン15:00〜・チェックアウト10:00｜オールインクルーシブ", map: "https://www.google.com/maps/search/?api=1&query=花湯別邸" }
  ],
  food: [
    { name: "みっふぃーきっちん＆べーかりー", note: "焼きたてパンやお土産・キッチン雑貨をチェック", url: "https://miffykitchenbakery.jp/", image: "https://www.ctrls5460.com/wp-content/uploads/2024/06/IMG_1105.jpg" },
    { name: "小江戸川越元町テラス 小江戸横丁店", note: "クロッフルや芋チップスなどのスイーツ", url: "https://kawagoe.fun/magazine/gourmet/motomachi-terrace2/", image: "https://kawagoe-motomachi-terrace.com/wp-content/uploads/2023/06/IMG_2079-scaled.jpg" },
    { name: "小江戸川越元町テラス 本店", note: "菓子屋横丁近く。クロッフルや芋チップス、かき氷", url: "https://kawagoe.fun/magazine/gourmet/motomachi-terrace2/", image: "https://tblg.k-img.com/restaurant/images/Rvw/341844/640x640_rect_cbd7859045d5f525b01ebef907b4cfa0.jpg" },
    { name: "えびす庵", note: "だし巻玉子串など、川越の蔵造りの街並みで食べ歩き", url: "https://kawagoe.fun/magazine/gourmet/ebisuan/", image: "https://tblg.k-img.com/restaurant/images/Rvw/245384/640x640_rect_361523e7bcbbf9834f90f0eec2307135.jpg" },
    { name: "川越バターサンド", note: "川越いもなどを使ったバターサンド。お土産候補", url: "https://kawagoe.fun/magazine/gourmet/kawagoe-buttersand/", image: "https://mrs.living.cdn.anymanager.io/wp-content/uploads/2025/12/tkh_1342/0_Eye-Catch-1.jpg" },
    { name: "抹茶あらた", note: "抹茶クレープや抹茶ラテなどの抹茶専門店", url: "https://kawagoe.fun/magazine/gourmet/arata/", image: "https://stat.ameba.jp/user_images/20231114/19/hifumi4/ac/8a/j/o1080103815364434164.jpg" },
    { name: "リビスコ川越店", note: "毎朝手作りの作りたてジェラート", url: "https://kawagoe.fun/magazine/gourmet/libisco/", image: "https://tblg.k-img.com/restaurant/images/Rvw/370067/640x640_rect_4869667ee5434fdde4e7c1fa394c51af.jpg" },
    { name: "川越トリセイ", note: "気になる川越グルメ候補", url: "https://kawagoe.fun/magazine/gourmet/kawagoe-torisei/", image: "https://stat.ameba.jp/user_images/20240408/11/korokoro0105/72/c6/j/o3303220215423097735.jpg" },
    { name: "あらた", note: "気になる川越グルメ候補", url: "https://kawagoe.fun/magazine/gourmet/arata/", image: "https://stat.ameba.jp/user_images/20231114/19/hifumi4/ac/8a/j/o1080103815364434164.jpg" },
    { name: "亀屋 菓子七", note: "気になる川越グルメ・お土産候補", url: "https://kawagoe.fun/magazine/gourmet/kameya-kashichi/", image: "https://ak-d.tripcdn.com/images/1mi73224x92b94uei9474.jpg?proc=source%2Ftrip" },
    { name: "川越の気になるスポット①", note: "候補リストから詳細を確認", url: "https://san-tatsu.jp/spots/421359/", image: "https://koedo.or.jp/wp-content/uploads/018499d5096841e2ac350b62fa6c2fee-scaled.jpg" },
    { name: "川越の気になるスポット②", note: "候補リストから詳細を確認", url: "https://san-tatsu.jp/spots/415669/", image: "https://prd-static.gltjp.com/glt/data/directory/16000/15169/20231209_211916_1048806e_w1920.jpg" }
  ],
  packing: [
    "スマートフォン・充電器",
    "財布・交通系ICカード",
    "身分証・必要な予約情報",
    "モバイルバッテリー",
    "着替え・洗面用品"
  ],
  contacts: [
    { label: "幹事", value: "名前・連絡先" },
    { label: "集合場所", value: "場所・住所" },
    { label: "緊急時", value: "必要な連絡先" }
  ]
};
