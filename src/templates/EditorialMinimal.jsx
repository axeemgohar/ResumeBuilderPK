import React from 'react'
import './EditorialMinimal.css'

export default function EditorialMinimal({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div className="em-root">
      {/* Header */}
      <header className="em-header">
        <div className="em-header-left">
          <h1 className="em-name">{personal.name}</h1>
          <p className="em-title">{personal.title}</p>
        </div>
        <div className="em-header-right">
          {[personal.email, personal.phone, personal.location, personal.linkedin, personal.github]
            .filter(Boolean)
            .map((val, i) => (
              <p key={i} className="em-contact-line">{val}</p>
            ))}
        </div>
      </header>

      <div className="em-ruled-line" />

      <div className="em-body">
        {/* Summary — full width */}
        {summary && (
          <section className="em-summary-section">
            <p className="em-summary-text">{summary}</p>
          </section>
        )}

        <div className="em-ruled-line em-ruled-thin" />

        {/* Main two-col layout */}
        <div className="em-main-grid">
          {/* Left - wider */}
          <div className="em-left">
            {experience?.length > 0 && (
              <section className="em-section">
                <h2 className="em-section-label">Experience</h2>
                {experience.map((exp) => (
                  <div className="em-exp-item" key={exp.id}>
                    <div className="em-exp-meta">
                      <span className="em-exp-dates">
                        {exp.startDate}{exp.endDate ? ` – ${exp.endDate}` : ''}
                      </span>
                      <span className="em-exp-location">{exp.location}</span>
                    </div>
                    <div className="em-exp-main">
                      <p className="em-exp-title">{exp.title}</p>
                      <p className="em-exp-company">{exp.company}</p>
                      {exp.bullets?.length > 0 && (
                        <ul className="em-bullets">
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
              <section className="em-section">
                <h2 className="em-section-label">Projects</h2>
                {projects.map((proj) => (
                  <div className="em-exp-item" key={proj.id}>
                    <div className="em-exp-meta">
                      <span className="em-exp-dates">{proj.date}</span>
                    </div>
                    <div className="em-exp-main">
                      <p className="em-exp-title">{proj.name}</p>
                      <p className="em-exp-company" style={{ fontStyle: 'italic', color: '#888' }}>{proj.tech}</p>
                      {proj.bullets?.length > 0 && (
                        <ul className="em-bullets">
                          {proj.bullets.filter(Boolean).map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </section>
            )}
          </div>

          {/* Right - narrower */}
          <div className="em-right">
            {education?.length > 0 && (
              <section className="em-section">
                <h2 className="em-section-label">Education</h2>
                {education.map((edu) => (
                  <div className="em-aside-item" key={edu.id}>
                    <p className="em-aside-title">{edu.degree}</p>
                    <p className="em-aside-sub">{edu.institution}</p>
                    <div className="em-aside-meta-row">
                      {edu.endDate && (
                        <span className="em-aside-meta">
                          {edu.startDate ? `${edu.startDate} – ` : ''}{edu.endDate}
                        </span>
                      )}
                      {edu.gpa && <span className="em-aside-meta em-aside-gpa">GPA {edu.gpa}</span>}
                    </div>
                    {edu.details && <p className="em-aside-details">{edu.details}</p>}
                  </div>
                ))}
              </section>
            )}

            {skills && (
              <section className="em-section">
                <h2 className="em-section-label">Skills</h2>
                {skills.technical?.length > 0 && (
                  <div className="em-skill-block">
                    <span className="em-skill-category">Technical</span>
                    <p className="em-skill-text">{skills.technical.join(', ')}</p>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div className="em-skill-block">
                    <span className="em-skill-category">Tools</span>
                    <p className="em-skill-text">{skills.tools.join(', ')}</p>
                  </div>
                )}
                {skills.languages?.length > 0 && (
                  <div className="em-skill-block">
                    <span className="em-skill-category">Languages</span>
                    <p className="em-skill-text">{skills.languages.join(', ')}</p>
                  </div>
                )}
              </section>
            )}

            {certifications?.length > 0 && (
              <section className="em-section">
                <h2 className="em-section-label">Certifications</h2>
                {certifications.map((c) => (
                  <div className="em-aside-item" key={c.id}>
                    <p className="em-aside-title em-aside-title-sm">{c.name}</p>
                    <p className="em-aside-meta">{c.issuer} · {c.date}</p>
                  </div>
                ))}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
