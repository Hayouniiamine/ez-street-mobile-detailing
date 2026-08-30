import Accented from '../components/Accented'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import Stars from '../components/Stars'
import { ArrowRight, Message, Phone } from '../components/Icons'
import { bookingTarget, smsHref, telHref, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

const TRUST = ['5-Star Google Rating', 'Auto / Boat / RV', 'Fully Mobile', '100% Client Satisfaction']

export default function Hero() {
  const { business } = useSite()
  const { openBooking } = useBooking()
  const book = bookingTarget(business)

  return (
    <section id="top" className="relative overflow-hidden bg-white">
      {/* Full-bleed photo pinned to the right edge on large screens */}
      <div className="absolute inset-y-0 right-0 hidden w-[45%] lg:block xl:w-[47%]">
        <Img
          src={business.heroImage}
          alt="Freshly detailed black sports car with a mirror finish"
          label="Hero photo"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 left-0 w-[7px] bg-brand" aria-hidden="true" />

        {/* rating card straddling the seam between text and photo */}
        <div className="absolute bottom-14 left-0 hidden -translate-x-1/2 xl:block z-20">
          <a
            href="https://share.google/6YyJ3b9NE85bckQm7"
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
        <div className="pb-14 pt-12 lg:w-[55%] lg:pb-32 lg:pr-16 lg:pt-28 xl:w-[53%]">
          <Reveal>
            <p className="eyebrow">{business.heroLabel}</p>
          </Reveal>

          <Reveal delay={70}>
            <h1 className="mt-6 text-[clamp(3.35rem,9vw,6.6rem)] uppercase leading-[0.85] text-ink">
              <Accented text={business.heroHeadline} accent={business.heroAccent} />
            </h1>
          </Reveal>

          <Reveal delay={140}>
            <p className="mt-7 max-w-[48ch] text-[17px] leading-relaxed text-muted">
              {business.heroSub}
            </p>
          </Reveal>

          <Reveal delay={210}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              {book.external ? (
                <a
                  href={book.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-red"
                >
                  Book Now <ArrowRight width={17} height={17} />
                </a>
              ) : (
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="btn-red"
                >
                  Book Now <ArrowRight width={17} height={17} />
                </button>
              )}
              <a href={telHref(business)} className="btn-outline">
                <Phone width={16} height={16} /> Call Now
              </a>
              <a href={smsHref(business)} className="btn-outline">
                <Message width={16} height={16} /> Message Now
              </a>
            </div>
          </Reveal>

          {/* mobile / tablet photo */}
          <Reveal delay={120} className="relative mt-12 lg:hidden">
            <div className="absolute -left-2 top-4 bottom-4 w-[6px] bg-brand" aria-hidden="true" />
            <Img
              src={business.heroImage}
              alt="Freshly detailed black sports car with a mirror finish"
              label="Hero photo"
              className="h-[300px] w-full object-cover sm:h-[420px]"
            />
          </Reveal>

          <Reveal delay={260}>
            <ul className="mt-12 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-rule pt-6 lg:mt-16">
              {TRUST.map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-[12px] font-semibold uppercase tracking-[0.13em] text-ink"
                >
                  <span className="block h-[7px] w-[7px] rotate-45 bg-brand" aria-hidden="true" />
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
