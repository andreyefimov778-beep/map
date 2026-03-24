// ══════════════════════════════════════════
//  COSMIC HIERARCHY — MAIN JS
// ══════════════════════════════════════════

// ── STARS GENERATOR ──
function generateStars() {
  const container = document.getElementById('stars');
  if (!container) return;
  const count = 180;
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    const size = Math.random() * 2.5 + 0.5;
    star.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      --dur: ${Math.random() * 3 + 1.5}s;
      animation-delay: ${Math.random() * 4}s;
      opacity: ${Math.random() * 0.6 + 0.1};
    `;
    container.appendChild(star);
  }
}

// ── MUSIC ──
const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');
let musicPlaying = false;

function toggleMusic() {
  if (musicPlaying) {
    audio.pause();
    musicBtn.classList.remove('playing');
    musicBtn.querySelector('.music-label').textContent = 'Музыка';
    musicPlaying = false;
  } else {
    audio.volume = 0.4;
    audio.play().then(() => {
      musicBtn.classList.add('playing');
      musicBtn.querySelector('.music-label').textContent = 'Пауза';
      musicPlaying = true;
    }).catch(() => {});
  }
}

musicBtn.addEventListener('click', toggleMusic);

// ── INTRO ──
const introScreen = document.getElementById('introScreen');
const introBtn = document.getElementById('introBtn');

introBtn.addEventListener('click', () => {
  introScreen.classList.add('hidden');
  // Try to play music on enter
  audio.volume = 0.4;
  audio.play().then(() => {
    musicBtn.classList.add('playing');
    musicBtn.querySelector('.music-label').textContent = 'Пауза';
    musicPlaying = true;
  }).catch(() => {});
  // Animate nodes in sequence
  animateNodes();
});

function animateNodes() {
  const nodes = document.querySelectorAll('.node');
  nodes.forEach((node, i) => {
    node.style.animationDelay = `${i * 0.06}s`;
  });
}

// ── MODAL ──
const overlay = document.getElementById('modalOverlay');
const modalTitle = document.getElementById('modalTitle');
const modalAliases = document.getElementById('modalAliases');
const modalBody = document.getElementById('modalBody');
const modalLevel = document.getElementById('modalLevel');
const modalLayer = document.getElementById('modalLayer');
const modalGlyph = document.getElementById('modalGlyph');
const modalClose = document.getElementById('modalClose');
const modalBox = document.getElementById('modalBox');

function openModal(id) {
  const data = NODE_DATA[id];
  if (!data) return;

  modalGlyph.textContent = data.glyph;
  modalGlyph.style.color = data.color;
  modalTitle.textContent = data.title;
  modalTitle.style.color = data.color;
  modalAliases.textContent = data.aliases || '';
  modalBody.innerHTML = data.body || '';
  modalLevel.textContent = data.level ? '📍 ' + data.level : '';
  modalLayer.textContent = data.layer ? '⚗ ' + data.layer : '';

  // Set border color to match node
  modalBox.style.borderColor = data.color + '40';
  modalBox.style.boxShadow = `0 0 80px rgba(0,0,0,0.9), 0 0 40px ${data.color}15`;

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ── NODE CLICK HANDLERS ──
document.querySelectorAll('.node[data-id]').forEach(node => {
  node.addEventListener('click', () => {
    const id = node.getAttribute('data-id');
    openModal(id);
    // Pulse effect
    node.style.transform = 'scale(0.95)';
    setTimeout(() => { node.style.transform = ''; }, 150);
  });
});

// ── INIT ──
generateStars();
