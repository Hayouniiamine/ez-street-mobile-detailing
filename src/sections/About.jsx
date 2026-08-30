import Img from '../components/Img'
import Reveal from '../components/Reveal'
import { useSite } from '../context/SiteData'

const FACTS = [
  ['01', 'We come to you'],
  ['02', 'Auto · Boat · RV'],
  ['03', 'Competitive pricing'],
]

/** Keeps the mission statement verbatim, just sets the opening sentence larger. */
function splitMission(text) {
  const end = text.indexOf('. ')
  if (end === -1) return [text, '']
  return [text.slice(0, end + 1), text.slice(end + 2)]
}

export default function About() {
  const { business, data } = useSite()
  const [lead, rest] = splitMission(business.mission || '')
  const years = data.stats.find((s) => s.id === 'st_years')

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="shell grid grid-cols-12 gap-x-8 gap-y-14">
        <Reveal className="relative col-span-12 lg:col-span-5">
          <div
            className="pointer-events-none absolute -left-4 -top-4 hidden h-full w-full border border-brand sm:block"
            aria-hidden="true"
          />
          <Img
            src={business.aboutImage}
            alt="Detailer working on a vehicle at a client's home"
            label="About photo"
            className="relative h-[380px] w-full object-cover sm:h-[480px] lg:h-[560px]"
          />
          {years && (
            <div className="absolute -bottom-6 right-4 bg-ink px-6 py-5 text-white shadow-lift sm:-right-6">
              <span className="font-display text-[2.6rem] leading-none text-brand">
                {years.value}
                {years.suffix}
              </span>
              <span className="mt-1 block text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Years in the trade
              </span>
            </div>
          )}
        </Reveal>

        <div className="col-span-12 lg:col-span-7 lg:pl-14 xl:pl-20">
          <Reveal>
            <p className="eyebrow">About Us</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4rem)] uppercase leading-[0.9] text-ink">
              Detailing that comes <span className="text-brand">to you</span>.
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-8 border-l-2 border-brand pl-5 text-[19px] font-medium leading-relaxed text-ink">
              {lead}
            </p>
            {rest && <p className="mt-5 text-[16px] leading-[1.75] text-muted">{rest}</p>}
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-10 flex flex-wrap items-end justify-between gap-8 border-t border-rule pt-8">
              <div>
                <p className="font-display text-[2.4rem] leading-none tracking-wide text-ink">
                  The Choice Is <span className="text-brand">E-Z</span>
                </p>
                <p className="mt-2 text-[13px] uppercase tracking-[0.2em] text-muted">
                  — {business.name}
                </p>
              </div>

              <ul className="flex flex-wrap gap-x-10 gap-y-4">
                {FACTS.map(([n, label]) => (
                  <li key={n}>
                    <span className="block font-alt text-[12px] font-semibold text-brand">{n}</span>
                    <span className="mt-1 block text-[14px] font-semibold text-ink">{label}</span>
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
