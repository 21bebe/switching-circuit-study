/* =========================================================
   Interactive Calculation Trainers & Simulators
   1. Quine-McCluskey Step Solver (3 & 4 vars + Don't Care)
   2. 4-bit Adder/Subtractor + CLA + Overflow Simulator
   3. FF Excitation Table & Input Equation Drill
   4. FF Timing Constraints & Async Counter Calculator
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

window.SwitchStudy.Trainers = (() => {
  const ov = (s) => `<span class="ov">${s}</span>`;

  /* ---------- Helpers for Q-M Solver ---------- */
  function patternToHtml(pat, vars) {
    let out = '';
    for (let i = 0; i < pat.length; i++) {
      if (pat[i] === '1') out += vars[i];
      else if (pat[i] === '0') out += ov(vars[i]);
    }
    return out || '1';
  }

  function countOnes(pat) {
    return (pat.match(/1/g) || []).length;
  }

  function combinePatterns(a, b) {
    let diff = 0;
    let res = '';
    for (let i = 0; i < a.length; i++) {
      if (a[i] === b[i]) {
        res += a[i];
      } else if (a[i] !== '-' && b[i] !== '-') {
        diff++;
        res += '-';
      } else {
        return null;
      }
    }
    return diff === 1 ? res : null;
  }

  function patternCovers(pat, mintermBin) {
    for (let i = 0; i < pat.length; i++) {
      if (pat[i] !== '-' && pat[i] !== mintermBin[i]) return false;
    }
    return true;
  }

  function solveQM(numVars, states) {
    const vars = numVars === 3 ? ['A', 'B', 'C'] : ['A', 'B', 'C', 'D'];
    const total = 1 << numVars;
    const ones = [];
    const dcs = [];
    for (let m = 0; m < total; m++) {
      if (states[m] === 1) ones.push(m);
      else if (states[m] === 2) dcs.push(m);
    }
    if (ones.length === 0) {
      return { vars, ones, dcs, stages: [], primes: [], essential: [], solution: '0' };
    }
    if (ones.length + dcs.length === total) {
      return { vars, ones, dcs, stages: [], primes: ['-'.repeat(numVars)], essential: ['-'.repeat(numVars)], solution: '1' };
    }

    const toBin = (m) => m.toString(2).padStart(numVars, '0');
    let current = [...ones, ...dcs].map((m) => ({
      pat: toBin(m),
      isDC: states[m] === 2,
      checked: false
    }));

    const stages = [];
    const primes = [];

    while (current.length > 0) {
      const groups = {};
      current.forEach((item) => {
        const k = countOnes(item.pat);
        if (!groups[k]) groups[k] = [];
        groups[k].push(item);
      });

      const nextMap = new Map();
      const keys = Object.keys(groups).map(Number).sort((a, b) => a - b);

      for (let i = 0; i < keys.length - 1; i++) {
        const g1 = groups[keys[i]];
        const g2 = groups[keys[i + 1]];
        if (keys[i + 1] - keys[i] !== 1) continue;
        for (const a of g1) {
          for (const b of g2) {
            const c = combinePatterns(a.pat, b.pat);
            if (c) {
              a.checked = true;
              b.checked = true;
              if (!nextMap.has(c)) {
                nextMap.set(c, { pat: c, isDC: false, checked: false });
              }
            }
          }
        }
      }

      stages.push(current.map((x) => ({ ...x, onesCount: countOnes(x.pat) })).sort((a, b) => a.onesCount - b.onesCount || a.pat.localeCompare(b.pat)));
      current.forEach((item) => {
        if (!item.checked && !primes.includes(item.pat)) {
          // Exclude prime implicants that ONLY cover don't cares
          const coversReal = ones.some((m) => patternCovers(item.pat, toBin(m)));
          if (coversReal) primes.push(item.pat);
        }
      });

      current = Array.from(nextMap.values());
    }

    // Build prime implicant chart over real minterms (ones)
    const chart = ones.map((m) => {
      const bin = toBin(m);
      return {
        m,
        bin,
        coveredBy: primes.filter((p) => patternCovers(p, bin))
      };
    });

    // Find essential prime implicants
    const essentialSet = new Set();
    chart.forEach((row) => {
      if (row.coveredBy.length === 1) {
        essentialSet.add(row.coveredBy[0]);
      }
    });
    const essential = Array.from(essentialSet);

    // Find remaining uncovered minterms
    const coveredByEss = new Set();
    chart.forEach((row) => {
      if (row.coveredBy.some((p) => essentialSet.has(p))) {
        coveredByEss.add(row.m);
      }
    });

    const remainingRows = chart.filter((r) => !coveredByEss.has(r.m));
    let selected = [...essential];

    if (remainingRows.length > 0) {
      // Exact minimum cover search over non-essential primes
      const remPrimes = primes.filter((p) => !essentialSet.has(p));
      let best = null;
      const limit = Math.min(remPrimes.length, 14);
      const totalMasks = 1 << limit;
      for (let mask = 1; mask < totalMasks; mask++) {
        const chosen = [];
        for (let i = 0; i < limit; i++) {
          if (mask & (1 << i)) chosen.push(remPrimes[i]);
        }
        if (best && chosen.length > best.length) continue;
        const ok = remainingRows.every((row) => chosen.some((p) => row.coveredBy.includes(p)));
        if (ok) {
          const litCount = (arr) => arr.reduce((acc, p) => acc + p.replace(/-/g, '').length, 0);
          if (!best || chosen.length < best.length || (chosen.length === best.length && litCount(chosen) < litCount(best))) {
            best = chosen;
          }
        }
      }
      if (best) selected = [...selected, ...best];
    }

    const solution = selected.map((p) => patternToHtml(p, vars)).join(' + ');
    return { vars, ones, dcs, stages, primes, chart, essential, selected, solution };
  }

  /* ---------- Trainer 1: Q-M法ソルバー ---------- */
  const qmState = {
    numVars: 3,
    // Past Exam Q1: Z = AC + AB'C' + A'BC -> m(3,4,5,7)
    states: [0, 0, 0, 1, 1, 1, 0, 1]
  };

  function applyQmPreset(key) {
    if (key === 'past-q1') {
      qmState.numVars = 3;
      qmState.states = [0, 0, 0, 1, 1, 1, 0, 1]; // m(3,4,5,7)
    } else if (key === 'ex-3-8') {
      qmState.numVars = 4;
      // Z = A'BC + ABC' + ABD + BC'D + A'CD' + ACD' -> m(2,5,6,7,10,12,13,14,15)
      qmState.states = Array(16).fill(0);
      [2, 5, 6, 7, 10, 12, 13, 14, 15].forEach((i) => (qmState.states[i] = 1));
    } else if (key === 'ex-3-7') {
      qmState.numVars = 4;
      // Z = m(0,2,9,13,15), DC = m(1,4,5,6)
      qmState.states = Array(16).fill(0);
      [0, 2, 9, 13, 15].forEach((i) => (qmState.states[i] = 1));
      [1, 4, 5, 6].forEach((i) => (qmState.states[i] = 2));
    } else if (key === 'hw-3-8-3') {
      qmState.numVars = 4;
      // 演習3.8(3): ones = m(1,3,4,5,7,13), DC = m(6,14,15)
      qmState.states = Array(16).fill(0);
      [1, 3, 4, 5, 7, 13].forEach((i) => (qmState.states[i] = 1));
      [6, 14, 15].forEach((i) => (qmState.states[i] = 2));
    }
  }

  function renderQM(container) {
    const res = solveQM(qmState.numVars, qmState.states);
    const total = 1 << qmState.numVars;
    const toBin = (m) => m.toString(2).padStart(qmState.numVars, '0');

    const cellsHtml = Array.from({ length: total }, (_, m) => {
      const st = qmState.states[m];
      const cls = st === 1 ? 'state-1' : st === 2 ? 'state-x' : '';
      const val = st === 1 ? '1' : st === 2 ? '×' : '0';
      const term = patternToHtml(toBin(m), res.vars);
      return `<button class="qm-minterm-btn ${cls}" data-qm-cell="${m}">
        <span>m${m}: ${term}</span>
        <span class="mt-val">${val}</span>
      </button>`;
    }).join('');

    const stagesHtml = res.stages.map((st, idx) => {
      const label = idx === 0 ? '最小項' : `${qmState.numVars - idx}変数項`;
      const rows = st.map((item) => `
        <tr>
          <td class="mono-cell">${item.onesCount}</td>
          <td class="mono-cell">${patternToHtml(item.pat, res.vars)} ${item.isDC ? '<span class="tag tag-warn">DC</span>' : ''}</td>
          <td class="mono-cell">${item.pat}</td>
          <td>${item.checked ? '<span style="color:var(--ink-muted)">✓ 結合済</span>' : '<span class="tag tag-ok">主項</span>'}</td>
        </tr>
      `).join('');
      return `
        <div>
          <h4 style="margin:8px 0 6px;font-size:14px;">ステップ ${idx + 1}：${label}</h4>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>1の数</th><th>項</th><th>2進</th><th>状態</th></tr></thead>
            <tbody>${rows}</tbody>
          </table></div>
        </div>
      `;
    }).join('');

    let chartHtml = '<p style="color:var(--ink-muted)">最小項を1つ以上選択してください。</p>';
    if (res.ones.length > 0 && res.primes.length > 0 && res.chart) {
      const ths = res.primes.map((p) => {
        const isEss = res.essential.includes(p);
        const isSel = res.selected.includes(p);
        return `<th>${patternToHtml(p, res.vars)} ${isEss ? '<br><span class="tag tag-ok">必須★</span>' : isSel ? '<br><span class="tag tag-blue">選択</span>' : '<br><span class="tag">不要</span>'}</th>`;
      }).join('');
      const trs = res.chart.map((row) => {
        const tds = res.primes.map((p) => {
          const hit = row.coveredBy.includes(p);
          const isUnique = hit && row.coveredBy.length === 1;
          return `<td class="${isUnique ? 'hi-ess' : hit ? 'hi-1' : ''}">${isUnique ? '✓ (唯一)' : hit ? '✓' : ''}</td>`;
        }).join('');
        return `<tr><td class="mono-cell">${patternToHtml(row.bin, res.vars)}</td>${tds}</tr>`;
      }).join('');
      chartHtml = `<div class="table-wrap"><table class="logic-table"><thead><tr><th>最小項（DC除外）＼ 主項</th>${ths}</tr></thead><tbody>${trs}</tbody></table></div>`;
    }

    container.innerHTML = `
      <div class="topic-card">
        <h2>Q-M法 ステップ自動ソルバー（ドントケア対応）</h2>
        <p>試験に出る例題・過去問プリセットを選ぶか、下の最小項ボタンをクリック（<code>0 → 1 → ×(DC)</code>）して、結合手順と主項表の選び方を確認できます。</p>
        <div class="trainer-controls">
          <button class="btn btn-sm btn-warn" data-qm-preset="past-q1">過去問 問1 (3変数)</button>
          <button class="btn btn-sm" data-qm-preset="ex-3-8">例題 3.8 (4変数)</button>
          <button class="btn btn-sm" data-qm-preset="ex-3-7">例題 3.7 (DCあり)</button>
          <button class="btn btn-sm" data-qm-preset="hw-3-8-3">演習 3.8(3) (DCあり)</button>
          <button class="btn btn-sm" data-qm-vars="${qmState.numVars === 3 ? 4 : 3}">${qmState.numVars === 3 ? '4変数に切替' : '3変数に切替'}</button>
        </div>

        <h3>1. 最小項の選択（クリックで 0 → 1 → × 切替）</h3>
        <div class="qm-cell-grid">${cellsHtml}</div>

        <div class="callout callout-ok" style="margin-top:16px;">
          <div class="callout-title">最簡形（最終解答）</div>
          <div class="mono" style="font-size:18px;font-weight:700;margin-top:4px;">Z = ${res.solution}</div>
        </div>

        <h3>2. グループ分け＆隣接結合ステップ</h3>
        <div class="grid-2">${stagesHtml || '<p>結合なし</p>'}</div>

        <h3>3. 最小項・主項表（ドントケア項は行から除外！）</h3>
        ${chartHtml}
      </div>
    `;

    container.querySelectorAll('[data-qm-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        applyQmPreset(btn.dataset.qmPreset);
        renderQM(container);
      });
    });
    container.querySelectorAll('[data-qm-vars]').forEach((btn) => {
      btn.addEventListener('click', () => {
        qmState.numVars = Number(btn.dataset.qmVars);
        qmState.states = Array(1 << qmState.numVars).fill(0);
        qmState.states[1] = 1;
        qmState.states[3] = 1;
        renderQM(container);
      });
    });
    container.querySelectorAll('[data-qm-cell]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = Number(btn.dataset.qmCell);
        qmState.states[idx] = (qmState.states[idx] + 1) % 3;
        renderQM(container);
      });
    });
  }

  /* ---------- Trainer 2: 4-bit Adder/Subtractor + CLA + Overflow ---------- */
  const claState = {
    a: [0, 1, 0, 1], // A3, A2, A1, A0 = +5
    b: [0, 1, 0, 0], // B3, B2, B1, B0 = +4
    ctrl: 1 // 1 = Add, 0 = Sub
  };

  function signed4(bits) {
    const val = (bits[0] << 3) | (bits[1] << 2) | (bits[2] << 1) | bits[3];
    return val >= 8 ? val - 16 : val;
  }

  function renderCLA(container) {
    const cIn = claState.ctrl === 1 ? 0 : 1; // C⁻ = C̄
    // MSB is index 0, LSB is index 3 -> let's index bit i (0=LSB .. 3=MSB)
    const A = [claState.a[3], claState.a[2], claState.a[1], claState.a[0]];
    const B = [claState.b[3], claState.b[2], claState.b[1], claState.b[0]];
    const Bp = B.map((bi) => bi ^ cIn);
    const G = [0, 1, 2, 3].map((i) => A[i] & Bp[i]);
    const P = [0, 1, 2, 3].map((i) => A[i] ^ Bp[i]);
    const C = [];
    for (let i = 0; i < 4; i++) {
      const prev = i === 0 ? cIn : C[i - 1];
      C[i] = (prev & P[i]) | G[i];
    }
    const S = [0, 1, 2, 3].map((i) => (i === 0 ? cIn : C[i - 1]) ^ P[i]);
    const ovf = C[3] ^ C[2];

    const aDec = signed4(claState.a);
    const bDec = signed4(claState.b);
    const sDec = signed4([S[3], S[2], S[1], S[0]]);
    const trueVal = claState.ctrl === 1 ? aDec + bDec : aDec - bDec;

    const mkBits = (arr, name) => arr.map((v, idx) => {
      const bitNum = 3 - idx;
      return `<button class="bit-btn ${v ? 'is-1' : ''}" data-cla-bit="${name}-${idx}" title="${name}${bitNum}">${v}</button>`;
    }).join('');

    container.innerHTML = `
      <div class="topic-card">
        <h2>4ビット加減算器・CLA・オーバーフロー シミュレータ</h2>
        <p>ビットをクリックして、生成 <code>G<sub>i</sub></code>・伝搬 <code>P<sub>i</sub></code>・各桁キャリー <code>C<sub>0</sub>〜C<sub>3</sub></code>・オーバーフロー <code>V = C<sub>3</sub> ⊕ C<sub>2</sub></code> の動きをリアルタイム確認できます。</p>

        <div class="trainer-controls">
          <button class="btn btn-sm" data-cla-preset="ok1">+5 + (+1) 正常</button>
          <button class="btn btn-sm btn-warn" data-cla-preset="ovf1">+5 + (+4) オーバーフロー!</button>
          <button class="btn btn-sm" data-cla-preset="ok2">-3 + (-2) 正常(C3=1)</button>
          <button class="btn btn-sm btn-warn" data-cla-preset="ovf2">-5 + (-4) オーバーフロー!</button>
          <button class="btn btn-sm" data-cla-preset="sub1">+3 - (+5) 減算モード</button>
        </div>

        <div class="grid-3" style="margin-bottom:14px;">
          <div class="card" style="margin:0;padding:14px;">
            <div style="font-size:12.5px;color:var(--ink-muted);margin-bottom:6px;">入力 A (A<sub>3</sub>A<sub>2</sub>A<sub>1</sub>A<sub>0</sub>) = <strong>${aDec >= 0 ? '+' + aDec : aDec}</strong></div>
            <div class="bit-toggle-group">${mkBits(claState.a, 'a')}</div>
          </div>
          <div class="card" style="margin:0;padding:14px;">
            <div style="font-size:12.5px;color:var(--ink-muted);margin-bottom:6px;">入力 B (B<sub>3</sub>B<sub>2</sub>B<sub>1</sub>B<sub>0</sub>) = <strong>${bDec >= 0 ? '+' + bDec : bDec}</strong></div>
            <div class="bit-toggle-group">${mkBits(claState.b, 'b')}</div>
          </div>
          <div class="card" style="margin:0;padding:14px;">
            <div style="font-size:12.5px;color:var(--ink-muted);margin-bottom:6px;">制御信号 C (C<sup>-</sup> = ${ov('C')} = ${cIn})</div>
            <button class="btn ${claState.ctrl === 1 ? 'btn-primary' : 'btn-warn'}" id="cla-ctrl-toggle">
              ${claState.ctrl === 1 ? 'C = 1（加算 A + B）' : 'C = 0（減算 A - B）'}
            </button>
          </div>
        </div>

        <div class="callout ${ovf ? 'callout-trap' : 'callout-ok'}">
          <div class="callout-title">${ovf ? '⚠ オーバーフロー発生！ (V = C3 ⊕ C2 = 1)' : '✓ 正常な演算結果 (V = C3 ⊕ C2 = 0)'}</div>
          <div class="mono" style="font-size:15px;">
            結果 S = <strong>${S[3]}${S[2]}${S[1]}${S[0]}</strong>（符号付き10進: <strong>${sDec >= 0 ? '+' + sDec : sDec}</strong> ／ 本来の値: ${trueVal >= 0 ? '+' + trueVal : trueVal}）<br>
            C<sub>3</sub>（符号ビットからの桁上り）= <strong>${C[3]}</strong>　／　C<sub>2</sub>（数値MSBからの桁上り）= <strong>${C[2]}</strong>　→　V = ${C[3]} ⊕ ${C[2]} = <strong>${ovf}</strong>
          </div>
        </div>

        <h3>各桁の CLA（生成 G<sub>i</sub>・伝搬 P<sub>i</sub>・キャリー C<sub>i</sub>・和 S<sub>i</sub>）</h3>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>項目</th><th>bit 3 (符号)</th><th>bit 2 (MSB)</th><th>bit 1</th><th>bit 0 (LSB)</th></tr></thead>
          <tbody>
            <tr><td>A<sub>i</sub></td><td class="mono-cell">${A[3]}</td><td class="mono-cell">${A[2]}</td><td class="mono-cell">${A[1]}</td><td class="mono-cell">${A[0]}</td></tr>
            <tr><td>B'<sub>i</sub> = B<sub>i</sub> ⊕ ${ov('C')}</td><td class="mono-cell">${Bp[3]}</td><td class="mono-cell">${Bp[2]}</td><td class="mono-cell">${Bp[1]}</td><td class="mono-cell">${Bp[0]}</td></tr>
            <tr><td>生成 G<sub>i</sub> = A<sub>i</sub>B'<sub>i</sub></td><td class="mono-cell ${G[3] ? 'hi-1' : ''}">${G[3]}</td><td class="mono-cell ${G[2] ? 'hi-1' : ''}">${G[2]}</td><td class="mono-cell ${G[1] ? 'hi-1' : ''}">${G[1]}</td><td class="mono-cell ${G[0] ? 'hi-1' : ''}">${G[0]}</td></tr>
            <tr><td>伝搬 P<sub>i</sub> = A<sub>i</sub>⊕B'<sub>i</sub></td><td class="mono-cell ${P[3] ? 'hi-1' : ''}">${P[3]}</td><td class="mono-cell ${P[2] ? 'hi-1' : ''}">${P[2]}</td><td class="mono-cell ${P[1] ? 'hi-1' : ''}">${P[1]}</td><td class="mono-cell ${P[0] ? 'hi-1' : ''}">${P[0]}</td></tr>
            <tr><td>キャリー C<sub>i</sub> = C<sub>i-1</sub>P<sub>i</sub>+G<sub>i</sub></td><td class="mono-cell hi-1">C<sub>3</sub>=${C[3]}</td><td class="mono-cell hi-1">C<sub>2</sub>=${C[2]}</td><td class="mono-cell">C<sub>1</sub>=${C[1]}</td><td class="mono-cell">C<sub>0</sub>=${C[0]}</td></tr>
            <tr><td>和 S<sub>i</sub> = C<sub>i-1</sub> ⊕ P<sub>i</sub></td><td class="mono-cell hi-ess">${S[3]}</td><td class="mono-cell hi-ess">${S[2]}</td><td class="mono-cell hi-ess">${S[1]}</td><td class="mono-cell hi-ess">${S[0]}</td></tr>
          </tbody>
        </table></div>
      </div>
    `;

    container.querySelectorAll('[data-cla-bit]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const [name, idx] = btn.dataset.claBit.split('-');
        claState[name][Number(idx)] ^= 1;
        renderCLA(container);
      });
    });
    container.querySelector('#cla-ctrl-toggle').addEventListener('click', () => {
      claState.ctrl ^= 1;
      renderCLA(container);
    });
    container.querySelectorAll('[data-cla-preset]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const p = btn.dataset.claPreset;
        if (p === 'ok1') { claState.a = [0,1,0,1]; claState.b = [0,0,0,1]; claState.ctrl = 1; }
        if (p === 'ovf1') { claState.a = [0,1,0,1]; claState.b = [0,1,0,0]; claState.ctrl = 1; }
        if (p === 'ok2') { claState.a = [1,1,0,1]; claState.b = [1,1,1,0]; claState.ctrl = 1; }
        if (p === 'ovf2') { claState.a = [1,0,1,1]; claState.b = [1,1,0,0]; claState.ctrl = 1; }
        if (p === 'sub1') { claState.a = [0,0,1,1]; claState.b = [0,1,0,1]; claState.ctrl = 0; }
        renderCLA(container);
      });
    });
  }

  /* ---------- Trainer 3: FF Excitation Table & Input Eq Drill ---------- */
  const drillQuestions = [
    { q: 'SR-FF で Q=0 → Q⁺=0 に遷移させる入力 (S, R) は？', opts: ['(0, ×)', '(1, 0)', '(0, 1)', '(×, 0)'], ans: 0, exp: '0のまま保つには保持(0,0)でもリセット(0,1)でもよいので S=0, R=×。' },
    { q: 'SR-FF で Q=0 → Q⁺=1 に遷移させる入力 (S, R) は？', opts: ['(0, ×)', '(1, 0)', '(0, 1)', '(×, 0)'], ans: 1, exp: '0→1 はセット動作しかないので S=1, R=0。' },
    { q: 'SR-FF で Q=1 → Q⁺=1 に遷移させる入力 (S, R) は？', opts: ['(0, ×)', '(1, 0)', '(0, 1)', '(×, 0)'], ans: 3, exp: '1を保つには保持(0,0)でもセット(1,0)でもよいので S=×, R=0。' },
    { q: 'JK-FF で Q=0 → Q⁺=1 に遷移させる入力 (J, K) は？', opts: ['(0, ×)', '(1, ×)', '(×, 1)', '(×, 0)'], ans: 1, exp: 'セット(1,0)でも反転(1,1)でも 0→1 になるので J=1, K=×。' },
    { q: 'JK-FF で Q=1 → Q⁺=0 に遷移させる入力 (J, K) は？', opts: ['(0, ×)', '(1, ×)', '(×, 1)', '(×, 0)'], ans: 2, exp: 'リセット(0,1)でも反転(1,1)でも 1→0 になるので J=×, K=1。' },
    { q: 'JK-FF で Q=1 → Q⁺=1 に遷移させる入力 (J, K) は？', opts: ['(0, ×)', '(1, ×)', '(×, 1)', '(×, 0)'], ans: 3, exp: '保持(0,0)でもセット(1,0)でも 1→1 になるので J=×, K=0。' },
    { q: 'T-FF で Q=1 → Q⁺=0 に遷移させる入力 T は？', opts: ['T = 0', 'T = 1', 'T = ×'], ans: 1, exp: '状態が反転するので T=1。' },
    { q: '応用方程式 Q⁺ = g₁Q + g₂Q̄ に対する JK-FF の入力方程式は？（過去問 問6）', opts: ['J = g₁, K = ḡ₂', 'J = g₂, K = ḡ₁', 'J = g₂Q̄, K = ḡ₁Q', 'J = g₁, K = g₂'], ans: 1, exp: 'JK-FFは励起表に×が多いため極めて簡単になり、J = g₂, K = ḡ₁。' },
    { q: '応用方程式 Q⁺ = g₁Q + g₂Q̄ に対する SR-FF の入力方程式は？', opts: ['S = g₂, R = ḡ₁', 'S = g₂Q̄, R = ḡ₁Q', 'S = g₁Q, R = g₂Q̄', 'S = ḡ₁Q, R = g₂Q̄'], ans: 1, exp: 'SR-FFでは S = g₂Q̄, R = ḡ₁Q。' },
    { q: 'JK-FF を使って D-FF を設計するときの入力方程式 (J, K) は？（演習5.5）', opts: ['J = D, K = D', 'J = D, K = D̄', 'J = D̄, K = D', 'J = 1, K = D'], ans: 1, exp: 'D-FFの特性方程式 Q⁺ = D = D·Q + D·Q̄ より g₁=D, g₂=D。よって J=g₂=D, K=ḡ₁=D̄。' }
  ];
  const drillState = { idx: 0, streak: 0, picked: null };

  function renderFFDrill(container) {
    const item = drillQuestions[drillState.idx];
    const fb = drillState.picked === null ? '' : (
      drillState.picked === item.ans
        ? `<div class="drill-feedback ok">◎ 正解！ ${item.exp}</div>`
        : `<div class="drill-feedback ng">✕ 惜しい！ 正解は <strong>${item.opts[item.ans]}</strong>。${item.exp}</div>`
    );

    container.innerHTML = `
      <div class="topic-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px;">
          <h2 style="margin:0;">FF励起表＆入力方程式 集中ドリル</h2>
          <span class="tag tag-ok">連続正解: ${drillState.streak} 問</span>
        </div>
        <p style="color:var(--ink-muted);margin-top:6px;">問題 ${drillState.idx + 1} / ${drillQuestions.length}</p>
        <div class="exam-q-box" style="font-size:16.5px;font-weight:700;">${item.q}</div>
        <div class="drill-option-grid">
          ${item.opts.map((o, i) => `<button class="btn ${drillState.picked === i ? (i === item.ans ? 'btn-ok' : 'btn-warn') : ''}" data-drill-opt="${i}">${o}</button>`).join('')}
        </div>
        ${fb}
        <div style="margin-top:16px;display:flex;gap:8px;">
          <button class="btn btn-primary" id="drill-next">次の問題へ →</button>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-drill-opt]').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (drillState.picked !== null) return;
        const p = Number(btn.dataset.drillOpt);
        drillState.picked = p;
        if (p === item.ans) drillState.streak++;
        else drillState.streak = 0;
        renderFFDrill(container);
      });
    });
    container.querySelector('#drill-next').addEventListener('click', () => {
      drillState.idx = (drillState.idx + 1) % drillQuestions.length;
      drillState.picked = null;
      renderFFDrill(container);
    });
  }

  /* ---------- Trainer 4: FF Timing & Async Counter Calc ---------- */
  const timingState = {
    tSetup: 5, tHold: 4, tAccMin: 8, tAccMax: 12, tCp: 20,
    modN: 7, counterTacc: 10
  };

  function renderTimingCalc(container) {
    const holdOk = timingState.tHold <= timingState.tAccMin;
    const minTcp = timingState.tSetup + timingState.tAccMax;
    const setupOk = minTcp <= timingState.tCp;
    const maxF = minTcp > 0 ? (1000 / minTcp).toFixed(1) : '∞';

    const ffCount = Math.max(1, Math.ceil(Math.log2(Math.max(2, timingState.modN))));
    const totalDelay = ffCount * timingState.counterTacc;
    const asyncMaxF = totalDelay > 0 ? (1000 / totalDelay).toFixed(1) : '∞';

    container.innerHTML = `
      <div class="grid-2">
        <div class="topic-card">
          <h2>FF時間制約チェッカー</h2>
          <p style="font-size:13.5px;color:var(--ink-secondary)">値を変えてセットアップ／ホールドタイム違反の判定条件を確認できます（単位: ns）。</p>
          <div class="table-wrap"><table class="logic-table">
            <tbody>
              <tr><td class="left">T<sub>setup</sub> (ns)</td><td><input type="number" min="0" max="100" value="${timingState.tSetup}" data-tm="tSetup" style="width:76px;padding:4px;"></td></tr>
              <tr><td class="left">T<sub>hold</sub> (ns)</td><td><input type="number" min="0" max="100" value="${timingState.tHold}" data-tm="tHold" style="width:76px;padding:4px;"></td></tr>
              <tr><td class="left">T<sub>acc</sub><sup>-</sup> 最小値 (ns)</td><td><input type="number" min="0" max="100" value="${timingState.tAccMin}" data-tm="tAccMin" style="width:76px;padding:4px;"></td></tr>
              <tr><td class="left">T<sub>acc</sub><sup>+</sup> 最大値 (ns)</td><td><input type="number" min="0" max="100" value="${timingState.tAccMax}" data-tm="tAccMax" style="width:76px;padding:4px;"></td></tr>
              <tr><td class="left">クロック周期 T<sub>Cp</sub> (ns)</td><td><input type="number" min="1" max="500" value="${timingState.tCp}" data-tm="tCp" style="width:76px;padding:4px;"></td></tr>
            </tbody>
          </table></div>
          <div class="callout ${holdOk ? 'callout-ok' : 'callout-trap'}">
            <div class="callout-title">ホールド条件：T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup></div>
            <span class="mono">${timingState.tHold} ns ≦ ${timingState.tAccMin} ns → <strong>${holdOk ? 'OK（違反なし）' : '✕ ホールドタイム違反！（メタステーブル危険）'}</strong></span>
          </div>
          <div class="callout ${setupOk ? 'callout-ok' : 'callout-trap'}">
            <div class="callout-title">クロック周期条件：T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> ≦ T<sub>Cp</sub></div>
            <span class="mono">${timingState.tSetup} + ${timingState.tAccMax} = ${minTcp} ns ≦ ${timingState.tCp} ns → <strong>${setupOk ? 'OK（正常動作）' : '✕ セットアップタイム違反！'}</strong></span><br>
            <span style="font-size:13px;">最小周期 T<sub>Cp,min</sub> = <strong>${minTcp} ns</strong>（最大クロック周波数 f<sub>max</sub> = <strong>${maxF} MHz</strong>）</span>
          </div>
        </div>

        <div class="topic-card">
          <h2>非同期式カウンタ設計計算機</h2>
          <p style="font-size:13.5px;color:var(--ink-secondary)">任意の進数 N と1段あたりのアクセスタイム T<sub>acc</sub> から必要FF数・遅延・最大周波数を計算します。</p>
          <div class="table-wrap"><table class="logic-table">
            <tbody>
              <tr><td class="left">カウンタの進数 N（2〜64進）</td><td><input type="number" min="2" max="64" value="${timingState.modN}" data-tm="modN" style="width:76px;padding:4px;"></td></tr>
              <tr><td class="left">1段のアクセスタイム T<sub>acc</sub> (ns)</td><td><input type="number" min="1" max="200" value="${timingState.counterTacc}" data-tm="counterTacc" style="width:76px;padding:4px;"></td></tr>
            </tbody>
          </table></div>
          <div class="callout callout-why">
            <div class="callout-title">設計計算結果（非同期式 ${timingState.modN} 進カウンタ）</div>
            <ul style="margin:6px 0 0;padding-left:18px;">
              <li>必要なFFの個数：<strong>n = ${ffCount} 個</strong>（2<sup>${ffCount - 1}</sup>+1 〜 2<sup>${ffCount}</sup> 進の範囲）</li>
              <li>最大累積遅延：<strong>n · T<sub>acc</sub> = ${totalDelay} ns</strong></li>
              <li>信頼できるクロック周期：<strong>T<sub>Cp</sub> &gt; ${totalDelay} ns</strong></li>
              <li>最大動作周波数：<strong>f<sub>Cp</sub> &lt; ${asyncMaxF} MHz</strong></li>
              <li>最上位出力 Q<sub>${ffCount - 1}</sub> の分周比（2<sup>n</sup>進時）：周期 <strong>${1 << ffCount} 倍</strong>（周波数 <strong>1/${1 << ffCount}</strong>）</li>
            </ul>
          </div>
        </div>
      </div>
    `;

    container.querySelectorAll('[data-tm]').forEach((inp) => {
      inp.addEventListener('change', () => {
        timingState[inp.dataset.tm] = Math.max(0, Number(inp.value) || 0);
        renderTimingCalc(container);
      });
    });
  }

  /* ---------- Main Trainers View ---------- */
  let activeTab = 'qm';

  function render(mainEl) {
    mainEl.innerHTML = `
      <div class="page-header">
        <div class="page-meta"><span class="tag tag-blue">実践ツール</span><span class="tag">電卓なし手計算の検算にも！</span></div>
        <h1>計算手順トレーナー＆シミュレータ</h1>
        <p>Q-M法の主項選択・CLAとオーバーフロー判定・FF励起表ドリル・タイミング制約計算を、手を動かして確認できます。</p>
      </div>
      <div class="tabs">
        <button class="tab-btn ${activeTab === 'qm' ? 'active' : ''}" data-tr-tab="qm">1. Q-M法ソルバー</button>
        <button class="tab-btn ${activeTab === 'cla' ? 'active' : ''}" data-tr-tab="cla">2. CLA・オーバーフロー</button>
        <button class="tab-btn ${activeTab === 'ff' ? 'active' : ''}" data-tr-tab="ff">3. FF励起表ドリル</button>
        <button class="tab-btn ${activeTab === 'timing' ? 'active' : ''}" data-tr-tab="timing">4. 時間定数・カウンタ</button>
      </div>
      <div id="trainer-body"></div>
    `;

    const body = mainEl.querySelector('#trainer-body');
    const paint = () => {
      if (activeTab === 'qm') renderQM(body);
      else if (activeTab === 'cla') renderCLA(body);
      else if (activeTab === 'ff') renderFFDrill(body);
      else renderTimingCalc(body);
    };
    paint();

    mainEl.querySelectorAll('[data-tr-tab]').forEach((btn) => {
      btn.addEventListener('click', () => {
        activeTab = btn.dataset.trTab;
        render(mainEl);
      });
    });
  }

  return { render };
})();
