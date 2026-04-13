// ─────────────────────────────────────────────────────────────
// generateResumeHTML
// Produces a complete standalone HTML string for the chosen
// template + data. This is attached as a file to the Basin
// submission so you can open it, Ctrl+P → Save as PDF, done.
// ─────────────────────────────────────────────────────────────

// ── Shared helpers ────────────────────────────────────────
const esc = (str = '') =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const bullets = (arr = []) =>
  arr
    .filter(Boolean)
    .map((b) => `<li>${esc(b)}</li>`)
    .join('');

// ── Template: Executive Classic ───────────────────────────
function executiveClassicHTML(d) {
  const {
    personal: p,
    summary,
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
  } = d;

  const contactItems = [p.email, p.phone, p.location, p.linkedin, p.github]
    .filter(Boolean)
    .map(
      (v) =>
        `<div class="ci"><span class="cl">${esc(v.split(':')[0])}</span><span class="cv">${esc(v)}</span></div>`,
    )
    .join('');

  const eduHTML = education
    .map(
      (e) => `
    <div class="exp-item">
      <div class="exp-head">
        <div><span class="exp-title">${esc(e.degree)}</span> <span class="exp-co">${esc(e.institution)}</span></div>
        <div class="exp-right"><span class="exp-date">${esc(e.startDate ? e.startDate + ' – ' + e.endDate : e.endDate)}</span>${e.gpa ? `<span class="gpa">GPA ${esc(e.gpa)}</span>` : ''}</div>
      </div>
      ${e.details ? `<p class="edu-detail">${esc(e.details)}</p>` : ''}
    </div>`,
    )
    .join('');

  const expHTML = experience
    .map(
      (e) => `
    <div class="exp-item">
      <div class="exp-head">
        <div><span class="exp-title">${esc(e.title)}</span><span class="exp-co">${esc(e.company)}</span></div>
        <div class="exp-right"><span class="exp-date">${esc(e.startDate)} — ${esc(e.endDate)}</span><span class="exp-loc">${esc(e.location)}</span></div>
      </div>
      ${e.bullets?.filter(Boolean).length ? `<ul class="blist">${bullets(e.bullets)}</ul>` : ''}
    </div>`,
    )
    .join('');

  const projHTML = projects
    .map(
      (p) => `
    <div class="exp-item">
      <div class="exp-head">
        <div><span class="exp-title">${esc(p.name)}</span><span class="proj-tech">${esc(p.tech)}</span></div>
        <span class="exp-date">${esc(p.date)}</span>
      </div>
      ${p.bullets?.filter(Boolean).length ? `<ul class="blist">${bullets(p.bullets)}</ul>` : ''}
    </div>`,
    )
    .join('');

  const techChips = (skills.technical || [])
    .map((s) => `<span class="chip">${esc(s)}</span>`)
    .join('');
  const toolChips = (skills.tools || [])
    .map((s) => `<span class="chip">${esc(s)}</span>`)
    .join('');
  const certHTML = certifications
    .map(
      (c) =>
        `<div class="cert-item"><span class="cert-name">${esc(c.name)}</span><span class="cert-meta">${esc(c.issuer)} · ${esc(c.date)}</span></div>`,
    )
    .join('');

  return `
<style>
  body{font-family:'Georgia',serif;color:#1c1c1c;margin:0;padding:0}
  .header{background:#111;padding:32px 44px 24px;position:relative}
  .header::after{content:'';position:absolute;bottom:0;left:0;right:0;height:3px;background:linear-gradient(90deg,#c9a96e,#e8d5a3,#c9a96e)}
  h1{font-size:34px;font-weight:600;letter-spacing:4px;text-transform:uppercase;color:#f5f0e8;margin:0 0 6px}
  .job-title{font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#c9a96e}
  .contacts{display:flex;flex-wrap:wrap;gap:4px 28px;margin-top:14px}
  .ci{display:flex;gap:6px;align-items:baseline}
  .cl{font-family:Arial,sans-serif;font-size:8px;letter-spacing:2px;text-transform:uppercase;color:#c9a96e;min-width:48px}
  .cv{font-family:Arial,sans-serif;font-size:9px;color:#c8c0b0}
  .body{padding:28px 44px 36px}
  .section{margin-bottom:20px}
  .sec-head{display:flex;align-items:center;gap:10px;margin-bottom:10px;padding-bottom:6px;border-bottom:1px solid #e8e0d0}
  .orn{font-size:7px;color:#c9a96e}
  .sec-title{font-family:Arial,sans-serif;font-size:9px;font-weight:600;letter-spacing:3px;text-transform:uppercase;color:#555}
  .summary{font-size:11.5px;line-height:1.8;color:#3a3a3a;font-style:italic}
  .exp-item{margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f0ece4}
  .exp-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .exp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:12px;margin-bottom:5px}
  .exp-title{font-size:12px;font-weight:600;color:#1c1c1c;display:block}
  .exp-co{font-family:Arial,sans-serif;font-size:9.5px;letter-spacing:1.5px;text-transform:uppercase;color:#c9a96e;display:block;margin-top:2px}
  .exp-right{text-align:right;flex-shrink:0}
  .exp-date{font-family:Arial,sans-serif;font-size:9.5px;color:#888;display:block}
  .exp-loc{font-family:Arial,sans-serif;font-size:9px;color:#aaa;display:block}
  .gpa{font-family:Arial,sans-serif;font-size:9px;color:#c9a96e;font-weight:600}
  .edu-detail{font-family:Arial,sans-serif;font-size:9px;color:#999;margin-top:3px;line-height:1.5}
  .proj-tech{font-family:Arial,sans-serif;font-size:9px;color:#c9a96e;display:block;margin-top:2px}
  .blist{list-style:none;padding:0;margin:5px 0 0}
  .blist li{font-size:11px;line-height:1.7;color:#3a3a3a;padding-left:14px;position:relative;margin-bottom:2px}
  .blist li::before{content:'—';position:absolute;left:0;color:#c9a96e;font-size:10px}
  .two-col{display:grid;grid-template-columns:1fr 1fr;gap:0 36px}
  .chips{display:flex;flex-wrap:wrap;gap:4px;margin-top:6px}
  .chip{font-family:Arial,sans-serif;font-size:9px;color:#2a2a2a;background:#f5f1ea;border:1px solid #e0d8c8;padding:2px 8px}
  .cert-item{margin-bottom:7px}
  .cert-name{font-size:11px;font-weight:500;color:#2a2a2a;display:block}
  .cert-meta{font-family:Arial,sans-serif;font-size:9px;color:#999}
  .skill-lbl{font-family:Arial,sans-serif;font-size:8px;font-weight:600;letter-spacing:2px;text-transform:uppercase;color:#aaa;display:block;margin-bottom:4px;margin-top:8px}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
<div class="header">
  <h1>${esc(p.name)}</h1>
  <div class="job-title">${esc(p.title)}</div>
  <div class="contacts">${contactItems}</div>
</div>
<div class="body">
  ${summary ? `<div class="section"><div class="sec-head"><span class="orn">◆</span><span class="sec-title">Professional Summary</span></div><p class="summary">${esc(summary)}</p></div>` : ''}
  ${expHTML ? `<div class="section"><div class="sec-head"><span class="orn">◆</span><span class="sec-title">Experience</span></div>${expHTML}</div>` : ''}
  <div class="two-col">
    <div>
      ${eduHTML ? `<div class="section"><div class="sec-head"><span class="orn">◆</span><span class="sec-title">Education</span></div>${eduHTML}</div>` : ''}
      ${certHTML ? `<div class="section"><div class="sec-head"><span class="orn">◆</span><span class="sec-title">Certifications</span></div>${certHTML}</div>` : ''}
    </div>
    <div>
      ${projHTML ? `<div class="section"><div class="sec-head"><span class="orn">◆</span><span class="sec-title">Projects</span></div>${projHTML}</div>` : ''}
      ${
        skills.technical?.length || skills.tools?.length
          ? `
        <div class="section">
          <div class="sec-head"><span class="orn">◆</span><span class="sec-title">Skills</span></div>
          ${skills.technical?.length ? `<span class="skill-lbl">Technical</span><div class="chips">${techChips}</div>` : ''}
          ${skills.tools?.length ? `<span class="skill-lbl">Tools</span><div class="chips">${toolChips}</div>` : ''}
          ${skills.languages?.length ? `<span class="skill-lbl">Languages</span><p style="font-family:Arial,sans-serif;font-size:10px;color:#555">${esc(skills.languages.join(' · '))}</p>` : ''}
        </div>`
          : ''
      }
    </div>
  </div>
</div>`;
}

