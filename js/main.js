/**
 * Seilmeister - Main JavaScript
 * Professional Industrial Climbing & Height Access Services
 */

(function() {
  'use strict';

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  const header = document.getElementById('header');

  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // ==========================================================================
  // Mobile Navigation
  // ==========================================================================

  const menuToggle = document.getElementById('menu-toggle');
  const mobileNav = document.getElementById('mobile-nav');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.contains('mobile-nav--open');

      if (isOpen) {
        mobileNav.classList.remove('mobile-nav--open');
        menuToggle.classList.remove('menu-toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Menü öffnen');
        document.body.style.overflow = '';
      } else {
        mobileNav.classList.add('mobile-nav--open');
        menuToggle.classList.add('menu-toggle--active');
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.setAttribute('aria-label', 'Menü schließen');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close menu on link click
    const mobileNavLinks = mobileNav.querySelectorAll('.mobile-nav__link');
    mobileNavLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('mobile-nav--open');
        menuToggle.classList.remove('menu-toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
        mobileNav.classList.remove('mobile-nav--open');
        menuToggle.classList.remove('menu-toggle--active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        menuToggle.focus();
      }
    });
  }

  // ==========================================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================================

  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ==========================================================================
  // Contact Form Validation
  // ==========================================================================

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Get form fields
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');
      const privacy = document.getElementById('privacy');

      let isValid = true;
      const errors = [];

      // Reset previous error states
      const inputs = contactForm.querySelectorAll('.form-input, .form-textarea, .form-select');
      inputs.forEach(function(input) {
        input.style.borderColor = '';
      });

      // Validate name
      if (!name.value.trim()) {
        isValid = false;
        name.style.borderColor = 'var(--color-error)';
        errors.push('Bitte geben Sie Ihren Namen ein.');
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value)) {
        isValid = false;
        email.style.borderColor = 'var(--color-error)';
        errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      }

      // Validate subject
      if (!subject.value) {
        isValid = false;
        subject.style.borderColor = 'var(--color-error)';
        errors.push('Bitte wählen Sie einen Betreff aus.');
      }

      // Validate message
      if (!message.value.trim()) {
        isValid = false;
        message.style.borderColor = 'var(--color-error)';
        errors.push('Bitte geben Sie eine Nachricht ein.');
      }

      // Validate privacy checkbox
      if (!privacy.checked) {
        isValid = false;
        errors.push('Bitte stimmen Sie der Datenschutzerklärung zu.');
      }

      if (!isValid) {
        alert('Bitte korrigieren Sie folgende Fehler:\n\n' + errors.join('\n'));
        return;
      }

      // Form is valid - in production, this would submit to a server
      // For now, show success message
      alert('Vielen Dank für Ihre Nachricht!\n\nWir werden uns zeitnah bei Ihnen melden.');
      contactForm.reset();
    });
  }

  // ==========================================================================
  // FAQ Accordion
  // ==========================================================================

  const accordionItems = document.querySelectorAll('.accordion__item');

  accordionItems.forEach(function(item) {
    const trigger = item.querySelector('.accordion__trigger');

    if (trigger) {
      trigger.addEventListener('click', function() {
        const isOpen = item.classList.contains('accordion__item--open');

        // Close all items
        accordionItems.forEach(function(otherItem) {
          otherItem.classList.remove('accordion__item--open');
        });

        // Open clicked item if it was closed
        if (!isOpen) {
          item.classList.add('accordion__item--open');
        }
      });
    }
  });

  // ==========================================================================
  // Intersection Observer for Animations
  // ==========================================================================

  if ('IntersectionObserver' in window) {
    const animateElements = document.querySelectorAll('.card, .service-card, .value-card, .feature');

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach(function(el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // ==========================================================================
  // Lazy Loading Images (Native)
  // ==========================================================================

  // Add loading="lazy" to images that don't have it
  document.querySelectorAll('img:not([loading])').forEach(function(img) {
    img.setAttribute('loading', 'lazy');
  });

  // ==========================================================================
  // Cookie Consent Banner
  // ==========================================================================

  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');
  const cookieDecline = document.getElementById('cookie-decline');

  // Check if user has already made a choice
  function getCookieConsent() {
    return localStorage.getItem('seilmeister-cookie-consent');
  }

  // Save cookie consent choice
  function setCookieConsent(value) {
    localStorage.setItem('seilmeister-cookie-consent', value);
  }

  // Show/hide banner
  function showCookieBanner() {
    if (cookieBanner) {
      setTimeout(function() {
        cookieBanner.classList.add('cookie-banner--visible');
      }, 500);
    }
  }

  function hideCookieBanner() {
    if (cookieBanner) {
      cookieBanner.classList.remove('cookie-banner--visible');
    }
  }

  // Initialize cookie consent
  if (cookieBanner) {
    const consent = getCookieConsent();

    if (!consent) {
      // No choice made yet - show banner
      showCookieBanner();
    }

    // Accept button
    if (cookieAccept) {
      cookieAccept.addEventListener('click', function() {
        setCookieConsent('accepted');
        hideCookieBanner();
        // Here you could initialize analytics/tracking if needed
      });
    }

    // Decline button
    if (cookieDecline) {
      cookieDecline.addEventListener('click', function() {
        setCookieConsent('declined');
        hideCookieBanner();
      });
    }
  }

})();
