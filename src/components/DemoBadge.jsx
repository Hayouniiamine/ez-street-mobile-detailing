/** Floating credit pill — bottom-right on every route, including /admin. */
export default function DemoBadge() {
  return (
    <a
      href="https://www.aminehayouni.tech"
      target="_blank"
      rel="noopener noreferrer"
      title="Demo created by Amine Hayouni — aminehayouni.tech"
      className="fixed bottom-3 right-3 sm:bottom-4 sm:right-4 z-[90] inline-flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand/60 bg-white/95 backdrop-blur-sm px-2.5 sm:px-3.5 py-1.5 sm:py-[7px] text-[11px] sm:text-[13px] font-medium leading-none text-ink shadow-pill transition-all duration-200 hover:border-brand hover:shadow-lift"
    >
      <span className="block h-[6px] w-[6px] sm:h-[7px] sm:w-[7px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
      <span className="whitespace-nowrap">Demo created by Amine Hayouni</span>
    </a>
  )
}
