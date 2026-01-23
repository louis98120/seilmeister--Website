/**
 * Seilmeister - Main JavaScript
 * Professional Industrial Climbing & Height Access Services
 *
 * STRUKTUR:
 * 1. Header Scroll Effect
 * 2. Mobile Navigation
 * 3. Smooth Scroll
 * 4. Contact Form Validation
 * 5. Intersection Observer (Animations)
 * 6. Lazy Loading
 * 7. Cookie Consent
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration (use SITE_CONFIG if available)
  // ==========================================================================

  const config = typeof SITE_CONFIG !== 'undefined' ? SITE_CONFIG : {
    api: { contact: '/api/contact' },
    cookies: { storageKey: 'seilmeister-cookie-consent', bannerDelay: 500 }
  };

  // ==========================================================================
  // Header Scroll Effect
  // ==========================================================================

  const header = document.getElementById('header');

  function handleScroll() {
    if (!header) return;
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

  function closeMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.remove('mobile-nav--open');
    menuToggle.classList.remove('menu-toggle--active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.style.overflow = '';
  }

  function openMobileNav() {
    if (!mobileNav || !menuToggle) return;
    mobileNav.classList.add('mobile-nav--open');
    menuToggle.classList.add('menu-toggle--active');
    menuToggle.setAttribute('aria-expanded', 'true');
    menuToggle.setAttribute('aria-label', 'Menü schließen');
    document.body.style.overflow = 'hidden';
  }

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function() {
      const isOpen = mobileNav.classList.contains('mobile-nav--open');
      isOpen ? closeMobileNav() : openMobileNav();
    });

    // Close menu on link click
    mobileNav.querySelectorAll('.mobile-nav__link').forEach(function(link) {
      link.addEventListener('click', closeMobileNav);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && mobileNav.classList.contains('mobile-nav--open')) {
        closeMobileNav();
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

      // Get form fields (only if they exist)
      const nameField = document.getElementById('name');
      const emailField = document.getElementById('email');
      const messageField = document.getElementById('message');
      const privacyField = document.getElementById('privacy');

      // Optional fields
      const subjectField = document.getElementById('subject');
      const companyField = document.getElementById('company');
      const phoneField = document.getElementById('phone');

      let isValid = true;
      const errors = [];

      // Reset previous error states
      contactForm.querySelectorAll('.form-input, .form-textarea, .form-select').forEach(function(input) {
        input.classList.remove('form-input--error');
        input.style.borderColor = '';
      });

      // Validate name
      if (nameField && !nameField.value.trim()) {
        isValid = false;
        nameField.classList.add('form-input--error');
        errors.push('Bitte geben Sie Ihren Namen ein.');
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailField && (!emailField.value.trim() || !emailRegex.test(emailField.value))) {
        isValid = false;
        emailField.classList.add('form-input--error');
        errors.push('Bitte geben Sie eine gültige E-Mail-Adresse ein.');
      }

      // Validate subject (only if field exists and is required)
      if (subjectField && subjectField.hasAttribute('required') && !subjectField.value) {
        isValid = false;
        subjectField.classList.add('form-input--error');
        errors.push('Bitte wählen Sie einen Betreff aus.');
      }

      // Validate message
      if (messageField && !messageField.value.trim()) {
        isValid = false;
        messageField.classList.add('form-input--error');
        errors.push('Bitte geben Sie eine Nachricht ein.');
      }

      // Validate privacy checkbox
      if (privacyField && !privacyField.checked) {
        isValid = false;
        errors.push('Bitte stimmen Sie der Datenschutzerklärung zu.');
      }

      // Show errors inline or via alert
      if (!isValid) {
        showFormErrors(errors);
        return;
      }

      // Get submit button and disable it
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn ? submitBtn.textContent : '';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Wird gesendet...';
      }

      // Collect form data
      const formData = {
        name: nameField ? nameField.value.trim() : '',
        email: emailField ? emailField.value.trim() : '',
        message: messageField ? messageField.value.trim() : ''
      };

      // Add optional fields if they exist and have values
      if (companyField && companyField.value.trim()) {
        formData.company = companyField.value.trim();
      }
      if (phoneField && phoneField.value.trim()) {
        formData.phone = phoneField.value.trim();
      }
      if (subjectField && subjectField.value) {
        formData.subject = subjectField.value;
      }

      // Send to API
      fetch(config.api.contact, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(function(response) {
        return response.json().then(function(data) {
          if (!response.ok) {
            throw new Error(data.error || 'Ein Fehler ist aufgetreten.');
          }
          return data;
        });
      })
      .then(function() {
        // Success
        showFormSuccess('Vielen Dank für Ihre Nachricht! Wir werden uns zeitnah bei Ihnen melden.');
        contactForm.reset();
      })
      .catch(function(error) {
        // Error
        showFormErrors(['Fehler beim Senden. Bitte versuchen Sie es später erneut oder kontaktieren Sie uns direkt per E-Mail.']);
        console.error('Form submission error:', error);
      })
      .finally(function() {
        // Re-enable button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalBtnText;
        }
      });
    });
  }

  // Form feedback helpers
  function showFormErrors(errors) {
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = 'form-alert form-alert--error';
    alertDiv.innerHTML = `
      <strong>Bitte korrigieren Sie folgende Fehler:</strong>
      <ul>${errors.map(e => `<li>${e}</li>`).join('')}</ul>
    `;

    const form = document.getElementById('contact-form');
    if (form) {
      form.insertBefore(alertDiv, form.firstChild);
      alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  function showFormSuccess(message) {
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) existingAlert.remove();

    const alertDiv = document.createElement('div');
    alertDiv.className = 'form-alert form-alert--success';
    alertDiv.innerHTML = `<p>${message}</p>`;

    const form = document.getElementById('contact-form');
    if (form) {
      form.insertBefore(alertDiv, form.firstChild);
      alertDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // ==========================================================================
  // Intersection Observer for Animations
  // ==========================================================================

  if ('IntersectionObserver' in window) {
    const animateElements = document.querySelectorAll('.card, .service-card, .value-card, .feature, .service-block, .safety-point');

    if (animateElements.length > 0) {
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
  const storageKey = config.cookies.storageKey;

  function getCookieConsent() {
    return localStorage.getItem(storageKey);
  }

  function setCookieConsent(value) {
    localStorage.setItem(storageKey, value);
  }

  function showCookieBanner() {
    if (cookieBanner) {
      setTimeout(function() {
        cookieBanner.classList.add('cookie-banner--visible');
      }, config.cookies.bannerDelay);
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
      showCookieBanner();
    }

    if (cookieAccept) {
      cookieAccept.addEventListener('click', function() {
        setCookieConsent('accepted');
        hideCookieBanner();
      });
    }

    if (cookieDecline) {
      cookieDecline.addEventListener('click', function() {
        setCookieConsent('declined');
        hideCookieBanner();
      });
    }
  }

})();
