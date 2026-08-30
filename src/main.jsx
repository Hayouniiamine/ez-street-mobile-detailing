import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import DemoBadge from './components/DemoBadge'
import BookingModal from './components/BookingModal'
import { SiteDataProvider } from './context/SiteData'
import { AdminAuthProvider } from './admin/AdminAuthContext'
import { BookingProvider } from './context/BookingContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SiteDataProvider>
      <AdminAuthProvider>
        <BookingProvider>
          <BrowserRouter>
            <App />
            <BookingModal />
            <DemoBadge />
          </BrowserRouter>
        </BookingProvider>
      </AdminAuthProvider>
    </SiteDataProvider>
  </React.StrictMode>,
)
