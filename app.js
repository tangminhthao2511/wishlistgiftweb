/**
 * WISHLIST CỦA EM IU - ROMANTIC GIFT WISHLIST & LUCKY WHEEL
 */

const STORAGE_KEY = 'mt_love_wishlist_v1';
const ADMIN_SESSION_KEY = 'mt_love_admin_unlocked';

// Helper to render inline SVG outline icon from sprite in index.html
function svgIcon(name, extraClass = '') {
  return `<svg class="icon-outline ${extraClass}" aria-hidden="true"><use href="#icon-${name}"></use></svg>`;
}

// Default Sample Gifts (Cute, persuasive, ready to inspire or edit)
const DEFAULT_DATA = {
  settings: {
    gfName: 'Minh Thảo (Bé Iu)',
    bfName: 'Anh Iu',
    occasionTitle: 'Dịp Đặc Biệt Sắp Tới',
    occasionDate: getFutureDateString(14),
    heroMessage:
      'Để anh không bao giờ phải đau đầu suy nghĩ "Sắp tới tặng gì cho em bây giờ?", em đã chuẩn bị sẵn danh sách những món đồ làm em cười tít mắt cả ngày ở đây nè! Chỉ cần anh tặng là em vui gấp ngàn lần rùiii!',
    adminPin: '1402',
    cloudUrl: ''
  },
  gifts: [
    {
      id: 'gift-1',
      name: 'Son Dior Addict Lip Glow',
      price: 950000,
      image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&w=800&q=80',
      desire: 'urgent',
      occasion: 'unconditional',
      status: 'available',
      link: 'https://shopee.vn/search?keyword=son%20dior%20addict%20lip%20glow',
      specs: 'Màu 001 Pink hoặc 004 Coral',
      note: 'Thỏi son cũ của em sắp chạm đáy rùiii! Có thỏi này đánh lên môi hồng hào xinh xắn đi hẹn hò với anh là hết nước chấm luôn!',
      perk: 'Tặng kèm 20 cái thơm má có dấu son môi',
      createdAt: Date.now() - 500000
    },
    {
      id: 'gift-2',
      name: 'Nước Hoa Miss Dior Blooming Bouquet',
      price: 2650000,
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&w=800&q=80',
      desire: 'high',
      occasion: 'birthday',
      status: 'available',
      link: 'https://shopee.vn/search?keyword=miss%20dior%20blooming%20bouquet',
      specs: 'Bản 50ml - Mùi hoa mẫu đơn ngọt dịu tiểu thư',
      note: 'Em mê mùi này chữ ê kéo dài luôn á! Mỗi lần xịt đi cạnh anh là anh chỉ muốn ôm em mãi không rời thôi!',
      perk: 'Đặc quyền ôm em thơm phức mỗi buổi hẹn hò + Miễn giận dỗi 1 tháng',
      createdAt: Date.now() - 400000
    },
    {
      id: 'gift-3',
      name: 'Túi Xách Nhỏ Xinh Đi Chơi Cùng Anh',
      price: 780000,
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      desire: 'high',
      occasion: 'anniversary',
      status: 'available',
      link: 'https://shopee.vn/search?keyword=tui%20xach%20nu%20kem%20hong',
      specs: 'Màu Trắng Kem hoặc Hồng Pastel',
      note: 'Em ngắm chiếc túi này mấy tuần nay rồi đó! Phối với váy đi ăn tối kỷ niệm với anh là xinh như công chúa luôn!',
      perk: '1 buổi tối hẹn hò lãng mạn do em lên đồ siêu xinh cho anh ngắm',
      createdAt: Date.now() - 300000
    },
    {
      id: 'gift-4',
      name: 'Vòng Tay Bạc Đính Đá Lấp Lánh',
      price: 650000,
      image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=800&q=80',
      desire: 'medium',
      occasion: 'valentine',
      status: 'available',
      link: 'https://shopee.vn/search?keyword=lac%20tay%20bac%20nu',
      specs: 'Cổ tay em 15cm, mẫu mảnh nhẹ nhàng',
      note: 'Đeo trên tay lúc nào nhìn xuống cũng nhớ tới người tặng hết trơn á!',
      perk: 'Nắm tay anh đi dạo phố cả buổi tối không buông',
      createdAt: Date.now() - 200000
    },
    {
      id: 'gift-5',
      name: 'Bó Hoa Hồng Phấn Khổng Lồ + Gấu Bông',
      price: 450000,
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&w=800&q=80',
      desire: 'urgent',
      occasion: 'womensday',
      status: 'available',
      link: 'https://shopee.vn/search?keyword=bo%20hoa%20hong%20sap%20gau%20bong',
      specs: 'Tone màu hồng pastel giấy gói Hàn Quốc',
      note: 'Con gái ai cũng thích được nhận hoa bất ngờ hết á, nhất là từ người mình thương nhất trần đời!',
      perk: '100 tấm ảnh sống ảo khoe người yêu tâm lý nhất vũ trụ',
      createdAt: Date.now() - 100000
    },
    {
      id: 'gift-6',
      name: 'Máy Ảnh KTS / Instax Chụp Kỷ Niệm Đôi Mình',
      price: 2150000,
      image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
      desire: 'high',
      occasion: 'christmas',
      status: 'available',
      link: 'https://shopee.vn/search?keyword=fujifilm%20instax%20mini%2012%20pink',
      specs: 'Bản màu Blossom Pink (Hồng Phấn)',
      note: 'Mỗi chuyến đi chơi của tụi mình sẽ in ra ảnh liền tay để dán đầy góc phòng luôn nha anh iu!',
      perk: 'Tặng anh cuốn album kỷ niệm tình yêu siêu đáng yêu của 2 đứa',
      createdAt: Date.now() - 50000
    }
  ]
};

function getFutureDateString(daysAhead) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

// Labels mapping with outline icons
const DESIRE_LABELS = {
  urgent: {
    html: `${svgIcon('flame', 'icon-xs')} Cần gấp lắm rồi`,
    text: 'Cần gấp lắm rồi',
    weight: 3
  },
  high: {
    html: `${svgIcon('heart', 'icon-xs')} Mê chữ ê kéo dài`,
    text: 'Mê chữ ê kéo dài',
    weight: 2
  },
  medium: {
    html: `${svgIcon('flower', 'icon-xs')} Thích sương sương`,
    text: 'Thích sương sương',
    weight: 1
  }
};

const OCCASION_LABELS = {
  unconditional: {
    html: `${svgIcon('gift', 'icon-xs')} Tặng vô điều kiện`,
    text: 'Tặng vô điều kiện'
  },
  birthday: {
    html: `${svgIcon('cake', 'icon-xs')} Sinh nhật`,
    text: 'Sinh nhật'
  },
  anniversary: {
    html: `${svgIcon('hearts', 'icon-xs')} Kỷ niệm yêu`,
    text: 'Kỷ niệm yêu'
  },
  valentine: {
    html: `${svgIcon('heart', 'icon-xs')} Valentine`,
    text: 'Valentine'
  },
  womensday: {
    html: `${svgIcon('flower', 'icon-xs')} 8/3 & 20/10`,
    text: '8/3 & 20/10'
  },
  christmas: {
    html: `${svgIcon('sparkles', 'icon-xs')} Giáng sinh / Năm mới`,
    text: 'Giáng sinh / Năm mới'
  }
};

