/* ================================================
   MAA SHAKUNTALA COMPUTER CLASSES
   app.js — All Interactions & Animations
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- NAVBAR SCROLL EFFECT ----
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // ---- MOBILE HAMBURGER ----
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // ---- SCROLL REVEAL ANIMATION ----
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, 80 * i);
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(el => revealObserver.observe(el));
  }

  // ---- COUNTER ANIMATION ----
  const counters = document.querySelectorAll('.count');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target);
          let start = 0;
          const duration = 2000;
          const stepTime = Math.abs(Math.floor(duration / target));
          const timer = setInterval(() => {
            start += Math.ceil(target / 80);
            if (start >= target) {
              el.textContent = target;
              clearInterval(timer);
            } else {
              el.textContent = start;
            }
          }, stepTime);
          counterObserver.unobserve(el);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  // ---- FAQ ACCORDION ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    }
  });

  // ---- ADMISSION FORM ----
  const admissionForm = document.getElementById('admissionForm');
  if (admissionForm) {
    admissionForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = admissionForm.querySelector('.form-submit');
      const success = document.getElementById('formSuccess');
      btn.textContent = '⏳ Submitting...';
      btn.disabled = true;
      // Simulate submit (replace with actual PHP backend call)
      setTimeout(() => {
        btn.textContent = '📝 Submit Registration — It\'s Free!';
        btn.disabled = false;
        if (success) {
          success.classList.add('show');
          admissionForm.reset();
          success.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 1500);
    });
  }

  // ---- CONTACT FORM ----
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.form-submit');
      const success = document.getElementById('contactSuccess');
      btn.textContent = '⏳ Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.textContent = '📨 Send Message';
        btn.disabled = false;
        if (success) {
          success.classList.add('show');
          contactForm.reset();
        }
      }, 1500);
    });
  }

  // ---- COURSE FILTER (Courses Page) ----
  const filterBtns = document.querySelectorAll('.filter-btn');
  const courseCards = document.querySelectorAll('.course-full-card');
  if (filterBtns.length && courseCards.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        courseCards.forEach(card => {
          const cat = card.dataset.category;
          if (filter === 'all' || cat === filter) {
            card.style.display = 'grid';
            card.style.animation = 'fadeIn .4s ease';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ---- SMOOTH SCROLL FOR ANCHOR LINKS ----
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- ACTIVE NAV LINK ON SCROLL ----
  const sections = document.querySelectorAll('section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');
  if (sections.length && navLinkEls.length) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      navLinkEls.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) link.classList.add('active');
      });
    });
  }

  // ---- WHATSAPP TOOLTIP ----
  const waBtn = document.querySelector('.float-whatsapp');
  if (waBtn) {
    setTimeout(() => {
      const tooltip = document.createElement('div');
      tooltip.style.cssText = `position:fixed;bottom:100px;right:20px;background:#25d366;color:#fff;font-size:13px;font-weight:600;padding:10px 16px;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,.2);z-index:998;animation:fadeIn .4s ease;`;
      tooltip.textContent = '💬 Chat with us!';
      document.body.appendChild(tooltip);
      setTimeout(() => tooltip.remove(), 4000);
    }, 3000);
  }

  console.log('🖥️ Maa Shakuntala Computer Classes — Website Loaded');
  console.log('📞 Contact: 9304633916 | Danapur, Bihar');
});
