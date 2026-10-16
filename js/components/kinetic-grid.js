/**
 * KineticGrid Engine
 * Interactive canvas grid warping, ambient electrical pulse, and ripple effect
 */
function initKineticGrid(canvasId, containerId, customTheme) {
  const canvas = document.getElementById(canvasId);
  const container = document.getElementById(containerId);
  if (!canvas || !container) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '1';

  const CELL_SIZE = 55;
  const INFLUENCE_RADIUS = 260;
  const MAX_WARP = 24;
  const DOT_SPACING = 28;
  const LERP_SPEED = 0.08;

  const LINE_BASE = { r: 255, g: 255, b: 255, a: 0.10 };
  const NODE_BASE_RADIUS = 1.8;
  const NODE_ACTIVE_RADIUS = 3.4;

  const theme = Object.assign({
    bg: '#0b0e14',
    lineActive: { r: 56, g: 189, b: 248, a: 0.85 },
    nodeActive: { r: 125, g: 211, b: 252, a: 1.0 },
    glow: '56,189,248',
    ripple: '125,211,252'
  }, customTheme || {});

  function lerpN(a, b, t) {
    return a + (b - a) * t;
  }

  function lerpColor(base, active, t) {
    const r = Math.round(lerpN(base.r, active.r, t));
    const g = Math.round(lerpN(base.g, active.g, t));
    const b = Math.round(lerpN(base.b, active.b, t));
    const a = lerpN(base.a, active.a, t);
    return `rgba(${r},${g},${b},${a.toFixed(3)})`;
  }

  const mouse = { x: -9999, y: -9999 };
  const targetMouse = { x: -9999, y: -9999 };
  const ripples = [];
  const size = { w: 0, h: 0 };
  let dpr = 1;
  let isVisible = false;
  let rafId = null;

  function setSize() {
    const w = container.offsetWidth;
    const h = container.offsetHeight;
    if (w === 0 || h === 0) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    size.w = w;
    size.h = h;
  }

  setSize();
  window.addEventListener('resize', setSize);
  if (window.ResizeObserver) {
    const ro = new ResizeObserver(() => setSize());
    ro.observe(container);
  }

  // Mouse interactions
  container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    targetMouse.x = e.clientX - rect.left;
    targetMouse.y = e.clientY - rect.top;
  }, { passive: true });

  container.addEventListener('mouseleave', () => {
    targetMouse.x = -9999;
    targetMouse.y = -9999;
  });

  container.addEventListener('click', e => {
    const rect = container.getBoundingClientRect();
    ripples.push({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      radius: 0,
      opacity: 1,
      born: performance.now()
    });
  });

  // Touch interactions for mobile / touch devices
  container.addEventListener('touchstart', e => {
    if (e.touches && e.touches.length > 0) {
      const rect = container.getBoundingClientRect();
      targetMouse.x = e.touches[0].clientX - rect.left;
      targetMouse.y = e.touches[0].clientY - rect.top;
      ripples.push({
        x: targetMouse.x,
        y: targetMouse.y,
        radius: 0,
        opacity: 1,
        born: performance.now()
      });
    }
  }, { passive: true });

  container.addEventListener('touchmove', e => {
    if (e.touches && e.touches.length > 0) {
      const rect = container.getBoundingClientRect();
      targetMouse.x = e.touches[0].clientX - rect.left;
      targetMouse.y = e.touches[0].clientY - rect.top;
    }
  }, { passive: true });

  container.addEventListener('touchend', () => {
    targetMouse.x = -9999;
    targetMouse.y = -9999;
  }, { passive: true });

  function getWarpedPoint(gx, gy, col, row, cols, rows, now) {
    const edgeMargin = 1.5;
    const colPin = Math.min(col / edgeMargin, (cols - 1 - col) / edgeMargin, 1);
    const rowPin = Math.min(row / edgeMargin, (rows - 1 - row) / edgeMargin, 1);
    const pinFactor = Math.max(0, colPin * colPin * rowPin * rowPin);

    // Subtle autonomous ambient breathing wave
    const ambientX = Math.sin((now * 0.0014) + col * 0.38 + row * 0.28) * 3.2 * pinFactor;
    const ambientY = Math.cos((now * 0.0011) + col * 0.26 - row * 0.32) * 2.6 * pinFactor;

    // Ambient traveling electrical pulse across grid coordinates
    const pulsePhase = (now * 0.0018) - (col * 0.32 + row * 0.22);
    const pulseRaw = Math.sin(pulsePhase);
    const ambientPulse = pulseRaw > 0.85 ? ((pulseRaw - 0.85) / 0.15) * 0.5 * pinFactor : 0;

    const dx = gx - mouse.x;
    const dy = gy - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    let mouseProximity = Math.max(0, 1 - dist / INFLUENCE_RADIUS) * pinFactor;
    const proximity = Math.min(1, mouseProximity + ambientPulse);

    let rx = 0, ry = 0;
    for (let i = 0; i < ripples.length; i++) {
      const r = ripples[i];
      const rdx = gx - r.x;
      const rdy = gy - r.y;
      const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
      const waveWidth = 60;
      const diff = rdist - r.radius;
      if (Math.abs(diff) < waveWidth) {
        const strength = (1 - Math.abs(diff) / waveWidth) * r.opacity * 20 * pinFactor;
        const angle = Math.atan2(rdy, rdx);
        const sign = diff < 0 ? -1 : 1;
        rx += Math.cos(angle) * strength * sign * -1;
        ry += Math.sin(angle) * strength * sign * -1;
      }
    }

    if (dist < INFLUENCE_RADIUS && dist > 0 && pinFactor > 0) {
      const t = dist / INFLUENCE_RADIUS;
      const eased = t < 0.01 ? 0 : (1 - t) * (1 - t) * Math.min(1, dist / 60);
      const warpAmt = eased * MAX_WARP * pinFactor;
      const angle = Math.atan2(dy, dx);
      return {
        pt: {
          x: gx - Math.cos(angle) * warpAmt + rx + ambientX,
          y: gy - Math.sin(angle) * warpAmt + ry + ambientY
        },
        proximity
      };
    }

    return {
      pt: { x: gx + rx + ambientX, y: gy + ry + ambientY },
      proximity
    };
  }

  function draw(now) {
    const { w: W, h: H } = size;
    if (W === 0 || H === 0) return;

    ctx.save();
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, W, H);

    if (theme.bg) {
      ctx.fillStyle = theme.bg;
      ctx.fillRect(0, 0, W, H);
    }

    // Background static dot grid for high-tech texture
    ctx.fillStyle = 'rgba(255,255,255,0.04)';
    for (let x = DOT_SPACING / 2; x < W; x += DOT_SPACING) {
      for (let y = DOT_SPACING / 2; y < H; y += DOT_SPACING) {
        ctx.beginPath();
        ctx.arc(x, y, 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Update ripples
    for (let i = ripples.length - 1; i >= 0; i--) {
      const r = ripples[i];
      const age = (now - r.born) / 1000;
      r.radius = Math.max(0, age * 420);
      r.opacity = Math.max(0, 1 - age * 1.1);
      if (r.opacity <= 0) ripples.splice(i, 1);
    }

    const cols = Math.max(2, Math.ceil(W / CELL_SIZE)) + 1;
    const rows = Math.max(2, Math.ceil(H / CELL_SIZE)) + 1;
    const cellW = W / (cols - 1);
    const cellH = H / (rows - 1);

    const pts = [];
    const prox = [];

    for (let row = 0; row < rows; row++) {
      pts[row] = [];
      prox[row] = [];
      for (let col = 0; col < cols; col++) {
        const res = getWarpedPoint(
          col * cellW,
          row * cellH,
          col,
          row,
          cols,
          rows,
          now
        );
        pts[row][col] = res.pt;
        prox[row][col] = res.proximity;
      }
    }

    const drawSeg = (p1, p2, pr1, pr2) => {
      const avg = (pr1 + pr2) / 2;
      const t = avg * avg * (3 - 2 * avg);
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.strokeStyle = lerpColor(LINE_BASE, theme.lineActive, t);
      ctx.lineWidth = lerpN(0.85, 1.6, t);
      ctx.stroke();
    };

    ctx.lineCap = 'round';

    // Horizontal grid lines
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols - 1; col++) {
        drawSeg(pts[row][col], pts[row][col + 1], prox[row][col], prox[row][col + 1]);
      }
    }

    // Vertical grid lines
    for (let col = 0; col < cols; col++) {
      for (let row = 0; row < rows - 1; row++) {
        drawSeg(pts[row][col], pts[row + 1][col], prox[row][col], prox[row + 1][col]);
      }
    }

    // Nodes and energy glow
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const p = pts[row][col];
        const pr = prox[row][col];
        const t = pr * pr * (3 - 2 * pr);
        const r = lerpN(NODE_BASE_RADIUS, NODE_ACTIVE_RADIUS, t);

        if (t > 0.25) {
          const glowR = r + lerpN(1, 7, (t - 0.25) / 0.75);
          const grd = ctx.createRadialGradient(p.x, p.y, r * 0.4, p.x, p.y, glowR);
          grd.addColorStop(0, `rgba(${theme.glow},${(t * 0.45).toFixed(3)})`);
          grd.addColorStop(1, `rgba(${theme.glow},0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = lerpColor({ r: 255, g: 255, b: 255, a: 0.18 }, theme.nodeActive, t);
        ctx.fill();
      }
    }

    // Ripple shockwave rings
    for (let i = 0; i < ripples.length; i++) {
      const r = ripples[i];
      const safeRadius = Math.max(0, r.radius);
      ctx.beginPath();
      ctx.arc(r.x, r.y, safeRadius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(${theme.ripple},${(r.opacity * 0.35).toFixed(3)})`;
      ctx.lineWidth = 1.8;
      ctx.stroke();
    }

    ctx.restore();
  }

  function animate(now) {
    mouse.x = lerpN(mouse.x, targetMouse.x, LERP_SPEED);
    mouse.y = lerpN(mouse.y, targetMouse.y, LERP_SPEED);
    draw(now);
    if (isVisible) {
      rafId = requestAnimationFrame(animate);
    } else {
      rafId = null;
    }
  }

  const observer = new IntersectionObserver(entries => {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !rafId) {
      rafId = requestAnimationFrame(animate);
    }
  }, { threshold: 0.02 });
  observer.observe(container);
}
