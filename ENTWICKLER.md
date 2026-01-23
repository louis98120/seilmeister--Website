# Entwickler-Dokumentation: SeilMeister Website

## Projektstruktur

```
website/
├── css/
│   ├── variables.css    # Design-Tokens (Farben, Spacing, Fonts)
│   ├── base.css         # Reset & Grundstyles
│   ├── components.css   # Wiederverwendbare Komponenten
│   ├── fonts.css        # Font-Definitionen
│   └── main.css         # Hauptstyles + Imports
├── js/
│   ├── config.js        # ⭐ ZENTRALE KONFIGURATION
│   ├── components.js    # Wiederverwendbare HTML-Komponenten
│   └── main.js          # Hauptfunktionalität
├── api/
│   └── contact.js       # Vercel Serverless Function (Kontaktformular)
├── assets/
│   ├── images/          # Bilder
│   ├── fonts/           # Schriftarten
│   └── icons/           # Icons
└── *.html               # Seiten
```

---

## Schnelle Änderungen

### Kontaktdaten ändern
**Datei:** `js/config.js`

```javascript
contact: {
  phone: '+49 159 06717097',      // Telefonnummer
  email: 'info@seil-meister.de',  // E-Mail
  location: 'Paderborn',          // Standort
  serviceRadius: '150 km'         // Einsatzradius
}
```

### Navigation ändern
**Datei:** `js/config.js`

```javascript
navigation: {
  main: [
    { label: 'Industrieservice', href: 'industrieservice.html' },
    { label: 'Baumservice', href: 'baumpflege.html' },
    { label: 'Netzwerk', href: 'kooperationen.html' }
    // Neuen Link hier hinzufügen
  ],
  cta: { label: 'Kontakt', href: 'kontakt.html' }
}
```

### Farben ändern
**Datei:** `css/variables.css`

```css
--color-primary: #1C1C1C;      /* Hauptfarbe (dunkel) */
--color-accent: #C8A45C;       /* Akzentfarbe (gold) */
```

---

## Komponenten-System

### Verfügbare Komponenten

| Komponente | Platzhalter | Beschreibung |
|------------|-------------|--------------|
| Header | `<div data-component="header"></div>` | Navigation + Logo |
| Footer (einfach) | `<div data-component="footer-simple"></div>` | Kompakter Footer |
| Footer (voll) | `<div data-component="footer-full"></div>` | Voller Footer mit Links |
| Cookie Banner | `<div data-component="cookie-banner"></div>` | DSGVO Cookie-Hinweis |
| Floating CTA | `<div data-component="floating-cta"></div>` | Mobiler Anruf-Button |
| Skip Link | `<div data-component="skip-link"></div>` | Accessibility Skip-Link |

### Verwendung (Beispiel)

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <link rel="stylesheet" href="css/main.css">
</head>
<body>
  <div data-component="skip-link"></div>
  <div data-component="header"></div>

  <main id="main-content">
    <!-- Seiteninhalt -->
  </main>

  <div data-component="footer-simple"></div>
  <div data-component="cookie-banner"></div>
  <div data-component="floating-cta"></div>

  <script src="js/config.js"></script>
  <script src="js/components.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

---

## CSS-Architektur

### BEM-Naming
```css
.block {}
.block__element {}
.block--modifier {}
```

### Beispiele
```css
.service-card {}              /* Block */
.service-card__image {}       /* Element */
.service-card__content {}     /* Element */
.service-card--accent {}      /* Modifier */
```

### Wichtige CSS-Klassen

| Klasse | Verwendung |
|--------|------------|
| `.container` | Max-width Container |
| `.section` | Sektion mit Padding |
| `.bg-white` / `.bg-light` | Hintergrundfarben |
| `.btn--primary` | Primärer Button |
| `.btn--outline-light` | Outline Button (auf dunkel) |

---

## Neue Seite erstellen

1. HTML-Datei kopieren (z.B. `kontakt.html`)
2. Head-Bereich anpassen:
   - `<title>` ändern
   - `<meta name="description">` anpassen
3. Inhalt in `<main>` ersetzen
4. Scripts am Ende einbinden:
```html
<script src="js/config.js"></script>
<script src="js/components.js"></script>
<script src="js/main.js"></script>
```

---

## API (Kontaktformular)

**Endpoint:** `/api/contact`
**Methode:** POST

**Request:**
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "message": "Ihre Nachricht..."
}
```

**Response (Erfolg):**
```json
{
  "success": true,
  "message": "E-Mail wurde gesendet"
}
```

---

## Deployment

Die Website wird automatisch über Vercel deployed.

- **Push zu `main`** → Automatisches Deployment
- **Preview-URL** bei Pull Requests

---

## Wartung

### Bilder optimieren
Bilder vor Upload komprimieren:
- JPEG: 80% Qualität
- PNG → WebP konvertieren
- Max. 500KB pro Bild empfohlen

### Jahr aktualisieren
Das Jahr wird automatisch aus `new Date().getFullYear()` in `config.js` generiert.
