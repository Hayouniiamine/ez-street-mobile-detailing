import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAdminAuth } from './AdminAuthContext'
import AdminLayout from './AdminLayout'
import AdminLogin from './AdminLogin'

export default function AdminRoot() {
  const { isAuthenticated } = useAdminAuth()
  const location = useLocation()

  if (location.pathname === '/admin/login') {
    return isAuthenticated ? <Navigate to="/admin" replace /> : <AdminLogin />
  }

  if (!isAuthenticated) {
    return <AdminLogin />
  }

  return <AdminLayout />
}
