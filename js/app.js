/* =========================================================
   Main App Controller: Router, Progress Storage, Search, Views
   ========================================================= */
(() => {
  const STORAGE_KEY = 'switch_study_progress_v1';
  const S = window.SwitchStudy;

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || { checks: {}, fc: {} };
    } catch {
      return { checks: {}, fc: {} };
    }
  }

  function saveProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch { /* ignore storage quota errors */ }
  }

  let progress = loadProgress();

  function getAllCheckIds() {
    const ids = [];
    S.Units.forEach((u) => u.checkpoints.forEach((c) => ids.push(c.id)));
    S.PastExam.problems.forEach((p) => ids.push('done-' + p.id));
    return ids;
  }

  function updateProgressUI() {
    const all = getAllCheckIds();
    const done = all.filter((id) => progress.checks[id]).length;
    const pct = all.length ? Math.round((done / all.length) * 100) : 0;

    const textEl = document.getElementById('sidebar-progress-text');
    const fillEl = document.getElementById('sidebar-progress-fill');
    const detEl = document.getElementById('sidebar-progress-detail');
    const mobEl = document.getElementById('mobile-progress-pill');

    if (textEl) textEl.textContent = `${pct}%`;
    if (fillEl) fillEl.style.width = `${pct}%`;
    if (detEl) detEl.textContent = `達成チェック ${done} / ${all.length}`;
    if (mobEl) mobEl.textContent = `${pct}%`;
  }

  function toggleCheck(id, val) {
    progress.checks[id] = val;
    saveProgress(progress);
    updateProgressUI();
  }

  /* ---------- Views ---------- */
  function renderHome(mainEl) {
    const unitCards = S.Units.map((u) => {
      const done = u.checkpoints.filter((c) => progress.checks[c.id]).length;
      const total = u.checkpoints.length;
      return `
        <a href="#${u.id}" class="card-link">
          <div>
            <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;">
              <span class="tag tag-blue">${u.code}</span>
              <span class="mono" style="font-size:12px;color:${done === total ? 'var(--ok)' : 'var(--ink-muted)'};font-weight:700;">${done}/${total} 完了</span>
            </div>
            <h3>${u.title}</h3>
            <p>${u.summary}</p>
          </div>
          <div style="margin-top:12px;font-size:12px;color:var(--ink-muted);">${u.pages}</div>
        </a>
      `;
    }).join('');

    mainEl.innerHTML = `
      <section class="hero">
        <div class="hero-eyebrow">中間試験対策 ｜ 通常定められた物品のみ（電卓持込不可）</div>
        <h1>スイッチング回路理論 対策ラボ</h1>
        <p>教科書（3.5・4.3〜4.7・5.1・5.3〜5.4）・第1〜7回講義資料・演習課題・過去問（山田）を1つに統合。回路図・真理値表・論理式の対応と「なぜその回路が必要か」をスマホでもPCでも一気に確認できます。</p>
        <div class="hero-actions">
          <a href="#basics" class="btn btn-ok">ゼロからの基本の解き方</a>
          <a href="#past-exam" class="btn btn-warn">過去問（山田）を解く</a>
          <a href="#textbook" class="btn btn-primary">教科書の問題まとめ（${S.TextbookProblems.length}問）</a>
          <a href="#trainers" class="btn">計算トレーナー</a>
          <a href="#flashcards" class="btn">暗記カード（${S.Flashcards.length}問）</a>
        </div>
      </section>

      <div class="callout callout-exam">
        <div class="callout-title">特に重要な出題フォーカス（自力で解けるように！）</div>
        Q-M法による簡単化 ／ ドントケア項を利用した簡単化 ／ 多ビット比較器 ／ 桁上げ先見加算器（CLA）／ オーバーフロー検出器 ／ エンコーダ・デコーダ ／ マルチプレクサ・デマルチプレクサ ／ 入力方程式の導出 ／ 非同期式カウンタ
      </div>

      <h2 class="section-title">単元別まとめ（全6単元）</h2>
      <div class="grid-2">${unitCards}</div>

      <h2 class="section-title">実践・暗記ツール</h2>
      <div class="grid-3">
        <a href="#past-exam" class="card-link">
          <div>
            <span class="tag tag-warn">過去問</span>
            <h3>中間試験（山田）全6問</h3>
            <p>実答案で減点された冗長主項の罠も含め、ヒント→模範解答→SVG回路図で完全攻略。</p>
          </div>
        </a>
        <a href="#textbook" class="card-link">
          <div>
            <span class="tag tag-blue">教科書問題</span>
            <h3>教科書の例題・演習（全${S.TextbookProblems.length}問）</h3>
            <p>第3章〜第5章の試験範囲に載っている例題・演習問題を章別フィルター＆解答トグル付きで完全網羅。</p>
          </div>
        </a>
        <a href="#exercises" class="card-link">
          <div>
            <span class="tag tag-blue">講義演習</span>
            <h3>演習・課題セレクト</h3>
            <p>第1〜7回の重要課題（ドントケアQ-M、3bit比較器、DEMUX、FF変換、時間計算）を厳選。</p>
          </div>
        </a>
        <a href="#flashcards" class="card-link">
          <div>
            <span class="tag tag-ok">暗記・記述</span>
            <h3>記述対策カード</h3>
            <p>「なぜ必要か」「動作原理」「設計の考え方6柱」を一問一答でチェック＆進捗保存。</p>
          </div>
        </a>
      </div>
    `;
  }

  function renderUnit(mainEl, unitId) {
    const idx = S.Units.findIndex((u) => u.id === unitId);
    const u = S.Units[idx];
    if (!u) return renderHome(mainEl);

    const prev = S.Units[idx - 1];
    const next = S.Units[idx + 1];

    const sectionsHtml = u.sections.map((sec) => `
      <article class="topic-card">
        <h2>${sec.title} ${sec.badge ? `<span class="tag ${sec.badge.includes('超重要') || sec.badge.includes('過去問') ? 'tag-warn' : 'tag-blue'}">${sec.badge}</span>` : ''}</h2>
        ${sec.html}
      </article>
    `).join('');

    const checksHtml = u.checkpoints.map((c) => {
      const checked = !!progress.checks[c.id];
      return `
        <label class="checklist-item ${checked ? 'checked' : ''}">
          <input type="checkbox" data-check-id="${c.id}" ${checked ? 'checked' : ''}>
          <span>${c.text}</span>
        </label>
      `;
    }).join('');

    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta">
          <span class="tag tag-blue">単元 ${u.code}</span>
          <span class="tag">${u.pages}</span>
        </div>
        <h1>${u.title}</h1>
        <p>${u.summary}</p>
      </div>

      ${sectionsHtml}

      <section class="topic-card">
        <h2>この単元の到達度チェック（学習のポイント）</h2>
        <div class="checklist">${checksHtml}</div>
      </section>

      <div class="unit-pager">
        ${prev ? `<a href="#${prev.id}" class="btn">← ${prev.code} ${prev.title}</a>` : `<a href="#home" class="btn">← トップへ</a>`}
        ${next ? `<a href="#${next.id}" class="btn btn-primary">${next.code} ${next.title} →</a>` : `<a href="#past-exam" class="btn btn-warn">過去問（山田）に挑戦 →</a>`}
      </div>
    `;

    mainEl.querySelectorAll('[data-check-id]').forEach((cb) => {
      cb.addEventListener('change', () => {
        toggleCheck(cb.dataset.checkId, cb.checked);
        cb.closest('.checklist-item').classList.toggle('checked', cb.checked);
      });
    });
  }

  function renderPastExam(mainEl) {
    const pe = S.PastExam;
    const probsHtml = pe.problems.map((p) => {
      const done = !!progress.checks['done-' + p.id];
      return `
        <section class="exam-problem">
          <div class="exam-problem-head">
            <div>
              <span class="tag tag-warn">${p.num}</span>
              <span class="tag">${p.points}</span>
              <a href="${p.unitLink}" class="tag tag-blue">${p.unitLabel}</a>
            </div>
            <label style="display:inline-flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;font-weight:700;color:${done ? 'var(--ok)' : 'var(--ink-muted)'};">
              <input type="checkbox" data-check-id="done-${p.id}" ${done ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--ok);">
              自力で解けた！
            </label>
          </div>
          <div class="exam-q-box">${p.question}</div>
          <div class="reveal-controls">
            <button class="btn btn-sm" data-toggle-panel="hint-${p.id}">ヒントを見る</button>
            <button class="btn btn-sm btn-primary" data-toggle-panel="ans-${p.id}">解答・解説を表示</button>
          </div>
          <div id="hint-${p.id}" class="reveal-panel hint-panel">
            <strong>解法のヒント：</strong>${p.hint}
          </div>
          <div id="ans-${p.id}" class="reveal-panel ans-panel">
            ${p.answer}
          </div>
        </section>
      `;
    }).join('');

    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta"><span class="tag tag-warn">過去問完全解説</span><span class="tag">全6問</span></div>
        <h1>${pe.title}</h1>
        <p>${pe.subtitle}</p>
      </div>
      <div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-sm" id="expand-all-ans">すべての解答を開く</button>
        <button class="btn btn-sm" id="collapse-all-ans">すべての解答を閉じる</button>
      </div>
      ${probsHtml}
    `;

    bindRevealAndChecks(mainEl);
  }

  /* ---------- Basics Guide Full Page (#basics) ---------- */
  function renderBasicsPage(mainEl) {
    const items = S.BasicsGuide;
    const jumps = items.map((it) => `<button class="btn btn-sm" data-jump="${it.id}">${it.short}</button>`).join('');
    const cards = items.map((it) => `
      <article class="topic-card" id="sec-${it.id}">
        <h2>${it.title}</h2>
        ${it.html}
      </article>
    `).join('');

    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta"><span class="tag tag-ok">予備知識ゼロOK</span><span class="tag tag-blue">全8レシピ</span></div>
        <h1>基本の解き方まとめ（ゼロからわかる虎の巻）</h1>
        <p>0と1の基本演算から、加法標準形・カルノー図・Q-M法・CLA・FF入力方程式・時間定数計算までを最短ルートで整理しました。どの問題ページからでも右下の<strong>「基本の解き方」</strong>ボタンで横に開いたまま見られます！</p>
      </div>
      <div class="trainer-controls" style="gap:6px;">${jumps}</div>
      ${cards}
    `;

    mainEl.querySelectorAll('[data-jump]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const el = document.getElementById('sec-' + btn.dataset.jump);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ---------- Textbook Problems View ---------- */
  const tbState = { chapter: 'all', kind: 'all' };

  function renderTextbook(mainEl) {
    const all = S.TextbookProblems;
    const chCounts = {
      3: all.filter((p) => p.chapter === 3).length,
      4: all.filter((p) => p.chapter === 4).length,
      5: all.filter((p) => p.chapter === 5).length
    };
    const doneTotal = all.filter((p) => progress.checks['done-' + p.id]).length;

    const filtered = all.filter((p) => {
      if (tbState.chapter !== 'all' && String(p.chapter) !== tbState.chapter) return false;
      if (tbState.kind === 'example' && p.type !== 'example') return false;
      if (tbState.kind === 'exercise' && p.type !== 'exercise') return false;
      if (tbState.kind === 'todo' && progress.checks['done-' + p.id]) return false;
      return true;
    });

    const probsHtml = filtered.length
      ? filtered.map((p) => {
          const done = !!progress.checks['done-' + p.id];
          return `
            <section class="exam-problem">
              <div class="exam-problem-head">
                <div>
                  <span class="tag ${p.type === 'example' ? 'tag-blue' : 'tag-warn'}">${p.num}</span>
                  <span class="tag">第${p.chapter}章 ${p.page}</span>
                  <a href="${p.unitLink}" class="tag">${p.unitLabel}</a>
                </div>
                <label style="display:inline-flex;align-items:center;gap:6px;font-size:13px;cursor:pointer;font-weight:700;color:${done ? 'var(--ok)' : 'var(--ink-muted)'};">
                  <input type="checkbox" data-check-id="done-${p.id}" ${done ? 'checked' : ''} style="width:16px;height:16px;accent-color:var(--ok);">
                  自力で解けた！
                </label>
              </div>
              <h2 style="margin:6px 0 12px;font-size:17px;">${p.title}</h2>
              <div class="exam-q-box">${p.question}</div>
              <div class="reveal-controls">
                <button class="btn btn-sm" data-toggle-panel="hint-${p.id}">ヒントを見る</button>
                <button class="btn btn-sm btn-primary" data-toggle-panel="ans-${p.id}">解答・解説を表示</button>
              </div>
              <div id="hint-${p.id}" class="reveal-panel hint-panel">${p.hint}</div>
              <div id="ans-${p.id}" class="reveal-panel ans-panel">${p.answer}</div>
            </section>
          `;
        }).join('')
      : '<div class="callout callout-ok"><div class="callout-title">該当する問題はありません</div>フィルターを切り替えて他の問題を確認してください。</div>';

    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta">
          <span class="tag tag-blue">浜辺隆二『論理回路入門』</span>
          <span class="tag tag-ok">解けた ${doneTotal} / ${all.length} 問</span>
        </div>
        <h1>教科書の例題・演習問題まとめ</h1>
        <p>中間試験範囲（3.5・4.3〜4.7・5.1・5.3〜5.4）に登場する教科書の例題と演習問題をすべて収録。ヒント→解答の順で自力演習できます。</p>
      </div>

      <div class="tabs" style="margin-bottom:12px;">
        <button class="tab-btn ${tbState.chapter === 'all' ? 'active' : ''}" data-tb-ch="all">すべて (${all.length})</button>
        <button class="tab-btn ${tbState.chapter === '3' ? 'active' : ''}" data-tb-ch="3">第3章 Q-M法 (${chCounts[3]})</button>
        <button class="tab-btn ${tbState.chapter === '4' ? 'active' : ''}" data-tb-ch="4">第4章 演算・組合せ (${chCounts[4]})</button>
        <button class="tab-btn ${tbState.chapter === '5' ? 'active' : ''}" data-tb-ch="5">第5章 順序回路・FF (${chCounts[5]})</button>
      </div>

      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:16px;">
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm ${tbState.kind === 'all' ? 'btn-primary' : ''}" data-tb-kind="all">全種別</button>
          <button class="btn btn-sm ${tbState.kind === 'example' ? 'btn-primary' : ''}" data-tb-kind="example">例題のみ</button>
          <button class="btn btn-sm ${tbState.kind === 'exercise' ? 'btn-warn' : ''}" data-tb-kind="exercise">演習問題のみ</button>
          <button class="btn btn-sm ${tbState.kind === 'todo' ? 'btn-ok' : ''}" data-tb-kind="todo">未チェックのみ</button>
        </div>
        <div style="display:flex;gap:6px;flex-wrap:wrap;">
          <button class="btn btn-sm" id="expand-all-ans">すべての解答を開く</button>
          <button class="btn btn-sm" id="collapse-all-ans">すべて閉じる</button>
        </div>
      </div>

      ${probsHtml}
    `;

    bindRevealAndChecks(mainEl);
    mainEl.querySelectorAll('[data-tb-ch]').forEach((btn) => {
      btn.addEventListener('click', () => {
        tbState.chapter = btn.dataset.tbCh;
        renderTextbook(mainEl);
      });
    });
    mainEl.querySelectorAll('[data-tb-kind]').forEach((btn) => {
      btn.addEventListener('click', () => {
        tbState.kind = btn.dataset.tbKind;
        renderTextbook(mainEl);
      });
    });
    mainEl.querySelectorAll('[data-check-id]').forEach((cb) => {
      cb.addEventListener('change', () => {
        if (tbState.kind === 'todo') renderTextbook(mainEl);
      });
    });
  }

  function renderExercises(mainEl) {
    const itemsHtml = S.Exercises.map((ex) => `
      <section class="exam-problem">
        <div class="exam-problem-head">
          <div>
            <span class="tag tag-blue">${ex.num}</span>
            <span class="tag">${ex.tag}</span>
          </div>
        </div>
        <h2 style="margin:6px 0 12px;font-size:17px;">${ex.title}</h2>
        <div class="exam-q-box">${ex.question}</div>
        <div class="reveal-controls">
          <button class="btn btn-sm" data-toggle-panel="hint-${ex.id}">ヒントを見る</button>
          <button class="btn btn-sm btn-primary" data-toggle-panel="ans-${ex.id}">解答・解説を表示</button>
        </div>
        <div id="hint-${ex.id}" class="reveal-panel hint-panel">${ex.hint}</div>
        <div id="ans-${ex.id}" class="reveal-panel ans-panel">${ex.answer}</div>
      </section>
    `).join('');

    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta"><span class="tag tag-blue">講義演習・課題セレクト</span><span class="tag">全${S.Exercises.length}問</span></div>
        <h1>講義演習・重要課題セレクト</h1>
        <p>過去問には出題されなかったが試験範囲で特に重要な「ドントケアQ-M」「3ビット比較器」「オーバーフロー」「DEMUX」「FF変換」「時間定数・非同期カウンタ計算」を重点収録。</p>
      </div>
      <div style="margin-bottom:16px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-sm" id="expand-all-ans">すべての解答を開く</button>
        <button class="btn btn-sm" id="collapse-all-ans">すべての解答を閉じる</button>
      </div>
      ${itemsHtml}
    `;

    bindRevealAndChecks(mainEl);
  }

  function bindRevealAndChecks(mainEl) {
    mainEl.querySelectorAll('[data-toggle-panel]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.dataset.togglePanel);
        if (panel) panel.classList.toggle('open');
      });
    });
    mainEl.querySelectorAll('[data-check-id]').forEach((cb) => {
      cb.addEventListener('change', () => {
        toggleCheck(cb.dataset.checkId, cb.checked);
      });
    });
    const expBtn = mainEl.querySelector('#expand-all-ans');
    const colBtn = mainEl.querySelector('#collapse-all-ans');
    if (expBtn) expBtn.addEventListener('click', () => mainEl.querySelectorAll('.ans-panel').forEach((p) => p.classList.add('open')));
    if (colBtn) colBtn.addEventListener('click', () => mainEl.querySelectorAll('.reveal-panel').forEach((p) => p.classList.remove('open')));
  }

  /* ---------- Flashcards View ---------- */
  const fcState = { filter: 'all', idx: 0, flipped: false };

  function renderFlashcards(mainEl) {
    const masteredCount = S.Flashcards.filter((c) => progress.fc[c.id] === 'ok').length;
    const list = S.Flashcards.filter((c) => {
      if (fcState.filter === 'unmastered') return progress.fc[c.id] !== 'ok';
      return true;
    });

    if (list.length === 0) {
      mainEl.innerHTML = `
        <div class="page-header">
          <h1>記述対策・重要語句カード</h1>
        </div>
        <div class="callout callout-ok">
          <div class="callout-title">全 ${S.Flashcards.length} 枚マスター達成！</div>
          すべての記述・語句カードが「完璧」になりました！試験直前に「すべて表示」でもう一度総復習しましょう。
          <div style="margin-top:12px;"><button class="btn btn-sm" id="fc-show-all">すべてのカードを表示</button></div>
        </div>
      `;
      mainEl.querySelector('#fc-show-all').addEventListener('click', () => {
        fcState.filter = 'all';
        fcState.idx = 0;
        renderFlashcards(mainEl);
      });
      return;
    }

    if (fcState.idx >= list.length) fcState.idx = 0;
    const card = list[fcState.idx];
    const isOk = progress.fc[card.id] === 'ok';

    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta">
          <span class="tag tag-ok">マスター済 ${masteredCount} / ${S.Flashcards.length}</span>
          <span class="tag">記述・定義・公式対策</span>
        </div>
        <h1>記述対策・重要語句フラッシュカード</h1>
        <p>カードをクリックして答えを確認。「完璧！」と「もう一回」で進捗をブラウザに保存できます。</p>
      </div>

      <div class="fc-wrap">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:12px;">
          <div style="display:flex;gap:6px;">
            <button class="btn btn-sm ${fcState.filter === 'all' ? 'btn-primary' : ''}" id="fc-f-all">すべて (${S.Flashcards.length})</button>
            <button class="btn btn-sm ${fcState.filter === 'unmastered' ? 'btn-warn' : ''}" id="fc-f-un">未マスターのみ (${S.Flashcards.length - masteredCount})</button>
          </div>
          <span class="mono" style="font-size:13px;color:var(--ink-muted);">${fcState.idx + 1} / ${list.length}</span>
        </div>

        <div class="fc-card" id="fc-card-box">
          <div>
            <div style="display:flex;gap:6px;flex-wrap:wrap;">
              <span class="tag tag-blue">${card.unit}</span>
              <span class="tag tag-warn">${card.tag}</span>
              ${isOk ? '<span class="tag tag-ok">完璧済</span>' : ''}
            </div>
            <div class="fc-question">${card.q}</div>
          </div>
          ${fcState.flipped
            ? `<div class="fc-answer">${card.a.replace(/\n/g, '<br>')}</div>`
            : `<div style="color:var(--accent);font-size:13.5px;font-weight:700;margin-top:16px;">▶ タップ / クリックして解答を表示</div>`
          }
        </div>

        <div class="fc-actions">
          <div style="display:flex;gap:8px;">
            <button class="btn btn-sm" id="fc-prev">← 前へ</button>
            <button class="btn btn-sm" id="fc-next">次へ →</button>
          </div>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-sm btn-warn" id="fc-retry">もう一回</button>
            <button class="btn btn-sm btn-ok" id="fc-master">完璧！ ✓</button>
          </div>
        </div>
      </div>
    `;

    mainEl.querySelector('#fc-card-box').addEventListener('click', () => {
      fcState.flipped = !fcState.flipped;
      renderFlashcards(mainEl);
    });
    mainEl.querySelector('#fc-f-all').addEventListener('click', () => { fcState.filter = 'all'; fcState.idx = 0; fcState.flipped = false; renderFlashcards(mainEl); });
    mainEl.querySelector('#fc-f-un').addEventListener('click', () => { fcState.filter = 'unmastered'; fcState.idx = 0; fcState.flipped = false; renderFlashcards(mainEl); });
    mainEl.querySelector('#fc-prev').addEventListener('click', () => { fcState.idx = (fcState.idx - 1 + list.length) % list.length; fcState.flipped = false; renderFlashcards(mainEl); });
    mainEl.querySelector('#fc-next').addEventListener('click', () => { fcState.idx = (fcState.idx + 1) % list.length; fcState.flipped = false; renderFlashcards(mainEl); });
    mainEl.querySelector('#fc-retry').addEventListener('click', () => {
      progress.fc[card.id] = 'retry';
      saveProgress(progress);
      fcState.idx = (fcState.idx + 1) % list.length;
      fcState.flipped = false;
      renderFlashcards(mainEl);
    });
    mainEl.querySelector('#fc-master').addEventListener('click', () => {
      progress.fc[card.id] = 'ok';
      saveProgress(progress);
      fcState.idx = fcState.filter === 'unmastered' ? fcState.idx : (fcState.idx + 1) % list.length;
      fcState.flipped = false;
      renderFlashcards(mainEl);
    });
  }

  /* ---------- Search ---------- */
  function renderSearch(mainEl, query) {
    const q = query.trim().toLowerCase();
    if (!q) return renderHome(mainEl);

    const results = [];
    const strip = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

    S.Units.forEach((u) => {
      u.sections.forEach((sec) => {
        const text = `${u.title} ${sec.title} ${strip(sec.html)}`;
        if (text.toLowerCase().includes(q)) {
          results.push({ href: `#${u.id}`, tag: `単元 ${u.code}`, title: `${sec.title}`, snippet: strip(sec.html).slice(0, 120) + '…' });
        }
      });
    });
    S.PastExam.problems.forEach((p) => {
      const text = `${p.num} ${p.unitLabel} ${strip(p.question)} ${strip(p.answer)}`;
      if (text.toLowerCase().includes(q)) {
        results.push({ href: '#past-exam', tag: `過去問 ${p.num}`, title: `${p.num}（${p.unitLabel}）`, snippet: strip(p.question).slice(0, 120) + '…' });
      }
    });
    S.TextbookProblems.forEach((p) => {
      const text = `${p.num} ${p.title} ${p.unitLabel} ${strip(p.question)} ${strip(p.answer)}`;
      if (text.toLowerCase().includes(q)) {
        results.push({ href: '#textbook', tag: `教科書 ${p.num}`, title: `${p.num}：${p.title}`, snippet: strip(p.question).slice(0, 120) + '…' });
      }
    });
    S.BasicsGuide.forEach((b) => {
      const text = `${b.title} ${strip(b.html)}`;
      if (text.toLowerCase().includes(q)) {
        results.push({ href: '#basics', tag: '基本の解き方', title: b.title, snippet: strip(b.html).slice(0, 120) + '…' });
      }
    });
    S.Flashcards.forEach((c) => {
      if (`${c.q} ${c.a} ${c.unit}`.toLowerCase().includes(q)) {
        results.push({ href: '#flashcards', tag: '暗記カード', title: c.q, snippet: c.a.slice(0, 110) + '…' });
      }
    });

    mainEl.innerHTML = `
      <div class="page-header">
        <h1>検索結果：「${query}」</h1>
        <p>${results.length} 件ヒットしました。</p>
      </div>
      ${results.length
        ? results.map((r) => `
            <a href="${r.href}" class="search-result-item">
              <span class="tag tag-blue" style="margin-bottom:4px;">${r.tag}</span>
              <div style="font-weight:700;margin:2px 0;">${r.title}</div>
              <div style="font-size:13px;color:var(--ink-muted);">${r.snippet}</div>
            </a>
          `).join('')
        : '<div class="callout">一致する項目が見つかりませんでした。別のキーワード（例：CLA、オーバーフロー、グレイ、励起表、メタステーブル）でお試しください。</div>'
      }
    `;
  }

  /* ---------- Routing & Mobile Nav ---------- */
  function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
    document.getElementById('sidebar-backdrop').classList.remove('open');
  }

  function route() {
    const hash = (location.hash || '#home').replace(/^#/, '');
    const mainEl = document.getElementById('main-content');

    // Update active links
    document.querySelectorAll('.nav-item').forEach((a) => {
      a.classList.toggle('active', a.dataset.route === hash);
    });
    document.querySelectorAll('.bottom-nav-item').forEach((a) => {
      const r = a.dataset.route;
      const isActive = r === hash || (r === 'units' && hash.startsWith('unit-'));
      a.classList.toggle('active', isActive);
    });

    if (hash === 'home' || hash === '') renderHome(mainEl);
    else if (hash === 'basics') renderBasicsPage(mainEl);
    else if (hash.startsWith('unit-')) renderUnit(mainEl, hash);
    else if (hash === 'past-exam') renderPastExam(mainEl);
    else if (hash === 'textbook') renderTextbook(mainEl);
    else if (hash === 'exercises') renderExercises(mainEl);
    else if (hash === 'trainers') S.Trainers.render(mainEl);
    else if (hash === 'flashcards') renderFlashcards(mainEl);
    else renderHome(mainEl);

    closeSidebar();
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  const THEME_KEY = 'switch_study_theme_v1';
  const SUN_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
  const MOON_ICON = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function syncThemeIcons() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.innerHTML = isDark ? SUN_ICON : MOON_ICON;
      btn.setAttribute('aria-label', isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
      btn.setAttribute('title', isDark ? 'ライトモードに切り替え' : 'ダークモードに切り替え');
    });
  }

  function toggleTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem(THEME_KEY, 'light'); } catch {}
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      try { localStorage.setItem(THEME_KEY, 'dark'); } catch {}
    }
    syncThemeIcons();
  }

  /* ---------- Quick Reference Slide-in Drawer ---------- */
  let activeCheatIdx = 0;

  function renderCheatDrawer() {
    const tabsEl = document.getElementById('cheat-tabs');
    const bodyEl = document.getElementById('cheat-body');
    if (!tabsEl || !bodyEl || !S.BasicsGuide) return;

    tabsEl.innerHTML = S.BasicsGuide.map((it, i) => `
      <button class="cheat-tab-btn ${i === activeCheatIdx ? 'active' : ''}" data-cheat-idx="${i}">${it.short}</button>
    `).join('');

    const cur = S.BasicsGuide[activeCheatIdx];
    bodyEl.innerHTML = `<h3>${cur.title}</h3>${cur.html}`;
    bodyEl.scrollTop = 0;

    tabsEl.querySelectorAll('[data-cheat-idx]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeCheatIdx = Number(btn.dataset.cheatIdx);
        renderCheatDrawer();
      });
    });
  }

  function setCheatOpen(open) {
    const drawer = document.getElementById('cheat-drawer');
    if (!drawer) return;
    drawer.classList.toggle('open', open);
    document.body.classList.toggle('cheat-open', open);
    if (open) renderCheatDrawer();
  }

  document.addEventListener('DOMContentLoaded', () => {
    syncThemeIcons();
    document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', toggleTheme);
    });
    const cheatFab = document.getElementById('cheat-fab');
    const cheatClose = document.getElementById('cheat-close');
    const cheatOpenPage = document.getElementById('cheat-open-page');
    if (cheatFab) cheatFab.addEventListener('click', () => {
      const isOpen = document.getElementById('cheat-drawer').classList.contains('open');
      setCheatOpen(!isOpen);
    });
    if (cheatClose) cheatClose.addEventListener('click', () => setCheatOpen(false));
    if (cheatOpenPage) cheatOpenPage.addEventListener('click', () => setCheatOpen(false));
    updateProgressUI();
    route();
    window.addEventListener('hashchange', route);

    document.getElementById('menu-toggle').addEventListener('click', () => {
      document.getElementById('sidebar').classList.add('open');
      document.getElementById('sidebar-backdrop').classList.add('open');
    });
    document.getElementById('menu-close').addEventListener('click', closeSidebar);
    document.getElementById('sidebar-backdrop').addEventListener('click', closeSidebar);

    const searchInput = document.getElementById('global-search');
    searchInput.addEventListener('input', () => {
      const val = searchInput.value;
      const mainEl = document.getElementById('main-content');
      if (val.trim()) renderSearch(mainEl, val);
      else route();
    });
  });
})();
