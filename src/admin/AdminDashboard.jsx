import { Link, useNavigate } from 'react-router-dom'
import {
  Layers,
  Images,
  QuoteIcon,
  Inbox,
  Plus,
  ArrowRight,
  Phone,
  Message,
  Check,
} from '../components/Icons'
import { telHref, useSite } from '../context/SiteData'
import Stars from '../components/Stars'

export default function AdminDashboard() {
  const { data, business, setMessageStatus } = useSite()
  const navigate = useNavigate()

  const totalPackages = data.packages?.length || 0
  const totalGallery = data.gallery?.length || 0
  const totalReviews = data.testimonials?.length || 0
  const totalMessages = data.messages?.length || 0
  const newMessages = data.messages?.filter((m) => m.status === 'new') || []
  const recentMessages = data.messages?.slice(0, 5) || []

  return (
    <div className="space-y-8">
      {/* Header with Quick Actions */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
            Overview
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
            Business <span className="text-brand">Dashboard</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Manage your service menu, pricing, gallery transformations, and incoming customer leads.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => navigate('/admin/packages?new=true')}
            className="btn-red !px-4 !py-2.5 !text-[12px]"
          >
            <Plus width={15} height={15} /> Add Service
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/gallery?new=true')}
            className="btn-outline !px-4 !py-2.5 !text-[12px]"
          >
            <Plus width={15} height={15} /> Add Photo
          </button>
        </div>
      </div>

      {/* Metric Stat Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1 */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Total Services
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink">
              <Layers width={18} height={18} />
            </span>
          </div>
          <p className="mt-4 font-display text-4xl font-bold tracking-wide text-ink">
            {totalPackages}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 text-[12px]">
            <span className="text-muted">Classic, Deluxe, Ceramic, Add-ons</span>
            <Link
              to="/admin/packages"
              className="font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Manage →
            </Link>
          </div>
        </div>

        {/* Card 2 */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Gallery Photos
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink">
              <Images width={18} height={18} />
            </span>
          </div>
          <p className="mt-4 font-display text-4xl font-bold tracking-wide text-ink">
            {totalGallery}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 text-[12px]">
            <span className="text-muted">Before/after comparisons</span>
            <Link
              to="/admin/gallery"
              className="font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Edit →
            </Link>
          </div>
        </div>

        {/* Card 3 */}
        <div className="card p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
              Client Reviews
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-mist text-ink">
              <QuoteIcon width={18} height={18} />
            </span>
          </div>
          <p className="mt-4 font-display text-4xl font-bold tracking-wide text-ink">
            {totalReviews}
          </p>
          <div className="mt-3 flex items-center justify-between border-t border-rule pt-3 text-[12px]">
            <span className="text-muted">5.0 Star Google Rating</span>
            <Link
              to="/admin/testimonials"
              className="font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              View →
            </Link>
          </div>
        </div>

        {/* Card 4 - Quotes */}
        <div className="card border-brand/40 bg-gradient-to-br from-white to-red-50/40 p-6">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
              New Quote Leads
            </span>
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white">
              <Inbox width={18} height={18} />
            </span>
          </div>
          <div className="mt-4 flex items-baseline gap-2">
            <span className="font-display text-4xl font-bold tracking-wide text-brand">
              {newMessages.length}
            </span>
            <span className="text-[13px] text-muted">/ {totalMessages} total</span>
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-brand/20 pt-3 text-[12px]">
            <span className="text-muted">{newMessages.length > 0 ? 'Action needed' : 'All caught up'}</span>
            <Link
              to="/admin/messages"
              className="font-semibold text-brand transition-colors hover:text-brand-dark"
            >
              Inbox →
            </Link>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Recent Inquiries & Live Site Summary */}
      <div className="grid grid-cols-12 gap-8">
        {/* Recent Quotes */}
        <div className="col-span-12 lg:col-span-8">
          <div className="card p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-rule pb-5">
              <div>
                <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
                  Recent <span className="text-brand">Quote Requests</span>
                </h2>
                <p className="text-[13px] text-muted">
                  Submissions directly from the website quote form.
                </p>
              </div>
              <Link
                to="/admin/messages"
                className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand hover:underline"
              >
                View All ({totalMessages})
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <div className="py-12 text-center">
                <Inbox width={36} height={36} className="mx-auto text-muted/40" />
                <p className="mt-3 text-[14px] font-medium text-ink">No quote requests yet</p>
                <p className="mt-1 text-[13px] text-muted">
                  Test the public form at the bottom of the homepage to see submissions here!
                </p>
                <Link to="/#quote" target="_blank" className="btn-outline mt-5 !py-2 !px-4 !text-[11px]">
                  Open Public Quote Form
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-rule">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex flex-col justify-between gap-4 py-4 sm:flex-row sm:items-center"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-ink">{msg.name}</span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            msg.status === 'new'
                              ? 'bg-brand text-white'
                              : msg.status === 'contacted'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          {msg.status}
                        </span>
                      </div>
                      <p className="mt-1 text-[13px] text-muted">
                        <span className="font-medium text-ink/80">{msg.vehicle || 'Vehicle'}</span> ·{' '}
                        {msg.package || 'General Inquiry'} · {msg.location || 'Hudson Valley'}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <a
                        href={`tel:${(msg.phone || '').replace(/\D/g, '')}`}
                        className="inline-flex h-8 items-center gap-1.5 rounded border border-rule px-2.5 text-[12px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                        title="Call Client"
                      >
                        <Phone width={13} height={13} className="text-brand" />
                        <span className="hidden sm:inline">{msg.phone}</span>
                      </a>
                      {msg.status === 'new' ? (
                        <button
                          type="button"
                          onClick={() => setMessageStatus(msg.id, 'contacted')}
                          className="inline-flex h-8 items-center gap-1 rounded bg-brand px-2.5 text-[11px] font-semibold uppercase tracking-wider text-white hover:bg-brand-dark"
                        >
                          <Check width={13} height={13} /> Mark Done
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setMessageStatus(msg.id, 'new')}
                          className="inline-flex h-8 items-center rounded border border-rule px-2 text-[11px] text-muted hover:text-ink"
                        >
                          Reopen
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Live Business Summary Info */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="card p-6">
            <h3 className="font-display text-xl uppercase tracking-wide text-ink">
              Business <span className="text-brand">Info</span>
            </h3>
            <ul className="mt-5 space-y-3.5 text-[13px]">
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="text-muted">Phone:</span>
                <span className="font-semibold text-ink">{business.phone}</span>
              </li>
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="text-muted">Tagline:</span>
                <span className="font-semibold text-ink">{business.tagline}</span>
              </li>
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="text-muted">Area:</span>
                <span className="font-medium text-ink text-right max-w-[180px] truncate">{business.serviceArea}</span>
              </li>
              <li className="flex justify-between border-b border-rule pb-2">
                <span className="text-muted">Booking CTA:</span>
                <span className="font-medium text-ink">
                  {business.bookingUrl ? 'External URL' : 'Built-in Quote Form'}
                </span>
              </li>
            </ul>
            <Link
              to="/admin/business"
              className="btn-outline mt-5 w-full !py-2.5 !text-[11px] tracking-wider"
            >
              Edit Business Info
            </Link>
          </div>

          <div className="card bg-ink p-6 text-white">
            <div className="flex items-center gap-2">
              <span className="block h-2 w-2 rounded-full bg-brand" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand">
                Live Preview Note
              </p>
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-white/70">
              All edits made in this panel save directly to your browser's localStorage and update the public website in real-time.
            </p>
            <div className="mt-4 border-t border-ink-line pt-4 flex items-center justify-between text-[11px] text-white/40">
              <span>Sync Status: Realtime</span>
              <Link to="/" target="_blank" className="text-brand hover:underline font-semibold">
                Open Public Site ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
