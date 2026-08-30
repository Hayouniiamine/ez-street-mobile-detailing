import { Star } from './Icons'

export default function Stars({ rating = 5, size = 16, className = '' }) {
  const rounded = Math.round(rating)
  return (
    <span
      className={`inline-flex items-center gap-[3px] text-brand ${className}`}
      aria-label={`${rating} out of 5 stars`}
      role="img"
    >
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          width={size}
          height={size}
          filled={i <= rounded}
          className={i <= rounded ? '' : 'text-rule'}
        />
      ))}
    </span>
  )
}