const SWEET_PERSUASION_TIPS = [
  'Mẹo nhỏ: Con gái nói "em không cần quà đâu" nghĩa là anh hãy chọn 1 món trong danh sách này đó =))))',
  'Khoa học chứng minh: Tặng quà trong Wishlist giúp bạn gái vui vẻ, dịu dàng và chiều người yêu gấp 10 lần!',
  'Nếu anh phân vân vì món nào cũng xinh, hãy bấm "Vòng Quay Bất Ngờ" để vũ trụ chọn giúp anh nha!',
  'Đầu tư vào nụ cười của bạn gái là khoản đầu tư sinh lời hạnh phúc nhất thế gian!',
  'Những món có gắn nhãn "Cần gấp lắm rồi" là em ngắm mỗi tối trước khi đi ngủ đó anh iu ơi~'
];

// Application State
let appData = loadInitialData();
let isAdmin = sessionStorage.getItem(ADMIN_SESSION_KEY) === 'true';
let currentFilters = {
  occasion: 'all',
  desire: 'all',
  price: 'all',
  status: 'all',
  search: '',
  sort: 'desire-desc'
};

// Wheel State
let wheelPool = [];
let wheelAngle = 0;
let isSpinning = false;
let currentWinnerGift = null;
let uploadedImageDataUrl = '';

// Audio Context for Wheel Ticks & Fanfare
let audioCtx = null;

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', async () => {
  initFloatingHearts();
  initSweetToasts();
  bindEvents();

  // Check URL params for Cloud Sync or Embedded Share Data
  await checkUrlSyncOrLocalServer();

  renderAll();
});

function loadInitialData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.gifts)) {
        return {
          settings: { ...DEFAULT_DATA.settings, ...(parsed.settings || {}) },
          gifts: parsed.gifts
        };
      }
    }
  } catch (e) {
    console.warn('Could not parse localStorage:', e);
  }
  return JSON.parse(JSON.stringify(DEFAULT_DATA));
}

async function checkUrlSyncOrLocalServer() {
  const params = new URLSearchParams(window.location.search);
  const cloudParam = params.get('cloud');

  // If link was opened by boyfriend with ?view=boyfriend, force boyfriend view initially
  if (params.get('view') === 'boyfriend') {
    isAdmin = false;
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
  }

  // 1. Check URL Hash for encoded portable data (#share=...)
  if (window.location.hash && window.location.hash.startsWith('#share=')) {
    try {
      const encoded = window.location.hash.replace('#share=', '');
      const jsonStr = decodeURIComponent(escape(atob(encoded)));
      const sharedData = JSON.parse(jsonStr);
      if (sharedData && Array.isArray(sharedData.gifts)) {
        appData = {
          settings: { ...DEFAULT_DATA.settings, ...(sharedData.settings || {}) },
          gifts: sharedData.gifts
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        updateSyncBadge('Đã tải từ Link chia sẻ', false);
      }
    } catch (err) {
      console.warn('Hash share decode error:', err);
    }
  }

  // 2. Check Cloud URL from query param or saved settings
  const targetCloudUrl = cloudParam || appData.settings.cloudUrl;
  if (targetCloudUrl) {
    if (cloudParam && cloudParam !== appData.settings.cloudUrl) {
      appData.settings.cloudUrl = cloudParam;
    }
    await pullFromCloud(targetCloudUrl);
    return;
  }

  // 3. Try local server API (/api/wishlist) if running via node server.js
  try {
    const res = await fetch('/api/wishlist', { cache: 'no-store' });
    if (res.ok) {
      const serverData = await res.json();
      if (serverData && Array.isArray(serverData.gifts) && serverData.gifts.length > 0) {
        appData = serverData;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
        updateSyncBadge('Đã đồng bộ Server', false);
      }
    }
  } catch (_) {
    // Static mode is totally fine
  }
}

async function saveData(syncMessage = 'Đã lưu & đồng bộ') {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
  updateSyncBadge('Đang lưu...', true);

  // Save to local server if available
  try {
    await fetch('/api/wishlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appData)
    });
  } catch (_) {
    // Ignore when hosted purely static
  }

  // Push to Cloud URL if configured
  if (appData.settings.cloudUrl) {
    try {
      await pushToCloud(appData.settings.cloudUrl, appData);
      updateSyncBadge('Đã đồng bộ Cloud', false);
      return;
    } catch (err) {
      console.warn('Cloud push error:', err);
      updateSyncBadge('Lưu trên máy (Cloud lỗi)', false);
      return;
    }
  }

  updateSyncBadge(syncMessage, false);
}

async function pullFromCloud(url) {
  try {
    updateSyncBadge('Đang tải dữ liệu Cloud...', true);
    const res = await fetch(url, {
      method: 'GET',
      headers: { Accept: 'application/json' },
      cache: 'no-store'
    });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const remote = await res.json();
    if (remote && Array.isArray(remote.gifts)) {
      const keepCloudUrl = appData.settings.cloudUrl || url;
      appData = {
        settings: { ...DEFAULT_DATA.settings, ...(remote.settings || {}), cloudUrl: keepCloudUrl },
        gifts: remote.gifts
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(appData));
      updateSyncBadge('Đã đồng bộ Cloud', false);
    }
  } catch (e) {
    console.warn('Could not pull from cloud:', e);
    updateSyncBadge('Đang dùng bản lưu máy', false);
  }
}

async function pushToCloud(url, payload) {
  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) throw new Error('HTTP ' + res.status);
}

function updateSyncBadge(text, isSyncing) {
  const badgeText = document.getElementById('sync-status-text');
  const dot = document.querySelector('.sync-dot');
  if (badgeText) badgeText.textContent = text;
  if (dot) {
    dot.classList.toggle('syncing', Boolean(isSyncing));
  }
}

// ==========================================
// RENDER UI
// ==========================================
function renderAll() {
  renderHeaderAndHero();
  renderAdminModeState();
  renderWishlistGrid();
  updateWheelPoolAndDraw();
}

