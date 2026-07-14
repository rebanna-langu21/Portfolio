/* ============================================================
   REBANNA LANGU — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */

// ── DOM Ready ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initScrollProgress();
  initScrollReveal();
  initTypingAnimation();
  initSkillBars();
  initProjectFilter();
  initLightbox();
  initCvModal();
  initReadMoreModal();
  initContactForm();
  initBackToTop();
  setFooterYear();
});

/* ============================================================
   THEME TOGGLE (Dark / Light)
   ============================================================ */
function initTheme() {
  const toggle = document.getElementById('themeToggle');
  const icon   = document.getElementById('themeIcon');
  const html   = document.documentElement;

  const saved = localStorage.getItem('portfolio-theme') || 'dark';
  applyTheme(saved);

  toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    applyTheme(current === 'dark' ? 'light' : 'dark');
  });

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    icon.className = theme === 'dark' ? 'ri-sun-line' : 'ri-moon-line';
  }
}

/* ============================================================
   NAVBAR
   ============================================================ */
function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks  = document.getElementById('navLinks');
  const links     = document.querySelectorAll('.nav-link');

  // Scroll: sticky style
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Mobile toggle
  navToggle.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    navToggle.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', open);
  });

  // Close on link click
  links.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('open');
    });
  });

  // Active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   SCROLL PROGRESS BAR
   ============================================================ */
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    bar.style.width = docHeight > 0 ? `${(scrollTop / docHeight) * 100}%` : '0%';
  }, { passive: true });
}

/* ============================================================
   SCROLL REVEAL ANIMATIONS
   ============================================================ */
function initScrollReveal() {
  const elements = document.querySelectorAll('[data-reveal]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.getAttribute('data-delay') || '0');
        setTimeout(() => {
          entry.target.classList.add('revealed');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ============================================================
   TYPING ANIMATION
   ============================================================ */
function initTypingAnimation() {
  const el     = document.getElementById('typingText');
  if (!el) return;

  const words  = [
    'Digital Marketing Specialist',
    'SEO Strategist',
    'Campaign Manager',
    'Social Media Expert',
    'Performance Analyst',
    'Brand Growth Driver'
  ];

  let wordIdx  = 0;
  let charIdx  = 0;
  let deleting = false;
  const speed  = { type: 80, delete: 40, pause: 1800 };

  function type() {
    const current = words[wordIdx];
    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
    }

    let timeout = deleting ? speed.delete : speed.type;

    if (!deleting && charIdx === current.length) {
      timeout = speed.pause;
      deleting = true;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      wordIdx  = (wordIdx + 1) % words.length;
      timeout  = 300;
    }

    setTimeout(type, timeout);
  }

  type();
}

/* ============================================================
   SKILL BARS — Animate on reveal
   ============================================================ */
function initSkillBars() {
  const fills = document.querySelectorAll('.skill-fill');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target;
        const width = fill.getAttribute('data-width');
        setTimeout(() => { fill.style.width = width + '%'; }, 200);
        observer.unobserve(fill);
      }
    });
  }, { threshold: 0.2 });

  fills.forEach(fill => observer.observe(fill));
}

/* ============================================================
   PROJECT FILTER
   ============================================================ */
function initProjectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card');

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
          card.classList.remove('hidden');
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => card.classList.add('hidden'), 300);
        }
      });
    });
  });
}

/* ============================================================
   LIGHTBOX — Design cards + Certificate cards
   ============================================================ */
function initLightbox() {
  const modal   = document.getElementById('lightboxModal');
  const img     = document.getElementById('lightboxImg');
  const close   = document.getElementById('lightboxClose');
  const prev    = document.getElementById('lightboxPrev');
  const next    = document.getElementById('lightboxNext');
  const overlay = document.getElementById('modalOverlay');

  let images  = [];
  let current = 0;

  // Collect all lightbox images
  function collectImages() {
    return Array.from(document.querySelectorAll('[data-lightbox]'));
  }

  // Open lightbox
  function openLightbox(src, idx) {
    img.src  = src;
    current  = idx;
    modal.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    images = collectImages();
  }

  // Close lightbox
  function closeLightbox() {
    modal.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  function showImage(idx) {
    images = collectImages();
    if (!images.length) return;
    current = (idx + images.length) % images.length;
    img.style.opacity = '0';
    setTimeout(() => {
      img.src = images[current].src;
      img.style.opacity = '1';
    }, 150);
    img.style.transition = 'opacity 0.15s ease';
  }

  // Attach click to all lightbox items
  document.querySelectorAll('[data-lightbox]').forEach((el, idx) => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      images = collectImages();
      openLightbox(el.src, idx);
    });
  });

  // Also attach to cert-img-wrap clicks
  document.querySelectorAll('.cert-img-wrap').forEach(wrap => {
    wrap.addEventListener('click', () => {
      const certImg = wrap.querySelector('.cert-img');
      if (certImg) {
        images = collectImages();
        const idx = images.findIndex(i => i.src === certImg.src);
        openLightbox(certImg.src, idx >= 0 ? idx : 0);
      }
    });
  });

  close.addEventListener('click', closeLightbox);
  prev.addEventListener('click', () => showImage(current - 1));
  next.addEventListener('click', () => showImage(current + 1));

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(current - 1);
    if (e.key === 'ArrowRight') showImage(current + 1);
  });
}

