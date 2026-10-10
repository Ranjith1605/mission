// HumanSI Synergy — starfield, stardate clock, deck reveal
(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Starfield: stars drift toward the viewer, as if the ship is under way.
  const canvas = document.getElementById('starfield');
  const ctx = canvas.getContext('2d');
  let stars = [];
  let w, h;

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
    const count = Math.min(400, Math.floor((w * h) / 4000));
    stars = Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * w,
    }));
  }

  function draw() {
    ctx.fillStyle = 'rgba(5, 6, 15, 0.35)';
    ctx.fillRect(0, 0, w, h);
    for (const s of stars) {
      if (!reduceMotion) {
        s.z -= 1.2;
        if (s.z <= 1) s.z = w;
      }
      const k = 128 / s.z;
      const px = s.x * k + w / 2;
      const py = s.y * k + h / 2;
      if (px < 0 || px > w || py < 0 || py > h) continue;
      const size = Math.max(0.3, (1 - s.z / w) * 2.2);
      ctx.fillStyle = `rgba(219, 231, 255, ${1 - s.z / w})`;
      ctx.fillRect(px, py, size, size);
    }
    if (!reduceMotion) requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); if (reduceMotion) draw(); });
  resize();
  draw();

  // Stardate: year plus fraction of the year elapsed, from the visitor's clock.
  const clock = document.getElementById('clock');
  function tick() {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 1);
    const end = new Date(now.getFullYear() + 1, 0, 1);
    const frac = (now - start) / (end - start);
    clock.textContent = `STARDATE ${(now.getFullYear() + frac).toFixed(3)}`;
  }
  tick();
  setInterval(tick, 10000);

  // Reveal decks as they scroll into view.
  if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('js');
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      }
    }, { threshold: 0.15 });
    document.querySelectorAll('.deck').forEach((d) => io.observe(d));
  }
})();
