/* =========================================================
   Critical Exam Focus Summary (重大出題フォーカス総まとめ)
   試験範囲：3.5 / 4.3〜4.7 / 5.1 / 5.3〜5.4 / FF時間定数・非同期カウンタ
   電卓持込不可・自力手計算完全対応
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

(() => {
  const ov = (s) => `<span class="ov">${s}</span>`;
  const D = window.SwitchStudy.Diagrams;

  window.SwitchStudy.ExamFocus = {
    meta: {
      title: '重大出題フォーカス総まとめ',
      subtitle: '試験範囲の「特に重要な事項」9テーマ＋FF時間定数を1ページに凝縮。各テーマごとに【なぜ必要か】【回路図・真理値表・論理式の対応】【自力演習問題（手計算解答付き）】をセットで確認できます。',
      rules: '通常定められた物品のみ（電卓持込不可）'
    },

    /* ---------- 回路設計の考え方（6つの柱） ---------- */
    designPrinciples: [
      {
        num: '01',
        title: '小さな回路の組合せで複雑な機能を実現する',
        desc: '半加算器→全加算器→4bit並列加算器、1bit比較器→多bit比較器、1bit 2ch MUX×3→4ch MUXのように、基本ブロックを階層的に組み合わせて大規模回路を作る。'
      },
      {
        num: '02',
        title: '機能だけでなく「速度（遅延）」も重要である',
        desc: '並列加算器は桁上げ伝搬遅延がビット数に比例して増大するため、桁上げ先見加算器（CLA）で並列計算して高速化する。非同期式カウンタも段数分の遅延 n·Tacc が速度上限を決める。'
      },
      {
        num: '03',
        title: '情報は符号化と復号化によって扱いやすくなる',
        desc: 'エンコーダで多数の入力線を少ないビット数の2進符号へ圧縮し、デコーダで元の1本へ展開する。グレイ符号変換により隣接値の遷移誤りも防げる。'
      },
      {
        num: '04',
        title: '制御信号によってデータの流れを切り替えられる',
        desc: 'セレクト信号（S）やイネーブル信号（ĒĪ）により、MUX（多入力→1出力）やDEMUX（1入力→多出力）、加減算器の加算/減算切替（S）を動的に制御できる。'
      },
      {
        num: '05',
        title: '記憶素子を利用することで状態を保持できる',
        desc: '組合せ回路だけでは過去の入力を覚えられないが、フリップフロップ（FF）と帰還ループを加えた順序回路にすることで「現在の状態 Q」を記憶・更新できる。'
      },
      {
        num: '06',
        title: '回路の動作には時間特性が影響する',
        desc: 'FFにはセットアップタイム・ホールドタイム・アクセスタイムがあり、違反するとメタステーブル状態を引き起こす。クロック周期 TCp は必ず時間要件を満たす必要がある。'
      }
    ],

    /* ---------- 電卓なし！手計算サバイバル早見表 ---------- */
    cheatSheetHtml: `
      <div class="grid-2">
        <div>
          <h4>1. 4種FF 特性方程式・励起表・入力方程式（必暗記）</h4>
          <div class="table-wrap"><table class="logic-table">
            <thead>
              <tr><th>FF</th><th>特性方程式 Q<sup>+</sup></th><th>入力方程式（Q<sup>+</sup>=g<sub>1</sub>Q+g<sub>2</sub>${ov('Q')}）</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>SR</strong></td><td class="mono-cell">S + ${ov('R')}Q (SR=0)</td><td class="mono-cell">S = g<sub>2</sub>${ov('Q')}, R = ${ov('g<sub>1</sub>')}Q</td></tr>
              <tr><td><strong>JK</strong></td><td class="mono-cell">${ov('K')}Q + J${ov('Q')}</td><td class="mono-cell hi-1">J = g<sub>2</sub>, K = ${ov('g<sub>1</sub>')}</td></tr>
              <tr><td><strong>T</strong></td><td class="mono-cell">${ov('T')}Q + T${ov('Q')} = T⊕Q</td><td class="mono-cell">T = ${ov('g<sub>1</sub>')}Q + g<sub>2</sub>${ov('Q')}</td></tr>
              <tr><td><strong>D</strong></td><td class="mono-cell">D</td><td class="mono-cell">D = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</td></tr>
            </tbody>
          </table></div>
        </div>
        <div>
          <h4>2. 電卓なしで絶対落とさない重要公式＆数値</h4>
          <div class="formula-block" style="margin-top:0;">
            <strong>4bit符号付き範囲：</strong> -8 (1000) 〜 +7 (0111)<br>
            <strong>オーバーフロー：</strong> V = C<sub>3</sub> ⊕ C<sub>2</sub><br>
            <strong>CLA：</strong> G<sub>i</sub>=A<sub>i</sub>B<sub>i</sub>, P<sub>i</sub>=A<sub>i</sub>⊕B<sub>i</sub>, C<sub>i</sub>=G<sub>i</sub>+P<sub>i</sub>C<sub>i-1</sub><br>
            <strong>FFホールド要件：</strong> T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup><br>
            <strong>FF周期要件：</strong> T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> ≦ T<sub>Cp</sub><br>
            <strong>非同期カウンタ：</strong> T<sub>Cp</sub> &gt; n·T<sub>acc</sub>, f<sub>Cp</sub> &lt; 1/(n·T<sub>acc</sub>)<br>
            <strong>周波数暗算：</strong> 1 / (10 ns) = 100 MHz, 1 / (20 ns) = 50 MHz, 1 / (40 ns) = 25 MHz, 1 / (50 ns) = 20 MHz
          </div>
        </div>
      </div>
    `,

    /* ---------- 10大・重大出題フォーカス ---------- */
    focuses: [
      /* ==================== FOCUS 01 ==================== */
      {
        id: 'focus-01',
        num: 'FOCUS 01',
        category: 'simplify',
        categoryLabel: '簡単化',
        sectionRef: '3.5 (p.61〜64)',
        title: 'クワイン・マクラスキー（Q-M）法による論理関数の簡単化',
        priority: '超頻出・過去問 問1',
        unitLink: '#unit-1',
        unitLabel: '単元 3.5',
        whyNeeded: 'カルノー図は4変数までしか視覚的に扱いにくいが、Q-M法は<strong>機械的・規則的な手順で簡単化できるためプログラム化（計算機処理）しやすく、5変数以上の多変数論理関数にも対応できる</strong>点が最大の利点。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>確実な手計算6ステップ</h4>
              <ol>
                <li><strong>加法標準形へ展開</strong>：欠けている変数に <span class="formula">(X+${ov('X')})</span> を掛け、重複を冪等則 <span class="formula">X+X=X</span> で消す。</li>
                <li><strong>肯定変数の個数でグループ分け</strong>（0個〜n個）。</li>
                <li><strong>隣接グループ間のみ比較</strong>：1変数だけ異なるペアを結合し、使われた項に <strong>✓</strong> を付ける。</li>
                <li>結合できなくなるまで繰り返し、<strong>✓ が付かなかった項＝主項</strong>をすべて拾う。</li>
                <li><strong>最小項・主項表</strong>を作成し、<strong>✓ が1つしかない行の主項（必須主項）</strong>を確定。</li>
                <li>必須主項で覆われた行を消し、残った行だけ最小個数の主項で覆う。</li>
              </ol>
            </div>
            <div>
              <div class="callout callout-trap" style="margin-top:0;">
                <div class="callout-title">過去問でも減点された最大の罠！</div>
                主項が3つ以上出たとき、<strong>必須主項だけで全最小項が覆えているのに、余計な主項まで足してしまうミス</strong>が非常に多い！<br>
                必ず主項表で「各最小項の行に ✓ が1つ以上あるか」を確認し、<strong>冗長な主項は絶対に消す</strong>こと。
              </div>
              <div class="formula-block">
                <strong>重要法則（展開・結合）：</strong><br>
                X + ${ov('X')} = 1（補元則）<br>
                XY + X${ov('Y')} = X（隣接項の結合）<br>
                X + X = X（冪等則・重複削除）
              </div>
            </div>
          </div>
        `,
        learningPoints: [
          { id: 'f1-lp1', text: '任意の論理式から加法標準形（最小項のOR）をミスなく求められる' },
          { id: 'f1-lp2', text: 'カルノー図と比較したQ-M法の利点（機械的・プログラム化・多変数）を記述できる' },
          { id: 'f1-lp3', text: '主項表から必須主項を選び、冗長主項を除外して最簡形を求められる' }
        ],
        problem: {
          id: 'fp-1',
          badge: '頻出典型（3変数・冗長主項トラップ）',
          title: '3変数論理関数の加法標準形とQ-M法による簡単化',
          question: `
            <p>論理関数 <span class="formula">Z = ${ov('A')}${ov('B')} + B${ov('C')} + A${ov('C')}</span> について、以下の問いに答えよ。</p>
            <ol>
              <li>Z の加法標準形を求めよ。</li>
              <li>クワイン・マクラスキー法（結合表＋最小項・主項表）を用いて Z を簡単化せよ。</li>
            </ol>
          `,
          hint: `<p>① 欠けている変数を補うと最小項は5個になります（${ov('A')}${ov('B')}${ov('C')}, ${ov('A')}${ov('B')}C, ${ov('A')}B${ov('C')}, A${ov('B')}${ov('C')}, AB${ov('C')}）。② 2回目の結合で <strong>${ov('C')}</strong>（1変数項）が生まれるのを見逃さないように！</p>`,
          answer: `
            <p><strong>1. 加法標準形（5個の最小項）：</strong></p>
            <div class="formula-block">
              Z = ${ov('A')}${ov('B')}(C+${ov('C')}) + (A+${ov('A')})B${ov('C')} + A(B+${ov('B')})${ov('C')}<br>
              &nbsp;&nbsp;= <strong>${ov('A')}${ov('B')}${ov('C')} + ${ov('A')}${ov('B')}C + ${ov('A')}B${ov('C')} + A${ov('B')}${ov('C')} + AB${ov('C')}</strong>
            </div>
            <p><strong>2. 結合表と主項表：</strong></p>
            <div class="grid-2">
              <div class="table-wrap"><table class="logic-table">
                <thead><tr><th>肯定数</th><th>最小項</th><th>1回目結合</th><th>2回目結合</th></tr></thead>
                <tbody>
                  <tr><td>0</td><td class="mono-cell">${ov('A')}${ov('B')}${ov('C')} ✓</td><td class="mono-cell hi-1"><strong>${ov('A')}${ov('B')}</strong>（主項）<br>${ov('A')}${ov('C')} ✓, ${ov('B')}${ov('C')} ✓</td><td class="mono-cell hi-1"><strong>${ov('C')}</strong>（主項）</td></tr>
                  <tr><td>1</td><td class="mono-cell">${ov('A')}${ov('B')}C ✓<br>${ov('A')}B${ov('C')} ✓<br>A${ov('B')}${ov('C')} ✓</td><td class="mono-cell">B${ov('C')} ✓<br>A${ov('C')} ✓</td><td class="mono-cell">—</td></tr>
                  <tr><td>2</td><td class="mono-cell">AB${ov('C')} ✓</td><td class="mono-cell">—</td><td class="mono-cell">—</td></tr>
                </tbody>
              </table></div>
              <div class="table-wrap"><table class="logic-table">
                <thead><tr><th>最小項 ＼ 主項</th><th>${ov('A')}${ov('B')} ★</th><th>${ov('C')} ★</th></tr></thead>
                <tbody>
                  <tr><td class="mono-cell">${ov('A')}${ov('B')}${ov('C')}</td><td>✓</td><td>✓</td></tr>
                  <tr><td class="mono-cell">${ov('A')}${ov('B')}C</td><td class="hi-ess">✓ (唯一)</td><td></td></tr>
                  <tr><td class="mono-cell">${ov('A')}B${ov('C')}</td><td></td><td class="hi-ess">✓ (唯一)</td></tr>
                  <tr><td class="mono-cell">A${ov('B')}${ov('C')}</td><td></td><td class="hi-ess">✓ (唯一)</td></tr>
                  <tr><td class="mono-cell">AB${ov('C')}</td><td></td><td class="hi-ess">✓ (唯一)</td></tr>
                </tbody>
              </table></div>
            </div>
            <div class="formula-block"><strong>解答： Z = ${ov('A')}${ov('B')} + ${ov('C')}</strong></div>
            <p style="font-size:13px;"><a href="#trainers">→ Q-M法ソルバーで他の問題も検算する</a> ／ <a href="#textbook">→ 教科書 例題3.8・演習3.7へ</a></p>
          `
        }
      },

      /* ==================== FOCUS 02 ==================== */
      {
        id: 'focus-02',
        num: 'FOCUS 02',
        category: 'simplify',
        categoryLabel: '簡単化',
        sectionRef: '3.5 (p.65〜66)',
        title: 'ドントケア項を利用したQ-M法の簡単化',
        priority: '必出・第1回課題',
        unitLink: '#unit-1',
        unitLabel: '単元 3.5',
        whyNeeded: 'BCD符号の10〜15のように<strong>実際には起こり得ない入力組合せ（出力が0でも1でもよい＝ドントケア ×）</strong>を「都合よく1とみなす」ことで、より大きな結合を作り、<strong>回路のゲート数・リテラル数をさらに削減できる</strong>。',
        keyPointsHtml: `
          <div class="callout callout-exam" style="margin-top:0;">
            <div class="callout-title">鉄則：「結合するときは混ぜる、主項表では外す！」</div>
            <ol style="margin:4px 0 0;">
              <li><strong>Step 1（展開）</strong>：元の関数とドントケア項をそれぞれ加法標準形に展開する（元の項とDC項が区別できるよう印を付ける）。</li>
              <li><strong>Step 2（結合表）</strong>：元の最小項と<strong>ドントケア項を一緒に混ぜて</strong>グループ分け・隣接結合を行い、主項をすべて求める。</li>
              <li><strong>Step 3（主項表）</strong>：縦軸（行）には<strong>元の関数の最小項だけ</strong>を並べる（<strong>ドントケア項は絶対に並べない！</strong>）。</li>
            </ol>
          </div>
          <p style="font-size:13.5px;color:var(--ink-secondary);">※ もし主項表にドントケア項を残してしまうと、本来覆う必要のない行を覆うために余計な主項を選んでしまい不正解になります。</p>
        `,
        learningPoints: [
          { id: 'f2-lp1', text: 'ドントケア項の意味（発生しない入力・出力任意）と利用する理由を説明できる' },
          { id: 'f2-lp2', text: '結合表ではDCを含め、主項表ではDCを除外して最簡形を求められる' }
        ],
        problem: {
          id: 'fp-2',
          badge: '教科書 例題3.7 同型（4変数DC）',
          title: 'ドントケア項を含む4変数関数のQ-M法簡単化',
          question: `
            <p>論理関数 <span class="formula">Z = ${ov('A')}${ov('B')}CD + ${ov('A')}B${ov('C')}D + ${ov('A')}BCD + A${ov('B')}CD</span> をQ-M法で簡単化せよ。ただし、ドントケア項を <span class="formula">A${ov('B')}${ov('C')}D, AB${ov('C')}D, ABCD</span> とする。</p>
          `,
          hint: `<p>元の最小項4個＋DC3個＝計7個。すべて D=1 を含んでいることに注目！肯定数2（${ov('A')}${ov('B')}CD, ${ov('A')}B${ov('C')}D, A${ov('B')}${ov('C')}D(DC)）、肯定数3（${ov('A')}BCD, A${ov('B')}CD, AB${ov('C')}D(DC)）、肯定数4（ABCD(DC)）で結合します。</p>`,
          answer: `
            <p><strong>Step 1 & 2：DCを含めて結合する（計7個）</strong></p>
            <div class="table-wrap"><table class="logic-table">
              <thead><tr><th>肯定数</th><th>最小項（DC含む）</th><th>1回目結合</th><th>2回目結合（主項）</th></tr></thead>
              <tbody>
                <tr><td>2</td><td class="mono-cell">${ov('A')}${ov('B')}CD ✓<br>${ov('A')}B${ov('C')}D ✓<br>A${ov('B')}${ov('C')}D(DC) ✓</td><td class="mono-cell">${ov('A')}CD ✓, ${ov('B')}CD ✓<br>${ov('A')}BD ✓, B${ov('C')}D ✓<br>A${ov('C')}D ✓</td><td class="mono-cell hi-1"><strong>CD</strong>（主項）<br><strong>BD</strong>（主項）<br><strong>AD</strong>（主項・DCのみ結合）</td></tr>
                <tr><td>3</td><td class="mono-cell">${ov('A')}BCD ✓<br>A${ov('B')}CD ✓<br>AB${ov('C')}D(DC) ✓</td><td class="mono-cell">BCD ✓<br>ACD ✓<br>ABD ✓</td><td class="mono-cell">—</td></tr>
                <tr><td>4</td><td class="mono-cell">ABCD(DC) ✓</td><td class="mono-cell">—</td><td class="mono-cell">—</td></tr>
              </tbody>
            </table></div>
            <p><strong>Step 3：主項表（元の最小項4個のみ並べる！）</strong></p>
            <div class="table-wrap"><table class="logic-table">
              <thead><tr><th>元の最小項 ＼ 主項</th><th>CD ★必須</th><th>BD ★必須</th><th>AD（不要）</th></tr></thead>
              <tbody>
                <tr><td class="mono-cell">${ov('A')}${ov('B')}CD</td><td class="hi-ess">✓ (唯一)</td><td></td><td></td></tr>
                <tr><td class="mono-cell">${ov('A')}B${ov('C')}D</td><td></td><td class="hi-ess">✓ (唯一)</td><td></td></tr>
                <tr><td class="mono-cell">${ov('A')}BCD</td><td>✓</td><td>✓</td><td></td></tr>
                <tr><td class="mono-cell">A${ov('B')}CD</td><td>✓</td><td></td><td>✓</td></tr>
              </tbody>
            </table></div>
            <p>必須主項 <strong>CD</strong> と <strong>BD</strong> だけで元の4つの最小項すべてが覆われる（ADは不要）。</p>
            <div class="formula-block"><strong>解答： Z = CD + BD</strong></div>
          `
        }
      },

      /* ==================== FOCUS 03 ==================== */
      {
        id: 'focus-03',
        num: 'FOCUS 03',
        category: 'arith',
        categoryLabel: '演算回路',
        sectionRef: '4.3〜4.4 (p.73〜78, 80〜81)',
        title: '加算器・桁上げ先見加算器（CLA）・加減算器',
        priority: '超頻出・過去問 問3',
        unitLink: '#unit-2',
        unitLabel: '単元 4.3-5',
        whyNeeded: '<strong>並列加算器（リプルキャリー）の問題点</strong>：下位ビットの桁上げが確定するまで上位ビットの計算が完了せず、<strong>ビット数 n に比例して桁上げ伝搬遅延が増大する</strong>。<br><strong>CLA（桁上げ先見加算器）の考え方</strong>：各桁の桁上げ生成 <span class="formula">G<sub>i</sub>=A<sub>i</sub>B<sub>i</sub></span> と伝搬 <span class="formula">P<sub>i</sub>=A<sub>i</sub>⊕B<sub>i</sub></span> を定義し、全桁の桁上げを入力 A, B, C<sup>-</sup> から<strong>一斉に並列計算することで高速化</strong>する。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>半加算器（HA）・全加算器（FA）</h4>
              <div class="formula-block">
                <strong>HA：</strong> S = A ⊕ B,　C = AB<br>
                <strong>FA：</strong> S = C<sup>-</sup> ⊕ (A ⊕ B)<br>
                　　 C<sup>+</sup> = C<sup>-</sup>(A ⊕ B) + AB
              </div>
              <h4>加減算器（2の補数減算）の仕組み</h4>
              <p>制御信号 <strong>S</strong> と <strong>XOR（1の補数器）</strong>＋最下位キャリー <strong>C<sup>-</sup>=S</strong> で構成：</p>
              <ul>
                <li><strong>S=0（加算）</strong>：B そのまま、C<sup>-</sup>=0 → <strong>A + B</strong></li>
                <li><strong>S=1（減算）</strong>：B を反転（1の補数）し、C<sup>-</sup>=1 を足す（2の補数） → <strong>A + ${ov('B')} + 1 = A - B</strong></li>
              </ul>
            </div>
            <div>
              <h4>CLA（桁上げ先取り回路）の展開公式</h4>
              <div class="formula-block">
                G<sub>i</sub> = A<sub>i</sub>B<sub>i</sub>（生成）,　P<sub>i</sub> = A<sub>i</sub> ⊕ B<sub>i</sub>（伝搬）<br>
                C<sub>0</sub> = G<sub>0</sub> + P<sub>0</sub>C<sup>-</sup><br>
                C<sub>1</sub> = G<sub>1</sub> + P<sub>1</sub>G<sub>0</sub> + P<sub>1</sub>P<sub>0</sub>C<sup>-</sup><br>
                C<sub>2</sub> = G<sub>2</sub> + P<sub>2</sub>G<sub>1</sub> + P<sub>2</sub>P<sub>1</sub>G<sub>0</sub> + P<sub>2</sub>P<sub>1</sub>P<sub>0</sub>C<sup>-</sup><br>
                S<sub>k</sub> = P<sub>k</sub> ⊕ C<sub>k-1</sub>
              </div>
            </div>
          </div>
          <div class="grid-2">
            <div class="diagram-box">${D.halfAdder()}<div class="diagram-caption">半加算器（HA）の回路図</div></div>
            <div class="diagram-box">${D.fullAdder()}<div class="diagram-caption">全加算器（FA）の回路図</div></div>
          </div>
          <div class="diagram-box">${D.parallelAdder4()}<div class="diagram-caption">4ビット並列加算器と桁上げ伝搬遅延</div></div>
          <div class="diagram-box">${D.cla2bit()}<div class="diagram-caption">2ビット桁上げ先見加算器（CLA）の完全ゲート回路図</div></div>
          <div class="diagram-box">${D.adderSubtractor4()}<div class="diagram-caption">4ビット加減算器（1の補数器 XOR×4 ＋ 全加算器 FA×4）</div></div>
        `,
        learningPoints: [
          { id: 'f3-lp1', text: '全加算器を用いて多ビット並列加算器・加減算器を構成し動作を説明できる' },
          { id: 'f3-lp2', text: '並列加算器の問題点（桁上げ伝搬遅延）とCLAの高速化の考え方を説明できる' },
          { id: 'f3-lp3', text: 'G_i, P_i を使って C_0, C_1, C_2 の論理式を自力で展開できる' }
        ],
        problem: {
          id: 'fp-3',
          badge: '過去問 問3 発展（CLA展開＋加減算器）',
          title: '3ビットCLAの桁上げC₂の導出と加減算器の動作',
          question: `
            <ol>
              <li>4ビット並列加算器でビット数が増えると計算が遅くなる理由を簡潔に説明せよ。</li>
              <li><span class="formula">G<sub>i</sub> = A<sub>i</sub>B<sub>i</sub>, P<sub>i</sub> = A<sub>i</sub> ⊕ B<sub>i</sub></span> とし、下位からの桁上げを <span class="formula">C<sup>-</sup></span> とするとき、桁上げ先見加算器の <span class="formula">C<sub>0</sub>, C<sub>1</sub>, C<sub>2</sub></span> をすべて <span class="formula">G, P, C<sup>-</sup></span> のみで表せ。</li>
              <li>4ビット加減算器で <span class="formula">A = 0101 (+5), B = 0011 (+3)</span>、切替信号 <span class="formula">S = 1</span>（減算）としたとき、XOR出力、加算結果、最上位桁上げ C<sub>3</sub> を求めよ。</li>
            </ol>
          `,
          hint: `<p>(2) <span class="formula">C<sub>i</sub> = G<sub>i</sub> + P<sub>i</sub>C<sub>i-1</sub></span> を順番に代入展開します。(3) S=1 なので B をビット反転し、C<sup>-</sup>=1 を加えます（2の補数）。</p>`,
          answer: `
            <p><strong>(1) 並列加算器の問題点：</strong></p>
            <p>下位ビットからの桁上げ（キャリー）が確定するまで上位ビットの和と桁上げが確定しないため、桁上げが下位から上位へ順次伝搬する遅延（<strong>桁上げ伝搬遅延</strong>）がビット数に比例して大きくなるため。</p>
            <p><strong>(2) CLAの論理式：</strong></p>
            <div class="formula-block">
              C<sub>0</sub> = G<sub>0</sub> + P<sub>0</sub>C<sup>-</sup><br>
              C<sub>1</sub> = G<sub>1</sub> + P<sub>1</sub>C<sub>0</sub> = <strong>G<sub>1</sub> + P<sub>1</sub>G<sub>0</sub> + P<sub>1</sub>P<sub>0</sub>C<sup>-</sup></strong><br>
              C<sub>2</sub> = G<sub>2</sub> + P<sub>2</sub>C<sub>1</sub> = <strong>G<sub>2</sub> + P<sub>2</sub>G<sub>1</sub> + P<sub>2</sub>P<sub>1</sub>G<sub>0</sub> + P<sub>2</sub>P<sub>1</sub>P<sub>0</sub>C<sup>-</sup></strong>
            </div>
            <p><strong>(3) 4ビット加減算器（S=1）：</strong></p>
            <ul>
              <li>B = 0011 と S=1 のXOR → <strong>1100</strong>（1の補数）</li>
              <li>加算：<span class="formula">0101 + 1100 + 1 (C<sup>-</sup>) = (1)0010</span></li>
              <li>結果：<strong>0010（+2）</strong>、最上位桁上げ <strong>C<sub>3</sub> = 1</strong>（2の補数減算で正の結果なので桁上げ1は捨てる）。</li>
            </ul>
          `
        }
      },

      /* ==================== FOCUS 04 ==================== */
      {
        id: 'focus-04',
        num: 'FOCUS 04',
        category: 'arith',
        categoryLabel: '演算回路',
        sectionRef: '4.3.5 (p.78〜80)',
        title: 'オーバーフロー検出器（符号付き2の補数加算）',
        priority: '必出・第3回講義',
        unitLink: '#unit-2',
        unitLabel: '単元 4.3-5',
        whyNeeded: '符号付き2進数（2の補数表現、4bitでは <strong>-8〜+7</strong>）の加算では、<strong>「正＋正＝負」または「負＋負＝正」</strong>のように表現範囲を超えて符号が反転してしまう誤り（オーバーフロー）が起こる。単なる最上位桁上げ C<sub>3</sub> とは別物であり、専用回路で検出する必要がある。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>2つの判定式（両方書けるように！）</h4>
              <div class="formula-block">
                <strong>① 桁上げによる判定（最重要・回路が最小）：</strong><br>
                <strong>V = C<sub>3</sub> ⊕ C<sub>2</sub></strong><br>
                <span style="font-size:12.5px;">（符号ビットへの桁上げ C<sub>2</sub> と符号ビットからの桁上げ C<sub>3</sub> が異なるとき1）</span><br><br>
                <strong>② 符号ビットによる判定（定義）：</strong><br>
                V = A<sub>3</sub>B<sub>3</sub>${ov('S<sub>3</sub>')} + ${ov('A<sub>3</sub>')}${ov('B<sub>3</sub>')}S<sub>3</sub>
              </div>
            </div>
            <div>
              <div class="diagram-box" style="margin:0;">${D.overflowDetector()}<div class="diagram-caption">オーバーフロー検出器（V = C₃ ⊕ C₂）</div></div>
            </div>
          </div>
          <div class="callout callout-trap">
            <div class="callout-title">よくある誤解：「桁上げ C₃ = 1 ならオーバーフロー」はウソ！</div>
            例：<span class="formula">(-1) + (-1) = 1111 + 1111 = (1)1110 (-2)</span> では C<sub>3</sub>=1 かつ C<sub>2</sub>=1 なので <strong>V = 1⊕1 = 0（正常！）</strong>。<br>
            逆に <span class="formula">(+5) + (+4) = 0101 + 0100 = (0)1001 (-7)</span> では C<sub>3</sub>=0 かつ C<sub>2</sub>=1 なので <strong>V = 0⊕1 = 1（オーバーフロー！）</strong>。
          </div>
        `,
        learningPoints: [
          { id: 'f4-lp1', text: '符号付き2の補数表現におけるオーバーフローと桁上げ（キャリー）の違いを説明できる' },
          { id: 'f4-lp2', text: 'V = C_3 ⊕ C_2 でオーバーフローを検出できる理由を説明し、具体例で判定できる' }
        ],
        problem: {
          id: 'fp-4',
          badge: '手計算チェック（4bit 2の補数）',
          title: 'オーバーフロー判定と論理式の確認',
          question: `
            <p>4ビット符号付き2進数（2の補数表現）の次の3つの加算について、和 S<sub>3</sub>S<sub>2</sub>S<sub>1</sub>S<sub>0</sub>、桁上げ C<sub>2</sub>, C<sub>3</sub>、およびオーバーフロー検出出力 V = C<sub>3</sub> ⊕ C<sub>2</sub> を求めよ。</p>
            <ol>
              <li><span class="formula">0101 + 0110</span>（+5 + +6）</li>
              <li><span class="formula">1010 + 1011</span>（-6 + -5）</li>
              <li><span class="formula">1101 + 0101</span>（-3 + +5）</li>
            </ol>
          `,
          hint: `<p>4bit符号付きの範囲は -8〜+7。筆算で各桁のキャリー C<sub>0</sub>, C<sub>1</sub>, C<sub>2</sub>, C<sub>3</sub> を追いましょう。異符号の足し算ではオーバーフローは絶対に起きません！</p>`,
          answer: `
            <div class="table-wrap"><table class="logic-table">
              <thead><tr><th>計算</th><th>10進の真値</th><th>和 S<sub>3..0</sub></th><th>C<sub>2</sub></th><th>C<sub>3</sub></th><th>V = C<sub>3</sub>⊕C<sub>2</sub></th><th>判定</th></tr></thead>
              <tbody>
                <tr><td class="mono-cell">0101 + 0110</td><td>+11（範囲外）</td><td class="mono-cell">1011 (-5)</td><td class="mono-cell hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell hi-1"><strong>1</strong></td><td><strong>OF発生</strong></td></tr>
                <tr><td class="mono-cell">1010 + 1011</td><td>-11（範囲外）</td><td class="mono-cell">0101 (+5)</td><td class="mono-cell">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1"><strong>1</strong></td><td><strong>OF発生</strong></td></tr>
                <tr><td class="mono-cell">1101 + 0101</td><td>+2（範囲内）</td><td class="mono-cell">0010 (+2)</td><td class="mono-cell hi-1">1</td><td class="mono-cell hi-1">1</td><td class="mono-cell"><strong>0</strong></td><td>正常</td></tr>
              </tbody>
            </table></div>
          `
        }
      },

      /* ==================== FOCUS 05 ==================== */
      {
        id: 'focus-05',
        num: 'FOCUS 05',
        category: 'arith',
        categoryLabel: '演算回路',
        sectionRef: '4.5 (p.82〜83)',
        title: '多ビット比較器（1bit→2bit / 3bit への拡張）',
        priority: '超頻出・過去問 問2',
        unitLink: '#unit-2',
        unitLabel: '単元 4.3-5',
        whyNeeded: 'CPUの条件分岐（A&gt;B, A=B, A&lt;B）に必須の回路。多ビットを一度に真理値表から作ると入力数が膨大になるため、<strong>1ビット比較器を基本部品にして上位ビットから順に判定を優先する階層設計</strong>を行う。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>1ビット比較器の論理式</h4>
              <div class="formula-block">
                Z<sub>0</sub> (A&gt;B) = A${ov('B')}<br>
                Z<sub>1</sub> (A=B) = ${ov('A')}${ov('B')} + AB = ${ov('A ⊕ B')}（XNOR）<br>
                Z<sub>2</sub> (A&lt;B) = ${ov('A')}B
              </div>
              <h4>多ビット比較のルール（超明快！）</h4>
              <p><strong>「上位で大小が付けば下位は無視（×）。上位が等しいときだけ下位の結果をANDで通す！」</strong></p>
              <div class="formula-block">
                <strong>2bit：</strong><br>
                Z<sub>0</sub> = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub><br>
                Z<sub>1</sub> = Z<sub>11</sub>Z<sub>01</sub><br>
                Z<sub>2</sub> = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub>
              </div>
            </div>
            <div>
              <div class="diagram-box" style="margin:0 0 10px;">${D.comparator1()}<div class="diagram-caption">1ビット比較器の完全ゲート回路図</div></div>
              <div class="diagram-box" style="margin:0;">${D.comparator2()}<div class="diagram-caption">1ビット比較器×2による2ビット比較器（過去問 問2）</div></div>
            </div>
          </div>
        `,
        learningPoints: [
          { id: 'f5-lp1', text: '1ビット比較器の真理値表・論理式（A B̄, XNOR, ĀB）を書ける' },
          { id: 'f5-lp2', text: '2ビット・3ビット比較器のFunction Table（×の扱い含む）・論理式・回路図を書ける' }
        ],
        problem: {
          id: 'fp-5',
          badge: '過去問 問2 ＋ 第2回課題',
          title: '3ビット比較器の論理式とFunction Tableの考え方',
          question: `
            <p>1ビット比較器を3個用いて3ビット比較器（<span class="formula">A = (A<sub>2</sub>A<sub>1</sub>A<sub>0</sub>)<sub>2</sub>, B = (B<sub>2</sub>B<sub>1</sub>B<sub>0</sub>)<sub>2</sub></span>）を構成する。各桁 i（i=2,1,0）の1ビット比較器出力を <span class="formula">Z<sub>i0</sub>(A<sub>i</sub>&gt;B<sub>i</sub>), Z<sub>i1</sub>(A<sub>i</sub>=B<sub>i</sub>), Z<sub>i2</sub>(A<sub>i</sub>&lt;B<sub>i</sub>)</span> とするとき：</p>
            <ol>
              <li>全体の出力 <span class="formula">Z<sub>0</sub>(A&gt;B), Z<sub>1</sub>(A=B), Z<sub>2</sub>(A&lt;B)</span> を論理式で表せ。</li>
              <li>Function Tableにおいて、<span class="formula">A<sub>2</sub> &gt; B<sub>2</sub></span> の行の下位ビット欄が「×（ドントケア）」になる理由を一言で説明せよ。</li>
            </ol>
          `,
          hint: `<p>最上位（bit 2）で決まる ＋ bit 2が等しくて bit 1で決まる ＋ bit 2, 1とも等しくて bit 0で決まる、の3項のORになります。</p>`,
          answer: `
            <p><strong>1. 3ビット比較器の論理式：</strong></p>
            <div class="formula-block">
              Z<sub>0</sub> = Z<sub>20</sub> + Z<sub>21</sub>Z<sub>10</sub> + Z<sub>21</sub>Z<sub>11</sub>Z<sub>00</sub><br>
              Z<sub>1</sub> = Z<sub>21</sub>Z<sub>11</sub>Z<sub>01</sub><br>
              Z<sub>2</sub> = Z<sub>22</sub> + Z<sub>21</sub>Z<sub>12</sub> + Z<sub>21</sub>Z<sub>11</sub>Z<sub>02</sub>
            </div>
            <p><strong>2. ×（ドントケア）になる理由：</strong></p>
            <p>2進数の大小比較では上位ビットの重みが下位ビット全体の和より常に大きいため、最上位ビット（A<sub>2</sub>, B<sub>2</sub>）で大小が確定すれば、下位ビットの値にかかわらず全体の大小関係が確定するため。</p>
            <div class="diagram-box">${D.comparator3()}</div>
          `
        }
      },

      /* ==================== FOCUS 06 ==================== */
      {
        id: 'focus-06',
        num: 'FOCUS 06',
        category: 'comb',
        categoryLabel: '組合せ回路',
        sectionRef: '4.6 (p.84〜89)',
        title: 'エンコーダ・プライオリティエンコーダ・デコーダ・符号変換',
        priority: '超頻出・過去問 問4',
        unitLink: '#unit-3',
        unitLabel: '単元 4.6',
        whyNeeded: '<strong>エンコーダ</strong>は最大 2<sup>n</sup> 本の入力から n ビットの2進符号へ変換し、<strong>デコーダ</strong>はその逆（n ビット→最大 2<sup>n</sup> 本）を行う。<br><strong>プライオリティエンコーダが必要な理由</strong>：通常のエンコーダは「複数入力が同時に1になると正しい符号が出力できない」＆「全入力が0のとき（無入力）と入力0番が1のときを区別できない」。優先順位と <strong>GS（Group Select）</strong>を付けることでこれらを解決する！',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>エンコーダ vs プライオリティエンコーダ（4→2bit）</h4>
              <div class="formula-block">
                <strong>通常（例題4.8）：</strong> A<sub>0</sub>=I<sub>1</sub>+I<sub>3</sub>, A<sub>1</sub>=I<sub>2</sub>+I<sub>3</sub><br>
                <strong>優先付（I<sub>3</sub>最優先）：</strong><br>
                A<sub>0</sub> = I<sub>3</sub> + ${ov('I<sub>2</sub>')}I<sub>1</sub>,　A<sub>1</sub> = I<sub>3</sub> + I<sub>2</sub><br>
                GS = I<sub>0</sub> + I<sub>1</sub> + I<sub>2</sub> + I<sub>3</sub>（どれか1なら1）
              </div>
              <h4>デコーダ（2→4bit）とBCD-10進デコーダ</h4>
              <div class="formula-block">
                D<sub>0</sub>=${ov('A<sub>1</sub>')}${ov('A<sub>0</sub>')}, D<sub>1</sub>=${ov('A<sub>1</sub>')}A<sub>0</sub>, D<sub>2</sub>=A<sub>1</sub>${ov('A<sub>0</sub>')}, D<sub>3</sub>=A<sub>1</sub>A<sub>0</sub><br>
                <span style="font-size:12.5px;">※ BCD-10進デコーダでは 10〜15（1010〜1111）を<strong>ドントケア</strong>にしてD<sub>2</sub>〜D<sub>9</sub>のゲート入力数を削減！</span>
              </div>
            </div>
            <div>
              <h4>2進-グレイ符号変換（過去問 問4）</h4>
              <p><strong>グレイ符号の特徴</strong>：隣接する数値間で<strong>1ビットしか変化しない</strong>ため、過渡的な読み取り誤りを防げる。</p>
              <div class="formula-block">
                <strong>3bit（入力 C,B,A → G<sub>2</sub>,G<sub>1</sub>,G<sub>0</sub>）：</strong><br>
                G<sub>2</sub> = C<br>
                G<sub>1</sub> = C ⊕ B<br>
                G<sub>0</sub> = B ⊕ A
              </div>
              <div class="diagram-box" style="margin:8px 0 0;">${D.grayConverter3()}<div class="diagram-caption">3ビット 2進-グレイ符号変換回路</div></div>
            </div>
          </div>
          <div class="grid-2">
            <div class="diagram-box">${D.encoder2()}<div class="diagram-caption">通常エンコーダ（4→2bit）</div></div>
            <div class="diagram-box">${D.priorityEncoder2()}<div class="diagram-caption">プライオリティエンコーダ（4→2bit）</div></div>
          </div>
          <div class="grid-2">
            <div class="diagram-box">${D.decoder2()}<div class="diagram-caption">2ビットデコーダ（2→4bit）完全回路図</div></div>
            <div class="diagram-box">${D.bcdDecoder()}<div class="diagram-caption">BCD-10進デコーダ（ドントケア簡単化・10出力完全図）</div></div>
          </div>
        `,
        learningPoints: [
          { id: 'f6-lp1', text: 'エンコーダとデコーダの機能の違いを説明できる' },
          { id: 'f6-lp2', text: 'プライオリティエンコーダが必要な理由と GS・ĒĪ の役割を説明できる' },
          { id: 'f6-lp3', text: '2進-グレイ符号変換回路の真理値表・論理式・XOR回路図を書ける' }
        ],
        problem: {
          id: 'fp-6',
          badge: '記述＋設計（プライオリティ＋BCDデコーダ）',
          title: 'プライオリティエンコーダとBCD-10進デコーダの簡単化',
          question: `
            <ol>
              <li>通常のエンコーダではなく「プライオリティエンコーダ」が必要となる理由を2点挙げよ。</li>
              <li>4入力（I<sub>3</sub>, I<sub>2</sub>, I<sub>1</sub>, I<sub>0</sub>、I<sub>3</sub>が最優先）・2出力（A<sub>1</sub>, A<sub>0</sub>）のプライオリティエンコーダにおいて、I<sub>3</sub>=0, I<sub>2</sub>=1, I<sub>1</sub>=1, I<sub>0</sub>=0 が同時入力されたときの出力 A<sub>1</sub>, A<sub>0</sub> と GS を求めよ。</li>
              <li>BCD-10進デコーダ（入力 D,C,B,A）で、出力 8（1000）と出力 9（1001）はドントケア（10〜15）を利用してそれぞれ最も簡単な積項で表すとどうなるか？</li>
            </ol>
          `,
          hint: `<p>(2) I<sub>2</sub>=1 が I<sub>1</sub>=1 より優先されるので「2」が出力されます。(3) 8〜15のうち D=1 のとき、10〜15はすべてドントケアなので、8 (1000) は <span class="formula">D${ov('A')}</span>、9 (1001) は <span class="formula">DA</span> だけで区別できます！</p>`,
          answer: `
            <p><strong>1. プライオリティエンコーダが必要な理由：</strong></p>
            <ul>
              <li>複数の入力が同時に1になった場合でも、あらかじめ定めた優先順位に従って最も優先度の高い入力の符号を正しく出力するため。</li>
              <li>全入力が0の状態と、0番入力（I<sub>0</sub>）のみが1の状態を出力符号（00）だけでは区別できないため、GS（有効入力あり信号）で識別するため。</li>
            </ul>
            <p><strong>2. 同時入力時の出力：</strong></p>
            <p>I<sub>3</sub>=0 で I<sub>2</sub>=1 が最優先されるため、2進数の「2」が出力される → <strong>A<sub>1</sub> = 1, A<sub>0</sub> = 0, GS = 1</strong>。</p>
            <p><strong>3. BCD-10進デコーダの出力 8, 9（ドントケア活用）：</strong></p>
            <div class="formula-block">
              出力 8 (1000)： <strong>Z<sub>8</sub> = D${ov('A')}</strong>　（D=1 かつ A=0 は 8, 10, 12, 14 だが 10〜14 はDC！）<br>
              出力 9 (1001)： <strong>Z<sub>9</sub> = DA</strong>　　（D=1 かつ A=1 は 9, 11, 13, 15 だが 11〜15 はDC！）
            </div>
          `
        }
      },

      /* ==================== FOCUS 07 ==================== */
      {
        id: 'focus-07',
        num: 'FOCUS 07',
        category: 'comb',
        categoryLabel: '組合せ回路',
        sectionRef: '4.7 (p.89〜92)',
        title: 'マルチプレクサ（MUX）・デマルチプレクサ（DEMUX）',
        priority: '超頻出・過去問 問5',
        unitLink: '#unit-4',
        unitLabel: '単元 4.7',
        whyNeeded: '<strong>MUX（データセレクタ）</strong>は複数チャネルの入力からセレクト信号で1つを選んで出力し、<strong>DEMUX</strong>は1つの入力を複数出力チャネルの1つへ振り分ける。通信線の共有（時分割多重化／多重分離）やCPU内部のバス切替に不可欠。また<strong>デコーダ＋AND/OR</strong>でMUXを構成できる。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>MUX / DEMUX の基本論理式（${ov('EI')} 付き）</h4>
              <div class="formula-block">
                <strong>1bit 4ch MUX（過去問 問5）：</strong><br>
                Z = (${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}A + ${ov('S<sub>1</sub>')}S<sub>0</sub>B + S<sub>1</sub>${ov('S<sub>0</sub>')}C + S<sub>1</sub>S<sub>0</sub>D)·EI<br><br>
                <strong>1bit 4ch DEMUX：</strong><br>
                Z<sub>0</sub> = D·${ov('S<sub>1</sub>')}${ov('S<sub>0</sub>')}·EI,　Z<sub>1</sub> = D·${ov('S<sub>1</sub>')}S<sub>0</sub>·EI<br>
                Z<sub>2</sub> = D·S<sub>1</sub>${ov('S<sub>0</sub>')}·EI,　Z<sub>3</sub> = D·S<sub>1</sub>S<sub>0</sub>·EI
              </div>
              <p style="font-size:13.5px;"><strong>デコーダによるMUX構成：</strong> S<sub>1</sub>, S<sub>0</sub> を2bitデコーダに入れ、その出力 D<sub>0</sub>〜D<sub>3</sub> と各入力のANDをとってORするだけ（<span class="formula">Z = D<sub>0</sub>A+D<sub>1</sub>B+D<sub>2</sub>C+D<sub>3</sub>D</span>）。</p>
            </div>
            <div>
              <div class="diagram-box" style="margin:0;">${D.mux4From2()}<div class="diagram-caption">1bit 2ch MUX×3 による 4ch MUX（S₀が1段目、S₁が2段目）</div></div>
            </div>
          </div>
          <div class="grid-2">
            <div class="diagram-box">${D.mux4Gate()}<div class="diagram-caption">1bit 4ch MUX のゲート回路図</div></div>
            <div class="diagram-box">${D.mux4FromDecoder()}<div class="diagram-caption">2ビットデコーダを利用した 4ch MUX の回路図</div></div>
          </div>
          <div class="diagram-box">${D.demux2bit4ch()}<div class="diagram-caption">2bit 4ch デマルチプレクサ（8AND 完全回路図）</div></div>
        `,
        learningPoints: [
          { id: 'f7-lp1', text: 'MUXとDEMUXの機能・真理値表（ĒĪと×の扱い）・論理式を書ける' },
          { id: 'f7-lp2', text: '小規模MUX（2ch×3）やデコーダを利用して4ch MUXを構成できる' }
        ],
        problem: {
          id: 'fp-7',
          badge: '過去問 問5 ＋ 第5回課題',
          title: 'デコーダを用いたMUX構成と2ビット4チャネルDEMUX',
          question: `
            <ol>
              <li>2ビットデコーダ（入力 S<sub>1</sub>, S<sub>0</sub>、出力 D<sub>0</sub>〜D<sub>3</sub>）とAND/ORゲートを使って、1ビット4チャネルMUX（入力 A,B,C,D、出力 Z）を構成する論理式を示し、なぜそれでMUXとして動作するか説明せよ。</li>
              <li>入力 <span class="formula">(D<sub>1</sub>D<sub>0</sub>)</span>（2ビット）、セレクト <span class="formula">(S<sub>1</sub>S<sub>0</sub>)</span>、イネーブル <span class="formula">${ov('EI')}</span>（0で有効）の2ビット4チャネルデマルチプレクサにおいて、チャネル2の出力 <span class="formula">Z<sub>21</sub>, Z<sub>20</sub></span> の論理式を書け。</li>
            </ol>
          `,
          hint: `<p>(1) デコーダ出力は常に1本だけが1、残り3本は0になります。(2) チャネル2が選ばれる条件は <span class="formula">S<sub>1</sub>=1, S<sub>0</sub>=0</span> すなわち <span class="formula">S<sub>1</sub>${ov('S<sub>0</sub>')}</span>。</p>`,
          answer: `
            <p><strong>1. デコーダを利用した4ch MUX：</strong></p>
            <div class="formula-block">Z = D<sub>0</sub>·A + D<sub>1</sub>·B + D<sub>2</sub>·C + D<sub>3</sub>·D</div>
            <p><strong>動作理由：</strong>2ビットデコーダはセレクト信号 (S<sub>1</sub>S<sub>0</sub>) に対応する1本の出力 D<sub>k</sub> のみを 1 にし、他をすべて 0 にする。そのため各データ入力とのANDゲートが「開閉スイッチ」として働き、選ばれた1チャネルのデータだけがORゲートを通って出力 Z に現れる。</p>
            <p><strong>2. 2ビット4チャネルDEMUX（チャネル2）：</strong></p>
            <div class="formula-block">
              Z<sub>21</sub> = D<sub>1</sub> · S<sub>1</sub>${ov('S<sub>0</sub>')} · EI<br>
              Z<sub>20</sub> = D<sub>0</sub> · S<sub>1</sub>${ov('S<sub>0</sub>')} · EI
            </div>
          `
        }
      },

      /* ==================== FOCUS 08 ==================== */
      {
        id: 'focus-08',
        num: 'FOCUS 08',
        category: 'seq',
        categoryLabel: '順序回路',
        sectionRef: '5.1・5.3・5.4 (p.94〜95, 98〜110)',
        title: '入力方程式の導出と順序回路（FF変換）の設計',
        priority: '超頻出・過去問 問6',
        unitLink: '#unit-5',
        unitLabel: '単元 5.1-4',
        whyNeeded: '<strong>組合せ回路</strong>は現在入力のみで出力が決まるが、<strong>順序回路</strong>は記憶素子（FF）の現在状態 Q も含めて次状態 Q<sup>+</sup> が決まる。<strong>応用方程式と励起表から入力方程式を導出</strong>することで、任意の順序回路（や別種のFF）を手持ちのFFから機械的に設計できる。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>設計の黄金3ステップ（例題5.6〜5.8）</h4>
              <ol>
                <li><strong>応用方程式</strong> <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> を書く。</li>
                <li>作りたい回路の<strong>特性方程式</strong>と係数比較して <strong>g<sub>1</sub>, g<sub>2</sub></strong> を取り出す。</li>
                <li>使うFFの<strong>入力方程式</strong>に g<sub>1</sub>, g<sub>2</sub> を代入して回路図を描く！</li>
              </ol>
              <div class="callout callout-why">
                <div class="callout-title">JK-FFのレーシング（発振）対策</div>
                J=K=1 で Cp=1 が長いと出力が反転し続けて発振する → <strong>エッジトリガ型</strong>（立ち上がり/立ち下がりの瞬間のみ動作）または<strong>マスタースレーブ型</strong>（2段構成で取込みと出力を分離）で防止する。
              </div>
            </div>
            <div>
              <h4>励起表（Q → Q<sup>+</sup> に必要な入力）</h4>
              <div class="table-wrap"><table class="logic-table">
                <thead><tr><th>Q</th><th>Q<sup>+</sup></th><th class="col-sep">S</th><th>R</th><th class="col-sep">J</th><th>K</th><th class="col-sep">T</th><th class="col-sep">D</th></tr></thead>
                <tbody>
                  <tr><td class="mono-cell">0</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep">0</td></tr>
                  <tr><td class="mono-cell">0</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell hi-x">×</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep hi-1">1</td></tr>
                  <tr><td class="mono-cell">1</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell hi-1">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell hi-1">1</td><td class="mono-cell col-sep hi-1">1</td><td class="mono-cell col-sep">0</td></tr>
                  <tr><td class="mono-cell">1</td><td class="mono-cell">1</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td><td class="mono-cell col-sep hi-x">×</td><td class="mono-cell">0</td><td class="mono-cell col-sep">0</td><td class="mono-cell col-sep hi-1">1</td></tr>
                </tbody>
              </table></div>
            </div>
          </div>
          <div class="grid-2">
            <div class="diagram-box">${D.seqBlock()}<div class="diagram-caption">順序回路の基本構成図</div></div>
            <div class="diagram-box">${D.srLatchNandNor()}<div class="diagram-caption">SRラッチ（NAND構成・NOR構成）</div></div>
          </div>
          <div class="grid-2">
            <div class="diagram-box">${D.srToT()}<div class="diagram-caption">SR-FF → T-FF 変換回路（例題5.6）</div></div>
            <div class="diagram-box">${D.jkToT()}<div class="diagram-caption">JK-FF → T-FF 変換回路（例題5.8）</div></div>
          </div>
          <div class="diagram-box">${D.dToT()}<div class="diagram-caption">D-FF → T-FF 変換回路（演習5.6）</div></div>
        `,
        learningPoints: [
          { id: 'f8-lp1', text: '組合せ回路と順序回路の違いを説明できる' },
          { id: 'f8-lp2', text: 'SR/JK/T/D-FFの特性方程式・励起表を暗記し、入力方程式を導出できる' },
          { id: 'f8-lp3', text: '入力方程式を使ってFF変換回路（SR→T, SR→JK, JK→D, D→T等）を設計できる' }
        ],
        problem: {
          id: 'fp-8',
          badge: '過去問 問6 類題（SR-FF入力方程式＋FF変換）',
          title: 'SR-FFの入力方程式導出と、SR-FFを用いたJK-FFの設計',
          question: `
            <ol>
              <li>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> と SR-FF の励起表を用いて、SR-FF の入力方程式（S と R）を求めよ。</li>
              <li>(1) の結果と JK-FF の特性方程式 <span class="formula">Q<sup>+</sup> = ${ov('K')}Q + J${ov('Q')}</span> を用いて、SR-FF から JK-FF を設計し、S, R の式と回路図を示せ。</li>
            </ol>
          `,
          hint: `<p>(1) 8行の表で Q=0, Q<sup>+</sup>=1（g<sub>2</sub>=1, Q=0）のときだけ S=1。Q=1, Q<sup>+</sup>=0（g<sub>1</sub>=0, Q=1）のときだけ R=1。(2) 係数比較で <span class="formula">g<sub>1</sub>=${ov('K')}, g<sub>2</sub>=J</span>。</p>`,
          answer: `
            <p><strong>1. SR-FFの入力方程式：</strong></p>
            <p>応用方程式 <span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> の真理値表に SR-FF の励起表を当てはめ、カルノー図で × を活用すると：</p>
            <div class="formula-block"><strong>S = g<sub>2</sub>${ov('Q')},　　R = ${ov('g<sub>1</sub>')}Q</strong></div>
            <p><strong>2. SR-FF による JK-FF の設計（教科書 例題5.7）：</strong></p>
            <p>JK-FF の特性方程式 <span class="formula">Q<sup>+</sup> = ${ov('K')}Q + J${ov('Q')}</span> と比較して <span class="formula">g<sub>1</sub> = ${ov('K')}, g<sub>2</sub> = J</span>。代入すると：</p>
            <div class="formula-block"><strong>S = J${ov('Q')},　　R = KQ</strong></div>
            <div class="diagram-box">${D.srToJK()}</div>
          `
        }
      },

      /* ==================== FOCUS 09 ==================== */
      {
        id: 'focus-09',
        num: 'FOCUS 09',
        category: 'seq',
        categoryLabel: '時間定数',
        sectionRef: '第6・7回講義資料',
        title: 'タイミングチャート・FFの時間定数とクロック周期要件',
        priority: '必出・記述＋計算',
        unitLink: '#unit-6',
        unitLabel: '単元 第7回',
        whyNeeded: '実際の論理素子には必ず信号伝搬遅延があるため、クロックエッジ前後に入力を安定させないと<strong>セットアップタイム違反／ホールドタイム違反</strong>が起き、出力が0とも1とも定まらない<strong>メタステーブル状態</strong>に陥る。正常動作を保証するクロック周期の下限計算が必須。',
        keyPointsHtml: `
          <ul>
            <li><strong>セットアップタイム（T<sub>setup</sub>）</strong>：クロックエッジの<strong>直前</strong>に入力信号を確定させておくべき時間。</li>
            <li><strong>ホールドタイム（T<sub>hold</sub>）</strong>：クロックエッジの<strong>直後</strong>に入力信号を保持し続けるべき時間。</li>
            <li><strong>アクセスタイム（T<sub>acc</sub>）</strong>：クロックエッジから出力 Q が確定するまでの時間（最小 <span class="formula">T<sub>acc</sub><sup>-</sup></span>、最大 <span class="formula">T<sub>acc</sub><sup>+</sup></span>）。</li>
          </ul>
          <div class="diagram-box">${D.ffTiming()}<div class="diagram-caption">FFの時間定数（Tsetup / Thold / Tacc）とメタステーブル状態</div></div>
          <div class="formula-block">
            <strong>① ホールドタイム要件（違反しない条件）：</strong> T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup><br>
            <strong>② クロック周期要件（セットアップ違反しない条件）：</strong> T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> ≦ T<sub>Cp</sub>　（最大周波数 f<sub>max</sub> = 1 / T<sub>Cp,min</sub>）
          </div>
        `,
        learningPoints: [
          { id: 'f9-lp1', text: 'セットアップタイム・ホールドタイム・アクセスタイムを正確に定義できる' },
          { id: 'f9-lp2', text: 'セットアップ/ホールド違反とメタステーブル状態を説明できる' },
          { id: 'f9-lp3', text: 'ホールド条件と最小クロック周期・最大動作周波数を手計算できる' }
        ],
        problem: {
          id: 'fp-9',
          badge: '第7回講義・時間制約計算（電卓なし）',
          title: 'FFの時間定数チェックと最小クロック周期・最大周波数',
          question: `
            <p>あるD-FF（出力 ${ov('Q')} を入力 D に帰還してT-FFとして動作させる）の時間定数が <span class="formula">T<sub>setup</sub> = 6 ns</span>、<span class="formula">T<sub>hold</sub> = 5 ns</span>、アクセスタイム <span class="formula">T<sub>acc</sub><sup>-</sup> = 7 ns</span>、<span class="formula">T<sub>acc</sub><sup>+</sup> = 14 ns</span> であるとする。</p>
            <ol>
              <li>ホールドタイム違反は起きるか？根拠の不等式とともに答えよ。</li>
              <li>セットアップタイム違反を起こさずに正常動作できる最小クロック周期 <span class="formula">T<sub>Cp,min</sub></span> [ns] と最大クロック周波数 <span class="formula">f<sub>max</sub></span> [MHz] を求めよ。</li>
              <li>クロックエッジ前後の禁止期間内に入力が変化すると起こり得る不安定な状態を何と呼ぶか？</li>
            </ol>
          `,
          hint: `<p>(1) <span class="formula">T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup></span> を確認。(2) <span class="formula">T<sub>Cp,min</sub> = T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup></span>。1 / (20 ns) は 1000 / 20 MHz で暗算できます！</p>`,
          answer: `
            <ol>
              <li><strong>ホールドタイム違反は起きない</strong>。<br>
                根拠：<span class="formula">T<sub>hold</sub> (5 ns) ≦ T<sub>acc</sub><sup>-</sup> (7 ns)</span> を満たすため、出力変化が次のクロックエッジのホールド期間を壊さない。</li>
              <li>最小クロック周期：<span class="formula">T<sub>Cp,min</sub> = T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> = 6 + 14 = <strong>20 ns</strong></span>。<br>
                最大クロック周波数：<span class="formula">f<sub>max</sub> = 1 / (20 × 10<sup>-9</sup> s) = 1000 / 20 MHz = <strong>50 MHz</strong></span>。</li>
              <li><strong>メタステーブル（Meta-stable）状態</strong>。</li>
            </ol>
          `
        }
      },

      /* ==================== FOCUS 10 ==================== */
      {
        id: 'focus-10',
        num: 'FOCUS 10',
        category: 'seq',
        categoryLabel: 'カウンタ',
        sectionRef: '第7回講義資料',
        title: '非同期式カウンタと任意の進数のカウンタ設計',
        priority: '超頻出・第7回講義',
        unitLink: '#unit-6',
        unitLabel: '単元 第7回',
        whyNeeded: 'T-FFを直列につなぐだけで簡単な回路で<strong>計数（カウンタ）や分周（1/2<sup>n</sup>）</strong>が実現できる。<br><strong>非同期式カウンタの遅延の原因</strong>：前段FFの出力を次段のクロックとする直列構造のため、<strong>各FFのアクセスタイム T<sub>acc</sub> が段数 n 倍に累積する（リプル遅延）</strong>。そのため高速クロックでは誤動作する。',
        keyPointsHtml: `
          <div class="grid-2">
            <div>
              <h4>基本接続と遅延・周波数条件</h4>
              <ul>
                <li><strong>アップカウンタ</strong>（負エッジ）：前段の <strong>Q<sub>i</sub></strong> → 次段クロック</li>
                <li><strong>ダウンカウンタ</strong>（負エッジ）：前段の <strong>${ov('Q<sub>i</sub>')}</strong> → 次段クロック</li>
                <li><strong>任意 N 進カウンタに必要なFF数</strong>：<span class="formula">2<sup>n-1</sup> &lt; N ≦ 2<sup>n</sup></span> を満たす <strong>n 個</strong>（例：7進→3個、10進→4個）。</li>
              </ul>
              <div class="formula-block">
                <strong>正常動作の条件（nビット非同期）：</strong><br>
                T<sub>Cp</sub> &gt; n · T<sub>acc</sub><br>
                f<sub>Cp</sub> &lt; 1 / (n · T<sub>acc</sub>)
              </div>
            </div>
            <div>
              <h4>任意進数（例：7進）の設計と注意点</h4>
              <p>0〜6（000〜110）まで数え、<strong>7（111）になった瞬間にNANDで全FFの非同期リセット ${ov('R')} を0にして000へ戻す</strong>。</p>
              <div class="callout callout-trap" style="margin:6px 0 0;">
                <div class="callout-title">単純リセットの欠点（記述頻出！）</div>
                ① 状態 111 が一瞬だけ出力される（グリッチ）。<br>
                ② FF間のばらつきで一部FFが先にリセットされるとNAND出力がすぐ1に戻り、他のFFがリセットされず<strong>誤動作</strong>することがある（対策：リセット用SRラッチを挟む）。
              </div>
            </div>
          </div>
          <div class="diagram-box">${D.asyncCounter4()}<div class="diagram-caption">非同期式4ビット（16進）カウンタと全出力 Q₀〜Q₃ の遅延波及</div></div>
          <div class="diagram-box">${D.asyncMod7()}<div class="diagram-caption">非同期式7進カウンタ（Q₂Q₁Q₀ = 111 を3入力NAND検出して非同期リセット）</div></div>
        `,
        learningPoints: [
          { id: 'f10-lp1', text: '非同期式アップ/ダウンカウンタと分周回路の動作を説明できる' },
          { id: 'f10-lp2', text: '非同期式カウンタの遅延の原因と T_Cp > n·T_acc の関係を説明・計算できる' },
          { id: 'f10-lp3', text: '任意の進数（例：7進・10進）のカウンタを必要なFF数とリセット論理で設計できる' }
        ],
        problem: {
          id: 'fp-10',
          badge: '第7回講義・任意進数設計＋遅延計算',
          title: '非同期式10進カウンタの設計と最大クロック周波数',
          question: `
            <p>負エッジトリガ型T-FF（非同期リセット端子 ${ov('R')} 付き、アクセスタイム <span class="formula">T<sub>acc</sub> = 12.5 ns</span>）を用いて、0〜9 を繰り返す<strong>非同期式10進アップカウンタ</strong>を設計する。</p>
            <ol>
              <li>必要なT-FFの個数 n を求めよ。</li>
              <li>カウント値が 10（2進数 <span class="formula">Q<sub>3</sub>Q<sub>2</sub>Q<sub>1</sub>Q<sub>0</sub> = 1010</span>）になった瞬間に全FFをリセット（${ov('R')} = 0）するためのNANDゲートの入力として最小限つなぐべき信号はどれか？</li>
              <li>このカウンタで正常な出力を得るためのクロック周期 T<sub>Cp</sub> [ns] と最大クロック周波数 f<sub>Cp</sub> [MHz] の条件を求めよ。</li>
            </ol>
          `,
          hint: `<p>(1) 2<sup>3</sup>=8 &lt; 10 ≦ 2<sup>4</sup>=16。(2) 0〜9 の間で Q<sub>3</sub>=1 かつ Q<sub>1</sub>=1 が同時に立つのは「10（1010）」が最初！(3) 4 × 12.5 ns = 50 ns → 1 / (50 ns) = 20 MHz。</p>`,
          answer: `
            <ol>
              <li><strong>n = 4 個</strong>（<span class="formula">2<sup>3</sup> = 8 &lt; 10 ≦ 16 = 2<sup>4</sup></span> より）。</li>
              <li><strong>Q<sub>3</sub> と Q<sub>1</sub> の2入力NAND</strong>（<span class="formula">${ov('R')} = ${ov('Q<sub>3</sub> · Q<sub>1</sub>')}</span>）。<br>
                0000(0)〜1001(9) の間は Q<sub>3</sub> と Q<sub>1</sub> が同時に1になることはなく、1010(10) になった瞬間に初めて ${ov('R')} = 0 となり全FFが 0000 へリセットされる。</li>
              <li>4段分の累積遅延は <span class="formula">4 × 12.5 ns = 50 ns</span>。<br>
                よって <strong><span class="formula">T<sub>Cp</sub> &gt; 50 ns</span></strong>、最大クロック周波数は <strong><span class="formula">f<sub>Cp</sub> &lt; 1 / (50 × 10<sup>-9</sup>) = 20 MHz</span></strong>。</li>
            </ol>
            <div class="diagram-box">${D.asyncMod10()}<div class="diagram-caption">非同期式10進カウンタの完全回路図（Q₃·Q₁ の2入力NANDで 1010 検出→リセット）</div></div>
          `
        }
      }
    ]
  };
})();
