const sections = [...document.querySelectorAll('.panel')];
const navLinks = [...document.querySelectorAll('[data-nav]')];
const currentSection = document.querySelector('[data-current-section]');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const sectionVisibility = new Map(sections.map((section) => [section, 0]));

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      sectionVisibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
    });

    const visible = [...sectionVisibility.entries()]
      .sort((a, b) => b[1] - a[1])[0];

    if (!visible || visible[1] === 0) return;

    const activeSection = visible[0];
    const id = activeSection.id;
    currentSection.textContent = activeSection.dataset.index;

    navLinks.forEach((link) => {
      const target = link.dataset.nav;
      const active = target === id || (target === 'work' && id.startsWith('case-'));
      link.classList.toggle('active', active);
    });
  },
  { threshold: [0.35, 0.55, 0.75] }
);

sections.forEach((section) => sectionObserver.observe(section));

menuButton.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '关闭' : '菜单';
});

mobileNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = '菜单';
  });
});
