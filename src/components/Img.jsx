import { useEffect, useState } from 'react'

/**
 * Image with a branded fallback panel. If a remote photo 404s or the field is
 * empty, we render a flat black/red placeholder instead of a broken image icon.
 */
export default function Img({ src, alt = '', className = '', label = 'E-Z Street', ...rest }) {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    setFailed(false)
  }, [src])

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt || label}
        className={`stripe-dark flex items-center justify-center bg-ink ${className}`}
      >
        <span className="select-none px-4 text-center font-display text-sm tracking-[0.3em] text-white/45">
          {label}
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
      {...rest}
    />
  )
}
