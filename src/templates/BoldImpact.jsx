import React from 'react'
import './BoldImpact.css'

export default function BoldImpact({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div className="bi-root">
      {/* Hero header */}
      <header className="bi-header">
        <div className="bi-header-inner">
          <div className="bi-header-geo" />
          <div className="bi-header-content">
            <div className="bi-name-block">
              <h1 className="bi-name">{personal.name}</h1>
              <div className="bi-title-row">
                <span className="bi-title-line" />
                <span className="bi-title">{personal.title}</span>
                <span className="bi-title-line" />
              </div>
            </div>
            <div className="bi-contact-bar">
              {[personal.email, personal.phone, personal.location, personal.linkedin, personal.github]
                .filter(Boolean)
                .map((val, i) => (
                  <span className="bi-contact-chip" key={i}>{val}</span>
                ))}
            </div>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="bi-body">
        {/* Summary stripe */}
        {summary && (
          <div className="bi-summary-stripe">
            <span className="bi-summary-label">Profile</span>
            <p className="bi-summary-text">{summary}</p>
          </div>
        )}

        <div className="bi-content-grid">
          {/* Main left */}
          <div className="bi-main">
            {experience?.length > 0 && (
              <section className="bi-section">
                <h2 className="bi-section-title">
                  <span className="bi-section-num">01</span>
                  Experience
                </h2>
                {experience.map((exp) => (
                  <div className="bi-exp-item" key={exp.id}>
                    <div className="bi-exp-timeline">
                      <div className="bi-timeline-dot" />
                      <div className="bi-timeline-line" />
                    </div>
                    <div className="bi-exp-card">
                      <div className="bi-exp-card-header">
                        <div>
                          <p className="bi-exp-title">{exp.title}</p>
                          <p className="bi-exp-company">{exp.company}</p>
                        </div>
                        <div className="bi-exp-meta-right">
                          <span className="bi-exp-dates">
                            {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                          </span>
                          <span className="bi-exp-loc">{exp.location}</span>
                        </div>
                      </div>
                      {exp.bullets?.length > 0 && (
                        <ul className="bi-bullets">
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

            {projects?.length > 0 && (
              <section className="bi-section">
                <h2 className="bi-section-title">
                  <span className="bi-section-num">02</span>
                  Projects
                </h2>
                <div className="bi-proj-grid">
                  {projects.map((proj) => (
                    <div className="bi-proj-card" key={proj.id}>
                      <div className="bi-proj-accent" />
                      <div className="bi-proj-body">
                        <div className="bi-proj-header">
                          <span className="bi-proj-name">{proj.name}</span>
                          <span className="bi-proj-date">{proj.date}</span>
                        </div>
                        <span className="bi-proj-tech">{proj.tech}</span>
                        {proj.bullets?.length > 0 && (
                          <ul className="bi-bullets bi-bullets-sm">
                            {proj.bullets.filter(Boolean).map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right aside */}
          <aside className="bi-aside">
            {education?.length > 0 && (
              <div className="bi-aside-card">
                <h3 className="bi-aside-heading">Education</h3>
                {education.map((edu) => (
                  <div className="bi-aside-edu" key={edu.id}>
                    <p className="bi-edu-degree">{edu.degree}</p>
                    <p className="bi-edu-inst">{edu.institution}</p>
                    <div className="bi-edu-meta">
                      {edu.endDate && (
                        <span>{edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}</span>
                      )}
                      {edu.gpa && <span className="bi-gpa">GPA {edu.gpa}</span>}
                    </div>
                    {edu.details && <p className="bi-edu-details">{edu.details}</p>}
                  </div>
                ))}
              </div>
            )}

            {skills && (
              <div className="bi-aside-card">
                <h3 className="bi-aside-heading">Skills</h3>
                {skills.technical?.length > 0 && (
                  <div className="bi-skill-section">
                    <span className="bi-skill-cat">Technical</span>
                    <div className="bi-skill-tags">
                      {skills.technical.map((s, i) => (
                        <span className="bi-tag" key={i}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div className="bi-skill-section">
                    <span className="bi-skill-cat">Tools</span>
                    <div className="bi-skill-tags">
                      {skills.tools.map((s, i) => (
                        <span className="bi-tag bi-tag-outline" key={i}>{s}</span>
                      ))}
                    </div>
                  </div>
                )}
                {skills.languages?.length > 0 && (
                  <div className="bi-skill-section">
                    <span className="bi-skill-cat">Languages</span>
                    <p className="bi-lang">{skills.languages.join(' · ')}</p>
                  </div>
                )}
              </div>
            )}

            {certifications?.length > 0 && (
              <div className="bi-aside-card">
                <h3 className="bi-aside-heading">Certifications</h3>
                {certifications.map((c) => (
                  <div className="bi-cert" key={c.id}>
                    <span className="bi-cert-dot" />
                    <div>
                      <p className="bi-cert-name">{c.name}</p>
                      <p className="bi-cert-meta">{c.issuer} · {c.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}
