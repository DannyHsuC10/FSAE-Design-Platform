/* Technical illustrations for the directory and tool previews. */
function strokePath(context, points, color, width = 1.5, closed = false, fill) {
  context.beginPath();
  for (const [index, [x, y]] of points.entries()) {
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  }
  if (closed) context.closePath();
  if (fill) {
    context.fillStyle = fill;
    context.fill();
  }
  context.strokeStyle = color;
  context.lineWidth = width;
  context.stroke();
}

function dot(context, x, y, radius, color) {
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
}

function drawFormulaCar(canvas) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const main = "#84e3d1";
  const soft = "#4c9e9b";
  const fine = "#356d73";
  const ghost = "#42767b";
  const project = ([x, y, z = 0]) => [622 + 1.22 * x + .72 * y, 422 - .325 * x + .58 * y - 1.22 * z];
  const line = (points, color = main, width = 2, close = false, fill) =>
    strokePath(ctx, points.map(project), color, width, close, fill);
  const ring = (pointAt, count = 48) => Array.from({length: count}, (_, i) => pointAt(i * Math.PI * 2 / count));

  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  // Drawing grid and centerlines on the ground plane.
  for (let x = -350; x <= 350; x += 50) line([[x, -220], [x, 220]], fine, .65);
  for (let y = -220; y <= 220; y += 44) line([[-350, y], [350, y]], fine, .65);
  ctx.setLineDash([9, 8]);
  line([[-370, 0], [390, 0]], ghost, 1.4);
  for (const x of [-185, 170]) line([[x, -210], [x, 220]], ghost, 1.25);
  ctx.setLineDash([]);

  function wheel(x, y) {
    const z = 51;
    const profile = [
      [-24, 44], [-19, 51], [-11, 54], [11, 54], [19, 51], [24, 44],
    ];
    for (const [offset, radius] of profile) {
      line(ring((a) => [x + radius * Math.cos(a), y + offset, z + radius * Math.sin(a)]), soft, 1.55, true,
        offset === -24 || offset === 24 ? "#12383e" : undefined);
    }
    for (let k = 0; k < 24; k++) {
      const a = k * Math.PI / 12;
      line(profile.map(([offset, radius]) => [x + radius * Math.cos(a), y + offset, z + radius * Math.sin(a)]), fine, 1);
    }
    const face = y + 24;
    for (const radius of [43, 32, 28, 11]) {
      line(ring((a) => [x + radius * Math.cos(a), face, z + radius * Math.sin(a)]), radius === 28 ? main : soft, 1.6, true);
    }
    for (let k = 0; k < 10; k++) {
      const a = k * Math.PI / 5;
      line([[x + 11 * Math.cos(a), face, z + 11 * Math.sin(a)], [x + 28 * Math.cos(a + .11), face, z + 28 * Math.sin(a + .11)]], soft, 1.5);
    }
    dot(ctx, ...project([x, face, z]), 3, main);
  }

  function suspension(x, side) {
    for (const z of [41, 83]) {
      line([[x - 40, side * 39, z - 5], [x, side * 99, z - 16], [x + 33, side * 39, z + 7]], main, 2.15);
      dot(ctx, ...project([x, side * 99, z - 16]), 3.1, main);
    }
    line([[x + 20, side * 35, 103], [x - 9, side * 100, 51]], soft, 2.2);
  }

  function wing(x, span, z, rear = false) {
    for (const side of [-1, 1]) {
      line([[x + 23, side * span, z - 13], [x - 40, side * span, z - 7], [x - 38, side * span, z + 26], [x + 25, side * span, z + 14]], main, 2, true, "#18474a");
      line([[x - 32, side * span, z + 7], [x + 18, side * span, z + 4]], soft, 1.4);
    }
    for (const level of [0, 13]) {
      line([[x - 32, -span, z + level + 5], [x - 32, span, z + level + 5], [x + 22, span, z + level], [x + 22, -span, z + level]], main, 2, true, "#1b5152");
      line([[x - 13, -span, z + level + 2], [x - 13, span, z + level + 2]], soft);
    }
    if (rear) {
      for (const y of [-30, 30]) line([[x + 9, y, 78], [x - 17, y, z + 5]], main, 2.15);
    }
  }

  wheel(-185, -126);
  wheel(170, -121);
  suspension(-185, -1);
  suspension(170, -1);

  const sections = [
    [-247, 16, 24, 70], [-185, 31, 25, 89], [-117, 44, 26, 105],
    [-60, 65, 24, 125], [24, 72, 24, 151], [99, 57, 24, 123],
    [169, 43, 26, 94], [218, 31, 26, 75],
  ];
  const ribs = sections.map(([x, y, bottom, top]) => [
    [x, -y * .66, bottom], [x, -y, bottom + 24], [x, -y * .71, top - 13],
    [x, 0, top], [x, y * .71, top - 13], [x, y, bottom + 24], [x, y * .66, bottom],
  ]);
  for (let i = 0; i < ribs.length - 1; i++) {
    const current = ribs[i];
    const next = ribs[i + 1];
    for (let j = 0; j < current.length - 1; j++) {
      if ((i === 3 || i === 4) && (j === 2 || j === 3)) continue;
      line([current[j], current[j + 1], next[j + 1], next[j]], soft, 1.7, true, j % 2 ? "#1a5455" : "#16464c");
      line([current[j], next[j + 1]], fine, .85);
    }
  }
  for (const rib of ribs) line(rib, soft, 1.4);
  line(ribs.map((rib) => rib[5]), main, 2.3);
  line(ribs.map((rib) => rib[1]), main, 2.2);

  const cockpit = [[-65, 0, 124], [-44, -36, 131], [22, -42, 155], [90, -34, 132],
    [108, 0, 120], [90, 34, 132], [22, 42, 155], [-44, 36, 131]];
  line(cockpit, main, 2.4, true, "#102d35");
  line([[-26, -26, 125], [-23, 24, 124]], soft, 2);
  for (const x of [52, 61]) {
    line([[x, -50, 111], [x, -36, 185], [x, -24, 205], [x, 24, 205], [x, 36, 185], [x, 50, 111]], main, 2.6);
  }
  line([[59, -33, 183], [144, -35, 94]], soft, 1.8);
  line([[59, 33, 183], [144, 35, 94]], main, 1.8);

  wing(231, 103, 156, true);
  wing(-270, 102, 39);
  suspension(-185, 1);
  suspension(170, 1);
  wheel(-185, 126);
  wheel(170, 121);

  ctx.setLineDash([5, 7]);
  for (const x of [-185, 170]) line([[x, 144], [x, 224]], ghost, 1.3);
  ctx.setLineDash([]);
  line([[-185, 220], [170, 220]], soft, 1.25);
  for (const x of [-185, 170]) line([[x - 7, 225], [x + 7, 215]], main, 1.5);

  const origin = [915, 553];
  strokePath(ctx, [origin, [964, 541]], soft, 1.6);
  strokePath(ctx, [origin, [950, 580]], soft, 1.6);
  strokePath(ctx, [origin, [915, 503]], soft, 1.6);
  ctx.font = "14px monospace";
  ctx.fillStyle = main;
  ctx.fillText("X", 970, 543);
  ctx.fillText("Y", 956, 585);
  ctx.fillText("Z", 909, 497);
}

