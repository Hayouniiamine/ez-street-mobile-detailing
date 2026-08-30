const base = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const Svg = ({ children, ...p }) => (
  <svg {...base} {...p}>
    {children}
  </svg>
)

export const Phone = (p) => (
  <Svg {...p}>
    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.4 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.4 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
  </Svg>
)

export const Message = (p) => (
  <Svg {...p}>
    <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 20.5l1.6-4.6A8.4 8.4 0 0 1 3.6 11 8.4 8.4 0 0 1 12 3a8.4 8.4 0 0 1 9 8.5Z" />
  </Svg>
)

export const ArrowRight = (p) => (
  <Svg {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Svg>
)

export const Check = (p) => (
  <Svg {...p}>
    <path d="M20 6 9 17l-5-5" />
  </Svg>
)

export const Star = ({ filled = true, ...p }) => (
  <svg
    {...base}
    fill={filled ? 'currentColor' : 'none'}
    strokeWidth={filled ? 0 : 1.6}
    {...p}
  >
    <path d="m12 2.6 2.9 5.9 6.5.9-4.7 4.6 1.1 6.4-5.8-3-5.8 3 1.1-6.4L2.6 9.4l6.5-.9L12 2.6Z" />
  </svg>
)

export const Menu = (p) => (
  <Svg {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </Svg>
)

export const Close = (p) => (
  <Svg {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Svg>
)

export const MapPin = (p) => (
  <Svg {...p}>
    <path d="M20 10c0 5.2-8 12-8 12s-8-6.8-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="2.8" />
  </Svg>
)

export const Clock = (p) => (
  <Svg {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5.2l3.2 1.9" />
  </Svg>
)

export const Lock = (p) => (
  <Svg {...p}>
    <rect x="4" y="10.5" width="16" height="10.5" rx="1.5" />
    <path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" />
  </Svg>
)

export const Facebook = (p) => (
  <svg {...base} fill="currentColor" strokeWidth="0" {...p}>
    <path d="M14 9V7.2c0-.8.2-1.2 1.4-1.2H17V3.1A19 19 0 0 0 14.6 3C12 3 10.3 4.6 10.3 7v2H8v3h2.3v9H14v-9h2.5l.4-3H14Z" />
  </svg>
)

export const Instagram = (p) => (
  <Svg {...p}>
    <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
  </Svg>
)

export const GoogleG = (p) => (
  <svg {...base} fill="currentColor" strokeWidth="0" {...p}>
    <path d="M12 11v2.8h4a3.9 3.9 0 0 1-4 3 4.8 4.8 0 1 1 3.1-8.5l2.1-2.1A7.8 7.8 0 1 0 12 19.8c4.6 0 7.6-3.2 7.6-7.7 0-.5 0-.8-.1-1.1H12Z" />
  </svg>
)

export const Yelp = (p) => (
  <svg {...base} fill="currentColor" strokeWidth="0" {...p}>
    <path d="M11 4.2v8.1L6.2 9.6a1 1 0 0 1-.3-1.5 8.6 8.6 0 0 1 4-3 1 1 0 0 1 1.1 1.1Zm2.4 9.1 4.7-1.5a1 1 0 0 1 1.2 1.4 8.5 8.5 0 0 1-2.5 3.2 1 1 0 0 1-1.5-.2Zm-.2-2.1 3-3.8a1 1 0 0 1 1.5-.1 8.4 8.4 0 0 1 1.6 3.4 1 1 0 0 1-.9 1.2l-4.8.4a1 1 0 0 1-.4-1.1Zm-2 3.4v4.9a1 1 0 0 1-1.2 1 8.5 8.5 0 0 1-3.5-1.5 1 1 0 0 1 0-1.6l3.3-3.4a1 1 0 0 1 1.4.6Zm-2-1.9a1 1 0 0 1-.6 1.4l-4.2 1.4a1 1 0 0 1-1.3-1.1 8.5 8.5 0 0 1 .8-3.4 1 1 0 0 1 1.3-.5Z" />
  </svg>
)

/* ---------- admin ---------- */

export const Grid = (p) => (
  <Svg {...p}>
    <rect x="3.5" y="3.5" width="7" height="7" />
    <rect x="13.5" y="3.5" width="7" height="7" />
    <rect x="3.5" y="13.5" width="7" height="7" />
    <rect x="13.5" y="13.5" width="7" height="7" />
  </Svg>
)

export const Layers = (p) => (
  <Svg {...p}>
    <path d="m12 3 9 5-9 5-9-5 9-5Z" />
    <path d="m3.5 13 8.5 4.7L20.5 13" />
  </Svg>
)

export const Images = (p) => (
  <Svg {...p}>
    <rect x="3" y="5" width="18" height="14" rx="1.6" />
    <path d="m3.8 16.5 4.7-4.4 3.4 3 3.1-2.6 5 4.4" />
    <circle cx="8.4" cy="9.4" r="1.4" />
  </Svg>
)

export const QuoteIcon = (p) => (
  <Svg {...p}>
    <path d="M9.5 6.5C6.4 7.6 4.5 10 4.5 13.2c0 2.6 1.5 4.3 3.6 4.3 1.9 0 3.3-1.3 3.3-3.1 0-1.8-1.2-3-2.9-3-.3 0-.7 0-1 .2.4-1.6 1.6-2.9 3.3-3.6Zm9 0c-3.1 1.1-5 3.5-5 6.7 0 2.6 1.5 4.3 3.6 4.3 1.9 0 3.3-1.3 3.3-3.1 0-1.8-1.2-3-2.9-3-.3 0-.7 0-1 .2.4-1.6 1.6-2.9 3.3-3.6Z" />
  </Svg>
)

export const Building = (p) => (
  <Svg {...p}>
    <path d="M4 21V6.2a1 1 0 0 1 .7-1l7-2.1a1 1 0 0 1 1.3 1V21" />
    <path d="M13 9.5h5.5a1 1 0 0 1 1 1V21M2.5 21h19M7.5 8.5h2M7.5 12.5h2M7.5 16.5h2M15.5 13.5h1.5M15.5 17.5h1.5" />
  </Svg>
)

export const Inbox = (p) => (
  <Svg {...p}>
    <path d="M3.5 13.5h4l1.5 2.5h6l1.5-2.5h4" />
    <path d="M5.4 4.5h13.2l1.9 9V18a1.5 1.5 0 0 1-1.5 1.5H5a1.5 1.5 0 0 1-1.5-1.5v-4.5Z" />
  </Svg>
)

export const LogOut = (p) => (
  <Svg {...p}>
    <path d="M15 4.5h3A1.5 1.5 0 0 1 19.5 6v12a1.5 1.5 0 0 1-1.5 1.5h-3M10 16l-4-4 4-4M6 12h9" />
  </Svg>
)

export const Trash = (p) => (
  <Svg {...p}>
    <path d="M4 6.5h16M9.5 6.5V4.8A1.3 1.3 0 0 1 10.8 3.5h2.4a1.3 1.3 0 0 1 1.3 1.3v1.7M6.5 6.5 7.4 20a1.3 1.3 0 0 0 1.3 1.2h6.6a1.3 1.3 0 0 0 1.3-1.2l.9-13.5M10.5 10.5v6M13.5 10.5v6" />
  </Svg>
)

export const Pencil = (p) => (
  <Svg {...p}>
    <path d="M4 20h4L20.3 7.7a1.9 1.9 0 0 0 0-2.7l-1.3-1.3a1.9 1.9 0 0 0-2.7 0L4 16v4ZM14.5 5.5l4 4" />
  </Svg>
)

export const Plus = (p) => (
  <Svg {...p}>
    <path d="M12 5v14M5 12h14" />
  </Svg>
)

export const Grip = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="6" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="12" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="9" cy="18" r="1.2" fill="currentColor" stroke="none" />
    <circle cx="15" cy="18" r="1.2" fill="currentColor" stroke="none" />
  </Svg>
)

export const ChevronUp = (p) => (
  <Svg {...p}>
    <path d="m6 14 6-6 6 6" />
  </Svg>
)

export const ChevronDown = (p) => (
  <Svg {...p}>
    <path d="m6 10 6 6 6-6" />
  </Svg>
)

export const Upload = (p) => (
  <Svg {...p}>
    <path d="M12 15.5V4M8 8l4-4 4 4M4.5 15v3.5A1.5 1.5 0 0 0 6 20h12a1.5 1.5 0 0 0 1.5-1.5V15" />
  </Svg>
)
