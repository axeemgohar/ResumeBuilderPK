import React from 'react'
import { Input, Row, SectionCard, AddButton, BulletEditor } from './FormFields'
import { newExperience } from '../data/emptyData'

export default function StepExperience({ data, onChange }) {
  const update = (id, field, val) => {
    onChange(data.experience.map(e => e.id === id ? { ...e, [field]: val } : e))
  }

  const add = () => onChange([...data.experience, newExperience()])

  const remove = (id) => onChange(data.experience.filter(e => e.id !== id))

  return (
    <div>
      {data.experience.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '28px 16px',
          color: '#bbb',
          fontSize: '13px',
          background: '#fafafa',
          border: '1.5px dashed #e8e4de',
          borderRadius: '8px',
          marginBottom: '12px'
        }}>
          <p style={{ marginBottom: '4px' }}>No experience added yet</p>
          <p style={{ fontSize: '11px' }}>Add internships, part-time jobs, or freelance work</p>
        </div>
      )}

      {data.experience.map((exp, i) => (
        <SectionCard
          key={exp.id}
          label={`Experience ${i + 1}`}
          onRemove={() => remove(exp.id)}
        >
          <Row>
            <Input
              label="Job Title"
              value={exp.title}
              onChange={v => update(exp.id, 'title', v)}
              placeholder="e.g. Software Engineering Intern"
            />
            <Input
              label="Company"
              value={exp.company}
              onChange={v => update(exp.id, 'company', v)}
              placeholder="e.g. Systems Limited"
            />
          </Row>
          <Row>
            <Input
              label="Location"
              value={exp.location}
              onChange={v => update(exp.id, 'location', v)}
              placeholder="Lahore, Pakistan or Remote"
            />
          </Row>
          <Row>
            <Input
              label="Start Date"
              value={exp.startDate}
              onChange={v => update(exp.id, 'startDate', v)}
              placeholder="Jun 2024"
            />
            <Input
              label="End Date"
              hint='or "Present"'
              value={exp.endDate}
              onChange={v => update(exp.id, 'endDate', v)}
              placeholder="Aug 2024"
            />
          </Row>
          <BulletEditor
            bullets={exp.bullets.length ? exp.bullets : ['']}
            onChange={v => update(exp.id, 'bullets', v)}
          />
        </SectionCard>
      ))}

      <AddButton onClick={add}>Add experience</AddButton>
    </div>
  )
}