// ── Template: Modern Sidebar ──────────────────────────────
function modernSidebarHTML(d) {
  const {
    personal: p,
    summary,
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
  } = d;
  const initials = (p.name || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const contactList = [
    p.email &&
      `<div class="ci"><span class="ci-ic">@</span><span>${esc(p.email)}</span></div>`,
    p.phone &&
      `<div class="ci"><span class="ci-ic">✆</span><span>${esc(p.phone)}</span></div>`,
    p.location &&
      `<div class="ci"><span class="ci-ic">◎</span><span>${esc(p.location)}</span></div>`,
    p.linkedin &&
      `<div class="ci"><span class="ci-ic">in</span><span>${esc(p.linkedin)}</span></div>`,
    p.github &&
      `<div class="ci"><span class="ci-ic">gh</span><span>${esc(p.github)}</span></div>`,
  ]
    .filter(Boolean)
    .join('');

  const expHTML = experience
    .map(
      (e) => `
    <div class="exp-item">
      <div class="exp-head">
        <div><p class="exp-title">${esc(e.title)}</p><p class="exp-co">${esc(e.company)} <span class="exp-loc">· ${esc(e.location)}</span></p></div>
        <span class="exp-date">${esc(e.startDate)} – ${esc(e.endDate)}</span>
      </div>
      ${e.bullets?.filter(Boolean).length ? `<ul class="blist">${bullets(e.bullets)}</ul>` : ''}
    </div>`,
    )
    .join('');

  const eduHTML = education
    .map(
      (e) => `
    <div class="exp-item">
      <div class="exp-head">
        <div><p class="exp-title">${esc(e.degree)}</p><p class="exp-co">${esc(e.institution)}</p></div>
        <div style="text-align:right;flex-shrink:0">
          <span class="exp-date">${esc(e.endDate)}</span>
          ${e.gpa ? `<span class="gpa-badge">GPA ${esc(e.gpa)}</span>` : ''}
        </div>
      </div>
      ${e.details ? `<p class="edu-det">${esc(e.details)}</p>` : ''}
    </div>`,
    )
    .join('');

  const projGrid = projects
    .map(
      (pr) => `
    <div class="proj-card">
      <div class="proj-head"><span class="proj-name">${esc(pr.name)}</span><span class="proj-date">${esc(pr.date)}</span></div>
      <span class="proj-tech">${esc(pr.tech)}</span>
      ${pr.bullets?.filter(Boolean).length ? `<ul class="blist sm">${bullets(pr.bullets)}</ul>` : ''}
    </div>`,
    )
    .join('');

  const pills = (arr = []) =>
    arr.map((s) => `<span class="pill">${esc(s)}</span>`).join('');

  return `
<style>
  body{font-family:Arial,sans-serif;margin:0;padding:0;color:#1a202c}
  .wrap{display:flex;min-height:297mm}
  .sidebar{width:200px;background:#0f2040;padding:0 0 28px;flex-shrink:0}
  .sb-top{background:#0a1628;padding:28px 18px 20px;text-align:center;margin-bottom:6px}
  .avatar{width:60px;height:60px;border-radius:50%;background:#2563a8;color:#e0eeff;font-size:20px;font-weight:700;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;border:2px solid rgba(96,165,250,0.3)}
  .sb-name{font-size:13px;font-weight:700;color:#f0f6ff;margin-bottom:4px}
  .sb-title{font-size:8.5px;letter-spacing:1.5px;text-transform:uppercase;color:#60a5fa;line-height:1.4}
  .sb-sec{padding:12px 18px 0}
  .sb-head{font-size:7px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:#60a5fa;margin-bottom:8px;padding-bottom:4px;border-bottom:1px solid rgba(96,165,250,0.2)}
  .ci{display:flex;align-items:flex-start;gap:6px;font-size:8.5px;color:#94a3b8;margin-bottom:5px;word-break:break-all;line-height:1.4}
  .ci-ic{font-size:9px;color:#60a5fa;flex-shrink:0}
  .pills{display:flex;flex-wrap:wrap;gap:4px}
  .pill{font-size:8px;padding:2px 6px;background:rgba(37,99,168,0.35);color:#93c5fd;border:1px solid rgba(96,165,250,0.2)}
  .sb-skill{font-size:8.5px;color:#94a3b8;margin-bottom:3px}
  .sb-cert{margin-bottom:7px}
  .sb-cert-name{display:block;font-size:8.5px;color:#cbd5e1;line-height:1.4;font-weight:500}
  .sb-cert-meta{font-size:8px;color:#60a5fa}
  .main{flex:1;padding:28px 28px 36px}
  .bar-row{display:flex;align-items:center;gap:10px;margin-bottom:12px}
  .bar{display:block;width:4px;height:16px;background:linear-gradient(180deg,#2563a8,#60a5fa);border-radius:2px;flex-shrink:0}
  .sec-title{font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#0f2040}
  .section{margin-bottom:20px}
  .summary{font-size:10.5px;line-height:1.75;color:#4a5568}
  .exp-item{display:flex;gap:10px;margin-bottom:14px;padding-bottom:14px;border-bottom:1px solid #f1f5f9}
  .exp-item:last-child{border-bottom:none;padding-bottom:0;margin-bottom:0}
  .exp-dot{width:8px;height:8px;border-radius:50%;background:#2563a8;flex-shrink:0;margin-top:4px;box-shadow:0 0 0 2px #dbeafe}
  .exp-content{flex:1}
  .exp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:8px;margin-bottom:5px}
  .exp-title{font-size:11.5px;font-weight:700;color:#1a202c;margin:0 0 2px}
  .exp-co{font-size:9.5px;color:#2563a8;font-weight:600;margin:0}
  .exp-loc{font-weight:400;color:#94a3b8}
  .exp-date{font-size:9px;color:#94a3b8;white-space:nowrap;flex-shrink:0}
  .gpa-badge{display:block;font-size:8px;font-weight:700;background:#dbeafe;color:#1e40af;padding:2px 6px;margin-top:3px}
  .edu-det{font-size:9px;color:#94a3b8;margin:3px 0 0;line-height:1.5}
  .blist{list-style:none;padding:0;margin:4px 0 0}
  .blist li{font-size:10.5px;line-height:1.65;color:#4a5568;padding-left:11px;position:relative;margin-bottom:2px}
  .blist li::before{content:'›';position:absolute;left:0;color:#2563a8;font-weight:700}
  .blist.sm li{font-size:9.5px}
  .proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}
  .proj-card{background:#f8fafc;border:1px solid #e2e8f0;border-top:3px solid #2563a8;padding:10px 12px}
  .proj-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px}
  .proj-name{font-size:10.5px;font-weight:700;color:#1a202c}
  .proj-date{font-size:8.5px;color:#94a3b8}
  .proj-tech{display:block;font-size:8.5px;color:#2563a8;font-weight:600;margin-bottom:5px}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
<div class="wrap">
  <div class="sidebar">
    <div class="sb-top">
      <div class="avatar">${initials}</div>
      <div class="sb-name">${esc(p.name)}</div>
      <div class="sb-title">${esc(p.title)}</div>
    </div>
    <div class="sb-sec"><div class="sb-head">Contact</div>${contactList}</div>
    ${skills.technical?.length ? `<div class="sb-sec"><div class="sb-head">Technical Skills</div><div class="pills">${pills(skills.technical)}</div></div>` : ''}
    ${skills.tools?.length ? `<div class="sb-sec"><div class="sb-head">Tools</div>${skills.tools.map((s) => `<div class="sb-skill">${esc(s)}</div>`).join('')}</div>` : ''}
    ${skills.languages?.length ? `<div class="sb-sec"><div class="sb-head">Languages</div>${skills.languages.map((s) => `<div class="sb-skill">${esc(s)}</div>`).join('')}</div>` : ''}
    ${certifications.length ? `<div class="sb-sec"><div class="sb-head">Certifications</div>${certifications.map((c) => `<div class="sb-cert"><span class="sb-cert-name">${esc(c.name)}</span><span class="sb-cert-meta">${esc(c.issuer)} · ${esc(c.date)}</span></div>`).join('')}</div>` : ''}
  </div>
  <div class="main">
    ${summary ? `<div class="section"><div class="bar-row"><span class="bar"></span><span class="sec-title">About Me</span></div><p class="summary">${esc(summary)}</p></div>` : ''}
    ${
      expHTML
        ? `<div class="section"><div class="bar-row"><span class="bar"></span><span class="sec-title">Experience</span></div>${expHTML
            .split('</div>')
            .map((s) =>
              s.replace(
                '<div class="exp-item">',
                '<div class="exp-item"><div class="exp-dot"></div><div class="exp-content">',
              ),
            )
            .join('</div>')}</div>`
        : ''
    }
    ${
      eduHTML
        ? `<div class="section"><div class="bar-row"><span class="bar"></span><span class="sec-title">Education</span></div>${eduHTML
            .split('</div>')
            .map((s) =>
              s.replace(
                '<div class="exp-item">',
                '<div class="exp-item"><div class="exp-dot"></div><div class="exp-content">',
              ),
            )
            .join('</div>')}</div>`
        : ''
    }
    ${projGrid ? `<div class="section"><div class="bar-row"><span class="bar"></span><span class="sec-title">Projects</span></div><div class="proj-grid">${projGrid}</div></div>` : ''}
  </div>
</div>`;
}

// ── Template: Editorial Minimal ───────────────────────────
function editorialMinimalHTML(d) {
  const {
    personal: p,
    summary,
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
  } = d;

  const contacts = [p.email, p.phone, p.location, p.linkedin, p.github].filter(
    Boolean,
  );

  const expItems = (items) =>
    items
      .map(
        (e) => `
    <div class="exp-item">
      <div class="meta-col">
        <span class="meta-date">${esc(e.startDate ? e.startDate + ' – ' + e.endDate : e.endDate || e.date || '')}</span>
        ${e.location ? `<span class="meta-loc">${esc(e.location)}</span>` : ''}
      </div>
      <div class="main-col">
        <p class="exp-title">${esc(e.title || e.name)}</p>
        <p class="exp-co">${esc(e.company || e.tech || '')}</p>
        ${(e.bullets || []).filter(Boolean).length ? `<ul class="blist">${bullets(e.bullets)}</ul>` : ''}
      </div>
    </div>`,
      )
      .join('');

  return `
<style>
  body{font-family:'Georgia',serif;color:#1a1a1a;margin:0;padding:0}
  .header{display:flex;justify-content:space-between;align-items:flex-end;padding:32px 40px 16px;gap:28px}
  h1{font-family:'Times New Roman',serif;font-size:38px;font-weight:700;font-style:italic;color:#0d0d0d;line-height:1;margin:0 0 6px}
  .job-title{font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#888;margin:0}
  .header-right{text-align:right;flex-shrink:0}
  .contact-line{font-family:Arial,sans-serif;font-size:9px;color:#666;line-height:1.7;margin:0}
  .rule{height:2px;background:#0d0d0d;margin:0 40px}
  .rule-thin{height:1px;background:#e0ddd8;margin:12px 40px 0}
  .body{padding:0 40px 36px}
  .summary-sec{padding:16px 0 14px}
  .summary{font-size:11.5px;line-height:1.85;color:#3a3a3a;font-style:italic}
  .main-grid{display:grid;grid-template-columns:1fr 240px;gap:0 32px;padding-top:18px}
  .section{margin-bottom:22px}
  .sec-label{font-family:Arial,sans-serif;font-size:7.5px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#999;margin-bottom:12px;padding-bottom:5px;border-bottom:1px solid #e0ddd8;display:block}
  .exp-item{display:flex;gap:14px;margin-bottom:16px;padding-bottom:16px;border-bottom:1px solid #f5f3ef}
  .exp-item:last-child{border-bottom:none;margin-bottom:0;padding-bottom:0}
  .meta-col{width:76px;flex-shrink:0}
  .meta-date{font-family:Arial,sans-serif;font-size:8.5px;color:#aaa;line-height:1.5;display:block}
  .meta-loc{font-family:Arial,sans-serif;font-size:8px;color:#c0bcb4;display:block}
  .main-col{flex:1}
  .exp-title{font-family:'Times New Roman',serif;font-size:12.5px;font-weight:700;color:#111;margin:0 0 2px}
  .exp-co{font-family:Arial,sans-serif;font-size:9.5px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#888;margin:0 0 5px}
  .blist{list-style:none;padding:0;margin:4px 0 0}
  .blist li{font-size:10.5px;line-height:1.75;color:#444;padding-left:11px;position:relative;margin-bottom:2px}
  .blist li::before{content:'·';position:absolute;left:0;color:#bbb;font-size:13px;line-height:1.55}
  .aside-item{margin-bottom:12px;padding-bottom:12px;border-bottom:1px solid #f5f3ef}
  .aside-item:last-child{border-bottom:none}
  .aside-title{font-family:'Times New Roman',serif;font-size:11.5px;font-weight:700;color:#111;margin:0 0 2px}
  .aside-sub{font-family:Arial,sans-serif;font-size:9px;color:#666;margin:0 0 3px}
  .aside-meta{font-family:Arial,sans-serif;font-size:8.5px;color:#aaa;display:inline;margin-right:6px}
  .aside-gpa{color:#2a6e3f;font-weight:700}
  .skill-cat{display:block;font-family:Arial,sans-serif;font-size:7.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ccc;margin-bottom:3px;margin-top:8px}
  .skill-text{font-size:10px;color:#444;line-height:1.6;margin:0}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
<div class="header">
  <div>
    <h1>${esc(p.name)}</h1>
    <p class="job-title">${esc(p.title)}</p>
  </div>
  <div class="header-right">
    ${contacts.map((c) => `<p class="contact-line">${esc(c)}</p>`).join('')}
  </div>
</div>
<div class="rule"></div>
<div class="body">
  ${summary ? `<div class="summary-sec"><p class="summary">${esc(summary)}</p></div><div class="rule-thin"></div>` : ''}
  <div class="main-grid">
    <div>
      ${experience.length ? `<div class="section"><span class="sec-label">Experience</span>${expItems(experience)}</div>` : ''}
      ${projects.length ? `<div class="section"><span class="sec-label">Projects</span>${expItems(projects)}</div>` : ''}
    </div>
    <div>
      ${education.length ? `<div class="section"><span class="sec-label">Education</span>${education.map((e) => `<div class="aside-item"><p class="aside-title">${esc(e.degree)}</p><p class="aside-sub">${esc(e.institution)}</p><span class="aside-meta">${esc(e.endDate)}</span>${e.gpa ? `<span class="aside-meta aside-gpa">GPA ${esc(e.gpa)}</span>` : ''}${e.details ? `<p class="aside-sub" style="margin-top:3px">${esc(e.details)}</p>` : ''}</div>`).join('')}</div>` : ''}
      ${skills.technical?.length || skills.tools?.length ? `<div class="section"><span class="sec-label">Skills</span>${skills.technical?.length ? `<span class="skill-cat">Technical</span><p class="skill-text">${esc(skills.technical.join(', '))}</p>` : ''}${skills.tools?.length ? `<span class="skill-cat">Tools</span><p class="skill-text">${esc(skills.tools.join(', '))}</p>` : ''}${skills.languages?.length ? `<span class="skill-cat">Languages</span><p class="skill-text">${esc(skills.languages.join(', '))}</p>` : ''}</div>` : ''}
      ${certifications.length ? `<div class="section"><span class="sec-label">Certifications</span>${certifications.map((c) => `<div class="aside-item"><p class="aside-title" style="font-size:10.5px">${esc(c.name)}</p><p class="aside-sub">${esc(c.issuer)} · ${esc(c.date)}</p></div>`).join('')}</div>` : ''}
    </div>
  </div>
</div>`;
}

// ── Template: Bold Impact ─────────────────────────────────
function boldImpactHTML(d) {
  const {
    personal: p,
    summary,
    education = [],
    experience = [],
    projects = [],
    skills = {},
    certifications = [],
  } = d;

  const contactChips = [p.email, p.phone, p.location, p.linkedin, p.github]
    .filter(Boolean)
    .map((v) => `<span class="chip">${esc(v)}</span>`)
    .join('');

  const expHTML = experience
    .map(
      (e) => `
    <div class="exp-item">
      <div class="tl"><div class="dot"></div><div class="line"></div></div>
      <div class="exp-body">
        <div class="exp-head">
          <div><p class="exp-title">${esc(e.title)}</p><p class="exp-co">${esc(e.company)}</p></div>
          <div style="text-align:right;flex-shrink:0"><span class="exp-date">${esc(e.startDate)} – ${esc(e.endDate)}</span><span class="exp-loc">${esc(e.location)}</span></div>
        </div>
        ${e.bullets?.filter(Boolean).length ? `<ul class="blist">${bullets(e.bullets)}</ul>` : ''}
      </div>
    </div>`,
    )
    .join('');

  const projGrid = projects
    .map(
      (pr) => `
    <div class="proj-card">
      <div class="proj-acc"></div>
      <div class="proj-body">
        <div class="proj-head"><span class="proj-name">${esc(pr.name)}</span><span class="proj-date">${esc(pr.date)}</span></div>
        <span class="proj-tech">${esc(pr.tech)}</span>
        ${pr.bullets?.filter(Boolean).length ? `<ul class="blist sm">${bullets(pr.bullets)}</ul>` : ''}
      </div>
    </div>`,
    )
    .join('');

  const tags = (arr = [], outline = false) =>
    arr
      .map(
        (s) => `<span class="tag${outline ? ' tag-out' : ''}">${esc(s)}</span>`,
      )
      .join('');

  return `
<style>
  body{font-family:Arial,sans-serif;margin:0;padding:0;color:#1a1a1a}
  .header{background:#0d1f1a;padding:28px 36px 24px;position:relative;overflow:hidden}
  .header::after{content:'';position:absolute;top:-36px;right:-36px;width:190px;height:190px;border:36px solid rgba(20,184,140,0.1);border-radius:50%}
  h1{font-family:Arial,sans-serif;font-size:34px;font-weight:900;color:#fff;letter-spacing:1.5px;text-transform:uppercase;margin:0 0 8px;line-height:1}
  .title-row{display:flex;align-items:center;gap:8px;margin-bottom:16px}
  .title-line{display:block;width:20px;height:1px;background:#14b88c;flex-shrink:0}
  .job-title{font-size:9px;letter-spacing:2.5px;text-transform:uppercase;color:#14b88c;margin:0}
  .chips{display:flex;flex-wrap:wrap;gap:5px}
  .chip{font-size:8.5px;color:#94a3b8;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);padding:3px 9px}
  .summary-stripe{background:#f0fdf8;border-left:4px solid #14b88c;padding:12px 36px 12px 32px;display:flex;gap:18px;align-items:flex-start}
  .stripe-lbl{font-size:7px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:#14b88c;flex-shrink:0;width:40px;margin-top:2px}
  .stripe-text{font-size:10.5px;line-height:1.75;color:#2d4a3e;margin:0}
  .content-grid{display:grid;grid-template-columns:1fr 210px}
  .main{padding:20px 24px 0 36px;border-right:1px solid #f0f0f0}
  .aside{padding:20px 18px 0 22px}
  .section{margin-bottom:20px}
  .sec-title{font-size:10px;font-weight:900;letter-spacing:2px;text-transform:uppercase;color:#0d1f1a;display:flex;align-items:center;gap:8px;margin-bottom:12px;padding-bottom:7px;border-bottom:2px solid #0d1f1a}
  .sec-num{font-size:9px;font-weight:900;color:#14b88c;letter-spacing:0}
  .aside-head{font-size:8px;font-weight:900;letter-spacing:2.5px;text-transform:uppercase;color:#0d1f1a;margin-bottom:10px;padding-bottom:5px;border-bottom:2px solid #0d1f1a;display:block}
  .exp-item{display:flex;gap:0;margin-bottom:14px}
  .tl{display:flex;flex-direction:column;align-items:center;width:18px;flex-shrink:0;margin-right:10px}
  .dot{width:9px;height:9px;border-radius:50%;background:#14b88c;flex-shrink:0;margin-top:4px;box-shadow:0 0 0 2px #d1fae5}
  .line{width:1px;flex:1;background:#d1fae5;margin-top:3px;min-height:18px}
  .exp-body{flex:1;padding-bottom:12px}
  .exp-head{display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:5px}
  .exp-title{font-size:12px;font-weight:700;color:#0d1f1a;margin:0 0 2px}
  .exp-co{font-size:9.5px;font-weight:700;color:#14b88c;letter-spacing:0.5px;text-transform:uppercase;margin:0}
  .exp-date{font-size:9px;color:#888;white-space:nowrap;display:block}
  .exp-loc{font-size:8.5px;color:#bbb;display:block}
  .blist{list-style:none;padding:0;margin:4px 0 0}
  .blist li{font-size:10px;line-height:1.7;color:#3a3a3a;padding-left:12px;position:relative;margin-bottom:2px}
  .blist li::before{content:'';position:absolute;left:0;top:6px;width:5px;height:5px;border-radius:50%;background:#14b88c}
  .blist.sm li{font-size:9px}
  .proj-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .proj-card{border:1px solid #e8f5f1;display:flex}
  .proj-acc{width:4px;background:#14b88c;flex-shrink:0}
  .proj-body{padding:9px 11px;flex:1}
  .proj-head{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:2px}
  .proj-name{font-size:10.5px;font-weight:700;color:#0d1f1a}
  .proj-date{font-size:8px;color:#bbb}
  .proj-tech{display:block;font-size:8.5px;color:#14b88c;font-weight:700;margin-bottom:4px}
  .aside-edu{margin-bottom:11px;padding-bottom:11px;border-bottom:1px solid #f0f5f2}
  .aside-edu:last-child{border-bottom:none}
  .edu-deg{font-size:10px;font-weight:700;color:#0d1f1a;margin:0 0 2px;line-height:1.4}
  .edu-inst{font-size:8.5px;color:#555;margin:0 0 3px;line-height:1.4}
  .edu-meta{font-size:8px;color:#aaa;display:inline;margin-right:5px}
  .edu-gpa{color:#14b88c!important;font-weight:700!important}
  .edu-det{font-size:8px;color:#aaa;margin:3px 0 0;line-height:1.5}
  .skill-sec{margin-bottom:9px}
  .skill-cat{display:block;font-size:7px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#ccc;margin-bottom:4px}
  .tags{display:flex;flex-wrap:wrap;gap:3px}
  .tag{font-size:8px;padding:2px 7px;background:#0d1f1a;color:#d1fae5}
  .tag-out{background:transparent;color:#0d1f1a;border:1px solid #c8ded6}
  .cert-item{display:flex;gap:7px;align-items:flex-start;margin-bottom:8px}
  .cert-dot{width:5px;height:5px;border-radius:50%;background:#14b88c;flex-shrink:0;margin-top:4px}
  .cert-name{font-size:9px;font-weight:600;color:#1a1a1a;line-height:1.4;display:block}
  .cert-meta{font-size:8px;color:#aaa}
  @media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style>
<div class="header">
  <h1>${esc(p.name)}</h1>
  <div class="title-row"><span class="title-line"></span><p class="job-title">${esc(p.title)}</p><span class="title-line"></span></div>
  <div class="chips">${contactChips}</div>
</div>
${summary ? `<div class="summary-stripe"><span class="stripe-lbl">Profile</span><p class="stripe-text">${esc(summary)}</p></div>` : ''}
<div class="content-grid">
  <div class="main">
    ${expHTML ? `<div class="section"><div class="sec-title"><span class="sec-num">01</span>Experience</div>${expHTML}</div>` : ''}
    ${projGrid ? `<div class="section"><div class="sec-title"><span class="sec-num">02</span>Projects</div><div class="proj-grid">${projGrid}</div></div>` : ''}
  </div>
  <div class="aside">
    ${education.length ? `<div class="section"><span class="aside-head">Education</span>${education.map((e) => `<div class="aside-edu"><p class="edu-deg">${esc(e.degree)}</p><p class="edu-inst">${esc(e.institution)}</p><span class="edu-meta">${esc(e.endDate)}</span>${e.gpa ? `<span class="edu-meta edu-gpa">GPA ${esc(e.gpa)}</span>` : ''}${e.details ? `<p class="edu-det">${esc(e.details)}</p>` : ''}</div>`).join('')}</div>` : ''}
    ${skills.technical?.length || skills.tools?.length ? `<div class="section"><span class="aside-head">Skills</span>${skills.technical?.length ? `<div class="skill-sec"><span class="skill-cat">Technical</span><div class="tags">${tags(skills.technical)}</div></div>` : ''}${skills.tools?.length ? `<div class="skill-sec"><span class="skill-cat">Tools</span><div class="tags">${tags(skills.tools, true)}</div></div>` : ''}${skills.languages?.length ? `<div class="skill-sec"><span class="skill-cat">Languages</span><p style="font-size:9px;color:#555">${esc(skills.languages.join(' · '))}</p></div>` : ''}</div>` : ''}
    ${certifications.length ? `<div class="section"><span class="aside-head">Certifications</span>${certifications.map((c) => `<div class="cert-item"><div class="cert-dot"></div><div><span class="cert-name">${esc(c.name)}</span><span class="cert-meta">${esc(c.issuer)} · ${esc(c.date)}</span></div></div>`).join('')}</div>` : ''}
  </div>
</div>`;
}

// ── Main export ───────────────────────────────────────────
const GENERATORS = {
  'executive-classic': executiveClassicHTML,
  'modern-sidebar': modernSidebarHTML,
  'editorial-minimal': editorialMinimalHTML,
  'bold-impact': boldImpactHTML,
};

export function generateResumeHTML(data, templateId) {
  const generator = GENERATORS[templateId] || executiveClassicHTML;
  const bodyContent = generator(data);
  const name = data?.personal?.name || 'Resume';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(name)} — Resume</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { width: 210mm; min-height: 297mm; }
    body { background: #fff; }
    @page { size: A4; margin: 0; }
    @media print {
      html, body { width: 210mm; height: 297mm; }
    }
  </style>
</head>
<body>
${bodyContent}
<!-- Generated by ResumeBuilderPK | Template: ${templateId} | ${new Date().toLocaleDateString()} -->
</body>
</html>`;
}
