# Rebanna Langu — Portfolio Website

A premium, fully responsive personal portfolio for a Digital Marketing Specialist.

---

## Project Structure

```
portfolio/
├── index.html          ← Main HTML file
├── style.css           ← All styles (dark/light mode, responsive)
├── script.js           ← All JavaScript features
│
└── assets/
    ├── images/
    │   ├── profile.jpg                         ← Your profile photo
    │   ├── projects/
    │   │   ├── m-kopa.jpg
    │   │   ├── dstv.jpg
    │   │   ├── instagram-ad.jpg
    │   │   ├── hotfro.jpg
    │   │   ├── content-calendar.jpg
    │   │   └── tiktok-management.jpg
    │   ├── designs/
    │   │   ├── design-1.jpg
    │   │   ├── design-2.jpg
    │   │   └── design-3.jpg
    │   └── certificates/
    │       ├── cert-1.jpg
    │       ├── cert-2.jpg
    │       └── cert-3.jpg
    │
    └── cv/
        └── Rebanna_Langu_CV.pdf
```

---

## Setup Instructions

1. **Place your images** in the correct folders as shown above.
2. **Place your CV PDF** at `assets/cv/Rebanna_Langu_CV.pdf`.
3. Open `index.html` in a browser — no build step required.

### Image Recommendations
- **Profile photo**: at least 700×800px, portrait orientation, good lighting
- **Project images**: 1200×750px (16:10 aspect ratio works best)
- **Design images**: 800×600px minimum
- **Certificate images**: 900×675px minimum, landscape orientation

---

## Features

- Dark / Light mode toggle (preference saved to localStorage)
- Typing animation hero section
- Scroll reveal animations on all sections
- Animated skill progress bars
- Project category filtering (All / Strategy / Campaign / Content / Social Media)
- Lightbox gallery for design + certificate images
- CV preview modal with embedded PDF viewer + download button
- "Read More" modals with full project descriptions
- Fully validated contact form
- Scroll progress indicator
- Back-to-top button
- Fully responsive: desktop, tablet, mobile

---

## Customisation

All colours and spacing use CSS variables at the top of `style.css` — easy to update.

Key variables:
- `--accent` — Gold tone used throughout (#b08d57 dark / #8b6b3d light)
- `--bg-primary` — Page background
- `--font-display` — Cormorant Garamond (headings)
- `--font-body` — DM Sans (body text)

---

## Certificate & LinkedIn Links

Update the social media `href` attributes in `index.html` with your real LinkedIn and Twitter/Instagram URLs. Search for `href="#"` — those are the placeholder social links.

---

Built for professional use by recruiters, agencies, freelance clients, and corporate opportunities.
