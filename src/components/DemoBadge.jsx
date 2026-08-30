/** Floating credit pill — bottom-right on every route, including /admin. */
export default function DemoBadge() {
  return (
    <a
      href="https://www.aminehayouni.tech"
      target="_blank"
      rel="noopener noreferrer"
      title="Demo created by Amine Hayouni — aminehayouni.tech"
      className="fixed bottom-4 right-4 z-[100] inline-flex items-center gap-2 rounded-full border border-brand/60 bg-white px-3.5 py-[7px] text-[13px] font-medium leading-none text-ink shadow-pill transition-all duration-200 hover:border-brand hover:shadow-lift"
    >
      <span className="block h-[7px] w-[7px] shrink-0 rounded-full bg-brand" aria-hidden="true" />
      <span className="whitespace-nowrap">Demo created by Amine Hayouni</span>
    </a>
  )
}
