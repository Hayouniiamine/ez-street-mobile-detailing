import { useEffect, useRef, useState } from 'react'
import Reveal from '../components/Reveal'
import { ArrowRight, Check, Clock, MapPin, Phone, GoogleG } from '../components/Icons'
import { groupOf, smsHref, telHref, useSite } from '../context/SiteData'
import { QUOTE_EVENT } from '../lib/quote'
import Stars from '../components/Stars'

const GOOGLE_MAPS_URL = 'https://share.google/6YyJ3b9NE85bckQm7'

const SERVICE_TOWNS = [
  'Newburgh',
  'Poughkeepsie',
  'Beacon',
  'Middletown',
  'Goshen',
  'Kingston',
  'Warwick',
  'Fishkill',
  'Monroe',
  'Chester',
  'Cornwall',
  'Highland',
]

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  vehicle: '',
  package: '',
  date: '',
  location: '',
}

function Field({ label, error, required, className = '', children }) {
  return (
    <label className={`block ${className}`}>
      <span className="field-label">
        {label}
        {required && <span className="ml-1 text-brand">*</span>}
      </span>
      {children}
      {error && <span className="mt-2 block text-[12px] font-medium text-brand">{error}</span>}
    </label>
  )
}

export default function ContactForm() {
  const { data, business, addMessage } = useSite()
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const packageRef = useRef(null)

  const options = [
    ...groupOf(data, 'signature').map((p) => p.title),
    ...groupOf(data, 'ceramic').map((p) => `${p.title} (Ceramic)`),
    ...groupOf(data, 'alacarte').map((p) => p.title),
  ]

  // A "Book <package>" click anywhere on the page pre-fills this form.
  useEffect(() => {
    const onRequest = (e) => {
      const wanted = e.detail?.package || ''
      const match = options.find((o) => o.toLowerCase().startsWith(wanted.toLowerCase()))
      setSent(false)
      setForm((prev) => ({ ...prev, package: match || wanted }))
      window.setTimeout(() => packageRef.current?.focus({ preventScroll: true }), 600)
    }
    window.addEventListener(QUOTE_EVENT, onRequest)
    return () => window.removeEventListener(QUOTE_EVENT, onRequest)
  })

  const set = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
    setErrors((prev) => ({ ...prev, [key]: '' }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const next = {}
    if (!form.name.trim()) next.name = 'Please tell us your name.'
    if (!form.phone.trim()) next.phone = 'We need a number to call you back.'
    else if (form.phone.replace(/\D/g, '').length < 10) next.phone = 'That number looks incomplete.'
    if (form.email.trim() && !/^\S+@\S+\.\S+$/.test(form.email.trim()))
      next.email = 'Check that email address.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    addMessage(form)
    setSent(true)
  }

  return (
    <section id="quote" className="bg-white py-20 lg:py-28">
      <div className="shell space-y-16">
        {/* Form and Contact Info Grid */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-12">
          {/* Left Column: Business Details */}
          <Reveal className="col-span-12 lg:col-span-5">
            <p className="eyebrow">Contact &amp; Booking</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4rem)] uppercase leading-[0.9] text-ink">
              Get a free <span className="text-brand">quote</span>
            </h2>
            <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-muted">
              Tell us what you are driving, boating or camping in and where it lives. We will come back
              with a customized price and available date.
            </p>

            <div className="mt-8 border-l-2 border-brand pl-6">
              <a
                href={telHref(business)}
                className="font-display text-[2.6rem] leading-none tracking-wide text-ink transition-colors duration-200 hover:text-brand"
              >
                {business.phone}
              </a>
              <p className="mt-2 text-[13px] text-muted">
                Prefer to text?{' '}
                <a
                  href={smsHref(business)}
                  className="font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4 hover:text-brand"
                >
                  Send an SMS message
                </a>
              </p>
            </div>

            <ul className="mt-8 space-y-4 text-[15px] text-muted">
              {business.hours?.length > 0 && (
                <li className="flex gap-3">
                  <Clock width={18} height={18} className="mt-[2px] shrink-0 text-brand" />
                  <span className="flex flex-col gap-0.5">
                    {business.hours.map((h) => (
                      <span key={h}>{h}</span>
                    ))}
                  </span>
                </li>
              )}
              <li className="flex gap-3">
                <MapPin width={18} height={18} className="mt-[2px] shrink-0 text-brand" />
                <span>
                  <span className="block font-medium text-ink">{business.serviceArea}</span>
                  {business.radius && <span className="mt-0.5 block text-[13px]">{business.radius}</span>}
                </span>
              </li>
              <li className="flex gap-3">
                <Phone width={18} height={18} className="mt-[2px] shrink-0 text-brand" />
                <span>Fully mobile unit with on-board water and electricity.</span>
              </li>
            </ul>

            {/* Google Rating badge */}
            <div className="mt-8">
              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded border border-rule bg-mist p-3.5 transition-all hover:border-brand hover:shadow-md"
              >
                <GoogleG width={20} height={20} className="text-brand" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <Stars rating={5} size={14} />
                    <span className="font-display text-lg leading-none text-ink">5.0 Star Rating</span>
                  </div>
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                    Based on 57 Google Reviews ↗
                  </span>
                </div>
              </a>
            </div>
          </Reveal>

          {/* Right Column: Quote Form */}
          <Reveal delay={100} className="col-span-12 lg:col-span-7">
            <div className="border border-rule bg-white p-7 shadow-card sm:p-10">
              {sent ? (
                <div className="py-6">
                  <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
                    <Check width={28} height={28} />
                  </span>
                  <h3 className="mt-6 font-display text-[2.4rem] leading-none tracking-wide text-ink">
                    Quote Request Received!
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted">
                    Thanks <span className="font-semibold text-ink">{form.name.split(' ')[0]}</span> — your inquiry is recorded in our system. We will contact you at{' '}
                    <span className="font-semibold text-ink">{form.phone}</span> with pricing and scheduling. Need immediate service? Call{' '}
                    <a href={telHref(business)} className="font-semibold text-brand">
                      {business.phone}
                    </a>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setForm(EMPTY)
                      setSent(false)
                    }}
                    className="btn-outline mt-8"
                  >
                    Send another request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Your Name" error={errors.name} required>
                      <input
                        className="field"
                        value={form.name}
                        onChange={set('name')}
                        placeholder="Full name"
                        autoComplete="name"
                      />
                    </Field>

                    <Field label="Phone Number" error={errors.phone} required>
                      <input
                        className="field"
                        value={form.phone}
                        onChange={set('phone')}
                        placeholder="(845) 000-0000"
                        inputMode="tel"
                        autoComplete="tel"
                      />
                    </Field>

                    <Field label="Email Address (Optional)" error={errors.email} className="sm:col-span-2">
                      <input
                        className="field"
                        value={form.email}
                        onChange={set('email')}
                        placeholder="you@example.com"
                        inputMode="email"
                        autoComplete="email"
                      />
                    </Field>

                    <Field label="Vehicle / Boat / RV">
                      <input
                        className="field"
                        value={form.vehicle}
                        onChange={set('vehicle')}
                        placeholder="e.g. 2021 Ford F-150 or 24' Boat"
                      />
                    </Field>

                    <Field label="Package Interested In">
                      <select
                        ref={packageRef}
                        className="field"
                        value={form.package}
                        onChange={set('package')}
                      >
                        <option value="">Not sure yet — recommend one</option>
                        {options.map((o) => (
                          <option key={o} value={o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </Field>

                    <Field label="Preferred Date">
                      <input type="date" className="field" value={form.date} onChange={set('date')} />
                    </Field>

                    <Field label="Your Town / ZIP Code">
                      <input
                        className="field"
                        value={form.location}
                        onChange={set('location')}
                        placeholder="e.g. Newburgh, Poughkeepsie, Beacon..."
                      />
                    </Field>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <button type="submit" className="btn-red">
                      Request Free Quote <ArrowRight width={16} height={16} />
                    </button>
                    <p className="text-[13px] text-muted">
                      100% free quote with no obligation.
                    </p>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>

        {/* Google Maps Location & Mobile Service Coverage Area */}
        <Reveal delay={120} className="border border-rule bg-white shadow-card overflow-hidden">
          <div className="grid grid-cols-12">
            {/* Map Info Box */}
            <div className="col-span-12 lg:col-span-5 p-8 lg:p-10 flex flex-col justify-between bg-[#fafafa] border-b lg:border-b-0 lg:border-r border-rule">
              <div>
                <div className="flex items-center gap-2 text-brand">
                  <MapPin width={18} height={18} />
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em]">
                    Google Maps Verified Business
                  </span>
                </div>

                <h3 className="mt-3 font-display text-3xl uppercase tracking-wide text-ink">
                  Hudson Valley <span className="text-brand">Service Area</span>
                </h3>

                <p className="mt-3 text-[14px] leading-relaxed text-muted">
                  E-Z Street Mobile Detailing operates across the entire Hudson Valley region, traveling up to 50 miles directly to your location.
                </p>

                <div className="mt-6 border-t border-rule pt-4">
                  <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted block mb-3">
                    Popular Service Hubs:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SERVICE_TOWNS.map((town) => (
                      <span
                        key={town}
                        className="rounded border border-rule bg-white px-2.5 py-1 text-[12px] font-medium text-ink"
                      >
                        {town}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-rule flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-1.5">
                    <Stars rating={5} size={14} />
                    <span className="font-display text-lg text-ink">5.0 / 5.0</span>
                  </div>
                  <span className="text-[12px] text-muted">57 Verified Google Reviews</span>
                </div>

                <a
                  href={GOOGLE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red !py-2.5 !px-5 !text-[12px]"
                >
                  Open in Google Maps ↗
                </a>
              </div>
            </div>

            {/* Embedded Interactive Map */}
            <div className="col-span-12 lg:col-span-7 min-h-[340px] lg:min-h-[420px] relative bg-mist">
              <iframe
                title="E-Z Street Mobile Detailing Google Map Location and Coverage"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d191834.62770281223!2d-74.15000000000002!3d41.5034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89dd312f5a0e08f5%3A0x6b095fefec65609e!2sHudson%20Valley%2C%20NY!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '360px' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              />
              <div className="absolute top-4 right-4 z-10 bg-ink/90 text-white px-3.5 py-1.5 rounded text-[11px] font-semibold uppercase tracking-wider shadow-md backdrop-blur-sm pointer-events-none">
                📍 Mobile Coverage: 50 Miles
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
