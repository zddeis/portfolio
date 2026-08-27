import { useEffect } from 'react'
import { ExternalLink, X, BookOpen, Globe } from 'lucide-react'
import { Github } from '../icons'
import type { Project } from '../data'
import Carousel from './Carousel'

type ModalProps = {
  project: Project | null
  tools: Record<string, string>
  onClose: () => void
}

export default function Modal({ project, tools, onClose }: ModalProps) {
  useEffect(() => {
    if (!project) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [project, onClose])

  useEffect(() => {
    if (!project) return
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [project])

  if (!project) return null

    return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 max-sm:p-2 animate-[modalFade_0.2s_ease]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[backdropFade_0.2s_ease]" />


      <div
        className="relative bg-[var(--color-bg-1)] border border-[var(--color-border)] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto animate-[modalPop_0.25s_ease]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-[var(--color-bg-1)] sticky top-0 flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
          <h3 className="text-xl font-semibold text-[var(--color-text)]">
            {project.name}
            <span className="text-sm font-normal text-[var(--color-text-muted)] ml-4 select-none">{project.timeline}</span>
          </h3>
          <button
            onClick={onClose}
            className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={22} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {project.images && project.images.length > 1 ? (
            <Carousel images={project.images} alt={project.name} />
          ) : (
            <div className="h-52 bg-[var(--color-bg-2)] flex items-center justify-center text-[var(--color-text-muted)] text-sm rounded-xl overflow-hidden">
              {project.images && project.images[0] ? (
                <img src={project.images[0]} alt={project.name} className="w-full h-full object-cover" />
              ) : (
                'Project Image'
              )}
            </div>
          )}

          {project.longDescription && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-[-12px] select-none">About</h4>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed whitespace-pre-line">{project.longDescription}</p>
            </div>
          )}

          {project.highlights && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2 select-none">Highlights</h4>
              <ul className="list-disc list-inside space-y-1.5 text-[var(--color-text-secondary)] text-sm">
                {project.highlights.map((f, fi) => (
                  <li key={fi}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {project.tools && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-3 select-none">Tools</h4>
              <div className="flex flex-wrap items-center gap-1 select-none">
                {project.tools.map((t, ti) => (
                  <div
                    key={ti}
                    className="flex items-center gap-2 rounded-xl px-2 py-1"
                  >
                    <img src={tools[t]} alt={t} className="w-8 h-8" />
                    <span className="text-sm font-medium text-[var(--color-text)]">{t}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className='flex gap-2'>
            {project.links && project.links['source'] ? (
              <a
                href={project.links['source']}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text)] bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] transition-colors px-4 py-3 border border-[var(--color-border)] rounded-xl"
              >
                <Github />
                View Source
                <ExternalLink size={15} />
              </a>
            ) : ''}

            {project.links && project.links['website'] ? (
              <a
                href={project.links['website']}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text)] bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] transition-colors px-4 py-3 border border-[var(--color-border)] rounded-xl"
              >
                <Globe />
                View Website
                <ExternalLink size={15} />
              </a>
            ) : ''}

            {project.links && project.links['docs'] ? (
              <a
                href={project.links['docs']}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text)] bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] transition-colors px-4 py-3 border border-[var(--color-border)] rounded-xl"
              >
                <BookOpen />
                View Docs
                <ExternalLink size={15} />
              </a>
            ) : ''}
          </div>
        </div>
      </div>
    </div>
  )
}
