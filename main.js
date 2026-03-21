/* ============================================================
   main.js
   - Nav shadow on scroll
   - Active nav link tracking via IntersectionObserver
   - Scroll-reveal for section content
   ============================================================ */

const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const sections = document.querySelectorAll('section[id]');

/* ----------------------------------------------------------
   1. Nav shadow on scroll
   ---------------------------------------------------------- */
const onScroll = () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
};

window.addEventListener('scroll', onScroll, { passive: true });

/* ----------------------------------------------------------
   2. Active nav link — highlights the link whose section
      is currently most visible in the viewport
   ---------------------------------------------------------- */
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }),
  },
  {
    // Fire when section crosses the 30% threshold from the top
    rootMargin: '-10% 0px -60% 0px',
  }
);

sections.forEach((section) => sectionObserver.observe(section));

/* ----------------------------------------------------------
   3. Scroll-reveal
      Add class="reveal" to any element in HTML to opt in.
      JS adds .visible when it enters the viewport.
   ---------------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target); // animate once
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ----------------------------------------------------------
   4. Smooth scroll offset — accounts for sticky nav height
      Overrides default anchor jump so content isn't hidden
      behind the nav bar.
   ---------------------------------------------------------- */
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();

    const navHeight = nav.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});
