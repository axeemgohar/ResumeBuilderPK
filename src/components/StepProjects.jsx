import React from 'react'
import { Input, Row, SectionCard, AddButton, BulletEditor } from './FormFields'
import { newProject, newCertification } from '../data/emptyData'

export default function StepProjects({ data, onProjectsChange, onCertsChange }) {
  // ── Projects ──
  const updateProject = (id, field, val) => {
    onProjectsChange(data.projects.map(p => p.id === id ? { ...p, [field]: val } : p))
  }
  const addProject = () => onProjectsChange([...data.projects, newProject()])
  const removeProject = (id) => onProjectsChange(data.projects.filter(p => p.id !== id))

  // ── Certifications ──
  const updateCert = (id, field, val) => {
    onCertsChange(data.certifications.map(c => c.id === id ? { ...c, [field]: val } : c))
  }
  const addCert = () => onCertsChange([...data.certifications, newCertification()])
  const removeCert = (id) => onCertsChange(data.certifications.filter(c => c.id !== id))

  return (
    <div>
      {/* Projects */}
      <p style={{ fontSize: '12px', fontWeight: '500', color: '#444', marginBottom: '12px', letterSpacing: '0.3px' }}>
        Projects
        <span style={{ fontWeight: '400', color: '#aaa', marginLeft: '8px', fontSize: '11px' }}>
          academic, personal, freelance
        </span>
      </p>

      {data.projects.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '20px 16px',
          color: '#bbb',
          fontSize: '12px',
          background: '#fafafa',
          border: '1.5px dashed #e8e4de',
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          Add your best 1–2 projects to stand out
        </div>
      )}

      {data.projects.map((proj, i) => (
        <SectionCard
          key={proj.id}
          label={`Project ${i + 1}`}
          onRemove={() => removeProject(proj.id)}
        >
          <Row>
            <Input
              label="Project Name"
              value={proj.name}
              onChange={v => updateProject(proj.id, 'name', v)}
              placeholder="e.g. EduConnect Platform"
            />
            <Input
              label="Year"
              value={proj.date}
              onChange={v => updateProject(proj.id, 'date', v)}
              placeholder="2024"
            />
          </Row>
          <Input
            label="Technologies Used"
            value={proj.tech}
            onChange={v => updateProject(proj.id, 'tech', v)}
            placeholder="React · Node.js · MongoDB"
          />
          <BulletEditor
            bullets={proj.bullets.length ? proj.bullets : ['']}
            onChange={v => updateProject(proj.id, 'bullets', v)}
          />
        </SectionCard>
      ))}

      <AddButton onClick={addProject}>Add project</AddButton>

      {/* Certifications */}
      <p style={{
        fontSize: '12px', fontWeight: '500', color: '#444',
        marginBottom: '12px', marginTop: '24px', letterSpacing: '0.3px'
      }}>
        Certifications
        <span style={{ fontWeight: '400', color: '#aaa', marginLeft: '8px', fontSize: '11px' }}>
          optional
        </span>
      </p>

      {data.certifications.map((cert, i) => (
        <SectionCard
          key={cert.id}
          label={`Certification ${i + 1}`}
          onRemove={() => removeCert(cert.id)}
        >
          <Input
            label="Certificate Name"
            value={cert.name}
            onChange={v => updateCert(cert.id, 'name', v)}
            placeholder="e.g. Google IT Support Professional Certificate"
          />
          <Row>
            <Input
              label="Issuing Organization"
              value={cert.issuer}
              onChange={v => updateCert(cert.id, 'issuer', v)}
              placeholder="e.g. Coursera, Google, Microsoft"
            />
            <Input
              label="Year"
              value={cert.date}
              onChange={v => updateCert(cert.id, 'date', v)}
              placeholder="2024"
            />
          </Row>
        </SectionCard>
      ))}

      <AddButton onClick={addCert}>Add certification</AddButton>
    </div>
  )
}
