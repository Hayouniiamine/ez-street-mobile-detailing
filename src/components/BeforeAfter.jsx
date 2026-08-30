import { useCallback, useRef, useState } from 'react'
import Img from './Img'

const RATIO = {
  tall: 'aspect-[3/4]',
  wide: 'aspect-[16/10]',
  square: 'aspect-square',
}

/**
 * Drag/scrub comparison of one before-and-after pair.
 * The transparent range input keeps it keyboard- and touch-operable.
 */
export default function BeforeAfter({ item, className = '' }) {
  const [pos, setPos] = useState(52)
  const frameRef = useRef(null)

  const scrub = useCallback((clientX) => {
    const box = frameRef.current?.getBoundingClientRect()
    if (!box || !box.width) return
    const next = ((clientX - box.left) / box.width) * 100
    setPos(Math.max(0, Math.min(100, next)))
  }, [])

  return (
    <figure className={`group ${className}`}>
      <div className="border-2 border-transparent bg-ink transition-colors duration-300 group-hover:border-brand group-focus-within:border-brand">
        <div
          ref={frameRef}
          className={`relative w-full overflow-hidden ${RATIO[item.size] || RATIO.square}`}
          onPointerMove={(e) => scrub(e.clientX)}
        >
          <Img
            src={item.before}
            alt={`${item.caption} — before`}
            label="Before"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0" style={{ clipPath: `inset(0 0 0 ${pos}%)` }}>
            <Img
              src={item.after}
              alt={`${item.caption} — after`}
              label="After"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          {/* split handle */}
          <div
            className="pointer-events-none absolute inset-y-0 z-10 w-[3px] bg-white/95 shadow-[0_0_14px_rgba(0,0,0,0.45)]"
            style={{ left: `${pos}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-brand text-white">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m9 6-5 6 5 6M15 6l5 6-5 6" />
              </svg>
            </span>
          </div>

          <span className="pointer-events-none absolute bottom-3 left-3 z-10 bg-ink/85 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            Before
          </span>
          <span className="pointer-events-none absolute bottom-3 right-3 z-10 bg-brand px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
            After
          </span>

          <input
            type="range"
            min="0"
            max="100"
            step="0.5"
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label={`Reveal the after photo for ${item.caption}`}
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
          />
        </div>
      </div>

      <figcaption className="mt-3 flex items-baseline gap-3 border-l-2 border-brand pl-3">
        <span className="text-[13px] font-semibold leading-snug text-ink">{item.caption}</span>
      </figcaption>
    </figure>
  )
}
