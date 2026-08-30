/** Renders `text` with the first occurrence of `accent` coloured red. */
export default function Accented({ text = '', accent = '', className = 'text-brand' }) {
  if (!accent) return <>{text}</>
  const i = text.toLowerCase().indexOf(accent.toLowerCase())
  if (i === -1) return <>{text}</>
  return (
    <>
      {text.slice(0, i)}
      <span className={className}>{text.slice(i, i + accent.length)}</span>
      {text.slice(i + accent.length)}
    </>
  )
}
