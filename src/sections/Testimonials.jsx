import { useState } from 'react'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'
import { QuoteIcon, GoogleG, Check, ArrowRight } from '../components/Icons'
import { useSite } from '../context/SiteData'

const GOOGLE_REVIEWS_URL = 'https://share.google/6YyJ3b9NE85bckQm7'

const TAG_FILTERS = [
  { id: 'all', label: 'All Reviews' },
  { id: 'mobile detailing', label: 'Mobile Detailing' },
  { id: 'ceramic finish', label: 'Ceramic Finish' },
  { id: 'headlight restoration', label: 'Headlight Restoration' },
  { id: 'scratch removal', label: 'Scratch & Stain Removal' },
]

export default function Testimonials() {
  const { data } = useSite()
  const [activeTag, setActiveTag] = useState('all')
  const [expanded, setExpanded] = useState(false)

  const allReviews = data.testimonials || []
  if (allReviews.length === 0) return null

  const filtered =
    activeTag === 'all'
      ? allReviews
      : allReviews.filter((t) => t.tag === activeTag)

  const featured = filtered.filter((t) => t.featured)
  const nonFeatured = filtered.filter((t) => !t.featured)

  // Primary lead review
  const lead = featured[0] || filtered[0]
  const rest = lead ? filtered.filter((r) => r.id !== lead.id) : filtered

  const initialCount = 6
  const visibleRest = expanded ? rest : rest.slice(0, initialCount)

  return (
    <section id="reviews" className="bg-[#f7f7f7] py-20 lg:py-28 overflow-hidden border-t border-rule">
      <div className="shell space-y-12">
        {/* Header and Trust Metrics Banner */}
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <Reveal>
            <div className="flex items-center gap-2 text-brand">
              <span className="block h-2 w-2 rounded-full bg-brand" />
              <span className="text-[11px] font-bold uppercase tracking-[0.24em]">
                Google Verified Client Reputation
              </span>
            </div>
            <h2 className="mt-3 text-[clamp(2.5rem,5.2vw,4.2rem)] uppercase leading-[0.9] text-ink">
              What Our Clients <span className="text-brand">Say</span>.
            </h2>
            <p className="mt-4 max-w-[50ch] text-[16px] leading-relaxed text-muted">
              Real feedback from real vehicle, boat, and RV owners across the Hudson Valley. Every review is verified on Google.
            </p>
          </Reveal>

          {/* Google 5.0 Rating Trust Card */}
          <Reveal delay={80} className="shrink-0">
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl bg-white p-5 sm:p-6 shadow-card border border-rule transition-all duration-300 hover:border-brand hover:shadow-lift"
              title="Open Google Business Reviews"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-mist border border-rule group-hover:border-brand transition-colors">
                  <GoogleG width={24} height={24} className="text-brand" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <Stars rating={5} size={18} />
                    <span className="font-display text-2xl font-bold tracking-wide text-ink">
                      5.0
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[12px] font-semibold text-muted group-hover:text-brand transition-colors mt-0.5">
                    <span>57 Google Reviews</span>
                    <span>·</span>
                    <span className="text-emerald-700 font-bold">100% Satisfaction</span>
                    <span className="ml-1">↗</span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        </div>

        {/* Filter Category Chips */}
        <Reveal delay={100}>
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-white p-2.5 shadow-sm border border-rule">
            <span className="hidden sm:inline-block text-[11px] font-bold uppercase tracking-[0.2em] text-muted px-3">
              Filter:
            </span>
            {TAG_FILTERS.map((tag) => {
              const count =
                tag.id === 'all'
                  ? allReviews.length
                  : allReviews.filter((r) => r.tag === tag.id).length

              if (count === 0 && tag.id !== 'all') return null

              return (
                <button
                  key={tag.id}
                  type="button"
                  onClick={() => {
                    setActiveTag(tag.id)
                    setExpanded(false)
                  }}
                  className={`rounded-lg px-3.5 py-2 text-[12px] font-bold uppercase tracking-wider transition-all duration-200 ${
                    activeTag === tag.id
                      ? 'bg-brand text-white shadow-sm'
                      : 'bg-transparent text-ink hover:bg-mist hover:text-brand'
                  }`}
                >
                  {tag.label}{' '}
                  <span
                    className={`ml-1 text-[11px] ${
                      activeTag === tag.id ? 'text-white/80' : 'text-muted'
                    }`}
                  >
                    ({count})
                  </span>
                </button>
              )
            })}
          </div>
        </Reveal>

        {/* Featured Spotlight Review Card (Hero Dark Obsidian Glass) */}
        {lead && (
          <Reveal delay={120}>
            <a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group block relative overflow-hidden rounded-2xl bg-ink p-8 sm:p-12 text-white shadow-2xl border border-ink-line transition-all duration-300 hover:border-brand cursor-pointer"
              title="Click to view verified review on Google"
            >
              <div className="stripe-dark pointer-events-none absolute inset-0 opacity-25" aria-hidden="true" />
              <div className="absolute top-0 right-0 h-48 w-48 bg-brand/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 grid grid-cols-12 gap-8 items-center">
                <div className="col-span-12 lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                      <Stars rating={lead.rating} size={18} />
                      <span className="font-display text-xl text-brand">5.0 Star Experience</span>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white/80 border border-white/15">
                      <GoogleG width={14} height={14} className="text-brand" /> Verified Google Review
                    </span>
                  </div>

                  <blockquote className="font-display text-[clamp(1.4rem,2.8vw,2.2rem)] uppercase leading-[1.2] text-white tracking-wide">
                    "{lead.text}"
                  </blockquote>

                  {/* Owner Response if present */}
                  {lead.ownerReply && (
                    <div className="rounded-xl bg-white/5 border border-white/10 p-4 sm:p-5 text-[14px] text-white/80 space-y-1">
                      <div className="flex items-center gap-2 text-brand font-bold text-[12px] uppercase tracking-wider">
                        <Check width={14} height={14} /> E-Z Street Mobile Detailing (Owner Response)
                      </div>
                      <p className="italic text-white/70">"{lead.ownerReply}"</p>
                    </div>
                  )}
                </div>

                {/* Reviewer Profile Card */}
                <div className="col-span-12 lg:col-span-4 lg:border-l lg:border-white/15 lg:pl-8 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white font-display text-2xl font-bold shadow-md">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="font-display text-2xl uppercase tracking-wide text-white">
                        {lead.name}
                      </h4>
                      <p className="text-[12px] font-semibold text-brand">{lead.detail}</p>
                      <p className="text-[11px] text-white/40">{lead.time}</p>
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-brand group-hover:underline">
                      Read full verified review on Google ↗
                    </span>
                  </div>
                </div>
              </div>
            </a>
          </Reveal>
        )}

        {/* Grid of Verified Client Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleRest.map((review, i) => (
            <Reveal key={review.id} delay={(i % 3) * 75}>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col justify-between h-full rounded-xl bg-white p-6 sm:p-7 shadow-card border border-rule transition-all duration-300 hover:border-brand hover:shadow-lift hover:-translate-y-0.5 cursor-pointer"
                title={`View ${review.name}'s review on Google`}
              >
                <div>
                  {/* Top Bar: Stars + Tag Badge */}
                  <div className="flex items-center justify-between gap-2 border-b border-rule/70 pb-4">
                    <Stars rating={review.rating} size={15} />
                    <span className="rounded bg-mist px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted group-hover:text-brand transition-colors">
                      {review.tag || 'mobile detailing'}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="mt-4 text-[14px] leading-relaxed text-ink/90 line-clamp-5">
                    "{review.text}"
                  </p>

                  {/* Owner reply snippet if available */}
                  {review.ownerReply && (
                    <div className="mt-4 rounded bg-mist/70 p-2.5 text-[12px] text-muted border-l-2 border-brand">
                      <span className="block font-bold text-[10px] uppercase tracking-wider text-ink mb-0.5">
                        Mike's Response:
                      </span>
                      <span className="line-clamp-2 italic">"{review.ownerReply}"</span>
                    </div>
                  )}
                </div>

                {/* Reviewer Details Footer */}
                <div className="mt-6 pt-4 border-t border-rule/70 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white font-display text-sm font-bold group-hover:bg-brand transition-colors">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <span className="font-display text-[16px] uppercase tracking-wide text-ink block leading-none">
                        {review.name}
                      </span>
                      <span className="text-[11px] text-muted block mt-0.5">
                        {review.time || 'Verified Customer'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-brand group-hover:underline shrink-0">
                    Google ↗
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>

        {/* Load More and Google CTA Bar */}
        <Reveal delay={100} className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          {rest.length > initialCount && (
            <button
              type="button"
              onClick={() => setExpanded(!expanded)}
              className="btn-outline !py-3 !px-6 text-[13px] w-full sm:w-auto"
            >
              {expanded
                ? 'Show Less Reviews'
                : `Load More Reviews (${rest.length - initialCount} Remaining)`}
            </button>
          )}

          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-red !py-3 !px-8 text-[13px] w-full sm:w-auto"
          >
            <GoogleG width={16} height={16} /> View All 57 Google Reviews ↗
          </a>
        </Reveal>
      </div>
    </section>
  )
}
