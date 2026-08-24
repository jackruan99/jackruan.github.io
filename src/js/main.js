/**
 * main.js - Shared site initialization
 * Loads navbar and footer components, sets up theme switching,
 * and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Helper to fetch component with fallback paths
  const loadComponent = (placeholderId, relativePath, onLoaded) => {
    const el = document.getElementById(placeholderId);
    if (!el) return;

    // Try absolute from root, then relative
    const paths = [
      '/' + relativePath,
      relativePath,
      '../' + relativePath
    ];

    const tryFetch = (index) => {
      if (index >= paths.length) return;
      fetch(paths[index])
        .then(res => {
          if (!res.ok) throw new Error('Not found');
          return res.text();
        })
        .then(data => {
          el.innerHTML = data;
          if (onLoaded) onLoaded();
        })
        .catch(() => tryFetch(index + 1));
    };

    tryFetch(0);
  };

  // Load navbar
  loadComponent('navbar-placeholder', 'src/components/navbar.html', initNavbarLogic);

  // Load footer
  loadComponent('footer-placeholder', 'src/components/footer.html', initReveal);
});

function initNavbarLogic() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  const updateButton = (theme) => {
    const isDark = (theme === 'dark');
    toggleBtn.innerHTML = isDark
      ? '<i class="bi bi-sun-fill"></i> Light Mode'
      : '<i class="bi bi-moon-stars-fill"></i> Dark Mode';
    toggleBtn.setAttribute('title', isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  };

  const currentTheme = document.documentElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
  updateButton(currentTheme);

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('theme', nextTheme);
    updateButton(nextTheme);
  });
}

function initReveal() {
  const observerOptions = { threshold: 0.1 };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
  });
}
