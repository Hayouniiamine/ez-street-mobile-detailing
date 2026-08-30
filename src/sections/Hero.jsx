import Accented from '../components/Accented'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'
import { ArrowRight, Message, Phone } from '../components/Icons'
import { bookingTarget, smsHref, telHref, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

const GOOGLE_REVIEWS_URL = 'https://share.google/6YyJ3b9NE85bckQm7'
const TRUST = ['5-Star Google Rating', 'Auto / Boat / RV', 'Fully Mobile', '100% Satisfaction']

export default function Hero() {
  const { business } = useSite()
  const { openBooking } = useBooking()
  const book = bookingTarget(business)

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Full-bleed photo pinned to the right edge on desktop */}
      <div className="absolute inset-y-0 right-0 hidden w-[45%] lg:block xl:w-[47%]">
        <Img
          src={business.heroImage}
          alt="Freshly detailed black sports car with a mirror finish"
          label="Hero photo"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-[7px] bg-brand" aria-hidden="true" />

        {/* desktop floating rating card */}
        <div className="absolute bottom-14 left-0 hidden -translate-x-1/2 xl:block z-20">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group block w-[236px] border-l-4 border-brand bg-white px-6 py-5 shadow-lift transition-all duration-200 hover:shadow-2xl hover:scale-[1.02] cursor-pointer"
            title="View 57 Google Reviews"
          >
            <Stars rating={5} size={15} />
            <p className="mt-3 font-display text-3xl leading-none tracking-wide text-ink group-hover:text-brand transition-colors">
              5.0 <span className="font-sans text-[13px] font-semibold tracking-normal text-muted">on Google ↗</span>
            </p>
            <p className="mt-2 text-[13px] leading-snug text-muted">
              57 reviews · 100% satisfaction.
            </p>
          </a>
        </div>
      </div>

      <div className="shell relative">
        <div className="pb-12 pt-6 sm:pb-14 sm:pt-10 lg:w-[55%] lg:pb-32 lg:pr-16 lg:pt-28 xl:w-[53%]">
          {/* Eyebrow */}
          <Reveal>
            <p className="eyebrow">{business.heroLabel}</p>
          </Reveal>

          {/* Main Display Headline */}
          <Reveal delay={70}>
            <h1 className="mt-3 sm:mt-6 text-[clamp(3.1rem,9.8vw,6.4rem)] uppercase leading-[0.86] text-ink font-display">
              <Accented text={business.heroHeadline} accent={business.heroAccent} />
            </h1>
          </Reveal>

          {/* Subtitle */}
          <Reveal delay={140}>
            <p className="mt-4 sm:mt-6 max-w-[48ch] text-[15px] sm:text-[17px] leading-relaxed text-muted">
              {business.heroSub}
            </p>
          </Reveal>

          {/* Mobile Hero Photo with Desktop-style Overlaid Rating Card */}
          <Reveal delay={110} className="relative mt-6 lg:hidden">
            <div className="relative overflow-hidden rounded-lg shadow-card border border-rule">
              <Img
                src={business.heroImage}
                alt="Freshly detailed black sports car with a mirror finish"
                label="Hero photo"
                className="h-[240px] sm:h-[360px] w-full object-cover"
              />
              <div className="absolute inset-y-0 left-0 w-[5px] bg-brand" aria-hidden="true" />

              {/* Floating Rating Card on Mobile (Matches Desktop Card Aesthetics) */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20">
                <a
                  href={GOOGLE_REVIEWS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block border-l-4 border-brand bg-white/95 backdrop-blur-md px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-lift transition-all hover:bg-white cursor-pointer"
                  title="View 57 Google Reviews"
                >
                  <Stars rating={5} size={13} />
                  <p className="mt-1 font-display text-xl sm:text-2xl leading-none tracking-wide text-ink group-hover:text-brand transition-colors">
                    5.0 <span className="font-sans text-[11px] sm:text-[12px] font-semibold text-muted">on Google ↗</span>
                  </p>
                  <p className="text-[11px] text-muted mt-0.5">
                    57 reviews · 100% satisfaction
                  </p>
                </a>
              </div>
            </div>
          </Reveal>

          {/* Action Buttons Cluster */}
          <Reveal delay={180}>
            <div className="mt-6 sm:mt-8 space-y-2.5">
              {/* Primary Book CTA */}
              {book.external ? (
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red w-full !py-3.5 !text-[13px] tracking-wider"
                >
                  Book Now <ArrowRight width={17} height={17} />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn-red w-full !py-3.5 !text-[13px] tracking-wider"
                >
                  Book Now <ArrowRight width={17} height={17} />
                </button>
              )}

              {/* Secondary Call and SMS Buttons side-by-side */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={telHref(business)}
                  className="btn-outline !py-3 !px-2 !text-[11px] sm:!text-[12px] w-full text-center truncate"
                >
                  <Phone width={15} height={15} /> Call Now
                </a>
                <a
                  href={smsHref(business)}
                  className="btn-outline !py-3 !px-2 !text-[11px] sm:!text-[12px] w-full text-center truncate"
                >
                  <Message width={15} height={15} /> Message Now
                </a>
              </div>
            </div>
          </Reveal>

          {/* Trust Row (Responsive 2x2 on Mobile, Inline on Larger Screens) */}
          <Reveal delay={240}>
            <div className="mt-7 sm:mt-10 border-t border-rule pt-4 sm:pt-6">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-2 sm:flex sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3">
                {TRUST.map((t) => (
                  <li
                    key={t}
                    className="flex items-center gap-2 text-[11px] sm:text-[12px] font-semibold uppercase tracking-[0.11em] text-ink"
                  >
                    <span className="block h-[5px] w-[5px] sm:h-[6px] sm:w-[6px] rotate-45 bg-brand shrink-0" aria-hidden="true" />
                    <span className="truncate">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
