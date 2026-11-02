const root = document.body;
const toggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  root.classList.add('dark');
  toggle.setAttribute('aria-pressed', 'true');
}

toggle.addEventListener('click', () => {
  const isDark = root.classList.toggle('dark');
  toggle.setAttribute('aria-pressed', String(isDark));
  localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
});

document.querySelectorAll('[data-year]').forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((node, index) => {
  node.style.transitionDelay = `${Math.min(index % 3, 2) * 80}ms`;
  observer.observe(node);
});

const copyButton = document.querySelector('.copy-button');
const emailLink = document.querySelector('[data-email]');

copyButton.addEventListener('click', async () => {
  const email = emailLink.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    copyButton.textContent = '已复制 ✓';
    window.setTimeout(() => { copyButton.textContent = '复制邮箱'; }, 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});
