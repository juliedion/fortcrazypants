/* =============================================
  FORT CRAZYPANTS — App Logic
   ============================================= */

// ── HEADER SCROLL EFFECT ──
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
  document.getElementById('backToTop').classList.toggle('visible', window.scrollY > 400);
});

// ── CART DRAWER ──
function toggleCart() {
  document.getElementById('cartDrawer').classList.toggle('open');
  document.getElementById('cartOverlay').classList.toggle('open');
  document.body.style.overflow = document.getElementById('cartDrawer').classList.contains('open') ? 'hidden' : '';
}

document.querySelector('.cart-btn').addEventListener('click', (e) => {
  e.preventDefault();
  toggleCart();
});

// ── BACK TO TOP ──
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── GIFT FINDER LOGIC ──
const finderSteps = document.querySelectorAll('.finder-step');
const progressDots = document.querySelectorAll('.progress-dot');
const finderResult = document.querySelector('.finder-result');
let currentStep = 1;
let selections = {};

document.querySelectorAll('.finder-opt').forEach(btn => {
  btn.addEventListener('click', () => {
    const step = btn.closest('.finder-step');
    const stepNum = parseInt(step.dataset.step);

    // Mark selected
    step.querySelectorAll('.finder-opt').forEach(b => b.classList.remove('selected'));
    btn.classList.add('selected');
    selections[stepNum] = btn.dataset.value;

    // Advance after short delay
    setTimeout(() => {
      if (currentStep < 3) {
        showStep(currentStep + 1);
      } else {
        showResult();
      }
    }, 350);
  });
});

function showStep(n) {
  finderSteps.forEach(s => s.classList.remove('active'));
  const target = document.querySelector(`.finder-step[data-step="${n}"]`);
  if (target) { target.classList.add('active'); }
  progressDots.forEach((d, i) => d.classList.toggle('active', i < n));
  currentStep = n;
}

function showResult() {
  finderSteps.forEach(s => s.classList.remove('active'));
  finderResult.style.display = 'block';
  progressDots.forEach(d => d.classList.add('active'));
}

document.querySelector('.finder-restart')?.addEventListener('click', () => {
  finderResult.style.display = 'none';
  selections = {};
  currentStep = 1;
  document.querySelectorAll('.finder-opt').forEach(b => b.classList.remove('selected'));
  showStep(1);
});

// ── EMAIL SIGNUP ──
function handleEmailSignup(e) {
  e.preventDefault();
  const input = e.target.querySelector('input[type="email"]');
  const btn = e.target.querySelector('button[type="submit"]');
  const original = btn.textContent;
  btn.textContent = '✓ You\'re In!';
  btn.style.background = '#2e9b5f';
  input.value = '';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 4000);
}

// ── ADD TO CART BUTTONS ──
document.querySelectorAll('.btn-add').forEach(btn => {
  btn.addEventListener('click', () => {
    const original = btn.textContent;
    btn.textContent = '✓ Added!';
    btn.style.background = '#2e9b5f';
    btn.style.borderColor = '#2e9b5f';
    const count = document.querySelectorAll('.cart-count');
    count.forEach(c => {
      c.textContent = parseInt(c.textContent) + 1;
      c.style.transform = 'scale(1.4)';
      setTimeout(() => { c.style.transform = ''; }, 300);
    });
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 2000);
  });
});

// ── SCROLL ANIMATIONS ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.product-card, .category-card, .review-card, .bestseller-item, .feature-card, .trust-badge').forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// ── WISHLIST TOGGLE ──
document.querySelectorAll('.action-btn').forEach(btn => {
  if (btn.getAttribute('aria-label') === 'Add to wishlist') {
    btn.addEventListener('click', () => {
      const isWished = btn.textContent === '♥';
      btn.textContent = isWished ? '♡' : '♥';
      btn.style.color = isWished ? '' : '#ff2d78';
    });
  }
});

// ── SMOOTH ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

console.log('%c Fort Crazypants 🎁 ', 'background:#0a1628;color:#ff2d78;font-size:18px;font-weight:bold;padding:8px 16px;border-radius:4px;');
console.log('%c Built with ❤️ — Curated Marketplace', 'color:#1a3a8f;font-size:12px;');
