import React from 'react';
import { Input, Row, Textarea } from './FormFields';

export default function StepPersonal({ data, onChange }) {
  const upd = (field) => (val) => onChange({ ...data.personal, [field]: val });

  return (
    <div>
      <Row>
        <Input
          label="Full Name"
          value={data.personal.name}
          onChange={upd('name')}
          placeholder="e.g. Aisha Rahman"
        />
        <Input
          label="Professional Title"
          // hint="shown under name"
          value={data.personal.title}
          onChange={upd('title')}
          placeholder="e.g. CS Student / Software Engineer"
        />
      </Row>
      <Row>
        <Input
          label="Email"
          type="email"
          value={data.personal.email}
          onChange={upd('email')}
          placeholder="you@email.com"
        />
        <Input
          label="Phone"
          value={data.personal.phone}
          onChange={upd('phone')}
          placeholder="+92 300 000 0000"
        />
      </Row>
      <Input
        label="City / Location"
        value={data.personal.location}
        onChange={upd('location')}
        placeholder="e.g. Lahore, Pakistan"
      />
      <Row>
        <Input
          label="LinkedIn"
          hint="optional"
          value={data.personal.linkedin}
          onChange={upd('linkedin')}
          placeholder="linkedin.com/in/yourname"
        />
        <Input
          label="GitHub"
          hint="optional"
          value={data.personal.github}
          onChange={upd('github')}
          placeholder="github.com/yourname"
        />
      </Row>
      <Input
        label="Website / Portfolio"
        hint="optional"
        value={data.personal.website}
        onChange={upd('website')}
        placeholder="yoursite.com"
      />

      <div
        style={{
          marginTop: '20px',
          paddingTop: '20px',
          borderTop: '1px solid #f0ece4',
        }}
      >
        <Textarea
          label="Professional Summary"
          hint="2–3 sentences about yourself"
          value={data.summary}
          onChange={(val) => onChange(null, val)}
          placeholder="Motivated Computer Science student at FAST-NUCES with a 3.7 GPA. Passionate about building web applications. Seeking a software engineering internship to contribute to impactful products."
          rows={4}
        />
      </div>
    </div>
  );
}
