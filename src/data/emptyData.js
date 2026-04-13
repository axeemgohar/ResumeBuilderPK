// Empty state — what a new user starts with
export const emptyData = {
  personal: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    github: '',
    website: '',
  },
  summary: '',
  education: [
    {
      id: Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      gpa: '',
      details: '',
    },
  ],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    tools: [],
    languages: [],
  },
  certifications: [],
}

export function newEducation() {
  return { id: Date.now(), degree: '', institution: '', location: '', startDate: '', endDate: '', gpa: '', details: '' }
}

export function newExperience() {
  return { id: Date.now(), title: '', company: '', location: '', startDate: '', endDate: '', bullets: [''] }
}

export function newProject() {
  return { id: Date.now(), name: '', tech: '', date: '', bullets: [''] }
}

export function newCertification() {
  return { id: Date.now(), name: '', issuer: '', date: '' }
}
