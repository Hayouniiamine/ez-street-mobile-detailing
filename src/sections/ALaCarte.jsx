import Reveal from '../components/Reveal'
import { groupOf, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

export default function ALaCarte() {
  const { data } = useSite()
  const { openBooking } = useBooking()
  const items = groupOf(data, 'alacarte')
  if (items.length === 0) return null

  return (
    <section id="addons" className="bg-white py-16 lg:py-24">
      <div className="shell grid grid-cols-12 gap-x-8 gap-y-9">
        <Reveal className="col-span-12 lg:col-span-4 xl:col-span-3">
          <p className="eyebrow">Add-Ons</p>
          <h2 className="mt-5 text-[clamp(2rem,4vw,2.7rem)] uppercase leading-[0.92] text-ink">
            A la carte <span className="text-brand">services</span>
          </h2>
          <p className="mt-4 max-w-[34ch] text-[15px] leading-relaxed text-muted">
            Add any of these to a package, or book one on its own. Tap any service to configure your mobile appointment.
          </p>
        </Reveal>

        <div className="col-span-12 lg:col-span-8 xl:col-span-9">
          <ul className="flex flex-wrap gap-3 lg:pt-3">
            {items.map((item, i) => (
              <Reveal as="li" key={item.id} delay={i * 55}>
                <button
                  type="button"
                  onClick={() => openBooking({ packageTitle: item.title })}
                  className={`group inline-flex items-center gap-3 rounded-full border-2 border-ink text-left transition-all duration-200 hover:border-brand hover:shadow-md cursor-pointer ${
                    i % 3 === 0 ? 'px-6 py-3' : 'px-5 py-2.5'
                  }`}
                >
                  <span className="text-[15px] font-semibold text-ink transition-colors duration-200 group-hover:text-brand">
                    {item.title}
                  </span>
                  <span className="h-4 w-px bg-rule transition-colors duration-200 group-hover:bg-brand/40" />
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted transition-colors duration-200 group-hover:text-brand">
                    {item.price || 'Customize →'}
                  </span>
                </button>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
