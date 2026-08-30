import { ArrowRight } from './Icons'
import { bookingTarget, useSite } from '../context/SiteData'
import { useBooking } from '../context/BookingContext'

/**
 * High-converting CTA: opens the interactive multi-step booking modal
 * with the selected package pre-filled.
 */
export default function BookCta({ label, packageTitle = '', variant = 'red', className = '' }) {
  const { business } = useSite()
  const { openBooking } = useBooking()
  const book = bookingTarget(business)
  const cls = `${variant === 'red' ? 'btn-red' : 'btn-outline'} ${className}`

  if (book.external) {
    return (
      <a href={book.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {label} <ArrowRight width={16} height={16} />
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={() => openBooking({ packageTitle })}
      className={cls}
    >
      {label} <ArrowRight width={16} height={16} />
    </button>
  )
}
