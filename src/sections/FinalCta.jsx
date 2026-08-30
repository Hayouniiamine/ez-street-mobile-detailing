import Reveal from '../components/Reveal'
import { ArrowRight, Phone } from '../components/Icons'
import { telHref, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

export default function FinalCta() {
  const { business } = useSite()
  const { openBooking } = useBooking()

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white lg:py-32">
      <span
        className="outline-text pointer-events-none absolute -right-10 top-1/2 hidden -translate-y-1/2 select-none font-display text-[20rem] leading-none lg:block"
        aria-hidden="true"
      >
        E-Z
      </span>
      <div className="stripe-dark pointer-events-none absolute inset-x-0 bottom-0 h-40 opacity-50" aria-hidden="true" />

      <div className="shell relative grid grid-cols-12 items-end gap-x-8 gap-y-10">
        <Reveal className="col-span-12 lg:col-span-7">
          <h2 className="text-[clamp(2.8rem,6.5vw,5rem)] uppercase leading-[0.88]">
            The Choice Is <span className="text-brand">E-Z</span>
          </h2>
          <p className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-white/60">
            Let E-Z Street help you preserve the value of your investment and bring that showroom
            shine back to your pride and joy. All while you wait from the comfort of your home or office.
          </p>
        </Reveal>

        <Reveal delay={110} className="col-span-12 lg:col-span-5 lg:pb-2 lg:text-right">
          <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3">
            <button
              type="button"
              onClick={() => openBooking()}
              className="btn-red !px-8 !py-[18px] !text-[13px] w-full sm:w-auto"
            >
              Book Mobile Detail Online <ArrowRight width={17} height={17} />
            </button>
            <a
              href={telHref(business)}
              className="btn-outline-light !px-6 !py-[14px] !text-[12px] w-full sm:w-auto"
            >
              <Phone width={15} height={15} /> Call {business.phone}
            </a>
          </div>
          <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-white/35">
            Auto · Boat · RV — we come to you
          </p>
        </Reveal>
      </div>
    </section>
  )
}
