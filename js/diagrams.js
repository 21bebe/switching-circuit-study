/* =========================================================
   SVG Circuit Diagrams & Timing Charts
   ========================================================= */
window.SwitchStudy = window.SwitchStudy || {};

window.SwitchStudy.Diagrams = {
  // Helper for standard logic gate SVG shapes
  _svg(w, h, inner) {
    return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" role="img" style="font-family:'JetBrains Mono','Noto Sans JP',sans-serif;">
      <style>
        .w { stroke:#0f172a; stroke-width:1.8; fill:none; stroke-linecap:round; stroke-linejoin:round; }
        .wb { stroke:#1d4ed8; stroke-width:2; fill:none; stroke-linecap:round; stroke-linejoin:round; }
        .wr { stroke:#dc2626; stroke-width:2; fill:none; stroke-linecap:round; stroke-linejoin:round; }
        .wg { stroke:#047857; stroke-width:2; fill:none; stroke-linecap:round; stroke-linejoin:round; }
        .wd { stroke:#94a3b8; stroke-width:1.2; stroke-dasharray:4 3; fill:none; }
        .box { fill:#ffffff; stroke:#0f172a; stroke-width:1.8; rx:4; }
        .box-b { fill:#eff6ff; stroke:#1d4ed8; stroke-width:1.8; rx:4; }
        .box-w { fill:#fffbeb; stroke:#b45309; stroke-width:1.8; rx:4; }
        .gate { fill:#ffffff; stroke:#0f172a; stroke-width:1.8; }
        .dot { fill:#0f172a; }
        .lbl { font-size:12px; fill:#0f172a; font-weight:600; }
        .lbl-s { font-size:10.5px; fill:#475569; font-weight:500; }
        .lbl-b { font-size:12px; fill:#1d4ed8; font-weight:700; }
        .lbl-r { font-size:11.5px; fill:#dc2626; font-weight:700; }
        .lbl-g { font-size:11.5px; fill:#047857; font-weight:700; }
      </style>
      ${inner}
    </svg>`;
  },

  _andGate(x, y, s = 1) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path class="gate" d="M0,0 L18,0 A16,16 0 0,1 18,32 L0,32 Z"/>
    </g>`;
  },

  _orGate(x, y, s = 1) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path class="gate" d="M0,0 Q10,16 0,32 L14,32 Q28,32 36,16 Q28,0 14,0 Z"/>
    </g>`;
  },

  _xorGate(x, y, s = 1) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path class="w" d="M-5,0 Q5,16 -5,32"/>
      <path class="gate" d="M0,0 Q10,16 0,32 L14,32 Q28,32 36,16 Q28,0 14,0 Z"/>
    </g>`;
  },

  _notGate(x, y, s = 1) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <polygon class="gate" points="0,0 20,10 0,20"/>
      <circle class="gate" cx="23.5" cy="10" r="3.5"/>
    </g>`;
  },

  halfAdder() {
    return this._svg(340, 140, `
      <!-- Inputs -->
      <text x="14" y="38" class="lbl">A</text>
      <text x="14" y="102" class="lbl">B</text>
      <path class="w" d="M30,34 L125,34"/>
      <path class="w" d="M30,98 L125,98"/>
      <!-- Branches -->
      <circle class="dot" cx="72" cy="34" r="3"/>
      <path class="w" d="M72,34 L72,82 L125,82"/>
      <circle class="dot" cx="92" cy="98" r="3"/>
      <path class="w" d="M92,98 L92,50 L125,50"/>
      <!-- XOR -->
      ${this._xorGate(126, 26)}
      <text x="133" y="46" class="lbl-s">XOR</text>
      <!-- AND -->
      ${this._andGate(126, 74)}
      <text x="131" y="94" class="lbl-s">AND</text>
      <!-- Outputs -->
      <path class="wb" d="M162,42 L230,42"/>
      <text x="238" y="46" class="lbl-b">S = A ⊕ B</text>
      <path class="wb" d="M160,90 L230,90"/>
      <text x="238" y="94" class="lbl-b">C = A · B</text>
    `);
  },

  fullAdder() {
    return this._svg(520, 190, `
      <text x="10" y="34" class="lbl">A</text>
      <text x="10" y="64" class="lbl">B</text>
      <text x="6" y="124" class="lbl">Cin</text>

      <!-- Wires into XOR1 -->
      <path class="w" d="M28,30 L94,30"/>
      <path class="w" d="M28,60 L94,60"/>
      <circle class="dot" cx="56" cy="30" r="3"/>
      <path class="w" d="M56,30 L56,144 L230,144"/>
      <circle class="dot" cx="72" cy="60" r="3"/>
      <path class="w" d="M72,60 L72,162 L230,162"/>

      <!-- XOR1 -->
      ${this._xorGate(95, 29)}
      <text x="142" y="36" class="lbl-s">A⊕B</text>
      <path class="w" d="M131,45 L228,45"/>
      <circle class="dot" cx="176" cy="45" r="3"/>
      <path class="w" d="M176,45 L176,102 L230,102"/>

      <!-- Cin wire -->
      <path class="w" d="M32,120 L196,120 L196,61 L228,61"/>
      <circle class="dot" cx="196" cy="120" r="3"/>
      <path class="w" d="M196,120 L230,120"/>

      <!-- XOR2 -> S -->
      ${this._xorGate(230, 37)}
      <path class="wb" d="M266,53 L395,53"/>
      <text x="402" y="57" class="lbl-b">S = Cin⊕(A⊕B)</text>

      <!-- AND1 & AND2 -->
      ${this._andGate(230, 95)}
      ${this._andGate(230, 137)}

      <!-- OR -> Cout -->
      <path class="w" d="M264,111 L304,111 L304,124 L330,124"/>
      <path class="w" d="M264,153 L304,153 L304,140 L330,140"/>
      ${this._orGate(328, 116)}
      <path class="wb" d="M364,132 L395,132"/>
      <text x="402" y="136" class="lbl-b">Cout = Cin(A⊕B)+AB</text>
    `);
  },

  parallelAdder4() {
    const blocks = [0, 1, 2, 3].map((i) => {
      const x = 420 - i * 115;
      return `
        <rect class="box-b" x="${x}" y="52" width="70" height="58"/>
        <text x="${x + 25}" y="86" class="lbl-b">FA${i}</text>
        <path class="w" d="M${x + 20},26 L${x + 20},52"/>
        <text x="${x + 13}" y="20" class="lbl">A${i}</text>
        <path class="w" d="M${x + 50},26 L${x + 50},52"/>
        <text x="${x + 43}" y="20" class="lbl">B${i}</text>
        <path class="wb" d="M${x + 35},110 L${x + 35},142"/>
        <text x="${x + 27}" y="158" class="lbl-b">S${i}</text>
      `;
    }).join('');
    return this._svg(560, 195, `
      ${blocks}
      <!-- Carry chain right to left -->
      <path class="wr" d="M525,81 L490,81"/>
      <text x="528" y="85" class="lbl-r">C⁻=0</text>
      <path class="wr" d="M420,81 L375,81"/>
      <text x="390" y="74" class="lbl-r">C0</text>
      <path class="wr" d="M305,81 L260,81"/>
      <text x="275" y="74" class="lbl-r">C1</text>
      <path class="wr" d="M190,81 L145,81"/>
      <text x="160" y="74" class="lbl-r">C2</text>
      <path class="wr" d="M75,81 L35,81"/>
      <text x="12" y="85" class="lbl-r">C3</text>
      <!-- Delay note -->
      <path class="wr" d="M490,178 L75,178" stroke-dasharray="4 3"/>
      <polygon points="75,178 84,173 84,183" fill="#dc2626"/>
      <text x="165" y="173" class="lbl-r">桁上げ伝搬遅延（下位から順に確定するまで待たされる）</text>
    `);
  },

  adderSubtractor4() {
    return this._svg(520, 210, `
      <rect class="box-w" x="150" y="20" width="210" height="54"/>
      <text x="182" y="44" class="lbl">4ビット 1の補数器</text>
      <text x="188" y="62" class="lbl-s">B'i = Bi ⊕ C̄ (XNOR)</text>

      <rect class="box-b" x="150" y="114" width="210" height="58"/>
      <text x="195" y="140" class="lbl-b">4ビット並列加算器</text>
      <text x="192" y="158" class="lbl-s">S = A + B' + C⁻</text>

      <!-- B inputs -->
      <path class="w" d="M210,4 L210,20"/>
      <path class="w" d="M255,4 L255,20"/>
      <path class="w" d="M300,4 L300,20"/>
      <text x="232" y="14" class="lbl-s">B3..B0</text>

      <!-- B' to adder -->
      <path class="w" d="M210,74 L210,114"/>
      <path class="w" d="M255,74 L255,114"/>
      <path class="w" d="M300,74 L300,114"/>
      <text x="310" y="98" class="lbl-s">B'3..B'0</text>

      <!-- A inputs -->
      <path class="w" d="M55,143 L150,143"/>
      <text x="12" y="147" class="lbl">A3..A0</text>

      <!-- Control C -->
      <path class="wr" d="M475,47 L360,47"/>
      <text x="415" y="34" class="lbl-r">制御 C</text>
      <text x="396" y="66" class="lbl-s">1:加算 / 0:減算</text>
      <circle class="dot" cx="420" cy="47" r="3"/>
      <path class="wr" d="M420,47 L420,104"/>
      ${this._notGate(410, 108, 0.9)}
      <path class="wr" d="M420,132 L420,143 L360,143"/>
      <text x="372" y="136" class="lbl-r">C⁻=C̄</text>

      <!-- Outputs -->
      <path class="wb" d="M255,172 L255,196"/>
      <text x="234" y="206" class="lbl-b">S3..S0</text>
    `);
  },

  claBlock() {
    return this._svg(540, 210, `
      <!-- Stage 1: G, P generators -->
      <rect class="box" x="20" y="22" width="110" height="42"/>
      <text x="34" y="40" class="lbl">G0=A0B0</text>
      <text x="34" y="56" class="lbl-s">P0=A0⊕B0</text>

      <rect class="box" x="20" y="84" width="110" height="42"/>
      <text x="34" y="102" class="lbl">G1=A1B1</text>
      <text x="34" y="118" class="lbl-s">P1=A1⊕B1</text>

      <rect class="box" x="20" y="146" width="110" height="42"/>
      <text x="34" y="164" class="lbl">G2,G3 / P2,P3</text>
      <text x="34" y="180" class="lbl-s">全桁を同時生成</text>

      <!-- Stage 2: CLA unit -->
      <rect class="box-b" x="190" y="24" width="175" height="162"/>
      <text x="208" y="54" class="lbl-b">桁上げ先見回路 (CLA)</text>
      <text x="202" y="80" class="lbl-s">C0 = C⁻P0 + G0</text>
      <text x="202" y="100" class="lbl-s">C1 = C⁻P0P1 + G0P1 + G1</text>
      <text x="202" y="120" class="lbl-s">C2 = ... (前段Ci不要!)</text>
      <text x="202" y="140" class="lbl-s">C3 = ... (並列一括計算)</text>
      <text x="210" y="170" class="lbl-g">高速：ゲート段数が一定</text>

      <!-- Arrows -->
      <path class="w" d="M130,43 L190,43"/>
      <path class="w" d="M130,105 L190,105"/>
      <path class="w" d="M130,167 L190,167"/>
      <path class="wr" d="M277,4 L277,24"/>
      <text x="284" y="16" class="lbl-r">C⁻</text>

      <!-- Stage 3: Sum XORs -->
      <rect class="box-w" x="420" y="42" width="105" height="126"/>
      <text x="434" y="70" class="lbl">和の計算</text>
      <text x="430" y="96" class="lbl-s">S0 = C⁻⊕P0</text>
      <text x="430" y="116" class="lbl-s">S1 = C0⊕P1</text>
      <text x="430" y="136" class="lbl-s">S2 = C1⊕P2</text>
      <text x="430" y="156" class="lbl-s">S3 = C2⊕P3</text>

      <path class="wb" d="M365,68 L420,68"/>
      <path class="wb" d="M365,105 L420,105"/>
      <path class="wb" d="M365,142 L420,142"/>
      <text x="372" y="61" class="lbl-b">C0..C2</text>
    `);
  },

  overflowDetector() {
    return this._svg(480, 175, `
      <rect class="box-w" x="95" y="34" width="76" height="56"/>
      <text x="108" y="58" class="lbl">符号部</text>
      <text x="115" y="76" class="lbl-s">FA3</text>

      <rect class="box-b" x="210" y="34" width="76" height="56"/>
      <text x="220" y="58" class="lbl-b">数値MSB</text>
      <text x="234" y="76" class="lbl-s">FA2</text>

      <rect class="box" x="325" y="34" width="120" height="56"/>
      <text x="342" y="66" class="lbl-s">下位 FA1, FA0</text>

      <!-- Carry lines -->
      <path class="w" d="M325,62 L286,62"/>
      <path class="wr" d="M210,62 L171,62"/>
      <text x="182" y="54" class="lbl-r">C2</text>
      <path class="wr" d="M95,62 L40,62"/>
      <text x="58" y="54" class="lbl-r">C3</text>

      <!-- Taps to XOR -->
      <circle class="dot" cx="62" cy="62" r="3"/>
      <path class="wr" d="M62,62 L62,126 L180,126"/>
      <circle class="dot" cx="190" cy="62" r="3"/>
      <path class="wr" d="M190,62 L190,108 L180,108 L180,142"/>
      <path class="wr" d="M190,62 L190,142 L180,142"/>

      ${this._xorGate(184, 118)}
      <path class="wr" d="M220,134 L270,134"/>
      <text x="278" y="138" class="lbl-r">Overflow V = C3 ⊕ C2</text>
      <text x="278" y="156" class="lbl-s">C3とC2が異なるとき 1（オーバーフロー）</text>
    `);
  },

  comparator2() {
    return this._svg(520, 235, `
      <!-- Upper 1-bit comparator -->
      <rect class="box-b" x="55" y="18" width="95" height="84"/>
      <text x="64" y="54" class="lbl-b">1bit比較器</text>
      <text x="72" y="72" class="lbl-s">(上位 A1,B1)</text>
      <path class="w" d="M24,42 L55,42"/><text x="6" y="46" class="lbl">A1</text>
      <path class="w" d="M24,78 L55,78"/><text x="6" y="82" class="lbl">B1</text>

      <!-- Lower 1-bit comparator -->
      <rect class="box-b" x="55" y="130" width="95" height="84"/>
      <text x="64" y="166" class="lbl-b">1bit比較器</text>
      <text x="72" y="184" class="lbl-s">(下位 A0,B0)</text>
      <path class="w" d="M24,154 L55,154"/><text x="6" y="158" class="lbl">A0</text>
      <path class="w" d="M24,190 L55,190"/><text x="6" y="194" class="lbl">B0</text>

      <!-- Z10 -> OR0 -->
      <path class="w" d="M150,34 L364,34"/>
      <text x="158" y="28" class="lbl-s">Z10 (A1&gt;B1)</text>

      <!-- Z11 trunk -->
      <path class="wb" d="M150,60 L225,60 L225,180 L280,180"/>
      <text x="158" y="54" class="lbl-b">Z11 (A1=B1)</text>
      <circle class="dot" cx="225" cy="60" r="3"/>
      <path class="wb" d="M225,60 L280,60"/>
      <circle class="dot" cx="225" cy="116" r="3"/>
      <path class="wb" d="M225,116 L280,116"/>

      <!-- Z12 -> OR2 -->
      <path class="w" d="M150,86 L195,86 L195,212 L364,212"/>
      <text x="158" y="82" class="lbl-s">Z12 (A1&lt;B1)</text>

      <!-- Z00 -> AND0 -->
      <path class="w" d="M150,146 L252,146 L252,76 L280,76"/>
      <text x="158" y="142" class="lbl-s">Z00</text>

      <!-- Z01 -> AND1 -->
      <path class="w" d="M150,172 L264,172 L264,132 L280,132"/>
      <text x="158" y="168" class="lbl-s">Z01</text>

      <!-- Z02 -> AND2 -->
      <path class="w" d="M150,196 L280,196"/>
      <text x="158" y="192" class="lbl-s">Z02</text>

      <!-- AND gates -->
      ${this._andGate(280, 52)}
      ${this._andGate(280, 108)}
      ${this._andGate(280, 172)}

      <!-- OR gates -->
      <path class="w" d="M314,68 L340,68 L340,50 L364,50"/>
      ${this._orGate(362, 26)}
      <path class="wb" d="M398,42 L438,42"/>
      <text x="444" y="46" class="lbl-b">Z0 (A&gt;B)</text>

      <path class="wb" d="M314,124 L438,124"/>
      <text x="444" y="128" class="lbl-b">Z1 (A=B)</text>

      <path class="w" d="M314,188 L340,188 L340,196 L364,196"/>
      ${this._orGate(362, 188)}
      <path class="wb" d="M398,204 L438,204"/>
      <text x="444" y="208" class="lbl-b">Z2 (A&lt;B)</text>
    `);
  },

  priorityEncoder2() {
    return this._svg(420, 155, `
      <text x="12" y="34" class="lbl">I3</text>
      <text x="12" y="72" class="lbl">I2</text>
      <text x="12" y="114" class="lbl">I1</text>
      <text x="12" y="144" class="lbl-s">I0 (未接続)</text>

      <path class="w" d="M32,30 L260,30"/>
      <circle class="dot" cx="80" cy="30" r="3"/>
      <path class="w" d="M80,30 L80,104 L260,104"/>

      <path class="w" d="M32,68 L220,68 L220,46 L260,46"/>
      <circle class="dot" cx="105" cy="68" r="3"/>
      <path class="w" d="M105,68 L105,86 L124,86"/>
      ${this._notGate(124, 76, 0.9)}
      <path class="w" d="M149,85 L186,85 L186,112"/>

      <path class="w" d="M32,110 L150,110 L150,128 L186,128"/>
      ${this._andGate(186, 104)}
      <path class="w" d="M220,120 L260,120"/>

      ${this._orGate(260, 22)}
      ${this._orGate(260, 96)}

      <path class="wb" d="M296,38 L330,38"/>
      <text x="336" y="42" class="lbl-b">Z1 = I2 + I3</text>
      <path class="wb" d="M296,112 L330,112"/>
      <text x="336" y="116" class="lbl-b">Z0 = Ī2·I1 + I3</text>
    `);
  },

  grayConverter3() {
    return this._svg(380, 155, `
      <text x="16" y="36" class="lbl">C (MSB)</text>
      <text x="16" y="84" class="lbl">B</text>
      <text x="16" y="132" class="lbl">A (LSB)</text>

      <path class="wb" d="M74,32 L264,32"/>
      <circle class="dot" cx="130" cy="32" r="3"/>
      <path class="w" d="M130,32 L130,66 L176,66"/>

      <path class="w" d="M74,80 L176,80"/>
      <circle class="dot" cx="130" cy="80" r="3"/>
      <path class="w" d="M130,80 L130,114 L176,114"/>

      <path class="w" d="M74,128 L176,128"/>

      ${this._xorGate(176, 58)}
      ${this._xorGate(176, 106)}

      <path class="wb" d="M212,74 L264,74"/>
      <path class="wb" d="M212,122 L264,122"/>

      <text x="272" y="36" class="lbl-b">G2 = C</text>
      <text x="272" y="78" class="lbl-b">G1 = C ⊕ B</text>
      <text x="272" y="126" class="lbl-b">G0 = B ⊕ A</text>
    `);
  },

  mux4From2() {
    return this._svg(480, 225, `
      <!-- MUX0 (A, B) -->
      <polygon class="box-b" points="110,20 175,35 175,85 110,100"/>
      <text x="122" y="54" class="lbl-s">0</text>
      <text x="122" y="78" class="lbl-s">1</text>
      <text x="136" y="65" class="lbl-b">MUX0</text>
      <path class="w" d="M40,46 L110,46"/><text x="18" y="50" class="lbl">A</text>
      <path class="w" d="M40,74 L110,74"/><text x="18" y="78" class="lbl">B</text>

      <!-- MUX1 (C, D) -->
      <polygon class="box-b" points="110,120 175,135 175,185 110,200"/>
      <text x="122" y="154" class="lbl-s">0</text>
      <text x="122" y="178" class="lbl-s">1</text>
      <text x="136" y="165" class="lbl-b">MUX1</text>
      <path class="w" d="M40,146 L110,146"/><text x="18" y="150" class="lbl">C</text>
      <path class="w" d="M40,174 L110,174"/><text x="18" y="178" class="lbl">D</text>

      <!-- MUX2 -->
      <polygon class="box-w" points="275,70 340,85 340,135 275,150"/>
      <text x="287" y="104" class="lbl-s">0</text>
      <text x="287" y="128" class="lbl-s">1</text>
      <text x="300" y="115" class="lbl">MUX2</text>

      <path class="w" d="M175,60 L225,60 L225,96 L275,96"/>
      <path class="w" d="M175,160 L225,160 L225,124 L275,124"/>

      <!-- Output -->
      <path class="wb" d="M340,110 L425,110"/>
      <text x="434" y="114" class="lbl-b">Z</text>

      <!-- Select lines -->
      <path class="wr" d="M142,216 L142,193"/>
      <path class="wr" d="M142,127 L142,93"/>
      <text x="134" y="224" class="lbl-r">S0 (下位)</text>

      <path class="wr" d="M308,216 L308,143"/>
      <text x="298" y="224" class="lbl-r">S1 (上位)</text>
    `);
  },

  seqBlock() {
    return this._svg(480, 170, `
      <rect class="box-b" x="120" y="18" width="220" height="58"/>
      <text x="176" y="45" class="lbl-b">組合せ論理回路</text>
      <text x="158" y="64" class="lbl-s">出力と次の状態を計算</text>

      <rect class="box-w" x="155" y="108" width="150" height="46"/>
      <text x="176" y="130" class="lbl">記憶素子 (FF)</text>
      <text x="180" y="146" class="lbl-s">現在状態 Q を保持</text>

      <!-- External input / output -->
      <path class="w" d="M24,42 L120,42"/>
      <polygon points="120,42 112,38 112,46" fill="#0f172a"/>
      <text x="14" y="34" class="lbl">外部入力</text>

      <path class="wb" d="M340,42 L440,42"/>
      <polygon points="440,42 432,38 432,46" fill="#1d4ed8"/>
      <text x="380" y="34" class="lbl-b">外部出力 Z</text>

      <!-- Next state Q+ -->
      <path class="wr" d="M340,60 L385,60 L385,131 L305,131"/>
      <polygon points="305,131 313,127 313,135" fill="#dc2626"/>
      <text x="392" y="102" class="lbl-r">次の状態 Q⁺</text>

      <!-- Present state Q -->
      <path class="wg" d="M155,131 L76,131 L76,60 L120,60"/>
      <polygon points="120,60 112,56 112,64" fill="#047857"/>
      <text x="6" y="102" class="lbl-g">現在状態 Q</text>
    `);
  },

  ffTiming() {
    return this._svg(560, 235, `
      <!-- Labels -->
      <text x="12" y="46" class="lbl">クロック Cp</text>
      <text x="12" y="108" class="lbl">入力 D (正常)</text>
      <text x="12" y="164" class="lbl-b">出力 Q</text>
      <text x="12" y="216" class="lbl-r">違反時 Q</text>

      <!-- Rising edge guide -->
      <line x1="230" y1="18" x2="230" y2="225" class="wd"/>
      <rect x="180" y="20" width="50" height="106" fill="#eff6ff" opacity="0.7"/>
      <rect x="230" y="20" width="42" height="106" fill="#fffbeb" opacity="0.8"/>

      <!-- Setup / Hold annotations -->
      <text x="184" y="16" class="lbl-b">Tsetup</text>
      <text x="234" y="16" class="lbl" style="fill:#b45309">Thold</text>

      <!-- Cp waveform -->
      <path class="w" d="M110,56 L230,56 L230,28 L380,28 L380,56 L530,56"/>
      <polygon points="230,36 225,45 235,45" fill="#0f172a"/>

      <!-- D waveform (valid: changes before Tsetup and after Thold) -->
      <path class="wg" d="M110,118 L156,118 L164,90 L300,90 L308,118 L530,118"/>
      <text x="192" y="84" class="lbl-g">変化禁止期間</text>

      <!-- Q waveform (valid: changes after Tacc) -->
      <path class="wb" d="M110,174 L298,174 L306,146 L530,146"/>
      <line x1="298" y1="136" x2="298" y2="180" class="wd"/>
      <path class="wb" d="M232,160 L296,160" stroke-width="1.3"/>
      <text x="246" y="155" class="lbl-b">Tacc</text>

      <!-- Metastable Q -->
      <path class="wr" d="M110,224 L250,224 L264,209 L276,216 L288,205 L300,217 L312,208 L328,212 L345,212 L360,196 L530,196"/>
      <text x="366" y="220" class="lbl-r">メタステーブル状態（0/1不定）</text>
    `);
  },

  asyncCounter4() {
    const ffs = [0, 1, 2, 3].map((i) => {
      const x = 75 + i * 115;
      return `
        <rect class="box-b" x="${x}" y="22" width="76" height="68"/>
        <text x="${x + 22}" y="44" class="lbl-b">FF${i}</text>
        <text x="${x + 12}" y="64" class="lbl-s">T${i} (負エッジ)</text>
        <circle class="gate" cx="${x - 4}" cy="56" r="4"/>
        <path class="wb" d="M${x + 76},42 L${x + 94},42 L${x + 94},12"/>
        <text x="${x + 86}" y="10" class="lbl-b">Q${i}</text>
        ${i < 3 ? `<path class="w" d="M${x + 94},42 L${x + 94},56 L${x + 107},56"/>` : ''}
      `;
    }).join('');
    return this._svg(560, 225, `
      ${ffs}
      <path class="wr" d="M22,56 L67,56"/>
      <text x="8" y="48" class="lbl-r">Cp</text>

      <!-- Timing delay illustration -->
      <text x="10" y="128" class="lbl">Cp</text>
      <path class="w" d="M55,132 L95,132 L95,114 L135,114 L135,132 L255,132 L255,114 L295,114 L295,132 L520,132"/>

      <text x="10" y="156" class="lbl-b">Q0</text>
      <path class="wb" d="M55,144 L152,144 L152,160 L520,160"/>
      <text x="158" y="154" class="lbl-s">+Tacc</text>

      <text x="10" y="182" class="lbl-b">Q1</text>
      <path class="wb" d="M55,170 L178,170 L178,186 L520,186"/>
      <text x="184" y="180" class="lbl-s">+2Tacc</text>

      <text x="10" y="208" class="lbl-r">Q3</text>
      <path class="wr" d="M55,212 L230,212 L230,196 L520,196"/>
      <text x="238" y="210" class="lbl-r">+4Tacc (TCp &gt; 4Tacc が必須!)</text>
    `);
  },

  asyncMod7() {
    return this._svg(540, 175, `
      <!-- FF0 -->
      <rect class="box-b" x="75" y="26" width="84" height="74"/>
      <text x="100" y="48" class="lbl-b">FF0 (JK)</text>
      <text x="82" y="66" class="lbl-s">J0 = Q1·Q2 の否定</text>
      <text x="82" y="84" class="lbl-s">K0 = 1</text>
      <path class="wr" d="M22,63 L75,63"/>
      <text x="12" y="57" class="lbl-r">Cp</text>

      <!-- FF1 -->
      <rect class="box-b" x="235" y="26" width="84" height="74"/>
      <text x="260" y="48" class="lbl-b">FF1 (JK)</text>
      <text x="246" y="68" class="lbl-s">J1=1, K1=1</text>
      <text x="242" y="86" class="lbl-s">Cp1=Q0+Q1Q2Cp</text>

      <!-- FF2 -->
      <rect class="box-b" x="395" y="26" width="84" height="74"/>
      <text x="420" y="48" class="lbl-b">FF2 (JK)</text>
      <text x="406" y="68" class="lbl-s">J2=1, K2=1</text>
      <text x="406" y="86" class="lbl-s">Cp2 = Q1</text>

      <!-- Connections -->
      <path class="wb" d="M159,46 L200,46 L200,63 L235,63"/>
      <text x="164" y="40" class="lbl-b">Q0</text>
      <path class="wb" d="M319,46 L360,46 L360,63 L395,63"/>
      <text x="324" y="40" class="lbl-b">Q1</text>
      <path class="wb" d="M479,46 L520,46"/>
      <text x="486" y="40" class="lbl-b">Q2</text>

      <!-- Explanation box -->
      <rect class="box-w" x="30" y="116" width="485" height="48"/>
      <text x="44" y="136" class="lbl">状態 6 (Q2Q1Q0 = 110) の次のクロックで 000 に戻す工夫：</text>
      <text x="44" y="154" class="lbl-s">① Q1=Q2=1 のとき J0=0 にして Q0 を 0→1 反転させない　② Cp1 に Cp を加えて Q1, Q2 を 1→0 に反転</text>
    `);
  }
};
