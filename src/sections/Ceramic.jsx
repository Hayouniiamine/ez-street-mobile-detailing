import BookCta from '../components/BookCta'
import Img from '../components/Img'
import Reveal from '../components/Reveal'
import { Check } from '../components/Icons'
import { groupOf, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

export default function Ceramic() {
  const { data, business } = useSite()
  const { openBooking } = useBooking()
  const tiers = groupOf(data, 'ceramic')

  return (
    <section id="ceramic" className="bg-mist py-20 lg:py-28">
      <div className="shell grid grid-cols-12 gap-x-8 gap-y-14">
        <Reveal className="relative col-span-12 lg:col-span-5">
          <Img
            src={business.ceramicImage}
            alt="Water beading on a ceramic-coated dark paint finish"
            label="Ceramic coating"
            className="relative z-10 h-[340px] w-full object-cover sm:h-[460px] lg:h-[600px]"
          />
          <div
            className="pointer-events-none absolute -bottom-4 -right-4 hidden h-full w-full border border-brand sm:block"
            aria-hidden="true"
          />
        </Reveal>

        <div className="col-span-12 lg:col-span-7 lg:pl-14 xl:pl-20">
          <Reveal>
            <p className="eyebrow">Premium Ceramic Packages</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4rem)] uppercase leading-[0.9] text-ink">
              Protection that <span className="text-brand">lasts</span>.
            </h2>
            <p className="mt-6 max-w-[52ch] text-[16px] leading-relaxed text-muted">
              A full decontamination and hand-applied coating that locks in gloss, shrugs off dirt
              and makes every wash after it effortless. Every ceramic package includes:
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {data.ceramicIncludes.map((item) => (
                <li key={item} className="flex gap-3 border-b border-rule/80 pb-4">
                  <Check width={18} height={18} className="mt-[2px] shrink-0 text-brand" />
                  <span className="text-[15px] leading-snug text-ink">{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {tiers.map((tier) => (
                <article
                  key={tier.id}
                  className={`card card-hover flex flex-col p-7 ${
                    tier.popular ? 'border-t-4 border-t-ink' : ''
                  }`}
                >
                  {tier.popular && (
                    <span className="mb-3 inline-block self-start bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                      Best Value
                    </span>
                  )}
                  <h3 className="font-display text-[2rem] leading-none tracking-wide text-ink">
                    {tier.title}
                  </h3>
                  <p className="mt-4 font-display text-[2.9rem] leading-none tracking-wide text-brand">
                    {tier.price}
                  </p>
                  {tier.blurb && (
                    <p className="mt-4 flex-1 text-[14px] leading-relaxed text-muted">{tier.blurb}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => openBooking({ packageTitle: tier.title })}
                    className="mt-6 self-start border-b-2 border-brand pb-1 text-[12px] font-semibold uppercase tracking-[0.16em] text-ink transition-colors duration-200 hover:text-brand cursor-pointer"
                  >
                    {tier.cta || `Book ${tier.title} →`}
                  </button>
                </article>
              ))}
            </div>
          </Reveal>

          <Reveal delay={200}>
            <BookCta
              label="Configure Ceramic Booking"
              packageTitle="2-Year Ceramic Coating"
              className="mt-10"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
