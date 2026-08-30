import BeforeAfter from '../components/BeforeAfter'
import Reveal from '../components/Reveal'
import { useSite } from '../context/SiteData'

export default function Gallery() {
  const { data } = useSite()
  if (data.gallery.length === 0) return null

  return (
    <section id="gallery" className="bg-white py-20 lg:py-28">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">Before &amp; After</p>
            <h2 className="mt-6 text-[clamp(2.5rem,5.2vw,4rem)] uppercase leading-[0.9] text-ink">
              See The <span className="text-brand">Transformation</span>
            </h2>
          </Reveal>
          <Reveal delay={90}>
            <p className="max-w-[34ch] border-l-2 border-brand pl-4 text-[14px] leading-relaxed text-muted">
              Real work, no filters. Drag the handle across any photo to wipe between the before and
              the after.
            </p>
          </Reveal>
        </div>

        {/* True masonry — varied heights, no uniform tiles */}
        <div className="mt-14 gap-6 sm:columns-2 lg:columns-3">
          {data.gallery.map((item, i) => (
            <Reveal key={item.id} delay={(i % 3) * 90} className="mb-8 break-inside-avoid">
              <BeforeAfter item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
