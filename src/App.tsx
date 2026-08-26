import { useState, useEffect } from 'react'
import { Mail, FileText, Sun, Moon, ExternalLink } from 'lucide-react'
import { Github } from './icons'
import './App.css'

const projects = [
  {
    name: 'Project Name',
    tools: 'Tool 1, Tool 2, Tool 3',
    timeline: 'Date - Date',
    description: 'Description',
    image: null,
    link: 'https://github.com/zddeis',
  },
  {
    name: 'Project Name',
    tools: 'Tool 1, Tool 2, Tool 3',
    timeline: 'Date - Date',
    description: 'Description',
    image: null,
    link: 'https://github.com/zddeis',
  },
  {
    name: 'Project Name',
    tools: 'Tool 1, Tool 2, Tool 3',
    timeline: 'Date - Date',
    description: 'Description',
    image: null,
    link: 'https://github.com/zddeis',
  },
]

const contact = [
  {
    name: 'Email',
    icon: <Mail size={20} />,
    href: 'mailto:david.fcg07@gmail.com',
  },
  {
    name: 'GitHub',
    icon: <Github />,
    href: 'https://github.com/zddeis',
  },
  {
    name: 'Resume',
    icon: <FileText size={20} />,
    href: '/portfolio/resume.pdf',
  },
]

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t: 'light' | 'dark') => t === 'dark' ? 'light' : 'dark')

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-20 select-none">
        <div className="flex items-center justify-between w-full max-w-5xl px-6 gap-4">
          <div className='flex-1'>
            <div className="py-2.5 flex items-center gap-3">
              <img src='https://avatars.githubusercontent.com/u/125417427?v=4' className="w-8 h-8 rounded-full bg-transparent" />
  
              <span className="text-[var(--color-text)] font-semibold text-base overflow-hidden">David</span>
            </div>
          </div>

          <div className="glass rounded-xl px-6 py-2.5 flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">About</a>
            <a href="#work" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Work</a>
            <a href="#contact" className="text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors">Contact</a>
          </div>

          <div className='flex-1 flex justify-end'>
            <div className="py-2.5 flex items-center">
              <button onClick={toggleTheme} className="text-[var(--color-text)] cursor-pointer" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className='flex flex-col select-none gap-24 my-48'>

        <section id="about" className="h-xl flex items-center max-w-5xl mx-auto">
          <div className="items-center gap-12 max-md:flex-col max-w-md max-md:text-center">
            <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text)] mb-1">David Gouveia</h1>
            <p className="text-lg text-[var(--color-text-secondary)] mb-4">Software Developer</p>
          </div>
        </section>
  
        <section id="work" className="w-full max-w-5xl mx-auto px-6">
          <h2 className="text-[var(--color-text)] text-2xl font-semibold text-center mb-12 tracking-tight">Work & Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <div key={i} className="cursor-pointer bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-2-hover)] transition-colors border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
                <div
                  className="h-44 bg-[var(--color-bg-2)] flex items-center justify-center text-[var(--color-text-muted)] text-sm">
                  {p.image ? (
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  ) : (
                    'Project Image'
                  )}
                </div>
                <div className="p-5 border-t border-[var(--color-border)]">
                  <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{p.name}</h3>
                  <p className="text-[var(--color-text-secondary)] text-xs mb-2">{p.tools}</p>
                  <p className="text-[var(--color-text-muted)] text-xs mb-3">{p.timeline}</p>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">{p.description}</p>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] px-3.5 py-1.5">
                    <Github />
                    Source
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
  
        <section id="contact" className="max-w-5xl mx-auto px-6">
          <h2 className="text-[var(--color-text)] text-2xl font-semibold text-center mb-12 tracking-tight">Contact</h2>
          <div className="flex justify-center gap-6 flex-wrap max-md:flex-col max-md:items-stretch">
            {contact.map((c, i) => (
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" className="shadow-sm bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] transition-colors flex items-center gap-2.5 text-[var(--color-text)] font-medium px-6 py-3.5 border border-[var(--color-border)] rounded-xl max-md:justify-center">
                {c.icon}
                {c.name}
              </a>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