/* ============================================================
   CV MODAL
   ============================================================ */
function initCvModal() {
  const modal   = document.getElementById('cvModal');
  const openBtn = document.getElementById('openCvModal');
  const viewBtn = document.getElementById('viewCvBtn');
  const closeBtn= document.getElementById('cvModalClose');
  const overlay = document.getElementById('modalOverlay');

  function openModal() {
    modal.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    modal.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openModal);
  if (viewBtn) {
    viewBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  }
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
  });
}

/* ============================================================
   READ MORE MODALS
   ============================================================ */
function initReadMoreModal() {
  const modal    = document.getElementById('readMoreModal');
  const content  = document.getElementById('readMoreContent');
  const closeBtn = document.getElementById('readMoreClose');
  const overlay  = document.getElementById('modalOverlay');

  const details = {
    mkopa: {
      title: 'M-KOPA Growth Strategy',
      tag:   'Growth Strategy',
      body:  `
        <p>This project involved developing a comprehensive growth strategy for M-KOPA, a leading asset financing company operating across East and West Africa. The strategy focused on expanding their digital acquisition channels, deepening brand awareness among underserved communities, and improving customer retention metrics.</p>
        <p>Key deliverables included a competitive landscape analysis, audience segmentation framework, digital channel mix recommendation (SEO, paid social, content marketing), and a phased KPI roadmap covering 12 months of execution.</p>
        <p>The strategy incorporated data from M-KOPA's existing analytics stack and was benchmarked against regional fintech competitors, resulting in a prioritized action plan with projected growth targets for each digital channel.</p>
      `
    },
    dstv: {
      title: 'DSTV Campaign Plan',
      tag:   'Campaign Planning',
      body:  `
        <p>This project entailed a full-funnel campaign plan designed for DSTV, one of Africa's largest pay-TV and streaming providers. The campaign addressed two parallel objectives: subscriber retention and new subscriber acquisition, targeting distinct audience segments with tailored messaging.</p>
        <p>The plan covered creative brief development, media mix strategy across TV, social media, display, and programmatic channels, budget allocation models, and a detailed campaign timeline spanning a full broadcast season.</p>
        <p>Measurement frameworks were also defined, including KPIs for awareness, consideration, and conversion stages, with recommendations for A/B testing creative variants and optimizing ad spend in real time.</p>
      `
    },
    insta: {
      title: 'Instagram Ad Campaign',
      tag:   'Paid Social',
      body:  `
        <p>This project covered the end-to-end planning and execution of an Instagram advertising campaign, from initial audience research through to creative development, A/B testing design, and performance reporting.</p>
        <p>The campaign leveraged Meta Business Suite for audience segmentation, targeting interest-based, demographic, and lookalike audiences. Creative assets included static posts, carousel ads, and Stories placements, each optimised for different funnel stages.</p>
        <p>Performance data was tracked using Meta Pixel and GA4, with weekly optimisation cycles adjusting bids, audiences, and creatives based on CTR, CPC, and ROAS benchmarks. The project demonstrates applied knowledge of paid social strategy and performance analytics.</p>
      `
    },
    hotfro: {
      title: 'Hotfro Digital Marketing Strategy',
      tag:   'Digital Strategy',
      body:  `
        <p>Hotfro required a comprehensive digital marketing strategy to establish and grow its online presence. This project encompassed brand positioning, a social media content roadmap, SEO foundation-setting, and a content marketing direction aligned with the brand's visual identity.</p>
        <p>The strategy began with an audit of Hotfro's existing digital touchpoints, followed by competitive benchmarking within their industry vertical. From this foundation, a 6-month digital roadmap was developed, outlining priority channels, content pillars, publishing cadence, and budget recommendations.</p>
        <p>SEO recommendations included technical site improvements, keyword targeting by buyer journey stage, and a content brief series for blog and social posts — all designed to improve organic discoverability and build long-term brand authority.</p>
      `
    },
    calendar: {
      title: 'Content Calendar',
      tag:   'Content Planning',
      body:  `
        <p>This strategic content calendar maps multi-platform publishing schedules across Instagram, TikTok, LinkedIn, and Twitter/X over a full quarter. The calendar aligns content themes with key campaign milestones, brand moments, and cultural events relevant to the target audience.</p>
        <p>Each entry in the calendar specifies the content type (video, carousel, static, story), caption direction, hashtag sets, posting time, and responsible owner. The calendar was built to support a 5-posts-per-week cadence across platforms while maintaining brand consistency.</p>
        <p>The tool enables marketing teams to plan ahead, avoid content gaps, and maintain a coherent narrative across all channels throughout the quarter — directly supporting audience growth and engagement targets.</p>
      `
    },
    tiktok: {
      title: 'Social Media Management (TikTok)',
      tag:   'Social Media',
      body:  `
        <p>This project involved full TikTok channel management for a brand seeking to grow its short-form video presence. Responsibilities included content ideation aligned with trending audio and formats, scripting, directing video production, scheduling, and community engagement.</p>
        <p>The strategy leveraged TikTok's algorithm by focusing on high-retention hooks within the first 3 seconds, consistent posting cadence (5–7 videos per week), and strategic use of trending sounds and hashtag clusters to maximise discovery.</p>
        <p>Monthly analytics reporting tracked follower growth, video views, engagement rate, and profile reach, with insights used to iteratively refine content topics and formats. The channel saw consistent month-over-month growth across all tracked metrics.</p>
      `
    }
  };

  function openModal(key) {
    const data = details[key];
    if (!data) return;
    content.innerHTML = `
      <span class="rm-tag">${data.tag}</span>
      <h3>${data.title}</h3>
      ${data.body}
    `;
    modal.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.read-more-btn').forEach(btn => {
    btn.addEventListener('click', () => openModal(btn.getAttribute('data-modal')));
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('open') && e.key === 'Escape') closeModal();
  });

  // Overlay click closes any open modal
  overlay.addEventListener('click', () => {
    document.querySelectorAll('.lightbox-modal, .cv-modal, .read-more-modal').forEach(m => {
      m.classList.remove('open');
    });
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  });
}

