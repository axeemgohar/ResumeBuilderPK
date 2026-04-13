import ExecutiveClassic from './ExecutiveClassic'
import ModernSidebar from './ModernSidebar'
import EditorialMinimal from './EditorialMinimal'
import BoldImpact from './BoldImpact'

export const TEMPLATES = [
  {
    id: 'executive-classic',
    name: 'Executive Classic',
    tagline: 'Timeless · Refined · Gold accents',
    description: 'A prestigious black-and-gold design favored by top firms. Bold serif name, structured layout, and subtle luxury details.',
    component: ExecutiveClassic,
    palette: ['#111111', '#c9a96e', '#f5f0e8', '#e8e0d0'],
    bestFor: 'Finance, Law, Consulting',
  },
  {
    id: 'modern-sidebar',
    name: 'Modern Sidebar',
    tagline: 'Clean · Professional · Blue accent',
    description: 'A contemporary two-column layout with a deep navy sidebar. Perfect for tech roles with strong visual hierarchy.',
    component: ModernSidebar,
    palette: ['#0f2040', '#2563a8', '#60a5fa', '#f8fafc'],
    bestFor: 'Software Engineering, Product, Data',
  },
  {
    id: 'editorial-minimal',
    name: 'Editorial Minimal',
    tagline: 'Elegant · Typographic · Sophisticated',
    description: 'Magazine-inspired design with Playfair Display serif type. Understated, cultured, and memorable.',
    component: EditorialMinimal,
    palette: ['#0d0d0d', '#555555', '#888888', '#e0ddd8'],
    bestFor: 'Design, Marketing, Research, Academia',
  },
  {
    id: 'bold-impact',
    name: 'Bold Impact',
    tagline: 'Dynamic · Modern · Teal accent',
    description: 'A striking dark header with teal geometric accents. Commands attention while remaining professional and structured.',
    component: BoldImpact,
    palette: ['#0d1f1a', '#14b88c', '#d1fae5', '#f0fdf8'],
    bestFor: 'Startups, Engineering, Creative Tech',
  },
]

export { ExecutiveClassic, ModernSidebar, EditorialMinimal, BoldImpact }
