/* =========================================================
   Sunnah Daily Coach — Application Logic
   ========================================================= */

const app = (() => {
  // ── State ──────────────────────────────────────────────
  let completedToday = JSON.parse(localStorage.getItem('sunnah_completed') || '[]');
  let lastResetDate = localStorage.getItem('sunnah_reset_date') || '';
  let currentAdhkarSet = 'morning';
  let currentCategory = 'all';

  // ── Helpers ────────────────────────────────────────────
  function todayString() {
    return new Date().toISOString().slice(0, 10);
  }

  function resetIfNewDay() {
    const today = todayString();
    if (lastResetDate !== today) {
      completedToday = [];
      lastResetDate = today;
      localStorage.setItem('sunnah_completed', '[]');
      localStorage.setItem('sunnah_reset_date', today);
    }
  }

  function markComplete(id) {
    if (!completedToday.includes(id)) {
      completedToday.push(id);
      localStorage.setItem('sunnah_completed', JSON.stringify(completedToday));
    }
    renderTimeline();
    updateHero();
  }

  function unmarkComplete(id) {
    completedToday = completedToday.filter(x => x !== id);
    localStorage.setItem('sunnah_completed', JSON.stringify(completedToday));
    renderTimeline();
    updateHero();
  }

  function currentHour() {
    return new Date().getHours();
  }

  function getActivePractice() {
    const hour = currentHour();
    const sorted = [...SUNNAH_DATA.dailyPractices].sort(
      (a, b) => Math.abs(a.timeSlot - hour) - Math.abs(b.timeSlot - hour)
    );
    return sorted[0];
  }

  // ── Clock ──────────────────────────────────────────────
  function startClock() {
    function tick() {
      const now = new Date();
      const timeEl = document.getElementById('live-time');
      const dateEl = document.getElementById('live-date');
      if (timeEl) {
        timeEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      if (dateEl) {
        dateEl.textContent = now.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });
      }
    }
    tick();
    setInterval(tick, 1000);
  }

  // ── Hero Banner ────────────────────────────────────────
  function updateHero() {
    const practice = getActivePractice();
    const nameEl = document.getElementById('hero-practice-name');
    const subEl = document.getElementById('hero-practice-sub');
    if (nameEl) nameEl.textContent = `${practice.icon} ${practice.title}`;
    if (subEl) subEl.textContent = practice.timeLabel;

    const banner = document.getElementById('hero-banner');
    if (banner) {
      banner.classList.toggle('completed', completedToday.includes(practice.id));
    }
  }

  function openCurrentPractice() {
    const practice = getActivePractice();
    openModal(practice);
  }

  // ── Timeline ───────────────────────────────────────────
  function renderTimeline() {
    const container = document.getElementById('daily-timeline');
    if (!container) return;

    const total = SUNNAH_DATA.dailyPractices.length;
    const done = SUNNAH_DATA.dailyPractices.filter(p => completedToday.includes(p.id)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;

    let html = `
      <div class="progress-bar-wrap">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-label">${done} / ${total} completed today</span>
      </div>
    `;

    SUNNAH_DATA.dailyPractices.forEach(practice => {
      const isDone = completedToday.includes(practice.id);
      const isActive = getActivePractice().id === practice.id;
      html += `
        <div class="timeline-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}" data-id="${practice.id}">
          <div class="timeline-marker">
            <span class="timeline-icon">${practice.icon}</span>
          </div>
          <div class="timeline-body">
            <div class="timeline-header">
              <div>
                <h3 class="timeline-title">${practice.title}</h3>
                <span class="timeline-arabic">${practice.arabicTitle}</span>
                <span class="timeline-time">${practice.timeLabel}</span>
              </div>
              <div class="timeline-actions">
                <button class="btn-sm btn-detail" onclick='app.openPractice("${practice.id}")'>Details</button>
                ${isDone
                  ? `<button class="btn-sm btn-undo" onclick='app.unmarkDone("${practice.id}")'>✓ Done</button>`
                  : `<button class="btn-sm btn-done" onclick='app.markDone("${practice.id}")'>Mark Done</button>`
                }
              </div>
            </div>
            <p class="timeline-desc">${practice.shortDesc}</p>
            <span class="timeline-source">${practice.source}</span>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // ── Adhkar ─────────────────────────────────────────────
  function renderAdhkar(set) {
    const list = document.getElementById('adhkar-list');
    if (!list) return;

    const data = {
      morning: SUNNAH_DATA.morningAdhkar,
      evening: SUNNAH_DATA.eveningAdhkar,
      sleep: SUNNAH_DATA.sleepAdhkar
    }[set] || SUNNAH_DATA.morningAdhkar;

    let html = '';
    data.forEach((item, idx) => {
      html += `
        <div class="adhkar-card" id="adhkar-card-${idx}">
          <div class="adhkar-card-header">
            <div>
              <h3 class="adhkar-title">${item.title}</h3>
              <span class="adhkar-arabic-title">${item.arabicTitle}</span>
            </div>
            ${item.count > 1 ? `<span class="adhkar-count-badge">×${item.count}</span>` : ''}
          </div>
          <p class="adhkar-arabic">${item.arabic}</p>
          <p class="adhkar-transliteration">${item.transliteration}</p>
          <p class="adhkar-translation">${item.translation}</p>
          ${item.count > 1 ? renderCounter(idx, item.count) : ''}
          <div class="adhkar-footer">
            <span class="source-tag">${item.source}</span>
            ${item.benefit ? `<p class="adhkar-benefit">✦ ${item.benefit}</p>` : ''}
          </div>
        </div>
      `;
    });
    list.innerHTML = html;
  }

  function renderCounter(idx, max) {
    return `
      <div class="counter-wrap" id="counter-${idx}">
        <button class="counter-btn" onclick="app.incrementCounter(${idx}, ${max})">
          <span class="counter-val" id="counter-val-${idx}">0</span>
          <span class="counter-max">/ ${max}</span>
        </button>
        <button class="counter-reset" onclick="app.resetCounter(${idx})">↺</button>
      </div>
    `;
  }

  const counterValues = {};

  function incrementCounter(idx, max) {
    counterValues[idx] = (counterValues[idx] || 0) + 1;
    const el = document.getElementById(`counter-val-${idx}`);
    const wrap = document.getElementById(`counter-${idx}`);
    if (counterValues[idx] >= max) {
      counterValues[idx] = max;
      wrap && wrap.classList.add('complete');
    }
    if (el) el.textContent = counterValues[idx];
  }

  function resetCounter(idx) {
    counterValues[idx] = 0;
    const el = document.getElementById(`counter-val-${idx}`);
    const wrap = document.getElementById(`counter-${idx}`);
    if (el) el.textContent = 0;
    wrap && wrap.classList.remove('complete');
  }

  // ── Explore ────────────────────────────────────────────
  function renderExplore(cat) {
    const grid = document.getElementById('explore-grid');
    if (!grid) return;

    const all = [
      ...SUNNAH_DATA.dailyPractices.map(p => ({ ...p, _type: 'daily' })),
      ...SUNNAH_DATA.explorePractices.map(p => ({ ...p, _type: 'extra' }))
    ];
    const filtered = cat === 'all' ? all : all.filter(p => p.category === cat);

    let html = '';
    filtered.forEach(p => {
      html += `
        <div class="explore-card" onclick='app.openPractice("${p.id}")'>
          <div class="explore-card-icon">${p.icon || '📌'}</div>
          <div class="explore-card-body">
            <h3>${p.title}</h3>
            <span class="cat-tag cat-${p.category}">${p.category}</span>
            <p>${p.shortDesc}</p>
            <span class="source-tag">${p.source}</span>
          </div>
        </div>
      `;
    });
    grid.innerHTML = html || '<p class="empty-msg">No practices in this category yet.</p>';
  }

  // ── Modal ──────────────────────────────────────────────
  function openPractice(id) {
    const allPractices = [
      ...SUNNAH_DATA.dailyPractices,
      ...SUNNAH_DATA.explorePractices
    ];
    const practice = allPractices.find(p => p.id === id);
    if (practice) openModal(practice);
  }

  function openModal(practice) {
    const overlay = document.getElementById('modal-overlay');
    const body = document.getElementById('modal-body');
    if (!overlay || !body) return;

    const isDone = completedToday.includes(practice.id);
    const isDaily = SUNNAH_DATA.dailyPractices.some(p => p.id === practice.id);

    let html = `
      <div class="modal-cat-tag cat-${practice.category}">${practice.category}</div>
      <h2 class="modal-title">${practice.icon || ''} ${practice.title}</h2>
      <p class="modal-arabic-title">${practice.arabicTitle}</p>
      ${practice.timeLabel ? `<p class="modal-time">🕐 ${practice.timeLabel}</p>` : ''}
      <p class="modal-short-desc">${practice.shortDesc}</p>
    `;

    if (practice.hadith) {
      html += `
        <blockquote class="modal-hadith">
          <p>${practice.hadith}</p>
        </blockquote>
      `;
    }

    if (practice.steps) {
      html += `<h4>How to do it</h4><ol class="modal-steps">`;
      practice.steps.forEach(s => { html += `<li>${s}</li>`; });
      html += `</ol>`;
    }

    if (practice.dua) {
      html += `
        <div class="modal-dua-block">
          <h4>Du'a / Dhikr</h4>
          <p class="dua-arabic">${practice.dua.arabic}</p>
          <p class="dua-trans">${practice.dua.transliteration}</p>
          <p class="dua-meaning">"${practice.dua.translation}"</p>
        </div>
      `;
    }

    if (practice.afterDua) {
      html += `
        <div class="modal-dua-block">
          <h4>After eating</h4>
          <p class="dua-arabic">${practice.afterDua.arabic}</p>
          <p class="dua-trans">${practice.afterDua.transliteration}</p>
          <p class="dua-meaning">"${practice.afterDua.translation}"</p>
        </div>
      `;
    }

    if (practice.benefit) {
      html += `
        <div class="modal-benefit">
          <h4>Benefit & Wisdom</h4>
          <p>${practice.benefit}</p>
        </div>
      `;
    }

    html += `
      <div class="modal-source">
        <strong>Source:</strong> ${practice.source}
        ${practice.sourceUrl ? `<a href="${practice.sourceUrl}" target="_blank" rel="noopener" class="source-link">Verify on Sunnah.com ↗</a>` : ''}
      </div>
    `;

    if (isDaily) {
      html += `
        <div class="modal-actions">
          ${isDone
            ? `<button class="btn-primary btn-done-modal active" onclick='app.unmarkDone("${practice.id}"); app.closeModal();'>✓ Marked as Done</button>`
            : `<button class="btn-primary" onclick='app.markDone("${practice.id}"); app.closeModal();'>Mark as Completed ✓</button>`
          }
        </div>
      `;
    }

    body.innerHTML = html;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ── Tab Navigation ─────────────────────────────────────
  function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const el = document.getElementById(`tab-${tab}`);
        if (el) el.classList.add('active');

        if (tab === 'adhkar') renderAdhkar(currentAdhkarSet);
        if (tab === 'explore') renderExplore(currentCategory);
      });
    });
  }

  function initAdhkarTabs() {
    document.querySelectorAll('.adhkar-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.adhkar-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentAdhkarSet = btn.dataset.adhkar;
        renderAdhkar(currentAdhkarSet);
      });
    });
  }

  function initFilterBtns() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCategory = btn.dataset.cat;
        renderExplore(currentCategory);
      });
    });
  }

  // ── Public API ─────────────────────────────────────────
  function markDone(id) { markComplete(id); }
  function unmarkDone(id) { unmarkComplete(id); }

  // ── Init ───────────────────────────────────────────────
  function init() {
    resetIfNewDay();
    startClock();
    updateHero();
    renderTimeline();
    renderAdhkar('morning');
    renderExplore('all');
    initTabs();
    initAdhkarTabs();
    initFilterBtns();

    // Keyboard close for modal
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeModal();
    });
  }

  document.addEventListener('DOMContentLoaded', init);

  return {
    openCurrentPractice,
    openPractice,
    openModal,
    closeModal,
    markDone,
    unmarkDone,
    incrementCounter,
    resetCounter
  };
})();
