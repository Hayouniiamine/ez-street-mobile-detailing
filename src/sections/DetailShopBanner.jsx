import Reveal from '../components/Reveal'
import { ArrowRight, Phone, Check } from '../components/Icons'
import { telHref, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

export default function DetailShopBanner() {
  const { business } = useSite()
  const { openBooking } = useBooking()

  return (
    <section className="relative overflow-hidden bg-ink py-16 lg:py-20 text-white border-y border-ink-line">
      <div className="stripe-dark pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />

      <div className="shell relative grid grid-cols-12 items-center gap-x-8 gap-y-8">
        <Reveal className="col-span-12 lg:col-span-8">
          <div className="flex items-center gap-2 text-brand">
            <span className="block h-2 w-2 rounded-full bg-brand" />
            <span className="text-[11px] font-bold uppercase tracking-[0.24em]">
              Fully Self-Contained Mobile Unit
            </span>
          </div>

          <h2 className="mt-3 text-[clamp(2.2rem,4.8vw,3.6rem)] uppercase leading-[0.92] text-white">
            We Bring The Detail Shop <span className="text-brand">To Your Door</span>.
          </h2>

          <p className="mt-4 max-w-[58ch] text-[16px] leading-relaxed text-white/70">
            No waiting in shop lobbies or arranging rides. We carry our own spot-free water, power, high-pressure steam, and professional coatings right to your driveway, workplace, or marina.
          </p>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold uppercase tracking-wider text-white/60">
            <span className="flex items-center gap-1.5">
              <Check width={14} height={14} className="text-brand" /> On-Board Water &amp; Power
            </span>
            <span className="flex items-center gap-1.5">
              <Check width={14} height={14} className="text-brand" /> Auto · Boat · RV Specialists
            </span>
            <span className="flex items-center gap-1.5">
              <Check width={14} height={14} className="text-brand" /> 50-Mile Radius Coverage
            </span>
          </div>
        </Reveal>

        <Reveal delay={100} className="col-span-12 lg:col-span-4 lg:text-right">
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3.5">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-red w-full sm:w-auto"
            >
              Book Mobile Appointment <ArrowRight width={16} height={16} />
            </button>
            <a
              href={telHref(business)}
              className="btn-outline-light w-full sm:w-auto"
            >
              <Phone width={15} height={15} /> Call {business.phone}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
