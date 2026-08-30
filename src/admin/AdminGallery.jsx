import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, Pencil, Trash, Close, ChevronUp, ChevronDown, Images } from '../components/Icons'
import { useSite } from '../context/SiteData'
import { uid } from '../data/defaults'
import BeforeAfter from '../components/BeforeAfter'

const PRESETS = [
  {
    name: 'Corvette C8 — Paint Correction',
    size: 'tall',
    before: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=80',
  },
  {
    name: 'Off-Road 4x4 — Mud Reset & Interior Extraction',
    size: 'wide',
    before: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Luxury Yacht — Gelcoat Decon & Ceramic Seal',
    size: 'wide',
    before: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80',
    after: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&w=1000&q=80',
  },
  {
    name: 'Mercedes-AMG Sedan — Deluxe Package',
    size: 'square',
    before: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=900&q=80',
    after: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=900&q=80',
  },
]

const EMPTY_ITEM = {
  id: '',
  caption: '',
  size: 'wide',
  before: '',
  after: '',
}

export default function AdminGallery() {
  const { data, setGallery } = useSite()
  const location = useLocation()

  const [editing, setEditing] = useState(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('new') === 'true') {
      setEditing({ ...EMPTY_ITEM, id: uid('g') })
    }
  }, [location.search])

  const handleSave = (e) => {
    e.preventDefault()
    if (!editing.caption.trim() || !editing.before || !editing.after) return

    const exists = data.gallery.some((g) => g.id === editing.id)
    const updated = exists
      ? data.gallery.map((g) => (g.id === editing.id ? { ...g, ...editing } : g))
      : [...data.gallery, editing]

    setGallery(updated)
    setEditing(null)
  }

  const handleDelete = (id) => {
    setGallery(data.gallery.filter((g) => g.id !== id))
    setDeleteConfirmId(null)
  }

  const handleMove = (index, direction) => {
    if (direction === 'up' && index > 0) {
      const copy = [...data.gallery]
      const [item] = copy.splice(index, 1)
      copy.splice(index - 1, 0, item)
      setGallery(copy)
    } else if (direction === 'down' && index < data.gallery.length - 1) {
      const copy = [...data.gallery]
      const [item] = copy.splice(index, 1)
      copy.splice(index + 1, 0, item)
      setGallery(copy)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
            Visual Proof
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
            Before &amp; After <span className="text-brand">Gallery</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Manage interactive comparison sliders displayed in the masonry gallery on the homepage.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setEditing({ ...EMPTY_ITEM, id: uid('g') })}
          className="btn-red !px-5 !py-3 !text-[12px] self-start sm:self-auto"
        >
          <Plus width={16} height={16} /> Add Image Pair
        </button>
      </div>

      {/* Grid of Image Pairs */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
        {data.gallery.map((item, index) => (
          <div key={item.id} className="card flex flex-col justify-between p-5">
            <div>
              <div className="flex items-center justify-between pb-3 text-[11px] font-semibold uppercase tracking-wider text-muted">
                <span>Pair #{index + 1} ({item.size})</span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => handleMove(index, 'up')}
                    className="rounded border border-rule p-1 hover:border-ink hover:text-ink disabled:opacity-30"
                    title="Move Earlier"
                  >
                    <ChevronUp width={12} height={12} />
                  </button>
                  <button
                    type="button"
                    disabled={index === data.gallery.length - 1}
                    onClick={() => handleMove(index, 'down')}
                    className="rounded border border-rule p-1 hover:border-ink hover:text-ink disabled:opacity-30"
                    title="Move Later"
                  >
                    <ChevronDown width={12} height={12} />
                  </button>
                </div>
              </div>

              {/* Interactive preview slider */}
              <div className="overflow-hidden rounded border border-rule">
                <BeforeAfter item={item} />
              </div>
            </div>

            {/* Actions */}
            <div className="mt-4 flex items-center justify-between border-t border-rule pt-4">
              <span className="text-[11px] font-medium text-muted truncate max-w-[160px]">
                {item.caption}
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setEditing({ ...item })}
                  className="inline-flex h-8 items-center gap-1 rounded border border-ink bg-white px-2.5 text-[11px] font-semibold uppercase tracking-wider text-ink hover:bg-ink hover:text-white"
                >
                  <Pencil width={12} height={12} /> Edit
                </button>
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(item.id)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded border border-rule text-muted hover:border-red-600 hover:text-red-600"
                  title="Delete Pair"
                >
                  <Trash width={14} height={14} />
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
                {editing.id && data.gallery.some((g) => g.id === editing.id)
                  ? 'Edit Gallery Pair'
                  : 'Add Before/After Pair'}
              </h2>
              <button
                type="button"
                onClick={() => setEditing(null)}
                className="text-muted hover:text-ink"
              >
                <Close width={22} height={22} />
              </button>
            </div>

            {/* Quick Presets Bar */}
            <div className="mt-5 rounded border border-rule bg-mist p-3.5">
              <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-muted">
                ⚡ Quick Presets:
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {PRESETS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setEditing((prev) => ({
                        ...prev,
                        caption: p.name,
                        size: p.size,
                        before: p.before,
                        after: p.after,
                      }))
                    }}
                    className="rounded bg-white px-2.5 py-1 text-[11px] font-medium text-ink shadow-sm transition-colors hover:bg-brand hover:text-white"
                  >
                    {p.name.split('—')[0]}
                  </button>
                ))}
              </div>
            </div>

            <form onSubmit={handleSave} className="mt-6 space-y-5">
              <div>
                <label className="field-label">Caption / Vehicle Details *</label>
                <input
                  className="field"
                  value={editing.caption}
                  onChange={(e) => setEditing({ ...editing, caption: e.target.value })}
                  placeholder="e.g. 2019 Tesla Model 3 — Full Interior & Exterior Detail"
                  required
                />
              </div>

              <div>
                <label className="field-label">Card Aspect Ratio (Masonry Rhythm)</label>
                <select
                  className="field"
                  value={editing.size}
                  onChange={(e) => setEditing({ ...editing, size: e.target.value })}
                >
                  <option value="wide">Wide (16:10 aspect ratio)</option>
                  <option value="tall">Tall (3:4 aspect ratio)</option>
                  <option value="square">Square (1:1 aspect ratio)</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">"Before" Image URL *</label>
                  <input
                    className="field"
                    value={editing.before}
                    onChange={(e) => setEditing({ ...editing, before: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                  {editing.before && (
                    <div className="mt-2 h-28 w-full overflow-hidden rounded border border-rule bg-mist">
                      <img
                        src={editing.before}
                        alt="Before Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="field-label">"After" Image URL *</label>
                  <input
                    className="field"
                    value={editing.after}
                    onChange={(e) => setEditing({ ...editing, after: e.target.value })}
                    placeholder="https://..."
                    required
                  />
                  {editing.after && (
                    <div className="mt-2 h-28 w-full overflow-hidden rounded border border-rule bg-mist">
                      <img
                        src={editing.after}
                        alt="After Preview"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>
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
                  Save Pair
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
              Delete This Gallery Item?
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              This will remove the photo pair from the homepage immediately.
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
