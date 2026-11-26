/* =========================================================
   Unit Study Content (Units 1 to 6: Complete Exam Scope)
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

const ov = (s) => `<span class="ov">${s}</span>`;

window.SwitchStudy.Units = [
  /* ===================== UNIT 1 ===================== */
  {
    id: 'unit-1',
    code: '3.5',
    title: 'クワイン・マクラスキー法による簡単化',
    pages: '教科書 p.61〜66 / 第1回講義',
    summary: '加法標準形から機械的・規則的に論理関数を簡単化するQ-M法。主項表の作り方とドントケア項の扱いを完全マスターする。',
    checkpoints: [
      { id: 'u1-c1', text: '論理関数から加法標準形（最小項のOR接続）を正確に求められる' },
      { id: 'u1-c2', text: 'カルノー図と比較したQ-M法の利点（機械的・プログラム化しやすい・多変数対応）を説明できる' },
      { id: 'u1-c3', text: '肯定変数の個数でグループ分けし、隣接比較で主項を漏れなく求められる' },
      { id: 'u1-c4', text: '最小項・主項表から必須主項を選び、冗長な主項を入れずに最簡形を求められる' },
      { id: 'u1-c5', text: 'ドントケア項を結合段階に含め、主項表では除外して簡単化できる' }
    ],
    sections: [
      {
        title: '1. 加法標準形とブール代数の基本法則',
        badge: '基礎',
        html: `
          <p><strong>加法標準形</strong>とは、すべての入力変数（肯定または否定）を含む積項（<strong>最小項</strong>）の論理和（OR）で表した形です。Q-M法は必ず<strong>加法標準形</strong>から出発します。</p>
          <div class="formula-block">
            例：Z = AC + A${ov('B')}${ov('C')} + ${ov('A')}BC<br>
            欠けている変数 X に (X + ${ov('X')}) = 1 を掛けて展開する：<br>
            AC(B + ${ov('B')}) = ABC + A${ov('B')}C<br>
            よって Z = ABC + A${ov('B')}C + A${ov('B')}${ov('C')} + ${ov('A')}BC
          </div>
          <h3>覚えておくべきブール代数の法則</h3>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>名称</th><th>AND形</th><th>OR形</th></tr></thead>
            <tbody>
              <tr><td>冪等則</td><td class="mono-cell">A·A = A</td><td class="mono-cell">A + A = A</td></tr>
              <tr><td>相補則（Q-M法の核）</td><td class="mono-cell">A·${ov('A')} = 0</td><td class="mono-cell">A + ${ov('A')} = 1</td></tr>
              <tr><td>吸収則</td><td class="mono-cell">A(A + B) = A</td><td class="mono-cell">A + AB = A</td></tr>
              <tr><td>ド・モルガンの法則</td><td class="mono-cell">${ov('A·B')} = ${ov('A')} + ${ov('B')}</td><td class="mono-cell">${ov('A + B')} = ${ov('A')}·${ov('B')}</td></tr>
              <tr><td>よく使う変形</td><td class="mono-cell" colspan="2">A + ${ov('A')}B = A + B（プライオリティエンコーダ等で多用）</td></tr>
            </tbody>
          </table></div>
        `
      },
      {
        title: '2. なぜQ-M法が必要か？（カルノー図との比較）',
        badge: '記述頻出',
        html: `
          <div class="callout callout-why">
            <div class="callout-title">なぜこの手法が必要か？</div>
            カルノー図は3〜4変数なら視覚的にわかりやすいが、<strong>① 変数が増えると図が巨大で扱いにくい、② グループ化を見落としやすい、③ 手作業でしか実行できない</strong>という課題がある。<br>
            これに対し <strong>Q-M法（Quine-McCluskey法）</strong>は、相補則（<span class="formula">X + ${ov('X')} = 1</span>）に基づく<strong>機械的・規則的な手順</strong>であるため、<strong>プログラム化（CAD自動化）がしやすく、多変数の簡単化に向いている</strong>。
          </div>
        `
      },
      {
        title: '3. Q-M法の6ステップと主項表の選び方',
        badge: '超重要',
        html: `
          <ol>
            <li><strong>加法標準形を求める</strong>（重複する最小項は冪等則で1つにまとめる）。</li>
            <li>各最小項を<strong>肯定変数の個数（1の個数）</strong>ごとにグループ分けし、0個→1個→2個…と昇順に並べる。</li>
            <li><strong>隣り合う上下のグループ間</strong>ですべての組合せを比較し、<strong>ちょうど1変数だけ肯定/否定が異なるペア</strong>を見つけてその変数を消去し、元の2項に <code>✓</code> を付ける。</li>
            <li>作られた項の重複を削除し、さらに隣接比較を<strong>1変数も減らせなくなるまで繰り返す</strong>。</li>
            <li>最後まで <code>✓</code> が付かなかった項がすべて<strong>主項（Prime Implicant）</strong>となる。</li>
            <li><strong>最小項・主項表</strong>（行：最小項、列：主項）を作り、各最小項を含む主項に <code>✓</code> を打つ。</li>
          </ol>
          <div class="callout callout-trap">
            <div class="callout-title">試験で一番多い減点ポイント！</div>
            主項表では、まず<strong>「その行に ✓ が1つしかない最小項」</strong>を探し、それを覆う主項（<strong>必須主項</strong>）を確定します。必須主項を選んだ時点で<strong>すでに全最小項が覆われていたらそこで終了！</strong> 残った主項（例：過去問 問1の AC）をうっかり足すと「簡単化不十分」で減点されます。
          </div>
          <h3>【教科書 例題3.8】Z = ${ov('A')}BC + AB${ov('C')} + ABD + B${ov('C')}D + ${ov('A')}C${ov('D')} + AC${ov('D')}</h3>
          <p>加法標準形は9個の最小項。2段階結合すると主項は <strong>C${ov('D')}、BD、BC、AB</strong> の4つが残る。</p>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>最小項 ＼ 主項</th><th>C${ov('D')} ★</th><th>BD ★</th><th>BC (不要)</th><th>AB ★</th></tr></thead>
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
          <p>必須主項 <strong>C${ov('D')}・BD・AB</strong> の3つだけで9個すべてが覆われるため、BCは不要。よって <strong><span class="formula">Z = C${ov('D')} + BD + AB</span></strong>。</p>
        `
      },
      {
        title: '4. ドントケア項を利用したQ-M法（例題3.7）',
        badge: '超重要',
        html: `
          <p>入力として起こりえない（または出力が0でも1でもよい）組合せを<strong>ドントケア項（×）</strong>といいます。</p>
          <div class="callout callout-exam">
            <div class="callout-title">ドントケア項の扱いルール（2段階だけ覚える！）</div>
            <ul>
              <li><strong>前半（結合表で主項を求めるまで）</strong>：ドントケア項も最小項に<strong>混ぜて一緒に結合</strong>する（より大きなグループ＝文字数の少ない主項を作るため）。</li>
              <li><strong>後半（最小項・主項表で主項を選ぶとき）</strong>：<strong>ドントケア項は行から除外</strong>する！元の論理関数の最小項だけを覆えばよい。</li>
            </ul>
          </div>
          <p><strong>例題3.7：</strong> <span class="formula">Z = ${ov('A')}${ov('B')}${ov('D')} + AB${ov('C')}D + ABCD + A${ov('B')}${ov('C')}D</span>、ドントケア <span class="formula">${ov('A')}B${ov('D')}, ${ov('A')}${ov('C')}D</span></p>
          <p>ドントケアの4最小項（${ov('A')}BC${ov('D')}, ${ov('A')}B${ov('C')}${ov('D')}, ${ov('A')}B${ov('C')}D, ${ov('A')}${ov('B')}${ov('C')}D）を混ぜて結合すると、主項は <span class="formula">${ov('A')}${ov('D')}, ${ov('A')}${ov('C')}, ${ov('C')}D, ABD</span> となる。元の5つの最小項だけで主項表を作ると、必須主項 <strong>${ov('A')}${ov('D')}、${ov('C')}D、ABD</strong> で全最小項が覆われ、<span class="formula">Z = ${ov('A')}${ov('D')} + ${ov('C')}D + ABD</span> が得られる。</p>
          <p>→ <a href="#trainers">計算手順トレーナー（Q-M法ソルバー）</a>で、この例題や過去問をステップ実行できます！</p>
        `
      }
    ]
  },

  /* ===================== UNIT 2 ===================== */
  {
    id: 'unit-2',
    code: '4.3-5',
    title: '演算回路（加算器・CLA・減算器・比較器）',
    pages: '教科書 p.73〜83 / 第2・3回講義',
    summary: '半加算器・全加算器から多ビット並列加算器、桁上げ先見加算器（CLA）、オーバーフロー検出器、加減算器、多ビット比較器までを網羅。',
    checkpoints: [
      { id: 'u2-c1', text: '半加算器と全加算器の真理値表・論理式・回路図を自力で書ける' },
      { id: 'u2-c2', text: '並列加算器の問題点（桁上げ伝搬遅延）を説明できる' },
      { id: 'u2-c3', text: 'CLAの生成 Gi=AiBi、伝搬 Pi=Ai⊕Bi を用いて C0〜C3 と Sk を導出できる' },
      { id: 'u2-c4', text: 'オーバーフローと桁上がりの違い、および V = C3 ⊕ C2 による判定方法を説明できる' },
      { id: 'u2-c5', text: '1の補数器と加算器を組み合わせた4ビット加減算器の動作を説明できる' },
      { id: 'u2-c6', text: '1ビット比較器から2ビット・3ビット比較器のFunction Table・論理式・回路図を設計できる' }
    ],
    sections: [
      {
        title: '1. 半加算器（HA）と全加算器（FA）',
        badge: '基礎',
        html: `
          <p><strong>半加算器（Half Adder）</strong>は下位からの桁上がりを考慮しない1ビット加算器、<strong>全加算器（Full Adder）</strong>は下位からの桁上がり <span class="formula">C<sub>in</sub></span> を考慮する1ビット加算器です。</p>
          <div class="grid-2">
            <div>
              <h3>半加算器（HA）</h3>
              <div class="formula-block">S = A ⊕ B = ${ov('A')}B + A${ov('B')}<br>C = A · B</div>
              <div class="diagram-box">${window.SwitchStudy.Diagrams.halfAdder()}<div class="diagram-caption">半加算器の回路図</div></div>
            </div>
            <div>
              <h3>全加算器（FA）</h3>
              <div class="formula-block">S = C<sub>in</sub> ⊕ (A ⊕ B)<br>C<sub>out</sub> = C<sub>in</sub>(A ⊕ B) + A·B</div>
              <div class="diagram-box">${window.SwitchStudy.Diagrams.fullAdder()}<div class="diagram-caption">全加算器の回路図（HA×2 + OR）</div></div>
            </div>
          </div>
        `
      },
      {
        title: '2. 4ビット並列加算器と伝搬遅延の問題点',
        badge: '記述頻出',
        html: `
          <p>全加算器（FA）をビット数分だけ横に並べ、下位の桁上がり <span class="formula">C<sub>i</sub></span> を次段の入力へつないだものを<strong>並列加算器（リプルキャリー加算器）</strong>といいます。</p>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.parallelAdder4()}<div class="diagram-caption">4ビット並列加算器と桁上げ伝搬遅延の方向</div></div>
          <div class="callout callout-trap">
            <div class="callout-title">並列加算器の問題点（テスト頻出記述！）</div>
            前段（下位ビット）の桁上がりが確定しないと次段の計算が確定しないため、ビット数が増えるほど<strong>桁上げ伝搬遅延時間（キャリー伝搬時間）が増大し、高速動作できない</strong>。
          </div>
        `
      },
      {
        title: '3. 桁上げ先見加算器（CLA: Carry Look-Ahead Adder）',
        badge: '超重要・過去問',
        html: `
          <div class="callout callout-why">
            <div class="callout-title">CLAの考え方</div>
            各桁で「桁上がりを<strong>新しく生み出すか（生成 G）</strong>」「下位からの桁上がりを<strong>素通りさせるか（伝搬 P）</strong>」を先に全桁同時に計算し、前段キャリー <span class="formula">C<sub>0</sub>, C<sub>1</sub>, …</span> の確定を待たずに各桁のキャリーを<strong>並列一括計算</strong>する！
          </div>
          <div class="formula-block">
            <strong>生成（Generate）：</strong> G<sub>i</sub> = A<sub>i</sub> · B<sub>i</sub>　（A<sub>i</sub>=B<sub>i</sub>=1 なら下位に関係なくキャリー発生）<br>
            <strong>伝搬（Propagate）：</strong> P<sub>i</sub> = A<sub>i</sub> ⊕ B<sub>i</sub>　（A<sub>i</sub>≠B<sub>i</sub> なら下位キャリーを上位へ伝搬）<br>
            <strong>漸化式：</strong> C<sub>i</sub> = C<sub>i-1</sub> · P<sub>i</sub> + G<sub>i</sub>
          </div>
          <h3>各桁のキャリー展開（代入して前段キャリーを消す！）</h3>
          <div class="formula-block">
            C<sub>0</sub> = C<sup>-</sup>P<sub>0</sub> + G<sub>0</sub><br>
            C<sub>1</sub> = C<sub>0</sub>P<sub>1</sub> + G<sub>1</sub> = C<sup>-</sup>P<sub>0</sub>P<sub>1</sub> + G<sub>0</sub>P<sub>1</sub> + G<sub>1</sub><br>
            C<sub>2</sub> = C<sub>1</sub>P<sub>2</sub> + G<sub>2</sub> = C<sup>-</sup>P<sub>0</sub>P<sub>1</sub>P<sub>2</sub> + G<sub>0</sub>P<sub>1</sub>P<sub>2</sub> + G<sub>1</sub>P<sub>2</sub> + G<sub>2</sub><br>
            C<sub>3</sub> = C<sup>-</sup>P<sub>0</sub>P<sub>1</sub>P<sub>2</sub>P<sub>3</sub> + G<sub>0</sub>P<sub>1</sub>P<sub>2</sub>P<sub>3</sub> + G<sub>1</sub>P<sub>2</sub>P<sub>3</sub> + G<sub>2</sub>P<sub>3</sub> + G<sub>3</sub><br>
            <strong>各ビットの和：</strong> S<sub>k</sub> = C<sub>k-1</sub> ⊕ (A<sub>k</sub> ⊕ B<sub>k</sub>) = C<sub>k-1</sub> ⊕ P<sub>k</sub>　（S<sub>0</sub> = C<sup>-</sup> ⊕ P<sub>0</sub>）
          </div>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.claBlock()}<div class="diagram-caption">桁上げ先見加算器（CLA）のブロック構成</div></div>
        `
      },
      {
        title: '4. オーバーフロー検出器（符号付き2の補数加算）',
        badge: '超重要',
        html: `
          <p><strong>オーバーフロー</strong>は「桁上がり（キャリー）」とは別物です。符号付き数（4ビットなら <strong>-8 〜 +7</strong>）の演算結果が表現範囲を超えたときに発生します。</p>
          <div class="callout callout-exam">
            <div class="callout-title">オーバーフローの判定条件</div>
            符号ビット（bit 3）からの桁上がり <strong>C<sub>3</sub></strong> と、数値部の最上位桁（MSB: bit 2）からの桁上がり <strong>C<sub>2</sub></strong> が<strong>異なるとき</strong>にオーバーフロー！<br>
            論理式：<strong><span class="formula">V = C<sub>3</sub> ⊕ C<sub>2</sub></span></strong>（XORゲート1個で検出可能！）
          </div>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>計算例（4bit 2の補数）</th><th>2進計算</th><th>C<sub>3</sub>（符号）</th><th>C<sub>2</sub>（MSB）</th><th>V = C<sub>3</sub>⊕C<sub>2</sub></th><th>判定</th></tr></thead>
            <tbody>
              <tr><td>(+5) + (+1) = +6</td><td class="mono-cell">0101 + 0001 = 0110</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td>正常</td></tr>
              <tr><td>(+5) + (+4) = -7 !</td><td class="mono-cell">0101 + 0100 = 1001</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1">1</td><td style="color:var(--danger);font-weight:700">オーバーフロー</td></tr>
              <tr><td>(-3) + (-2) = -5</td><td class="mono-cell">1101 + 1110 = (1)1011</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td>正常（キャリーはあるが正常!）</td></tr>
              <tr><td>(-5) + (-4) = +7 !</td><td class="mono-cell">1011 + 1100 = (1)0111</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td style="color:var(--danger);font-weight:700">オーバーフロー</td></tr>
            </tbody>
          </table></div>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.overflowDetector()}<div class="diagram-caption">オーバーフロー検出器の構成</div></div>
        `
      },
      {
        title: '5. 減算器（1の補数器と4ビット加減算器）',
        badge: '重要',
        html: `
          <p>減算 <span class="formula">A - B</span> は、2の補数加算 <strong><span class="formula">A + ${ov('B')} + 1</span></strong> で計算できます。</p>
          <ul>
            <li>制御信号 <strong>C = 1（加算）</strong>のとき：<span class="formula">B' = B</span>、最下位キャリー <span class="formula">C<sup>-</sup> = 0</span> → <span class="formula">A + B</span></li>
            <li>制御信号 <strong>C = 0（減算）</strong>のとき：<span class="formula">B' = ${ov('B')}</span>（1の補数）、最下位キャリー <span class="formula">C<sup>-</sup> = 1</span> → <span class="formula">A + ${ov('B')} + 1 = A - B</span></li>
          </ul>
          <div class="formula-block">1の補数器の論理式：B'<sub>i</sub> = B<sub>i</sub> ⊕ ${ov('C')}　（かつ C<sup>-</sup> = ${ov('C')}）</div>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.adderSubtractor4()}<div class="diagram-caption">4ビット加減算器の回路構成</div></div>
        `
      },
      {
        title: '6. 1ビット比較器と多ビット比較器（2ビット・3ビット）',
        badge: '超重要・過去問',
        html: `
          <h3>1ビット比較器（例題4.7）</h3>
          <div class="formula-block">
            Z<sub>0</sub> (A &gt; B) = A${ov('B')}　　Z<sub>1</sub> (A = B) = ${ov('A')}${ov('B')} + AB = ${ov('A ⊕ B')}　　Z<sub>2</sub> (A &lt; B) = ${ov('A')}B
          </div>
          <h3>2ビット比較器（例題4.8・過去問 問2）</h3>
          <p><strong>設計の考え方：</strong>上位ビット（A<sub>1</sub>, B<sub>1</sub>）が異なれば即座に大小が確定し、<strong>上位が等しい（Z<sub>11</sub> = 1）ときだけ下位ビット（A<sub>0</sub>, B<sub>0</sub>）の比較結果を採用する</strong>。</p>
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
          <div class="formula-block">
            <strong>2ビット比較器：</strong><br>
            Z<sub>0</sub> = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub>　　Z<sub>1</sub> = Z<sub>11</sub>Z<sub>01</sub>　　Z<sub>2</sub> = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub><br>
            <strong>3ビット比較器（課題2）：</strong><br>
            Z<sub>0</sub> = Z<sub>20</sub> + Z<sub>21</sub>Z<sub>10</sub> + Z<sub>21</sub>Z<sub>11</sub>Z<sub>00</sub>　　Z<sub>1</sub> = Z<sub>21</sub>Z<sub>11</sub>Z<sub>01</sub>　　Z<sub>2</sub> = Z<sub>22</sub> + Z<sub>21</sub>Z<sub>12</sub> + Z<sub>21</sub>Z<sub>11</sub>Z<sub>02</sub>
          </div>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.comparator2()}<div class="diagram-caption">1ビット比較器を2個用いた2ビット比較器の回路図</div></div>
        `
      }
    ]
  },

  /* ===================== UNIT 3 ===================== */
  {
    id: 'unit-3',
    code: '4.6',
    title: 'エンコーダ・デコーダ・符号変換回路',
    pages: '教科書 p.84〜89 / 第4回講義',
    summary: '情報を2進符号に変換するエンコーダ、復号するデコーダ、同時入力を解決するプライオリティエンコーダ、BCDデコーダとグレイ符号変換を整理。',
    checkpoints: [
      { id: 'u3-c1', text: 'エンコーダとデコーダの役割の違いを説明できる' },
      { id: 'u3-c2', text: '通常のエンコーダの問題点と、プライオリティエンコーダが必要な理由を説明できる' },
      { id: 'u3-c3', text: '8入力3出力プライオリティエンコーダの ĒĪ と GS の役割と論理式を理解している' },
      { id: 'u3-c4', text: '2ビットデコーダ・BCD-10進デコーダ（ドントケア活用）の論理式を導ける' },
      { id: 'u3-c5', text: '2進-グレイ符号変換回路の真理値表・論理式・XOR回路図を書ける' }
    ],
    sections: [
      {
        title: '1. 2ビットエンコーダとプライオリティエンコーダ',
        badge: '記述頻出',
        html: `
          <p><strong>エンコーダ（符号器）</strong>は2<sup>n</sup>本の入力線のうち1つをnビットの2進符号に変換します。4入力2出力（2ビット）エンコーダでは：</p>
          <div class="formula-block">通常2ビットエンコーダ：Z<sub>0</sub> = I<sub>1</sub> + I<sub>3</sub>　　Z<sub>1</sub> = I<sub>2</sub> + I<sub>3</sub></div>
          <div class="callout callout-trap">
            <div class="callout-title">なぜプライオリティエンコーダが必要か？</div>
            通常のエンコーダでは、例えば <strong>I<sub>1</sub> と I<sub>2</sub> が同時に 1</strong> になると <span class="formula">Z<sub>1</sub>=1, Z<sub>0</sub>=1</span> となり、<strong>入力されていない I<sub>3</sub> の符号が出力されて誤動作する</strong>。そこで入力に優先順位（例：I<sub>3</sub> &gt; I<sub>2</sub> &gt; I<sub>1</sub> &gt; I<sub>0</sub>）をつけ、最上位の優先入力だけを符号化するのが<strong>プライオリティエンコーダ</strong>。
          </div>
          <h3>2ビットプライオリティエンコーダ（I<sub>3</sub> &gt; I<sub>2</sub> &gt; I<sub>1</sub> &gt; I<sub>0</sub>）</h3>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>I<sub>3</sub></th><th>I<sub>2</sub></th><th>I<sub>1</sub></th><th>I<sub>0</sub></th><th class="col-sep">Z<sub>1</sub></th><th>Z<sub>0</sub></th></tr></thead>
            <tbody>
              <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td></tr>
              <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td></tr>
              <tr><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td></tr>
              <tr><td class="mono-cell hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
            </tbody>
          </table></div>
          <div class="formula-block">Z<sub>1</sub> = I<sub>2</sub> + I<sub>3</sub>　　Z<sub>0</sub> = ${ov('I<sub>2</sub>')}I<sub>1</sub> + I<sub>3</sub>　（I<sub>1</sub>とI<sub>2</sub>が同時1なら Z<sub>1</sub>=1, Z<sub>0</sub>=0 で I<sub>2</sub> を正しく出力！）</div>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.priorityEncoder2()}<div class="diagram-caption">2ビットプライオリティエンコーダの回路図</div></div>
        `
      },
      {
        title: '2. 8入力3出力プライオリティエンコーダ（例題4.10）',
        badge: '重要',
        html: `
          <ul>
            <li><strong>${ov('EI')}（Enable Input）</strong>：制御入力（負論理：0で有効、1で無効）。式では有効時に1となる <span class="formula">EI</span> を全体に掛ける。</li>
            <li><strong>GS（Gate Selection）</strong>：<span class="formula">Z<sub>2</sub>=Z<sub>1</sub>=Z<sub>0</sub>=0</span> のとき「何も入力がない（GS=0）」のか「I<sub>0</sub>が入力された（GS=1）」のかを区別する出力。</li>
          </ul>
          <p>公式 <span class="formula">A + ${ov('A')}B = A + B</span> を繰り返し使って簡単化すると：</p>
          <div class="formula-block">
            Z<sub>2</sub> = (I<sub>7</sub> + I<sub>6</sub> + I<sub>5</sub> + I<sub>4</sub>) · EI<br>
            Z<sub>1</sub> = (I<sub>7</sub> + I<sub>6</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>5</sub>')}${ov('I<sub>4</sub>')}I<sub>2</sub>) · EI<br>
            Z<sub>0</sub> = (I<sub>7</sub> + ${ov('I<sub>6</sub>')}I<sub>5</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>4</sub>')}I<sub>3</sub> + ${ov('I<sub>6</sub>')}${ov('I<sub>4</sub>')}${ov('I<sub>2</sub>')}I<sub>1</sub>) · EI<br>
            GS = (I<sub>7</sub> + I<sub>6</sub> + I<sub>5</sub> + I<sub>4</sub> + I<sub>3</sub> + I<sub>2</sub> + I<sub>1</sub> + I<sub>0</sub>) · EI
          </div>
        `
      },
      {
        title: '3. デコーダとBCD-10進デコーダ（例題4.11・4.12）',
        badge: '重要',
        html: `
          <p><strong>デコーダ（復号器・解読器）</strong>は nビットの2進符号から対応する1本の出力線だけを1（アクティブ）にします。</p>
          <div class="formula-block">
            <strong>2ビットデコーダ（2→4）：</strong><br>
            Z<sub>0</sub> = ${ov('B')}${ov('A')},　Z<sub>1</sub> = ${ov('B')}A,　Z<sub>2</sub> = B${ov('A')},　Z<sub>3</sub> = BA
          </div>
          <h3>BCD-10進デコーダ（入力 D,C,B,A → 出力 Z<sub>0</sub>〜Z<sub>9</sub>）</h3>
          <p>BCDは0〜9（0000〜1001）のみを使い、<strong>10〜15（1010〜1111）はドントケア（×）</strong>としてカルノー図で簡単化できるため、ゲート入力数を大幅に減らせます。</p>
          <div class="formula-block">
            Z<sub>0</sub> = ${ov('D')}${ov('C')}${ov('B')}${ov('A')}　　Z<sub>1</sub> = ${ov('D')}${ov('C')}${ov('B')}A　　Z<sub>2</sub> = ${ov('C')}B${ov('A')}　　Z<sub>3</sub> = ${ov('C')}BA<br>
            Z<sub>4</sub> = C${ov('B')}${ov('A')}　　Z<sub>5</sub> = C${ov('B')}A　　Z<sub>6</sub> = CB${ov('A')}　　Z<sub>7</sub> = CBA<br>
            Z<sub>8</sub> = D${ov('A')}　　Z<sub>9</sub> = DA
          </div>
        `
      },
      {
        title: '4. 2進-グレイ符号変換回路（例題4.13・過去問 問4）',
        badge: '超重要・過去問',
        html: `
          <p><strong>グレイ符号（交番2進符号）</strong>は、隣り合う数値間で変化するビットが常に<strong>1ビットだけ</strong>になる符号です（ロータリーエンコーダ等の読み取り誤差防止に活用）。</p>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>10進</th><th>C</th><th>B</th><th>A</th><th class="col-sep">G<sub>2</sub></th><th>G<sub>1</sub></th><th>G<sub>0</sub></th></tr></thead>
            <tbody>
              <tr><td>0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
              <tr><td>1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td></tr>
              <tr><td>2</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
              <tr><td>3</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
              <tr><td>4</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td></tr>
              <tr><td>5</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1">1</td></tr>
              <tr><td>6</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td></tr>
              <tr><td>7</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            </tbody>
          </table></div>
          <div class="formula-block">
            G<sub>2</sub> = C　　G<sub>1</sub> = C ⊕ B = ${ov('C')}B + C${ov('B')}　　G<sub>0</sub> = B ⊕ A = ${ov('B')}A + B${ov('A')}<br>
            ※4ビット（D,C,B,A）なら G<sub>3</sub>=D, G<sub>2</sub>=D⊕C, G<sub>1</sub>=C⊕B, G<sub>0</sub>=B⊕A
          </div>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.grayConverter3()}<div class="diagram-caption">3ビット 2進-グレイ符号変換回路</div></div>
        `
      }
    ]
  },

  /* ===================== UNIT 4 ===================== */
  {
    id: 'unit-4',
    code: '4.7',
    title: 'マルチプレクサ・デマルチプレクサ',
    pages: '教科書 p.89〜92 / 第5回講義',
    summary: '制御信号（セレクト・イネーブル）によってデータの流れを切り替えるMUX/DEMUX。小規模MUXの組合せやデコーダを使った構成法を整理。',
    checkpoints: [
      { id: 'u4-c1', text: 'マルチプレクサ（データセレクタ）とデマルチプレクサの機能を説明できる' },
      { id: 'u4-c2', text: 'イネーブル端子（ĒĪ）付き 1ビット4ch MUX の真理値表と論理式を書ける' },
      { id: 'u4-c3', text: '1ビット2ch MUX を3個組み合わせて 1ビット4ch MUX を構成できる' },
      { id: 'u4-c4', text: '多ビットMUX（4bit 2ch）および DEMUX（1bit 4ch / 2bit 4ch）の論理式を書ける' },
      { id: 'u4-c5', text: 'デコーダを利用してマルチプレクサを構成する仕組みを説明できる' }
    ],
    sections: [
      {
        title: '1. マルチプレクサ（MUX）の動作と論理式',
        badge: '超重要・過去問',
        html: `
          <p><strong>マルチプレクサ（多重化装置 / データセレクタ）</strong>は、複数入力チャネルの中から<strong>セレクト信号</strong>で指定した1つを選択して出力します。<strong>イネーブル入力 ${ov('EI')}</strong>（負論理：0でON、1でOFF）は、入力が安定するまで出力を止めたり、IC拡張に使います。</p>
          <h3>1ビット4チャネルMUX（例題4.14・過去問 問5）</h3>
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
          <div class="formula-block">
            <strong>1bit 2ch MUX：</strong> Z = B·S + A·${ov('S')}<br>
            <strong>1bit 4ch MUX：</strong> Z = (A${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')} + B${ov('S<sub>1</sub>')}S<sub>0</sub> + CS<sub>1</sub>${ov('S<sub>0</sub>')} + DS<sub>1</sub>S<sub>0</sub>) · EI<br>
            <strong>4bit 2ch MUX（例題4.15）：</strong> Z<sub>i</sub> = (A<sub>i</sub>·S + B<sub>i</sub>·${ov('S')}) · EI　（i = 0,1,2,3）
          </div>
        `
      },
      {
        title: '2. 2ch MUXの組合せによる4ch MUX と デコーダ利用構成',
        badge: '過去問頻出',
        html: `
          <p>小さな1ビット2チャネルMUXを<strong>3個（2段のトーナメント型）</strong>組み合わせると、1ビット4チャネルMUXを構成できます。1段目で下位ビット <strong>S<sub>0</sub></strong>（A/B と C/D の選択）、2段目で上位ビット <strong>S<sub>1</sub></strong> を割り当てるのがポイント！</p>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.mux4From2()}<div class="diagram-caption">1ビット2ch MUX×3 による 1ビット4ch MUX（過去問 問5(2)）</div></div>
          <div class="callout callout-why">
            <div class="callout-title">デコーダを利用したMUX構成</div>
            セレクト信号 S<sub>1</sub>, S<sub>0</sub> を<strong>2ビットデコーダ</strong>に入れると、選ばれた1本の出力 <span class="formula">D<sub>0</sub>〜D<sub>3</sub></span> だけが 1 になる。各入力 A〜D と AND をとって OR でまとめれば：<br>
            <span class="formula">Z = D<sub>0</sub>A + D<sub>1</sub>B + D<sub>2</sub>C + D<sub>3</sub>D</span>　として簡単にMUXが作れる！
          </div>
        `
      },
      {
        title: '3. デマルチプレクサ（DEMUX）',
        badge: '重要',
        html: `
          <p><strong>デマルチプレクサ</strong>は、1つの入力データ D をセレクト信号で選んだ複数の出力チャネルの1つへ振り分けます（通信ではMUXと対で「多重化／多重分離」に利用）。</p>
          <div class="formula-block">
            <strong>1bit 4ch DEMUX：</strong><br>
            Z<sub>0</sub> = D·${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}·EI,　Z<sub>1</sub> = D·${ov('S<sub>1</sub>')}S<sub>0</sub>·EI,　Z<sub>2</sub> = D·S<sub>1</sub>${ov('S<sub>0</sub>')}·EI,　Z<sub>3</sub> = D·S<sub>1</sub>S<sub>0</sub>·EI<br>
            <strong>2bit 4ch DEMUX（例題4.16）：</strong> 各ビット i=0,1 について Z<sub>ki</sub> = D<sub>i</sub> · (セレクト条件) · EI<br>
            <strong>4bit 2ch DEMUX（第5回課題）：</strong> Z<sub>0i</sub> = D<sub>i</sub>·${ov('S')}·EI,　Z<sub>1i</sub> = D<sub>i</sub>·S·EI　（i=0..3）
          </div>
        `
      }
    ]
  },

  /* ===================== UNIT 5 ===================== */
  {
    id: 'unit-5',
    code: '5.1-4',
    title: '順序回路・フリップフロップ・入力方程式',
    pages: '教科書 p.94〜95, 98〜110 / 第6回講義',
    summary: '組合せ回路と順序回路の違い、4種類のFF（SR/JK/T/D）の特性方程式・励起表、応用方程式からの入力方程式導出とFF変換設計を完全整理。',
    checkpoints: [
      { id: 'u5-c1', text: '組合せ回路と順序回路の違い、および順序回路の基本構成を説明できる' },
      { id: 'u5-c2', text: 'SR, JK, T, D の4種類のFFの特性表・特性方程式を暗記し使える' },
      { id: 'u5-c3', text: 'JK-FFの発振（レーシング）の原因と、エッジトリガ型・マスタースレーブ型の対策を説明できる' },
      { id: 'u5-c4', text: '応用方程式 Q⁺ = g1Q + g2Q̄ と励起表から、各種FFの入力方程式をカルノー図で導出できる' },
      { id: 'u5-c5', text: 'あるFFを使って別のFFを設計できる（例：SR→T, SR→JK, JK→T, D→T）' }
    ],
    sections: [
      {
        title: '1. 順序回路とは？（組合せ回路との違い）',
        badge: '記述頻出',
        html: `
          <p><strong>組合せ回路</strong>は現在の入力だけで出力が決まりますが、<strong>順序回路</strong>は「現在の入力」と「<strong>記憶素子（FF）が保持している現在の状態 Q</strong>」の両方によって、次の状態 Q<sup>+</sup> と出力 Z が決まります（プログラムカウンタ、レジスタ等）。</p>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.seqBlock()}<div class="diagram-caption">順序回路の基本構成（組合せ論理回路＋記憶素子フィードバック）</div></div>
        `
      },
      {
        title: '2. 4種類のフリップフロップ一覧（特性方程式・励起表）',
        badge: '暗記必須',
        html: `
          <div class="table-wrap"><table class="logic-table">
            <thead>
              <tr><th>FFの種類</th><th>特性方程式（Q<sup>+</sup>）</th><th>主な動作</th><th>注意点・特徴</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>SR-FF</strong></td><td class="mono-cell">Q<sup>+</sup> = S + ${ov('R')}Q　(SR=0)</td><td class="left">00:保持 / 01:リセット / 10:セット / 11:禁止</td><td class="left">S=R=1 が禁止入力。NAND/NORラッチで構成可</td></tr>
              <tr><td><strong>JK-FF</strong></td><td class="mono-cell">Q<sup>+</sup> = ${ov('K')}Q + J${ov('Q')}</td><td class="left">00:保持 / 01:リセット / 10:セット / 11:反転</td><td class="left">禁止なし！J=K=1で反転（長いCpでは発振→エッジトリガ/MS型で防止）</td></tr>
              <tr><td><strong>T-FF</strong></td><td class="mono-cell">Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')} = T ⊕ Q</td><td class="left">0:保持 / 1:反転</td><td class="left">カウンタ・分周器の基本素子</td></tr>
              <tr><td><strong>D-FF</strong></td><td class="mono-cell">Q<sup>+</sup> = D</td><td class="left">0:0を記憶 / 1:1を記憶</td><td class="left">1クロック遅延・レジスタの基本素子</td></tr>
            </tbody>
          </table></div>

          <h3>4種FFの励起表（状態遷移 Q → Q<sup>+</sup> を起こすために必要な入力）</h3>
          <div class="table-wrap"><table class="logic-table">
            <thead>
              <tr><th>Q</th><th>Q<sup>+</sup></th><th class="col-sep">S</th><th>R</th><th class="col-sep">J</th><th>K</th><th class="col-sep">T</th><th class="col-sep">D</th></tr>
            </thead>
            <tbody>
              <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td></tr>
              <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td></tr>
              <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep">0</td></tr>
              <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep hi-1">1</td></tr>
            </tbody>
          </table></div>

          <div class="callout callout-why">
            <div class="callout-title">JK-FFの発振防止：エッジトリガ型 vs マスタースレーブ型</div>
            SRラッチで組んだ単純なJK-FFでは、Cp=1 かつ J=K=1 のとき出力が反転し続けて<strong>発振</strong>する。<br>
            <strong>① エッジトリガ型</strong>：クロックの立ち上がり（ポジティブエッジ）または立ち下がり（ネガティブエッジ）の極短いパルス幅だけで動作させる。<br>
            <strong>② マスタースレーブ型</strong>：2個のFF（マスター＋スレーブ）を縦続し、Cp=1でマスターに取り込み、Cp=0（アクティブ終了後）にスレーブへ移すことで発振を防ぐ。
          </div>
        `
      },
      {
        title: '3. 応用方程式と入力方程式の導出（過去問 問6）',
        badge: '超重要・過去問',
        html: `
          <p>任意の順序回路の次の状態 Q<sup>+</sup> は、現在の状態 Q, ${ov('Q')} を用いた一般形（<strong>応用方程式</strong>）で表せます。</p>
          <div class="formula-block">
            <strong>応用方程式：</strong> Q<sup>+</sup> = g<sub>1</sub>·Q + g<sub>2</sub>·${ov('Q')}
          </div>
          <p>真理値表（g<sub>1</sub>, g<sub>2</sub>, Q の8通り）で Q<sup>+</sup> を求め、各FFの励起表を使って入力欄を埋め、カルノー図で簡単化すると、以下の<strong>入力方程式</strong>が得られます。</p>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>使用するFF</th><th>入力方程式（必ず導出＆暗記！）</th></tr></thead>
            <tbody>
              <tr><td><strong>SR-FF</strong></td><td class="mono-cell">S = g<sub>2</sub>·${ov('Q')},　　R = ${ov('g<sub>1</sub>')}·Q</td></tr>
              <tr><td><strong>JK-FF</strong></td><td class="mono-cell hi-1">J = g<sub>2</sub>,　　K = ${ov('g<sub>1</sub>')}</td></tr>
              <tr><td><strong>T-FF</strong></td><td class="mono-cell">T = ${ov('g<sub>1</sub>')}·Q + g<sub>2</sub>·${ov('Q')}</td></tr>
              <tr><td><strong>D-FF</strong></td><td class="mono-cell">D = g<sub>1</sub>·Q + g<sub>2</sub>·${ov('Q')}</td></tr>
            </tbody>
          </table></div>
        `
      },
      {
        title: '4. 順序回路（FF変換）の設計手順（例題5.6〜5.8・演習5.4〜5.6）',
        badge: '超重要',
        html: `
          <ol>
            <li>作りたい回路（例：T-FF）の<strong>特性方程式</strong>を書く：<span class="formula">Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')}</span></li>
            <li>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> と係数比較して <strong>g<sub>1</sub>, g<sub>2</sub></strong> を読み取る（例：<span class="formula">g<sub>1</sub> = ${ov('T')}, g<sub>2</sub> = T</span>）。</li>
            <li>使うFFの<strong>入力方程式</strong>に g<sub>1</sub>, g<sub>2</sub> を代入して回路を描く！</li>
          </ol>
          <div class="table-wrap"><table class="logic-table">
            <thead><tr><th>設計問題</th><th>g<sub>1</sub>, g<sub>2</sub></th><th>入力方程式の結果</th></tr></thead>
            <tbody>
              <tr><td>SR-FF → T-FF（例題5.6）</td><td class="mono-cell">g<sub>1</sub>=${ov('T')}, g<sub>2</sub>=T</td><td class="mono-cell">S = T${ov('Q')},　R = TQ</td></tr>
              <tr><td>SR-FF → JK-FF（例題5.7）</td><td class="mono-cell">g<sub>1</sub>=${ov('K')}, g<sub>2</sub>=J</td><td class="mono-cell">S = J${ov('Q')},　R = KQ</td></tr>
              <tr><td>JK-FF → T-FF（例題5.8）</td><td class="mono-cell">g<sub>1</sub>=${ov('T')}, g<sub>2</sub>=T</td><td class="mono-cell">J = T,　K = T（実用では J=K=1, TをCpへ）</td></tr>
              <tr><td>SR-FF → D-FF（演習5.4）</td><td class="mono-cell">g<sub>1</sub>=D, g<sub>2</sub>=D</td><td class="mono-cell">S = D${ov('Q')}, R = ${ov('D')}Q（簡単化で S=D, R=${ov('D')}）</td></tr>
              <tr><td>JK-FF → D-FF（演習5.5）</td><td class="mono-cell">g<sub>1</sub>=D, g<sub>2</sub>=D</td><td class="mono-cell">J = D,　K = ${ov('D')}</td></tr>
              <tr><td>D-FF → T-FF（演習5.6）</td><td class="mono-cell">g<sub>1</sub>=${ov('T')}, g<sub>2</sub>=T</td><td class="mono-cell">D = ${ov('T')}Q + T${ov('Q')} = T ⊕ Q</td></tr>
            </tbody>
          </table></div>
        `
      }
    ]
  },

  /* ===================== UNIT 6 ===================== */
  {
    id: 'unit-6',
    code: '第7回',
    title: 'FFの時間定数と非同期式カウンタ',
    pages: '第7回講義資料（タイミングチャート・時間定数・非同期カウンタ）',
    summary: 'セットアップ/ホールド/アクセスタイムとメタステーブル状態、クロック周期の要件、非同期式カウンタの動作・遅延原因・任意n進カウンタ設計。',
    checkpoints: [
      { id: 'u6-c1', text: 'セットアップタイム・ホールドタイム・アクセスタイムの定義を説明できる' },
      { id: 'u6-c2', text: 'セットアップ/ホールドタイム違反とメタステーブル状態を説明できる' },
      { id: 'u6-c3', text: 'ホールド条件 Thold ≦ Tacc⁻ とクロック周期条件 Tsetup + Tacc⁺ ≦ TCp を説明・計算できる' },
      { id: 'u6-c4', text: '非同期式2ⁿ進アップ/ダウン/アップダウンカウンタと分周回路の動作を説明できる' },
      { id: 'u6-c5', text: '非同期式カウンタの遅延原因と TCp > n·Tacc、fCp < 1/(n·Tacc) を説明できる' },
      { id: 'u6-c6', text: '任意のn進カウンタに必要なFF数と、非同期式7進カウンタの設計（単純リセットの欠点含む）を説明できる' }
    ],
    sections: [
      {
        title: '1. FFの時間定数・違反・メタステーブル状態',
        badge: '超重要・記述頻出',
        html: `
          <ul>
            <li><strong>セットアップタイム（T<sub>setup</sub>）</strong>：クロックエッジの<strong>前</strong>に入力信号を確定（安定）させておかなければならない時間。</li>
            <li><strong>ホールドタイム（T<sub>hold</sub>）</strong>：クロックエッジの<strong>後</strong>に入力信号を保持し続けなければならない時間。</li>
            <li><strong>アクセスタイム（T<sub>acc</sub>）</strong>：クロックエッジから出力 Q が確定するまでの時間（最小値 <span class="formula">T<sub>acc</sub><sup>-</sup></span>、最大値 <span class="formula">T<sub>acc</sub><sup>+</sup></span>）。</li>
          </ul>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.ffTiming()}<div class="diagram-caption">FFの時間定数とメタステーブル状態のタイミングチャート</div></div>
          <div class="callout callout-trap">
            <div class="callout-title">メタステーブル（Meta-stable）状態とは？</div>
            クロックエッジ前後の変化禁止期間（T<sub>setup</sub> や T<sub>hold</sub> の範囲内）に入力が変化してしまうと（<strong>セットアップタイム違反／ホールドタイム違反</strong>）、出力が 0 とも 1 とも定まらない不安定な中間状態（<strong>メタステーブル状態</strong>）が発生することがある。
          </div>
          <h3>正常動作するためのクロック周期とホールドの要件</h3>
          <p>例：D-FF の出力 ${ov('Q')} を D 入力に帰還した T-FF（またはFF間の信号伝搬）では：</p>
          <div class="formula-block">
            <strong>ホールドタイム要件：</strong> T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup>　（早すぎる出力変化で自分のホールド時間を壊さない）<br>
            <strong>クロック周期要件：</strong> T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> ≦ T<sub>Cp</sub>　（最も遅い出力変化＋次のセットアップが1周期内に収まる）
          </div>
        `
      },
      {
        title: '2. 非同期式（リプル）カウンタと分周回路・遅延原因',
        badge: '超重要',
        html: `
          <p><strong>非同期式カウンタ（リプルカウンタ）</strong>は、T-FF（または J=K=1 の JK-FF）を直列に接続し、前段の出力を次段のクロックに入力するカウンタです。</p>
          <ul>
            <li><strong>アップカウンタ</strong>（負エッジトリガ）：前段の <strong>Q<sub>i</sub></strong> を次段クロックへ接続（Q<sub>i</sub> が 1→0 の立下りで次段が反転）。</li>
            <li><strong>ダウンカウンタ</strong>（負エッジトリガ）：前段の <strong>${ov('Q<sub>i</sub>')}</strong> を次段クロックへ接続。</li>
            <li><strong>アップダウンカウンタ</strong>：1bit 2ch MUX で次段クロック <span class="formula">Z = S·Q<sub>0</sub> + ${ov('S')}·${ov('Q<sub>0</sub>')} = ${ov('S ⊕ Q<sub>0</sub>')}</span> を切替（S=1でUp, S=0でDown）。</li>
            <li><strong>分周回路（Divider）</strong>：Q<sub>0</sub> は周期 2倍（周波数 1/2）、Q<sub>1</sub> は 4倍（1/4）、…、Q<sub>n-1</sub> は <strong>2<sup>n</sup> 倍（1/2<sup>n</sup>）</strong>の分周器として働く。</li>
          </ul>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.asyncCounter4()}<div class="diagram-caption">非同期式 2⁴進（4ビット）カウンタと遅延波及（4Tacc）</div></div>
          <div class="callout callout-exam">
            <div class="callout-title">非同期式カウンタの遅延原因と最大クロック周波数</div>
            前段FFが変化してから次段FFが動作する直列構造のため、<strong>各FFのアクセスタイム T<sub>acc</sub> が段数 n 倍に累積する</strong>。<br>
            クロックに合わせて信頼できる出力を得るための条件：<br>
            <strong><span class="formula">T<sub>Cp</sub> &gt; n · T<sub>acc</sub></span></strong>　⇔　<strong><span class="formula">f<sub>Cp</sub> = 1 / T<sub>Cp</sub> &lt; 1 / (n · T<sub>acc</sub>)</span></strong>
          </div>
        `
      },
      {
        title: '3. 任意 n 進カウンタと非同期式7進カウンタの設計',
        badge: '応用・重要',
        html: `
          <p><strong>必要なFFの個数：</strong> <span class="formula">2<sup>n-1</sup> + 1 〜 2<sup>n</sup></span> 進カウンタには <strong>n 個のFF</strong> が必要（例：5〜8進は3個、9〜16進は4個）。</p>
          <h3>非同期式7進カウンタ（000 → 001 → … → 110 → 000）</h3>
          <div class="callout callout-trap">
            <div class="callout-title">単純リセット方式（7＝111 でNANDから全FFのRDへ）の問題点</div>
            FFごとの応答速度に差があると一斉にリセットされず、応答の速いFF（例：FF2）が先に 1→0 になった瞬間に NAND 出力が 1（リセット解除）に戻ってしまい、遅れたFFがリセットされず誤動作する！
          </div>
          <p><strong>改善方式（7回目のクロックの立下りで直接 110 → 000 へ遷移させる）：</strong></p>
          <ol>
            <li>状態6（<span class="formula">Q<sub>2</sub>=1, Q<sub>1</sub>=1, Q<sub>0</sub>=0</span>）の次で Q<sub>0</sub> を 0 のまま保持したい → <span class="formula">Q<sub>1</sub>=Q<sub>2</sub>=1</span> のときだけ J<sub>0</sub>=0 にする：<strong><span class="formula">J<sub>0</sub> = ${ov('Q<sub>1</sub>Q<sub>2</sub>')}</span></strong></li>
            <li>状態6の次では Q<sub>0</sub> が 0→0 で立下らないため、そのままでは FF1 が反転しない → <span class="formula">Q<sub>1</sub>=Q<sub>2</sub>=1</span> のときだけクロック Cp を Cp<sub>1</sub> へ流し込む：<strong><span class="formula">Cp<sub>1</sub> = Q<sub>0</sub> + Q<sub>1</sub>Q<sub>2</sub>Cp</span></strong>（Q<sub>1</sub> が 1→0 に下がれば Q<sub>2</sub> も連鎖して 1→0 になり 000 へ戻る！）</li>
          </ol>
          <div class="diagram-box">${window.SwitchStudy.Diagrams.asyncMod7()}<div class="diagram-caption">非同期式7進カウンタ（改善方式）の構成</div></div>
        `
      }
    ]
  }
];
