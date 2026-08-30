import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Plus, Pencil, Trash, Check, ChevronUp, ChevronDown, Close } from '../components/Icons'
import { useSite } from '../context/SiteData'
import { uid } from '../data/defaults'

const EMPTY_PACKAGE = {
  id: '',
  group: 'signature',
  title: '',
  price: '$',
  blurb: '',
  popular: false,
  cta: 'Book Now',
  features: [],
}

export default function AdminPackages() {
  const { data, savePackage, deletePackage, reorderPackages } = useSite()
  const location = useLocation()

  const [activeGroup, setActiveGroup] = useState('all')
  const [editing, setEditing] = useState(null)
  const [featureInput, setFeatureInput] = useState('')
  const [deleteConfirmId, setDeleteConfirmId] = useState(null)

  // Open modal if ?new=true is in URL
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (params.get('new') === 'true') {
      setEditing({ ...EMPTY_PACKAGE, id: uid('pkg') })
    }
  }, [location.search])

  const filteredPackages =
    activeGroup === 'all'
      ? data.packages
      : data.packages.filter((p) => p.group === activeGroup)

  const handleEdit = (pkg) => {
    setEditing({ ...pkg, features: [...(pkg.features || [])] })
    setFeatureInput('')
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!editing.title.trim() || !editing.price.trim()) return

    savePackage(editing)
    setEditing(null)
  }

  const handleAddFeature = () => {
    if (!featureInput.trim()) return
    setEditing((prev) => ({
      ...prev,
      features: [...prev.features, featureInput.trim()],
    }))
    setFeatureInput('')
  }

  const handleRemoveFeature = (idx) => {
    setEditing((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== idx),
    }))
  }

  const moveItem = (pkg, direction) => {
    const inGroup = data.packages.filter((p) => p.group === pkg.group)
    const idx = inGroup.findIndex((p) => p.id === pkg.id)
    if (direction === 'up' && idx > 0) {
      reorderPackages(pkg.group, pkg.id, inGroup[idx - 1].id)
    } else if (direction === 'down' && idx < inGroup.length - 1) {
      reorderPackages(pkg.group, pkg.id, inGroup[idx + 1].id)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
            Menu Management
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
            Services &amp; <span className="text-brand">Packages</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Configure detailing packages, ceramic coatings, add-ons, features, and price tags.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setEditing({ ...EMPTY_PACKAGE, id: uid('pkg') })
            setFeatureInput('')
          }}
          className="btn-red !px-5 !py-3 !text-[12px] self-start sm:self-auto"
        >
          <Plus width={16} height={16} /> Add New Package
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-rule pb-4">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'signature', label: 'Signature Packages (Classic/Deluxe)' },
          { id: 'ceramic', label: 'Ceramic Packages' },
          { id: 'alacarte', label: 'A La Carte Add-Ons' },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveGroup(tab.id)}
            className={`px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.14em] transition-colors ${
              activeGroup === tab.id
                ? 'bg-ink text-white shadow-sm'
                : 'bg-white text-muted hover:bg-mist hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Package Cards List */}
      <div className="grid gap-5">
        {filteredPackages.map((pkg, idx) => {
          const inGroup = data.packages.filter((p) => p.group === pkg.group)
          const groupIdx = inGroup.findIndex((p) => p.id === pkg.id)

          return (
            <div
              key={pkg.id}
              className={`card p-6 transition-all duration-200 ${
                pkg.popular ? 'border-l-4 border-l-brand' : ''
              }`}
            >
              <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
                {/* Left details */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded bg-mist px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-muted">
                      {pkg.group === 'signature'
                        ? 'Signature'
                        : pkg.group === 'ceramic'
                        ? 'Ceramic'
                        : 'Add-On'}
                    </span>
                    {pkg.popular && (
                      <span className="rounded bg-brand px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white">
                        Most Popular / Highlighted
                      </span>
                    )}
                    <h3 className="font-display text-2xl uppercase tracking-wide text-ink sm:text-3xl">
                      {pkg.title}
                    </h3>
                  </div>

                  {pkg.blurb && (
                    <p className="mt-2 max-w-2xl text-[14px] text-muted">{pkg.blurb}</p>
                  )}

                  {pkg.features?.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pkg.features.map((feat, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 rounded-full border border-rule bg-[#fafafa] px-3 py-1 text-[12px] text-ink/80"
                        >
                          <Check width={12} height={12} className="text-brand" /> {feat}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right price & controls */}
                <div className="flex items-center justify-between gap-6 border-t border-rule pt-4 lg:border-t-0 lg:pt-0">
                  <div className="text-right">
                    <span className="font-display text-3xl font-bold tracking-wide text-brand sm:text-4xl">
                      {pkg.price}
                    </span>
                    {pkg.cta && (
                      <span className="block text-[11px] font-semibold uppercase tracking-wider text-muted">
                        Button: {pkg.cta}
                      </span>
                    )}
                  </div>

                  {/* Ordering arrows */}
                  <div className="flex flex-col gap-1">
                    <button
                      type="button"
                      disabled={groupIdx === 0}
                      onClick={() => moveItem(pkg, 'up')}
                      className="rounded border border-rule p-1.5 text-muted hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-muted"
                      title="Move Up"
                    >
                      <ChevronUp width={14} height={14} />
                    </button>
                    <button
                      type="button"
                      disabled={groupIdx === inGroup.length - 1}
                      onClick={() => moveItem(pkg, 'down')}
                      className="rounded border border-rule p-1.5 text-muted hover:border-ink hover:text-ink disabled:opacity-30 disabled:hover:border-rule disabled:hover:text-muted"
                      title="Move Down"
                    >
                      <ChevronDown width={14} height={14} />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleEdit(pkg)}
                      className="inline-flex h-9 items-center gap-1.5 rounded border border-ink bg-white px-3 text-[12px] font-semibold uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-white"
                    >
                      <Pencil width={14} height={14} /> Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(pkg.id)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded border border-rule text-muted transition-colors hover:border-red-600 hover:bg-red-50 hover:text-red-600"
                      title="Delete Service"
                    >
                      <Trash width={16} height={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Edit / Add Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8">
            <div className="flex items-center justify-between border-b border-rule pb-4">
              <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
                {editing.id && data.packages.some((p) => p.id === editing.id)
                  ? 'Edit Package'
                  : 'Add New Package'}
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
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="field-label">Category Group</label>
                  <select
                    className="field"
                    value={editing.group}
                    onChange={(e) => setEditing({ ...editing, group: e.target.value })}
                  >
                    <option value="signature">Signature Package (Classic / Deluxe)</option>
                    <option value="ceramic">Ceramic Package (2-Yr / 5-Yr)</option>
                    <option value="alacarte">A La Carte Add-On</option>
                  </select>
                </div>

                <div>
                  <label className="field-label">Service Title *</label>
                  <input
                    className="field"
                    value={editing.title}
                    onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                    placeholder="e.g. Classic Package or Engine Bay Clean"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">Price Tag *</label>
                  <input
                    className="field"
                    value={editing.price}
                    onChange={(e) => setEditing({ ...editing, price: e.target.value })}
                    placeholder="e.g. $249, from $749, or Ask About Pricing"
                    required
                  />
                </div>

                <div>
                  <label className="field-label">CTA Button Label</label>
                  <input
                    className="field"
                    value={editing.cta || ''}
                    onChange={(e) => setEditing({ ...editing, cta: e.target.value })}
                    placeholder="e.g. Book Deluxe, Book Classic"
                  />
                </div>
              </div>

              <div>
                <label className="field-label">Short Description / Subtitle</label>
                <textarea
                  className="field"
                  rows={2}
                  value={editing.blurb || ''}
                  onChange={(e) => setEditing({ ...editing, blurb: e.target.value })}
                  placeholder="Summary of why the client wants this package..."
                />
              </div>

              {/* Most Popular Toggle */}
              <div className="flex items-center gap-3 rounded border border-rule bg-mist p-3.5">
                <input
                  type="checkbox"
                  id="popToggle"
                  checked={editing.popular || false}
                  onChange={(e) => setEditing({ ...editing, popular: e.target.checked })}
                  className="h-4 w-4 accent-brand"
                />
                <label htmlFor="popToggle" className="cursor-pointer text-[13px] font-semibold text-ink">
                  Highlight as "Most Popular" / Featured Card
                </label>
              </div>

              {/* Feature Checklist Builder */}
              <div>
                <label className="field-label">Checklist Included Features</label>
                <div className="flex gap-2">
                  <input
                    className="field"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        handleAddFeature()
                      }
                    }}
                    placeholder="e.g. Detailed blowout & vacuum..."
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="btn-outline shrink-0 !px-4 !py-2 !text-[12px]"
                  >
                    Add Bullet
                  </button>
                </div>

                <div className="mt-3 space-y-2">
                  {editing.features?.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded border border-rule bg-white px-3 py-2 text-[13px]"
                    >
                      <span className="flex items-center gap-2 text-ink">
                        <Check width={14} height={14} className="text-brand" /> {feat}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-muted hover:text-brand"
                      >
                        <Close width={16} height={16} />
                      </button>
                    </div>
                  ))}
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
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6 text-center">
            <Trash width={36} height={36} className="mx-auto text-brand" />
            <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">
              Delete This Service?
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              This will remove the package from the live public website immediately.
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
                  deletePackage(deleteConfirmId)
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
