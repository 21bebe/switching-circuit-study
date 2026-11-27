/* =========================================================
   Textbook Problems Collection (浜辺隆二『論理回路入門』)
   試験範囲（3.5, 4.3-4.7, 5.1, 5.3-5.4）の全例題・演習問題 32問
   【手計算の途中式・真理値表・カルノー図・主項表まで完全解説版】
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

(() => {
  const ov = (s) => `<span class="ov">${s}</span>`;
  const D = window.SwitchStudy.Diagrams;

  window.SwitchStudy.TextbookProblems = [
    /* ==================== 第3章 3.5 Q-M法 ==================== */
    {
      id: 'tb-3-e8',
      chapter: 3,
      type: 'example',
      num: '例題 3.8',
      page: 'p.62〜64',
      unitLink: '#unit-1',
      unitLabel: '3.5 Q-M法',
      title: '4変数論理関数のQ-M法による簡単化',
      question: `<p>次式をクワイン・マクラスキー法で簡単化せよ。</p>
        <div class="formula-block">Z = ${ov('A')}BC + AB${ov('C')} + ABD + B${ov('C')}D + ${ov('A')}C${ov('D')} + AC${ov('D')}</div>`,
      hint: `<p>① 欠けている変数に <span class="formula">(X + ${ov('X')})</span> を掛けて加法標準形（9個の最小項）に展開 → ② 肯定変数の個数（1〜4個）でグループ分けして2段階結合 → ③ 最小項・主項表で必須主項を選びます。</p>`,
      answer: `
        <h4>Step 1：加法標準形を求める（欠けている変数を補う）</h4>
        <div class="formula-block">
          Z = ${ov('A')}BC(D+${ov('D')}) + AB${ov('C')}(D+${ov('D')}) + AB(C+${ov('C')})D + (A+${ov('A')})B${ov('C')}D + ${ov('A')}(B+${ov('B')})C${ov('D')} + A(B+${ov('B')})C${ov('D')}<br>
          &nbsp;&nbsp;= ${ov('A')}BCD + ${ov('A')}BC${ov('D')} + AB${ov('C')}D + AB${ov('C')}${ov('D')} + ABCD + AB${ov('C')}D + AB${ov('C')}D + ${ov('A')}B${ov('C')}D + ${ov('A')}BC${ov('D')} + ${ov('A')}${ov('B')}C${ov('D')} + ABC${ov('D')} + A${ov('B')}C${ov('D')}<br>
          重複を冪等則（X+X=X）で削除すると、最小項は<strong>9個</strong>：<br>
          <strong>Z = ${ov('A')}${ov('B')}C${ov('D')} + ${ov('A')}B${ov('C')}D + ${ov('A')}BC${ov('D')} + A${ov('B')}C${ov('D')} + AB${ov('C')}${ov('D')} + ${ov('A')}BCD + AB${ov('C')}D + ABC${ov('D')} + ABCD</strong>
        </div>

        <h4>Step 2：肯定変数の個数ごとにグループ分けし、隣接比較で結合する</h4>
        <p>上下の隣り合うグループ間ですべて比較し、1変数だけ異なるペアを結合（元の項に ✓）。重複項は消して次段へ進みます。</p>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>肯定数</th><th>最小項（4変数）</th><th>1回目結合（3変数項）</th><th>2回目結合（2変数項＝主項）</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>1</strong></td>
              <td class="mono-cell">${ov('A')}${ov('B')}C${ov('D')} ✓</td>
              <td class="mono-cell">${ov('A')}C${ov('D')} ✓, ${ov('B')}C${ov('D')} ✓</td>
              <td class="mono-cell hi-1"><strong>C${ov('D')}</strong>（主項）</td>
            </tr>
            <tr>
              <td><strong>2</strong></td>
              <td class="mono-cell">${ov('A')}B${ov('C')}D ✓<br>${ov('A')}BC${ov('D')} ✓<br>A${ov('B')}C${ov('D')} ✓<br>AB${ov('C')}${ov('D')} ✓</td>
              <td class="mono-cell">${ov('A')}BD ✓, B${ov('C')}D ✓<br>${ov('A')}BC ✓, BC${ov('D')} ✓<br>AC${ov('D')} ✓<br>AB${ov('C')} ✓, AB${ov('D')} ✓</td>
              <td class="mono-cell hi-1"><strong>BD</strong>（主項）<br><strong>BC</strong>（主項）<br><strong>AB</strong>（主項）</td>
            </tr>
            <tr>
              <td><strong>3</strong></td>
              <td class="mono-cell">${ov('A')}BCD ✓<br>AB${ov('C')}D ✓<br>ABC${ov('D')} ✓</td>
              <td class="mono-cell">BCD ✓<br>ABD ✓<br>ABC ✓</td>
              <td class="mono-cell">—</td>
            </tr>
            <tr>
              <td><strong>4</strong></td>
              <td class="mono-cell">ABCD ✓</td>
              <td class="mono-cell">—</td>
              <td class="mono-cell">—</td>
            </tr>
          </tbody>
        </table></div>
        <p>※ 例：2回目結合では <span class="formula">${ov('A')}C${ov('D')} + AC${ov('D')} = C${ov('D')}</span>、<span class="formula">${ov('A')}BD + ABD = BD</span>、<span class="formula">${ov('A')}BC + ABC = BC</span>、<span class="formula">AB${ov('C')} + ABC = AB</span> となる。これ以上結合できないため、主項は <strong>C${ov('D')}, BD, BC, AB</strong> の4つ。</p>

        <h4>Step 3：最小項・主項表から必須主項を選ぶ</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>最小項 ＼ 主項</th><th>C${ov('D')} ★必須</th><th>BD ★必須</th><th>BC（不要）</th><th>AB ★必須</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">${ov('A')}${ov('B')}C${ov('D')}</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}B${ov('C')}D</td><td></td><td class="hi-ess">✓ (唯一)</td><td></td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}BC${ov('D')}</td><td>✓</td><td></td><td>✓</td><td></td></tr>
            <tr><td class="mono-cell">A${ov('B')}C${ov('D')}</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td><td></td></tr>
            <tr><td class="mono-cell">AB${ov('C')}${ov('D')}</td><td></td><td></td><td></td><td class="hi-ess">✓ (唯一)</td></tr>
            <tr><td class="mono-cell">${ov('A')}BCD</td><td></td><td>✓</td><td>✓</td><td></td></tr>
            <tr><td class="mono-cell">AB${ov('C')}D</td><td></td><td>✓</td><td></td><td>✓</td></tr>
            <tr><td class="mono-cell">ABC${ov('D')}</td><td>✓</td><td></td><td>✓</td><td>✓</td></tr>
            <tr><td class="mono-cell">ABCD</td><td></td><td>✓</td><td>✓</td><td>✓</td></tr>
          </tbody>
        </table></div>
        <p>「✓ が1つしかない行」から必須主項 <strong>C${ov('D')}, BD, AB</strong> が確定。この3つだけで全9行すべてに ✓ が付くため、<strong>BC は冗長で不要</strong>！</p>
        <div class="formula-block"><strong>解答： Z = C${ov('D')} + BD + AB</strong></div>
        <p style="font-size:13px;"><a href="#trainers">→ Q-M法ソルバーの「例題 3.8」プリセットでインタラクティブに検算する</a></p>
      `
    },
    {
      id: 'tb-3-e7',
      chapter: 3,
      type: 'example',
      num: '例題 3.7',
      page: 'p.65〜66',
      unitLink: '#unit-1',
      unitLabel: '3.5 Q-M法（ドントケア）',
      title: 'ドントケア項を用いたQ-M法による簡単化',
      question: `<p>次式を簡単化せよ。ただし、ドントケア項を <span class="formula">${ov('A')}B${ov('D')}, ${ov('A')}${ov('C')}D</span> とする。</p>
        <div class="formula-block">Z = ${ov('A')}${ov('B')}${ov('D')} + AB${ov('C')}D + ABCD + A${ov('B')}${ov('C')}D</div>`,
      hint: `<p>結合表ではドントケア項も混ぜて主項を作り、最後の最小項・主項表では<strong>ドントケア項を行から除外</strong>して元の最小項5個だけを覆います。</p>`,
      answer: `
        <h4>Step 1：元の関数とドントケア項をそれぞれ加法標準形に展開する</h4>
        <div class="formula-block">
          <strong>元の論理関数（5個の最小項）：</strong><br>
          Z = ${ov('A')}${ov('B')}(C+${ov('C')})${ov('D')} + AB${ov('C')}D + ABCD + A${ov('B')}${ov('C')}D<br>
          &nbsp;&nbsp;= ${ov('A')}${ov('B')}C${ov('D')} + ${ov('A')}${ov('B')}${ov('C')}${ov('D')} + AB${ov('C')}D + ABCD + A${ov('B')}${ov('C')}D<br><br>
          <strong>ドントケア項（4個の最小項）：</strong><br>
          ${ov('A')}B${ov('D')} → ${ov('A')}BC${ov('D')}, ${ov('A')}B${ov('C')}${ov('D')}<br>
          ${ov('A')}${ov('C')}D → ${ov('A')}B${ov('C')}D, ${ov('A')}${ov('B')}${ov('C')}D
        </div>

        <h4>Step 2：ドントケア（DC）を含めてグループ分け＆結合する</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>肯定数</th><th>最小項（DC含む計9個）</th><th>1回目結合（3変数項）</th><th>2回目結合（主項）</th></tr></thead>
          <tbody>
            <tr>
              <td><strong>0</strong></td>
              <td class="mono-cell">${ov('A')}${ov('B')}${ov('C')}${ov('D')} ✓</td>
              <td class="mono-cell">${ov('A')}${ov('B')}${ov('D')} ✓, ${ov('A')}${ov('C')}${ov('D')} ✓, ${ov('A')}${ov('B')}${ov('C')} ✓</td>
              <td class="mono-cell hi-1"><strong>${ov('A')}${ov('D')}</strong>（主項）<br><strong>${ov('A')}${ov('C')}</strong>（主項）</td>
            </tr>
            <tr>
              <td><strong>1</strong></td>
              <td class="mono-cell">${ov('A')}${ov('B')}C${ov('D')} ✓<br>${ov('A')}B${ov('C')}${ov('D')} <span class="tag tag-warn">DC</span> ✓<br>${ov('A')}${ov('B')}${ov('C')}D <span class="tag tag-warn">DC</span> ✓</td>
              <td class="mono-cell">${ov('A')}C${ov('D')} ✓, ${ov('A')}B${ov('D')} ✓<br>${ov('A')}B${ov('C')} ✓, ${ov('B')}${ov('C')}D ✓, ${ov('A')}${ov('C')}D ✓</td>
              <td class="mono-cell hi-1"><strong>${ov('C')}D</strong>（主項）</td>
            </tr>
            <tr>
              <td><strong>2</strong></td>
              <td class="mono-cell">A${ov('B')}${ov('C')}D ✓<br>${ov('A')}BC${ov('D')} <span class="tag tag-warn">DC</span> ✓<br>${ov('A')}B${ov('C')}D <span class="tag tag-warn">DC</span> ✓</td>
              <td class="mono-cell">A${ov('C')}D ✓, B${ov('C')}D ✓</td>
              <td class="mono-cell">—</td>
            </tr>
            <tr>
              <td><strong>3</strong></td>
              <td class="mono-cell">AB${ov('C')}D ✓</td>
              <td class="mono-cell hi-1"><strong>ABD</strong>（結合不可→主項）</td>
              <td class="mono-cell">—</td>
            </tr>
            <tr>
              <td><strong>4</strong></td>
              <td class="mono-cell">ABCD ✓</td>
              <td class="mono-cell">—</td>
              <td class="mono-cell">—</td>
            </tr>
          </tbody>
        </table></div>
        <p>※ 3変数項の <strong>ABD</strong> は他に結合できる相手がないためそのまま主項になる。よって主項は <strong>${ov('A')}${ov('D')}, ${ov('A')}${ov('C')}, ${ov('C')}D, ABD</strong> の4つ。</p>

        <h4>Step 3：元の最小項（5個のみ・DC除外）で主項表を作る</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>最小項（DC除外）＼ 主項</th><th>${ov('A')}${ov('D')} ★必須</th><th>${ov('A')}${ov('C')}（不要）</th><th>${ov('C')}D ★必須</th><th>ABD ★必須</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">${ov('A')}${ov('B')}${ov('C')}${ov('D')}</td><td>✓</td><td>✓</td><td></td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}${ov('B')}C${ov('D')}</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td><td></td></tr>
            <tr><td class="mono-cell">A${ov('B')}${ov('C')}D</td><td></td><td></td><td class="hi-ess">✓ (唯一)</td><td></td></tr>
            <tr><td class="mono-cell">AB${ov('C')}D</td><td></td><td></td><td>✓</td><td>✓</td></tr>
            <tr><td class="mono-cell">ABCD</td><td></td><td></td><td></td><td class="hi-ess">✓ (唯一)</td></tr>
          </tbody>
        </table></div>
        <p>必須主項 <strong>${ov('A')}${ov('D')}, ${ov('C')}D, ABD</strong> の3つで元の5最小項をすべてカバー（${ov('A')}${ov('C')} は不要）。</p>
        <div class="formula-block"><strong>解答： Z = ${ov('A')}${ov('D')} + ${ov('C')}D + ABD</strong></div>
      `
    },
    {
      id: 'tb-3-x5',
      chapter: 3,
      type: 'exercise',
      num: '演習 3.5',
      page: 'p.66（第1回演習）',
      unitLink: '#unit-1',
      unitLabel: '3.5 Q-M法',
      title: 'Q-M法による論理関数の簡単化 (1)〜(3)',
      question: `<p>次の論理関数をクワイン・マクラスキー法で簡単化せよ。</p>
        <ol>
          <li><span class="formula">Z = AB + ${ov('A')}B + ${ov('B')}C</span></li>
          <li><span class="formula">Z = A${ov('B')} + ${ov('A')}${ov('B')} + B${ov('C')}</span></li>
          <li><span class="formula">Z = ${ov('A')}B${ov('C')} + ${ov('A')}BCD + ${ov('A')}${ov('B')}D + B${ov('C')}D</span></li>
        </ol>`,
      hint: `<p>(1)(2) は3変数なので2段階結合すると1変数項まで縮みます。(3) は4変数で最小項が6個、主項は3個（すべて必須）になります。</p>`,
      answer: `
        <h4>(1) Z = AB + ${ov('A')}B + ${ov('B')}C</h4>
        <div class="formula-block">
          Step 1 加法標準形：AB(C+${ov('C')}) + ${ov('A')}B(C+${ov('C')}) + (A+${ov('A')})${ov('B')}C<br>
          = ABC + AB${ov('C')} + ${ov('A')}BC + ${ov('A')}B${ov('C')} + A${ov('B')}C + ${ov('A')}${ov('B')}C（6最小項）<br>
          Step 2 結合：肯定数1(${ov('A')}${ov('B')}C, ${ov('A')}B${ov('C')})・2(${ov('A')}BC, A${ov('B')}C, AB${ov('C')})・3(ABC)<br>
          → 2変数項：${ov('A')}C, ${ov('B')}C, ${ov('A')}B, B${ov('C')}, BC, AC, AB<br>
          → 1変数項（主項）：<strong>C</strong>（${ov('A')}C+AC, ${ov('B')}C+BC）、<strong>B</strong>（${ov('A')}B+AB, B${ov('C')}+BC）<br>
          Step 3 主項表：${ov('A')}${ov('B')}C は C のみ、${ov('A')}B${ov('C')} は B のみで覆われる → <strong>Z = B + C</strong>
        </div>

        <h4>(2) Z = A${ov('B')} + ${ov('A')}${ov('B')} + B${ov('C')}</h4>
        <div class="formula-block">
          Step 1 加法標準形：A${ov('B')}(C+${ov('C')}) + ${ov('A')}${ov('B')}(C+${ov('C')}) + (A+${ov('A')})B${ov('C')}<br>
          = A${ov('B')}C + A${ov('B')}${ov('C')} + ${ov('A')}${ov('B')}C + ${ov('A')}${ov('B')}${ov('C')} + AB${ov('C')} + ${ov('A')}B${ov('C')}（6最小項）<br>
          Step 2 結合：肯定数0(${ov('A')}${ov('B')}${ov('C')})・1(${ov('A')}${ov('B')}C, ${ov('A')}B${ov('C')}, A${ov('B')}${ov('C')})・2(A${ov('B')}C, AB${ov('C')})<br>
          → 2変数項：${ov('A')}${ov('B')}, ${ov('A')}${ov('C')}, ${ov('B')}${ov('C')}, ${ov('B')}C, B${ov('C')}, A${ov('B')}, A${ov('C')}<br>
          → 1変数項（主項）：<strong>${ov('B')}</strong>（${ov('A')}${ov('B')}+A${ov('B')} 等）、<strong>${ov('C')}</strong>（${ov('A')}${ov('C')}+A${ov('C')} 等）<br>
          Step 3 主項表：${ov('A')}${ov('B')}C は ${ov('B')} のみ、${ov('A')}B${ov('C')} は ${ov('C')} のみで覆われる → <strong>Z = ${ov('B')} + ${ov('C')}</strong>
        </div>

        <h4>(3) Z = ${ov('A')}B${ov('C')} + ${ov('A')}BCD + ${ov('A')}${ov('B')}D + B${ov('C')}D</h4>
        <div class="formula-block">
          Step 1 加法標準形：${ov('A')}B${ov('C')}(D+${ov('D')}) + ${ov('A')}BCD + ${ov('A')}${ov('B')}(C+${ov('C')})D + (A+${ov('A')})B${ov('C')}D<br>
          = ${ov('A')}B${ov('C')}D + ${ov('A')}B${ov('C')}${ov('D')} + ${ov('A')}BCD + ${ov('A')}${ov('B')}CD + ${ov('A')}${ov('B')}${ov('C')}D + AB${ov('C')}D（重複削除後6最小項）
        </div>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>肯定数</th><th>最小項</th><th>3変数項</th><th>2変数項（主項）</th></tr></thead>
          <tbody>
            <tr><td>1</td><td class="mono-cell">${ov('A')}${ov('B')}${ov('C')}D ✓<br>${ov('A')}B${ov('C')}${ov('D')} ✓</td><td class="mono-cell">${ov('A')}${ov('B')}D ✓, ${ov('A')}${ov('C')}D ✓<br><strong class="hi-1">${ov('A')}B${ov('C')}</strong>（主項）</td><td class="mono-cell hi-1"><strong>${ov('A')}D</strong>（主項）</td></tr>
            <tr><td>2</td><td class="mono-cell">${ov('A')}${ov('B')}CD ✓<br>${ov('A')}B${ov('C')}D ✓</td><td class="mono-cell">${ov('A')}CD ✓, ${ov('A')}BD ✓<br><strong class="hi-1">B${ov('C')}D</strong>（主項）</td><td class="mono-cell">—</td></tr>
            <tr><td>3</td><td class="mono-cell">${ov('A')}BCD ✓<br>AB${ov('C')}D ✓</td><td class="mono-cell">—</td><td class="mono-cell">—</td></tr>
          </tbody>
        </table></div>
        <p>Step 3 主項表：${ov('A')}${ov('B')}${ov('C')}D は <strong>${ov('A')}D</strong> のみ、${ov('A')}B${ov('C')}${ov('D')} は <strong>${ov('A')}B${ov('C')}</strong> のみ、AB${ov('C')}D は <strong>B${ov('C')}D</strong> のみで覆われるため3つとも必須！</p>
        <div class="formula-block"><strong>解答： Z = ${ov('A')}D + ${ov('A')}B${ov('C')} + B${ov('C')}D</strong></div>
      `
    },
    {
      id: 'tb-3-x8',
      chapter: 3,
      type: 'exercise',
      num: '演習 3.8(3)',
      page: 'p.66（第1回演習）',
      unitLink: '#unit-1',
      unitLabel: '3.5 Q-M法（ドントケア）',
      title: 'ドントケア項を加えた4変数関数の簡単化',
      question: `<p>演習 3.5(3) の論理関数 <span class="formula">Z = ${ov('A')}B${ov('C')} + ${ov('A')}BCD + ${ov('A')}${ov('B')}D + B${ov('C')}D</span> について、ドントケア項 <span class="formula">BC${ov('D')}, ABC</span> を用いてQ-M法で簡単化せよ。</p>`,
      hint: `<p>ドントケアを展開すると <span class="formula">${ov('A')}BC${ov('D')}, ABC${ov('D')}, ABCD</span> の3最小項が追加され、演習3.5(3) の3変数主項だった <span class="formula">${ov('A')}B${ov('C')}</span> や <span class="formula">B${ov('C')}D</span> が2変数主項まで縮みます！</p>`,
      answer: `
        <h4>Step 1：ドントケアの展開</h4>
        <div class="formula-block">
          元の最小項（6個）：${ov('A')}${ov('B')}${ov('C')}D, ${ov('A')}B${ov('C')}${ov('D')}, ${ov('A')}${ov('B')}CD, ${ov('A')}B${ov('C')}D, ${ov('A')}BCD, AB${ov('C')}D<br>
          ドントケア展開（3個）：BC${ov('D')} → ${ov('A')}BC${ov('D')}, ABC${ov('D')} ／ ABC → ABCD, ABC${ov('D')}（重複削除後3個）
        </div>
        <h4>Step 2：計9個の最小項を結合</h4>
        <p>ドントケアが加わることで、<span class="formula">${ov('A')}B${ov('C')} + ${ov('A')}BC = ${ov('A')}B</span>、<span class="formula">B${ov('C')}D + BCD = BD</span>、<span class="formula">${ov('A')}BC + ABC = BC</span> まで結合が進み、主項は <strong>${ov('A')}D, ${ov('A')}B, BD, BC</strong> の4つ（すべて2変数項！）になる。</p>
        <h4>Step 3：元の6最小項だけの主項表（DC除外）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>最小項 ＼ 主項</th><th>${ov('A')}D ★必須</th><th>${ov('A')}B ★必須</th><th>BD ★必須</th><th>BC（不要）</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">${ov('A')}${ov('B')}${ov('C')}D</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}B${ov('C')}${ov('D')}</td><td></td><td class="hi-ess">✓ (唯一)</td><td></td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}${ov('B')}CD</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}B${ov('C')}D</td><td>✓</td><td>✓</td><td>✓</td><td></td></tr>
            <tr><td class="mono-cell">${ov('A')}BCD</td><td>✓</td><td>✓</td><td>✓</td><td>✓</td></tr>
            <tr><td class="mono-cell">AB${ov('C')}D</td><td></td><td></td><td class="hi-ess">✓ (唯一)</td><td></td></tr>
          </tbody>
        </table></div>
        <p>必須主項 <strong>${ov('A')}D, ${ov('A')}B, BD</strong> の3つで全6最小項が覆われるため BC は不要。</p>
        <div class="formula-block"><strong>解答： Z = ${ov('A')}D + ${ov('A')}B + BD</strong></div>
      `
    },

    /* ==================== 第4章 4.3〜4.7 演算・組合せ回路 ==================== */
    {
      id: 'tb-4-e5',
      chapter: 4,
      type: 'example',
      num: '例題 4.5',
      page: 'p.73',
      unitLink: '#unit-2',
      unitLabel: '4.3 加算器',
      title: '1ビットの半加算器の設計',
      question: `<p>1ビットの半加算器（Half Adder）を設計せよ。</p>`,
      hint: `<p>2進1桁の足し算 0+0=00, 0+1=01, 1+0=01, 1+1=10 を真理値表にし、和 S と桁上がり C を読み取ります。</p>`,
      answer: `
        <h4>Step 1：真理値表を作成</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>A</th><th>B</th><th class="col-sep">和 S</th><th>桁上がり C</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：論理式を導出（加法形・乗法形）</h4>
        <div class="formula-block">
          和 S = ${ov('A')}B + A${ov('B')} = <strong>A ⊕ B</strong><br>
          （乗法形変形：${ov('A')}B + A${ov('B')} = ${ov('A')}B + ${ov('B')}B + A${ov('A')} + A${ov('B')} = (${ov('A')} + ${ov('B')})(A + B)）<br>
          桁上がり C = <strong>A · B</strong>
        </div>
        <h4>Step 3：回路図</h4>
        <div class="diagram-box">${D.halfAdder()}</div>
      `
    },
    {
      id: 'tb-4-e6',
      chapter: 4,
      type: 'example',
      num: '例題 4.6',
      page: 'p.74',
      unitLink: '#unit-2',
      unitLabel: '4.3 加算器',
      title: '1ビットの全加算器の設計',
      question: `<p>1ビットの全加算器（Full Adder）を設計せよ。</p>`,
      hint: `<p>3入力（A, B, C<sub>in</sub>）の真理値表から加法標準形を書き、<span class="formula">C<sub>in</sub></span> と <span class="formula">${ov('C<sub>in</sub>')}</span> でくくって <span class="formula">A ⊕ B</span> を作ります。</p>`,
      answer: `
        <h4>Step 1：真理値表（A + B + C<sub>in</sub> の2進結果が (C<sub>out</sub> S)<sub>2</sub>）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>A</th><th>B</th><th>C<sub>in</sub></th><th class="col-sep">S</th><th>C<sub>out</sub></th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：和 S の式変形（途中計算）</h4>
        <div class="formula-block">
          S = ${ov('A')}${ov('B')}C<sub>in</sub> + ${ov('A')}B${ov('C<sub>in</sub>')} + A${ov('B')}${ov('C<sub>in</sub>')} + ABC<sub>in</sub><br>
          &nbsp;&nbsp;= C<sub>in</sub>(${ov('A')}${ov('B')} + AB) + ${ov('C<sub>in</sub>')}(${ov('A')}B + A${ov('B')})<br>
          &nbsp;&nbsp;= C<sub>in</sub>(${ov('A ⊕ B')}) + ${ov('C<sub>in</sub>')}(A ⊕ B)<br>
          &nbsp;&nbsp;= <strong>C<sub>in</sub> ⊕ (A ⊕ B)</strong>
        </div>
        <h4>Step 3：桁上がり C<sub>out</sub> の式変形（途中計算）</h4>
        <div class="formula-block">
          C<sub>out</sub> = ${ov('A')}BC<sub>in</sub> + A${ov('B')}C<sub>in</sub> + AB${ov('C<sub>in</sub>')} + ABC<sub>in</sub><br>
          &nbsp;&nbsp;&nbsp;&nbsp;= C<sub>in</sub>(${ov('A')}B + A${ov('B')}) + AB(${ov('C<sub>in</sub>')} + C<sub>in</sub>)　← 相補則 ${ov('C<sub>in</sub>')}+C<sub>in</sub>=1<br>
          &nbsp;&nbsp;&nbsp;&nbsp;= <strong>C<sub>in</sub>(A ⊕ B) + AB</strong>
        </div>
        <h4>Step 4：回路図（半加算器2個＋ORゲート1個）</h4>
        <div class="diagram-box">${D.fullAdder()}</div>
      `
    },
    {
      id: 'tb-4-e7',
      chapter: 4,
      type: 'example',
      num: '例題 4.7',
      page: 'p.82',
      unitLink: '#unit-2',
      unitLabel: '4.5 比較器',
      title: '1ビット比較器の設計',
      question: `<p>1ビットデータの A と B を比較し、A &gt; B のとき Z<sub>0</sub> = 1、A = B のとき Z<sub>1</sub> = 1、A &lt; B のとき Z<sub>2</sub> = 1 となる比較器を設計せよ。</p>`,
      hint: `<p>Z<sub>1</sub>（A=B）は「Z<sub>0</sub> でも Z<sub>2</sub> でもない」なので、NOR ゲート1個 <span class="formula">Z<sub>1</sub> = ${ov('Z<sub>0</sub> + Z<sub>2</sub>')}</span> として回路を簡略化できます。</p>`,
      answer: `
        <h4>Step 1：真理値表を作成</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>A</th><th>B</th><th class="col-sep">Z<sub>0</sub> (A&gt;B)</th><th>Z<sub>1</sub> (A=B)</th><th>Z<sub>2</sub> (A&lt;B)</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：論理式の導出とNOR化変形</h4>
        <div class="formula-block">
          Z<sub>0</sub> = <strong>A${ov('B')}</strong>　（A=1, B=0 のときのみ1）<br>
          Z<sub>2</sub> = <strong>${ov('A')}B</strong>　（A=0, B=1 のときのみ1）<br>
          Z<sub>1</sub> = ${ov('A')}${ov('B')} + AB = ${ov('A ⊕ B')} = <strong>${ov('A' + ov('B') + ' + ' + ov('A') + 'B')}</strong> = ${ov('Z<sub>0</sub> + Z<sub>2</sub>')}
        </div>
        <p>※ NOT×2、AND×2（Z<sub>0</sub>, Z<sub>2</sub> 用）、NOR×1（Z<sub>0</sub> と Z<sub>2</sub> を入力して Z<sub>1</sub> を作る）の計5ゲートで構成できる。</p>
        <h4>Step 3：回路図（教科書 図4.17）</h4>
        <div class="diagram-box">${D.comparator1()}</div>
      `
    },
    {
      id: 'tb-4-e8',
      chapter: 4,
      type: 'example',
      num: '例題 4.8',
      page: 'p.82〜83',
      unitLink: '#unit-2',
      unitLabel: '4.5 比較器',
      title: '2ビット比較器の設計（過去問 問2と直結）',
      question: `<p>2ビットデータの A = (A<sub>1</sub>A<sub>0</sub>)<sub>2</sub> と B = (B<sub>1</sub>B<sub>0</sub>)<sub>2</sub> を比較し、A &gt; B のとき Z<sub>0</sub> = 1、A = B のとき Z<sub>1</sub> = 1、A &lt; B のとき Z<sub>2</sub> = 1 となる比較器を設計せよ。</p>`,
      hint: `<p>上位（A<sub>1</sub>, B<sub>1</sub>）と下位（A<sub>0</sub>, B<sub>0</sub>）に1ビット比較器を1個ずつ置き、上位が等しいとき（Z<sub>11</sub>=1）だけ下位の結果を採用します。</p>`,
      answer: `
        <h4>Step 1：上位・下位1ビット比較器の出力を定義</h4>
        <ul>
          <li>上位（A<sub>1</sub>, B<sub>1</sub>）：Z<sub>10</sub> (A<sub>1</sub>&gt;B<sub>1</sub>)、Z<sub>11</sub> (A<sub>1</sub>=B<sub>1</sub>)、Z<sub>12</sub> (A<sub>1</sub>&lt;B<sub>1</sub>)</li>
          <li>下位（A<sub>0</sub>, B<sub>0</sub>）：Z<sub>00</sub> (A<sub>0</sub>&gt;B<sub>0</sub>)、Z<sub>01</sub> (A<sub>0</sub>=B<sub>0</sub>)、Z<sub>02</sub> (A<sub>0</sub>&lt;B<sub>0</sub>)</li>
        </ul>
        <h4>Step 2：Function Table（大小判定の論理整理）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>A<sub>1</sub>, B<sub>1</sub></th><th>A<sub>0</sub>, B<sub>0</sub></th><th class="col-sep">Z<sub>0</sub> (A&gt;B)</th><th>Z<sub>1</sub> (A=B)</th><th>Z<sub>2</sub> (A&lt;B)</th></tr></thead>
          <tbody>
            <tr><td>A<sub>1</sub> &gt; B<sub>1</sub> (Z<sub>10</sub>=1)</td><td>×</td><td class="col-sep hi-1">H</td><td>L</td><td>L</td></tr>
            <tr><td>A<sub>1</sub> &lt; B<sub>1</sub> (Z<sub>12</sub>=1)</td><td>×</td><td class="col-sep">L</td><td>L</td><td class="hi-1">H</td></tr>
            <tr><td>A<sub>1</sub> = B<sub>1</sub> (Z<sub>11</sub>=1)</td><td>A<sub>0</sub> &gt; B<sub>0</sub> (Z<sub>00</sub>=1)</td><td class="col-sep hi-1">H</td><td>L</td><td>L</td></tr>
            <tr><td>A<sub>1</sub> = B<sub>1</sub> (Z<sub>11</sub>=1)</td><td>A<sub>0</sub> = B<sub>0</sub> (Z<sub>01</sub>=1)</td><td class="col-sep">L</td><td class="hi-1">H</td><td>L</td></tr>
            <tr><td>A<sub>1</sub> = B<sub>1</sub> (Z<sub>11</sub>=1)</td><td>A<sub>0</sub> &lt; B<sub>0</sub> (Z<sub>02</sub>=1)</td><td class="col-sep">L</td><td>L</td><td class="hi-1">H</td></tr>
          </tbody>
        </table></div>
        <h4>Step 3：論理式と回路図</h4>
        <div class="formula-block">
          Z<sub>0</sub> = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub><br>
          Z<sub>1</sub> = Z<sub>11</sub>Z<sub>01</sub><br>
          Z<sub>2</sub> = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub>
        </div>
        <div class="diagram-box">${D.comparator2()}</div>
      `
    },
    {
      id: 'tb-4-e9',
      chapter: 4,
      type: 'example',
      num: '例題 4.9',
      page: 'p.84〜85',
      unitLink: '#unit-3',
      unitLabel: '4.6 エンコーダ',
      title: '2ビットエンコーダの構成',
      question: `<p>2ビットエンコーダ（4入力 I<sub>0</sub>〜I<sub>3</sub> → 2出力 Z<sub>1</sub>, Z<sub>0</sub>）を構成せよ。</p>`,
      hint: `<p>4本の入力のうち同時に1本だけ1になる（他の12通りはドントケア）と仮定すると、ORゲート2個だけで構成できます。</p>`,
      answer: `
        <h4>Step 1：真理値表（ワンホット入力）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>I<sub>3</sub></th><th>I<sub>2</sub></th><th>I<sub>1</sub></th><th>I<sub>0</sub></th><th class="col-sep">Z<sub>1</sub></th><th>Z<sub>0</sub></th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：カルノー図でドントケアを活用して簡単化</h4>
        <p>Z<sub>0</sub>=1 は I<sub>1</sub>=1 または I<sub>3</sub>=1 のとき、Z<sub>1</sub>=1 は I<sub>2</sub>=1 または I<sub>3</sub>=1 のとき。</p>
        <div class="formula-block"><strong>Z<sub>0</sub> = I<sub>1</sub> + I<sub>3</sub>　　Z<sub>1</sub> = I<sub>2</sub> + I<sub>3</sub></strong>（I<sub>0</sub> は回路に未接続）</div>
        <h4>Step 3：回路図（教科書 図4.21）</h4>
        <div class="diagram-box">${D.encoder2()}</div>
        <p>※ 弱点：I<sub>1</sub> と I<sub>2</sub> が同時に 1 になると Z<sub>1</sub>=1, Z<sub>0</sub>=1（I<sub>3</sub> の符号）になって誤動作する → 解決策がプライオリティエンコーダ！</p>
      `
    },
    {
      id: 'tb-4-e10',
      chapter: 4,
      type: 'example',
      num: '例題 4.10',
      page: 'p.85〜86',
      unitLink: '#unit-3',
      unitLabel: '4.6 エンコーダ',
      title: '8入力3出力プライオリティエンコーダの設計',
      question: `<p>8入力（I<sub>0</sub>〜I<sub>7</sub>、番号が大きいほど高優先）・3出力（Z<sub>2</sub>, Z<sub>1</sub>, Z<sub>0</sub>）のプライオリティエンコーダを、イネーブル入力 ${ov('EI')}（負論理）とゲート選択信号 GS を含めて設計せよ。</p>`,
      hint: `<p>まず公式 <span class="formula">A + ${ov('A')}B = A + B</span> を準備し、真理値表から書いた生の式の上位否定文字を左から順に消去していきます。</p>`,
      answer: `
        <h4>Step 1：簡単化に使う公式の証明</h4>
        <div class="formula-block">
          A + ${ov('A')}B = A(B + ${ov('B')}) + ${ov('A')}B = AB + A${ov('B')} + AB + ${ov('A')}B = A(B + ${ov('B')}) + (A + ${ov('A')})B = <strong>A + B</strong><br>
          （同様に AB + ${ov('A')}BC = AB + BC も成り立つ）
        </div>
        <h4>Step 2：真理値表から Z<sub>2</sub>, Z<sub>1</sub>, Z<sub>0</sub> を立てて1行ずつ簡単化（EI = 有効信号）</h4>
        <div class="formula-block">
          <strong>① Z<sub>2</sub>（I<sub>7</sub>, I<sub>6</sub>, I<sub>5</sub>, I<sub>4</sub> が1のとき）：</strong><br>
          Z<sub>2</sub> = (I<sub>7</sub> + ${ov('I<sub>7</sub>')}I<sub>6</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}I<sub>5</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}${ov('I<sub>5</sub>')}I<sub>4</sub>) · EI<br>
          &nbsp;&nbsp;&nbsp;= (I<sub>7</sub> + I<sub>6</sub> + ${ov('I<sub>6</sub>')}I<sub>5</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>5</sub>')}I<sub>4</sub>) · EI　← I<sub>7</sub>+${ov('I<sub>7</sub>')}X = I<sub>7</sub>+X を適用<br>
          &nbsp;&nbsp;&nbsp;= <strong>(I<sub>7</sub> + I<sub>6</sub> + I<sub>5</sub> + I<sub>4</sub>) · EI</strong>　← I<sub>6</sub>, I<sub>5</sub> でも同様に否定が全消去！<br><br>
          <strong>② Z<sub>1</sub>（I<sub>7</sub>, I<sub>6</sub>, I<sub>3</sub>, I<sub>2</sub> が1のとき）：</strong><br>
          Z<sub>1</sub> = (I<sub>7</sub> + ${ov('I<sub>7</sub>')}I<sub>6</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}${ov('I<sub>3</sub>')}I<sub>2</sub>) · EI<br>
          &nbsp;&nbsp;&nbsp;= (I<sub>7</sub> + I<sub>6</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}${ov('I<sub>3</sub>')}I<sub>2</sub>) · EI　← I<sub>7</sub>, I<sub>6</sub> で ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')} を消去<br>
          &nbsp;&nbsp;&nbsp;= <strong>(I<sub>7</sub> + I<sub>6</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>2</sub>) · EI</strong>　← ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}(I<sub>3</sub>+${ov('I<sub>3</sub>')}I<sub>2</sub>) = ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}(I<sub>3</sub>+I<sub>2</sub>)<br><br>
          <strong>③ Z<sub>0</sub>（奇数番号 I<sub>7</sub>, I<sub>5</sub>, I<sub>3</sub>, I<sub>1</sub> が1のとき）：</strong><br>
          Z<sub>0</sub> = (I<sub>7</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}I<sub>5</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>7</sub>')}${ov('I<sub>6</sub>')}${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}${ov('I<sub>3</sub>')}${ov('I<sub>2</sub>')}I<sub>1</sub>) · EI<br>
          &nbsp;&nbsp;&nbsp;= <strong>(I<sub>7</sub> + ${ov('I<sub>6</sub>')}I<sub>5</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>4</sub>')}${ov('I<sub>2</sub>')}I<sub>1</sub>) · EI</strong>　← 奇数番の否定 ${ov('I<sub>7</sub>')},${ov('I<sub>5</sub>')},${ov('I<sub>3</sub>')} がすべて消える！<br><br>
          <strong>④ GS（いずれかの入力が1かつイネーブル有効）：</strong><br>
          GS = <strong>(I<sub>7</sub> + I<sub>6</sub> + I<sub>5</sub> + I<sub>4</sub> + I<sub>3</sub> + I<sub>2</sub> + I<sub>1</sub> + I<sub>0</sub>) · EI</strong>
        </div>
        <h4>Step 3：回路構成（教科書 図4.22）</h4>
        <div class="diagram-box">${D.priorityEncoder8()}</div>
      `
    },
    {
      id: 'tb-4-e11',
      chapter: 4,
      type: 'example',
      num: '例題 4.11',
      page: 'p.87',
      unitLink: '#unit-3',
      unitLabel: '4.6 デコーダ',
      title: '2ビットデコーダの構成',
      question: `<p>2ビットデコーダ（入力 B, A → 出力 Z<sub>0</sub>〜Z<sub>3</sub>）を構成せよ。</p>`,
      hint: `<p>2進数 (BA)<sub>2</sub> = 0, 1, 2, 3 のそれぞれに対応する最小項1個ずつを出力線にします。</p>`,
      answer: `
        <h4>Step 1：真理値表</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>B</th><th>A</th><th class="col-sep">Z<sub>0</sub></th><th>Z<sub>1</sub></th><th>Z<sub>2</sub></th><th>Z<sub>3</sub></th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：論理式と回路構成（教科書 図4.23）</h4>
        <div class="formula-block"><strong>Z<sub>0</sub> = ${ov('B')}${ov('A')},　Z<sub>1</sub> = ${ov('B')}A,　Z<sub>2</sub> = B${ov('A')},　Z<sub>3</sub> = BA</strong></div>
        <div class="diagram-box">${D.decoder2()}</div>
        <p>NOTゲート2個（${ov('A')}, ${ov('B')} を生成）と2入力ANDゲート4個で構成。</p>
      `
    },
    {
      id: 'tb-4-e12',
      chapter: 4,
      type: 'example',
      num: '例題 4.12',
      page: 'p.87〜88',
      unitLink: '#unit-3',
      unitLabel: '4.6 デコーダ',
      title: 'BCD-10進デコーダの設計（ドントケア活用）',
      question: `<p>4ビットBCD符号（D, C, B, A；Aが下位）から10進出力 Z<sub>0</sub>〜Z<sub>9</sub> を得る BCD-10進デコーダを、ドントケア項を利用して簡単化し設計せよ。</p>`,
      hint: `<p>各出力 Z<sub>0</sub>〜Z<sub>9</sub> は互いに排他的なので、1枚の4×4カルノー図にまとめて書き、10〜15のドントケア（×）と隣接するマスを囲みます。</p>`,
      answer: `
        <h4>Step 1：ドントケア（1010〜1111）を含めたカルノー図を作成</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>DC ＼ BA</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>
          <tbody>
            <tr><th>00</th><td class="mono-cell">Z<sub>0</sub></td><td class="mono-cell">Z<sub>1</sub></td><td class="mono-cell">Z<sub>3</sub></td><td class="mono-cell">Z<sub>2</sub></td></tr>
            <tr><th>01</th><td class="mono-cell">Z<sub>4</sub></td><td class="mono-cell">Z<sub>5</sub></td><td class="mono-cell">Z<sub>7</sub></td><td class="mono-cell">Z<sub>6</sub></td></tr>
            <tr><th>11</th><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td></tr>
            <tr><th>10</th><td class="mono-cell">Z<sub>8</sub></td><td class="mono-cell">Z<sub>9</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：各マスを × と最大限に囲んで簡単化</h4>
        <ul>
          <li><strong>Z<sub>0</sub>, Z<sub>1</sub></strong>：上下左右に × が一切隣接しない → 1マスのまま（4変数）</li>
          <li><strong>Z<sub>2</sub>, Z<sub>3</sub></strong>：下端行（DC=10）の × と縦に2マス組める → D が消えて3変数！</li>
          <li><strong>Z<sub>4</sub>〜Z<sub>7</sub></strong>：下の行（DC=11）の × と縦に2マス組める → D が消えて3変数！</li>
          <li><strong>Z<sub>8</sub></strong>：(10,00), (10,10)×, (11,00)×, (11,10)× の<strong>4マス</strong>が組める → B, C が消えて <strong>D${ov('A')}</strong>！</li>
          <li><strong>Z<sub>9</sub></strong>：(10,01), (10,11)×, (11,01)×, (11,11)× の<strong>4マス</strong>が組める → B, C が消えて <strong>DA</strong>！</li>
        </ul>
        <div class="formula-block">
          Z<sub>0</sub> = ${ov('D')}${ov('C')}${ov('B')}${ov('A')}　　Z<sub>1</sub> = ${ov('D')}${ov('C')}${ov('B')}A　　Z<sub>2</sub> = ${ov('C')}B${ov('A')}　　Z<sub>3</sub> = ${ov('C')}BA<br>
          Z<sub>4</sub> = C${ov('B')}${ov('A')}　　Z<sub>5</sub> = C${ov('B')}A　　Z<sub>6</sub> = CB${ov('A')}　　Z<sub>7</sub> = CBA<br>
          Z<sub>8</sub> = D${ov('A')}　　Z<sub>9</sub> = DA
        </div>
        <h4>Step 3：回路構成（教科書 図4.25）</h4>
        <div class="diagram-box">${D.bcdDecoder()}</div>
      `
    },
    {
      id: 'tb-4-e13',
      chapter: 4,
      type: 'example',
      num: '例題 4.13',
      page: 'p.88〜89',
      unitLink: '#unit-3',
      unitLabel: '4.6 符号変換',
      title: '3ビットの2進-グレイ符号変換回路（過去問 問4と直結）',
      question: `<p>3ビットの2進符号（C, B, A）をグレイ符号（G<sub>2</sub>, G<sub>1</sub>, G<sub>0</sub>）に変換する回路を設計せよ。</p>`,
      hint: `<p>真理値表 → 加法標準形 → カルノー図で2マスずつ囲むと、綺麗な XOR の形になります。</p>`,
      answer: `
        <h4>Step 1：真理値表から加法標準形を求める</h4>
        <div class="formula-block">
          G<sub>0</sub> = ${ov('C')}${ov('B')}A + ${ov('C')}B${ov('A')} + C${ov('B')}A + CB${ov('A')}<br>
          G<sub>1</sub> = ${ov('C')}B${ov('A')} + ${ov('C')}BA + C${ov('B')}${ov('A')} + C${ov('B')}A<br>
          G<sub>2</sub> = C${ov('B')}${ov('A')} + C${ov('B')}A + CB${ov('A')} + CBA
        </div>
        <h4>Step 2：カルノー図（または因数分解）で簡単化</h4>
        <div class="formula-block">
          G<sub>0</sub> = (${ov('C')}+C)${ov('B')}A + (${ov('C')}+C)B${ov('A')} = ${ov('B')}A + B${ov('A')} = <strong>B ⊕ A</strong><br>
          G<sub>1</sub> = ${ov('C')}B(${ov('A')}+A) + C${ov('B')}(${ov('A')}+A) = ${ov('C')}B + C${ov('B')} = <strong>C ⊕ B</strong><br>
          G<sub>2</sub> = C(${ov('B')}+B)(${ov('A')}+A) = <strong>C</strong>
        </div>
        <h4>Step 3：回路図</h4>
        <div class="diagram-box">${D.grayConverter3()}</div>
      `
    },
    {
      id: 'tb-4-e14',
      chapter: 4,
      type: 'example',
      num: '例題 4.14',
      page: 'p.90',
      unitLink: '#unit-4',
      unitLabel: '4.7 MUX',
      title: '1ビット4チャネルマルチプレクサ（過去問 問5と直結）',
      question: `<p>1ビット4チャネルのマルチプレクサ（入力 A, B, C, D、セレクト S<sub>1</sub>, S<sub>0</sub>、イネーブル ${ov('EI')}）を示せ。</p>`,
      hint: `<p>チャネル数が4なのでセレクトは 2ビット（2<sup>2</sup>=4）。${ov('EI')}=0 で有効（内部信号 EI=1）として各行の積項をORで結びます。</p>`,
      answer: `
        <h4>Step 1：真理値表を作成（${ov('EI')}=1 の無効行も忘れずに！）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>${ov('EI')}</th><th>S<sub>1</sub></th><th>S<sub>0</sub></th><th>D</th><th>C</th><th>B</th><th>A</th><th class="col-sep">Z</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>0</sub></td><td class="mono-cell col-sep hi-1">d<sub>0</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>1</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>1</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>2</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>2</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell hi-1">d<sub>3</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>3</sub></td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：論理式とゲート構成（教科書 図4.29）</h4>
        <div class="formula-block"><strong>Z = (A${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')} + B${ov('S<sub>1</sub>')}S<sub>0</sub> + CS<sub>1</sub>${ov('S<sub>0</sub>')} + DS<sub>1</sub>S<sub>0</sub>) · EI</strong></div>
        <div class="diagram-box">${D.mux4Gate()}</div>
        <p>回路構成：NOT×3（${ov('EI')}, S<sub>1</sub>, S<sub>0</sub> 用）、4入力AND×4（各チャネル選択）、4入力OR×1（出力統合）。</p>
      `
    },
    {
      id: 'tb-4-e15',
      chapter: 4,
      type: 'example',
      num: '例題 4.15',
      page: 'p.91',
      unitLink: '#unit-4',
      unitLabel: '4.7 MUX',
      title: '4ビット2チャネルマルチプレクサ',
      question: `<p>4ビット2チャネルのマルチプレクサを示せ。ただし、S = 1 で A チャネル（A<sub>3</sub>〜A<sub>0</sub>）、S = 0 で B チャネル（B<sub>3</sub>〜B<sub>0</sub>）の各4ビットデータを出力するものとする。</p>`,
      hint: `<p>2チャネルなのでセレクトは1ビット S。4ビットすべて同じ構造なので、代表の1ビット i（i=0,1,2,3）で真理値表を作るとスッキリ書けます。</p>`,
      answer: `
        <h4>Step 1：代表ビット i（i = 0, 1, 2, 3）の真理値表</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>${ov('EI')}</th><th>S</th><th>B<sub>i</sub></th><th>A<sub>i</sub></th><th class="col-sep">Z<sub>i</sub></th></tr></thead>
          <tbody>
            <tr><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">d<sub>1i</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>1i</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>0i</sub></td><td class="mono-cell col-sep hi-1">d<sub>0i</sub></td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：論理式と回路構成（教科書 図4.30）</h4>
        <div class="formula-block"><strong>Z<sub>i</sub> = (A<sub>i</sub>·S + B<sub>i</sub>·${ov('S')}) · EI　　（i = 0, 1, 2, 3）</strong></div>
        <div class="diagram-box">${D.mux4bit2ch()}</div>
        <p>回路構成：各ビットごとに 3入力AND×2 ＋ 2入力OR×1 を配置（計 AND 8個＋OR 4個）。制御線 EI, S, ${ov('S')} は全4ビットで共通配線する。</p>
      `
    },
    {
      id: 'tb-4-e16',
      chapter: 4,
      type: 'example',
      num: '例題 4.16',
      page: 'p.91〜92',
      unitLink: '#unit-4',
      unitLabel: '4.7 DEMUX',
      title: '2ビット4チャネルデマルチプレクサ',
      question: `<p>2ビット入力データ（D<sub>1</sub>, D<sub>0</sub>）を4つの出力チャネル（ch.0〜ch.3）のいずれかに振り分ける、2ビット4チャネルのデマルチプレクサを示せ。</p>`,
      hint: `<p>出力チャネルが4つなのでセレクトは2ビット（S<sub>1</sub>, S<sub>0</sub>）。MUXとは逆で、ORゲートは不要になりANDゲートだけで振り分けます。</p>`,
      answer: `
        <h4>Step 1：代表ビット i（i = 0, 1）の真理値表</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>${ov('EI')}</th><th>S<sub>1</sub></th><th>S<sub>0</sub></th><th>D<sub>i</sub></th><th class="col-sep">Z<sub>3i</sub></th><th>Z<sub>2i</sub></th><th>Z<sub>1i</sub></th><th>Z<sub>0i</sub></th></tr></thead>
          <tbody>
            <tr><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">d<sub>i</sub></td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">d<sub>i</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">d<sub>i</sub></td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">d<sub>i</sub></td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">d<sub>i</sub></td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">d<sub>i</sub></td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">d<sub>i</sub></td><td class="mono-cell col-sep hi-1">d<sub>i</sub></td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：論理式とゲート構成（教科書 図4.31・計8本の出力）</h4>
        <div class="formula-block">
          ch.0：Z<sub>0i</sub> = D<sub>i</sub>·${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}·EI　　ch.1：Z<sub>1i</sub> = D<sub>i</sub>·${ov('S<sub>1</sub>')}S<sub>0</sub>·EI<br>
          ch.2：Z<sub>2i</sub> = D<sub>i</sub>·S<sub>1</sub>${ov('S<sub>0</sub>')}·EI　　ch.3：Z<sub>3i</sub> = D<sub>i</sub>·S<sub>1</sub>S<sub>0</sub>·EI　（i = 0, 1）
        </div>
        <div class="diagram-box">${D.demux2bit4ch()}</div>
        <p>回路構成：NOT×3（${ov('EI')}, S<sub>1</sub>, S<sub>0</sub> 用）＋ 4入力ANDゲート <strong>8個</strong>（2ビット×4チャネル）。</p>
      `
    },
    {
      id: 'tb-4-x8',
      chapter: 4,
      type: 'exercise',
      num: '演習 4.8',
      page: 'p.93（第3回課題）',
      unitLink: '#unit-2',
      unitLabel: '4.3 CLA',
      title: 'けた上げ先取り回路付き2ビット全加算器の設計',
      question: `<p>けた上げ先取り回路（CLA）付き 2ビット全加算器を設計せよ。</p>`,
      hint: `<p>C<sub>1</sub> の式の中にある C<sub>0</sub> に、C<sub>0</sub> の式を代入して分配法則で展開すれば、前段キャリーに依存しない CLA の式が得られます。</p>`,
      answer: `
        <h4>Step 1：各桁の生成 G<sub>i</sub>・伝搬 P<sub>i</sub> を定義</h4>
        <div class="formula-block">
          G<sub>0</sub> = A<sub>0</sub>B<sub>0</sub>,　P<sub>0</sub> = A<sub>0</sub> ⊕ B<sub>0</sub><br>
          G<sub>1</sub> = A<sub>1</sub>B<sub>1</sub>,　P<sub>1</sub> = A<sub>1</sub> ⊕ B<sub>1</sub>
        </div>
        <h4>Step 2：C<sub>0</sub> を立て、C<sub>1</sub> に代入して展開する（最重要！）</h4>
        <div class="formula-block">
          C<sub>0</sub> = C<sup>-</sup>P<sub>0</sub> + G<sub>0</sub> = <strong>C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>) + A<sub>0</sub>B<sub>0</sub></strong><br><br>
          C<sub>1</sub> = C<sub>0</sub>P<sub>1</sub> + G<sub>1</sub><br>
          &nbsp;&nbsp;&nbsp;= (C<sup>-</sup>P<sub>0</sub> + G<sub>0</sub>)P<sub>1</sub> + G<sub>1</sub>　← C<sub>0</sub> を代入<br>
          &nbsp;&nbsp;&nbsp;= C<sup>-</sup>P<sub>0</sub>P<sub>1</sub> + G<sub>0</sub>P<sub>1</sub> + G<sub>1</sub>　← 分配法則で展開<br>
          &nbsp;&nbsp;&nbsp;= <strong>C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>)(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>0</sub>B<sub>0</sub>(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>1</sub>B<sub>1</sub></strong>
        </div>
        <h4>Step 3：各桁の和 S<sub>0</sub>, S<sub>1</sub> と回路構成</h4>
        <div class="formula-block">
          S<sub>0</sub> = C<sup>-</sup> ⊕ P<sub>0</sub> = <strong>C<sup>-</sup> ⊕ (A<sub>0</sub> ⊕ B<sub>0</sub>)</strong><br>
          S<sub>1</sub> = C<sub>0</sub> ⊕ P<sub>1</sub> = <strong>C<sub>0</sub> ⊕ (A<sub>1</sub> ⊕ B<sub>1</sub>)</strong>
        </div>
        <div class="diagram-box">${D.cla2bit()}</div>
      `
    },
    {
      id: 'tb-4-x9',
      chapter: 4,
      type: 'exercise',
      num: '演習 4.9',
      page: 'p.93',
      unitLink: '#unit-2',
      unitLabel: '4.5 比較器',
      title: '2ビット比較器の真理値表からの簡単化',
      question: `<p>2ビット比較器の真理値表（16通り）から簡単化した論理関数を求め、回路構成せよ（結果が図4.18＝例題4.8と同様になることを確認せよ）。</p>`,
      hint: `<p>16通りの入力 (A<sub>1</sub>A<sub>0</sub>, B<sub>1</sub>B<sub>0</sub>) を大小で分類し、上位が等しい項を <span class="formula">(A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})</span> でくくり出します。</p>`,
      answer: `
        <h4>Step 1：16通りを Z<sub>0</sub>(A&gt;B), Z<sub>1</sub>(A=B), Z<sub>2</sub>(A&lt;B) に分類</h4>
        <ul>
          <li><strong>A &gt; B（6通り）</strong>：(A<sub>1</sub>A<sub>0</sub>, B<sub>1</sub>B<sub>0</sub>) = (01,00), (10,00), (10,01), (11,00), (11,01), (11,10)</li>
          <li><strong>A = B（4通り）</strong>：(00,00), (01,01), (10,10), (11,11)</li>
          <li><strong>A &lt; B（6通り）</strong>：(00,01), (00,10), (00,11), (01,10), (01,11), (10,11)</li>
        </ul>
        <h4>Step 2：カルノー図で簡単化し、共通項でくくる</h4>
        <div class="formula-block">
          Z<sub>0</sub> = A<sub>1</sub>${ov('B<sub>1</sub>')} + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')}A<sub>0</sub>${ov('B<sub>0</sub>')} + A<sub>1</sub>B<sub>1</sub>A<sub>0</sub>${ov('B<sub>0</sub>')}<br>
          &nbsp;&nbsp;&nbsp;= A<sub>1</sub>${ov('B<sub>1</sub>')} + (A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})A<sub>0</sub>${ov('B<sub>0</sub>')} = <strong>Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub></strong><br><br>
          Z<sub>1</sub> = ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')}${ov('A<sub>0</sub>')}${ov('B<sub>0</sub>')} + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')}A<sub>0</sub>B<sub>0</sub> + A<sub>1</sub>B<sub>1</sub>${ov('A<sub>0</sub>')}${ov('B<sub>0</sub>')} + A<sub>1</sub>B<sub>1</sub>A<sub>0</sub>B<sub>0</sub><br>
          &nbsp;&nbsp;&nbsp;= (A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})(A<sub>0</sub>B<sub>0</sub> + ${ov('A<sub>0</sub>')}${ov('B<sub>0</sub>')}) = <strong>Z<sub>11</sub>Z<sub>01</sub></strong><br><br>
          Z<sub>2</sub> = ${ov('A<sub>1</sub>')}B<sub>1</sub> + (A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})${ov('A<sub>0</sub>')}B<sub>0</sub> = <strong>Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub></strong>
        </div>
        <p>例題 4.8（1ビット比較器2個の組合せ）と完全に一致することが確認できる！</p>
        <h4>Step 3：回路図（教科書 図4.18 と同一）</h4>
        <div class="diagram-box">${D.comparator2()}</div>
      `
    },
    {
      id: 'tb-4-x10',
      chapter: 4,
      type: 'exercise',
      num: '演習 4.10',
      page: 'p.93（第4回課題）',
      unitLink: '#unit-3',
      unitLabel: '4.6 符号変換',
      title: '4ビットBCD符号→グレイ符号変換回路',
      question: `<p>4ビットBCD符号（D, C, B, A；0000〜1001）を4ビットグレイ符号（G<sub>3</sub>, G<sub>2</sub>, G<sub>1</sub>, G<sub>0</sub>）に変換する符号変換回路を求めよ。</p>`,
      hint: `<p>0〜9の変換表を作り、BCDに存在しない 10〜15 をドントケア（×）としてカルノー図で囲みます。特に G<sub>2</sub> は × のおかげで XOR より簡単な OR になります！</p>`,
      answer: `
        <h4>Step 1：BCD (0〜9) → グレイ符号の真理値表（10〜15 は ×）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>10進</th><th>D C B A</th><th class="col-sep">G<sub>3</sub> G<sub>2</sub> G<sub>1</sub> G<sub>0</sub></th></tr></thead>
          <tbody>
            <tr><td>0</td><td class="mono-cell">0 0 0 0</td><td class="mono-cell col-sep">0 0 0 0</td></tr>
            <tr><td>1</td><td class="mono-cell">0 0 0 1</td><td class="mono-cell col-sep">0 0 0 1</td></tr>
            <tr><td>2</td><td class="mono-cell">0 0 1 0</td><td class="mono-cell col-sep">0 0 1 1</td></tr>
            <tr><td>3</td><td class="mono-cell">0 0 1 1</td><td class="mono-cell col-sep">0 0 1 0</td></tr>
            <tr><td>4</td><td class="mono-cell">0 1 0 0</td><td class="mono-cell col-sep">0 1 1 0</td></tr>
            <tr><td>5</td><td class="mono-cell">0 1 0 1</td><td class="mono-cell col-sep">0 1 1 1</td></tr>
            <tr><td>6</td><td class="mono-cell">0 1 1 0</td><td class="mono-cell col-sep">0 1 0 1</td></tr>
            <tr><td>7</td><td class="mono-cell">0 1 1 1</td><td class="mono-cell col-sep">0 1 0 0</td></tr>
            <tr><td>8</td><td class="mono-cell">1 0 0 0</td><td class="mono-cell col-sep">1 1 0 0</td></tr>
            <tr><td>9</td><td class="mono-cell">1 0 0 1</td><td class="mono-cell col-sep">1 1 0 1</td></tr>
            <tr><td>10〜15</td><td class="mono-cell">1010〜1111</td><td class="mono-cell col-sep hi-x">× × × ×</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：カルノー図で × を活用して簡単化</h4>
        <div class="formula-block">
          G<sub>3</sub> = <strong>D</strong>　（D=1 の行を × ごと8マス囲む）<br>
          G<sub>2</sub> = <strong>C + D</strong>　（本来は D ⊕ C だが、BCDでは DC=11 がすべて × のため C=1 の8マスと D=1 の8マスで囲める！）<br>
          G<sub>1</sub> = ${ov('C')}B + C${ov('B')} = <strong>B ⊕ C</strong><br>
          G<sub>0</sub> = ${ov('B')}A + B${ov('A')} = <strong>A ⊕ B</strong>
        </div>
        <p style="font-size:13px;color:var(--ink-secondary)">※ 通常の4ビット2進符号（0〜15すべて有効）なら G<sub>2</sub> = D ⊕ C（XOR×3）。BCD限定なら OR×1 ＋ XOR×2 で作れるのがポイント！</p>
        <h4>Step 3：回路図（OR×1 ＋ XOR×2）</h4>
        <div class="diagram-box">${D.bcdToGray4()}</div>
      `
    },
    {
      id: 'tb-4-x11',
      chapter: 4,
      type: 'exercise',
      num: '演習 4.11',
      page: 'p.93',
      unitLink: '#unit-3',
      unitLabel: '4.6 符号変換',
      title: '4ビットグレイ符号→2進符号変換回路',
      question: `<p>4ビットグレイ符号（G<sub>3</sub>, G<sub>2</sub>, G<sub>1</sub>, G<sub>0</sub>）を4ビット2進符号（B<sub>3</sub>, B<sub>2</sub>, B<sub>1</sub>, B<sub>0</sub>）に変換する回路を求めよ。</p>`,
      hint: `<p>2進→グレイの公式 <span class="formula">G<sub>i</sub> = B<sub>i+1</sub> ⊕ B<sub>i</sub></span> の両辺に <span class="formula">B<sub>i+1</sub></span> を XOR すると、逆変換の式が一発で導けます！</p>`,
      answer: `
        <h4>Step 1：逆変換公式の導出（X ⊕ X = 0 を利用）</h4>
        <div class="formula-block">
          2進→グレイより：G<sub>3</sub> = B<sub>3</sub>、G<sub>i</sub> = B<sub>i+1</sub> ⊕ B<sub>i</sub><br>
          両辺に B<sub>i+1</sub> を XOR すると：B<sub>i+1</sub> ⊕ G<sub>i</sub> = (B<sub>i+1</sub> ⊕ B<sub>i+1</sub>) ⊕ B<sub>i</sub> = 0 ⊕ B<sub>i</sub> = B<sub>i</sub>
        </div>
        <h4>Step 2：上位ビットから順に展開</h4>
        <div class="formula-block">
          B<sub>3</sub> = <strong>G<sub>3</sub></strong><br>
          B<sub>2</sub> = B<sub>3</sub> ⊕ G<sub>2</sub> = <strong>G<sub>3</sub> ⊕ G<sub>2</sub></strong><br>
          B<sub>1</sub> = B<sub>2</sub> ⊕ G<sub>1</sub> = <strong>G<sub>3</sub> ⊕ G<sub>2</sub> ⊕ G<sub>1</sub></strong><br>
          B<sub>0</sub> = B<sub>1</sub> ⊕ G<sub>0</sub> = <strong>G<sub>3</sub> ⊕ G<sub>2</sub> ⊕ G<sub>1</sub> ⊕ G<sub>0</sub></strong>
        </div>
        <h4>Step 3：手計算での検算例（グレイ 1101 → 2進 1001 = 9）</h4>
        <p class="mono" style="font-size:13.5px;">B<sub>3</sub>=1 → B<sub>2</sub>=1⊕1=0 → B<sub>1</sub>=0⊕0=0 → B<sub>0</sub>=0⊕1=1 ⇒ (1001)<sub>2</sub> = 9（OK！）</p>
        <p>回路構成：2入力XORゲート3個を上位から下位へ直列（カスケード）に接続する。</p>
        <h4>Step 4：回路図（XOR×3 カスケード）</h4>
        <div class="diagram-box">${D.grayToBin4()}</div>
      `
    },
    {
      id: 'tb-4-x12',
      chapter: 4,
      type: 'exercise',
      num: '演習 4.12',
      page: 'p.93',
      unitLink: '#unit-4',
      unitLabel: '4.7 MUX/DEMUX',
      title: '8ビット4チャネルMUX と 8ビット4チャネルDEMUX の設計',
      question: `<p>図4.28に示した 8ビット4チャネルマルチプレクサと、8ビット4チャネルデマルチプレクサを設計せよ。</p>`,
      hint: `<p>チャネル数が4なのでセレクトはどちらも2ビット（S<sub>1</sub>, S<sub>0</sub>）。1ビット4chの回路を8ビット分（i = 0〜7）並列に並べます。</p>`,
      answer: `
        <h4>Step 1：セレクト信号のビット数を決定</h4>
        <p>4チャネルを区別するためセレクト信号は <strong>2ビット（S<sub>1</sub>, S<sub>0</sub>）</strong>、イネーブル入力は <strong>${ov('EI')}</strong>（0で有効、内部信号 EI）。</p>
        <h4>Step 2：8ビット4チャネルMUXの論理式（i = 0, 1, …, 7）</h4>
        <div class="formula-block">
          Z<sub>i</sub> = <strong>(A<sub>i</sub>${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')} + B<sub>i</sub>${ov('S<sub>1</sub>')}S<sub>0</sub> + C<sub>i</sub>S<sub>1</sub>${ov('S<sub>0</sub>')} + D<sub>i</sub>S<sub>1</sub>S<sub>0</sub>) · EI</strong>
        </div>
        <p>必要ゲート数：NOT×3（共通）＋ 4入力AND×32個（4ch×8bit）＋ 4入力OR×8個（各ビット1個）。</p>
        <h4>Step 3：8ビット4チャネルDEMUXの論理式（i = 0, 1, …, 7）</h4>
        <div class="formula-block">
          ch.0：Z<sub>0i</sub> = D<sub>i</sub>${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}EI　　ch.1：Z<sub>1i</sub> = D<sub>i</sub>${ov('S<sub>1</sub>')}S<sub>0</sub>EI<br>
          ch.2：Z<sub>2i</sub> = D<sub>i</sub>S<sub>1</sub>${ov('S<sub>0</sub>')}EI　　ch.3：Z<sub>3i</sub> = D<sub>i</sub>S<sub>1</sub>S<sub>0</sub>EI
        </div>
        <p>必要ゲート数：NOT×3（共通）＋ 4入力AND×32個（4ch×8bit、出力線32本）。</p>
        <h4>Step 4：基本単位回路（1ビット分×8並列）</h4>
        <div class="diagram-box">${D.mux4Gate()}<div class="diagram-caption">MUX 1ビット分（これを i=0〜7 の8組並列配置）</div></div>
        <div class="diagram-box">${D.demux2bit4ch()}<div class="diagram-caption">DEMUX 構成イメージ（D1,D0 を D7〜D0 の8ビットへ拡張）</div></div>
      `
    },

    /* ==================== 第5章 5.1, 5.3, 5.4 順序回路・FF ==================== */
    {
      id: 'tb-5-e2',
      chapter: 5,
      type: 'example',
      num: '例題 5.2',
      page: 'p.99〜100',
      unitLink: '#unit-5',
      unitLabel: '5.3 SR-FF',
      title: 'SR-FFの特性方程式の導出',
      question: `<p>SR-FFの特性方程式を求めよ。</p>`,
      hint: `<p>S, R, Q の8通りの遷移表を作り、禁止入力 S=R=1 の行をドントケア（×）としてカルノー図で大きく囲みます。</p>`,
      answer: `
        <h4>Step 1：遷移表（表 5.4）を作成</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>S</th><th>R</th><th>現在状態 Q</th><th class="col-sep">次状態 Q<sup>+</sup></th><th>動作</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td>保持</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td>保持</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td>リセット</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td>リセット</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td>セット</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td>セット</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-x">×</td><td>禁止 (SR=0)</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-x">×</td><td>禁止 (SR=0)</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：カルノー図で簡単化</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>SR ＼ Q</th><th>0</th><th>1</th></tr></thead>
          <tbody>
            <tr><th>00</th><td class="mono-cell">0</td><td class="mono-cell hi-ess">1</td></tr>
            <tr><th>01</th><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><th>11</th><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td></tr>
            <tr><th>10</th><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
          </tbody>
        </table></div>
        <ul>
          <li>下2行（SR = 11, 10 の4マス）を囲む → <strong>S</strong></li>
          <li>右列の上下端（SR = 00, 10 かつ Q = 1 の2マス）を囲む → <strong>${ov('R')}Q</strong></li>
        </ul>
        <div class="formula-block"><strong>解答： Q<sup>+</sup> = S + ${ov('R')}Q　（ただし SR = 0）</strong></div>
      `
    },
    {
      id: 'tb-5-e3',
      chapter: 5,
      type: 'example',
      num: '例題 5.3',
      page: 'p.100',
      unitLink: '#unit-5',
      unitLabel: '5.3 SR-FF',
      title: 'SR-FFのNAND構成およびNOR構成',
      question: `<p>SR-FFを NAND および NOR のみで構成せよ。</p>`,
      hint: `<p>NAND化は特性方程式の<strong>二重否定＋ド・モルガン</strong>。NOR化はカルノー図の <strong>Q<sup>+</sup>=0 のマス</strong>から ${ov('Q<sup>+</sup>')} を求めて否定します。</p>`,
      answer: `
        <h4>1. NAND構成の導出（途中式）</h4>
        <div class="formula-block">
          Q<sup>+</sup> = S + ${ov('R')}Q<br>
          &nbsp;&nbsp;&nbsp;= ${ov(ov('S + ' + ov('R') + 'Q'))}　← 二重否定<br>
          &nbsp;&nbsp;&nbsp;= <strong>${ov(ov('S') + ' · ' + ov(ov('R') + 'Q'))}</strong>　← ド・モルガンの法則（A+Bの否定 = Ā·B̄）
        </div>
        <p>※ 内側の <span class="formula">${ov(ov('R') + 'Q')}</span> が2段目のNAND出力（=${ov('Q')}）に対応し、たすき掛けの2入力NAND×2（負論理入力 ${ov('S')}, ${ov('R')}：0で動作）となる。</p>

        <h4>2. NOR構成の導出（途中式）</h4>
        <p>例題5.2のカルノー図で <strong>Q<sup>+</sup> = 0</strong> のマス（(00,0), (01,0), (01,1) と ×）を囲んで ${ov('Q<sup>+</sup>')} の加法形を作る：</p>
        <div class="formula-block">
          ${ov('Q<sup>+</sup>')} = R + ${ov('S')}${ov('Q')}　← R=1の4マス と S=0,Q=0の2マス<br>
          &nbsp;&nbsp;&nbsp;= R + ${ov('S + Q')}　← ド・モルガン（${ov('S')}${ov('Q')} = ${ov('S+Q')}）<br>
          両辺の否定をとると：<br>
          Q<sup>+</sup> = <strong>${ov('R + ' + ov('S + Q'))}</strong>
        </div>
        <p>※ たすき掛けの2入力NOR×2（正論理入力 S, R：1で動作）となる。</p>
        <h4>3. 回路図（教科書 図5.6）</h4>
        <div class="diagram-box">${D.srLatchNandNor()}</div>
      `
    },
    {
      id: 'tb-5-e4',
      chapter: 5,
      type: 'example',
      num: '例題 5.4',
      page: 'p.107〜108',
      unitLink: '#unit-5',
      unitLabel: '5.4 入力方程式',
      title: 'SR-FFの入力方程式の導出',
      question: `<p>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> を用いて、SR-FFの入力方程式を求めよ。</p>`,
      hint: `<p>① (g<sub>1</sub>, g<sub>2</sub>, Q) から Q<sup>+</sup> を埋める（Q=1なら g<sub>1</sub>、Q=0なら g<sub>2</sub>！） → ② SR励起表で S, R を埋める → ③ カルノー図で簡単化。</p>`,
      answer: `
        <h4>Step 1：SR-FFの励起表と関係表（表 5.8）を作成</h4>
        <p>SR励起表：<code>0→0:(0,×)</code>、<code>0→1:(1,0)</code>、<code>1→0:(0,1)</code>、<code>1→1:(×,0)</code></p>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>g<sub>1</sub></th><th>g<sub>2</sub></th><th>Q</th><th class="col-sep">Q<sup>+</sup> = g<sub>1</sub>Q+g<sub>2</sub>${ov('Q')}</th><th class="col-sep">S</th><th>R</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：S と R のカルノー図から簡単化</h4>
        <div class="grid-2">
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>S (g<sub>1</sub>g<sub>2</sub>＼Q)</th><th>0</th><th>1</th></tr></thead>
            <tbody>
              <tr><th>00</th><td>0</td><td>0</td></tr>
              <tr><th>01</th><td class="hi-ess">1</td><td>0</td></tr>
              <tr><th>11</th><td class="hi-ess">1</td><td class="hi-x">×</td></tr>
              <tr><th>10</th><td>0</td><td class="hi-x">×</td></tr>
            </tbody>
          </table></div>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>R (g<sub>1</sub>g<sub>2</sub>＼Q)</th><th>0</th><th>1</th></tr></thead>
            <tbody>
              <tr><th>00</th><td class="hi-x">×</td><td class="hi-ess">1</td></tr>
              <tr><th>01</th><td>0</td><td class="hi-ess">1</td></tr>
              <tr><th>11</th><td>0</td><td>0</td></tr>
              <tr><th>10</th><td class="hi-x">×</td><td>0</td></tr>
            </tbody>
          </table></div>
        </div>
        <p>S は (01,0) と (11,0) の2マスを囲んで <strong>g<sub>2</sub>${ov('Q')}</strong>、R は (00,1) と (01,1) の2マスを囲んで <strong>${ov('g<sub>1</sub>')}Q</strong>。</p>
        <div class="formula-block"><strong>解答： S = g<sub>2</sub>${ov('Q')},　　R = ${ov('g<sub>1</sub>')}Q</strong></div>
      `
    },
    {
      id: 'tb-5-e5',
      chapter: 5,
      type: 'example',
      num: '例題 5.5',
      page: 'p.108',
      unitLink: '#unit-5',
      unitLabel: '5.4 入力方程式',
      title: 'JK-FFの入力方程式の導出（過去問 問6と同一！）',
      question: `<p>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> を用いて、JK-FFの入力方程式を求めよ。</p>`,
      hint: `<p>JK励起表は4行すべてに × が入っているため、カルノー図で Q=0 と Q=1 をまたいで4マス大きく囲めます！</p>`,
      answer: `
        <h4>Step 1：JK励起表と関係表（表 5.9）を作成</h4>
        <p>JK励起表：<code>0→0:(0,×)</code>、<code>0→1:(1,×)</code>、<code>1→0:(×,1)</code>、<code>1→1:(×,0)</code></p>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>g<sub>1</sub></th><th>g<sub>2</sub></th><th>Q</th><th class="col-sep">Q<sup>+</sup></th><th class="col-sep">J</th><th>K</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-x">×</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-x">×</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：J と K のカルノー図（4マス囲みで Q が消える！）</h4>
        <div class="grid-2">
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>J (g<sub>1</sub>g<sub>2</sub>＼Q)</th><th>0</th><th>1</th></tr></thead>
            <tbody>
              <tr><th>00</th><td>0</td><td class="hi-x">×</td></tr>
              <tr><th>01</th><td class="hi-ess">1</td><td class="hi-ess">×</td></tr>
              <tr><th>11</th><td class="hi-ess">1</td><td class="hi-ess">×</td></tr>
              <tr><th>10</th><td>0</td><td class="hi-x">×</td></tr>
            </tbody>
          </table></div>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>K (g<sub>1</sub>g<sub>2</sub>＼Q)</th><th>0</th><th>1</th></tr></thead>
            <tbody>
              <tr><th>00</th><td class="hi-ess">×</td><td class="hi-ess">1</td></tr>
              <tr><th>01</th><td class="hi-ess">×</td><td class="hi-ess">1</td></tr>
              <tr><th>11</th><td class="hi-x">×</td><td>0</td></tr>
              <tr><th>10</th><td class="hi-x">×</td><td>0</td></tr>
            </tbody>
          </table></div>
        </div>
        <div class="formula-block"><strong>解答： J = g<sub>2</sub>,　　K = ${ov('g<sub>1</sub>')}</strong></div>
      `
    },
    {
      id: 'tb-5-e6',
      chapter: 5,
      type: 'example',
      num: '例題 5.6',
      page: 'p.109',
      unitLink: '#unit-5',
      unitLabel: '5.4 順序回路設計',
      title: 'SR-FFを用いたT-FFの設計',
      question: `<p>SR-FFを用いて T-FF を設計せよ。</p>`,
      hint: `<p>① T-FFの特性方程式を書く → ② 応用方程式と係数比較して g<sub>1</sub>, g<sub>2</sub> を読む → ③ SR-FFの入力方程式に代入！</p>`,
      answer: `
        <h4>Step 1：作りたい回路（T-FF）の特性方程式</h4>
        <div class="formula-block">Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')}</div>
        <h4>Step 2：応用方程式 Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')} と係数比較</h4>
        <div class="formula-block">g<sub>1</sub> = ${ov('T')},　　g<sub>2</sub> = T</div>
        <h4>Step 3：SR-FFの入力方程式（S = g<sub>2</sub>${ov('Q')}, R = ${ov('g<sub>1</sub>')}Q）に代入</h4>
        <div class="formula-block">
          S = g<sub>2</sub>${ov('Q')} = <strong>T${ov('Q')}</strong><br>
          R = ${ov('g<sub>1</sub>')}Q = ${ov(ov('T'))}Q = <strong>TQ</strong>
        </div>
        <p><strong>動作検算：</strong>T=0 なら S=R=0（保持）。T=1 のとき、Q=0 なら S=1, R=0（1へ反転）、Q=1 なら S=0, R=1（0へ反転）。常に SR=0 も満たす！</p>
        <h4>Step 4：回路図（教科書 図5.9）</h4>
        <div class="diagram-box">${D.srToT()}</div>
      `
    },
    {
      id: 'tb-5-e7',
      chapter: 5,
      type: 'example',
      num: '例題 5.7',
      page: 'p.110',
      unitLink: '#unit-5',
      unitLabel: '5.4 順序回路設計',
      title: 'SR-FFを用いたJK-FFの設計',
      question: `<p>SR-FFを用いて JK-FF を設計せよ。</p>`,
      hint: `<p>JK-FFの特性方程式 <span class="formula">Q<sup>+</sup> = ${ov('K')}Q + J${ov('Q')}</span> を応用方程式と比較します。</p>`,
      answer: `
        <h4>Step 1：JK-FFの特性方程式と係数比較</h4>
        <div class="formula-block">
          Q<sup>+</sup> = ${ov('K')}Q + J${ov('Q')}　⇔　Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}<br>
          よって g<sub>1</sub> = ${ov('K')},　g<sub>2</sub> = J
        </div>
        <h4>Step 2：SR-FFの入力方程式に代入</h4>
        <div class="formula-block">
          S = g<sub>2</sub>${ov('Q')} = <strong>J${ov('Q')}</strong><br>
          R = ${ov('g<sub>1</sub>')}Q = ${ov(ov('K'))}Q = <strong>KQ</strong>
        </div>
        <p><strong>ポイント：</strong>J=K=1 のときでも、Q と ${ov('Q')} は同時に1にならないため、SR-FF 側には必ず片方しか1が入らず（SR=0）、安全に反転動作する（ただしクロック付きでは発振防止にエッジトリガ等が必要）。</p>
        <h4>Step 3：回路図（教科書 図5.12）</h4>
        <div class="diagram-box">${D.srToJK()}</div>
      `
    },
    {
      id: 'tb-5-e8',
      chapter: 5,
      type: 'example',
      num: '例題 5.8',
      page: 'p.110',
      unitLink: '#unit-5',
      unitLabel: '5.4 順序回路設計',
      title: 'JK-FFを用いたT-FFの設計',
      question: `<p>JK-FFを用いて T-FF を設計せよ。</p>`,
      hint: `<p>T-FFより <span class="formula">g<sub>1</sub> = ${ov('T')}, g<sub>2</sub> = T</span>。JK-FFの入力方程式 <span class="formula">J = g<sub>2</sub>, K = ${ov('g<sub>1</sub>')}</span> に代入します。</p>`,
      answer: `
        <h4>Step 1：係数比較と代入</h4>
        <div class="formula-block">
          T-FFの特性方程式：Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')}　⇒　g<sub>1</sub> = ${ov('T')},　g<sub>2</sub> = T<br>
          JK-FFの入力方程式に代入：<br>
          <strong>J = g<sub>2</sub> = T,　　K = ${ov('g<sub>1</sub>')} = ${ov(ov('T'))} = T</strong>
        </div>
        <h4>Step 2：回路構成の2パターン（重要！）</h4>
        <ul>
          <li><strong>(a) 式のまま構成：</strong>J と K を束ねて入力 T を入れ、クロックは Cp へ入力（T=1のクロック時のみ反転）。</li>
          <li><strong>(b) 実用回路（カウンタ用）：</strong><strong>J = 1, K = 1 に固定</strong>し、入力 T（パルス）を負エッジトリガの <strong>Cp 端子</strong>へ入力する（T が立ち下がるたびに必ず出力が反転）。</li>
        </ul>
        <div class="diagram-box">${D.jkToT()}</div>
      `
    },
    {
      id: 'tb-5-x3',
      chapter: 5,
      type: 'exercise',
      num: '演習 5.3',
      page: '第6回課題',
      unitLink: '#unit-5',
      unitLabel: '5.4 入力方程式',
      title: 'T-FF と D-FF の入力方程式の導出',
      question: `<p>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> と各FFの特性方程式（励起表）を用いて、T-FF および D-FF の入力方程式（教科書 式(5.16), (5.17)）を導出せよ。</p>`,
      hint: `<p>T-FFは Q と Q<sup>+</sup> が異なるとき 1、D-FF は Q<sup>+</sup> と全く同じ値になります。</p>`,
      answer: `
        <h4>Step 1：関係表（8通り）を作成</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>g<sub>1</sub></th><th>g<sub>2</sub></th><th>Q</th><th class="col-sep">Q<sup>+</sup></th><th class="col-sep">T (= Q⊕Q<sup>+</sup>)</th><th>D (= Q<sup>+</sup>)</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
          </tbody>
        </table></div>
        <h4>Step 2：カルノー図で2マスずつ囲んで簡単化</h4>
        <ul>
          <li><strong>T</strong>：Q=1 の列では g<sub>1</sub>=0 の2マス（<strong>${ov('g<sub>1</sub>')}Q</strong>）、Q=0 の列では g<sub>2</sub>=1 の2マス（<strong>g<sub>2</sub>${ov('Q')}</strong>）</li>
          <li><strong>D</strong>：Q<sup>+</sup> そのものなので、Q=1 の列は <strong>g<sub>1</sub>Q</strong>、Q=0 の列は <strong>g<sub>2</sub>${ov('Q')}</strong></li>
        </ul>
        <div class="formula-block">
          <strong>T = ${ov('g<sub>1</sub>')}Q + g<sub>2</sub>${ov('Q')}</strong>　（式 5.16）<br>
          <strong>D = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</strong>　（式 5.17）
        </div>
      `
    },
    {
      id: 'tb-5-x4',
      chapter: 5,
      type: 'exercise',
      num: '演習 5.4',
      page: '第6回課題',
      unitLink: '#unit-5',
      unitLabel: '5.4 順序回路設計',
      title: 'SR-FFを用いたD-FFの設計',
      question: `<p>SR-FFを用いて D-FF を設計せよ。</p>`,
      hint: `<p>D-FFの特性方程式は <span class="formula">Q<sup>+</sup> = D = DQ + D${ov('Q')}</span>。入力方程式へ代入した後、SR励起表のドントケアを使うとさらに簡単になります！</p>`,
      answer: `
        <h4>Step 1：係数比較と入力方程式への代入</h4>
        <div class="formula-block">
          D-FFの特性方程式：Q<sup>+</sup> = D = D(Q + ${ov('Q')}) = DQ + D${ov('Q')}　⇒　g<sub>1</sub> = D,　g<sub>2</sub> = D<br>
          SR-FFの入力方程式に代入：S = D${ov('Q')},　R = ${ov('D')}Q
        </div>
        <h4>Step 2：SR励起表のドントケアを使った簡単化（教科書 図5.19）</h4>
        <p>(D, Q) の4通りで (Q → Q<sup>+</sup>=D) に必要な (S, R) を調べると：</p>
        <ul>
          <li>D=0, Q=0 (0→0)：S=0, R=×　／　D=0, Q=1 (1→0)：S=0, R=1</li>
          <li>D=1, Q=0 (0→1)：S=1, R=0　／　D=1, Q=1 (1→1)：S=×, R=0</li>
        </ul>
        <p>× に S=1（D=1,Q=1）と R=1（D=0,Q=0）を割り当てれば Q が消えて、NOTゲート1個だけの最簡形になる！</p>
        <div class="formula-block"><strong>解答： S = D,　　R = ${ov('D')}</strong>（代入そのままの S=D${ov('Q')}, R=${ov('D')}Q でも動作は同一）</div>
        <h4>Step 3：回路図（教科書 図5.19）</h4>
        <div class="diagram-box">${D.srToD()}</div>
      `
    },
    {
      id: 'tb-5-x5',
      chapter: 5,
      type: 'exercise',
      num: '演習 5.5',
      page: '第6回課題',
      unitLink: '#unit-5',
      unitLabel: '5.4 順序回路設計',
      title: 'JK-FFを用いたD-FFの設計',
      question: `<p>JK-FFを用いて D-FF を設計せよ。</p>`,
      hint: `<p>演習5.4と同様に <span class="formula">g<sub>1</sub> = D, g<sub>2</sub> = D</span> を JK-FF の入力方程式へ代入します。</p>`,
      answer: `
        <h4>Step 1：係数比較と代入</h4>
        <div class="formula-block">
          D-FFの特性方程式：Q<sup>+</sup> = D = DQ + D${ov('Q')}　⇒　g<sub>1</sub> = D,　g<sub>2</sub> = D<br>
          JK-FFの入力方程式（J = g<sub>2</sub>, K = ${ov('g<sub>1</sub>')}）に代入：<br>
          <strong>J = D,　　K = ${ov('D')}</strong>
        </div>
        <p><strong>動作検算：</strong>D=0 のとき J=0, K=1（リセット→0）、D=1 のとき J=1, K=0（セット→1）。NOTゲート1個を K 側に入れるだけで完成！</p>
        <h4>Step 2：回路図</h4>
        <div class="diagram-box">${D.jkToD()}</div>
      `
    },
    {
      id: 'tb-5-x6',
      chapter: 5,
      type: 'exercise',
      num: '演習 5.6',
      page: '第6回課題',
      unitLink: '#unit-5',
      unitLabel: '5.4 順序回路設計',
      title: 'D-FFを用いたT-FFの設計',
      question: `<p>D-FFを用いて T-FF を設計せよ。</p>`,
      hint: `<p>T-FFの特性方程式から <span class="formula">g<sub>1</sub> = ${ov('T')}, g<sub>2</sub> = T</span> を読み取り、D-FF の入力方程式 <span class="formula">D = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> へ代入します。</p>`,
      answer: `
        <h4>Step 1：係数比較と代入</h4>
        <div class="formula-block">
          T-FFの特性方程式：Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')}　⇒　g<sub>1</sub> = ${ov('T')},　g<sub>2</sub> = T<br>
          D-FFの入力方程式（D = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}）に代入：<br>
          <strong>D = ${ov('T')}Q + T${ov('Q')} = T ⊕ Q</strong>
        </div>
        <h4>Step 2：回路構成と2進カウンタへの応用</h4>
        <ul>
          <li>T 入力付き T-FF：T と現在出力 Q を <strong>XORゲート</strong> に入れて D 入力へつなぐ。</li>
          <li>T = 1 固定（2進カウンタ）：<span class="formula">D = 1 ⊕ Q = ${ov('Q')}</span> となるため、<strong>反転出力 ${ov('Q')} をそのまま D 入力へ直結</strong>するだけで1ビット2進カウンタが完成する！（第7回講義の時間定数問題でも頻出！）</li>
        </ul>
        <div class="diagram-box">${D.dToT()}</div>
      `
    }
  ];
})();
