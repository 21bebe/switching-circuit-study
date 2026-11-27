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

  _nandGate(x, y, s = 1) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path class="gate" d="M0,0 L18,0 A16,16 0 0,1 18,32 L0,32 Z"/>
      <circle class="gate" cx="38" cy="16" r="4"/>
    </g>`;
  },

  _norGate(x, y, s = 1) {
    return `<g transform="translate(${x},${y}) scale(${s})">
      <path class="gate" d="M0,0 Q10,16 0,32 L14,32 Q28,32 36,16 Q28,0 14,0 Z"/>
      <circle class="gate" cx="40" cy="16" r="4"/>
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
  },

  /* ---------- 追加：教科書・演習の回路構成問題用 SVG 一式 ---------- */

  comparator1() {
    return this._svg(460, 175, `
      <text x="12" y="34" class="lbl">A</text>
      <text x="12" y="128" class="lbl">B</text>
      <path class="w" d="M28,30 L175,30"/>
      <path class="w" d="M28,124 L62,124 L62,148 L175,148"/>
      <!-- A NOT -> AND2 -->
      <circle class="dot" cx="55" cy="30" r="3"/>
      <path class="w" d="M55,30 L55,102 L78,102"/>
      ${this._notGate(78, 92, 0.9)}
      <path class="w" d="M103,101 L135,101 L135,132 L175,132"/>
      <!-- B NOT -> AND1 -->
      <circle class="dot" cx="62" cy="124" r="3"/>
      <path class="w" d="M62,124 L62,56 L78,56"/>
      ${this._notGate(78, 46, 0.9)}
      <path class="w" d="M103,55 L145,55 L145,46 L175,46"/>
      <!-- AND1 (Z0) & AND2 (Z2) -->
      ${this._andGate(175, 22)}
      ${this._andGate(175, 124)}
      <path class="wb" d="M209,38 L350,38"/>
      <text x="358" y="42" class="lbl-b">Z0 = AB̄ (A&gt;B)</text>
      <path class="wb" d="M209,140 L350,140"/>
      <text x="358" y="144" class="lbl-b">Z2 = ĀB (A&lt;B)</text>
      <!-- Taps to NOR -> Z1 -->
      <circle class="dot" cx="242" cy="38" r="3"/>
      <path class="w" d="M242,38 L242,80 L276,80"/>
      <circle class="dot" cx="242" cy="140" r="3"/>
      <path class="w" d="M242,140 L242,96 L276,96"/>
      ${this._norGate(274, 72)}
      <path class="wb" d="M318,88 L350,88"/>
      <text x="358" y="92" class="lbl-b">Z1 = (Z0+Z2)̄ (A=B)</text>
    `);
  },

  comparator3() {
    return this._svg(540, 265, `
      <rect class="box-b" x="45" y="16" width="88" height="62"/>
      <text x="53" y="44" class="lbl-b">1bit比較2</text>
      <text x="58" y="62" class="lbl-s">(A2, B2)</text>
      <path class="w" d="M18,34 L45,34"/><text x="2" y="38" class="lbl-s">A2</text>
      <path class="w" d="M18,60 L45,60"/><text x="2" y="64" class="lbl-s">B2</text>

      <rect class="box-b" x="45" y="100" width="88" height="62"/>
      <text x="53" y="128" class="lbl-b">1bit比較1</text>
      <text x="58" y="146" class="lbl-s">(A1, B1)</text>
      <path class="w" d="M18,118 L45,118"/><text x="2" y="122" class="lbl-s">A1</text>
      <path class="w" d="M18,144 L45,144"/><text x="2" y="148" class="lbl-s">B1</text>

      <rect class="box-b" x="45" y="184" width="88" height="62"/>
      <text x="53" y="212" class="lbl-b">1bit比較0</text>
      <text x="58" y="230" class="lbl-s">(A0, B0)</text>
      <path class="w" d="M18,202 L45,202"/><text x="2" y="206" class="lbl-s">A0</text>
      <path class="w" d="M18,228 L45,228"/><text x="2" y="232" class="lbl-s">B0</text>

      <!-- Logic summary blocks -->
      <rect class="box" x="195" y="18" width="215" height="62"/>
      <text x="206" y="42" class="lbl">OR + AND（A &gt; B 判定）</text>
      <text x="206" y="64" class="lbl-s">Z20 + Z21·Z10 + Z21·Z11·Z00</text>

      <rect class="box" x="195" y="102" width="215" height="58"/>
      <text x="206" y="126" class="lbl">3入力AND（A = B 判定）</text>
      <text x="206" y="146" class="lbl-s">Z21 · Z11 · Z01</text>

      <rect class="box" x="195" y="184" width="215" height="62"/>
      <text x="206" y="208" class="lbl">OR + AND（A &lt; B 判定）</text>
      <text x="206" y="230" class="lbl-s">Z22 + Z21·Z12 + Z21·Z11·Z02</text>

      <!-- Connections -->
      <path class="w" d="M133,47 L195,47"/>
      <path class="w" d="M133,131 L195,131"/>
      <path class="w" d="M133,215 L195,215"/>
      <path class="wd" d="M164,47 L164,215"/>
      <text x="137" y="40" class="lbl-s">Z20..22</text>
      <text x="137" y="124" class="lbl-s">Z10..12</text>
      <text x="137" y="208" class="lbl-s">Z00..02</text>

      <!-- Outputs -->
      <path class="wb" d="M410,49 L455,49"/><text x="462" y="53" class="lbl-b">Z0 (A&gt;B)</text>
      <path class="wb" d="M410,131 L455,131"/><text x="462" y="135" class="lbl-b">Z1 (A=B)</text>
      <path class="wb" d="M410,215 L455,215"/><text x="462" y="219" class="lbl-b">Z2 (A&lt;B)</text>
    `);
  },

  encoder2() {
    return this._svg(360, 145, `
      <text x="12" y="28" class="lbl">I3</text>
      <text x="12" y="62" class="lbl">I2</text>
      <text x="12" y="96" class="lbl">I1</text>
      <text x="12" y="128" class="lbl-s">I0 (未接続)</text>
      <path class="w" d="M32,24 L152,24"/>
      <circle class="dot" cx="85" cy="24" r="3"/>
      <path class="w" d="M85,24 L85,78 L152,78"/>
      <path class="w" d="M32,58 L120,58 L120,40 L152,40"/>
      <path class="w" d="M32,92 L152,92"/>
      ${this._orGate(150, 16)}
      ${this._orGate(150, 70)}
      <path class="wb" d="M186,32 L230,32"/><text x="238" y="36" class="lbl-b">Z1 = I2 + I3</text>
      <path class="wb" d="M186,86 L230,86"/><text x="238" y="90" class="lbl-b">Z0 = I1 + I3</text>
    `);
  },

  priorityEncoder8() {
    return this._svg(540, 225, `
      <text x="8" y="34" class="lbl">I7..I0</text>
      <text x="8" y="198" class="lbl-r">ĒĪ (0でON)</text>
      <path class="w" d="M52,30 L105,30 L105,155"/>
      <path class="wr" d="M76,194 L112,194"/>
      ${this._notGate(112, 184, 0.9)}
      <path class="wr" d="M136,193 L410,193 L410,36"/>
      <text x="148" y="186" class="lbl-r">EI (有効時=1) を全出力ANDへ共通供給</text>

      <!-- Z2 -->
      <rect class="box-b" x="125" y="16" width="235" height="34"/>
      <text x="136" y="37" class="lbl-s">OR: I7 + I6 + I5 + I4</text>
      ${this._andGate(395, 17)}
      <path class="w" d="M360,33 L395,33"/>
      <path class="wb" d="M429,33 L465,33"/><text x="472" y="37" class="lbl-b">Z2</text>

      <!-- Z1 -->
      <rect class="box-b" x="125" y="60" width="235" height="34"/>
      <text x="136" y="81" class="lbl-s">OR: I7 + I6 + Ī5Ī4I3 + Ī5Ī4I2</text>
      ${this._andGate(395, 61)}
      <path class="w" d="M360,77 L395,77"/>
      <path class="wb" d="M429,77 L465,77"/><text x="472" y="81" class="lbl-b">Z1</text>

      <!-- Z0 -->
      <rect class="box-b" x="125" y="104" width="235" height="34"/>
      <text x="136" y="125" class="lbl-s">OR: I7 + Ī6I5 + Ī6Ī4I3 + Ī6Ī4Ī2I1</text>
      ${this._andGate(395, 105)}
      <path class="w" d="M360,121 L395,121"/>
      <path class="wb" d="M429,121 L465,121"/><text x="472" y="125" class="lbl-b">Z0</text>

      <!-- GS -->
      <rect class="box-w" x="125" y="146" width="235" height="30"/>
      <text x="136" y="165" class="lbl-s">8入力OR: I7 + I6 + … + I1 + I0</text>
      ${this._andGate(395, 146)}
      <path class="w" d="M360,161 L395,161"/>
      <path class="wb" d="M429,161 L465,161"/><text x="472" y="165" class="lbl-b">GS</text>
    `);
  },

  decoder2() {
    return this._svg(420, 200, `
      <text x="18" y="20" class="lbl">B</text>
      <text x="98" y="20" class="lbl">A</text>
      <!-- Vertical rails: B, B̄, A, Ā -->
      <path class="w" d="M22,26 L22,188"/>
      <path class="w" d="M22,36 L40,36"/>
      ${this._notGate(40, 26, 0.8)}
      <path class="w" d="M62,34 L62,188"/>
      <text x="58" y="20" class="lbl-s">B̄</text>

      <path class="w" d="M102,26 L102,188"/>
      <path class="w" d="M102,36 L120,36"/>
      ${this._notGate(120, 26, 0.8)}
      <path class="w" d="M142,34 L142,188"/>
      <text x="138" y="20" class="lbl-s">Ā</text>

      <!-- 4 AND gates -->
      <!-- Z0 = B̄Ā -->
      <circle class="dot" cx="62" cy="58" r="3"/><path class="w" d="M62,58 L205,58"/>
      <circle class="dot" cx="142" cy="70" r="3"/><path class="w" d="M142,70 L205,70"/>
      ${this._andGate(205, 48, 0.9)}
      <path class="wb" d="M236,62 L285,62"/><text x="292" y="66" class="lbl-b">Z0 = B̄Ā</text>

      <!-- Z1 = B̄A -->
      <circle class="dot" cx="62" cy="96" r="3"/><path class="w" d="M62,96 L205,96"/>
      <circle class="dot" cx="102" cy="108" r="3"/><path class="w" d="M102,108 L205,108"/>
      ${this._andGate(205, 86, 0.9)}
      <path class="wb" d="M236,100 L285,100"/><text x="292" y="104" class="lbl-b">Z1 = B̄A</text>

      <!-- Z2 = BĀ -->
      <circle class="dot" cx="22" cy="134" r="3"/><path class="w" d="M22,134 L205,134"/>
      <circle class="dot" cx="142" cy="146" r="3"/><path class="w" d="M142,146 L205,146"/>
      ${this._andGate(205, 124, 0.9)}
      <path class="wb" d="M236,138 L285,138"/><text x="292" y="142" class="lbl-b">Z2 = BĀ</text>

      <!-- Z3 = BA -->
      <circle class="dot" cx="22" cy="172" r="3"/><path class="w" d="M22,172 L205,172"/>
      <circle class="dot" cx="102" cy="184" r="3"/><path class="w" d="M102,184 L205,184"/>
      ${this._andGate(205, 162, 0.9)}
      <path class="wb" d="M236,176 L285,176"/><text x="292" y="180" class="lbl-b">Z3 = BA</text>
    `);
  },

  bcdDecoder() {
    const rows = [
      ['Z0', 'D̄C̄B̄Ā (4入力AND)'], ['Z1', 'D̄C̄B̄A (4入力AND)'],
      ['Z2', 'C̄BĀ (3入力AND)'], ['Z3', 'C̄BA (3入力AND)'],
      ['Z4', 'CB̄Ā (3入力AND)'], ['Z5', 'CB̄A (3入力AND)'],
      ['Z6', 'CBĀ (3入力AND)'], ['Z7', 'CBA (3入力AND)'],
      ['Z8', 'DĀ (2入力AND)'], ['Z9', 'DA (2入力AND)']
    ];
    const items = rows.map((r, i) => {
      const col = i < 5 ? 0 : 1;
      const row = i % 5;
      const x = 135 + col * 205;
      const y = 16 + row * 38;
      return `
        <path class="w" d="M${x - 24},${y + 14} L${x},${y + 14}"/>
        <rect class="box-b" x="${x}" y="${y}" width="130" height="28"/>
        <text x="${x + 8}" y="${y + 18}" class="lbl-s">${r[1]}</text>
        <path class="wb" d="M${x + 130},${y + 14} L${x + 150},${y + 14}"/>
        <text x="${x + 154}" y="${y + 18}" class="lbl-b">${r[0]}</text>
      `;
    }).join('');
    return this._svg(540, 215, `
      <rect class="box-w" x="14" y="26" width="82" height="162"/>
      <text x="28" y="64" class="lbl">入力バス</text>
      <text x="24" y="90" class="lbl-s">D, D̄</text>
      <text x="24" y="112" class="lbl-s">C, C̄</text>
      <text x="24" y="134" class="lbl-s">B, B̄</text>
      <text x="24" y="156" class="lbl-s">A, Ā</text>
      <text x="20" y="176" class="lbl-s">(NOT×4)</text>
      <path class="w" d="M96,107 L111,107 L111,30 L111,182"/>
      ${items}
    `);
  },

  mux4Gate() {
    const chs = [
      ['A', 'S̄1 S̄0 EI', 24],
      ['B', 'S̄1 S0 EI', 68],
      ['C', 'S1 S̄0 EI', 112],
      ['D', 'S1 S0 EI', 156]
    ];
    const gates = chs.map(([name, cond, y]) => `
      <text x="12" y="${y + 14}" class="lbl">${name}</text>
      <path class="w" d="M28,${y + 10} L165,${y + 10}"/>
      <text x="42" y="${y + 24}" class="lbl-s">${cond}</text>
      <path class="wr" d="M135,${y + 22} L165,${y + 22}"/>
      ${this._andGate(165, y, 0.9)}
      <path class="w" d="M196,${y + 14} L275,${y + 14} L275,104 L308,104"/>
    `).join('');
    return this._svg(460, 210, `
      <rect class="box-w" x="34" y="184" width="160" height="22"/>
      <text x="42" y="199" class="lbl-s">制御: S1,S̄1, S0,S̄0, EI (NOT×3)</text>
      ${gates}
      ${this._orGate(306, 88)}
      <path class="wb" d="M342,104 L390,104"/>
      <text x="396" y="108" class="lbl-b">Z</text>
      <text x="302" y="138" class="lbl-s">4入力OR</text>
    `);
  },

  mux4bit2ch() {
    const bits = [3, 2, 1, 0].map((b, idx) => {
      const y = 16 + idx * 46;
      return `
        <text x="10" y="${y + 14}" class="lbl">A${b}</text>
        <text x="10" y="${y + 34}" class="lbl">B${b}</text>
        <path class="w" d="M32,${y + 10} L115,${y + 10}"/>
        <path class="w" d="M32,${y + 30} L115,${y + 30}"/>
        <rect class="box-b" x="115" y="${y + 2}" width="175" height="34"/>
        <text x="124" y="${y + 23}" class="lbl-s">(A${b}·S + B${b}·S̄) · EI</text>
        <path class="wb" d="M290,${y + 19} L350,${y + 19}"/>
        <text x="358" y="${y + 23}" class="lbl-b">Z${b}</text>
      `;
    }).join('');
    return this._svg(460, 225, `
      ${bits}
      <rect class="box-w" x="85" y="198" width="245" height="22"/>
      <text x="95" y="213" class="lbl-s">共通制御：S, S̄, EI（各ビット3入力AND×2＋OR×1）</text>
    `);
  },

  demux2bit4ch() {
    const chs = [
      ['ch.0 (S̄1S̄0)', 'Z01, Z00', 18],
      ['ch.1 (S̄1S0)', 'Z11, Z10', 64],
      ['ch.2 (S1S̄0)', 'Z21, Z20', 110],
      ['ch.3 (S1S0)', 'Z31, Z30', 156]
    ];
    const blocks = chs.map(([label, out, y]) => `
      <path class="w" d="M112,${y + 16} L165,${y + 16}"/>
      <rect class="box-b" x="165" y="${y}" width="185" height="34"/>
      <text x="175" y="${y + 21}" class="lbl-s">4入力AND×2：Di·${label}·EI</text>
      <path class="wb" d="M350,${y + 17} L405,${y + 17}"/>
      <text x="412" y="${y + 21}" class="lbl-b">${out}</text>
    `).join('');
    return this._svg(500, 215, `
      <rect class="box-w" x="14" y="45" width="98" height="110"/>
      <text x="26" y="76" class="lbl">入力データ</text>
      <text x="34" y="98" class="lbl-b">D1, D0</text>
      <text x="24" y="124" class="lbl-s">制御: S1,S0</text>
      <text x="24" y="142" class="lbl-s">ĒĪ (NOT×3)</text>
      <path class="w" d="M112,34 L112,172"/>
      ${blocks}
    `);
  },

  demux4bit2ch() {
    return this._svg(500, 175, `
      <rect class="box-w" x="16" y="34" width="110" height="96"/>
      <text x="28" y="64" class="lbl">4ビット入力</text>
      <text x="28" y="86" class="lbl-b">D3, D2, D1, D0</text>
      <text x="28" y="112" class="lbl-s">S, ĒĪ (NOT×2)</text>

      <path class="w" d="M126,56 L190,56"/>
      <rect class="box-b" x="190" y="24" width="185" height="54"/>
      <text x="200" y="46" class="lbl-b">ch.0 用 3入力AND×4</text>
      <text x="200" y="66" class="lbl-s">Z0i = Di · S̄ · EI (i=0..3)</text>
      <path class="wb" d="M375,51 L420,51"/><text x="426" y="55" class="lbl-b">Z03..Z00</text>

      <path class="w" d="M126,108 L190,108"/>
      <rect class="box-b" x="190" y="92" width="185" height="54"/>
      <text x="200" y="114" class="lbl-b">ch.1 用 3入力AND×4</text>
      <text x="200" y="134" class="lbl-s">Z1i = Di · S · EI (i=0..3)</text>
      <path class="wb" d="M375,119 L420,119"/><text x="426" y="123" class="lbl-b">Z13..Z10</text>
    `);
  },

  cla2bit() {
    return this._svg(540, 215, `
      <!-- G, P blocks -->
      <rect class="box" x="16" y="20" width="118" height="66"/>
      <text x="26" y="44" class="lbl">下位 (A0, B0)</text>
      <text x="26" y="62" class="lbl-s">G0 = A0·B0</text>
      <text x="26" y="78" class="lbl-s">P0 = A0⊕B0</text>

      <rect class="box" x="16" y="114" width="118" height="66"/>
      <text x="26" y="138" class="lbl">上位 (A1, B1)</text>
      <text x="26" y="156" class="lbl-s">G1 = A1·B1</text>
      <text x="26" y="172" class="lbl-s">P1 = A1⊕B1</text>

      <!-- CLA Carry Generator -->
      <rect class="box-b" x="180" y="18" width="190" height="164"/>
      <text x="204" y="42" class="lbl-b">2ビットCLA回路</text>
      <text x="190" y="70" class="lbl-s">C0 = C⁻P0 + G0</text>
      <text x="190" y="90" class="lbl-s">(2入力AND×1 + OR×1)</text>
      <line x1="190" y1="104" x2="360" y2="104" class="wd"/>
      <text x="190" y="126" class="lbl-s">C1 = C⁻P0P1 + G0P1 + G1</text>
      <text x="190" y="146" class="lbl-s">(3入力AND×1 + 2入力AND×1</text>
      <text x="190" y="164" class="lbl-s"> ＋ 3入力OR×1)</text>

      <path class="w" d="M134,53 L180,53"/>
      <path class="w" d="M134,147 L180,147"/>
      <path class="wr" d="M275,2 L275,18"/><text x="282" y="14" class="lbl-r">C⁻</text>

      <!-- Sums & C1 output -->
      <rect class="box-w" x="412" y="24" width="112" height="50"/>
      <text x="424" y="46" class="lbl">XOR (S0)</text>
      <text x="422" y="64" class="lbl-s">S0 = C⁻ ⊕ P0</text>

      <rect class="box-w" x="412" y="88" width="112" height="50"/>
      <text x="424" y="110" class="lbl">XOR (S1)</text>
      <text x="422" y="128" class="lbl-s">S1 = C0 ⊕ P1</text>

      <path class="wb" d="M370,113 L412,113"/><text x="378" y="106" class="lbl-b">C0</text>
      <path class="wr" d="M370,164 L445,164"/><text x="452" y="168" class="lbl-r">C1 (最上位桁上り)</text>
    `);
  },

  bcdToGray4() {
    return this._svg(410, 195, `
      <text x="14" y="32" class="lbl">D (MSB)</text>
      <text x="14" y="76" class="lbl">C</text>
      <text x="14" y="122" class="lbl">B</text>
      <text x="14" y="168" class="lbl">A (LSB)</text>

      <path class="wb" d="M74,28 L272,28"/>
      <circle class="dot" cx="122" cy="28" r="3"/>
      <path class="w" d="M122,28 L122,60 L176,60"/>

      <path class="w" d="M74,72 L176,72"/>
      <circle class="dot" cx="122" cy="72" r="3"/>
      <path class="w" d="M122,72 L122,106 L176,106"/>

      <path class="w" d="M74,118 L176,118"/>
      <circle class="dot" cx="122" cy="118" r="3"/>
      <path class="w" d="M122,118 L122,152 L176,152"/>

      <path class="w" d="M74,164 L176,164"/>

      <!-- OR for G2 (BCD don't-care simplification!), XOR for G1, G0 -->
      ${this._orGate(174, 50)}
      <text x="184" y="70" class="lbl-r">OR</text>
      ${this._xorGate(176, 98)}
      ${this._xorGate(176, 144)}

      <path class="wb" d="M210,66 L272,66"/>
      <path class="wb" d="M212,114 L272,114"/>
      <path class="wb" d="M212,160 L272,160"/>

      <text x="280" y="32" class="lbl-b">G3 = D</text>
      <text x="280" y="70" class="lbl-r">G2 = C + D (OR!)</text>
      <text x="280" y="118" class="lbl-b">G1 = B ⊕ C</text>
      <text x="280" y="164" class="lbl-b">G0 = A ⊕ B</text>
    `);
  },

  grayToBin4() {
    return this._svg(460, 195, `
      <text x="14" y="32" class="lbl">G3</text>
      <text x="14" y="78" class="lbl">G2</text>
      <text x="14" y="124" class="lbl">G1</text>
      <text x="14" y="170" class="lbl">G0</text>

      <!-- B3 = G3 -->
      <path class="wb" d="M40,28 L345,28"/>
      <circle class="dot" cx="110" cy="28" r="3"/>
      <path class="w" d="M110,28 L110,62 L135,62"/>

      <!-- B2 = B3 XOR G2 -->
      <path class="w" d="M40,74 L135,74"/>
      ${this._xorGate(135, 52)}
      <path class="wb" d="M171,68 L345,68"/>
      <circle class="dot" cx="195" cy="68" r="3"/>
      <path class="w" d="M195,68 L195,108 L218,108"/>

      <!-- B1 = B2 XOR G1 -->
      <path class="w" d="M40,120 L218,120"/>
      ${this._xorGate(218, 98)}
      <path class="wb" d="M254,114 L345,114"/>
      <circle class="dot" cx="278" cy="114" r="3"/>
      <path class="w" d="M278,114 L278,154 L300,154"/>

      <!-- B0 = B1 XOR G0 -->
      <path class="w" d="M40,166 L300,166"/>
      ${this._xorGate(300, 144)}
      <path class="wb" d="M336,160 L345,160"/>

      <text x="352" y="32" class="lbl-b">B3 = G3</text>
      <text x="352" y="72" class="lbl-b">B2 = B3⊕G2</text>
      <text x="352" y="118" class="lbl-b">B1 = B2⊕G1</text>
      <text x="352" y="164" class="lbl-b">B0 = B1⊕G0</text>
    `);
  },

  srLatchNandNor() {
    return this._svg(540, 165, `
      <!-- Left: NAND SR Latch -->
      <text x="60" y="18" class="lbl-b">(a) NAND構成（負論理 S̄, R̄）</text>
      <text x="16" y="46" class="lbl">S̄</text>
      <text x="16" y="138" class="lbl">R̄</text>
      <path class="w" d="M34,42 L95,42"/>
      <path class="w" d="M34,134 L95,134"/>
      ${this._nandGate(95, 34)}
      ${this._nandGate(95, 110)}
      <path class="wb" d="M137,50 L218,50"/><text x="224" y="54" class="lbl-b">Q</text>
      <path class="wb" d="M137,126 L218,126"/><text x="224" y="130" class="lbl-b">Q̄</text>
      <!-- Cross feedback -->
      <circle class="dot" cx="168" cy="50" r="3"/>
      <path class="wr" d="M168,50 L168,78 L72,102 L72,118 L95,118"/>
      <circle class="dot" cx="168" cy="126" r="3"/>
      <path class="wg" d="M168,126 L168,100 L72,74 L72,58 L95,58"/>

      <!-- Divider -->
      <line x1="268" y1="12" x2="268" y2="155" class="wd"/>

      <!-- Right: NOR SR Latch -->
      <text x="320" y="18" class="lbl-b">(b) NOR構成（正論理 R, S）</text>
      <text x="284" y="46" class="lbl">R</text>
      <text x="284" y="138" class="lbl">S</text>
      <path class="w" d="M302,42 L364,42"/>
      <path class="w" d="M302,134 L364,134"/>
      ${this._norGate(362, 34)}
      ${this._norGate(362, 110)}
      <path class="wb" d="M406,50 L488,50"/><text x="494" y="54" class="lbl-b">Q</text>
      <path class="wb" d="M406,126 L488,126"/><text x="494" y="130" class="lbl-b">Q̄</text>
      <!-- Cross feedback -->
      <circle class="dot" cx="438" cy="50" r="3"/>
      <path class="wr" d="M438,50 L438,78 L340,102 L340,118 L364,118"/>
      <circle class="dot" cx="438" cy="126" r="3"/>
      <path class="wg" d="M438,126 L438,100 L340,74 L340,58 L364,58"/>
    `);
  },

  srToT() {
    return this._svg(420, 170, `
      <text x="16" y="88" class="lbl">T</text>
      <path class="w" d="M32,84 L75,84"/>
      <circle class="dot" cx="75" cy="84" r="3"/>
      <path class="w" d="M75,84 L75,58 L112,58"/>
      <path class="w" d="M75,84 L75,112 L112,112"/>
      ${this._andGate(112, 34)}
      ${this._andGate(112, 102)}

      <!-- SR-FF -->
      <rect class="box-b" x="215" y="34" width="96" height="100"/>
      <text x="240" y="88" class="lbl-b">SR-FF</text>
      <text x="222" y="54" class="lbl-s">S</text>
      <text x="222" y="122" class="lbl-s">R</text>
      <text x="294" y="54" class="lbl-s">Q</text>
      <text x="292" y="122" class="lbl-s">Q̄</text>

      <path class="w" d="M146,50 L215,50"/><text x="158" y="44" class="lbl-s">S=TQ̄</text>
      <path class="w" d="M146,118 L215,118"/><text x="158" y="112" class="lbl-s">R=TQ</text>

      <path class="wb" d="M311,50 L375,50"/><text x="382" y="54" class="lbl-b">Q</text>
      <path class="wb" d="M311,118 L375,118"/><text x="382" y="122" class="lbl-b">Q̄</text>

      <!-- Feedback: Q -> lower AND, Q̄ -> upper AND -->
      <circle class="dot" cx="342" cy="50" r="3"/>
      <path class="wr" d="M342,50 L342,154 L94,154 L94,126 L112,126"/>
      <circle class="dot" cx="356" cy="118" r="3"/>
      <path class="wg" d="M356,118 L356,16 L94,16 L94,42 L112,42"/>
    `);
  },

  srToJK() {
    return this._svg(440, 175, `
      <text x="14" y="64" class="lbl">J</text>
      <text x="14" y="118" class="lbl">K</text>
      <path class="w" d="M30,60 L112,60"/>
      <path class="w" d="M30,114 L112,114"/>
      ${this._andGate(112, 36)}
      ${this._andGate(112, 104)}

      <rect class="box-b" x="220" y="34" width="102" height="104"/>
      <text x="248" y="86" class="lbl-b">SR-FF</text>
      <text x="228" y="56" class="lbl-s">S</text>
      <text x="228" y="124" class="lbl-s">R</text>
      <text x="304" y="56" class="lbl-s">Q</text>
      <text x="302" y="124" class="lbl-s">Q̄</text>

      <path class="w" d="M146,52 L220,52"/><text x="158" y="46" class="lbl-s">S=JQ̄</text>
      <path class="w" d="M146,120 L220,120"/><text x="158" y="114" class="lbl-s">R=KQ</text>

      <path class="wb" d="M322,52 L390,52"/><text x="396" y="56" class="lbl-b">Q</text>
      <path class="wb" d="M322,120 L390,120"/><text x="396" y="124" class="lbl-b">Q̄</text>

      <!-- Feedback -->
      <circle class="dot" cx="352" cy="52" r="3"/>
      <path class="wr" d="M352,52 L352,158 L88,158 L88,128 L112,128"/>
      <circle class="dot" cx="366" cy="120" r="3"/>
      <path class="wg" d="M366,120 L366,16 L88,16 L88,44 L112,44"/>
    `);
  },

  jkToT() {
    return this._svg(520, 145, `
      <!-- (a) Synchronous J=K=T -->
      <text x="32" y="18" class="lbl-b">(a) 同期型 (J = K = T)</text>
      <text x="14" y="76" class="lbl">T</text>
      <path class="w" d="M30,72 L62,72"/>
      <circle class="dot" cx="62" cy="72" r="3"/>
      <path class="w" d="M62,72 L62,48 L96,48"/>
      <path class="w" d="M62,72 L62,108 L96,108"/>
      <path class="wr" d="M30,124 L76,124 L76,78 L96,78"/>
      <text x="8" y="128" class="lbl-r">Cp</text>
      <rect class="box-b" x="96" y="32" width="88" height="92"/>
      <text x="118" y="82" class="lbl-b">JK-FF</text>
      <text x="102" y="52" class="lbl-s">J</text>
      <text x="102" y="82" class="lbl-s">Cp</text>
      <text x="102" y="112" class="lbl-s">K</text>
      <path class="wb" d="M184,52 L222,52"/><text x="226" y="56" class="lbl-b">Q</text>
      <path class="wb" d="M184,106 L222,106"/><text x="226" y="110" class="lbl-b">Q̄</text>

      <line x1="258" y1="12" x2="258" y2="136" class="wd"/>

      <!-- (b) Practical J=K=1, T -> neg edge Cp -->
      <text x="292" y="18" class="lbl-b">(b) 実用型 (J=K=1, T→Cp)</text>
      <text x="284" y="52" class="lbl-g">1</text>
      <text x="284" y="112" class="lbl-g">1</text>
      <path class="wg" d="M298,48 L352,48"/>
      <path class="wg" d="M298,108 L352,108"/>
      <text x="282" y="82" class="lbl-r">T</text>
      <path class="wr" d="M298,78 L344,78"/>
      <circle class="gate" cx="348" cy="78" r="4"/>
      <rect class="box-b" x="352" y="32" width="88" height="92"/>
      <text x="374" y="82" class="lbl-b">JK-FF</text>
      <text x="358" y="52" class="lbl-s">J</text>
      <text x="358" y="82" class="lbl-s">Cp</text>
      <text x="358" y="112" class="lbl-s">K</text>
      <path class="wb" d="M440,52 L480,52"/><text x="484" y="56" class="lbl-b">Q</text>
      <path class="wb" d="M440,106 L480,106"/><text x="484" y="110" class="lbl-b">Q̄</text>
    `);
  },

  srToD() {
    return this._svg(380, 130, `
      <text x="16" y="44" class="lbl">D</text>
      <path class="w" d="M34,40 L175,40"/>
      <circle class="dot" cx="68" cy="40" r="3"/>
      <path class="w" d="M68,40 L68,94 L95,94"/>
      ${this._notGate(95, 84, 0.9)}
      <path class="w" d="M120,93 L175,93"/>
      <text x="132" y="34" class="lbl-s">S=D</text>
      <text x="132" y="86" class="lbl-s">R=D̄</text>
      <rect class="box-b" x="175" y="22" width="96" height="90"/>
      <text x="200" y="72" class="lbl-b">SR-FF</text>
      <text x="182" y="44" class="lbl-s">S</text>
      <text x="182" y="96" class="lbl-s">R</text>
      <path class="wb" d="M271,42 L328,42"/><text x="334" y="46" class="lbl-b">Q</text>
      <path class="wb" d="M271,94 L328,94"/><text x="334" y="98" class="lbl-b">Q̄</text>
    `);
  },

  jkToD() {
    return this._svg(380, 130, `
      <text x="16" y="44" class="lbl">D</text>
      <path class="w" d="M34,40 L175,40"/>
      <circle class="dot" cx="68" cy="40" r="3"/>
      <path class="w" d="M68,40 L68,94 L95,94"/>
      ${this._notGate(95, 84, 0.9)}
      <path class="w" d="M120,93 L175,93"/>
      <text x="132" y="34" class="lbl-s">J=D</text>
      <text x="132" y="86" class="lbl-s">K=D̄</text>
      <rect class="box-b" x="175" y="22" width="96" height="90"/>
      <text x="200" y="72" class="lbl-b">JK-FF</text>
      <text x="182" y="44" class="lbl-s">J</text>
      <text x="182" y="96" class="lbl-s">K</text>
      <path class="wb" d="M271,42 L328,42"/><text x="334" y="46" class="lbl-b">Q</text>
      <path class="wb" d="M271,94 L328,94"/><text x="334" y="98" class="lbl-b">Q̄</text>
    `);
  },

  dToT() {
    return this._svg(520, 155, `
      <!-- (a) D = T XOR Q -->
      <text x="38" y="18" class="lbl-b">(a) 一般形 (D = T ⊕ Q)</text>
      <text x="10" y="64" class="lbl">T</text>
      <path class="w" d="M26,60 L66,60"/>
      ${this._xorGate(66, 52)}
      <path class="w" d="M102,68 L142,68"/>
      <rect class="box-b" x="142" y="38" width="76" height="78"/>
      <text x="160" y="82" class="lbl-b">D-FF</text>
      <text x="148" y="72" class="lbl-s">D</text>
      <path class="wb" d="M218,58 L252,58"/><text x="255" y="62" class="lbl-b">Q</text>
      <circle class="dot" cx="234" cy="58" r="3"/>
      <path class="wr" d="M234,58 L234,136 L44,136 L44,76 L66,76"/>

      <line x1="280" y1="12" x2="280" y2="146" class="wd"/>

      <!-- (b) T=1 fixed (D = Q̄) -->
      <text x="308" y="18" class="lbl-b">(b) T=1固定 (D = Q̄)</text>
      <rect class="box-b" x="348" y="38" width="84" height="78"/>
      <text x="370" y="82" class="lbl-b">D-FF</text>
      <text x="354" y="64" class="lbl-s">D</text>
      <text x="354" y="100" class="lbl-s">Cp</text>
      <path class="wr" d="M300,96 L348,96"/><text x="284" y="100" class="lbl-r">Cp</text>
      <path class="wb" d="M432,58 L480,58"/><text x="486" y="62" class="lbl-b">Q</text>
      <path class="wg" d="M432,96 L464,96 L464,136 L322,136 L322,60 L348,60"/>
      <text x="438" y="90" class="lbl-g">Q̄</text>
    `);
  }
};
