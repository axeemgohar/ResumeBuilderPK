import React from 'react'
import { Input, Row, Textarea, SectionCard, AddButton } from './FormFields'
import { newEducation } from '../data/emptyData'

export default function StepEducation({ data, onChange }) {
  const update = (id, field, val) => {
    onChange(data.education.map(e => e.id === id ? { ...e, [field]: val } : e))
  }

  const add = () => onChange([...data.education, newEducation()])

  const remove = (id) => onChange(data.education.filter(e => e.id !== id))

  return (
    <div>
      {data.education.map((edu, i) => (
        <SectionCard
          key={edu.id}
          label={`Education ${i + 1}`}
          onRemove={data.education.length > 1 ? () => remove(edu.id) : null}
        >
          <Input
            label="Degree / Certificate"
            value={edu.degree}
            onChange={v => update(edu.id, 'degree', v)}
            placeholder="e.g. Bachelor of Science in Computer Science"
          />
          <Input
            label="Institution / University"
            value={edu.institution}
            onChange={v => update(edu.id, 'institution', v)}
            placeholder="e.g. FAST-NUCES, LUMS, UET Lahore"
          />
          <Row>
            <Input
              label="City"
              value={edu.location}
              onChange={v => update(edu.id, 'location', v)}
              placeholder="Lahore, Pakistan"
            />
            <Input
              label="GPA / Percentage"
              hint="optional"
              value={edu.gpa}
              onChange={v => update(edu.id, 'gpa', v)}
              placeholder="3.8 / 4.0 or 85%"
            />
          </Row>
          <Row>
            <Input
              label="Start Date"
              hint="optional"
              value={edu.startDate}
              onChange={v => update(edu.id, 'startDate', v)}
              placeholder="Sep 2022"
            />
            <Input
              label="End Date"
              hint='or "Present"'
              value={edu.endDate}
              onChange={v => update(edu.id, 'endDate', v)}
              placeholder="Jun 2026"
            />
          </Row>
          <Textarea
            label="Extra Details"
            hint="optional — awards, relevant courses"
            value={edu.details}
            onChange={v => update(edu.id, 'details', v)}
            placeholder="Dean's List · Relevant: Data Structures, Databases, Web Engineering"
            rows={2}
          />
        </SectionCard>
      ))}
      <AddButton onClick={add}>Add another education</AddButton>
    </div>
  )
}
