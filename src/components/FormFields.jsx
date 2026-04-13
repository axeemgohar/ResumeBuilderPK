import React from 'react'
import './FormFields.css'

export function Field({ label, hint, children }) {
  return (
    <div className="ff-field">
      {label && <label className="ff-label">{label}{hint && <span className="ff-hint">{hint}</span>}</label>}
      {children}
    </div>
  )
}

export function Input({ label, hint, value, onChange, placeholder, type = 'text' }) {
  return (
    <Field label={label} hint={hint}>
      <input
        className="ff-input"
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
      />
    </Field>
  )
}

export function Textarea({ label, hint, value, onChange, placeholder, rows = 3 }) {
  return (
    <Field label={label} hint={hint}>
      <textarea
        className="ff-textarea"
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    </Field>
  )
}

export function Row({ children }) {
  return <div className="ff-row">{children}</div>
}

export function SectionCard({ children, onRemove, label }) {
  return (
    <div className="ff-card">
      {(label || onRemove) && (
        <div className="ff-card-header">
          {label && <span className="ff-card-label">{label}</span>}
          {onRemove && (
            <button className="ff-remove-btn" onClick={onRemove} type="button">
              Remove
            </button>
          )}
        </div>
      )}
      <div className="ff-card-body">{children}</div>
    </div>
  )
}

export function AddButton({ onClick, children }) {
  return (
    <button className="ff-add-btn" onClick={onClick} type="button">
      <span className="ff-add-icon">+</span>
      {children}
    </button>
  )
}

// Bullet list editor — one textarea per bullet with add/remove
export function BulletEditor({ bullets, onChange }) {
  const update = (i, val) => {
    const next = [...bullets]
    next[i] = val
    onChange(next)
  }
  const add = () => onChange([...bullets, ''])
  const remove = (i) => onChange(bullets.filter((_, idx) => idx !== i))

  return (
    <div className="ff-bullets-editor">
      <label className="ff-label">Key points <span className="ff-hint">one per line</span></label>
      {bullets.map((b, i) => (
        <div className="ff-bullet-row" key={i}>
          <span className="ff-bullet-icon">—</span>
          <input
            className="ff-input ff-bullet-input"
            value={b}
            onChange={e => update(i, e.target.value)}
            placeholder="Describe what you did and the impact..."
          />
          {bullets.length > 1 && (
            <button className="ff-bullet-remove" onClick={() => remove(i)} type="button">✕</button>
          )}
        </div>
      ))}
      <button className="ff-bullet-add" onClick={add} type="button">+ Add point</button>
    </div>
  )
}

// Tag input — comma or enter to add
export function TagInput({ label, hint, tags, onChange, placeholder }) {
  const [inputVal, setInputVal] = React.useState('')

  const addTag = (raw) => {
    const parts = raw.split(',').map(s => s.trim()).filter(Boolean)
    const next = [...new Set([...tags, ...parts])]
    onChange(next)
    setInputVal('')
  }

  const removeTag = (i) => onChange(tags.filter((_, idx) => idx !== i))

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      if (inputVal.trim()) addTag(inputVal)
    }
    if (e.key === 'Backspace' && !inputVal && tags.length > 0) {
      removeTag(tags.length - 1)
    }
  }

  return (
    <Field label={label} hint={hint}>
      <div className="ff-tag-box">
        {tags.map((t, i) => (
          <span className="ff-tag" key={i}>
            {t}
            <button className="ff-tag-remove" onClick={() => removeTag(i)} type="button">✕</button>
          </span>
        ))}
        <input
          className="ff-tag-input"
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => { if (inputVal.trim()) addTag(inputVal) }}
          placeholder={tags.length === 0 ? placeholder : 'Add more...'}
        />
      </div>
      <p className="ff-tag-hint">Press Enter or comma to add each item</p>
    </Field>
  )
}