function renderHeaderAndHero() {
  const { gfName, bfName, occasionTitle, occasionDate, heroMessage } = appData.settings;

  document.getElementById('header-title').textContent = `Wishlist Của ${gfName}`;
  document.getElementById('couple-names').textContent = `${gfName} & ${bfName}`;
  document.getElementById('footer-couple').textContent = `${gfName} & ${bfName}`;
  document.getElementById('hero-heading').innerHTML = `Gửi ${escapeHtml(bfName)} thương yêu của em ${svgIcon('mail')}`;
  document.getElementById('hero-message').textContent = heroMessage;
  document.getElementById('upcoming-occasion-name').textContent =
    occasionTitle ? occasionTitle.replace(/[\u{1F300}-\u{1FAFF}]/gu, '').trim() : 'Dịp Đặc Biệt Sắp Tới';

  // Countdown calculation
  const countdownEl = document.getElementById('upcoming-countdown');
  if (occasionDate) {
    const now = new Date();
    const target = new Date(occasionDate + 'T00:00:00');
    const diffDays = Math.ceil((target - now) / (1000 * 60 * 60 * 24));
    const formattedDate = target.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    if (diffDays > 0) {
      countdownEl.innerHTML = `<span class="cd-pill">${svgIcon('clock', 'icon-xs')} Còn <strong>${diffDays} ngày</strong> nữa (${formattedDate}) • Chuẩn bị quà dần là vừa xinh nha anh</span>`;
    } else if (diffDays === 0) {
      countdownEl.innerHTML = `<span class="cd-pill">${svgIcon('sparkles', 'icon-xs')} Hôm nay là ngày đặc biệt rồi (${formattedDate})! Chốt đơn liền tay thôiii</span>`;
    } else {
      countdownEl.innerHTML = `<span class="cd-pill">${svgIcon('heart', 'icon-xs')} Ngày bất kỳ bên ${escapeHtml(bfName)} đều là ngày lễ tình nhân!</span>`;
    }
  } else {
    countdownEl.innerHTML = `<span class="cd-pill">${svgIcon('heart', 'icon-xs')} Ngày nào yêu nhau cũng là dịp tặng quà bất ngờ!</span>`;
  }

  // Happiness Meter
  const total = appData.gifts.length;
  const completedOrReserved = appData.gifts.filter(
    (g) => g.status === 'gifted' || g.status === 'reserved'
  ).length;
  const baseHappiness = 75;
  const bonus = total > 0 ? Math.round((completedOrReserved / total) * 25) : 15;
  const percent = Math.min(100, baseHappiness + bonus);

  document.getElementById('happiness-fill').style.width = `${percent}%`;
  document.getElementById('happiness-score').innerHTML =
    completedOrReserved > 0
      ? `${percent}% (+${completedOrReserved * 1000} điểm chiều chuộng)`
      : `999% Yêu ${escapeHtml(bfName)}`;
  document.getElementById('total-gifts-count').textContent = appData.gifts.filter(
    (g) => g.status !== 'gifted'
  ).length;
}

function renderAdminModeState() {
  const adminPanel = document.getElementById('admin-panel');
  const toggleBtn = document.getElementById('btn-toggle-admin');

  if (isAdmin) {
    adminPanel.classList.remove('hidden');
    toggleBtn.classList.add('active-admin');
    toggleBtn.innerHTML = `${svgIcon('crown')} Đang ở chế độ Admin`;
  } else {
    adminPanel.classList.add('hidden');
    toggleBtn.classList.remove('active-admin');
    toggleBtn.innerHTML = `${svgIcon('lock')} Quản lý (Admin)`;
  }

  // Update Admin stats
  document.getElementById('stat-total').textContent = appData.gifts.length;
  document.getElementById('stat-urgent').textContent = appData.gifts.filter(
    (g) => g.desire === 'urgent'
  ).length;
  document.getElementById('stat-reserved').textContent = appData.gifts.filter(
    (g) => g.status === 'reserved'
  ).length;
  document.getElementById('stat-gifted').textContent = appData.gifts.filter(
    (g) => g.status === 'gifted'
  ).length;
}

function getFilteredGifts() {
  return appData.gifts
    .filter((g) => {
      if (currentFilters.occasion !== 'all' && g.occasion !== currentFilters.occasion) return false;
      if (currentFilters.desire !== 'all' && g.desire !== currentFilters.desire) return false;
      if (currentFilters.status !== 'all' && g.status !== currentFilters.status) return false;

      if (currentFilters.price === 'under500' && g.price >= 500000) return false;
      if (currentFilters.price === '500to2m' && (g.price < 500000 || g.price > 2000000))
        return false;
      if (currentFilters.price === 'over2m' && g.price <= 2000000) return false;

      if (currentFilters.search) {
        const q = currentFilters.search.toLowerCase();
        const matchName = (g.name || '').toLowerCase().includes(q);
        const matchNote = (g.note || '').toLowerCase().includes(q);
        const matchSpecs = (g.specs || '').toLowerCase().includes(q);
        if (!matchName && !matchNote && !matchSpecs) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (currentFilters.sort === 'desire-desc') {
        const wA = DESIRE_LABELS[a.desire]?.weight || 1;
        const wB = DESIRE_LABELS[b.desire]?.weight || 1;
        if (wB !== wA) return wB - wA;
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      if (currentFilters.sort === 'newest') {
        return (b.createdAt || 0) - (a.createdAt || 0);
      }
      if (currentFilters.sort === 'price-asc') {
        return (a.price || 0) - (b.price || 0);
      }
      if (currentFilters.sort === 'price-desc') {
        return (b.price || 0) - (a.price || 0);
      }
      return 0;
    });
}

function renderWishlistGrid() {
  const grid = document.getElementById('wishlist-grid');
  const emptyState = document.getElementById('empty-state');
  const items = getFilteredGifts();

  if (items.length === 0) {
    grid.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  grid.innerHTML = items.map((gift) => createGiftCardHTML(gift)).join('');

  // Attach card event listeners
  grid.querySelectorAll('[data-action]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const action = btn.getAttribute('data-action');
      const id = btn.getAttribute('data-id');
      handleCardAction(action, id);
    });
  });
}

