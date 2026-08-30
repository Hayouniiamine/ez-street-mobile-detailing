import BookCta from '../components/BookCta'
import Reveal from '../components/Reveal'
import { Check } from '../components/Icons'
import { groupOf, useSite } from '../context/SiteData'

function FeatureRow({ text, highlight = false }) {
  if (highlight) {
    return (
      <li className="mb-1 flex items-center gap-3 bg-mist px-4 py-3 sm:col-span-2">
        <Check width={17} height={17} className="shrink-0 text-brand" />
        <span className="text-[15px] font-semibold text-ink">{text}</span>
      </li>
    )
  }
  return (
    <li className="flex gap-3">
      <Check width={17} height={17} className="mt-[3px] shrink-0 text-brand" />
      <span className="text-[15px] leading-snug text-ink/85">{text}</span>
    </li>
  )
}

export default function Packages() {
  const { data } = useSite()
  const [classic, deluxe] = groupOf(data, 'signature')

  return (
    <section id="services" className="bg-mist py-20 lg:py-28">
      <div className="shell">
        <div className="grid grid-cols-12 items-end gap-x-8 gap-y-6">
          <Reveal className="col-span-12 lg:col-span-7">
            <p className="eyebrow">Our Packages</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4rem)] uppercase leading-[0.9] text-ink">
              Pick your <span className="text-brand">level</span>.
            </h2>
          </Reveal>
          <Reveal delay={90} className="col-span-12 lg:col-span-5">
            <p className="text-[16px] leading-relaxed text-muted lg:pb-2">
              Both packages are performed on-site at your home or office. Pricing is a starting
              point — size, condition and vehicle type can change the final quote.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-12 items-start gap-8">
          {/* --- Classic: the smaller, quieter card --- */}
          {classic && (
            <Reveal className="col-span-12 lg:col-span-5">
              <article className="card card-hover flex h-full flex-col p-8 lg:p-10">
                <p className="eyebrow-plain">Package 01</p>
                <h3 className="mt-4 font-display text-[2.6rem] leading-none tracking-wide text-ink">
                  {classic.title}
                </h3>
                {classic.blurb && (
                  <p className="mt-4 text-[15px] leading-relaxed text-muted">{classic.blurb}</p>
                )}

                <div className="mt-7 flex items-end gap-3 border-y border-rule py-5">
                  <span className="font-display text-[3.6rem] font-bold leading-[0.85] tracking-wide text-brand">
                    {classic.price}
                  </span>
                  <span className="pb-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
                    starting at
                  </span>
                </div>

                <ul className="mt-7 flex-1 space-y-3.5">
                  {classic.features.map((f) => (
                    <FeatureRow key={f} text={f} />
                  ))}
                </ul>

                <BookCta
                  label={classic.cta || `Book ${classic.title}`}
                  packageTitle={classic.title}
                  variant="outline"
                  className="mt-9 w-full"
                />
              </article>
            </Reveal>
          )}

          {/* --- Deluxe: wider, lifted, black header --- */}
          {deluxe && (
            <Reveal delay={110} className="relative col-span-12 lg:col-span-7 lg:-mt-10">
              {deluxe.popular && (
                <span className="absolute -top-4 right-6 z-10 bg-brand px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white shadow-[0_6px_18px_rgba(209,0,0,0.35)] sm:right-10">
                  Most Popular
                </span>
              )}
              <article className="card card-hover h-full !shadow-lift">
                <div className="bg-ink px-8 pb-8 pt-10 lg:px-10">
                  <p className="eyebrow-plain">Package 02</p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                    <h3 className="font-display text-[3.2rem] leading-none tracking-wide text-white">
                      {deluxe.title}
                    </h3>
                    <span className="font-display text-[4rem] leading-[0.8] tracking-wide text-brand">
                      {deluxe.price}
                    </span>
                  </div>
                  {deluxe.blurb && (
                    <p className="mt-5 max-w-[46ch] text-[15px] leading-relaxed text-white/55">
                      {deluxe.blurb}
                    </p>
                  )}
                </div>

                <div className="p-8 lg:p-10">
                  <ul className="grid gap-x-10 gap-y-3.5 sm:grid-cols-2">
                    {deluxe.features.map((f, i) => (
                      <FeatureRow key={f} text={f} highlight={i === 0} />
                    ))}
                  </ul>
                  <BookCta
                    label={deluxe.cta || `Book ${deluxe.title}`}
                    packageTitle={deluxe.title}
                    className="mt-9 w-full"
                  />
                </div>
              </article>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}
