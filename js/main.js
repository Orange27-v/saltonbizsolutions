/* ═══════════════════════════════════════════════════════
   SALTON BUSINESS SOLUTIONS — Main JavaScript
   Navigation, mobile menu, tabs, smooth interactions
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initMobileMenu();
  initWorkflowTabs();
  initSmoothScroll();
});


/* ─── NAV SCROLL BEHAVIOR ───────────────────────────── */
/** Adds a shadow to the navbar when the user scrolls past 50px */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 50;

  function handleScroll() {
    nav.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
  }

  /* Passive listener for scroll performance */
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/* ─── MOBILE MENU TOGGLE ───────────────────────────── */
/** Toggles the mobile navigation menu and hamburger animation */
function initMobileMenu() {
  const hamburger = document.getElementById('nav-hamburger');
  const navLinks = document.getElementById('nav-links');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);

    /* Prevent body scroll when menu is open */
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close menu when a nav link is clicked */
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });
}


/* ─── WORKFLOW TABS ─────────────────────────────────── */
/** Switches active tab in the "Improve workflow" section */
function initWorkflowTabs() {
  const tabContainer = document.getElementById('workflow-tabs');
  if (!tabContainer) return;

  const tabs = tabContainer.querySelectorAll('.workflow__tab');
  const contentArea = document.getElementById('workflow-tab-content');

  /* Content for each tab — Salton's workflow phases */
  const tabContent = {
    research: 'We analyze your business requirements, market landscape, and user needs to define the optimal technology strategy and product roadmap for maximum impact.',
    plan: 'Our team architects scalable solutions with clear milestones, sprint planning, and resource allocation — ensuring on-time, on-budget delivery every time.',
    design: 'From wireframes to pixel-perfect interfaces, we craft intuitive user experiences that delight customers and drive engagement across all platforms.'
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      /* Update active state */
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      /* Update content text if content area exists */
      if (contentArea) {
        const key = tab.dataset.tab;
        contentArea.textContent = tabContent[key] || '';
      }
    });
  });
}


/* ─── SMOOTH SCROLL FOR ANCHOR LINKS ────────────────── */
/** Enables smooth scrolling to sections when clicking anchor links */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (!targetEl) return;

      e.preventDefault();

      const navHeight = document.getElementById('main-nav')?.offsetHeight || 72;
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });
}
