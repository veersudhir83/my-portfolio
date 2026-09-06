// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
});
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => revealObserver.observe(el));

// Animated counters
const countEls = document.querySelectorAll('.impact-number');
const countObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1400;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
        if (progress < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
countEls.forEach((el) => countObserver.observe(el));

// Spotlight cursor-glow on cards
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
document.querySelectorAll('.spotlight').forEach((el) => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--x', `${e.clientX - rect.left}px`);
    el.style.setProperty('--y', `${e.clientY - rect.top}px`);
  });
});

// Timeline scroll-linked progress line
const timelineEl = document.querySelector('.timeline');
if (timelineEl && !reduceMotion) {
  const updateTimelineProgress = () => {
    const rect = timelineEl.getBoundingClientRect();
    const total = rect.height + window.innerHeight * 0.5;
    const scrolled = window.innerHeight * 0.7 - rect.top;
    const progress = Math.min(Math.max(scrolled / total, 0), 1);
    timelineEl.style.setProperty('--progress', progress.toFixed(3));
  };
  window.addEventListener('scroll', updateTimelineProgress, { passive: true });
  updateTimelineProgress();
}

// Contact form -> mailto (no backend/service configured)
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = new FormData(contactForm);
  const name = data.get('name');
  const email = data.get('email');
  const engagement = data.get('engagement');
  const message = data.get('message');

  const subject = encodeURIComponent(`Project inquiry: ${engagement}`);
  const body = encodeURIComponent(
    `Name: ${name}\nEmail: ${email}\nLooking for: ${engagement}\n\n${message}`
  );
  window.location.href = `mailto:veersudhir83@gmail.com?subject=${subject}&body=${body}`;
});