function createGiftCardHTML(gift) {
  const desireInfo = DESIRE_LABELS[gift.desire] || DESIRE_LABELS.high;
  const occasionInfo = OCCASION_LABELS[gift.occasion] || OCCASION_LABELS.unconditional;
  const formattedPrice = formatCurrency(gift.price);
  const safeImg = gift.image || createFallbackSVGDataUrl(gift.name);

  let statusRibbonHTML = '';
  if (gift.status === 'reserved') {
    statusRibbonHTML = `<span class="status-ribbon reserved">${svgIcon('cart', 'icon-xs')} Anh đã chốt đơn!</span>`;
  } else if (gift.status === 'gifted') {
    statusRibbonHTML = `<span class="status-ribbon gifted">${svgIcon('check', 'icon-xs')} Đã tặng thành công</span>`;
  }

  const reserveBtnLabel =
    gift.status === 'reserved'
      ? `${svgIcon('check', 'icon-xs')} Đã chốt`
      : gift.status === 'gifted'
      ? `${svgIcon('gift', 'icon-xs')} Đã tặng`
      : `${svgIcon('heart', 'icon-xs')} Sẽ mua`;

  const buyBtnHTML = gift.link
    ? `<a href="${escapeHtml(gift.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-glow full-width">
         ${svgIcon('bag')} Chốt Đơn Cho Bé Iu
       </a>`
    : `<button class="btn btn-primary-glow full-width" data-action="detail" data-id="${gift.id}">
         ${svgIcon('gift')} Xem Chi Tiết &amp; Chốt Đơn
       </button>`;

  const adminControlsHTML = isAdmin
    ? `<div class="admin-card-controls">
         <button class="btn btn-soft-pink" data-action="edit" data-id="${gift.id}">${svgIcon('edit', 'icon-xs')} Sửa</button>
         <button class="btn btn-outline-pink" data-action="delete" data-id="${gift.id}">${svgIcon('trash', 'icon-xs')} Xoá</button>
       </div>`
    : '';

  return `
    <article class="gift-card desire-${gift.desire} status-${gift.status}">
      <div class="card-image-box" data-action="detail" data-id="${gift.id}">
        <img src="${escapeHtml(safeImg)}" alt="${escapeHtml(gift.name)}" loading="lazy" onerror="this.src='${createFallbackSVGDataUrl(gift.name)}'" />
        <div class="card-top-badges">
          <span class="desire-badge ${gift.desire}">${desireInfo.html}</span>
          <span class="occasion-badge">${occasionInfo.html}</span>
        </div>
        ${statusRibbonHTML}
      </div>

      <div class="card-body">
        <div class="card-title-row">
          <h3 class="card-title" data-action="detail" data-id="${gift.id}">${escapeHtml(gift.name)}</h3>
          <span class="card-price">${formattedPrice}</span>
        </div>

        ${gift.specs ? `<div class="card-specs">${svgIcon('tag', 'icon-xs')} Phân loại: ${escapeHtml(gift.specs)}</div>` : ''}

        <div class="sweet-note-bubble">
          “${escapeHtml(gift.note || 'Món này xinh xỉu luôn á anh iu ơi!')}”
        </div>

        ${
          gift.perk
            ? `<div class="perk-box">
                 ${svgIcon('award', 'icon-xs')}
                 <span>Đặc quyền cho anh: ${escapeHtml(gift.perk)}</span>
               </div>`
            : ''
        }

        <div class="card-actions">
          ${buyBtnHTML}
          <div class="card-secondary-actions">
            <button class="btn btn-soft-pink" data-action="toggle-reserve" data-id="${gift.id}">
              ${reserveBtnLabel}
            </button>
            <button class="btn btn-outline-pink" data-action="toggle-gifted" data-id="${gift.id}" title="Đánh dấu đã tặng">
              ${gift.status === 'gifted' ? `${svgIcon('refresh', 'icon-xs')} Chưa tặng` : `${svgIcon('gift', 'icon-xs')} Đã tặng`}
            </button>
          </div>
          ${adminControlsHTML}
        </div>
      </div>
    </article>
  `;
}

function handleCardAction(action, id) {
  const gift = appData.gifts.find((g) => g.id === id);
  if (!gift) return;

  if (action === 'detail') {
    openDetailModal(gift);
  } else if (action === 'toggle-reserve') {
    gift.status = gift.status === 'reserved' ? 'available' : 'reserved';
    if (gift.status === 'reserved') {
      launchConfetti();
      playVictorySound();
      showSweetToast(`Á à! Anh vừa nhắm món "${gift.name}" cho bé iu! +1000 điểm người yêu quốc dân!`);
    }
    saveData();
    renderAll();
  } else if (action === 'toggle-gifted') {
    gift.status = gift.status === 'gifted' ? 'available' : 'gifted';
    if (gift.status === 'gifted') {
      launchConfetti();
      playVictorySound();
      showSweetToast(`Tuyệt vời! Món "${gift.name}" đã được tặng thành công! Yêu anh nhất trần đời!`);
    }
    saveData();
    renderAll();
  } else if (action === 'edit') {
    openGiftFormModal(gift);
  } else if (action === 'delete') {
    if (confirm(`Bạn có chắc muốn xoá món "${gift.name}" khỏi Wishlist không?`)) {
      appData.gifts = appData.gifts.filter((g) => g.id !== id);
      saveData('Đã xoá món quà');
      renderAll();
    }
  }
}

// ==========================================
// DETAIL MODAL
// ==========================================
function openDetailModal(gift) {
  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('detail-modal-body');
  const desireInfo = DESIRE_LABELS[gift.desire] || DESIRE_LABELS.high;
  const occasionInfo = OCCASION_LABELS[gift.occasion] || OCCASION_LABELS.unconditional;
  const safeImg = gift.image || createFallbackSVGDataUrl(gift.name);

  body.innerHTML = `
    <div class="detail-layout">
      <div>
        <img class="detail-img" src="${escapeHtml(safeImg)}" alt="${escapeHtml(gift.name)}" onerror="this.src='${createFallbackSVGDataUrl(gift.name)}'" />
      </div>
      <div>
        <span class="modal-pill">${occasionInfo.html} • ${desireInfo.html}</span>
        <h2 style="color:var(--deep-plum); margin:8px 0;">${escapeHtml(gift.name)}</h2>
        <div style="font-size:1.4rem; font-weight:700; color:var(--pink-600); margin-bottom:12px;">
          ${formatCurrency(gift.price)}
        </div>
        ${
          gift.specs
            ? `<p style="font-weight:700; color:var(--soft-plum); margin-bottom:12px;">${svgIcon('tag', 'icon-xs')} Ghi chú phân loại / màu / size: <span style="color:var(--deep-plum)">${escapeHtml(gift.specs)}</span></p>`
            : ''
        }
        <div class="sweet-note-bubble" style="font-size:0.96rem;">
          ${svgIcon('mail', 'icon-xs')} <strong>Lời nhắn của Em Iu:</strong><br/>
          “${escapeHtml(gift.note)}”
        </div>
        ${
          gift.perk
            ? `<div class="perk-box" style="font-size:0.9rem; padding:10px 12px;">
                 ${svgIcon('award', 'icon-xs')} <strong>Phần thưởng cho Anh Iu:</strong> ${escapeHtml(gift.perk)}
               </div>`
            : ''
        }
        <div style="display:flex; flex-direction:column; gap:10px; margin-top:16px;">
          ${
            gift.link
              ? `<a href="${escapeHtml(gift.link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary-glow btn-large full-width">
                   ${svgIcon('bag')} Tới Nơi Mua Hàng Chốt Đơn Ngay
                 </a>`
              : ''
          }
          <button id="detail-reserve-btn" class="btn btn-soft-pink full-width">
            ${gift.status === 'reserved' ? `${svgIcon('check', 'icon-xs')} Đã chốt mua` : `${svgIcon('heart', 'icon-xs')} Sẽ mua món này`}
          </button>
        </div>
      </div>
    </div>
  `;

  document.getElementById('detail-reserve-btn').addEventListener('click', () => {
    handleCardAction('toggle-reserve', gift.id);
    modal.classList.add('hidden');
  });

  modal.classList.remove('hidden');
}

// ==========================================
// LUCKY SPIN WHEEL (VÒNG QUAY TÌNH YÊU)
// ==========================================
const SLICE_COLORS = [
  '#ff4785',
  '#ff85b3',
  '#ff2e7e',
  '#ffa6c9',
  '#e01363',
  '#ff65a3',
  '#f783ac',
  '#ffb3d1'
];

