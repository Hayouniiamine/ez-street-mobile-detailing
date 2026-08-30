import { useEffect, useState } from 'react'
import Logo from './Logo'
import { Close, Menu, Phone } from './Icons'
import { bookingTarget, telHref, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

const LINKS = [
  { label: 'Services', href: '#services' },
  { label: 'Ceramic', href: '#ceramic' },
  { label: 'Interior', href: '#interior' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#quote' },
]

export default function Navbar() {
  const { business } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const book = bookingTarget(business)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header
        className={`sticky top-0 z-[90] bg-white transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_2px_18px_rgba(0,0,0,0.10)]' : 'shadow-none'
        }`}
      >
        <div className="shell flex h-[68px] items-center justify-between gap-6 lg:h-[80px]">
          <a href="#top" className="shrink-0" aria-label="E-Z Street Mobile Detailing — home">
            <Logo />
          </a>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Primary">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-[12px] font-semibold uppercase tracking-[0.18em] text-ink transition-colors duration-200 hover:text-brand"
              >
                {l.label}
                <span className="absolute -bottom-1.5 left-0 h-[2px] w-0 bg-brand transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-5 md:flex">
            <a
              href={telHref(business)}
              className="group inline-flex items-center gap-2 font-alt text-[17px] font-semibold tracking-wide text-ink transition-colors duration-200 hover:text-brand"
            >
              <Phone width={17} height={17} className="text-brand" />
              {business.phone}
            </a>
            {book.external ? (
              <a
                href={book.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-red !px-6 !py-3 !text-[12px]"
              >
                Book Now
              </a>
            ) : (
              <button
                type="button"
                onClick={() => openBooking()}
                className="btn-red !px-6 !py-3 !text-[12px]"
              >
                Book Now
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            className="-mr-1 inline-flex h-11 w-11 items-center justify-center text-ink md:hidden"
            aria-label="Open menu"
          >
            <Menu width={26} height={26} />
          </button>
        </div>
      </header>

      {/* mobile sheet */}
      <div
        className={`fixed inset-0 z-[95] bg-ink transition-opacity duration-300 md:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-[68px] items-center justify-between px-5">
          <Logo tone="light" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center text-white"
            aria-label="Close menu"
          >
            <Close width={26} height={26} />
          </button>
        </div>

        <nav className="mt-6 flex flex-col px-5" aria-label="Mobile">
          {LINKS.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="border-b border-ink-line py-5 font-display text-4xl tracking-wide text-white transition-colors duration-200 hover:text-brand"
            >
              <span className="mr-4 align-middle font-sans text-[11px] font-semibold text-brand">
                0{i + 1}
              </span>
              {l.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 space-y-3 px-5">
          {book.external ? (
            <a
              href={book.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-red w-full"
            >
              Book Now
            </a>
          ) : (
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                openBooking()
              }}
              className="btn-red w-full"
            >
              Book Now
            </button>
          )}
          <a href={telHref(business)} className="btn-outline-light w-full">
            Call {business.phone}
          </a>
        </div>
      </div>
    </>
  )
}
