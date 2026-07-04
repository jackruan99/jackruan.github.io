/**
 * main.js - Shared site initialization
 * Loads navbar and footer components, sets up theme/UI mode switching,
 * evasive button logic, and scroll reveal animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Set UI mode from localStorage
  const savedUiMode = localStorage.getItem('ui-mode') || 'standard';
  document.body.setAttribute('data-ui-mode', savedUiMode);

  // Load navbar
  const navbarPlaceholder = document.getElementById('navbar-placeholder');
  if (navbarPlaceholder) {
    fetch('/src/components/navbar.html')
      .then(response => response.text())
      .then(data => {
        navbarPlaceholder.innerHTML = data;
        initNavbarLogic();
      });
  }

  // Load footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    fetch('/src/components/footer.html')
      .then(response => response.text())
      .then(data => {
        footerPlaceholder.innerHTML = data;
        initReveal();
      });
  }
});

function initNavbarLogic() {
  // Theme dropdown
  const themeLinks = document.querySelectorAll('[data-set-theme]');
  themeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newTheme = e.target.getAttribute('data-set-theme');
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);

      // Disable naughty mode and reset button positions
      document.body.setAttribute('data-ui-mode', 'standard');
      localStorage.setItem('ui-mode', 'standard');
      const buttons = document.querySelectorAll('.white-border-button');
      buttons.forEach(btn => btn.style.transform = '');
    });
  });

  // UI Mode dropdown
  const uiLinks = document.querySelectorAll('[data-set-ui]');
  uiLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const newUi = e.target.getAttribute('data-set-ui');
      document.body.setAttribute('data-ui-mode', newUi);
      localStorage.setItem('ui-mode', newUi);

      if (newUi === 'standard') {
        const buttons = document.querySelectorAll('.white-border-button');
        buttons.forEach(btn => btn.style.transform = '');
      }
    });
  });

  // Evasive button logic
  const buttons = document.querySelectorAll('.white-border-button');
  buttons.forEach(btn => {
    btn.addEventListener('mouseover', () => {
      if (document.body.getAttribute('data-ui-mode') === 'hard') {
        const randomX = Math.floor(Math.random() * 300) - 150;
        const randomY = Math.floor(Math.random() * 300) - 150;
        btn.style.transform = `translate(${randomX}px, ${randomY}px)`;
      }
    });
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
