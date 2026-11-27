/* =========================================================
   Past Exam (山田 6.12.6 全6問) & Lecture Exercises Select
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

const _ov = (s) => `<span class="ov">${s}</span>`;

window.SwitchStudy.PastExam = {
  title: 'スイッチング回路理論 中間試験（過去問・山田）',
  subtitle: '全6問（問題1〜6）・電卓持込不可。実際の高得点答案でも落とした「減点ポイント」まで完全解説します。',
  problems: [
    {
      id: 'pe-1',
      num: '問題 1',
      points: '各4点・計12点',
      unitLink: '#unit-1',
      unitLabel: '3.5 Q-M法',
      question: `
        <p>クワイン・マクラスキー法に関する、以下の設問に答えなさい。</p>
        <p><strong>(1)</strong> <span class="formula">Z = AC + A${_ov('B')}${_ov('C')} + ${_ov('A')}BC</span> を簡単化することを考える。</p>
        <ul>
          <li><strong>(a)</strong> 論理関数 Z の加法標準形を求めなさい。</li>
          <li><strong>(b)</strong> クワイン・マクラスキー法を用いて、論理関数 Z を簡単化しなさい。</li>
        </ul>
        <p><strong>(2)</strong> カルノー図による簡単化と比較して、クワイン・マクラスキー法による簡単化の利点を挙げなさい。</p>
      `,
      hint: `
        <ul>
          <li>(1)(a)：欠けている変数は第1項 AC の B だけ！ <span class="formula">AC(B + ${_ov('B')}) = ABC + A${_ov('B')}C</span>。</li>
          <li>(1)(b)：肯定変数の個数は 1個（A${_ov('B')}${_ov('C')}）、2個（A${_ov('B')}C, ${_ov('A')}BC）、3個（ABC）。主項は3つ出るが、<strong>必須主項だけで全最小項が覆えるか必ず確認！</strong></li>
          <li>(2)：「機械的・規則的→プログラム化しやすい」「多変数（5変数以上）に向いている」のキーワード。</li>
        </ul>
      `,
      answer: `
        <p><strong>(1)(a) 加法標準形：</strong></p>
        <div class="formula-block">Z = ABC + A${_ov('B')}C + A${_ov('B')}${_ov('C')} + ${_ov('A')}BC</div>

        <p><strong>(1)(b) Q-M法による簡単化：</strong></p>
        <div class="grid-2">
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>肯定数</th><th>最小項</th><th>二変数項（主項）</th></tr></thead>
            <tbody>
              <tr><td>1</td><td class="mono-cell">A${_ov('B')}${_ov('C')} ✓</td><td class="mono-cell hi-1">A${_ov('B')}</td></tr>
              <tr><td>2</td><td class="mono-cell">A${_ov('B')}C ✓<br>${_ov('A')}BC ✓</td><td class="mono-cell hi-1">AC<br>BC</td></tr>
              <tr><td>3</td><td class="mono-cell">ABC ✓</td><td class="mono-cell">—</td></tr>
            </tbody>
          </table></div>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>最小項 ＼ 主項</th><th>A${_ov('B')} ★</th><th>AC (不要!)</th><th>BC ★</th></tr></thead>
            <tbody>
              <tr><td class="mono-cell">A${_ov('B')}${_ov('C')}</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td></tr>
              <tr><td class="mono-cell">A${_ov('B')}C</td><td>✓</td><td>✓</td><td></td></tr>
              <tr><td class="mono-cell">${_ov('A')}BC</td><td></td><td></td><td class="hi-ess">✓ (唯一)</td></tr>
              <tr><td class="mono-cell">ABC</td><td></td><td>✓</td><td>✓</td></tr>
            </tbody>
          </table></div>
        </div>
        <div class="formula-block"><strong>正解： Z = A${_ov('B')} + BC</strong></div>
        <div class="callout callout-trap">
          <div class="callout-title">過去問答案の実際の減点ポイント（2点減点！）</div>
          過去問の98点答案でも、ここで <span class="formula">Z = A${_ov('B')} + AC + BC</span> と書いてしまい <strong>△（2/4点）</strong> になっていました！<br>
          必須主項 <strong>A${_ov('B')}</strong>（1・2行目をカバー）と <strong>BC</strong>（3・4行目をカバー）の2つだけで4つの最小項すべてを覆えるため、<strong>AC は冗長で入れてはいけません！</strong>
        </div>

        <p><strong>(2) カルノー図と比較したQ-M法の利点：</strong></p>
        <div class="callout callout-ok">
          簡単化の過程が機械的・規則的であるため<strong>プログラム化しやすい</strong>（また、カルノー図では扱いにくい<strong>多変数の論理関数の簡単化</strong>にも向いている）。
        </div>
      `
    },
    {
      id: 'pe-2',
      num: '問題 2',
      points: '各4点・計12点',
      unitLink: '#unit-2',
      unitLabel: '4.5 比較器',
      question: `
        <p>1ビット比較器を用いて、2ビット比較器を設計することを考える。2ビットデータを <span class="formula">A = (A<sub>1</sub>A<sub>0</sub>)<sub>2</sub>, B = (B<sub>1</sub>B<sub>0</sub>)<sub>2</sub></span> とし、出力は <span class="formula">A&gt;B</span> のとき Z<sub>0</sub>=1、<span class="formula">A=B</span> のとき Z<sub>1</sub>=1、<span class="formula">A&lt;B</span> のとき Z<sub>2</sub>=1 とする。上位1ビット比較器の出力を Z<sub>10</sub>(A<sub>1</sub>&gt;B<sub>1</sub>), Z<sub>11</sub>(A<sub>1</sub>=B<sub>1</sub>), Z<sub>12</sub>(A<sub>1</sub>&lt;B<sub>1</sub>)、下位を Z<sub>00</sub>, Z<sub>01</sub>, Z<sub>02</sub> とする。</p>
        <ul>
          <li><strong>(1)</strong> Function Table の空欄に H か L かを埋め、完成させなさい。</li>
          <li><strong>(2)</strong> Z<sub>10</sub>, Z<sub>11</sub>, Z<sub>12</sub>, Z<sub>00</sub>, Z<sub>01</sub>, Z<sub>02</sub> を用いて、2ビット比較器の出力 Z<sub>0</sub>, Z<sub>1</sub>, Z<sub>2</sub> を表しなさい。</li>
          <li><strong>(3)</strong> 1ビット比較器を用いた2ビット比較器の回路図を書きなさい（1ビット比較器の中身は不要だが、入出力の論理変数は書くこと）。</li>
        </ul>
      `,
      hint: `
        <p>上位ビット A<sub>1</sub>, B<sub>1</sub> で大小が付けば下位はドントケア（×）。上位が等しい（Z<sub>11</sub>=1）ときだけ下位の結果を AND で通します。</p>
      `,
      answer: `
        <p><strong>(1) Function Table：</strong></p>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>A<sub>1</sub>, B<sub>1</sub></th><th>A<sub>0</sub>, B<sub>0</sub></th><th>Z<sub>0</sub> (A&gt;B)</th><th>Z<sub>1</sub> (A=B)</th><th>Z<sub>2</sub> (A&lt;B)</th></tr></thead>
          <tbody>
            <tr><td>A<sub>1</sub> &gt; B<sub>1</sub></td><td>×</td><td class="hi-1">H</td><td>L</td><td>L</td></tr>
            <tr><td>A<sub>1</sub> &lt; B<sub>1</sub></td><td>×</td><td>L</td><td>L</td><td class="hi-1">H</td></tr>
            <tr><td>A<sub>1</sub> = B<sub>1</sub></td><td>A<sub>0</sub> &gt; B<sub>0</sub></td><td class="hi-1">H</td><td>L</td><td>L</td></tr>
            <tr><td>A<sub>1</sub> = B<sub>1</sub></td><td>A<sub>0</sub> = B<sub>0</sub></td><td>L</td><td class="hi-1">H</td><td>L</td></tr>
            <tr><td>A<sub>1</sub> = B<sub>1</sub></td><td>A<sub>0</sub> &lt; B<sub>0</sub></td><td>L</td><td>L</td><td class="hi-1">H</td></tr>
          </tbody>
        </table></div>
        <p><strong>(2) 論理式：</strong></p>
        <div class="formula-block">
          Z<sub>0</sub> = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub><br>
          Z<sub>1</sub> = Z<sub>11</sub>Z<sub>01</sub><br>
          Z<sub>2</sub> = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub>
        </div>
        <p><strong>(3) 回路図：</strong></p>
        <div class="diagram-box">${window.SwitchStudy.Diagrams.comparator2()}</div>
      `
    },
    {
      id: 'pe-3',
      num: '問題 3',
      points: '各4点・計8点',
      unitLink: '#unit-2',
      unitLabel: '4.3 加算器・CLA',
      question: `
        <p>加算器に関する、以下の設問に答えなさい。</p>
        <ul>
          <li><strong>(1)</strong> 二つの全加算器を用いて2ビット並列加算器を作成する。全加算器の和 S と桁上げ C<sup>+</sup> が <span class="formula">S = C ⊕ (A ⊕ B)</span>、<span class="formula">C<sup>+</sup> = C(A ⊕ B) + AB</span> と表せることを利用して、入力 <span class="formula">A = (A<sub>1</sub>A<sub>0</sub>)<sub>2</sub>, B = (B<sub>1</sub>B<sub>0</sub>)<sub>2</sub></span> としたときの、下位ビットの和 S<sub>0</sub> と桁上げ C<sub>0</sub>、および上位ビットの和 S<sub>1</sub> と桁上げ C<sub>1</sub> の論理式を表しなさい。なお、下位からの桁上げを C<sup>-</sup> とする。</li>
          <li><strong>(2)</strong> 2ビット桁上げ先見加算器の上位ビットの桁上げ C<sub>1</sub> を表しなさい。</li>
        </ul>
      `,
      hint: `
        <p>(1) の C<sub>1</sub> の式にある C<sub>0</sub> に、(1) で求めた C<sub>0</sub> の式を丸ごと代入して分配法則で展開すれば (2) が求まります！</p>
      `,
      answer: `
        <p><strong>(1) 2ビット並列加算器の論理式：</strong></p>
        <div class="formula-block">
          S<sub>0</sub> = C<sup>-</sup> ⊕ (A<sub>0</sub> ⊕ B<sub>0</sub>)<br>
          C<sub>0</sub> = C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>) + A<sub>0</sub>B<sub>0</sub><br>
          S<sub>1</sub> = C<sub>0</sub> ⊕ (A<sub>1</sub> ⊕ B<sub>1</sub>)<br>
          C<sub>1</sub> = C<sub>0</sub>(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>1</sub>B<sub>1</sub>
        </div>
        <p><strong>(2) 2ビット桁上げ先見加算器の上位桁上げ C<sub>1</sub>：</strong></p>
        <div class="formula-block">
          C<sub>1</sub> = C<sub>0</sub>(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>1</sub>B<sub>1</sub><br>
          &nbsp;&nbsp;&nbsp;= { C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>) + A<sub>0</sub>B<sub>0</sub> }(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>1</sub>B<sub>1</sub><br>
          &nbsp;&nbsp;&nbsp;= <strong>C<sup>-</sup>(A<sub>0</sub> ⊕ B<sub>0</sub>)(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>0</sub>B<sub>0</sub>(A<sub>1</sub> ⊕ B<sub>1</sub>) + A<sub>1</sub>B<sub>1</sub></strong>
        </div>
        <p style="font-size:13.5px;color:var(--ink-secondary)">※ <span class="formula">P<sub>i</sub> = A<sub>i</sub>⊕B<sub>i</sub>, G<sub>i</sub> = A<sub>i</sub>B<sub>i</sub></span> と置けば <span class="formula">C<sub>1</sub> = C<sup>-</sup>P<sub>0</sub>P<sub>1</sub> + G<sub>0</sub>P<sub>1</sub> + G<sub>1</sub></span> と同じ形！</p>
      `
    },
    {
      id: 'pe-4',
      num: '問題 4',
      points: '各4点・計12点',
      unitLink: '#unit-3',
      unitLabel: '4.6 符号変換',
      question: `
        <p>3ビットの2進-グレイ符号変換回路を設計する（入力 C, B, A → 出力 G<sub>2</sub>, G<sub>1</sub>, G<sub>0</sub>）。</p>
        <ul>
          <li><strong>(1)</strong> 真理値表から加法標準形で G<sub>0</sub>, G<sub>1</sub>, G<sub>2</sub> を求めなさい。</li>
          <li><strong>(2)</strong> 簡単化して G<sub>0</sub>, G<sub>1</sub>, G<sub>2</sub> を表しなさい。</li>
          <li><strong>(3)</strong> XOR を用いて2進-グレイ符号変換回路の回路図を書きなさい。</li>
        </ul>
      `,
      hint: `
        <p>真理値表で出力が 1 の行をすべて拾って加法標準形を作り、カルノー図で簡単化すると、それぞれ綺麗な XOR（と G<sub>2</sub>=C）になります。</p>
      `,
      answer: `
        <p><strong>(1) 加法標準形：</strong></p>
        <div class="formula-block">
          G<sub>0</sub> = A${_ov('B')}${_ov('C')} + ${_ov('A')}B${_ov('C')} + A${_ov('B')}C + ${_ov('A')}BC<br>
          G<sub>1</sub> = ${_ov('A')}B${_ov('C')} + AB${_ov('C')} + ${_ov('A')}${_ov('B')}C + A${_ov('B')}C<br>
          G<sub>2</sub> = ${_ov('A')}${_ov('B')}C + A${_ov('B')}C + ${_ov('A')}BC + ABC
        </div>
        <p><strong>(2) 簡単化：</strong></p>
        <div class="formula-block">
          G<sub>0</sub> = ${_ov('A')}B + A${_ov('B')} = A ⊕ B<br>
          G<sub>1</sub> = B${_ov('C')} + ${_ov('B')}C = B ⊕ C<br>
          G<sub>2</sub> = C
        </div>
        <p><strong>(3) 回路図：</strong></p>
        <div class="diagram-box">${window.SwitchStudy.Diagrams.grayConverter3()}</div>
      `
    },
    {
      id: 'pe-5',
      num: '問題 5',
      points: '各4点・計12点',
      unitLink: '#unit-4',
      unitLabel: '4.7 マルチプレクサ',
      question: `
        <p>マルチプレクサに関する、以下の設問に答えなさい。</p>
        <p><strong>(1)</strong> 入力 A, B, C, D、出力 Z の1ビット4チャネルマルチプレクサを考える。セレクト (S<sub>1</sub>S<sub>0</sub>)<sub>2</sub> が 00 のときは A、01 のときは B、10 のときは C、11 のときは D を選択して出力する。</p>
        <ul>
          <li><strong>(a)</strong> 真理値表の空欄に × または d<sub>0</sub>, d<sub>1</sub>, d<sub>2</sub>, d<sub>3</sub> を埋め、完成させなさい（イネーブル ${_ov('EI')} 付き）。</li>
          <li><strong>(b)</strong> A, B, C, D, S<sub>0</sub>, S<sub>1</sub>, EI を用いて論理関数 Z を表しなさい。</li>
        </ul>
        <p><strong>(2)</strong> 1ビット2チャネルのマルチプレクサを組み合わせて、1ビット4チャネルマルチプレクサを作成しなさい。なお、(1)と同じ振る舞いになるように二つのセレクト S<sub>1</sub>, S<sub>0</sub> で制御すること。</p>
      `,
      hint: `
        <p>(1)(a) ${_ov('EI')}=1 の行はすべて ×、出力 Z=0。(2) 1段目に2個（S<sub>0</sub>でA/B、C/Dを選択）、2段目に1個（S<sub>1</sub>で選択）。</p>
      `,
      answer: `
        <p><strong>(1)(a) 真理値表：</strong></p>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>${_ov('EI')}</th><th>S<sub>1</sub></th><th>S<sub>0</sub></th><th>D</th><th>C</th><th>B</th><th>A</th><th class="col-sep">Z</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>0</sub></td><td class="mono-cell col-sep hi-1">d<sub>0</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>1</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>1</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-1">d<sub>2</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>2</sub></td></tr>
            <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell hi-1">d<sub>3</sub></td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">d<sub>3</sub></td></tr>
          </tbody>
        </table></div>
        <p><strong>(1)(b) 論理関数：</strong></p>
        <div class="formula-block">Z = (${_ov('S<sub>1</sub>')}${_ov('S<sub>0</sub>')}A + ${_ov('S<sub>1</sub>')}S<sub>0</sub>B + S<sub>1</sub>${_ov('S<sub>0</sub>')}C + S<sub>1</sub>S<sub>0</sub>D) · EI</div>
        <p><strong>(2) 1ビット2ch MUX×3 による回路図：</strong>（${_ov('EI')} がある場合は NOT を通して全MUXのイネーブルへ共通接続）</p>
        <div class="diagram-box">${window.SwitchStudy.Diagrams.mux4From2()}</div>
      `
    },
    {
      id: 'pe-6',
      num: '問題 6',
      points: '各4点・計16点',
      unitLink: '#unit-5',
      unitLabel: '5.4 入力方程式',
      question: `
        <p>JK-FFの入力方程式を求めることを考える。</p>
        <ul>
          <li><strong>(1)</strong> 応用方程式の式を書きなさい。</li>
          <li><strong>(2)</strong> (1)であらわした応用方程式を満たすように、表の Q<sup>+</sup> の欄を埋めなさい。</li>
          <li><strong>(3)</strong> JK-FFの特性方程式は <span class="formula">Q<sup>+</sup> = ${_ov('K')}Q + J${_ov('Q')}</span> である。特性方程式を満たすように、表の J, K の欄を埋めなさい（0, 1どちらでもよい場合は × と書くこと）。</li>
          <li><strong>(4)</strong> 表から JK-FF の入力方程式を求めなさい（簡単化できる場合は簡単化すること）。</li>
        </ul>
      `,
      hint: `
        <p>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${_ov('Q')}</span> は「Q=1 のときは g<sub>1</sub>、Q=0 のときは g<sub>2</sub> がそのまま Q<sup>+</sup> になる」と覚えると一瞬で表が埋まります！</p>
      `,
      answer: `
        <p><strong>(1) 応用方程式：</strong></p>
        <div class="formula-block">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${_ov('Q')}</div>
        <p><strong>(2)(3) 応用方程式と特性方程式との関係表：</strong></p>
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
        <p><strong>(4) JK-FFの入力方程式（カルノー図で × を活用して簡単化）：</strong></p>
        <div class="formula-block"><strong>J = g<sub>2</sub>,　　K = ${_ov('g<sub>1</sub>')}</strong></div>
      `
    }
  ]
};

window.SwitchStudy.Exercises = [
  {
    id: 'ex-1',
    num: '演習 1',
    tag: '第1回課題・ドントケアQ-M法',
    title: '【演習問題 3.8(3)】ドントケア項を含む4変数関数のQ-M法',
    question: `
      <p><span class="formula">Z = ${_ov('A')}B${_ov('C')} + ${_ov('A')}BCD + ${_ov('A')}${_ov('B')}D + B${_ov('C')}D</span> をQ-M法で簡単化せよ。ただしドントケア項を <span class="formula">BC${_ov('D')}, ABC</span> とする。</p>
    `,
    hint: `
      <p>元の最小項は6個（${_ov('A')}${_ov('B')}${_ov('C')}D, ${_ov('A')}B${_ov('C')}${_ov('D')}, ${_ov('A')}${_ov('B')}CD, ${_ov('A')}B${_ov('C')}D, ${_ov('A')}BCD, AB${_ov('C')}D）。ドントケアを展開すると <span class="formula">${_ov('A')}BC${_ov('D')}, ABC${_ov('D')}, ABCD</span> の3個が加わり計9個で結合します。</p>
    `,
    answer: `
      <p>ドントケアを含めて2段階結合すると、主項は <strong>${_ov('A')}D, ${_ov('A')}B, BD, BC</strong> の4つになります。</p>
      <p>元の6つの最小項だけで主項表を作ると、必須主項は <strong>${_ov('A')}D</strong>（${_ov('A')}${_ov('B')}${_ov('C')}D, ${_ov('A')}${_ov('B')}CD で唯一）、<strong>${_ov('A')}B</strong>（${_ov('A')}B${_ov('C')}${_ov('D')} で唯一）、<strong>BD</strong>（AB${_ov('C')}D で唯一）の3つ。これですべての最小項が覆われるため BC は不要。</p>
      <div class="formula-block"><strong>解答： Z = ${_ov('A')}D + ${_ov('A')}B + BD</strong></div>
    `
  },
  {
    id: 'ex-2',
    num: '演習 2',
    tag: '第2回課題・多ビット比較器',
    title: '3ビット比較器の論理式導出',
    question: `
      <p>1ビット比較器を3個用いて、3ビット数値 <span class="formula">A=(A<sub>2</sub>A<sub>1</sub>A<sub>0</sub>)<sub>2</sub>, B=(B<sub>2</sub>B<sub>1</sub>B<sub>0</sub>)<sub>2</sub></span> を比較する3ビット比較器の出力 <span class="formula">Z<sub>0</sub>(A&gt;B), Z<sub>1</sub>(A=B), Z<sub>2</sub>(A&lt;B)</span> を表せ。</p>
    `,
    hint: `
      <p>最上位（bit 2）で決まる場合 ＋ bit 2が等しく bit 1で決まる場合 ＋ bit 2, 1とも等しく bit 0で決まる場合、のORをとります。</p>
    `,
    answer: `
      <div class="formula-block">
        Z<sub>0</sub> = Z<sub>20</sub> + Z<sub>21</sub>Z<sub>10</sub> + Z<sub>21</sub>Z<sub>11</sub>Z<sub>00</sub><br>
        Z<sub>1</sub> = Z<sub>21</sub>Z<sub>11</sub>Z<sub>01</sub><br>
        Z<sub>2</sub> = Z<sub>22</sub> + Z<sub>21</sub>Z<sub>12</sub> + Z<sub>21</sub>Z<sub>11</sub>Z<sub>02</sub>
      </div>
      <div class="diagram-box">${window.SwitchStudy.Diagrams.comparator3()}</div>
    `
  },
  {
    id: 'ex-3',
    num: '演習 3',
    tag: '第3回講義・オーバーフロー',
    title: '4ビット符号付き加算（2の補数）のオーバーフロー判定',
    question: `
      <p>4ビット符号付き2進数（2の補数表現）で次の2つの加算を行い、それぞれ桁上がり C<sub>3</sub>、C<sub>2</sub> とオーバーフローの有無を答えよ。</p>
      <p>(a) <span class="formula">0110 + 0011</span>（+6 + +3）　　(b) <span class="formula">1100 + 1110</span>（-4 + -2）</p>
    `,
    hint: `
      <p>4ビット符号付き数の表現範囲は -8 〜 +7。筆算で各桁の繰り上がりを追い、C<sub>2</sub>（bit 2→3）と C<sub>3</sub>（bit 3→4）のXORをとります。</p>
    `,
    answer: `
      <ul>
        <li><strong>(a) 0110 + 0011 = 1001</strong>：C<sub>2</sub>=1, C<sub>3</sub>=0 → V = 0 ⊕ 1 = <strong>1（オーバーフローあり！）</strong>（+9は範囲外で -7 に化けた）</li>
        <li><strong>(b) 1100 + 1110 = (1)1010</strong>：C<sub>2</sub>=1, C<sub>3</sub>=1 → V = 1 ⊕ 1 = <strong>0（オーバーフローなし）</strong>（1010 = -6 で正しい！）</li>
      </ul>
    `
  },
  {
    id: 'ex-4',
    num: '演習 4',
    tag: '第5回課題・DEMUX',
    title: '4ビット2チャネルデマルチプレクサの設計',
    question: `
      <p>4ビット入力 <span class="formula">(D<sub>3</sub>D<sub>2</sub>D<sub>1</sub>D<sub>0</sub>)</span> を、セレクト S=0 でチャネル0 <span class="formula">(Z<sub>03</sub>..Z<sub>00</sub>)</span>、S=1 でチャネル1 <span class="formula">(Z<sub>13</sub>..Z<sub>10</sub>)</span> に出力するデマルチプレクサの論理関数を、イネーブル ${_ov('EI')}（0でON）を含めて示せ。</p>
    `,
    hint: `
      <p>各ビット i = 0, 1, 2, 3 は同じ構造のANDゲートになります。${_ov('EI')}=0 のとき有効信号 EI=1。</p>
    `,
    answer: `
      <div class="formula-block">
        i = 0, 1, 2, 3 について：<br>
        Z<sub>0i</sub> = D<sub>i</sub> · ${_ov('S')} · EI<br>
        Z<sub>1i</sub> = D<sub>i</sub> · S · EI
      </div>
      <div class="diagram-box">${window.SwitchStudy.Diagrams.demux4bit2ch()}</div>
    `
  },
  {
    id: 'ex-5',
    num: '演習 5',
    tag: '第6回課題・演習5.3〜5.6',
    title: 'D-FF を用いた T-FF の設計（入力方程式の応用）',
    question: `
      <p>応用方程式と入力方程式を用いて、D-FF から T-FF を設計せよ。また、T=1 に固定して2進カウンタとして使うときはどう接続すればよいか。</p>
    `,
    hint: `
      <p>T-FFの特性方程式は <span class="formula">Q<sup>+</sup> = ${_ov('T')}Q + T${_ov('Q')}</span>。D-FFの入力方程式は <span class="formula">D = g<sub>1</sub>Q + g<sub>2</sub>${_ov('Q')}</span>。</p>
    `,
    answer: `
      <p>T-FFの特性方程式より <span class="formula">g<sub>1</sub> = ${_ov('T')}, g<sub>2</sub> = T</span>。これを D-FF の入力方程式に代入すると：</p>
      <div class="formula-block">D = ${_ov('T')}Q + T${_ov('Q')} = T ⊕ Q</div>
      <p>よって、T と現在出力 Q の XOR を D 入力へつなぐ。特に T=1 に固定する場合は <strong><span class="formula">D = ${_ov('Q')}</span></strong>（反転出力をそのままDに帰還するだけ！）で1ビット2進カウンタになる。</p>
      <div class="diagram-box">${window.SwitchStudy.Diagrams.dToT()}</div>
    `
  },
  {
    id: 'ex-6',
    num: '演習 6',
    tag: '第7回講義・時間定数＆カウンタ計算',
    title: 'FFの時間制約と非同期式4ビットカウンタの最大クロック周波数',
    question: `
      <p>アクセスタイム <span class="formula">T<sub>acc</sub> = 10 ns</span>（最小 8 ns、最大 12 ns）、<span class="formula">T<sub>setup</sub> = 5 ns</span>、<span class="formula">T<sub>hold</sub> = 4 ns</span> のFFを考える。</p>
      <p>(a) D-FFによるT-FFはホールド条件を満たすか？また最小クロック周期 T<sub>Cp,min</sub> は何 ns か？</p>
      <p>(b) T<sub>acc</sub> = 10 ns のT-FFを4個直列にした非同期式16進カウンタが正常に読み取れるクロック周期 T<sub>Cp</sub> と最大周波数 f<sub>Cp</sub> の条件を求めよ。</p>
    `,
    hint: `
      <p>(a) ホールド条件：<span class="formula">T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup></span>、周期条件：<span class="formula">T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> ≦ T<sub>Cp</sub></span>。<br>
      (b) 非同期4ビット：<span class="formula">T<sub>Cp</sub> &gt; 4·T<sub>acc</sub></span>、<span class="formula">f<sub>Cp</sub> &lt; 1 / (4·T<sub>acc</sub>)</span>。</p>
    `,
    answer: `
      <ul>
        <li><strong>(a)</strong> ホールド条件：<span class="formula">4 ns ≦ 8 ns</span> → <strong>満たす（違反なし）</strong>。<br>
        最小クロック周期：<span class="formula">T<sub>Cp</sub> ≧ 5 + 12 = 17 ns</span>（最大約 58.8 MHz）。</li>
        <li><strong>(b)</strong> 4段分の遅延は <span class="formula">4 × 10 ns = 40 ns</span>。<br>
        よって <strong><span class="formula">T<sub>Cp</sub> &gt; 40 ns</span></strong>、最大クロック周波数は <strong><span class="formula">f<sub>Cp</sub> &lt; 1 / (40 × 10<sup>-9</sup>) = 25 MHz</span></strong>。</li>
      </ul>
    `
  }
];
