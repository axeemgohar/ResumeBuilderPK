// Default sample data shown in template previews
export const sampleData = {
  personal: {
    name: 'Aisha Rahman',
    title: 'Software Engineering Student',
    email: 'aisha.rahman@email.com',
    phone: '+92 300 123 4567',
    location: 'Lahore, Pakistan',
    linkedin: 'linkedin.com/in/aisharahman',
    github: 'github.com/aisharahman',
    website: '',
  },
  summary:
    'Driven Computer Science student at FAST-NUCES with a 3.8 GPA and a passion for building scalable web applications. Experienced in full-stack development through academic projects and a summer internship. Seeking a software engineering internship to contribute to impactful products.',
  education: [
    {
      id: 1,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'FAST National University of Computer & Emerging Sciences',
      location: 'Lahore, Pakistan',
      startDate: 'Sep 2022',
      endDate: 'Jun 2026',
      gpa: '3.8 / 4.0',
      details: 'Dean\'s List — Spring 2023, Fall 2023 · Relevant: Data Structures, OS, Databases, Web Engineering',
    },
    {
      id: 2,
      degree: 'FSc Pre-Engineering',
      institution: 'Lahore Grammar School',
      location: 'Lahore, Pakistan',
      startDate: '',
      endDate: '2022',
      gpa: '95%',
      details: '',
    },
  ],
  experience: [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'Systems Limited',
      location: 'Lahore, Pakistan',
      startDate: 'Jun 2024',
      endDate: 'Aug 2024',
      bullets: [
        'Built RESTful APIs using Node.js and Express, reducing average response time by 35%',
        'Redesigned the client dashboard UI in React, improving user engagement by 22%',
        'Collaborated in an Agile team of 8 engineers, participating in daily standups and sprint reviews',
      ],
    },
    {
      id: 2,
      title: 'Frontend Developer (Freelance)',
      company: 'Self-Employed',
      location: 'Remote',
      startDate: 'Jan 2024',
      endDate: 'Present',
      bullets: [
        'Delivered 6 client websites using React and Tailwind CSS',
        'Integrated payment gateways and third-party APIs for e-commerce clients',
      ],
    },
  ],
  projects: [
    {
      id: 1,
      name: 'EduConnect Platform',
      tech: 'React · Node.js · MongoDB · Socket.io',
      date: '2024',
      bullets: [
        'Real-time tutoring platform connecting 200+ students with instructors',
        'Implemented live video sessions using WebRTC and chat via Socket.io',
      ],
    },
    {
      id: 2,
      name: 'AI Resume Analyzer',
      tech: 'Python · Flask · OpenAI API',
      date: '2023',
      bullets: [
        'Analyzes resumes and provides ATS compatibility scores and improvement tips',
        'Achieved 89% accuracy in keyword matching against job descriptions',
      ],
    },
  ],
  skills: {
    technical: [
      'JavaScript', 'TypeScript', 'React', 'Node.js',
      'Python', 'SQL', 'MongoDB', 'Git', 'REST APIs', 'HTML/CSS',
    ],
    tools: ['VS Code', 'Postman', 'Figma', 'Docker', 'GitHub Actions'],
    languages: ['English (Fluent)', 'Urdu (Native)'],
  },
  certifications: [
    { id: 1, name: 'Google IT Support Professional Certificate', issuer: 'Coursera', date: '2023' },
    { id: 2, name: 'Meta Front-End Developer Certificate', issuer: 'Coursera', date: '2024' },
  ],
}
