import { createContext, useContext, useEffect, useState } from 'react'

const AUTH_KEY = 'ezstreet_admin_session'
const VALID_PASSWORDS = ['ezstreet', 'admin', 'admin123', 'detailing']

const AdminAuthContext = createContext(null)

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return window.localStorage.getItem(AUTH_KEY) === 'true'
    } catch {
      return false
    }
  })

  useEffect(() => {
    try {
      if (isAuthenticated) {
        window.localStorage.setItem(AUTH_KEY, 'true')
      } else {
        window.localStorage.removeItem(AUTH_KEY)
      }
    } catch {
      // ignore
    }
  }, [isAuthenticated])

  const login = (password) => {
    if (VALID_PASSWORDS.includes(password.trim().toLowerCase())) {
      setIsAuthenticated(true)
      return { success: true }
    }
    return { success: false, error: 'Incorrect password. Try: ezstreet' }
  }

  const logout = () => {
    setIsAuthenticated(false)
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, login, logout, defaultPassword: 'ezstreet' }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext)
  if (!ctx) throw new Error('useAdminAuth must be used inside <AdminAuthProvider>')
  return ctx
}