function updateWheelPoolAndDraw() {
  const occ = document.getElementById('wheel-occasion')?.value || 'all';
  const budget = document.getElementById('wheel-budget')?.value || 'all';
  const desire = document.getElementById('wheel-desire')?.value || 'all';

  wheelPool = appData.gifts.filter((g) => {
    if (g.status === 'gifted') return false; // Only ungifted gifts
    if (occ !== 'all' && g.occasion !== occ) return false;
    if (desire !== 'all' && g.desire !== desire) return false;
    if (budget === 'under500' && g.price >= 500000) return false;
    if (budget === '500to2m' && (g.price < 500000 || g.price > 2000000)) return false;
    if (budget === 'over2m' && g.price <= 2000000) return false;
    return true;
  });

  const countEl = document.getElementById('wheel-pool-count');
  if (countEl) {
    countEl.textContent =
      wheelPool.length > 0
        ? `Đang có ${wheelPool.length} món quà sẵn sàng trên vòng quay!`
        : 'Không có món quà nào khớp bộ lọc này! Hãy nới rộng bộ lọc nha!';
  }

  drawSpinWheel();
}

function drawSpinWheel() {
  const canvas = document.getElementById('spin-wheel-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const width = canvas.width;
  const height = canvas.height;
  const cx = width / 2;
  const cy = height / 2;
  const radius = width / 2 - 8;

  ctx.clearRect(0, 0, width, height);

  if (wheelPool.length === 0) {
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe3ee';
    ctx.fill();
    ctx.fillStyle = '#e01363';
    ctx.font = 'bold 16px Quicksand, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Chưa có món quà phù hợp', cx, cy - 10);
    ctx.fillText('Anh đổi bộ lọc phía trên nha!', cx, cy + 16);
    return;
  }

  const numSlices = wheelPool.length;
  const arc = (Math.PI * 2) / numSlices;

  for (let i = 0; i < numSlices; i++) {
    const startAngle = wheelAngle + i * arc;
    const endAngle = startAngle + arc;

    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.arc(cx, cy, radius, startAngle, endAngle);
    ctx.closePath();

    ctx.fillStyle = SLICE_COLORS[i % SLICE_COLORS.length];
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#ffffff';
    ctx.stroke();

    // Draw gift text inside slice (with outline heart symbol ♡)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(startAngle + arc / 2);
    ctx.textAlign = 'right';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13.5px Quicksand, sans-serif';
    const label = truncateText(wheelPool[i].name, 20);
    ctx.fillText('♡ ' + label, radius - 18, 5);
    ctx.restore();
  }

  // Outer decorative dots
  const dotCount = 24;
  for (let d = 0; d < dotCount; d++) {
    const a = (d * Math.PI * 2) / dotCount;
    const dx = cx + (radius - 5) * Math.cos(a);
    const dy = cy + (radius - 5) * Math.sin(a);
    ctx.beginPath();
    ctx.arc(dx, dy, 3, 0, Math.PI * 2);
    ctx.fillStyle = d % 2 === 0 ? '#ffffff' : '#ffe066';
    ctx.fill();
  }
}

