/* =============================================
   app.js v2 — Piel Que Habla (Full SEO Site)
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ---- MODAL DE REGISTRO ----
  const modalOverlay = document.getElementById('modal-registro');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const openModalBtns = document.querySelectorAll('.open-modal-btn');

  function openModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.add('open');
    document.body.classList.add('modal-open');
    if (modalCloseBtn) modalCloseBtn.focus();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  openModalBtns.forEach(btn => btn.addEventListener('click', openModal));
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('open')) closeModal();
  });

  // ---- CONCERN TABS ----
  const concernCards = document.querySelectorAll('.concern-card');
  const concernContents = document.querySelectorAll('.concern-content');

  concernCards.forEach(card => {
    card.addEventListener('click', () => {
      const target = card.dataset.concern;
      concernCards.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-selected', 'false'); });
      card.classList.add('active');
      card.setAttribute('aria-selected', 'true');
      concernContents.forEach(c => c.classList.remove('active'));
      const targetContent = document.getElementById('content-' + target);
      if (targetContent) {
        targetContent.classList.add('active');
        if (window.innerWidth < 768) {
          setTimeout(() => {
            document.getElementById('contenido')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      }
    });
  });

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      // Close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.setAttribute('aria-expanded', 'false');
        const a = b.nextElementSibling;
        if (a) a.classList.remove('open');
      });
      // Open this one if it was closed
      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        if (answer) answer.classList.add('open');
      }
    });
  });

  // ---- MOBILE NAV ----
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  let menuOpen = false;

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      menuOpen = !menuOpen;
      navLinks.classList.toggle('open', menuOpen);
      hamburger.innerHTML = menuOpen ? '✕' : '&#9776;';
      hamburger.setAttribute('aria-expanded', String(menuOpen));
      document.body.style.overflow = menuOpen ? 'hidden' : '';
    });
    navLinks.querySelectorAll('a, button').forEach(link => {
      link.addEventListener('click', () => {
        menuOpen = false;
        navLinks.classList.remove('open');
        hamburger.innerHTML = '&#9776;';
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- SCROLL REVEAL ----
  const revealSelectors = [
    '.concerns .section-title', '.concern-card', '.trust-inner span',
    '.content-block h3', '.info-box h3', '.benefit-card',
    '.number-card', '.process-step', '.badge', '.final-cta h2',
    '.about-text h2', '.business-title', '.concern-header h2'
  ];
  revealSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', '');
        el.style.transitionDelay = `${(i % 5) * 0.07}s`;
      }
    });
  });
  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('[data-reveal]').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('[data-reveal]').forEach(el => el.classList.add('visible'));
  }

  // ---- NAV SCROLL ----
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 60 ? '0 4px 24px rgba(28,20,16,0.1)' : 'none';
  }, { passive: true });

  // ---- SMOOTH ANCHOR ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 80, behavior: 'smooth' });
      }
    });
  });

});
