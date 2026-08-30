import Reveal from '../components/Reveal'
import Img from '../components/Img'
import { Check, ArrowRight } from '../components/Icons'
import { useBooking } from '../context/BookingContext'

const INTERIOR_FEATURES = [
  'Deep steam extraction & stubborn stain removal',
  'Leather cleaning, rejuvenation & UV conditioner treatment',
  'Crevice & seam blowout with air vent sanitization',
  'Pet hair elimination & deep odor removal',
  'Matte UV protection applied to all plastics, vinyl & dash',
  'Crystal-clear streak-free glass & screen cleaning',
]

export default function Interior() {
  const { openBooking } = useBooking()

  return (
    <section id="interior" className="bg-white py-20 lg:py-28 overflow-hidden">
      <div className="shell grid grid-cols-12 gap-x-8 gap-y-14 items-center">
        {/* Left Interior Photo */}
        <Reveal className="relative col-span-12 lg:col-span-6">
          <div
            className="pointer-events-none absolute -left-4 -top-4 hidden h-full w-full border border-brand sm:block"
            aria-hidden="true"
          />
          <Img
            src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1100&q=80"
            alt="Professional interior car detailing cleaning leather seats and dashboard"
            label="Interior Detailing"
            className="relative z-10 h-[360px] w-full object-cover sm:h-[460px] lg:h-[520px]"
          />
          <div className="absolute -bottom-5 right-4 z-20 bg-ink px-6 py-4 text-white shadow-lift sm:-right-4 border-l-4 border-brand">
            <span className="font-display text-2xl uppercase tracking-wider text-brand">
              Spotless Reset
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-white/60 mt-0.5">
              Stains · Pet Hair · Coffee Grime
            </span>
          </div>
        </Reveal>

        {/* Right Content */}
        <div className="col-span-12 lg:col-span-6 lg:pl-8">
          <Reveal>
            <p className="eyebrow">Deep Clean &amp; Sanitization</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4rem)] uppercase leading-[0.9] text-ink">
              Your Interior, <span className="text-brand">Like New</span>.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-muted">
              Whether it’s years of coffee spills, stubborn pet hair, child car seat grime, or neglected leather, we bring the deep extraction equipment to reset your vehicle's interior to showroom perfection.
            </p>
          </Reveal>

          <Reveal delay={80}>
            <ul className="mt-8 space-y-3.5 border-y border-rule py-6">
              {INTERIOR_FEATURES.map((feat) => (
                <li key={feat} className="flex items-start gap-3">
                  <Check width={18} height={18} className="mt-[2px] shrink-0 text-brand" />
                  <span className="text-[15px] font-medium text-ink/90">{feat}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140} className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => openBooking({ packageTitle: 'Interior Deep Clean & Steam' })}
              className="btn-red"
            >
              Book Interior Detail <ArrowRight width={16} height={16} />
            </button>
            <span className="text-[13px] font-medium text-muted">
              Included in Deluxe Package or available as standalone service
            </span>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