function startSpinWheel() {
  if (isSpinning) return;
  if (wheelPool.length === 0) {
    alert('Hiện chưa có món quà nào trong bộ lọc này! Anh hãy chọn "Tất cả món quà" nhé!');
    return;
  }

  isSpinning = true;
  document.getElementById('wheel-ready-state').classList.remove('hidden');
  document.getElementById('wheel-winner-card').classList.add('hidden');

  const spinDuration = 4600; // ms
  const startAngle = wheelAngle;
  // Spin 6 to 10 full rotations + random offset
  const extraSpins = (6 + Math.random() * 4) * Math.PI * 2;
  const targetAngle = startAngle + extraSpins;
  const startTime = performance.now();
  let lastTickSlice = -1;

  function animateSpin(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / spinDuration, 1);
    // Cubic ease-out for dramatic slowdown
    const easeOut = 1 - Math.pow(1 - progress, 3.6);

    wheelAngle = startAngle + (targetAngle - startAngle) * easeOut;
    drawSpinWheel();

    // Play tick sound when crossing slice boundary
    const numSlices = wheelPool.length;
    const arc = (Math.PI * 2) / numSlices;
    // Pointer is at top (-PI/2 or 3*PI/2)
    const normalizedPointerAngle =
      ((3 * Math.PI) / 2 - (wheelAngle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
    const currentSlice = Math.floor(normalizedPointerAngle / arc) % numSlices;

    if (currentSlice !== lastTickSlice) {
      lastTickSlice = currentSlice;
      playTickSound();
    }

    if (progress < 1) {
      requestAnimationFrame(animateSpin);
    } else {
      isSpinning = false;
      const winningGift = wheelPool[currentSlice];
      revealWheelWinner(winningGift);
    }
  }

  requestAnimationFrame(animateSpin);
}

function revealWheelWinner(gift) {
  currentWinnerGift = gift;
  launchConfetti();
  playVictorySound();

  document.getElementById('wheel-ready-state').classList.add('hidden');
  const card = document.getElementById('wheel-winner-card');
  card.classList.remove('hidden');

  const safeImg = gift.image || createFallbackSVGDataUrl(gift.name);
  const imgEl = document.getElementById('winner-img');
  imgEl.src = safeImg;
  imgEl.onerror = () => {
    imgEl.src = createFallbackSVGDataUrl(gift.name);
  };

  const desireInfo = DESIRE_LABELS[gift.desire] || DESIRE_LABELS.high;
  document.getElementById('winner-desire-badge').innerHTML = desireInfo.html;
  document.getElementById('winner-title').textContent = gift.name;
  document.getElementById('winner-price').textContent = formatCurrency(gift.price);
  document.getElementById('winner-note').textContent = `“${gift.note}”`;

  const perkEl = document.getElementById('winner-perk');
  if (gift.perk) {
    perkEl.classList.remove('hidden');
    perkEl.innerHTML = `${svgIcon('award', 'icon-xs')} Đặc quyền cho anh: ${escapeHtml(gift.perk)}`;
  } else {
    perkEl.classList.add('hidden');
  }

  const buyLink = document.getElementById('winner-buy-link');
  if (gift.link) {
    buyLink.href = gift.link;
    buyLink.style.display = 'inline-flex';
  } else {
    buyLink.style.display = 'none';
  }
}

// ==========================================
// ADMIN FORM: ADD / EDIT GIFT
// ==========================================
function openGiftFormModal(gift = null) {
  const modal = document.getElementById('gift-form-modal');
  const title = document.getElementById('gift-form-title');
  const previewWrap = document.getElementById('gift-image-preview-wrap');
  const previewImg = document.getElementById('gift-image-preview');

  if (gift) {
    title.innerHTML = `${svgIcon('edit')} Chỉnh Sửa Món Quà`;
    document.getElementById('gift-id').value = gift.id;
    document.getElementById('gift-name').value = gift.name || '';
    document.getElementById('gift-price').value = gift.price || 0;
    document.getElementById('gift-image-url').value =
      gift.image && !gift.image.startsWith('data:') ? gift.image : '';
    uploadedImageDataUrl = gift.image && gift.image.startsWith('data:') ? gift.image : '';

    if (gift.image) {
      previewImg.src = gift.image;
      previewWrap.classList.remove('hidden');
    } else {
      previewWrap.classList.add('hidden');
    }

    document.getElementById('gift-desire').value = gift.desire || 'high';
    document.getElementById('gift-occasion').value = gift.occasion || 'unconditional';
    document.getElementById('gift-status').value = gift.status || 'available';
    document.getElementById('gift-link').value = gift.link || '';
    document.getElementById('gift-specs').value = gift.specs || '';
    document.getElementById('gift-note').value = gift.note || '';
    document.getElementById('gift-perk').value = gift.perk || '';
  } else {
    title.innerHTML = `${svgIcon('gift')} Thêm Món Quà Mới Vào Wishlist`;
    document.getElementById('gift-form').reset();
    document.getElementById('gift-id').value = '';
    uploadedImageDataUrl = '';
    previewWrap.classList.add('hidden');
  }

  modal.classList.remove('hidden');
}

// Compress uploaded image via Canvas so it stores & syncs smoothly
function handleImageFileUpload(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const MAX_SIZE = 640;
      let w = img.width;
      let h = img.height;
      if (w > h && w > MAX_SIZE) {
        h = Math.round((h * MAX_SIZE) / w);
        w = MAX_SIZE;
      } else if (h > MAX_SIZE) {
        w = Math.round((w * MAX_SIZE) / h);
        h = MAX_SIZE;
      }
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      uploadedImageDataUrl = canvas.toDataURL('image/jpeg', 0.82);

      const previewWrap = document.getElementById('gift-image-preview-wrap');
      const previewImg = document.getElementById('gift-image-preview');
      previewImg.src = uploadedImageDataUrl;
      previewWrap.classList.remove('hidden');
      document.getElementById('gift-image-url').value = '';
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

// ==========================================
// SHARE MODAL & CLOUD SYNC CREATION
// ==========================================
function openShareModal() {
  const modal = document.getElementById('share-modal');
  const urlInput = document.getElementById('share-url-input');
  const hintEl = document.getElementById('share-mode-hint');

  const baseUrl = window.location.href.split('?')[0].split('#')[0];
  let finalShareUrl = `${baseUrl}?view=boyfriend`;

  if (appData.settings.cloudUrl) {
    finalShareUrl = `${baseUrl}?view=boyfriend&cloud=${encodeURIComponent(
      appData.settings.cloudUrl
    )}`;
    hintEl.innerHTML = `${svgIcon('check', 'icon-xs')} <strong>Đang bật Đồng bộ Đám Mây:</strong> Khi bạn thêm/sửa món quà ở máy bạn, bạn trai mở link này sẽ luôn thấy danh sách mới nhất!`;
  } else {
    // Also pack lightweight data into URL hash if possible
    try {
      const compactCopy = {
        settings: appData.settings,
        gifts: appData.gifts.map((g) => ({
          ...g,
          // Keep URL images; if base64 image is huge, fallback to clean SVG in hash
          image: g.image && g.image.length > 2000 ? '' : g.image
        }))
      };
      const encoded = btoa(unescape(encodeURIComponent(JSON.stringify(compactCopy))));
      finalShareUrl = `${baseUrl}?view=boyfriend#share=${encoded}`;
      hintEl.innerHTML = `${svgIcon('sparkles', 'icon-xs')} <strong>Mẹo:</strong> Bạn có thể vào mục <em>Cài Đặt & Đám Mây</em> bấm "Tạo Mã Đám Mây 1-Click" để đồng bộ cả ảnh tải lên và cập nhật tự động không cần gửi lại link!`;
    } catch (_) {
      hintEl.textContent = 'Gửi link này cho bạn trai để xem giao diện người yêu nhé!';
    }
  }

  urlInput.value = finalShareUrl;
  modal.classList.remove('hidden');
}

async function createFreeCloudRoom() {
  const statusEl = document.getElementById('cloud-status-msg');
  const inputEl = document.getElementById('set-cloud-url');
  statusEl.textContent = 'Đang khởi tạo đám mây...';

  try {
    const res = await fetch('https://jsonblob.com/api/jsonBlob', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(appData)
    });

    const locationHeader = res.headers.get('Location') || res.headers.get('location');
    if (res.ok && locationHeader) {
      const httpsUrl = locationHeader.replace(/^http:/, 'https:');
      inputEl.value = httpsUrl;
      appData.settings.cloudUrl = httpsUrl;
      await saveData('Đã kết nối Cloud');
      statusEl.innerHTML = `${svgIcon('check', 'icon-xs')} Đã tạo Mã Đám Mây thành công!`;
      return;
    }
    throw new Error('No Location header returned');
  } catch (err) {
    console.warn('Cloud auto-create fallback:', err);
    statusEl.textContent =
      'Trình duyệt chặn tạo tự động hoặc không có mạng. Bạn vẫn dùng được Link Chia Sẻ Nhanh ở nút "Gửi cho Anh Iu" nhé!';
  }
}

// ==========================================
// EVENT BINDINGS
// ==========================================
function bindEvents() {
  // Filter pills (Occasion)
  document.querySelectorAll('#filter-occasion .filter-pill').forEach((pill) => {
    pill.addEventListener('click', () => {
      document
        .querySelectorAll('#filter-occasion .filter-pill')
        .forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentFilters.occasion = pill.getAttribute('data-value');
      renderWishlistGrid();
    });
  });

  // Dropdown filters
  document.getElementById('filter-desire').addEventListener('change', (e) => {
    currentFilters.desire = e.target.value;
    renderWishlistGrid();
  });
  document.getElementById('filter-price').addEventListener('change', (e) => {
    currentFilters.price = e.target.value;
    renderWishlistGrid();
  });
  document.getElementById('filter-status').addEventListener('change', (e) => {
    currentFilters.status = e.target.value;
    renderWishlistGrid();
  });
  document.getElementById('sort-by').addEventListener('change', (e) => {
    currentFilters.sort = e.target.value;
    renderWishlistGrid();
  });
  document.getElementById('search-input').addEventListener('input', (e) => {
    currentFilters.search = e.target.value.trim();
    renderWishlistGrid();
  });

  document.getElementById('btn-reset-filters').addEventListener('click', () => {
    currentFilters = {
      occasion: 'all',
      desire: 'all',
      price: 'all',
      status: 'all',
      search: '',
      sort: 'desire-desc'
    };
    document.getElementById('filter-desire').value = 'all';
    document.getElementById('filter-price').value = 'all';
    document.getElementById('filter-status').value = 'all';
    document.getElementById('sort-by').value = 'desire-desc';
    document.getElementById('search-input').value = '';
    document
      .querySelectorAll('#filter-occasion .filter-pill')
      .forEach((p, idx) => p.classList.toggle('active', idx === 0));
    renderWishlistGrid();
  });

  // Spin Wheel Modal Open/Close & Controls
  const openWheelFn = () => {
    updateWheelPoolAndDraw();
    document.getElementById('wheel-modal').classList.remove('hidden');
  };
  document.getElementById('btn-open-wheel').addEventListener('click', openWheelFn);
  document.getElementById('btn-hero-spin').addEventListener('click', openWheelFn);
  document.getElementById('close-wheel-modal').addEventListener('click', () => {
    document.getElementById('wheel-modal').classList.add('hidden');
  });

  ['wheel-occasion', 'wheel-budget', 'wheel-desire'].forEach((id) => {
    document.getElementById(id).addEventListener('change', () => {
      document.getElementById('wheel-ready-state').classList.remove('hidden');
      document.getElementById('wheel-winner-card').classList.add('hidden');
      updateWheelPoolAndDraw();
    });
  });

  document.getElementById('btn-spin-now').addEventListener('click', startSpinWheel);
  document.getElementById('btn-trigger-spin').addEventListener('click', startSpinWheel);
  document.getElementById('btn-spin-again').addEventListener('click', startSpinWheel);

  document.getElementById('btn-winner-reserve').addEventListener('click', () => {
    if (currentWinnerGift) {
      handleCardAction('toggle-reserve', currentWinnerGift.id);
    }
  });

  // Detail modal close
  document.getElementById('close-detail-modal').addEventListener('click', () => {
    document.getElementById('detail-modal').classList.add('hidden');
  });

  // Admin Toggle & PIN Modal
  document.getElementById('btn-toggle-admin').addEventListener('click', () => {
    if (isAdmin) {
      // Switch to Boyfriend preview
      isAdmin = false;
      sessionStorage.removeItem(ADMIN_SESSION_KEY);
      renderAll();
      showSweetToast('Đã chuyển sang chế độ Bạn Trai xem!');
    } else {
      document.getElementById('pin-input').value = '';
      document.getElementById('pin-error').classList.add('hidden');
      document.getElementById('pin-modal').classList.remove('hidden');
      setTimeout(() => document.getElementById('pin-input').focus(), 100);
    }
  });

  document.getElementById('btn-exit-admin').addEventListener('click', () => {
    isAdmin = false;
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    renderAll();
    showSweetToast('Đang hiển thị giao diện của Bạn Trai!');
  });

  document.getElementById('close-pin-modal').addEventListener('click', () => {
    document.getElementById('pin-modal').classList.add('hidden');
  });

  document.getElementById('pin-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const entered = document.getElementById('pin-input').value.trim();
    const validPin = appData.settings.adminPin || '1402';
    if (entered === validPin) {
      isAdmin = true;
      sessionStorage.setItem(ADMIN_SESSION_KEY, 'true');
      document.getElementById('pin-modal').classList.add('hidden');
      renderAll();
      showSweetToast('Chào mừng Bé Iu vào trang Quản trị Admin!');
    } else {
      document.getElementById('pin-error').classList.remove('hidden');
    }
  });

  // Add/Edit Gift Form
  document.getElementById('btn-add-new-gift').addEventListener('click', () => {
    openGiftFormModal(null);
  });
  document.getElementById('close-gift-form').addEventListener('click', () => {
    document.getElementById('gift-form-modal').classList.add('hidden');
  });
  document.getElementById('cancel-gift-form').addEventListener('click', () => {
    document.getElementById('gift-form-modal').classList.add('hidden');
  });

  document.getElementById('gift-image-file').addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      handleImageFileUpload(e.target.files[0]);
    }
  });

  document.getElementById('gift-image-url').addEventListener('input', (e) => {
    const url = e.target.value.trim();
    if (url) {
      uploadedImageDataUrl = '';
      document.getElementById('gift-image-preview').src = url;
      document.getElementById('gift-image-preview-wrap').classList.remove('hidden');
    }
  });

  document.getElementById('btn-clear-image').addEventListener('click', () => {
    uploadedImageDataUrl = '';
    document.getElementById('gift-image-url').value = '';
    document.getElementById('gift-image-file').value = '';
    document.getElementById('gift-image-preview-wrap').classList.add('hidden');
  });

  // Quick note suggestion chips
  document.querySelectorAll('.chip-btn').forEach((chip) => {
    chip.addEventListener('click', () => {
      document.getElementById('gift-note').value = chip.getAttribute('data-note');
    });
  });

  document.getElementById('gift-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('gift-id').value;
    const name = document.getElementById('gift-name').value.trim();
    const price = Number(document.getElementById('gift-price').value) || 0;
    const urlImg = document.getElementById('gift-image-url').value.trim();
    const finalImage = uploadedImageDataUrl || urlImg || createFallbackSVGDataUrl(name);

    const payload = {
      id: id || 'gift-' + Date.now(),
      name,
      price,
      image: finalImage,
      desire: document.getElementById('gift-desire').value,
      occasion: document.getElementById('gift-occasion').value,
      status: document.getElementById('gift-status').value,
      link: document.getElementById('gift-link').value.trim(),
      specs: document.getElementById('gift-specs').value.trim(),
      note: document.getElementById('gift-note').value.trim(),
      perk: document.getElementById('gift-perk').value.trim(),
      createdAt: id
        ? appData.gifts.find((g) => g.id === id)?.createdAt || Date.now()
        : Date.now()
    };

    if (id) {
      const idx = appData.gifts.findIndex((g) => g.id === id);
      if (idx !== -1) appData.gifts[idx] = payload;
    } else {
      appData.gifts.unshift(payload);
    }

    document.getElementById('gift-form-modal').classList.add('hidden');
    await saveData('Đã lưu món quà');
    renderAll();
    showSweetToast(`Đã lưu món "${name}" vào Wishlist!`);
  });

  // Settings Modal
  document.getElementById('btn-open-settings').addEventListener('click', () => {
    const s = appData.settings;
    document.getElementById('set-gf-name').value = s.gfName || '';
    document.getElementById('set-bf-name').value = s.bfName || '';
    document.getElementById('set-occasion-title').value = s.occasionTitle || '';
    document.getElementById('set-occasion-date').value = s.occasionDate || '';
    document.getElementById('set-hero-msg').value = s.heroMessage || '';
    document.getElementById('set-admin-pin').value = s.adminPin || '1402';
    document.getElementById('set-cloud-url').value = s.cloudUrl || '';
    document.getElementById('cloud-status-msg').textContent = '';
    document.getElementById('settings-modal').classList.remove('hidden');
  });

  document.getElementById('close-settings-modal').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
  });
  document.getElementById('cancel-settings-btn').addEventListener('click', () => {
    document.getElementById('settings-modal').classList.add('hidden');
  });

  document.getElementById('btn-create-cloud-room').addEventListener('click', createFreeCloudRoom);

  document.getElementById('settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    appData.settings = {
      gfName: document.getElementById('set-gf-name').value.trim() || 'Em Iu',
      bfName: document.getElementById('set-bf-name').value.trim() || 'Anh Iu',
      occasionTitle: document.getElementById('set-occasion-title').value.trim(),
      occasionDate: document.getElementById('set-occasion-date').value,
      heroMessage: document.getElementById('set-hero-msg').value.trim(),
      adminPin: document.getElementById('set-admin-pin').value.trim() || '1402',
      cloudUrl: document.getElementById('set-cloud-url').value.trim()
    };
    document.getElementById('settings-modal').classList.add('hidden');
    await saveData('Đã lưu cài đặt');
    renderAll();
    showSweetToast('Đã cập nhật thông tin cặp đôi & đồng bộ!');
  });

  // Export / Import / Reset Backup
  document.getElementById('btn-export-json').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(appData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'wishlist-cua-em-iu.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  document.getElementById('import-json-input').addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      try {
        const imported = JSON.parse(ev.target.result);
        if (imported && Array.isArray(imported.gifts)) {
          appData = imported;
          await saveData('Đã nhập file backup');
          renderAll();
          document.getElementById('settings-modal').classList.add('hidden');
          showSweetToast('Đã khôi phục danh sách quà từ file!');
        }
      } catch (err) {
        alert('File JSON không hợp lệ!');
      }
    };
    reader.readAsText(file);
  });

  document.getElementById('btn-reset-demo').addEventListener('click', async () => {
    if (confirm('Khôi phục lại 6 món quà mẫu ban đầu?')) {
      appData = JSON.parse(JSON.stringify(DEFAULT_DATA));
      await saveData('Đã khôi phục quà mẫu');
      renderAll();
      document.getElementById('settings-modal').classList.add('hidden');
    }
  });

  // Share Modal
  document.getElementById('btn-share-link').addEventListener('click', openShareModal);
  document.getElementById('close-share-modal').addEventListener('click', () => {
    document.getElementById('share-modal').classList.add('hidden');
  });

  document.getElementById('btn-copy-share-url').addEventListener('click', () => {
    const input = document.getElementById('share-url-input');
    input.select();
    navigator.clipboard.writeText(input.value);
    showSweetToast('Đã copy link! Gửi cho anh người yêu ngay thôi!');
  });

  document.getElementById('btn-copy-sweet-msg').addEventListener('click', () => {
    const url = document.getElementById('share-url-input').value;
    const msg = `Anh iuuu ơi! Để anh không phải đau đầu suy nghĩ xem sắp tới tặng gì cho em, em đã làm riêng một chiếc web Wishlist siêu đáng yêu cho anh nè! Trong đó có cả Vòng Quay May Mắn để anh quay chọn quà bất ngờ cho em nữa đó. Anh vào xem thử nha: ${url}`;
    navigator.clipboard.writeText(msg);
    showSweetToast('Đã copy cả lời nhắn ngọt ngào + Link! Paste gửi cho ảnh liền nha!');
  });

  // Close modals when clicking backdrop
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.add('hidden');
      }
    });
  });

  // Close toast
  document.getElementById('close-toast').addEventListener('click', () => {
    document.getElementById('sweet-toast').classList.add('hidden');
  });
}

