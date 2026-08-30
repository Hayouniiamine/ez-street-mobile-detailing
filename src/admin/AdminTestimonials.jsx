import { useState } from 'react'
import { Plus, Pencil, Trash, Close, Star, GoogleG } from '../components/Icons'
import { useSite } from '../context/SiteData'
import { uid } from '../data/defaults'
import Stars from '../components/Stars'

const EMPTY_REVIEW = {
  id: '',
  name: '',
  detail: '',
  rating: 5,
  featured: false,
  time: 'recently',
  tag: 'mobile detailing',
  text: '',
  ownerReply: '',
}

export default function AdminTestimonials() {
  const { data, setTestimonials } = useSite()
  const [editing, setEditing] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)
  const [search, setSearch] = useState('')
  const [tagFilter, setTagFilter] = useState('all')

  const testimonials = data.testimonials || []

  const filtered = testimonials.filter((t) => {
    if (tagFilter !== 'all' && t.tag !== tagFilter) return false
    if (search.trim()) {
      const q = search.toLowerCase()
      const match =
        t.name?.toLowerCase().includes(q) ||
        t.detail?.toLowerCase().includes(q) ||
        t.text?.toLowerCase().includes(q)
      if (!match) return false
    }
    return true
  })

  const handleSave = (e) => {
    e.preventDefault()
    if (!editing.name.trim() || !editing.text.trim()) return

    const exists = testimonials.some((t) => t.id === editing.id)
    const updated = exists
      ? testimonials.map((t) => (t.id === editing.id ? { ...t, ...editing } : t))
      : [editing, ...testimonials]

    setTestimonials(updated)
    setEditing(null)
  }

  const handleDelete = (id) => {
    setTestimonials(testimonials.filter((t) => t.id !== id))
    setDeleteConfirmId(null)
  }

  const toggleFeatured = (id) => {
    setTestimonials(
      testimonials.map((t) => (t.id === id ? { ...t, featured: !t.featured } : t))
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <GoogleG width={16} height={16} className="text-brand" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
              5.0 Star Google Reviews ({testimonials.length} Total)
            </p>
          </div>
          <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
            Customer <span className="text-brand">Reviews</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Manage authentic customer feedback, highlight reviews on the homepage, and edit owner responses.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY_REVIEW, id: uid('t') })}
          className="btn-red !px-5 !py-3 !text-[12px] self-start sm:self-auto"
        >
          <Plus width={16} height={16} /> Add New Review
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card p-4 sm:p-5">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'all', label: `All (${testimonials.length})` },
              { id: 'mobile detailing', label: 'Mobile Detailing' },
              { id: 'ceramic finish', label: 'Ceramic Finish' },
              { id: 'headlight restoration', label: 'Headlight Restoration' },
              { id: 'scratch removal', label: 'Scratch/Stain' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setTagFilter(tab.id)}
                className={`px-3.5 py-1.5 text-[12px] font-semibold uppercase tracking-wider transition-colors ${
                  tagFilter === tab.id
                    ? 'bg-ink text-white shadow-sm'
                    : 'bg-mist text-muted hover:bg-zinc-200 hover:text-ink'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="w-full sm:w-64">
            <input
              type="search"
              className="field !py-2 !text-[13px]"
              placeholder="Search reviewer or vehicle..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid gap-5">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`card p-6 transition-all duration-200 ${
              t.featured ? 'border-l-4 border-l-brand' : ''
            }`}
          >
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <Stars rating={t.rating} size={15} />
                  <span className="font-alt text-lg font-semibold uppercase tracking-wide text-ink">
                    {t.name}
                  </span>
                  {t.time && <span className="text-[12px] text-muted">· {t.time}</span>}
                  {t.detail && (
                    <span className="rounded bg-mist px-2.5 py-0.5 text-[11px] font-medium text-brand">
                      {t.detail}
                    </span>
                  )}
                  {t.tag && (
                    <span className="rounded bg-zinc-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                      {t.tag}
                    </span>
                  )}
                  {t.featured && (
                    <span className="rounded bg-brand px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                      Featured On Homepage
                    </span>
                  )}
                </div>

                <p className="mt-3 text-[15px] leading-relaxed text-ink/85 italic">
                  "{t.text}"
                </p>

                {t.ownerReply && (
                  <div className="mt-3 rounded bg-mist p-3 text-[13px] text-muted border-l-2 border-brand">
                    <span className="font-semibold text-ink text-[11px] uppercase tracking-wider block">
                      Owner Response (Mike):
                    </span>
                    "{t.ownerReply}"
                  </div>
                )}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2.5 shrink-0 border-t border-rule pt-3 sm:border-t-0 sm:pt-0">
                <button
                  type="button"
                  onClick={() => toggleFeatured(t.id)}
                  className={`rounded px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                    t.featured
                      ? 'bg-brand text-white hover:bg-brand-dark'
                      : 'border border-rule text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {t.featured ? 'Featured ★' : 'Set Featured'}
                </button>
                <button
                  type="button"
                  onClick={() => setEditing({ ...t })}
                  className="inline-flex h-9 items-center gap-1 rounded border border-ink bg-white px-3 text-[11px] font-semibold uppercase tracking-wider text-ink hover:bg-ink hover:text-white"
                >
                  <Pencil width={13} height={13} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(t.id)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded border border-rule text-muted hover:border-red-600 hover:text-red-600"
                  title="Delete Review"
                >
                  <Trash width={15} height={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / Add Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
                {editing.id && testimonials.some((t) => t.id === editing.id)
                  ? 'Edit Google Review'
                  : 'Add New Review'}
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-muted hover:text-ink"
              >
                <Close width={22} height={22} />
              </button>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="field-label">Customer Name *</label>
                  <input
                    className="field"
                    value={editing.name}
                    onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                    placeholder="e.g. Jacqui Bowman"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">Vehicle / Service Detail</label>
                  <input
                    className="field"
                    value={editing.detail || ''}
                    onChange={(e) => setEditing({ ...editing, detail: e.target.value })}
                    placeholder="e.g. 2000 Mazda Miata · Engine Bay"
                  />
                </div>

                <div>
                  <label className="field-label">Service Category Tag</label>
                  <select
                    className="field"
                    value={editing.tag || 'mobile detailing'}
                    onChange={(e) => setEditing({ ...editing, tag: e.target.value })}
                  >
                    <option value="mobile detailing">Mobile Detailing</option>
                    <option value="ceramic finish">Ceramic Finish</option>
                    <option value="headlight restoration">Headlight Restoration</option>
                    <option value="scratch removal">Scratch Removal</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Star Rating (1 - 5)</label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setEditing({ ...editing, rating: star })}
                        className="p-1 text-brand transition-transform hover:scale-125"
                      >
                        <Star
                          width={24}
                          height={24}
                          filled={star <= editing.rating}
                          className={star <= editing.rating ? '' : 'text-rule'}
                        />
                      </button>
                    ))}
                    <span className="ml-2 font-display text-lg text-ink">
                      {editing.rating}.0 Stars
                    </span>
                  </div>
                </div>

                <div>
                  <label className="field-label">Review Date / Timestamp</label>
                  <input
                    className="field"
                    value={editing.time || ''}
                    onChange={(e) => setEditing({ ...editing, time: e.target.value })}
                    placeholder="e.g. 3 months ago or a month ago"
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Review Testimonial Text *</label>
                <textarea
                  className="field"
                  rows={4}
                  value={editing.text}
                  onChange={(e) => setEditing({ ...editing, text: e.target.value })}
                  placeholder="Paste what the customer wrote..."
                  required
                />
              </div>

              <div>
                <label className="field-label">Owner Response from Mike (Optional)</label>
                <textarea
                  className="field"
                  rows={2}
                  value={editing.ownerReply || ''}
                  onChange={(e) => setEditing({ ...editing, ownerReply: e.target.value })}
                  placeholder="e.g. Thank you for the kind words and amazing review..."
                />
              </div>

              <div className="flex items-center gap-3 rounded border border-rule bg-mist p-3.5">
                <input
                  type="checkbox"
                  id="featToggle"
                  checked={editing.featured || false}
                  onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
                <label htmlFor="featToggle" className="cursor-pointer text-[13px] font-semibold text-ink">
                  Feature this review prominently in the top homepage review showcase
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-rule pt-5">
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="btn-outline !py-2.5 !px-5 !text-[12px]"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-red !py-2.5 !px-6 !text-[12px]">
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6 text-center">
            <Trash width={36} height={36} className="mx-auto text-brand" />
            <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">
              Delete This Review?
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              This review will be permanently removed.
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
                onClick={() => handleDelete(deleteConfirmId)}
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
