import React from 'react'
import './ModernSidebar.css'

function Initials({ name }) {
  const parts = (name || '').split(' ').filter(Boolean)
  const initials = parts.length >= 2
    ? parts[0][0] + parts[parts.length - 1][0]
    : (parts[0]?.[0] || '?')
  return <div className="ms-avatar">{initials.toUpperCase()}</div>
}

export default function ModernSidebar({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div className="ms-root">
      {/* ── LEFT SIDEBAR ── */}
      <aside className="ms-sidebar">
        <div className="ms-sidebar-top">
          <Initials name={personal.name} />
          <h1 className="ms-name">{personal.name}</h1>
          <p className="ms-job-title">{personal.title}</p>
        </div>

        <div className="ms-sidebar-section">
          <h3 className="ms-sidebar-heading">Contact</h3>
          <div className="ms-contact-list">
            {personal.email && (
              <div className="ms-contact-row">
                <span className="ms-contact-icon">@</span>
                <span>{personal.email}</span>
              </div>
            )}
            {personal.phone && (
              <div className="ms-contact-row">
                <span className="ms-contact-icon">✆</span>
                <span>{personal.phone}</span>
              </div>
            )}
            {personal.location && (
              <div className="ms-contact-row">
                <span className="ms-contact-icon">◎</span>
                <span>{personal.location}</span>
              </div>
            )}
            {personal.linkedin && (
              <div className="ms-contact-row">
                <span className="ms-contact-icon">in</span>
                <span>{personal.linkedin}</span>
              </div>
            )}
            {personal.github && (
              <div className="ms-contact-row">
                <span className="ms-contact-icon">gh</span>
                <span>{personal.github}</span>
              </div>
            )}
          </div>
        </div>

        {skills?.technical?.length > 0 && (
          <div className="ms-sidebar-section">
            <h3 className="ms-sidebar-heading">Technical Skills</h3>
            <div className="ms-skill-pills">
              {skills.technical.map((s, i) => (
                <span className="ms-pill" key={i}>{s}</span>
              ))}
            </div>
          </div>
        )}

        {skills?.tools?.length > 0 && (
          <div className="ms-sidebar-section">
            <h3 className="ms-sidebar-heading">Tools</h3>
            <div className="ms-skill-list">
              {skills.tools.map((s, i) => (
                <span key={i} className="ms-skill-line">{s}</span>
              ))}
            </div>
          </div>
        )}

        {skills?.languages?.length > 0 && (
          <div className="ms-sidebar-section">
            <h3 className="ms-sidebar-heading">Languages</h3>
            <div className="ms-skill-list">
              {skills.languages.map((s, i) => (
                <span key={i} className="ms-skill-line">{s}</span>
              ))}
            </div>
          </div>
        )}

        {certifications?.length > 0 && (
          <div className="ms-sidebar-section">
            <h3 className="ms-sidebar-heading">Certifications</h3>
            {certifications.map((c) => (
              <div className="ms-cert" key={c.id}>
                <span className="ms-cert-name">{c.name}</span>
                <span className="ms-cert-meta">{c.issuer} · {c.date}</span>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* ── RIGHT MAIN ── */}
      <main className="ms-main">
        {summary && (
          <section className="ms-section">
            <div className="ms-section-title-row">
              <span className="ms-title-bar" />
              <h2 className="ms-section-title">About Me</h2>
            </div>
            <p className="ms-summary">{summary}</p>
          </section>
        )}

        {experience?.length > 0 && (
          <section className="ms-section">
            <div className="ms-section-title-row">
              <span className="ms-title-bar" />
              <h2 className="ms-section-title">Experience</h2>
            </div>
            {experience.map((exp) => (
              <div className="ms-exp-item" key={exp.id}>
                <div className="ms-exp-dot" />
                <div className="ms-exp-content">
                  <div className="ms-exp-top">
                    <div>
                      <p className="ms-exp-title">{exp.title}</p>
                      <p className="ms-exp-company">{exp.company} <span className="ms-exp-location">· {exp.location}</span></p>
                    </div>
                    <span className="ms-exp-dates">
                      {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                    </span>
                  </div>
                  {exp.bullets?.length > 0 && (
                    <ul className="ms-bullets">
                      {exp.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        {education?.length > 0 && (
          <section className="ms-section">
            <div className="ms-section-title-row">
              <span className="ms-title-bar" />
              <h2 className="ms-section-title">Education</h2>
            </div>
            {education.map((edu) => (
              <div className="ms-edu-item" key={edu.id}>
                <div className="ms-exp-dot" />
                <div className="ms-exp-content">
                  <div className="ms-exp-top">
                    <div>
                      <p className="ms-exp-title">{edu.degree}</p>
                      <p className="ms-exp-company">{edu.institution}</p>
                    </div>
                    <div className="ms-edu-right">
                      {edu.endDate && <span className="ms-exp-dates">{edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}</span>}
                      {edu.gpa && <span className="ms-gpa-badge">GPA {edu.gpa}</span>}
                    </div>
                  </div>
                  {edu.details && <p className="ms-edu-details">{edu.details}</p>}
                </div>
              </div>
            ))}
          </section>
        )}

        {projects?.length > 0 && (
          <section className="ms-section">
            <div className="ms-section-title-row">
              <span className="ms-title-bar" />
              <h2 className="ms-section-title">Projects</h2>
            </div>
            <div className="ms-proj-grid">
              {projects.map((proj) => (
                <div className="ms-proj-card" key={proj.id}>
                  <div className="ms-proj-card-header">
                    <span className="ms-proj-name">{proj.name}</span>
                    <span className="ms-proj-date">{proj.date}</span>
                  </div>
                  <span className="ms-proj-tech">{proj.tech}</span>
                  {proj.bullets?.length > 0 && (
                    <ul className="ms-bullets ms-bullets-sm">
                      {proj.bullets.filter(Boolean).map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
