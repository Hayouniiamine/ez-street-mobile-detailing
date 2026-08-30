export const QUOTE_EVENT = 'ez:quote-request'

/**
 * Sends the visitor to the quote form with the package they clicked pre-filled.
 * Used by every "Book <package>" control so no CTA is a dead end.
 */
export function requestQuote(packageTitle = '') {
  window.dispatchEvent(new CustomEvent(QUOTE_EVENT, { detail: { package: packageTitle } }))
  const target = document.getElementById('quote')
  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  else window.location.hash = '#quote'
}
