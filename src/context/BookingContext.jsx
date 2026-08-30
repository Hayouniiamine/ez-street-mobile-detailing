import { createContext, useCallback, useContext, useState } from 'react'

const BookingContext = createContext(null)

export function BookingProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [initialData, setInitialData] = useState({})

  const openBooking = useCallback((params = {}) => {
    setInitialData(params)
    setIsOpen(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeBooking = useCallback(() => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }, [])

  return (
    <BookingContext.Provider value={{ isOpen, openBooking, closeBooking, initialData }}>
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside <BookingProvider>')
  return ctx
}
