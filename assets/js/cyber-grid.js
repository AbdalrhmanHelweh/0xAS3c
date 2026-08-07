/**
 * Cyber Grid Animation
 * Subtle animated grid with glowing pulse effects
 */

(function () {
  const canvas = document.getElementById('cyber-grid');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let gridSize = 40;
  let pulses = [];
  let intersections = [];
  let animationId;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    buildIntersections();
  }

  function buildIntersections() {
    intersections = [];
    for (let x = 0; x <= width; x += gridSize) {
      for (let y = 0; y <= height; y += gridSize) {
        intersections.push({
          x: x,
          y: y,
          glow: 0,
          maxGlow: Math.random() * 0.5 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.01 + 0.005
        });
      }
    }
  }

  function createPulse() {
    const horizontal = Math.random() > 0.5;
    if (horizontal) {
      const y = Math.floor(Math.random() * (height / gridSize)) * gridSize;
      pulses.push({
        x: -50,
        y: y,
        dx: 1.5 + Math.random() * 2,
        dy: 0,
        life: 1.0,
        decay: 0.002 + Math.random() * 0.003,
        length: 80 + Math.random() * 120
      });
    } else {
      const x = Math.floor(Math.random() * (width / gridSize)) * gridSize;
      pulses.push({
        x: x,
        y: -50,
        dx: 0,
        dy: 1.5 + Math.random() * 2,
        life: 1.0,
        decay: 0.002 + Math.random() * 0.003,
        length: 80 + Math.random() * 120
      });
    }
  }

  function drawGrid() {
    ctx.strokeStyle = 'rgba(0, 255, 136, 0.06)';
    ctx.lineWidth = 0.5;

    // Vertical lines
    for (let x = 0; x <= width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Horizontal lines
    for (let y = 0; y <= height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }
  }

  function drawIntersections(time) {
    intersections.forEach(function (p) {
      p.glow = (Math.sin(time * p.speed + p.phase) + 1) / 2 * p.maxGlow;
      if (p.glow > 0.1) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 255, 136, ' + p.glow + ')';
        ctx.fill();

        // Subtle glow halo
        if (p.glow > 0.3) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 255, 136, ' + (p.glow * 0.2) + ')';
          ctx.fill();
        }
      }
    });
  }

  function drawPulses() {
    pulses.forEach(function (pulse) {
      var gradient;
      if (pulse.dx > 0) {
        gradient = ctx.createLinearGradient(
          pulse.x - pulse.length, pulse.y,
          pulse.x, pulse.y
        );
      } else {
        gradient = ctx.createLinearGradient(
          pulse.x, pulse.y - pulse.length,
          pulse.x, pulse.y
        );
      }

      gradient.addColorStop(0, 'rgba(0, 255, 136, 0)');
      gradient.addColorStop(0.7, 'rgba(0, 255, 136, ' + (pulse.life * 0.4) + ')');
      gradient.addColorStop(1, 'rgba(0, 255, 136, ' + (pulse.life * 0.8) + ')');

      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      if (pulse.dx > 0) {
        ctx.moveTo(pulse.x - pulse.length, pulse.y);
        ctx.lineTo(pulse.x, pulse.y);
      } else {
        ctx.moveTo(pulse.x, pulse.y - pulse.length);
        ctx.lineTo(pulse.x, pulse.y);
      }
      ctx.stroke();

      // Bright head
      ctx.beginPath();
      var headX = pulse.dx > 0 ? pulse.x : pulse.x;
      var headY = pulse.dy > 0 ? pulse.y : pulse.y;
      ctx.arc(headX, headY, 2, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 255, 136, ' + pulse.life + ')';
      ctx.fill();

      // Update position
      pulse.x += pulse.dx;
      pulse.y += pulse.dy;
      pulse.life -= pulse.decay;
    });

    // Remove dead pulses
    pulses = pulses.filter(function (p) {
      return p.life > 0 && p.x < width + 100 && p.y < height + 100;
    });
  }

  var frameCount = 0;

  function animate(time) {
    ctx.clearRect(0, 0, width, height);

    drawGrid();
    drawIntersections(time);
    drawPulses();

    frameCount++;
    // Spawn new pulses periodically
    if (frameCount % 120 === 0 && pulses.length < 8) {
      createPulse();
    }

    animationId = requestAnimationFrame(animate);
  }

  // Reduce animation on low-power / prefers-reduced-motion
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!prefersReduced.matches) {
    resize();
    window.addEventListener('resize', resize);
    animationId = requestAnimationFrame(animate);
  }
})();