/* ============================================================
   CONTACT FORM VALIDATION
   ============================================================ */
function initContactForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  if (!form) return;

  const fields = {
    firstName: { el: null, err: null, rules: { required: true, min: 2 } },
    lastName:  { el: null, err: null, rules: { required: true, min: 2 } },
    email:     { el: null, err: null, rules: { required: true, email: true } },
    subject:   { el: null, err: null, rules: { required: true, min: 3 } },
    message:   { el: null, err: null, rules: { required: true, min: 10 } }
  };

  Object.keys(fields).forEach(name => {
    fields[name].el  = document.getElementById(name);
    fields[name].err = document.getElementById(`${name}Error`);
  });

  function validate(name) {
    const { el, err, rules } = fields[name];
    const val = el.value.trim();
    let msg   = '';

    if (rules.required && !val) {
      msg = 'This field is required.';
    } else if (rules.min && val.length < rules.min) {
      msg = `Minimum ${rules.min} characters required.`;
    } else if (rules.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      msg = 'Please enter a valid email address.';
    }

    err.textContent = msg;
    el.classList.toggle('invalid', !!msg);
    return !msg;
  }

  // Live validation
  Object.keys(fields).forEach(name => {
    const el = fields[name].el;
    el.addEventListener('input', () => validate(name));
    el.addEventListener('blur',  () => validate(name));
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const valid = Object.keys(fields).map(n => validate(n)).every(Boolean);
    if (!valid) return;

    // Simulate form submission
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="ri-loader-4-line"></i> Sending...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="ri-send-plane-line"></i> Send Message';
      success.classList.add('show');
      setTimeout(() => success.classList.remove('show'), 5000);
    }, 1500);
  });
}

/* ============================================================
   BACK TO TOP
   ============================================================ */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   FOOTER YEAR
   ============================================================ */
function setFooterYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}
