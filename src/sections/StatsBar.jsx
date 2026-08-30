import CountUp from '../components/CountUp'
import Reveal from '../components/Reveal'
import { useSite } from '../context/SiteData'

/** Splits "Auto · Boat · RV" so the separators pick up the red accent. */
function TextStat({ value }) {
  const parts = value.split('·')
  return (
    <span>
      {parts.map((part, i) => (
        <span key={i}>
          {i > 0 && <span className="text-brand"> · </span>}
          {part.trim()}
        </span>
      ))}
    </span>
  )
}

export default function StatsBar() {
  const { data } = useSite()

  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <div className="stripe-dark pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />

      <div className="shell relative grid grid-cols-2 gap-y-12 py-14 lg:grid-cols-4 lg:gap-y-0 lg:py-16">
        {data.stats.map((stat, i) => (
          <Reveal
            key={stat.id}
            delay={i * 90}
            className={`px-1 lg:px-10 ${i > 0 ? 'lg:border-l lg:border-ink-line' : ''} ${
              i % 2 === 1 ? 'border-l border-ink-line pl-6 lg:pl-10' : ''
            }`}
          >
            <div className="font-display leading-none tracking-wide">
              {stat.text ? (
                <span className="block text-[clamp(1.7rem,4.2vw,2.5rem)] text-white">
                  <TextStat value={stat.text} />
                </span>
              ) : (
                <span className="block text-[clamp(2.9rem,6vw,4.2rem)] text-brand">
                  <CountUp
                    value={Number(stat.value) || 0}
                    decimals={stat.decimals || 0}
                    suffix={stat.suffix || ''}
                  />
                </span>
              )}
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
              {stat.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
