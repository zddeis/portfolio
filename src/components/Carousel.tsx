import { useState } from 'react'
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react'
import Lightbox from './Lightbox'

type CarouselProps = {
  images: string[]
  alt?: string
}

export default function Carousel({ images, alt }: CarouselProps) {
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const count = images.length

  const prev = () => setIndex((i) => (i - 1 + count) % count)
  const next = () => setIndex((i) => (i + 1) % count)

  if (count === 0) return null

  return (
    <div className="relative h-52 bg-[var(--color-bg-2)] rounded-xl overflow-hidden group select-none">
      <button
        onClick={() => setLightboxOpen(true)}
        aria-label="Open image"
        className="block w-full h-full cursor-zoom-in"
      >
        <img
          src={images[index]}
          alt={alt ? `${alt} ${index + 1}` : undefined}
          className="w-full h-full object-cover pointer-events-none"
        />
      </button>

      <button
        onClick={() => setLightboxOpen(true)}
        aria-label="Open fullscreen"
        className="absolute top-2 right-2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer opacity-0 group-hover:opacity-100"
      >
        <Maximize2 size={16} />
      </button>

      {count > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
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

      {lightboxOpen && (
        <Lightbox
          images={images}
          startIndex={index}
          alt={alt}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  )
}
