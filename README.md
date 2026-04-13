# Resume Builder — Stage 1

A professional resume builder for Pakistani students & job seekers.
Built with React + Vite. Download costs Rs. 150 paid via JazzCash/Easypaisa.

---

## Stage Roadmap

| Stage | Status | What's included |
|-------|--------|-----------------|
| **1 — Templates & Gallery** | Done | 4 pro templates, gallery page, full-screen preview |
| **2 — Form Builder** | Next | Multi-step form, live preview panel, template switcher |
| **3 — Payment Flow** | Pending | Pay modal, screenshot upload, order submission |
| **4 — Admin Panel** | Pending | Password-protected order management page |

---

## Setup

```bash
cd resume-builder
npm install
npm run dev
# Open http://localhost:5173
```

---

## Project Structure

```
src/
├── App.jsx                     # Root — manages screen routing
├── main.jsx                    # React DOM entry
├── index.css                   # Global styles
├── data/
│   └── sampleData.js           # Sample data for template previews
├── templates/
│   ├── index.js                # Template registry
│   ├── ExecutiveClassic.jsx/css  # Black & gold, luxury serif
│   ├── ModernSidebar.jsx/css     # Navy sidebar, tech-forward
│   ├── EditorialMinimal.jsx/css  # Magazine editorial, sophisticated
│   └── BoldImpact.jsx/css        # Dark header, teal geometric
└── components/
    ├── TemplateGallery.jsx     # Gallery with cards + full-screen preview
    └── TemplateGallery.css
```

---

## Template Data Shape

All 4 templates accept the same `data` prop:

```js
{
  personal: { name, title, email, phone, location, linkedin, github },
  summary: String,
  education: [{ id, degree, institution, location, startDate, endDate, gpa, details }],
  experience: [{ id, title, company, location, startDate, endDate, bullets: [] }],
  projects: [{ id, name, tech, date, bullets: [] }],
  skills: { technical: [], tools: [], languages: [] },
  certifications: [{ id, name, issuer, date }]
}
```

---

## The 4 Templates

1. **Executive Classic** — Black & gold luxury. Cormorant Garamond serif. Best for Finance, Law, Consulting.
2. **Modern Sidebar** — Navy sidebar + DM Sans. Best for Software Engineering, Product, Data.
3. **Editorial Minimal** — Playfair Display + Lora. Magazine-style. Best for Design, Marketing, Academia.
4. **Bold Impact** — Raleway + Space Grotesk, teal accents. Best for Startups, Engineering.
