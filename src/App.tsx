import { useState, useEffect, useRef } from 'react'
import { Sun, Moon, ExternalLink, Copy, Globe, BookOpen } from 'lucide-react'
import { Github } from './icons'
import Toaster, { ToasterHandle } from './components/Toaster'
import Modal from './components/Modal'
import { tools, projects, contact, about, getAge, Project } from './data'
import './App.css'

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

  const ProjectCard = ({ project: p, index, onSelect }: { project: Project; index: number; onSelect: (i: number) => void }) => (
    <div key={index} onClick={() => onSelect(index)} className="cursor-pointer bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-2-hover)] transition-colors border border-[var(--color-border)] rounded-xl overflow-hidden shadow-sm">
      <div className="h-44 bg-[var(--color-bg-2)] flex items-center justify-center text-[var(--color-text-muted)] text-sm">
        {p.images && p.images[0] ? (
          <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
        ) : (
          'Project Image'
        )}
      </div>
      <div className="flex flex-col p-5 border-t border-[var(--color-border)]" style={{ height: 'calc(100% - calc(var(--spacing) * 44))' }}>
        <div className='w-full flex justify-between items-end'>
          <h3 className="text-lg font-semibold text-[var(--color-text)] mb-2">{p.name}</h3>
          <p className="text-[var(--color-text-muted)] text-xs mb-3">{p.timeline}</p>
        </div>

        <div className='flex-1 w-full flex flex-col justify-between'>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed mb-4">{p.description}</p>
          <div>
            <p className="text-[var(--color-text-secondary)] text-xs mb-2 text-nowrap truncate">{p.tools.join(', ')}</p>
            <div className='flex gap-4'>
              {p.links && p.links['source'] ? (
                <a href={p.links['source']} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] py-1">
                  <Github />
                  Source
                  <ExternalLink size={14} />
                </a>
              ) : ''}
              {p.links && p.links['website'] ? (
                <a href={p.links['website']} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] py-1">
                  <Globe />
                  Website
                  <ExternalLink size={14} />
                </a>
              ) : ''}
              {p.links && p.links['docs'] ? (
                <a href={p.links['docs']} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--color-text)] py-1">
                  <BookOpen />
                  Docs
                  <ExternalLink size={14} />
                </a>
              ) : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center h-20 select-none">
        <div className="flex items-center justify-between w-full max-w-5xl px-6 gap-4">
          <div className='flex-1'>
            <div className="py-2.5 flex items-center gap-3">
              <img src='https://avatars.githubusercontent.com/u/125417427?v=4' className="w-8 h-8 rounded-full bg-transparent" />
  
              <span className="text-[var(--color-text)] hidden md:block font-semibold text-base overflow-hidden">{about.name.split(' ')[0]}</span>
            </div>
          </div>

          { true ? (<div className="bg-[var(--color-bg-1)]/25 backdrop-blur-lg rounded-xl px-6 py-2.5 flex items-center gap-8">
            <a href="#about" className="text-sm font-medium text-[var(--color-text)]/75 hover:text-[var(--color-text)] transition-colors">About</a>
            <a href="#work" className="text-sm font-medium text-[var(--color-text)]/75 hover:text-[var(--color-text)] transition-colors">Work</a>
            <a href="#contact" className="text-sm font-medium text-[var(--color-text)]/75 hover:text-[var(--color-text)] transition-colors">Contact</a>
          </div>) : ''}

          <div className='flex-1 flex justify-end'>
            <div className="py-2.5 flex items-center">
              <button onClick={toggleTheme} className="text-[var(--color-text)] cursor-pointer" aria-label="Toggle theme">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className='flex flex-col select-none gap-24 my-24'>

        <section id="about" className="max-w-5xl mx-auto flex h-xl">
          <div className='flex gap-8 items-center flex-1 max-md:flex-col max-md:justify-center'>
            <img src="https://avatars.githubusercontent.com/u/125417427?v=4" alt="" className='h-full max-h-40 w-auto aspect-square rounded-full' />
            <div className="items-center gap-12 max-md:flex-col max-md:text-center max-w-md">
              <h1 className="text-4xl font-bold tracking-tight text-[var(--color-text)] mb-1">{about.name}</h1>
              <p className="text-lg text-[var(--color-text-secondary)] mb-3">{about.role}</p>
              <p className="text-sm text-[var(--color-text-muted)]">{getAge()} · {about.location}</p>
            </div>
          </div>
        </section>
  
        <section id="work" className="w-full max-w-5xl mx-auto px-6">
          <h2 className="text-[var(--color-text)] text-2xl font-semibold text-center mb-12 tracking-tight">Work & Projects</h2>
          <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((p, i) => (
                  <ProjectCard key={i} project={p} index={i} onSelect={setSelectedProject} />
                ))}
              </div>
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
