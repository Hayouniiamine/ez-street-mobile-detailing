import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import Logo from '../components/Logo'
import {
  Grid,
  Layers,
  Images,
  QuoteIcon,
  Building,
  Inbox,
  LogOut,
  Menu,
  Close,
  ArrowRight,
} from '../components/Icons'
import { useSite } from '../context/SiteData'
import { useAdminAuth } from './AdminAuthContext'

const NAV_ITEMS = [
  { path: '/admin', label: 'Dashboard', icon: Grid, end: true },
  { path: '/admin/packages', label: 'Services & Packages', icon: Layers },
  { path: '/admin/gallery', label: 'Before & After Gallery', icon: Images },
  { path: '/admin/testimonials', label: 'Testimonials', icon: QuoteIcon },
  { path: '/admin/business', label: 'Business Info', icon: Building },
  { path: '/admin/messages', label: 'Messages / Quotes', icon: Inbox, isInbox: true },
]

export default function AdminLayout() {
  const { data, storageError } = useSite()
  const { logout } = useAdminAuth()
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const navigate = useNavigate()

  const newMessagesCount = data.messages?.filter((m) => m.status === 'new').length || 0

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="flex min-h-screen bg-white font-sans text-ink selection:bg-brand selection:text-white">
      {/* Desktop Sidebar (Black #0d0d0d) */}
      <aside className="hidden w-72 shrink-0 flex-col justify-between border-r border-ink-line bg-ink text-white lg:flex">
        <div>
          {/* Logo header */}
          <div className="border-b border-ink-line p-6">
            <Link to="/admin" className="block">
              <Logo tone="light" />
            </Link>
            <div className="mt-3 flex items-center justify-between">
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand">
                Management Panel
              </span>
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" title="Live Sync Active" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4 space-y-1.5" aria-label="Admin Sidebar">
            {NAV_ITEMS.map(({ path, label, icon: Icon, end, isInbox }) => (
              <NavLink
                key={path}
                to={path}
                end={end}
                className={({ isActive }) =>
                  `group flex items-center justify-between px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                    isActive
                      ? 'bg-brand text-white shadow-[0_4px_14px_rgba(209,0,0,0.35)]'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center gap-3">
                      <Icon
                        width={18}
                        height={18}
                        className={isActive ? 'text-white' : 'text-white/50 group-hover:text-brand'}
                      />
                      <span>{label}</span>
                    </div>
                    {isInbox && newMessagesCount > 0 && (
                      <span
                        className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                          isActive ? 'bg-white text-brand' : 'bg-brand text-white'
                        }`}
                      >
                        {newMessagesCount}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-ink-line p-4 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/70 transition-colors hover:bg-white/5 hover:text-brand"
          >
            <span>View Public Site</span>
            <ArrowRight width={14} height={14} />
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/50 transition-colors hover:bg-red-950/30 hover:text-red-400"
          >
            <LogOut width={16} height={16} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Drawer */}
      {mobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileNavOpen(false)}
          />
          <div className="relative flex w-4/5 max-w-xs flex-1 flex-col justify-between bg-ink p-6 text-white shadow-2xl">
            <div>
              <div className="flex items-center justify-between border-b border-ink-line pb-4">
                <Logo tone="light" />
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(false)}
                  className="text-white/70 hover:text-white"
                >
                  <Close width={22} height={22} />
                </button>
              </div>

              <nav className="mt-6 space-y-2">
                {NAV_ITEMS.map(({ path, label, icon: Icon, end, isInbox }) => (
                  <NavLink
                    key={path}
                    to={path}
                    end={end}
                    onClick={() => setMobileNavOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-4 py-3 text-[13px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${
                        isActive ? 'bg-brand text-white' : 'text-white/70 hover:bg-white/5'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon width={18} height={18} />
                      <span>{label}</span>
                    </div>
                    {isInbox && newMessagesCount > 0 && (
                      <span className="rounded-full bg-brand px-2 py-0.5 text-[10px] font-bold text-white">
                        {newMessagesCount}
                      </span>
                    )}
                  </NavLink>
                ))}
              </nav>
            </div>

            <div className="border-t border-ink-line pt-4 space-y-2">
              <Link
                to="/"
                onClick={() => setMobileNavOpen(false)}
                className="flex items-center justify-between py-2 text-[12px] font-semibold uppercase tracking-wider text-white/70"
              >
                <span>View Public Site</span>
                <ArrowRight width={14} height={14} />
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false)
                  handleLogout()
                }}
                className="flex w-full items-center gap-2 py-2 text-[12px] font-semibold uppercase tracking-wider text-red-400"
              >
                <LogOut width={16} height={16} />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area (White Background) */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-rule bg-white px-4 sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center text-ink lg:hidden"
              aria-label="Open Admin Menu"
            >
              <Menu width={24} height={24} />
            </button>
            <div className="hidden sm:block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted">
                Admin Console
              </span>
              <h2 className="font-display text-xl leading-none uppercase tracking-wide text-ink">
                E-Z Street <span className="text-brand">Live Manager</span>
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {storageError && (
              <div className="hidden md:block text-[11px] font-semibold text-amber-600">
                ⚠️ {storageError}
              </div>
            )}
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline !py-2 !px-4 !text-[11px] tracking-wider"
            >
              Live Website ↗
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 bg-[#fafafa] p-4 sm:p-8 lg:p-10">
          <div className="mx-auto max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}
