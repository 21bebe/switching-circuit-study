/* =========================================================
   Textbook Problems Collection (浜辺隆二『論理回路入門』)
   試験範囲（3.5, 4.3-4.7, 5.1, 5.3-5.4）の全例題・演習問題 31問
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
      hint: `<p>欠けている変数に <span class="formula">(X + ${ov('X')})</span> を掛けて加法標準形（9個の最小項）に展開し、肯定変数の個数（1〜4個）でグループ分けして2段階結合します。</p>`,
      answer: `
        <p><strong>1. 加法標準形（9個の最小項）：</strong></p>
        <div class="formula-block">Z = ${ov('A')}${ov('B')}C${ov('D')} + ${ov('A')}B${ov('C')}D + ${ov('A')}BC${ov('D')} + A${ov('B')}C${ov('D')} + AB${ov('C')}${ov('D')} + ${ov('A')}BCD + AB${ov('C')}D + ABC${ov('D')} + ABCD</div>
        <p><strong>2. 結合して得られる主項（4個）：</strong> <span class="formula">C${ov('D')}, BD, BC, AB</span></p>
        <p><strong>3. 最小項・主項表より必須主項を選択：</strong></p>
        <ul>
          <li><span class="formula">C${ov('D')}</span>（${ov('A')}${ov('B')}C${ov('D')}, A${ov('B')}C${ov('D')} で唯一）→ 必須</li>
          <li><span class="formula">BD</span>（${ov('A')}B${ov('C')}D で唯一）→ 必須</li>
          <li><span class="formula">AB</span>（AB${ov('C')}${ov('D')} で唯一）→ 必須</li>
        </ul>
        <p>この3つで全9個の最小項が覆われるため <span class="formula">BC</span> は不要。</p>
        <div class="formula-block"><strong>解答： Z = C${ov('D')} + BD + AB</strong></div>
        <p style="font-size:13px;"><a href="#trainers">→ Q-M法ソルバーの「例題 3.8」プリセットで全ステップを確認</a></p>
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
      hint: `<p>元の最小項5個と、ドントケア項を展開した4個（${ov('A')}BC${ov('D')}, ${ov('A')}B${ov('C')}${ov('D')}, ${ov('A')}B${ov('C')}D, ${ov('A')}${ov('B')}${ov('C')}D）を混ぜて結合し、主項表では元の5個だけを行に並べます。</p>`,
      answer: `
        <p><strong>1. 最小項とドントケアの展開：</strong></p>
        <ul>
          <li>元の最小項（5個）：${ov('A')}${ov('B')}${ov('C')}${ov('D')}, ${ov('A')}${ov('B')}C${ov('D')}, A${ov('B')}${ov('C')}D, AB${ov('C')}D, ABCD</li>
          <li>ドントケア（4個）：${ov('A')}BC${ov('D')}, ${ov('A')}B${ov('C')}${ov('D')}, ${ov('A')}B${ov('C')}D, ${ov('A')}${ov('B')}${ov('C')}D</li>
        </ul>
        <p><strong>2. 得られる主項：</strong> <span class="formula">${ov('A')}${ov('D')}, ${ov('A')}${ov('C')}, ${ov('C')}D, ABD</span></p>
        <p><strong>3. 元の5最小項だけの主項表：</strong> 必須主項 <span class="formula">${ov('A')}${ov('D')}</span>（${ov('A')}${ov('B')}C${ov('D')} で唯一）、<span class="formula">${ov('C')}D</span>（A${ov('B')}${ov('C')}D で唯一）、<span class="formula">ABD</span>（ABCD で唯一）で全5項をカバー。</p>
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
        <ul>
          <li><strong>(1)</strong> 加法標準形（6最小項：${ov('A')}${ov('B')}C, ${ov('A')}B${ov('C')}, ${ov('A')}BC, A${ov('B')}C, AB${ov('C')}, ABC）→ 主項は <span class="formula">B, C</span>。<br>
          <strong>解答： <span class="formula">Z = B + C</span></strong></li>
          <li><strong>(2)</strong> 加法標準形（6最小項：${ov('A')}${ov('B')}${ov('C')}, ${ov('A')}${ov('B')}C, ${ov('A')}B${ov('C')}, A${ov('B')}${ov('C')}, A${ov('B')}C, AB${ov('C')}）→ 主項は <span class="formula">${ov('B')}, ${ov('C')}</span>。<br>
          <strong>解答： <span class="formula">Z = ${ov('B')} + ${ov('C')}</span></strong></li>
          <li><strong>(3)</strong> 加法標準形（6最小項：${ov('A')}${ov('B')}${ov('C')}D, ${ov('A')}B${ov('C')}${ov('D')}, ${ov('A')}${ov('B')}CD, ${ov('A')}B${ov('C')}D, ${ov('A')}BCD, AB${ov('C')}D）→ 主項は <span class="formula">${ov('A')}D, ${ov('A')}B${ov('C')}, B${ov('C')}D</span> の3つですべて必須。<br>
          <strong>解答： <span class="formula">Z = ${ov('A')}D + ${ov('A')}B${ov('C')} + B${ov('C')}D</span></strong></li>
        </ul>
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
      hint: `<p>ドントケアを展開すると <span class="formula">${ov('A')}BC${ov('D')}, ABC${ov('D')}, ABCD</span> の3最小項が追加され、演習3.5(3) より文字数が減ります。</p>`,
      answer: `
        <p>ドントケア3個を含めた計9個で結合すると、主項は <span class="formula">${ov('A')}D, ${ov('A')}B, BD, BC</span> の4つ。元の6最小項だけの主項表で必須主項 <span class="formula">${ov('A')}D, ${ov('A')}B, BD</span> を選ぶと全最小項をカバー（BCは不要）。</p>
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
      hint: `<p>下位からの桁上がりを考慮しない2入力（A, B）・2出力（和 S, 桁上がり C）の真理値表から論理式を導きます。</p>`,
      answer: `
        <div class="formula-block">S = A ⊕ B = ${ov('A')}B + A${ov('B')} = (${ov('A')} + ${ov('B')})(A + B)<br>C = A · B</div>
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
      hint: `<p>3入力（A, B, C<sub>in</sub>）の真理値表から加法標準形を書き、XOR でくくると半加算器2個＋ORゲート1個の形に整理できます。</p>`,
      answer: `
        <div class="formula-block">
          S = ${ov('A')}${ov('B')}C<sub>in</sub> + ${ov('A')}B${ov('C<sub>in</sub>')} + A${ov('B')}${ov('C<sub>in</sub>')} + ABC<sub>in</sub> = <strong>C<sub>in</sub> ⊕ (A ⊕ B)</strong><br>
          C<sub>out</sub> = ${ov('A')}BC<sub>in</sub> + A${ov('B')}C<sub>in</sub> + AB${ov('C<sub>in</sub>')} + ABC<sub>in</sub> = <strong>C<sub>in</sub>(A ⊕ B) + AB</strong>
        </div>
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
      hint: `<p>Z<sub>1</sub>（A=B）は A&gt;B でも A&lt;B でもないときなので、<span class="formula">${ov('Z<sub>0</sub> + Z<sub>2</sub>')}</span>（NORゲート1個）でも構成できます。</p>`,
      answer: `
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>A</th><th>B</th><th class="col-sep">Z<sub>0</sub> (A&gt;B)</th><th>Z<sub>1</sub> (A=B)</th><th>Z<sub>2</sub> (A&lt;B)</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
          </tbody>
        </table></div>
        <div class="formula-block">
          Z<sub>0</sub> = A${ov('B')}<br>
          Z<sub>1</sub> = ${ov('A')}${ov('B')} + AB = ${ov('A ⊕ B')} = ${ov('A' + ov('B') + ' + ' + ov('A') + 'B')}<br>
          Z<sub>2</sub> = ${ov('A')}B
        </div>
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
      question: `<p>2ビットデータの A と B を比較し、A &gt; B のとき Z<sub>0</sub> = 1、A = B のとき Z<sub>1</sub> = 1、A &lt; B のとき Z<sub>2</sub> = 1 となる比較器を設計せよ。</p>`,
      hint: `<p>例題4.7の1ビット比較器を上位（A<sub>1</sub>, B<sub>1</sub>）と下位（A<sub>0</sub>, B<sub>0</sub>）に1個ずつ並べ、上位が等しいときだけ下位の結果をANDで有効にします。</p>`,
      answer: `
        <div class="formula-block">
          Z<sub>0</sub> = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub>　（A<sub>1</sub>&gt;B<sub>1</sub>、または A<sub>1</sub>=B<sub>1</sub> かつ A<sub>0</sub>&gt;B<sub>0</sub>）<br>
          Z<sub>1</sub> = Z<sub>11</sub>Z<sub>01</sub>　（A<sub>1</sub>=B<sub>1</sub> かつ A<sub>0</sub>=B<sub>0</sub>）<br>
          Z<sub>2</sub> = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub>　（A<sub>1</sub>&lt;B<sub>1</sub>、または A<sub>1</sub>=B<sub>1</sub> かつ A<sub>0</sub>&lt;B<sub>0</sub>）
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
      hint: `<p>4本の入力のうち同時に1本だけが1になる前提で真理値表を作り、Z<sub>0</sub>=1, Z<sub>1</sub>=1 になる入力のORをとります（I<sub>0</sub> は未接続）。</p>`,
      answer: `
        <div class="formula-block">Z<sub>0</sub> = I<sub>1</sub> + I<sub>3</sub>　　Z<sub>1</sub> = I<sub>2</sub> + I<sub>3</sub></div>
        <p>2入力ORゲート2個だけで構成できる。ただし同時入力には非対応（→ プライオリティエンコーダが必要）。</p>
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
      hint: `<p>吸収の変形公式 <span class="formula">A + ${ov('A')}B = A + B</span> および <span class="formula">AB + ${ov('A')}BC = AB + BC</span> を使うと否定文字を大幅に減らせます。</p>`,
      answer: `
        <p>${ov('EI')} が 0 のとき有効（回路内では反転した信号 EI = 1 を各出力に掛ける）。</p>
        <div class="formula-block">
          Z<sub>2</sub> = (I<sub>7</sub> + I<sub>6</sub> + I<sub>5</sub> + I<sub>4</sub>) · EI<br>
          Z<sub>1</sub> = (I<sub>7</sub> + I<sub>6</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>2</sub>) · EI<br>
          Z<sub>0</sub> = (I<sub>7</sub> + ${ov('I<sub>6</sub>')}I<sub>5</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>4</sub>')}${ov('I<sub>2</sub>')}I<sub>1</sub>) · EI<br>
          GS = (I<sub>7</sub> + I<sub>6</sub> + I<sub>5</sub> + I<sub>4</sub> + I<sub>3</sub> + I<sub>2</sub> + I<sub>1</sub> + I<sub>0</sub>) · EI
        </div>
        <p>※ GS により、出力 000 が「入力なし（GS=0）」か「I<sub>0</sub>入力（GS=1）」かを判別できる。</p>
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
      hint: `<p>入力 (B, A) の4通りの組合せそれぞれに対応する最小項をANDゲートで作るだけです。</p>`,
      answer: `
        <div class="formula-block">Z<sub>0</sub> = ${ov('A')}${ov('B')},　Z<sub>1</sub> = A${ov('B')},　Z<sub>2</sub> = ${ov('A')}B,　Z<sub>3</sub> = AB</div>
        <p>NOTゲート2個と2入力ANDゲート4個で構成。</p>
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
      hint: `<p>1010〜1111 の6マスをすべてドントケア（×）として1つのカルノー図上に配置し、各 Z<sub>i</sub> が隣接する × と組めるかを調べます。</p>`,
      answer: `
        <div class="formula-block">
          Z<sub>0</sub> = ${ov('D')}${ov('C')}${ov('B')}${ov('A')}　　Z<sub>1</sub> = ${ov('D')}${ov('C')}${ov('B')}A　　Z<sub>2</sub> = ${ov('C')}B${ov('A')}　　Z<sub>3</sub> = ${ov('C')}BA<br>
          Z<sub>4</sub> = C${ov('B')}${ov('A')}　　Z<sub>5</sub> = C${ov('B')}A　　Z<sub>6</sub> = CB${ov('A')}　　Z<sub>7</sub> = CBA<br>
          Z<sub>8</sub> = D${ov('A')}　　Z<sub>9</sub> = DA
        </div>
        <p>※ Z<sub>0</sub>, Z<sub>1</sub> は × と隣接しないため4入力のまま。Z<sub>8</sub>, Z<sub>9</sub> は4マス組めるため2入力まで簡単化できる！</p>
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
      hint: `<p>真理値表から G<sub>0</sub>, G<sub>1</sub>, G<sub>2</sub> のカルノー図を作ると、すべて隣り合うビットの XOR で表せます。</p>`,
      answer: `
        <div class="formula-block">G<sub>0</sub> = A${ov('B')} + ${ov('A')}B = A ⊕ B　　G<sub>1</sub> = ${ov('C')}B + C${ov('B')} = B ⊕ C　　G<sub>2</sub> = C</div>
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
      hint: `<p>4チャネルなのでセレクトは2ビット（S<sub>1</sub>, S<sub>0</sub>）。各チャネルを4入力ANDゲートで選択し、4入力ORゲートで1本の出力 Z にまとめます。</p>`,
      answer: `
        <div class="formula-block">Z = (A${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')} + B${ov('S<sub>1</sub>')}S<sub>0</sub> + CS<sub>1</sub>${ov('S<sub>0</sub>')} + DS<sub>1</sub>S<sub>0</sub>) · EI</div>
        <p>回路構成：NOTゲート3個（${ov('EI')}, S<sub>1</sub>, S<sub>0</sub>用）、4入力ANDゲート4個、4入力ORゲート1個。</p>
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
      hint: `<p>2チャネルなのでセレクトは1ビット（S）。各ビット i = 0,1,2,3 について1ビット2ch MUXを4組並列に並べます。</p>`,
      answer: `
        <div class="formula-block">Z<sub>i</sub> = (A<sub>i</sub>·S + B<sub>i</sub>·${ov('S')}) · EI　　（i = 0, 1, 2, 3）</div>
        <p>各ビットごとに 3入力AND×2 + 2入力OR×1 を配置し、イネーブル EI とセレクト S, ${ov('S')} を全4ビットで共有する。</p>
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
      hint: `<p>出力チャネルが4つなのでセレクトは2ビット（S<sub>1</sub>, S<sub>0</sub>）。各チャネル各ビットに4入力ANDゲートを1個ずつ（計8個）配置します。</p>`,
      answer: `
        <div class="formula-block">
          ch.0：Z<sub>0i</sub> = D<sub>i</sub>·${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}·EI　　ch.1：Z<sub>1i</sub> = D<sub>i</sub>·${ov('S<sub>1</sub>')}S<sub>0</sub>·EI<br>
          ch.2：Z<sub>2i</sub> = D<sub>i</sub>·S<sub>1</sub>${ov('S<sub>0</sub>')}·EI　　ch.3：Z<sub>3i</sub> = D<sub>i</sub>·S<sub>1</sub>S<sub>0</sub>·EI　（i = 0, 1）
        </div>
        <p>${ov('EI')}=1 のときは全8出力が 0 になる。</p>
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
      hint: `<p>生成 <span class="formula">G<sub>i</sub> = A<sub>i</sub>B<sub>i</sub></span>、伝搬 <span class="formula">P<sub>i</sub> = A<sub>i</sub> ⊕ B<sub>i</sub></span> を使って C<sub>0</sub>, C<sub>1</sub> を前段キャリーなしで表し、和 S<sub>0</sub>, S<sub>1</sub> を求めます（過去問 問3と同一内容！）。</p>`,
      answer: `
        <div class="formula-block">
          G<sub>0</sub> = A<sub>0</sub>B<sub>0</sub>,　P<sub>0</sub> = A<sub>0</sub> ⊕ B<sub>0</sub>,　G<sub>1</sub> = A<sub>1</sub>B<sub>1</sub>,　P<sub>1</sub> = A<sub>1</sub> ⊕ B<sub>1</sub><br>
          C<sub>0</sub> = C<sup>-</sup>P<sub>0</sub> + G<sub>0</sub> = C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>) + A<sub>0</sub>B<sub>0</sub><br>
          C<sub>1</sub> = C<sup>-</sup>P<sub>0</sub>P<sub>1</sub> + G<sub>0</sub>P<sub>1</sub> + G<sub>1</sub> = C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>)(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>0</sub>B<sub>0</sub>(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>1</sub>B<sub>1</sub><br>
          S<sub>0</sub> = C<sup>-</sup> ⊕ P<sub>0</sub> = C<sup>-</sup> ⊕ (A<sub>0</sub> ⊕ B<sub>0</sub>)<br>
          S<sub>1</sub> = C<sub>0</sub> ⊕ P<sub>1</sub> = C<sub>0</sub> ⊕ (A<sub>1</sub> ⊕ B<sub>1</sub>)
        </div>
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
      question: `<p>2ビット比較器の真理値表（16通り）から簡単化した論理関数を求め、回路構成せよ（結果は図4.18＝例題4.8と同様になることを確認せよ）。</p>`,
      hint: `<p>A<sub>1</sub>A<sub>0</sub> と B<sub>1</sub>B<sub>0</sub> の4変数カルノー図（16マス）を Z<sub>0</sub>(A&gt;B), Z<sub>1</sub>(A=B), Z<sub>2</sub>(A&lt;B) それぞれについて描くと、例題4.8の式を展開した形が直接得られます。</p>`,
      answer: `
        <div class="formula-block">
          Z<sub>0</sub> (A&gt;B) = A<sub>1</sub>${ov('B<sub>1</sub>')} + (A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})A<sub>0</sub>${ov('B<sub>0</sub>')} = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub><br>
          Z<sub>1</sub> (A=B) = (A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})(A<sub>0</sub>B<sub>0</sub> + ${ov('A<sub>0</sub>')}${ov('B<sub>0</sub>')}) = (${ov('A<sub>1</sub> ⊕ B<sub>1</sub>')})(${ov('A<sub>0</sub> ⊕ B<sub>0</sub>')}) = Z<sub>11</sub>Z<sub>01</sub><br>
          Z<sub>2</sub> (A&lt;B) = ${ov('A<sub>1</sub>')}B<sub>1</sub> + (A<sub>1</sub>B<sub>1</sub> + ${ov('A<sub>1</sub>')}${ov('B<sub>1</sub>')})${ov('A<sub>0</sub>')}B<sub>0</sub> = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub>
        </div>
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
      hint: `<p>BCDなので 1010〜1111 の6通りはドントケア（×）にできます！カルノー図で × を使うと、G<sub>2</sub> が XOR ではなく OR（C + D）まで簡単化されます。</p>`,
      answer: `
        <p>0〜9の変換表を作り、10〜15をドントケア（×）としてカルノー図で簡単化すると：</p>
        <div class="formula-block">
          G<sub>3</sub> = D<br>
          G<sub>2</sub> = C + D　（BCDでは D=1 のとき常に C=0 のため D ⊕ C = C + D に簡単化！）<br>
          G<sub>1</sub> = B ⊕ C<br>
          G<sub>0</sub> = A ⊕ B
        </div>
        <p style="font-size:13px;color:var(--ink-secondary)">※ 通常の4ビット2進符号（0〜15すべて有効）なら G<sub>3</sub>=D, G<sub>2</sub>=D⊕C, G<sub>1</sub>=C⊕B, G<sub>0</sub>=B⊕A。</p>
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
      hint: `<p>2進→グレイの式 <span class="formula">G<sub>i</sub> = B<sub>i+1</sub> ⊕ B<sub>i</sub></span> の両辺に <span class="formula">B<sub>i+1</sub></span> を XOR すると <span class="formula">B<sub>i</sub> = B<sub>i+1</sub> ⊕ G<sub>i</sub></span>！最上位から順にXORをつなぐだけです。</p>`,
      answer: `
        <div class="formula-block">
          B<sub>3</sub> = G<sub>3</sub><br>
          B<sub>2</sub> = B<sub>3</sub> ⊕ G<sub>2</sub> = G<sub>3</sub> ⊕ G<sub>2</sub><br>
          B<sub>1</sub> = B<sub>2</sub> ⊕ G<sub>1</sub> = G<sub>3</sub> ⊕ G<sub>2</sub> ⊕ G<sub>1</sub><br>
          B<sub>0</sub> = B<sub>1</sub> ⊕ G<sub>0</sub> = G<sub>3</sub> ⊕ G<sub>2</sub> ⊕ G<sub>1</sub> ⊕ G<sub>0</sub>
        </div>
        <p>2入力XORゲート3個をカスケード接続（B<sub>3</sub>→XOR→B<sub>2</sub>→XOR→B<sub>1</sub>→XOR→B<sub>0</sub>）すれば構成できる。</p>
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
      hint: `<p>チャネル数が4なのでセレクトはどちらも2ビット（S<sub>1</sub>, S<sub>0</sub>）。例題4.14（1bit 4ch MUX）と例題4.16（2bit 4ch DEMUX）を8ビット分（i = 0〜7）に拡張すればOKです。</p>`,
      answer: `
        <p><strong>1. 8ビット4チャネルMUX（各チャネル入力 A<sub>i</sub>, B<sub>i</sub>, C<sub>i</sub>, D<sub>i</sub> → 出力 Z<sub>i</sub>, i=0..7）：</strong></p>
        <div class="formula-block">Z<sub>i</sub> = (A<sub>i</sub>${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')} + B<sub>i</sub>${ov('S<sub>1</sub>')}S<sub>0</sub> + C<sub>i</sub>S<sub>1</sub>${ov('S<sub>0</sub>')} + D<sub>i</sub>S<sub>1</sub>S<sub>0</sub>) · EI</div>
        <p><strong>2. 8ビット4チャネルDEMUX（入力 D<sub>i</sub> → 出力 Z<sub>0i</sub>〜Z<sub>3i</sub>, i=0..7）：</strong></p>
        <div class="formula-block">
          Z<sub>0i</sub> = D<sub>i</sub>${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}EI,　Z<sub>1i</sub> = D<sub>i</sub>${ov('S<sub>1</sub>')}S<sub>0</sub>EI,　Z<sub>2i</sub> = D<sub>i</sub>S<sub>1</sub>${ov('S<sub>0</sub>')}EI,　Z<sub>3i</sub> = D<sub>i</sub>S<sub>1</sub>S<sub>0</sub>EI
        </div>
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
      hint: `<p>S, R, Q の8通りの遷移表を作り、S=R=1（禁止入力）の行の Q<sup>+</sup> をドントケア（×）としてカルノー図で簡単化します。</p>`,
      answer: `
        <p>遷移表で Q<sup>+</sup>=1 となるのは (S,R,Q) = (0,0,1), (1,0,0), (1,0,1)、ドントケアは (1,1,0), (1,1,1)。カルノー図で × を含めてまとめると：</p>
        <div class="formula-block"><strong>Q<sup>+</sup> = S + ${ov('R')}Q　（ただし SR = 0）</strong></div>
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
      hint: `<p>NAND構成は <span class="formula">Q<sup>+</sup> = S + ${ov('R')}Q</span> に二重否定とド・モルガンを適用。NOR構成はカルノー図の Q<sup>+</sup>=0 から <span class="formula">${ov('Q<sup>+</sup>')}</span> を求めて否定をとります。</p>`,
      answer: `
        <p><strong>1. NAND構成（負論理入力 ${ov('S')}, ${ov('R')}：0で動作）：</strong></p>
        <div class="formula-block">Q<sup>+</sup> = ${ov(ov('S') + ' · ' + ov(ov('R') + 'Q'))}　（たすき掛け2入力NAND×2）</div>
        <p><strong>2. NOR構成（正論理入力 S, R：1で動作）：</strong></p>
        <div class="formula-block">${ov('Q<sup>+</sup>')} = R + ${ov('S')}${ov('Q')} = R + ${ov('S + Q')}　⇒　Q<sup>+</sup> = ${ov('R + ' + ov('S + Q'))}　（たすき掛け2入力NOR×2）</div>
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
      hint: `<p>(g<sub>1</sub>, g<sub>2</sub>, Q) の8通りから Q<sup>+</sup> を求め、SR-FFの励起表（0→0: 0×, 0→1: 10, 1→0: 01, 1→1: ×0）で S, R を埋めてカルノー図で簡単化します。</p>`,
      answer: `
        <div class="formula-block"><strong>S = g<sub>2</sub>${ov('Q')},　　R = ${ov('g<sub>1</sub>')}Q</strong></div>
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
      hint: `<p>JK-FFの励起表（0→0: 0×, 0→1: 1×, 1→0: ×1, 1→1: ×0）はドントケアが多いため、カルノー図で4マス大きく囲えて Q が消えます！</p>`,
      answer: `
        <div class="formula-block"><strong>J = g<sub>2</sub>,　　K = ${ov('g<sub>1</sub>')}</strong></div>
        <p style="font-size:13px;"><a href="#past-exam">→ 過去問 問6の完全解説（関係表付き）を見る</a></p>
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
      hint: `<p>T-FFの特性方程式 <span class="formula">Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')}</span> から g<sub>1</sub>, g<sub>2</sub> を読み取り、SR-FFの入力方程式に代入します。</p>`,
      answer: `
        <p>係数比較より <span class="formula">g<sub>1</sub> = ${ov('T')}, g<sub>2</sub> = T</span>。SR-FFの入力方程式 <span class="formula">S = g<sub>2</sub>${ov('Q')}, R = ${ov('g<sub>1</sub>')}Q</span> に代入して：</p>
        <div class="formula-block"><strong>S = T${ov('Q')},　　R = TQ</strong></div>
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
      hint: `<p>JK-FFの特性方程式 <span class="formula">Q<sup>+</sup> = ${ov('K')}Q + J${ov('Q')}</span> から <span class="formula">g<sub>1</sub> = ${ov('K')}, g<sub>2</sub> = J</span>。</p>`,
      answer: `
        <p>SR-FFの入力方程式に <span class="formula">g<sub>1</sub> = ${ov('K')}, g<sub>2</sub> = J</span> を代入して：</p>
        <div class="formula-block"><strong>S = J${ov('Q')},　　R = KQ</strong></div>
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
      hint: `<p>T-FFの特性方程式より <span class="formula">g<sub>1</sub> = ${ov('T')}, g<sub>2</sub> = T</span>。JK-FFの入力方程式 <span class="formula">J = g<sub>2</sub>, K = ${ov('g<sub>1</sub>')}</span> に代入します。</p>`,
      answer: `
        <div class="formula-block"><strong>J = g<sub>2</sub> = T,　　K = ${ov('g<sub>1</sub>')} = T</strong></div>
        <p>※ 実用回路では <strong>J = 1, K = 1 に固定</strong>し、入力 T を負エッジトリガのクロック端子 Cp に入力して T-FF（2進カウンタ）として用いる。</p>
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
      hint: `<p>T-FFは Q≠Q<sup>+</sup> のとき T=1（つまり <span class="formula">T = Q ⊕ Q<sup>+</sup></span>）、D-FFはそのまま <span class="formula">D = Q<sup>+</sup></span> になります。</p>`,
      answer: `
        <div class="formula-block">
          <strong>T-FF： T = ${ov('g<sub>1</sub>')}Q + g<sub>2</sub>${ov('Q')}</strong>　（式 5.16）<br>
          <strong>D-FF： D = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</strong>　（式 5.17）
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
      hint: `<p>D-FFの特性方程式は <span class="formula">Q<sup>+</sup> = D = DQ + D${ov('Q')}</span> なので <span class="formula">g<sub>1</sub> = D, g<sub>2</sub> = D</span> です。</p>`,
      answer: `
        <p>SR-FFの入力方程式に代入すると <span class="formula">S = D${ov('Q')}, R = ${ov('D')}Q</span>。さらに SR-FF の励起表のドントケアを用いて簡単化すると、以下の非常にシンプルな形になる（教科書 図5.19）：</p>
        <div class="formula-block"><strong>S = D,　　R = ${ov('D')}</strong>　（NOTゲート1個だけで構成可能！）</div>
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
      hint: `<p>D-FFより <span class="formula">g<sub>1</sub> = D, g<sub>2</sub> = D</span> を JK-FF の入力方程式 <span class="formula">J = g<sub>2</sub>, K = ${ov('g<sub>1</sub>')}</span> に代入するだけです。</p>`,
      answer: `
        <div class="formula-block"><strong>J = D,　　K = ${ov('D')}</strong></div>
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
      hint: `<p>T-FFより <span class="formula">g<sub>1</sub> = ${ov('T')}, g<sub>2</sub> = T</span> を D-FF の入力方程式 <span class="formula">D = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> に代入します。</p>`,
      answer: `
        <div class="formula-block"><strong>D = ${ov('T')}Q + T${ov('Q')} = T ⊕ Q</strong></div>
        <p>※ T = 1 に固定して2進カウンタとして使う場合は <strong>D = ${ov('Q')}</strong>（反転出力をDへ直結）になる。</p>
      `
    }
  ];
})();
