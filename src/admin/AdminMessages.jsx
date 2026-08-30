import { useState } from 'react'
import { Phone, Message, Trash, Inbox } from '../components/Icons'
import { useSite } from '../context/SiteData'

export default function AdminMessages() {
  const { data, setMessageStatus, deleteMessage } = useSite()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  const messages = data.messages || []

  const filtered = messages.filter((m) => {
    if (filter === 'new' && m.status !== 'new') return false
    if (filter === 'contacted' && m.status !== 'contacted') return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const match =
        m.name?.toLowerCase().includes(q) ||
        m.phone?.toLowerCase().includes(q) ||
        m.email?.toLowerCase().includes(q) ||
        m.vehicle?.toLowerCase().includes(q) ||
        m.package?.toLowerCase().includes(q) ||
        m.location?.toLowerCase().includes(q) ||
        m.refNumber?.toLowerCase().includes(q) ||
        m.notes?.toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
            Lead &amp; Appointment Inbox
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
            Quote &amp; <span className="text-brand">Bookings</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Incoming customer reservations from the booking wizard and quick quote form.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded bg-brand px-3 py-1 text-[12px] font-bold text-white shadow-sm">
            {messages.filter((m) => m.status === 'new').length} New Action Leads
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All Inquiries (${messages.length})` },
              { id: 'new', label: `New / Pending (${messages.filter((m) => m.status === 'new').length})` },
              { id: 'contacted', label: `Confirmed / Contacted (${messages.filter((m) => m.status === 'contacted').length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilter(tab.id)}
                className={`px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                  filter === tab.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-mist text-muted hover:bg-zinc-200 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-72">
            <input
              type="search"
              className="field !py-2 !text-[13px]"
              placeholder="Search ref #, name, car, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Table / Cards List */}
      {filtered.length === 0 ? (
        <div className="card p-12 text-center">
          <Inbox width={44} height={44} className="mx-auto text-muted/30" />
          <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">
            No Bookings Found
          </h3>
          <p className="mt-2 text-[14px] text-muted">
            {search ? 'Try adjusting your search terms.' : 'Bookings submitted through the new interactive booking wizard will populate here!'}
          </p>
        </div>
      ) : (
        <div className="card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[14px]">
              <thead className="border-b border-rule bg-mist font-alt text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">
                <tr>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Client &amp; Ref</th>
                  <th className="px-6 py-3.5">Contact</th>
                  <th className="px-6 py-3.5">Vehicle &amp; Package</th>
                  <th className="px-6 py-3.5">Date &amp; Location</th>
                  <th className="px-6 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-rule">
                {filtered.map((msg) => {
                  const phoneDigits = (msg.phone || '').replace(/\D/g, '')

                  return (
                    <tr
                      key={msg.id}
                      className="transition-colors hover:bg-[#fafafa]"
                    >
                      {/* Status */}
                      <td className="px-6 py-4 align-top">
                        <button
                          type="button"
                          onClick={() =>
                            setMessageStatus(
                              msg.id,
                              msg.status === 'new' ? 'contacted' : 'new'
                            )
                          }
                          className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                            msg.status === 'new'
                              ? 'bg-brand text-white shadow-sm hover:bg-brand-dark'
                              : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
                          }`}
                          title="Click to toggle status"
                        >
                          {msg.status === 'new' ? '● New' : '✓ Contacted'}
                        </button>
                      </td>

                      {/* Client Name & Reference Number */}
                      <td className="px-6 py-4 align-top">
                        <div className="font-semibold text-ink">{msg.name}</div>
                        {msg.refNumber && (
                          <span className="font-mono text-[11px] font-bold text-brand bg-red-50 px-1.5 py-0.5 rounded border border-red-200 inline-block mt-0.5">
                            {msg.refNumber}
                          </span>
                        )}
                        <div className="text-[11px] text-muted mt-1">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleDateString(undefined, {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })
                            : 'Recent'}
                        </div>
                      </td>

                      {/* Phone & Email */}
                      <td className="px-6 py-4 align-top">
                        <div className="flex items-center gap-2">
                          <a
                            href={`tel:+${phoneDigits}`}
                            className="font-semibold text-ink hover:text-brand"
                          >
                            {msg.phone}
                          </a>
                        </div>
                        {msg.email && (
                          <a
                            href={`mailto:${msg.email}`}
                            className="block text-[12px] text-muted hover:text-ink mt-0.5"
                          >
                            {msg.email}
                          </a>
                        )}
                      </td>

                      {/* Vehicle & Package Details */}
                      <td className="px-6 py-4 align-top">
                        <div className="font-semibold text-ink">
                          {msg.vehicle || 'Not specified'}
                        </div>
                        <div className="text-[12px] font-bold text-brand mt-0.5">
                          {msg.package || 'General Quote'}
                        </div>
                        {msg.notes && (
                          <div className="text-[11px] text-muted mt-1 bg-mist p-1.5 rounded max-w-xs leading-snug">
                            {msg.notes}
                          </div>
                        )}
                      </td>

                      {/* Preferred Date & Location */}
                      <td className="px-6 py-4 align-top">
                        <div className="text-ink font-medium">
                          {msg.location || 'Hudson Valley'}
                        </div>
                        <div className="text-[12px] text-muted mt-0.5">
                          {msg.date || 'Flexible Date'}
                        </div>
                      </td>

                      {/* Quick Communication Actions */}
                      <td className="px-6 py-4 text-right align-top">
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:+${phoneDigits}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-rule text-ink hover:border-brand hover:text-brand"
                            title={`Call ${msg.phone}`}
                          >
                            <Phone width={14} height={14} />
                          </a>
                          <a
                            href={`sms:+${phoneDigits}`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-rule text-ink hover:border-brand hover:text-brand"
                            title={`Send SMS to ${msg.phone}`}
                          >
                            <Message width={14} height={14} />
                          </a>
                          <button
                            type="button"
                            onClick={() => setDeleteConfirmId(msg.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded border border-rule text-muted hover:border-red-600 hover:text-red-600"
                            title="Delete Lead"
                          >
                            <Trash width={14} height={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6 text-center">
            <Trash width={36} height={36} className="mx-auto text-brand" />
            <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">
              Delete This Request?
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              This message record will be permanently deleted.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="btn-outline !py-2 !px-4 !text-[12px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteMessage(deleteConfirmId)
                  setDeleteConfirmId(null)
                }}
                className="btn-red !py-2 !px-5 !text-[12px]"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