function drawToolPreview(canvas, kind) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const teal = "#076d64";
  const soft = "#62a59e";
  const gray = "#758da0";
  const pale = "#c9dfdf";
  const blue = "#527dad";
  const line = (points, color = teal, width = 2.3, closed = false, fill) =>
    strokePath(ctx, points, color, width, closed, fill);

  ctx.fillStyle = "#edf5f5";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  for (let x = 18; x < canvas.width; x += 24) line([[x, 0], [x, 240]], "#dfebed", 1);
  for (let y = 12; y < canvas.height; y += 24) line([[0, y], [660, y]], "#dfebed", 1);

  function chart(xLabel, yLabel, curves) {
    line([[100, 35], [100, 191], [568, 191]], gray, 1.6);
    ctx.font = "14px monospace";
    ctx.fillStyle = "#4a6276";
    ctx.fillText(yLabel, 112, 37);
    ctx.textAlign = "right";
    ctx.fillText(xLabel, 568, 215);
    ctx.textAlign = "left";
    for (const [fn, color] of curves) {
      const points = Array.from({length: 101}, (_, i) => [104 + 460 * i / 100, fn(i / 100)]);
      line(points, color, 3);
    }
  }

  function wishbones(load = false) {
    const top = [[154, 69], [262, 37], [428, 80]];
    const bottom = [[137, 167], [248, 130], [422, 164]];
    line(top, teal, 3, true, "#d6eae9");
    line(bottom, blue, 3, true, "#dfebf4");
    line([[428, 80], [422, 164], [473, 140], [479, 96]], teal, 3, true);
    line([[154, 69], [137, 167]], gray, 2);
    line([[262, 37], [248, 130]], gray, 2);
    line([[278, 125], [464, 121]], soft, 3);
    line([[301, 36], [359, 148]], teal, 4);
    for (const [x, y] of [...top, ...bottom, [464, 121], [301, 36]]) dot(ctx, x, y, 4.5, teal);
    if (load) {
      line([[474, 138], [531, 189]], "#b25441", 3);
      line([[514, 185], [531, 189], [525, 172]], "#b25441", 3);
      line([[476, 136], [550, 136]], "#b25441", 2);
      line([[539, 130], [550, 136], [539, 142]], "#b25441", 2);
    } else {
      ctx.setLineDash([7, 6]);
      line([[481, 59], [462, 189]], gray, 1.15);
      line([[110, 187], [545, 187]], gray, 1.15);
      ctx.setLineDash([]);
    }
  }

  function gear(cx, cy, radius, teeth, phase = 0) {
    const shape = Array.from({length: teeth * 4}, (_, i) => {
      const angle = phase + i * Math.PI / (teeth * 2);
      const r = i % 4 === 0 || i % 4 === 3 ? radius - 5 : radius;
      return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)];
    });
    line(shape, teal, 2, true, "#dbecea");
    ctx.beginPath();
    ctx.arc(cx, cy, radius * .31, 0, 2 * Math.PI);
    ctx.strokeStyle = soft;
    ctx.stroke();
    dot(ctx, cx, cy, 3, teal);
  }

  switch (kind) {
    case "sizing": {
      const chassis = [[149, 122], [202, 96], [322, 76], [397, 56], [450, 70], [507, 99], [514, 136], [454, 153], [169, 146]];
      line(chassis, teal, 3, true, "#dcefed");
      line([[288, 107], [341, 88], [389, 86], [423, 114]], teal, 2);
      line([[365, 87], [367, 58], [390, 58]], soft, 2.5);
      for (const x of [233, 454]) {
        dot(ctx, x, 140, 33, "#eaf3f4");
        ctx.beginPath();
        ctx.arc(x, 140, 32, 0, 2 * Math.PI);
        ctx.strokeStyle = teal;
        ctx.lineWidth = 3;
        ctx.stroke();
        dot(ctx, x, 140, 12, pale);
        dot(ctx, x, 140, 3.5, teal);
        line([[x, 174], [x, 204]], gray, 1.3);
      }
      line([[233, 194], [454, 194]], soft, 1.5);
      for (const x of [233, 454]) line([[x - 6, 200], [x + 6, 188]], teal, 1.5);
      break;
    }
    case "geometry":
      wishbones();
      break;
    case "kinematics":
      chart("Wheel travel", "Camber / toe", [
        [(t) => 147 - 68 * t - 21 * Math.sin(t * 2.7), teal],
        [(t) => 153 - 29 * t + 12 * Math.sin(t * 4.3), blue],
        [(t) => 63 + 103 * t - 15 * Math.sin(t * 4), soft],
      ]);
      break;
    case "statics":
      wishbones(true);
      break;
    case "dynamics":
      chart("Time", "Wheel load", [
        [(t) => 126 + 44 * Math.sin(29 * t) * Math.exp(-1.9 * t) - 27 * Math.sin(13 * t), teal],
        [(t) => 148 + 31 * Math.cos(21 * t) * Math.exp(-1.9 * t), blue],
      ]);
      break;
    case "vehicle-model": {
      // Show the full chassis, its four wheel assemblies, and a cornering arrow.
      ctx.setLineDash([5, 6]);
      line([[146, 120], [510, 120]], gray, 1.3);
      ctx.setLineDash([]);

      for (const side of [-1, 1]) {
        const wheelY = 120 + side * 56;
        for (const [axle, mount] of [[219, 34], [435, 19]]) {
          const mountY = 120 + side * mount;
          line([[axle - 21, mountY], [axle, wheelY], [axle + 21, mountY]], soft, 2.5);
          line([[axle - 22, wheelY - 13], [axle + 22, wheelY - 13],
            [axle + 22, wheelY + 13], [axle - 22, wheelY + 13]], teal, 2.5, true, "#d6eae9");
          line([[axle - 14, wheelY], [axle + 14, wheelY]], soft, 1.6);
          dot(ctx, axle, wheelY, 3.7, blue);
        }
      }

      line([[209, 95], [278, 88], [327, 92], [373, 105], [453, 109], [480, 120],
        [453, 131], [373, 135], [327, 148], [278, 152], [209, 145]], teal, 2.8, true, "#dcefed");
      line([[178, 82], [195, 82], [195, 158], [178, 158]], teal, 2.5, true, pale);
      line([[460, 83], [480, 83], [492, 93], [492, 147], [480, 157], [460, 157]], teal, 2.5, true, pale);
      line([[289, 105], [325, 103], [353, 120], [325, 137], [289, 135]], teal, 2, true, "#edf5f5");
      dot(ctx, 315, 120, 5, blue);

      ctx.beginPath();
      ctx.arc(451, 122, 98, -.7, .7);
      ctx.strokeStyle = blue;
      ctx.lineWidth = 2.6;
      ctx.stroke();
      line([[541, 175], [526, 185], [528, 167]], blue, 2.6);
      break;
    }
    case "damping":
      chart("Time", "Displacement", [
        [(t) => 128 - 78 * Math.exp(-4.4 * t) * Math.cos(27 * t), teal],
        [(t) => 128 - 78 * Math.exp(-8 * t) * Math.cos(17 * t), blue],
        [(t) => 128 - 78 * Math.exp(-12 * t), soft],
      ]);
      break;
    case "gears": {
      ctx.beginPath();
      ctx.arc(332, 120, 95, 0, 2 * Math.PI);
      ctx.strokeStyle = soft;
      ctx.lineWidth = 2.2;
      ctx.stroke();
      gear(332, 120, 31, 18);
      for (let i = 0; i < 3; i++) {
        const a = i * Math.PI * 2 / 3 - Math.PI / 2;
        gear(332 + 57 * Math.cos(a), 120 + 57 * Math.sin(a), 31, 18, a + .08);
      }
      break;
    }
    case "track": {
      const route = new Path2D("M153 131 C125 96 155 70 204 70 H298 C329 70 346 90 325 106 L294 133 C272 151 302 164 322 155 L407 96 C453 62 498 59 515 96 C548 159 466 179 408 181 H206 Q178 181 153 131Z");
      ctx.strokeStyle = pale;
      ctx.lineWidth = 17;
      ctx.stroke(route);
      ctx.strokeStyle = teal;
      ctx.lineWidth = 2.6;
      ctx.stroke(route);
      line([[259, 59], [259, 82]], blue, 3);
      dot(ctx, 259, 70, 3.5, teal);
      break;
    }
    case "lap":
      chart("Distance", "Speed", [
        [(t) => 156 - 88 * Math.abs(Math.sin(t * 9.5 + .49)) + 8 * Math.cos(39 * t), teal],
        [(t) => 168 - 43 * Math.abs(Math.sin(t * 9.5 + .55)), soft],
      ]);
      break;
    case "tires":
      chart("Slip angle", "Lateral force", [
        [(t) => 160 - 102 * (1 - Math.exp(-9 * t)) + 26 * t ** 2, teal],
        [(t) => 171 - 75 * (1 - Math.exp(-9.5 * t)) + 18 * t ** 2, blue],
        [(t) => 181 - 44 * (1 - Math.exp(-10 * t)) + 10 * t ** 2, soft],
      ]);
      break;
    case "multibody": {
      const chassis = [[203, 139], [311, 177], [461, 121], [357, 85]];
      const linkage = [[172, 109], [227, 62], [328, 99], [413, 49], [505, 84], [468, 149]];
      line(chassis, teal, 2.8, true, "#d6eae9");
      line(linkage, teal, 3);
      line([[227, 62], [203, 139], [328, 99], [311, 177]], blue, 2);
      line([[413, 49], [357, 85], [505, 84], [461, 121], [468, 149]], blue, 2);
      for (const [x, y] of [...chassis, ...linkage]) {
        dot(ctx, x, y, 6, teal);
        dot(ctx, x, y, 2.7, "#edf5f5");
      }
      break;
    }
    default:
      line([[260, 152], [330, 44], [400, 152]], teal, 2.5, true);
      for (const [x, y] of [[260, 152], [330, 44], [400, 152]]) dot(ctx, x, y, 5, teal);
  }
}
