import { useState, useEffect, useRef } from 'react'
import { Mail, FileText, Sun, Moon, ExternalLink, Copy } from 'lucide-react'
import { Github } from './icons'
import Toaster, { ToasterHandle } from './components/Toaster'
import Modal from './components/Modal'
import './App.css'

const tools: Record<string, string> = {
  "Lua": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/lua/lua-original.svg",
  "C#": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  "TailwindCSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
}

const projects = [
  {
    name: 'Project Name',
    tools: ['Lua', 'TailwindCSS', 'C#'],
    timeline: 'Date - Date',
    description: 'Description',
    longDescription: 'A longer, more detailed description of the project goes here. You can cover what it does, the problem it solves, the architecture, and anything else worth highlighting.',
    image: null,
    link: 'https://github.com/zddeis',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Project Name',
    tools: ['C#'],
    timeline: 'Date - Date',
    description: 'Description',
    longDescription: 'A longer, more detailed description of the project goes here. You can cover what it does, the problem it solves, the architecture, and anything else worth highlighting.',
    image: null,
    link: 'https://github.com/zddeis',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
  {
    name: 'Project Name',
    tools: ['Lua', 'C#'],
    timeline: 'Date - Date',
    description: 'Description',
    longDescription: 'A longer, more detailed description of the project goes here. You can cover what it does, the problem it solves, the architecture, and anything else worth highlighting.',
    image: null,
    link: 'https://github.com/zddeis',
    features: ['Feature 1', 'Feature 2', 'Feature 3'],
  },
]

const contact = [
  {
    name: 'Email',
    icon: <Mail size={20} />,
    href: 'mailto:david.fcg07@gmail.com',
    tooltip: 'david.fcg07@gmail.com',
  },
  {
    name: 'GitHub',
    icon: <Github />,
    href: 'https://github.com/zddeis',
    tooltip: 'github.com/zddeis',
  },
  {
    name: 'Resume',
    icon: <FileText size={20} />,
    href: '/portfolio/resume.pdf',
  },
]

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')
  const [selectedProject, setSelectedProject] = useState<number | null>(null)
  const [hoveredContact, setHoveredContact] = useState<number | null>(null)
  const toasterRef = useRef<ToasterHandle>(null)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme((t: 'light' | 'dark') => t === 'dark' ? 'light' : 'dark')

  const copyContact = async (c: { name: string; tooltip?: string; href: string }) => {
    const value = c.tooltip ?? c.href
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      const ta = document.createElement('textarea')
      ta.value = value
      document.body.appendChild(ta)
      ta.select()
      document.execCommand('copy')
      document.body.removeChild(ta)
    }
    toasterRef.current?.push(`${c.name} copied to the clipboard!`)
  }

  const project = selectedProject !== null ? projects[selectedProject] : null

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
              <div key={i} onClick={() => setSelectedProject(i)} className="cursor-pointer bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-2-hover)] transition-colors border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
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
                  <p className="text-[var(--color-text-secondary)] text-xs mb-2 text-nowrap truncate">{p.tools.join(', ')}</p>
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
              <a key={i} href={c.href} target="_blank" rel="noopener noreferrer" data-tooltip={c.tooltip} className="shadow-sm bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] transition-colors flex items-center gap-2.5 text-[var(--color-text)] font-medium px-6 py-3.5 border border-[var(--color-border)] rounded-xl max-md:justify-center"
                onMouseEnter={() => setHoveredContact(i)}
                onMouseLeave={() => setHoveredContact(null)}
              >
                {c.tooltip && (
                  <span
                    className="relative cursor-pointer inline-flex w-5 h-5"
                    title="Copy"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      copyContact(c)
                    }}
                  >
                    <span className={`icon-fade absolute inset-0 ${hoveredContact === i ? 'icon-hidden' : ''}`}>{c.icon}</span>
                    <span className={`icon-fade absolute inset-0 ${hoveredContact === i ? '' : 'icon-hidden'}`}><Copy size={20} /></span>
                  </span>
                )}
                {!c.tooltip && c.icon}
                {c.name}
              </a>
            ))}
          </div>
        </section>
      </main>

      <Toaster ref={toasterRef} />

      <Modal project={project} tools={tools} onClose={() => setSelectedProject(null)} />
    </>
  )
}
