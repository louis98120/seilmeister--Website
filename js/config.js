/**
 * Seilmeister - Site Configuration
 * Zentrale Konfiguration für die gesamte Website
 *
 * ANLEITUNG: Alle Kontaktdaten und Texte hier ändern -
 * sie werden automatisch auf allen Seiten aktualisiert.
 */

const SITE_CONFIG = {
  // ========================================
  // Firmeninformationen
  // ========================================
  company: {
    name: 'Seilmeister',
    slogan: 'SEIL-MEISTER – da keine Meister vom Himmel fallen',
    tagline: 'Industrieklettern in Paderborn',
    description: 'Höhenarbeiten ohne Gerüst',
    year: new Date().getFullYear() // Automatisch aktuelles Jahr
  },

  // ========================================
  // Kontaktdaten
  // ========================================
  contact: {
    phone: '+49 159 06717097',
    phoneLink: 'tel:+4915906717097',
    phoneFormatted: '+49&nbsp;159&nbsp;06717097',
    email: 'info@seil-meister.de',
    emailLink: 'mailto:info@seil-meister.de',
    location: 'Paderborn',
    region: 'Paderborn und Umgebung',
    serviceRadius: '150 km'
  },

  // ========================================
  // Navigation
  // ========================================
  navigation: {
    main: [
      { label: 'Industrieservice', href: 'industrieservice.html' },
      { label: 'Baumservice', href: 'baumpflege.html' },
      { label: 'Netzwerk', href: 'kooperationen.html' }
    ],
    cta: { label: 'Kontakt', href: 'kontakt.html' }
  },

  // ========================================
  // Footer Navigation
  // ========================================
  footerNav: {
    main: [
      { label: 'Startseite', href: 'index.html' },
      { label: 'Industrieservice', href: 'industrieservice.html' },
      { label: 'Baumservice', href: 'baumpflege.html' },
      { label: 'Digitale Lösungen', href: 'digitale-loesungen.html' },
      { label: 'Partnernetzwerk', href: 'kooperationen.html' },
      { label: 'Kontakt', href: 'kontakt.html' }
    ],
    services: [
      { label: 'Zugangstechnik', href: 'industrieservice.html#zugangstechnik' },
      { label: 'Montage & Demontage', href: 'industrieservice.html#montage' },
      { label: 'Reinigung & Wartung', href: 'industrieservice.html#reinigung' },
      { label: 'Baumservice', href: 'baumpflege.html' },
      { label: 'Fremdsicherung', href: 'industrieservice.html#fremdsicherung' }
    ],
    legal: [
      { label: 'Impressum', href: 'impressum.html' },
      { label: 'Datenschutz', href: 'datenschutz.html' },
      { label: 'AGB', href: 'agb.html' }
    ]
  },

  // ========================================
  // SEO & Meta
  // ========================================
  seo: {
    defaultTitle: 'Seilmeister – Industrieklettern in Paderborn',
    defaultDescription: 'Industrieklettern in Paderborn: Arbeiten an schwer zugänglichen Stellen ohne teures Gerüst. FISAT-zertifiziert, versichert, schnell vor Ort.',
    keywords: 'Industrieklettern, Seilzugangstechnik, Höhenarbeiten, Paderborn, Baumpflege, ohne Gerüst'
  },

  // ========================================
  // API Endpoints
  // ========================================
  api: {
    contact: '/api/contact'
  },

  // ========================================
  // Cookie Consent
  // ========================================
  cookies: {
    storageKey: 'seilmeister-cookie-consent',
    bannerDelay: 500
  }
};

// Export für Module (falls benötigt)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SITE_CONFIG;
}
