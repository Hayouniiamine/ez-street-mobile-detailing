import { Routes, Route, Navigate } from 'react-router-dom'
import PublicSite from './pages/PublicSite'
import AdminRoot from './admin/AdminRoot'
import AdminDashboard from './admin/AdminDashboard'
import AdminPackages from './admin/AdminPackages'
import AdminGallery from './admin/AdminGallery'
import AdminTestimonials from './admin/AdminTestimonials'
import AdminBusiness from './admin/AdminBusiness'
import AdminMessages from './admin/AdminMessages'
import AdminLogin from './admin/AdminLogin'

export default function App() {
  return (
    <Routes>
      {/* Public Landing Website */}
      <Route path="/" element={<PublicSite />} />

      {/* Admin Panel Routes */}
      <Route path="/admin" element={<AdminRoot />}>
        <Route index element={<AdminDashboard />} />
        <Route path="packages" element={<AdminPackages />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="testimonials" element={<AdminTestimonials />} />
        <Route path="business" element={<AdminBusiness />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="login" element={<AdminLogin />} />
      </Route>

      {/* Fallback to homepage */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
