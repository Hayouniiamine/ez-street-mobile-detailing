import { Link } from 'react-router-dom'
import Logo from './Logo'
import { Clock, Facebook, GoogleG, Instagram, MapPin, Phone, Yelp } from './Icons'
import { groupOf, smsHref, telHref, useSite } from '../context/SiteData'

const SOCIALS = [
  { key: 'google', label: 'Google', Icon: GoogleG },
  { key: 'facebook', label: 'Facebook', Icon: Facebook },
  { key: 'instagram', label: 'Instagram', Icon: Instagram },
  { key: 'yelp', label: 'Yelp', Icon: Yelp },
]

export default function Footer() {
  const { data, business } = useSite()
  const signature = groupOf(data, 'signature')
  const ceramic = groupOf(data, 'ceramic')

  // Only render an icon when a real URL exists — never a placeholder link.
  const links = SOCIALS.filter((s) => (business.social?.[s.key] || '').trim())

  return (
    <footer className="bg-ink text-white">
      <div className="shell grid grid-cols-12 gap-x-8 gap-y-12 py-16 lg:py-20">
        <div className="col-span-12 lg:col-span-4">
          <Logo tone="light" />
          <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-white/55">
            {business.name} — mobile Auto/Boat/RV detailing that comes to your home, office, or
            wherever you are.
          </p>
          <a
            href={telHref(business)}
            className="mt-6 inline-block font-display text-4xl tracking-wide text-white transition-colors duration-200 hover:text-brand"
          >
            {business.phone}
          </a>

          {links.length > 0 && (
            <div className="mt-7 flex items-center gap-3">
              {links.map(({ key, label, Icon }) => (
                <a
                  key={key}
                  href={business.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-10 w-10 items-center justify-center border border-ink-line text-white/70 transition-colors duration-200 hover:border-brand hover:bg-brand hover:text-white"
                >
                  <Icon width={18} height={18} />
                </a>
              ))}
            </div>
          )}
        </div>

        <nav className="col-span-6 sm:col-span-4 lg:col-span-2" aria-label="Quick links">
          <h3 className="font-alt text-[13px] font-semibold uppercase tracking-[0.22em] text-brand">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] text-white/65">
            {[
              ['About', '#about'],
              ['Packages', '#services'],
              ['Gallery', '#gallery'],
              ['Reviews', '#reviews'],
              ['Get a Quote', '#quote'],
            ].map(([label, href]) => (
              <li key={href}>
                <a href={href} className="transition-colors duration-200 hover:text-brand">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="col-span-6 sm:col-span-4 lg:col-span-3" aria-label="Services">
          <h3 className="font-alt text-[13px] font-semibold uppercase tracking-[0.22em] text-brand">
            Services
          </h3>
          <ul className="mt-5 space-y-3 text-[15px] text-white/65">
            {[...signature, ...ceramic].map((p) => (
              <li key={p.id}>
                <a href="#services" className="transition-colors duration-200 hover:text-brand">
                  {p.title}
                </a>
              </li>
            ))}
            <li>
              <a href="#interior" className="transition-colors duration-200 hover:text-brand">
                Interior Deep Clean &amp; Steam
              </a>
            </li>
            <li>
              <a href="#addons" className="transition-colors duration-200 hover:text-brand">
                A La Carte Add-Ons
              </a>
            </li>
          </ul>
        </nav>

        <div className="col-span-12 sm:col-span-4 lg:col-span-3">
          <h3 className="font-alt text-[13px] font-semibold uppercase tracking-[0.22em] text-brand">
            Contact
          </h3>
          <ul className="mt-5 space-y-4 text-[15px] text-white/65">
            <li className="flex gap-3">
              <Phone width={17} height={17} className="mt-1 shrink-0 text-brand" />
              <span className="flex flex-col">
                <a href={telHref(business)} className="transition-colors hover:text-brand">
                  {business.phone}
                </a>
                <a
                  href={smsHref(business)}
                  className="text-[13px] text-white/40 transition-colors hover:text-brand"
                >
                  Send a text
                </a>
              </span>
            </li>
            {business.serviceArea && (
              <li className="flex gap-3">
                <MapPin width={17} height={17} className="mt-1 shrink-0 text-brand" />
                <span>{business.serviceArea}</span>
              </li>
            )}
            {business.hours?.length > 0 && (
              <li className="flex gap-3">
                <Clock width={17} height={17} className="mt-1 shrink-0 text-brand" />
                <span className="flex flex-col gap-1">
                  {business.hours.map((h) => (
                    <span key={h}>{h}</span>
                  ))}
                </span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-line">
        <div className="shell flex flex-col items-start justify-between gap-3 py-6 text-[13px] text-white/40 sm:flex-row sm:items-center">
          <p>© 2025 {business.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <span className="font-alt uppercase tracking-[0.2em] text-white/55">
              {business.tagline}
            </span>
            <Link to="/admin" className="transition-colors duration-200 hover:text-brand">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
