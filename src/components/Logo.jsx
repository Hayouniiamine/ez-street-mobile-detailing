import logoImg from '../assets/logo.jpg'

export default function Logo({ tone = 'dark', className = '', showText = true, size = 'default' }) {
  const onDark = tone === 'light'

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* Brand Emblem Image */}
      <img
        src={logoImg}
        alt="E-Z Street Mobile Detailing Brand Emblem"
        className={`rounded-lg object-cover shadow-sm border ${
          onDark ? 'border-white/20' : 'border-ink/20'
        } ${
          size === 'small'
            ? 'h-8 w-8'
            : size === 'large'
            ? 'h-12 w-12'
            : 'h-10 w-10 sm:h-11 sm:w-11'
        }`}
      />

      {showText && (
        <span className="flex flex-col">
          <span
            className={`font-display text-[18px] sm:text-[20px] font-bold leading-none tracking-wide ${
              onDark ? 'text-white' : 'text-ink'
            }`}
          >
            E-Z <span className="text-brand">STREET</span>
          </span>
          <span
            className={`font-alt text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.24em] mt-0.5 ${
              onDark ? 'text-white/70' : 'text-muted'
            }`}
          >
            Mobile Detailing
          </span>
        </span>
      )}
    </span>
  )
}
