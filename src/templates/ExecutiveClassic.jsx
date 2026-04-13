import React from 'react'
import './ExecutiveClassic.css'

export default function ExecutiveClassic({ data }) {
  const { personal, summary, education, experience, projects, skills, certifications } = data

  return (
    <div className="ec-root">
      {/* Header */}
      <header className="ec-header">
        <div className="ec-header-name-block">
          <h1 className="ec-name">{personal.name}</h1>
          <p className="ec-title">{personal.title}</p>
        </div>
        <div className="ec-header-divider" />
        <div className="ec-contact-grid">
          {personal.email && (
            <div className="ec-contact-item">
              <span className="ec-contact-label">Email</span>
              <span className="ec-contact-value">{personal.email}</span>
            </div>
          )}
          {personal.phone && (
            <div className="ec-contact-item">
              <span className="ec-contact-label">Phone</span>
              <span className="ec-contact-value">{personal.phone}</span>
            </div>
          )}
          {personal.location && (
            <div className="ec-contact-item">
              <span className="ec-contact-label">Location</span>
              <span className="ec-contact-value">{personal.location}</span>
            </div>
          )}
          {personal.linkedin && (
            <div className="ec-contact-item">
              <span className="ec-contact-label">LinkedIn</span>
              <span className="ec-contact-value">{personal.linkedin}</span>
            </div>
          )}
          {personal.github && (
            <div className="ec-contact-item">
              <span className="ec-contact-label">GitHub</span>
              <span className="ec-contact-value">{personal.github}</span>
            </div>
          )}
        </div>
      </header>

      <div className="ec-body">
        {/* Summary */}
        {summary && (
          <section className="ec-section">
            <div className="ec-section-header">
              <span className="ec-section-ornament">◆</span>
              <h2 className="ec-section-title">Professional Summary</h2>
            </div>
            <p className="ec-summary">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience?.length > 0 && (
          <section className="ec-section">
            <div className="ec-section-header">
              <span className="ec-section-ornament">◆</span>
              <h2 className="ec-section-title">Experience</h2>
            </div>
            {experience.map((exp) => (
              <div className="ec-exp-item" key={exp.id}>
                <div className="ec-exp-header">
                  <div className="ec-exp-left">
                    <span className="ec-exp-title">{exp.title}</span>
                    <span className="ec-exp-company">{exp.company}</span>
                  </div>
                  <div className="ec-exp-right">
                    <span className="ec-exp-dates">{exp.startDate}{exp.endDate ? ` — ${exp.endDate}` : ''}</span>
                    <span className="ec-exp-location">{exp.location}</span>
                  </div>
                </div>
                {exp.bullets?.length > 0 && (
                  <ul className="ec-bullets">
                    {exp.bullets.filter(Boolean).map((b, i) => (
                      <li key={i}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </section>
        )}

        {/* Two-column bottom: Education + Skills */}
        <div className="ec-two-col">
          <div className="ec-col-left">
            {/* Education */}
            {education?.length > 0 && (
              <section className="ec-section">
                <div className="ec-section-header">
                  <span className="ec-section-ornament">◆</span>
                  <h2 className="ec-section-title">Education</h2>
                </div>
                {education.map((edu) => (
                  <div className="ec-edu-item" key={edu.id}>
                    <p className="ec-edu-degree">{edu.degree}</p>
                    <p className="ec-edu-institution">{edu.institution}</p>
                    <div className="ec-edu-meta">
                      {edu.endDate && <span>{edu.startDate ? `${edu.startDate} – ${edu.endDate}` : edu.endDate}</span>}
                      {edu.gpa && <span className="ec-gpa">GPA: {edu.gpa}</span>}
                    </div>
                    {edu.details && <p className="ec-edu-details">{edu.details}</p>}
                  </div>
                ))}
              </section>
            )}

            {/* Certifications */}
            {certifications?.length > 0 && (
              <section className="ec-section">
                <div className="ec-section-header">
                  <span className="ec-section-ornament">◆</span>
                  <h2 className="ec-section-title">Certifications</h2>
                </div>
                {certifications.map((cert) => (
                  <div className="ec-cert-item" key={cert.id}>
                    <span className="ec-cert-name">{cert.name}</span>
                    <span className="ec-cert-meta">{cert.issuer} · {cert.date}</span>
                  </div>
                ))}
              </section>
            )}
          </div>

          <div className="ec-col-right">
            {/* Projects */}
            {projects?.length > 0 && (
              <section className="ec-section">
                <div className="ec-section-header">
                  <span className="ec-section-ornament">◆</span>
                  <h2 className="ec-section-title">Projects</h2>
                </div>
                {projects.map((proj) => (
                  <div className="ec-proj-item" key={proj.id}>
                    <div className="ec-proj-header">
                      <span className="ec-proj-name">{proj.name}</span>
                      <span className="ec-proj-date">{proj.date}</span>
                    </div>
                    <span className="ec-proj-tech">{proj.tech}</span>
                    {proj.bullets?.length > 0 && (
                      <ul className="ec-bullets ec-bullets-sm">
                        {proj.bullets.filter(Boolean).map((b, i) => (
                          <li key={i}>{b}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            )}

            {/* Skills */}
            {skills && (
              <section className="ec-section">
                <div className="ec-section-header">
                  <span className="ec-section-ornament">◆</span>
                  <h2 className="ec-section-title">Skills</h2>
                </div>
                {skills.technical?.length > 0 && (
                  <div className="ec-skill-group">
                    <span className="ec-skill-label">Technical</span>
                    <div className="ec-skill-chips">
                      {skills.technical.map((s, i) => <span className="ec-chip" key={i}>{s}</span>)}
                    </div>
                  </div>
                )}
                {skills.tools?.length > 0 && (
                  <div className="ec-skill-group">
                    <span className="ec-skill-label">Tools</span>
                    <div className="ec-skill-chips">
                      {skills.tools.map((s, i) => <span className="ec-chip" key={i}>{s}</span>)}
                    </div>
                  </div>
                )}
                {skills.languages?.length > 0 && (
                  <div className="ec-skill-group">
                    <span className="ec-skill-label">Languages</span>
                    <p className="ec-lang">{skills.languages.join(' · ')}</p>
                  </div>
                )}
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
