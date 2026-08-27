import { useEffect } from 'react'
import { ExternalLink, X } from 'lucide-react'
import { Github } from '../icons'

export type Project = {
  name: string
  tools: string[]
  timeline: string
  description: string
  longDescription: string
  image: string | null
  link: string
  features: string[]
}

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

  if (!project) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 max-sm:p-2" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-[var(--color-bg-1)] border border-[var(--color-border)] rounded-2xl shadow-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]">
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
          <div className="h-52 bg-[var(--color-bg-2)] flex items-center justify-center text-[var(--color-text-muted)] text-sm rounded-xl overflow-hidden">
            {project.image ? (
              <img src={project.image} alt={project.name} className="w-full h-full object-cover" />
            ) : (
              'Project Image'
            )}
          </div>

          {project.longDescription && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2 select-none">About</h4>
              <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{project.longDescription}</p>
            </div>
          )}

          {project.features && (
            <div>
              <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)] mb-2 select-none">Highlights</h4>
              <ul className="list-disc list-inside space-y-1.5 text-[var(--color-text-secondary)] text-sm">
                {project.features.map((f, fi) => (
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

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full inline-flex items-center justify-center gap-2 text-sm font-medium text-[var(--color-text)] bg-[var(--color-bg-2)] hover:bg-[var(--color-bg-3)] transition-colors px-4 py-3 border border-[var(--color-border)] rounded-xl"
          >
            <Github />
            View Source
            <ExternalLink size={15} />
          </a>
        </div>
      </div>
    </div>
  )
}
