/* ═══════════════════════════════════════════════════════════════
   TiNAAK Integrated Services — Shared JS  v3.0
   Navigation · Footer · Parallax · Reveal · WhatsApp FAB
   Mobile CTA · Counters · Utilities
═══════════════════════════════════════════════════════════════ */

/* ── WORKER ENDPOINT ── */
const WORKER = 'https://tinaak-forms-worker.judge-raman.workers.dev';

/* ── NAV LOGO SVG ── */
const LOGO_COLOUR = `<svg width="240" height="58" viewBox="0 0 270 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="4,52 14,8 22,8 13,52" fill="#0FA3A3"/>
  <polygon points="17,52 26,16 33,16 25,52" fill="#0FA3A3" opacity="0.55"/>
  <polygon points="28,52 36,25 42,25 35,52" fill="#0FA3A3" opacity="0.28"/>
  <text x="50" y="46" font-family="Montserrat,sans-serif" font-weight="800" font-size="38" fill="#0F2747">T</text>
  <text x="77" y="46" font-family="Montserrat,sans-serif" font-weight="800" font-size="34" fill="#0FA3A3">i</text>
  <text x="88" y="46" font-family="Montserrat,sans-serif" font-weight="800" font-size="38" fill="#0F2747">NAAK</text>
  <line x1="50" y1="51" x2="268" y2="51" stroke="#0FA3A3" stroke-width="0.8" opacity="0.25"/>
  <text x="52" y="62" font-family="Montserrat,sans-serif" font-weight="700" font-size="10" fill="#0FA3A3" letter-spacing="2.5">INTEGRATED SERVICES</text>
</svg>`;

const LOGO_WHITE = `<svg width="240" height="58" viewBox="0 0 270 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <polygon points="4,52 14,8 22,8 13,52" fill="#0FA3A3"/>
  <polygon points="17,52 26,16 33,16 25,52" fill="#0FA3A3" opacity="0.55"/>
  <polygon points="28,52 36,25 42,25 35,52" fill="#0FA3A3" opacity="0.28"/>
  <text x="50" y="46" font-family="Montserrat,sans-serif" font-weight="800" font-size="38" fill="#FFFFFF">T</text>
  <text x="77" y="46" font-family="Montserrat,sans-serif" font-weight="800" font-size="34" fill="#0FA3A3">i</text>
  <text x="88" y="46" font-family="Montserrat,sans-serif" font-weight="800" font-size="38" fill="#FFFFFF">NAAK</text>
  <line x1="50" y1="51" x2="268" y2="51" stroke="#0FA3A3" stroke-width="0.8" opacity="0.25"/>
  <text x="52" y="62" font-family="Montserrat,sans-serif" font-weight="700" font-size="10" fill="#0FA3A3" letter-spacing="2.5">INTEGRATED SERVICES</text>
</svg>`;

/* ── INJECT NAV ── */
function injectNav(activePage, darkMode) {
  const nav = document.getElementById('site-nav');
  if (!nav) return;
  if (darkMode) nav.classList.add('nav-dark');

  const logo = darkMode ? LOGO_WHITE : LOGO_COLOUR;
  const links = [
    { href: 'services.html',  label: 'Services' },
    { href: 'network.html',   label: 'Network' },
    { href: 'products.html',  label: 'Products' },
    { href: 'insights.html',  label: 'Insights' },
    { href: 'about.html',     label: 'About' },
  ];

  const linkHTML = links.map(l =>
    `<li><a href="${l.href}"${activePage === l.href ? ' class="active"' : ''}>${l.label}</a></li>`
  ).join('');

  nav.innerHTML = `
    <a href="index.html" class="nav-logo" aria-label="TiNAAK Integrated Services — Home">${logo}</a>
    <ul class="nav-links" id="navLinks" role="list">
      ${linkHTML}
      <li><a href="careers.html"${activePage === 'careers.html' ? ' class="active"' : ''}>Careers</a></li>
      <li><a href="contact.html" class="nav-cta">Get In Touch</a></li>
    </ul>
    <button class="hamburger" id="hamburger" onclick="toggleNav()" aria-label="Toggle menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  `;

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 20);
  }, { passive: true });
}

function toggleNav() {
  const links = document.getElementById('navLinks');
  const btn = document.getElementById('hamburger');
  const isOpen = links.classList.toggle('open');
  if (btn) btn.setAttribute('aria-expanded', isOpen);
}

