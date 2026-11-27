/* =========================================================
   Basic Solving Guide (予備知識ゼロからの基本の解き方・虎の巻)
   問題を見ながら右ドロワーで参照 ＆ 専用ページ #basics で通読可能
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

(() => {
  const ov = (s) => `<span class="ov">${s}</span>`;

  window.SwitchStudy.BasicsGuide = [
    {
      id: 'b-0',
      short: '⓪超入門',
      title: '⓪ 0と1・基本演算・公式の読み方（完全ゼロから）',
      html: `
        <p>論理回路では <strong>0（OFF / L）</strong> と <strong>1（ON / H）</strong> の2つの値だけを扱います。</p>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>記号</th><th>読み・意味</th><th>覚え方（いつ1になる？）</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">${ov('A')}</td><td>NOT（否定・バー）</td><td class="left">0と1をひっくり返す（0→1、1→0）</td></tr>
            <tr><td class="mono-cell">A·B / AB</td><td>AND（論理積）</td><td class="left"><strong>両方1</strong> のときだけ 1（かけ算と同じ）</td></tr>
            <tr><td class="mono-cell">A + B</td><td>OR（論理和）</td><td class="left"><strong>どちらか1</strong> なら 1（1+1=1 に注意！）</td></tr>
            <tr><td class="mono-cell">A ⊕ B</td><td>XOR（排他的論理和）</td><td class="left"><strong>値が違う</strong> ときだけ 1（0⊕1=1, 1⊕1=0）</td></tr>
          </tbody>
        </table></div>
        <h4>試験で絶対に使う5大公式</h4>
        <div class="formula-block">
          ① 相補則：<strong>X + ${ov('X')} = 1</strong>、<strong>X · ${ov('X')} = 0</strong>（Q-M法と展開の命！）<br>
          ② 冪等則：<strong>X + X = X</strong>、<strong>X · X = X</strong>（同じ項は何個足しても1個）<br>
          ③ 吸収変形：<strong>A + ${ov('A')}B = A + B</strong>（プライオリティエンコーダで多用）<br>
          ④ 二重否定：<strong>${ov(ov('X'))} = X</strong>（バーが2本重なると消える）<br>
          ⑤ ド・モルガン：<strong>${ov('A + B')} = ${ov('A')} · ${ov('B')}</strong>、<strong>${ov('A · B')} = ${ov('A')} + ${ov('B')}</strong><br>
          　→ 覚え方：<strong>「上のバーをぶった切ると、＋ と ・ が入れ替わる！」</strong>
        </div>
      `
    },
    {
      id: 'b-1',
      short: '①標準形',
      title: '① 加法標準形の作り方（Q-M法のスタート地点）',
      html: `
        <p><strong>加法標準形</strong>とは、「すべての文字（A, B, C...）が1回ずつ入った積項（<strong>最小項</strong>）」の足し算で表した形です。</p>
        <h4>3ステップ手順</h4>
        <ol>
          <li>各項を見て、<strong>足りない文字 X</strong> を探す。</li>
          <li>足りない文字に対して <strong>(X + ${ov('X')})</strong>（＝1なので掛けても値が変わらない）を掛けて分配展開する。</li>
          <li>同じ最小項が2回以上出てきたら、冪等則（X+X=X）で<strong>1個にまとめる</strong>。</li>
        </ol>
        <h4>超わかりやすい具体例（3変数 A, B, C）</h4>
        <div class="formula-block">
          問題：Z = AC + A${ov('B')}${ov('C')} + ${ov('A')}BC<br>
          → 第1項 AC だけ「B」が足りない！ 他の2項は A,B,C 全部ある。<br>
          → AC に (B + ${ov('B')}) を掛ける：AC(B + ${ov('B')}) = ABC + A${ov('B')}C<br>
          → 答え：<strong>Z = ABC + A${ov('B')}C + A${ov('B')}${ov('C')} + ${ov('A')}BC</strong>
        </div>
        <p style="font-size:13px;color:var(--ink-secondary)">※ 2文字足りないとき（例：A だけ）は <span class="formula">A(B+${ov('B')})(C+${ov('C')})</span> と2回掛けて4個に展開します。</p>
      `
    },
    {
      id: 'b-2',
      short: '②カルノー図',
      title: '② カルノー図の書き方・囲み方・式の読み方',
      html: `
        <p>カルノー図は「隣り合うマスが必ず1ビットだけ違う表」に 1 を並べて、まとめて文字を消す図解法です。</p>
        <h4>絶対守るべき4ルール</h4>
        <ol>
          <li><strong>座標の順番は必ず <code>00 → 01 → 11 → 10</code></strong>（10 と 11 が逆！隣同士が1ビット違いになるように）。</li>
          <li><strong>囲めるマスの数は <code>1, 2, 4, 8</code>（2のべき乗）の長方形だけ</strong>（3マスやL字はNG！）。</li>
          <li><strong>上端と下端、左端と右端は裏側でつながっている</strong>（ワープして囲める！）。</li>
          <li><strong>ドントケア（×）</strong>は「大きく囲むために 1 として使ってもよいし、使わず無視してもよい」便利なジョーカー。</li>
        </ol>
        <h4>囲みから式を読み取るコツ（超簡単！）</h4>
        <div class="callout callout-ok">
          囲んだマス全体を見て、各文字（A, B, C...）ごとにチェックするだけ：<br>
          ・<strong>ずっと 1</strong> の文字 → そのまま書く（例：<code>A</code>）<br>
          ・<strong>ずっと 0</strong> の文字 → バーを付けて書く（例：<code>${ov('B')}</code>）<br>
          ・<strong>0 と 1 が両方混ざっている</strong>文字 → <strong>消す！</strong>（書かない）
        </div>
      `
    },
    {
      id: 'b-3',
      short: '③Q-M法',
      title: '③ クワイン・マクラスキー法（Q-M法）の解き方レシピ',
      html: `
        <p>カルノー図の代わりに、表を使って機械的に簡単化する手順です。</p>
        <h4>6ステップ完全手順</h4>
        <ol>
          <li><strong>加法標準形</strong>にする（①のワザ）。</li>
          <li>各最小項の<strong>肯定変数（バーが付いていない文字）の個数</strong>を数え、0個→1個→2個…の順に並べる。</li>
          <li><strong>隣り合う上下のグループ</strong>（例：1個と2個）のすべてのペアを比較し、<strong>ちょうど1文字だけバーの有無が違うペア</strong>を見つけたら、その1文字を消して右の列に書く。使われた元の2項に <strong>✓</strong> を付ける。</li>
          <li>右の列で同じ項が重複したら1つにまとめ、<strong>もう1文字も消せなくなるまで</strong>手順3を繰り返す。</li>
          <li>最後まで <strong>✓ が付かなかった項</strong>がすべて<strong>「主項」</strong>。</li>
          <li><strong>最小項・主項表</strong>（縦＝最小項、横＝主項）を作り、主項がカバーする最小項に ✓ を打つ。</li>
        </ol>
        <div class="callout callout-trap">
          <div class="callout-title">最終選択の鉄則（減点防止！）</div>
          ① まず<strong>「その行に ✓ が1つしかない最小項」</strong>を探し、その列の主項（<strong>必須主項</strong>）を選ぶ。<br>
          ② 選んだ必須主項がカバーする行をすべて消す。<br>
          ③ <strong>全行が消えたらそこで終了！</strong>（余った主項を足すと減点！）<br>
          ④ <strong>ドントケアがあるとき</strong>：手順2〜4の結合表には混ぜるが、<strong>手順6の主項表の行には書かない！</strong>
        </div>
      `
    },
    {
      id: 'b-4',
      short: '④演算回路',
      title: '④ 加算器・CLA・オーバーフロー・比較器の解き方',
      html: `
        <h4>1. 半加算器・全加算器</h4>
        <div class="formula-block">
          半加算器：S = A ⊕ B、C = AB<br>
          全加算器：S = C<sub>in</sub> ⊕ (A ⊕ B)、C<sub>out</sub> = C<sub>in</sub>(A ⊕ B) + AB
        </div>
        <h4>2. 桁上げ先見加算器（CLA）の展開レシピ</h4>
        <p>記号を2つ覚えるだけ：<strong>生成 G<sub>i</sub> = A<sub>i</sub>B<sub>i</sub></strong>、<strong>伝搬 P<sub>i</sub> = A<sub>i</sub> ⊕ B<sub>i</sub></strong>。</p>
        <div class="formula-block">
          基本式：<strong>C<sub>i</sub> = C<sub>i-1</sub>P<sub>i</sub> + G<sub>i</sub></strong><br>
          → C<sub>0</sub> = C<sup>-</sup>P<sub>0</sub> + G<sub>0</sub><br>
          → C<sub>1</sub> = C<sub>0</sub>P<sub>1</sub> + G<sub>1</sub> に C<sub>0</sub> を代入して展開：<br>
          　<strong>C<sub>1</sub> = C<sup>-</sup>P<sub>0</sub>P<sub>1</sub> + G<sub>0</sub>P<sub>1</sub> + G<sub>1</sub></strong>（前段キャリー C<sub>0</sub> が消えた！）
        </div>
        <h4>3. オーバーフロー判定（符号付き2の補数）</h4>
        <p>4ビットなら表現範囲は <strong>-8 〜 +7</strong>。筆算して<strong>符号ビットからの桁上り C<sub>3</sub></strong> と <strong>数値MSBからの桁上り C<sub>2</sub></strong> を比べる：</p>
        <div class="formula-block"><strong>V = C<sub>3</sub> ⊕ C<sub>2</sub></strong>（C<sub>3</sub> と C<sub>2</sub> が違えばオーバーフロー！）</div>
        <h4>4. 多ビット比較器の立て方</h4>
        <p>「上位ビットで大小が付けば確定、<strong>上位が等しい（Z<sub>11</sub>）ときだけ下位を見る</strong>」をそのまま式にする：</p>
        <div class="formula-block">Z<sub>0</sub>(A&gt;B) = Z<sub>10</sub> + Z<sub>11</sub>Z<sub>00</sub>、　Z<sub>1</sub>(A=B) = Z<sub>11</sub>Z<sub>01</sub>、　Z<sub>2</sub>(A&lt;B) = Z<sub>12</sub> + Z<sub>11</sub>Z<sub>02</sub></div>
      `
    },
    {
      id: 'b-5',
      short: '⑤組合せ',
      title: '⑤ エンコーダ・デコーダ・グレイ符号・MUX/DEMUX',
      html: `
        <h4>役割の対比（ここを混同しない！）</h4>
        <ul>
          <li><strong>エンコーダ（多→少）</strong>：4本→2bit、8本→3bit のように番号を2進数に変換。同時入力対策が<strong>プライオリティエンコーダ</strong>。</li>
          <li><strong>デコーダ（少→多）</strong>：2bit→4本のように、2進数に対応する1本だけ 1 にする（各出力が最小項そのもの！）。</li>
          <li><strong>MUX（多→1）</strong>：セレクト信号 S で選んだ入力1つを出力へ通す（ANDで選んで OR で合流）。</li>
          <li><strong>DEMUX（1→多）</strong>：1つの入力 D をセレクト信号 S で選んだ出力先へ配る（ANDゲートだけ、OR不要！）。</li>
        </ul>
        <h4>イネーブル ${ov('EI')} の扱い</h4>
        <p>上にバーが付いているので<strong>「0 のとき ON（動作）、1 のとき OFF（全出力0）」</strong>。論理式では内部で反転した信号 <strong>EI</strong> を全体に掛けるだけ！</p>
        <h4>グレイ符号変換の暗記テク</h4>
        <div class="formula-block">
          <strong>2進 → グレイ：</strong>最上位はそのまま、以下は隣り合うビットを XOR<br>
          （例：G<sub>2</sub>=C, G<sub>1</sub>=C⊕B, G<sub>0</sub>=B⊕A）<br>
          <strong>グレイ → 2進：</strong>最上位はそのまま、求めた上の2進ビットと次のグレイを XOR<br>
          （例：B<sub>3</sub>=G<sub>3</sub>, B<sub>2</sub>=B<sub>3</sub>⊕G<sub>2</sub>, B<sub>1</sub>=B<sub>2</sub>⊕G<sub>1</sub>, B<sub>0</sub>=B<sub>1</sub>⊕G<sub>0</sub>）
        </div>
      `
    },
    {
      id: 'b-6',
      short: '⑥FF・入力式',
      title: '⑥ FF励起表・入力方程式・FF変換の解き方（過去問 問6）',
      html: `
        <h4>1. 応用方程式の表を10秒で埋めるコツ</h4>
        <p>応用方程式は <strong><span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span></strong>。代入計算しなくても：</p>
        <div class="callout callout-ok">
          ・<strong>Q = 0 の行</strong> → <strong>g<sub>2</sub> の値</strong>をそのまま Q<sup>+</sup> に写す！<br>
          ・<strong>Q = 1 の行</strong> → <strong>g<sub>1</sub> の値</strong>をそのまま Q<sup>+</sup> に写す！
        </div>
        <h4>2. 励起表の覚え方（Q → Q<sup>+</sup>）</h4>
        <div class="table-wrap"><table class="logic-table">
          <thead><tr><th>Q→Q<sup>+</sup></th><th>SR (S,R)</th><th>JK (J,K)</th><th>T</th><th>D</th></tr></thead>
          <tbody>
            <tr><td class="mono-cell">0 → 0</td><td class="mono-cell">0, ×</td><td class="mono-cell">0, ×</td><td class="mono-cell">0</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">0 → 1</td><td class="mono-cell">1, 0</td><td class="mono-cell">1, ×</td><td class="mono-cell">1</td><td class="mono-cell">1</td></tr>
            <tr><td class="mono-cell">1 → 0</td><td class="mono-cell">0, 1</td><td class="mono-cell">×, 1</td><td class="mono-cell">1</td><td class="mono-cell">0</td></tr>
            <tr><td class="mono-cell">1 → 1</td><td class="mono-cell">×, 0</td><td class="mono-cell">×, 0</td><td class="mono-cell">0</td><td class="mono-cell">1</td></tr>
          </tbody>
        </table></div>
        <p style="font-size:13px;color:var(--ink-secondary)">※ JKの覚え方：「0から出発するときは K が必ず ×、1から出発するときは J が必ず ×」！</p>
        <h4>3. 「A-FFを使ってB-FFを設計せよ」の3ステップ黄金手順</h4>
        <ol>
          <li><strong>作りたいFF（B-FF）の特性方程式</strong>を書く（例：T-FFなら <span class="formula">Q<sup>+</sup> = ${ov('T')}Q + T${ov('Q')}</span>）。</li>
          <li><span class="formula">Q<sup>+</sup> = g<sub>1</sub>Q + g<sub>2</sub>${ov('Q')}</span> と見比べて <strong>g<sub>1</sub> と g<sub>2</sub></strong> を読み取る（例：g<sub>1</sub>=${ov('T')}, g<sub>2</sub>=T）。</li>
          <li><strong>使うFF（A-FF）の入力方程式</strong>に代入する！
            <div class="formula-block">
              SR：S=g<sub>2</sub>${ov('Q')}, R=${ov('g<sub>1</sub>')}Q ／ JK：<strong>J=g<sub>2</sub>, K=${ov('g<sub>1</sub>')}</strong><br>
              T：T=${ov('g<sub>1</sub>')}Q+g<sub>2</sub>${ov('Q')} ／ D：D=g<sub>1</sub>Q+g<sub>2</sub>${ov('Q')}
            </div>
          </li>
        </ol>
      `
    },
    {
      id: 'b-7',
      short: '⑦時間・カウンタ',
      title: '⑦ FF時間定数・非同期カウンタ計算（電卓なしテク付き）',
      html: `
        <h4>1. 3つの時間定数と2つの必須条件</h4>
        <ul>
          <li><strong>T<sub>setup</sub></strong>：クロックエッジの<strong>前</strong>に入力を止めておく時間</li>
          <li><strong>T<sub>hold</sub></strong>：クロックエッジの<strong>後</strong>に入力を保っておく時間</li>
          <li><strong>T<sub>acc</sub></strong>：クロックエッジから出力が変わるまでの遅れ（最小 T<sub>acc</sub><sup>-</sup>、最大 T<sub>acc</sub><sup>+</sup>）</li>
        </ul>
        <div class="formula-block">
          ① ホールド条件：<strong>T<sub>hold</sub> ≦ T<sub>acc</sub><sup>-</sup></strong>（違反するとメタステーブル発生）<br>
          ② クロック周期条件：<strong>T<sub>setup</sub> + T<sub>acc</sub><sup>+</sup> ≦ T<sub>Cp</sub></strong>
        </div>
        <h4>2. 非同期式カウンタの公式と必要FF数</h4>
        <div class="formula-block">
          ・N進カウンタに必要なFF数 n：<strong>2<sup>n-1</sup> &lt; N ≦ 2<sup>n</sup></strong>（5〜8進→3個、9〜16進→4個）<br>
          ・n段の累積遅延：<strong>n × T<sub>acc</sub></strong><br>
          ・正常動作の条件：<strong>T<sub>Cp</sub> &gt; n · T<sub>acc</sub></strong>　⇔　<strong>f<sub>Cp</sub> &lt; 1 / (n · T<sub>acc</sub>)</strong>
        </div>
        <div class="callout callout-exam">
          <div class="callout-title">電卓なし試験で超便利な単位換算ワザ！</div>
          ナノ秒（ns = 10<sup>-9</sup>秒）からメガヘルツ（MHz = 10<sup>6</sup>Hz）を出すときは：<br>
          <strong><span class="formula">f [MHz] = 1000 ÷ T [ns]</span></strong><br>
          例：T = 40 ns なら <code>1000 ÷ 40 = 25 MHz</code>、T = 20 ns なら <code>1000 ÷ 20 = 50 MHz</code> と暗算一発！
        </div>
      `
    }
  ];
})();
