/**
 * Seilmeister - Shared Components
 * Wiederverwendbare Komponenten für alle Seiten
 *
 * VERWENDUNG:
 * 1. In HTML: <div data-component="header"></div>
 * 2. Komponente wird automatisch eingefügt
 */

const SiteComponents = {
  // ========================================
  // SVG Icons (zentral verwaltet)
  // ========================================
  icons: {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>`,
    location: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>`,
    email: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
      <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>`
  },

  // ========================================
  // Header Component
  // ========================================
  header(options = {}) {
    const config = SITE_CONFIG;
    const navItems = config.navigation.main.map(item =>
      `<li><a href="${item.href}" class="nav__link">${item.label}</a></li>`
    ).join('');

    const mobileNavItems = config.navigation.main.map(item =>
      `<li class="mobile-nav__item"><a href="${item.href}" class="mobile-nav__link">${item.label}</a></li>`
    ).join('');

    return `
    <header class="header" id="header">
      <div class="header__inner">
        <a href="index.html" class="logo" aria-label="${config.company.name} Startseite">
          <span class="logo__text">Seil<span>meister</span></span>
        </a>

        <a href="${config.contact.phoneLink}" class="header__phone" style="white-space: nowrap;">
          ${this.icons.phone}
          ${config.contact.phoneFormatted}
        </a>

        <nav class="nav" aria-label="Hauptnavigation">
          <ul class="nav__list">
            ${navItems}
            <li><a href="${config.navigation.cta.href}" class="btn btn--primary btn--sm">${config.navigation.cta.label}</a></li>
          </ul>
        </nav>

        <button class="menu-toggle" id="menu-toggle" aria-label="Menü öffnen" aria-expanded="false">
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
          <span class="menu-toggle__bar"></span>
        </button>
      </div>

      <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile Navigation">
        <ul class="mobile-nav__list">
          ${mobileNavItems}
          <li class="mobile-nav__item"><a href="${config.navigation.cta.href}" class="mobile-nav__link">${config.navigation.cta.label}</a></li>
        </ul>
      </nav>
    </header>`;
  },

  // ========================================
  // Footer Component (Simple Version)
  // ========================================
  footerSimple() {
    const config = SITE_CONFIG;
    return `
    <footer class="footer footer--simple">
      <div class="container">
        <div class="footer__main">
          <div class="footer__brand">
            <span class="logo__text">Seil<span style="color: var(--color-accent);">meister</span></span>
            <p>${config.company.tagline}.<br>${config.company.description}.</p>
          </div>
          <div class="footer__contact-inline">
            <a href="${config.contact.emailLink}">${config.contact.email}</a>
          </div>
        </div>
        <div class="footer__bottom">
          <p>&copy; ${config.company.year} ${config.company.name}</p>
          <div class="footer__legal">
            ${config.footerNav.legal.map(item =>
              `<a href="${item.href}">${item.label}</a>`
            ).join('')}
          </div>
        </div>
      </div>
    </footer>`;
  },

  // ========================================
  // Footer Component (Full Version)
  // ========================================
  footerFull() {
    const config = SITE_CONFIG;
    return `
    <footer class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <div class="footer__logo">
              <span class="logo__text">Seil<span style="color: var(--color-accent);">meister</span></span>
            </div>
            <p class="footer__description">
              Professionelle Seilzugangstechnik für Industrie, Kommunen und Fachfirmen.
              Sicher, effizient und flexibel – in ${config.contact.location} und der Region.
            </p>
          </div>

          <div>
            <h3 class="footer__title">Navigation</h3>
            <ul class="footer__list">
              ${config.footerNav.main.map(item =>
                `<li><a href="${item.href}" class="footer__link">${item.label}</a></li>`
              ).join('')}
            </ul>
          </div>

          <div>
            <h3 class="footer__title">Leistungen</h3>
            <ul class="footer__list">
              ${config.footerNav.services.map(item =>
                `<li><a href="${item.href}" class="footer__link">${item.label}</a></li>`
              ).join('')}
            </ul>
          </div>

          <div>
            <h3 class="footer__title">Kontakt</h3>
            <div class="footer__contact-item">
              <svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>Standort ${config.contact.location}</span>
            </div>
            <div class="footer__contact-item">
              <svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>${config.contact.phoneFormatted}</span>
            </div>
            <div class="footer__contact-item">
              <svg class="footer__contact-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>${config.contact.email}</span>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <div class="footer__bottom-inner">
            <p class="footer__copyright">
              &copy; ${config.company.year} ${config.company.name} – Industrie- & Höhenservice. Alle Rechte vorbehalten.
            </p>
            <div class="footer__legal">
              ${config.footerNav.legal.map(item =>
                `<a href="${item.href}" class="footer__legal-link">${item.label}</a>`
              ).join('')}
              <span style="opacity: 0.5;">|</span>
              <a href="digitale-loesungen.html" class="footer__legal-link" style="color: var(--color-accent-light);">KI-Lösungen für Handwerker</a>
            </div>
          </div>
        </div>
      </div>
    </footer>`;
  },

  // ========================================
  // Cookie Banner Component
  // ========================================
  cookieBanner() {
    return `
    <div class="cookie-banner" id="cookie-banner" role="dialog" aria-label="Cookie-Einstellungen">
      <div class="cookie-banner__inner">
        <p class="cookie-banner__text">
          Wir verwenden Cookies für die Funktion der Website.
          <a href="datenschutz.html">Datenschutz</a>
        </p>
        <div class="cookie-banner__actions">
          <button class="cookie-banner__btn cookie-banner__btn--decline" id="cookie-decline">Ablehnen</button>
          <button class="cookie-banner__btn cookie-banner__btn--accept" id="cookie-accept">OK</button>
        </div>
      </div>
    </div>`;
  },

  // ========================================
  // Floating CTA Button Component
  // ========================================
  floatingCTA() {
    const config = SITE_CONFIG;
    return `
    <a href="${config.contact.phoneLink}" class="floating-cta" id="floating-cta" aria-label="Jetzt anrufen">
      ${this.icons.phone}
    </a>`;
  },

  // ========================================
  // Skip Link Component
  // ========================================
  skipLink() {
    return '<a href="#main-content" class="skip-link">Zum Hauptinhalt springen</a>';
  },

  // ========================================
  // Initialize Components
  // ========================================
  init() {
    // Find all component placeholders and render them
    document.querySelectorAll('[data-component]').forEach(el => {
      const componentName = el.dataset.component;
      const componentOptions = el.dataset.componentOptions
        ? JSON.parse(el.dataset.componentOptions)
        : {};

      switch (componentName) {
        case 'header':
          el.outerHTML = this.header(componentOptions);
          break;
        case 'footer-simple':
          el.outerHTML = this.footerSimple();
          break;
        case 'footer-full':
          el.outerHTML = this.footerFull();
          break;
        case 'cookie-banner':
          el.outerHTML = this.cookieBanner();
          break;
        case 'floating-cta':
          el.outerHTML = this.floatingCTA();
          break;
        case 'skip-link':
          el.outerHTML = this.skipLink();
          break;
      }
    });
  }
};

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  if (typeof SITE_CONFIG !== 'undefined') {
    SiteComponents.init();
  }
});