/* ── INJECT FOOTER ── */
function injectFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-top">
      <div class="footer-brand">
        ${LOGO_WHITE}
        <p>Integrated workforce, workplace and operational services for enterprise India. Structured Strength. Intelligent Growth.</p>
        <div class="footer-socials">
          <a href="https://www.linkedin.com/company/tinaak/" target="_blank" rel="noopener noreferrer" aria-label="TiNAAK on LinkedIn">in</a>
        </div>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Services</div>
        <ul>
          <li><a href="services.html#managed">Managed Operations</a></li>
          <li><a href="services.html#recruitment">Recruitment &amp; Staffing</a></li>
          <li><a href="services.html#interim">Interim &amp; Contract Staffing</a></li>
          <li><a href="services.html#projects">Projects &amp; Fit-Outs</a></li>
          <li><a href="services.html#advisory">Advisory &amp; Training</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Company</div>
        <ul>
          <li><a href="about.html">About TiNAAK</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="insights.html">Insights</a></li>
          <li><a href="careers.html">Careers</a></li>
          <li><a href="network.html" class="footer-highlight">Partner with Us</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Contact</div>
        <ul>
          <li><a href="mailto:hello@tinaak.com">hello@tinaak.com</a></li>
          <li><a href="mailto:careers@tinaak.com">careers@tinaak.com</a></li>
          <li><a href="mailto:network@tinaak.com">network@tinaak.com</a></li>
          <li><a href="contact.html">Send Enquiry</a></li>
          <li><a href="https://www.linkedin.com/company/tinaak/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="copyright-year"></span> TiNAAK Integrated Services LLP. All rights reserved. Gurugram, Haryana, India.</p>
      <div class="footer-tagline">Structured Strength &middot; Intelligent Growth</div>
    </div>
  `;
  document.getElementById('copyright-year').textContent = new Date().getFullYear();
}

/* ── SCROLL REVEAL (covers .reveal, .tn-stagger children, .section-layer) ── */
function initReveal() {
  const selectors = '.reveal, .tn-stagger > *, .section-layer';
  const els = document.querySelectorAll(selectors);
  if (!els.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 70);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => observer.observe(el));
}

/* ── TN-CARD re-triggerable reveal ── */
function initCardReveal() {
  const cards = document.querySelectorAll('.tn-card');
  if (!cards.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      e.target.classList.toggle('tn-in', e.isIntersecting);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  cards.forEach(c => obs.observe(c));
}

/* ── HERO PARALLAX ── */
function initHeroParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;

  const heroGrid = document.querySelector('.hero-grid');
  const heroGlow = document.querySelector('.hero-glow');
  const pageGrid = document.querySelector('.page-hero-grid');
  const pageGlow = document.querySelector('.page-hero-glow');

  if (!heroGrid && !heroGlow && !pageGrid && !pageGlow) return;

  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (heroGrid) heroGrid.style.transform = `translateY(${y * 0.18}px)`;
    if (heroGlow) heroGlow.style.transform = `translateY(${y * 0.12}px)`;
    if (pageGrid) pageGrid.style.transform = `translateY(${y * 0.15}px)`;
    if (pageGlow) pageGlow.style.transform = `translateY(${y * 0.10}px)`;
  }, { passive: true });
}

/* ── COUNTER ANIMATION ── */
function animateCounters() {
  document.querySelectorAll('[data-count]').forEach(el => {
    const target = parseFloat(el.dataset.count);
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const current = target * ease;
      el.textContent = prefix + (Number.isInteger(target) ? Math.round(current) : current.toFixed(1)) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  });
}

/* ── SCROLL PROGRESS BAR ── */
function initScrollProgress() {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

/* ── WHATSAPP FLOATING BUTTON ── */
function initWhatsAppFAB() {
  const fab = document.getElementById('whatsapp-fab');
  if (!fab) return;
  window.addEventListener('scroll', () => {
    fab.classList.toggle('fab-visible', window.scrollY > 300);
  }, { passive: true });
}

/* ── FILE UPLOAD LABEL ── */
function initFileUploads() {
  document.querySelectorAll('.upload-area').forEach(area => {
    const input = area.querySelector('input[type="file"]');
    if (!input) return;
    input.addEventListener('change', () => {
      const names = Array.from(input.files).map(f => f.name).join(', ');
      const p = area.querySelector('p');
      if (p) p.innerHTML = `<strong>${names}</strong>`;
    });
  });
}

/* ── FORM VALIDATION ── */
const V = {
  _attached: new WeakSet(),
  err(el, msg) {
    el.style.borderColor = '#e53e3e';
    let tip = el.parentElement.querySelector('.v-err');
    if (!tip) {
      tip = document.createElement('p');
      tip.className = 'v-err';
      tip.style.cssText = 'margin:4px 0 0;font-size:11px;color:#e53e3e;';
      el.parentElement.appendChild(tip);
    }
    tip.textContent = msg;
    if (!V._attached.has(el)) {
      V._attached.add(el);
      const clear = () => {
        el.style.borderColor = '';
        const t = el.parentElement.querySelector('.v-err');
        if (t) t.remove();
      };
      el.addEventListener('input', clear);
      el.addEventListener('change', clear);
    }
  },
  clearAll(container) {
    container.querySelectorAll('.v-err').forEach(e => e.remove());
    container.querySelectorAll('[style*="border-color"]').forEach(e => e.style.borderColor = '');
  },
  required:  (v) => v.trim().length > 0,
  email:     (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
  phone:     (v) => v.replace(/[\s\-\+\(\)]/g, '').length >= 8,
  linkedin:  (v) => v.trim() === '' || /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9\-_%]+\/?$/.test(v.trim()),
  fileSize:  (f, mb) => !f || f.size <= mb * 1024 * 1024,
  fileType:  (f, exts) => !f || exts.some(e => f.name.toLowerCase().endsWith(e)),
  run(rules) {
    let valid = true;
    rules.forEach(({ el, checks }) => {
      if (!el) return;
      const val = el.value || '';
      for (const { fn, msg } of checks) {
        if (!fn(val, el)) {
          V.err(el, msg);
          if (valid) { el.focus(); valid = false; }
          break;
        }
      }
    });
    return valid;
  },
  fileRules(id, maxMb, exts, label) {
    const el = document.getElementById(id);
    if (!el || !el.files[0]) return true;
    const f = el.files[0];
    if (!V.fileSize(f, maxMb)) { V.err(el, `${label} must be under ${maxMb}MB`); return false; }
    if (!V.fileType(f, exts))  { V.err(el, `${label} must be ${exts.join(', ')}`); return false; }
    return true;
  }
};

/* ── PARALLAX (data-parallax attribute) ── */
function initParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;
  const els = document.querySelectorAll('[data-parallax]');
  if (!els.length) return;
  window.addEventListener('scroll', () => {
    els.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.06;
      const rect  = el.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  }, { passive: true });
}

/* ── SERVICES SUB-NAV ── */
function initServicesSubnav() {
  const bar = document.getElementById('tn-service-nav');
  if (!bar) return;
  const mainNav = document.getElementById('site-nav');
  const setTop = () => {
    const navH = mainNav ? mainNav.getBoundingClientRect().height : 60;
    bar.style.top = navH + 'px';
  };
  setTop();
  window.addEventListener('resize', setTop, { passive: true });
  // Recalculate on mobile scroll (address bar show/hide changes viewport)
  window.addEventListener('scroll', setTop, { passive: true });
  const hero  = document.querySelector('.page-hero');
  const heroH = hero ? hero.offsetHeight : 300;
  const sids  = ['managed', 'recruitment', 'interim', 'projects', 'advisory'];
  const links = bar.querySelectorAll('.tn-snav-link');
  window.addEventListener('scroll', () => {
    bar.classList.toggle('bar-visible', window.scrollY > heroH - 80);
    let cur = sids[0];
    sids.forEach(id => {
      const s = document.getElementById(id);
      if (s && s.getBoundingClientRect().top <= 120) cur = id;
    });
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }, { passive: true });
}

/* ── PERSPECTIVE TILT (insights) ── */
function initPerspTilt() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.innerWidth < 768) return;
  document.querySelectorAll('.persp-tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r  = card.getBoundingClientRect();
      const x  = (e.clientX - r.left) / r.width  - 0.5;
      const y  = (e.clientY - r.top)  / r.height - 0.5;
      const tX = (-(y * 10)).toFixed(2);
      const tY = (  x * 10 ).toFixed(2);
      card.style.transform = `perspective(800px) rotateX(${tX}deg) rotateY(${tY}deg) scale(1.02)`;
      card.style.boxShadow = `${-x * 16}px ${-y * 16}px 32px rgba(15,39,71,0.14)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
}

/* ── INIT (file uploads only — other inits called per-page) ── */
document.addEventListener('DOMContentLoaded', () => {
  initFileUploads();
});
