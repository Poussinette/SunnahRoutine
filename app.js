/* =========================================================
   Sunnah Daily Coach — Application Logic
   ========================================================= */

const app = (() => {
  // ── State ──────────────────────────────────────────────
  let completedToday = JSON.parse(localStorage.getItem('sunnah_completed') || '[]');
  let lastResetDate  = localStorage.getItem('sunnah_reset_date') || '';
  let currentAdhkarSet = 'morning';
  let currentCategory  = 'all';
  let lang = localStorage.getItem('sunnah_lang') || (navigator.language.startsWith('fr') ? 'fr' : 'en');

  // ── i18n ───────────────────────────────────────────────
  function t(key, vars = {}) {
    const strings = TRANSLATIONS.ui[lang] || TRANSLATIONS.ui.en;
    let str = strings[key] ?? (TRANSLATIONS.ui.en[key] ?? key);
    Object.entries(vars).forEach(([k, v]) => { str = str.replace(`{${k}}`, v); });
    return str;
  }

  function pf(practice, field) {
    if (lang === 'fr') {
      const tr = TRANSLATIONS.practices[practice.id];
      if (tr && tr.fr && tr.fr[field] !== undefined) return tr.fr[field];
    }
    return practice[field];
  }

  function af(item, field) {
    if (lang === 'fr') {
      const tr = TRANSLATIONS.adhkar[item.id];
      if (tr && tr.fr && tr.fr[field] !== undefined) return tr.fr[field];
    }
    return item[field];
  }

  function toggleLang() {
    lang = lang === 'en' ? 'fr' : 'en';
    localStorage.setItem('sunnah_lang', lang);
    applyLang();
    refreshUI();
  }

  function applyLang() {
    document.documentElement.lang = lang;
    const btn = document.getElementById('lang-label');
    if (btn) btn.textContent = lang === 'en' ? 'FR' : 'EN';
    // update all static data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      el.textContent = t(el.dataset.i18n);
    });
  }

  function refreshUI() {
    updateHero();
    renderTimeline();
    const activeAdhkar = document.querySelector('.adhkar-tab-btn.active');
    renderAdhkar(activeAdhkar ? activeAdhkar.dataset.adhkar : currentAdhkarSet);
    renderExplore(currentCategory);
    renderAbout();
  }

  // ── Helpers ────────────────────────────────────────────
  function todayString() { return new Date().toISOString().slice(0, 10); }

  function resetIfNewDay() {
    const today = todayString();
    if (lastResetDate !== today) {
      completedToday = [];
      lastResetDate  = today;
      localStorage.setItem('sunnah_completed', '[]');
      localStorage.setItem('sunnah_reset_date', today);
    }
  }

  function markComplete(id) {
    if (!completedToday.includes(id)) completedToday.push(id);
    localStorage.setItem('sunnah_completed', JSON.stringify(completedToday));
    renderTimeline();
    updateHero();
  }

  function unmarkComplete(id) {
    completedToday = completedToday.filter(x => x !== id);
    localStorage.setItem('sunnah_completed', JSON.stringify(completedToday));
    renderTimeline();
    updateHero();
  }

  function currentHour() { return new Date().getHours(); }

  function getActivePractice() {
    const hour = currentHour();
    return [...SUNNAH_DATA.dailyPractices].sort(
      (a, b) => Math.abs(a.timeSlot - hour) - Math.abs(b.timeSlot - hour)
    )[0];
  }

  // ── Clock ──────────────────────────────────────────────
  function startClock() {
    function tick() {
      const now = new Date();
      const tEl = document.getElementById('live-time');
      const dEl = document.getElementById('live-date');
      if (tEl) tEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (dEl) dEl.textContent = now.toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'short', month: 'short', day: 'numeric' });
    }
    tick();
    setInterval(tick, 1000);
  }

  // ── Hero Banner ────────────────────────────────────────
  function updateHero() {
    const practice = getActivePractice();
    const nameEl   = document.getElementById('hero-practice-name');
    const subEl    = document.getElementById('hero-practice-sub');
    const labelEl  = document.getElementById('hero-label');
    const ctaEl    = document.getElementById('hero-cta');
    if (nameEl) nameEl.textContent = `${practice.icon} ${pf(practice, 'title')}`;
    if (subEl)  subEl.textContent  = pf(practice, 'timeLabel');
    if (labelEl) labelEl.textContent = t('hero_now');
    if (ctaEl)  ctaEl.textContent  = t('hero_cta');
    const banner = document.getElementById('hero-banner');
    if (banner) banner.classList.toggle('completed', completedToday.includes(practice.id));
  }

  function openCurrentPractice() { openModal(getActivePractice()); }

  // ── Timeline ───────────────────────────────────────────
  function renderTimeline() {
    const container = document.getElementById('daily-timeline');
    if (!container) return;

    const total = SUNNAH_DATA.dailyPractices.length;
    const done  = SUNNAH_DATA.dailyPractices.filter(p => completedToday.includes(p.id)).length;
    const pct   = total ? Math.round((done / total) * 100) : 0;

    let html = `
      <div class="progress-bar-wrap">
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-label">${t('progress_label', { done, total })}</span>
      </div>`;

    SUNNAH_DATA.dailyPractices.forEach(practice => {
      const isDone   = completedToday.includes(practice.id);
      const isActive = getActivePractice().id === practice.id;
      const title    = pf(practice, 'title');
      const desc     = pf(practice, 'shortDesc');
      html += `
        <div class="timeline-item ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}">
          <div class="timeline-marker">
            <div class="timeline-icon">${practice.icon}</div>
          </div>
          <div class="timeline-body">
            <div class="timeline-header">
              <div>
                <div class="timeline-title">${title}</div>
                <span class="timeline-arabic">${practice.arabicTitle}</span>
                <span class="timeline-time">${pf(practice, 'timeLabel')}</span>
              </div>
              <div class="timeline-actions">
                <button class="btn-sm btn-detail" onclick='app.openPractice("${practice.id}")'>${t('btn_details')}</button>
                ${isDone
                  ? `<button class="btn-sm btn-undo" onclick='app.unmarkDone("${practice.id}")'>${t('btn_done')}</button>`
                  : `<button class="btn-sm btn-done" onclick='app.markDone("${practice.id}")'>${t('btn_mark_done')}</button>`
                }
              </div>
            </div>
            <p class="timeline-desc">${desc}</p>
            <span class="timeline-source">${practice.source}</span>
          </div>
        </div>`;
    });

    container.innerHTML = html;
  }

  // ── Adhkar ─────────────────────────────────────────────
  function renderAdhkar(set) {
    currentAdhkarSet = set;
    const list = document.getElementById('adhkar-list');
    if (!list) return;

    const datasets = {
      morning: SUNNAH_DATA.morningAdhkar,
      evening: SUNNAH_DATA.eveningAdhkar,
      sleep:   SUNNAH_DATA.sleepAdhkar
    };
    const data = datasets[set] || SUNNAH_DATA.morningAdhkar;

    let html = '';
    data.forEach((item, idx) => {
      const title       = af(item, 'title');
      const translation = af(item, 'translation');
      const benefit     = af(item, 'benefit');
      html += `
        <div class="adhkar-card">
          <div class="adhkar-card-header">
            <div>
              <div class="adhkar-title">${title}</div>
              <span class="adhkar-arabic-title">${item.arabicTitle}</span>
            </div>
            ${item.count > 1 ? `<span class="adhkar-count-badge">×${item.count}</span>` : ''}
          </div>
          <p class="adhkar-arabic">${item.arabic}</p>
          <p class="adhkar-transliteration">${item.transliteration}</p>
          <p class="adhkar-translation">${translation}</p>
          ${item.count > 1 ? renderCounter(idx, item.count) : ''}
          <div class="adhkar-footer">
            <span class="source-tag">${item.source}</span>
            ${benefit ? `<p class="adhkar-benefit">✦ ${benefit}</p>` : ''}
          </div>
        </div>`;
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
      </div>`;
  }

  const counterValues = {};

  function incrementCounter(idx, max) {
    counterValues[idx] = Math.min((counterValues[idx] || 0) + 1, max);
    const el   = document.getElementById(`counter-val-${idx}`);
    const wrap = document.getElementById(`counter-${idx}`);
    if (el)   el.textContent = counterValues[idx];
    if (wrap) wrap.classList.toggle('complete', counterValues[idx] >= max);
  }

  function resetCounter(idx) {
    counterValues[idx] = 0;
    const el   = document.getElementById(`counter-val-${idx}`);
    const wrap = document.getElementById(`counter-${idx}`);
    if (el)   el.textContent = 0;
    if (wrap) wrap.classList.remove('complete');
  }

  // ── Explore ────────────────────────────────────────────
  function renderExplore(cat) {
    currentCategory = cat;
    const grid = document.getElementById('explore-grid');
    if (!grid) return;

    const all = [
      ...SUNNAH_DATA.dailyPractices,
      ...SUNNAH_DATA.explorePractices
    ];
    const filtered = cat === 'all' ? all : all.filter(p => p.category === cat);

    let html = '';
    filtered.forEach(p => {
      const title    = pf(p, 'title');
      const desc     = pf(p, 'shortDesc');
      const catLabel = t(`cat_${p.category}`);
      html += `
        <div class="explore-card" onclick='app.openPractice("${p.id}")'>
          <div class="explore-card-icon">${p.icon || '📌'}</div>
          <div class="explore-card-body">
            <h3>${title}</h3>
            <span class="cat-tag cat-${p.category}">${catLabel}</span>
            <p>${desc}</p>
            <span class="source-tag">${p.source}</span>
          </div>
        </div>`;
    });
    grid.innerHTML = html || `<p class="empty-msg">—</p>`;
  }

  // ── About ──────────────────────────────────────────────
  function renderAbout() {
    const el = document.getElementById('tab-about');
    if (!el) return;
    el.innerHTML = `
      <div class="about-content">
        <h2>${t('about_title')}</h2>
        <p>${t('about_body')}</p>
        <ul>
          <li><strong>Sahih al-Bukhari</strong> — Imam al-Bukhari (d. 256 AH)</li>
          <li><strong>Sahih Muslim</strong> — Imam Muslim (d. 261 AH)</li>
          <li><strong>Sunan Abi Dawud</strong> — Imam Abu Dawud (d. 275 AH)</li>
          <li><strong>Jami' al-Tirmidhi</strong> — Imam al-Tirmidhi (d. 279 AH)</li>
          <li><strong>Sunan al-Nasa'i</strong> — Imam al-Nasa'i (d. 303 AH)</li>
          <li><strong>Sunan Ibn Majah</strong> — Imam Ibn Majah (d. 273 AH)</li>
          <li><strong>Musnad Ahmad</strong> — Imam Ahmad ibn Hanbal (d. 241 AH)</li>
          <li><strong>Hisnul Muslim</strong> — Sa'id al-Qahtani</li>
        </ul>
        <hr/>
        <h3>${t('about_disclaimer_title')}</h3>
        <p>${t('about_disclaimer')}</p>
        <hr/>
        <h3>صلى الله عليه وسلم</h3>
        <p class="arabic-quote">قُلْ إِن كُنتُمْ تُحِبُّونَ اللَّهَ فَاتَّبِعُونِي يُحْبِبْكُمُ اللَّهُ</p>
        <p><em>${t('about_verse')}</em></p>
      </div>`;
  }

  // ── Modal ──────────────────────────────────────────────
  function openPractice(id) {
    const all = [...SUNNAH_DATA.dailyPractices, ...SUNNAH_DATA.explorePractices];
    const p   = all.find(x => x.id === id);
    if (p) openModal(p);
  }

  function openModal(practice) {
    const overlay = document.getElementById('modal-overlay');
    const body    = document.getElementById('modal-body');
    if (!overlay || !body) return;

    const isDone    = completedToday.includes(practice.id);
    const isDaily   = SUNNAH_DATA.dailyPractices.some(p => p.id === practice.id);
    const title     = pf(practice, 'title');
    const desc      = pf(practice, 'shortDesc');
    const hadith    = pf(practice, 'hadith');
    const steps     = pf(practice, 'steps');
    const benefit   = pf(practice, 'benefit');
    const catLabel  = t(`cat_${practice.category}`);

    let html = `
      <div class="modal-cat-tag"><span class="cat-tag cat-${practice.category}">${catLabel}</span></div>
      <h2 class="modal-title">${practice.icon || ''} ${title}</h2>
      <p class="modal-arabic-title">${practice.arabicTitle}</p>
      ${practice.timeLabel ? `<p class="modal-time">🕐 ${pf(practice, 'timeLabel')}</p>` : ''}
      <p class="modal-short-desc">${desc}</p>`;

    if (hadith) {
      html += `<blockquote class="modal-hadith"><p>${hadith}</p></blockquote>`;
    }

    if (steps && steps.length) {
      html += `<h4>${t('modal_how_to')}</h4><ol class="modal-steps">`;
      steps.forEach(s => { html += `<li>${s}</li>`; });
      html += `</ol>`;
    }

    if (practice.dua) {
      html += `
        <div class="modal-dua-block">
          <h4>${t('modal_dua')}</h4>
          <p class="dua-arabic">${practice.dua.arabic}</p>
          <p class="dua-trans">${practice.dua.transliteration}</p>
          <p class="dua-meaning">"${practice.dua.translation}"</p>
        </div>`;
    }

    if (practice.afterDua) {
      html += `
        <div class="modal-dua-block">
          <h4>${t('modal_after_eating')}</h4>
          <p class="dua-arabic">${practice.afterDua.arabic}</p>
          <p class="dua-trans">${practice.afterDua.transliteration}</p>
          <p class="dua-meaning">"${practice.afterDua.translation}"</p>
        </div>`;
    }

    if (benefit) {
      html += `
        <div class="modal-benefit">
          <h4>${t('modal_benefit')}</h4>
          <p>${benefit}</p>
        </div>`;
    }

    html += `
      <div class="modal-source">
        <strong>${t('modal_source')}</strong> ${practice.source}
        ${practice.sourceUrl ? `<a href="${practice.sourceUrl}" target="_blank" rel="noopener" class="source-link">${t('modal_verify')}</a>` : ''}
      </div>`;

    if (isDaily) {
      html += `
        <div class="modal-actions">
          ${isDone
            ? `<button class="btn-primary btn-done-modal" onclick='app.unmarkDone("${practice.id}"); app.closeModal();'>${t('modal_marked')}</button>`
            : `<button class="btn-primary" onclick='app.markDone("${practice.id}"); app.closeModal();'>${t('modal_mark_complete')}</button>`
          }
        </div>`;
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
        if (tab === 'adhkar')  renderAdhkar(currentAdhkarSet);
        if (tab === 'explore') renderExplore(currentCategory);
        if (tab === 'about')   renderAbout();
      });
    });
  }

  function initAdhkarTabs() {
    document.querySelectorAll('.adhkar-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.adhkar-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderAdhkar(btn.dataset.adhkar);
      });
    });
  }

  function initFilterBtns() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderExplore(btn.dataset.cat);
      });
    });
  }

  // ── Public API ─────────────────────────────────────────
  function markDone(id)   { markComplete(id); }
  function unmarkDone(id) { unmarkComplete(id); }

  // ── Init ───────────────────────────────────────────────
  function init() {
    resetIfNewDay();
    applyLang();
    startClock();
    updateHero();
    renderTimeline();
    renderAdhkar('morning');
    renderExplore('all');
    renderAbout();
    initTabs();
    initAdhkarTabs();
    initFilterBtns();
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
  }

  document.addEventListener('DOMContentLoaded', init);

  return { openCurrentPractice, openPractice, closeModal, markDone, unmarkDone, incrementCounter, resetCounter, toggleLang };
})();
