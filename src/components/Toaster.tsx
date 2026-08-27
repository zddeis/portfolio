import { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Check, X } from 'lucide-react'

export type ToasterHandle = {
  push: (message: string) => void
}

type Toast = {
  id: number
  message: string
  leaving: boolean
}

type ToasterProps = {
  max?: number
  duration?: number
}

const MAX_TOASTS = 3
const DURATION = 2500
const FADE_OUT = 250

const Toaster = forwardRef<ToasterHandle, ToasterProps>(({ max = MAX_TOASTS, duration = DURATION }, ref) => {
  const [toasts, setToasts] = useState<Toast[]>([])
  const idRef = useRef(0)

  const removeAfter = (id: number) => {
    setTimeout(() => {
      setToasts((prev) =>
        prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
      )
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id))
      }, FADE_OUT)
    }, duration)
  }

  useImperativeHandle(ref, () => ({
    push(message) {
      const id = ++idRef.current
      setToasts((prev) => {
        const next = [...prev, { id, message, leaving: false }]
        const trimmed = next.length > max ? next.slice(next.length - max) : next
        return trimmed
      })
      removeAfter(id)
    },
  }))

  const dismiss = (id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="fixed bottom-6 left-0 right-0 z-[200] flex flex-col items-center pointer-events-none">
      {toasts.map((t, i) => {
        const depth = toasts.length - 1 - i
        return (
          <div
            key={t.id}
            className={`toast-stack toast-layer ${t.leaving ? 'toast-leaving' : ''}`}
            style={{
              transform: `translateX(-50%) translateY(${-8 * depth}px) scale(${Math.pow(0.9, depth)})`,
              zIndex: 10 - depth,
            }}
          >
            <div className={`toast-inner ${depth === 0 ? 'toast-pop' : ''}`}>
              <div className="flex items-center gap-2 px-5 py-3 rounded-xl shadow-lg border border-[var(--color-border)] bg-[var(--color-bg-2)] text-[var(--color-text)] text-sm font-medium">
                <Check size={16} className="text-[var(--color-text-secondary)]" />
                {t.message}
                <button
                  onClick={() => dismiss(t.id)}
                  className="ml-2 text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors cursor-pointer pointer-events-auto"
                  aria-label="Dismiss"
                >
                  <X size={15} />
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
})

Toaster.displayName = 'Toaster'

export default Toaster
