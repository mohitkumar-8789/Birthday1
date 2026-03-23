const canvas = document.getElementById("sparkleCanvas");
const ctx = canvas.getContext("2d");

const sparkles = [];
const sparkleCount = 110;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createSparkle() {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2.2 + 0.8,
    speedY: Math.random() * 0.8 + 0.2,
    speedX: (Math.random() - 0.5) * 0.6,
    alpha: Math.random() * 0.7 + 0.3,
    twinkle: Math.random() * 0.04 + 0.01
  };
}

function fillSparkles() {
  sparkles.length = 0;
  for (let i = 0; i < sparkleCount; i += 1) {
    sparkles.push(createSparkle());
  }
}

function drawSparkle(s) {
  ctx.beginPath();
  ctx.fillStyle = `rgba(255, 230, 255, ${s.alpha})`;
  ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
  ctx.fill();
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  sparkles.forEach((s) => {
    s.y -= s.speedY;
    s.x += s.speedX;
    s.alpha += Math.sin(Date.now() * s.twinkle) * 0.003;

    if (s.y < -10 || s.x < -10 || s.x > canvas.width + 10) {
      s.x = Math.random() * canvas.width;
      s.y = canvas.height + 10;
    }

    drawSparkle(s);
  });

  requestAnimationFrame(animate);
}

resizeCanvas();
fillSparkles();
animate();

window.addEventListener("resize", () => {
  resizeCanvas();
  fillSparkles();
});
