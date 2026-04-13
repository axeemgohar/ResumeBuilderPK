import React from 'react'
import { TagInput } from './FormFields'

export default function StepSkills({ data, onChange }) {
  const upd = (field) => (val) => onChange({ ...data.skills, [field]: val })

  return (
    <div>
      <TagInput
        label="Technical Skills"
        hint="programming languages, frameworks, databases"
        tags={data.skills.technical}
        onChange={upd('technical')}
        placeholder="JavaScript, React, Python..."
      />

      <TagInput
        label="Tools & Software"
        hint="optional"
        tags={data.skills.tools}
        onChange={upd('tools')}
        placeholder="VS Code, Figma, Docker..."
      />

      <TagInput
        label="Languages"
        hint="spoken languages"
        tags={data.skills.languages}
        onChange={upd('languages')}
        placeholder="English (Fluent), Urdu (Native)..."
      />

      <div style={{
        marginTop: '20px',
        padding: '14px 16px',
        background: '#fafaf7',
        border: '1px solid #e8e4de',
        borderRadius: '8px'
      }}>
        <p style={{ fontSize: '11.5px', color: '#888', lineHeight: '1.65' }}>
          <strong style={{ color: '#555' }}>Tip:</strong> Add the most relevant skills for the jobs you are applying to.
          Many companies use ATS software that scans for keywords — match your skills to the job description for better results.
        </p>
      </div>
    </div>
  )
}
