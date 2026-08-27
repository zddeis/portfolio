import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type LightboxProps = {
  images: string[]
  startIndex: number
  alt?: string
  onClose: () => void
}

export default function Lightbox({ images, startIndex, alt, onClose }: LightboxProps) {
  const [index, setIndex] = useState(startIndex)
  const count = images.length

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') setIndex((i) => (i - 1 + count) % count)
      if (e.key === 'ArrowRight') setIndex((i) => (i + 1) % count)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose, count])

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = original
    }
  }, [])

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 max-sm:p-2 animate-[backdropFade_0.2s_ease]" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div className="relative max-w-5xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-11 right-0 text-white/80 hover:text-white transition-colors cursor-pointer"
        >
          <X size={28} />
        </button>

        <div className="relative bg-[var(--color-bg-1)] border border-[var(--color-border)] rounded-2xl overflow-hidden animate-[modalPop_0.25s_ease]">
          <img
            src={images[index]}
            alt={alt ? `${alt} ${index + 1}` : undefined}
            className="w-full h-auto max-h-[80vh] object-contain"
          />

          {count > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
              >
                <ChevronRight size={28} />
              </button>

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to image ${i + 1}`}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/70'}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