// ==========================================
// VISUAL & AUDIO EFFECTS (OUTLINE HEARTS, CONFETTI, SOUND)
// ==========================================
function initFloatingHearts() {
  const container = document.getElementById('hearts-container');
  const iconNames = ['heart', 'hearts', 'sparkles', 'flower', 'gift'];

  function spawnHeart() {
    if (!container) return;
    const el = document.createElement('div');
    el.className = 'floating-heart';
    const iconName = iconNames[Math.floor(Math.random() * iconNames.length)];
    const size = Math.round(16 + Math.random() * 16);
    el.innerHTML = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><use href="#icon-${iconName}"></use></svg>`;
    el.style.left = Math.random() * 100 + 'vw';
    const dur = 9 + Math.random() * 9;
    el.style.animationDuration = dur + 's';
    container.appendChild(el);
    setTimeout(() => el.remove(), dur * 1000);
  }

  for (let i = 0; i < 8; i++) {
    setTimeout(spawnHeart, i * 600);
  }
  setInterval(spawnHeart, 2200);
}

function initSweetToasts() {
  setTimeout(() => {
    const randomTip =
      SWEET_PERSUASION_TIPS[Math.floor(Math.random() * SWEET_PERSUASION_TIPS.length)];
    showSweetToast(randomTip);
  }, 5000);
}

let toastTimer = null;
function showSweetToast(message) {
  const toast = document.getElementById('sweet-toast');
  const text = document.getElementById('sweet-toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.add('hidden');
  }, 7500);
}

function playTickSound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(620, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.045);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 0.045);
  } catch (_) {}
}

function playVictorySound() {
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime + i * 0.11);
      gain.gain.setValueAtTime(0.12, audioCtx.currentTime + i * 0.11);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + i * 0.11 + 0.35);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(audioCtx.currentTime + i * 0.11);
      osc.stop(audioCtx.currentTime + i * 0.11 + 0.35);
    });
  } catch (_) {}
}

function launchConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 85 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 2,
    vx: (Math.random() - 0.5) * 16,
    vy: -Math.random() * 16 - 4,
    size: 7 + Math.random() * 7,
    color: ['#ff2e7e', '#ff85b3', '#ffe066', '#ff4785', '#cc5de8'][
      Math.floor(Math.random() * 5)
    ],
    rot: Math.random() * Math.PI * 2,
    vrot: (Math.random() - 0.5) * 0.2
  }));

  let frame = 0;
  function step() {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.38;
      p.rot += p.vrot;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      ctx.restore();
    });
    if (frame < 110) {
      requestAnimationFrame(step);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
  requestAnimationFrame(step);
}

// ==========================================
// HELPERS
// ==========================================
function formatCurrency(num) {
  const n = Number(num) || 0;
  return n.toLocaleString('vi-VN') + 'đ';
}

function truncateText(str, max) {
  if (!str) return '';
  return str.length > max ? str.slice(0, max - 1) + '…' : str;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function createFallbackSVGDataUrl(title) {
  const safe = escapeHtml(truncateText(title || 'Món Quà Xinh', 22));
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#ffd6e7"/>
        <stop offset="100%" stop-color="#ff94bc"/>
      </linearGradient>
    </defs>
    <rect width="600" height="400" fill="url(#g)"/>
    <g transform="translate(264, 110) scale(3)" fill="none" stroke="#7d1945" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="8" width="18" height="4" rx="1"/>
      <path d="M12 8v13"/>
      <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
      <path d="M7.5 8a2.5 2.5 0 0 1 0-5A4.8 8 0 0 1 12 8a4.8 8 0 0 1 4.5-5 2.5 2.5 0 0 1 0 5"/>
    </g>
    <text x="300" y="255" font-size="26" font-family="sans-serif" font-weight="bold" fill="#7d1945" text-anchor="middle">${safe}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}
