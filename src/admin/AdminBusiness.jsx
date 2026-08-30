import { useState } from 'react'
import { Check, Trash, Plus } from '../components/Icons'
import { useSite } from '../context/SiteData'
import { MISSION_TEXT } from '../data/defaults'

export default function AdminBusiness() {
  const { business, updateBusiness, resetAll } = useSite()
  const [formData, setFormData] = useState({ ...business })
  const [savedToast, setSavedToast] = useState(false)
  const [resetConfirm, setResetConfirm] = useState(false)
  const [newHour, setNewHour] = useState('')

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSocialChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      social: { ...prev.social, [key]: value },
    }))
  }

  const handleAddHour = () => {
    if (!newHour.trim()) return
    setFormData((prev) => ({
      ...prev,
      hours: [...(prev.hours || []), newHour.trim()],
    }))
    setNewHour('')
  }

  const handleRemoveHour = (index) => {
    setFormData((prev) => ({
      ...prev,
      hours: prev.hours.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    updateBusiness(formData)
    setSavedToast(true)
    setTimeout(() => setSavedToast(false), 3000)
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-brand">
            Settings &amp; Content
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase tracking-wide text-ink sm:text-5xl">
            Business <span className="text-brand">Info &amp; Copy</span>
          </h1>
          <p className="mt-2 text-[14px] text-muted">
            Update your phone number, service area, operating hours, social links, and website copy.
          </p>
        </div>

        {savedToast && (
          <div className="flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-[13px] font-semibold text-white shadow-lift animate-bounce">
            <Check width={16} height={16} /> Changes Saved Live!
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Section 1: Contact & Core Identity */}
        <div className="card p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
            Core Contact <span className="text-brand">Details</span>
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <label className="field-label">Company Name</label>
              <input
                className="field"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                required
              />
            </div>

            <div>
              <label className="field-label">Display Phone Number</label>
              <input
                className="field"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="(845) 745-8629"
                required
              />
            </div>

            <div>
              <label className="field-label">Raw Phone for Dialing / SMS</label>
              <input
                className="field"
                value={formData.phoneRaw || ''}
                onChange={(e) => handleChange('phoneRaw', e.target.value)}
                placeholder="18457458629"
                required
              />
            </div>

            <div>
              <label className="field-label">Tagline</label>
              <input
                className="field"
                value={formData.tagline || ''}
                onChange={(e) => handleChange('tagline', e.target.value)}
                placeholder="The Choice Is E-Z"
              />
            </div>

            <div>
              <label className="field-label">Service Area</label>
              <input
                className="field"
                value={formData.serviceArea || ''}
                onChange={(e) => handleChange('serviceArea', e.target.value)}
                placeholder="Hudson Valley, NY & surrounding areas"
              />
            </div>

            <div>
              <label className="field-label">External Booking URL (Optional)</label>
              <input
                className="field"
                value={formData.bookingUrl || ''}
                onChange={(e) => handleChange('bookingUrl', e.target.value)}
                placeholder="e.g. Booksy or leave empty to use quote form"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="field-label">Travel Radius / Mileage Note</label>
            <input
              className="field"
              value={formData.radius || ''}
              onChange={(e) => handleChange('radius', e.target.value)}
              placeholder="We travel up to 50 miles..."
            />
          </div>
        </div>

        {/* Section 2: Operating Hours */}
        <div className="card p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
            Operating <span className="text-brand">Hours</span>
          </h2>
          <p className="mt-1 text-[13px] text-muted">
            Appears in the footer and quote section.
          </p>

          <div className="mt-5 space-y-3">
            {formData.hours?.map((line, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <input
                  className="field"
                  value={line}
                  onChange={(e) => {
                    const next = [...formData.hours]
                    next[idx] = e.target.value
                    handleChange('hours', next)
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveHour(idx)}
                  className="rounded border border-rule p-3 text-muted hover:border-red-600 hover:text-red-600"
                >
                  <Trash width={16} height={16} />
                </button>
              </div>
            ))}

            <div className="flex gap-2 pt-2">
              <input
                className="field"
                value={newHour}
                onChange={(e) => setNewHour(e.target.value)}
                placeholder="e.g. Sunday · By appointment only"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    handleAddHour()
                  }
                }}
              />
              <button
                type="button"
                onClick={handleAddHour}
                className="btn-outline shrink-0 !py-2.5 !px-5 !text-[12px]"
              >
                <Plus width={15} height={15} /> Add Line
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Social Media Links */}
        <div className="card p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
            Social Media <span className="text-brand">Profiles</span>
          </h2>
          <p className="mt-1 text-[13px] text-muted">
            Links with URLs appear in the footer. Empty fields are hidden completely (no dummy # links).
          </p>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label">Google Business / Reviews Link</label>
              <input
                className="field"
                value={formData.social?.google || ''}
                onChange={(e) => handleSocialChange('google', e.target.value)}
                placeholder="https://www.google.com/search?q=..."
              />
            </div>

            <div>
              <label className="field-label">Facebook Profile / Page</label>
              <input
                className="field"
                value={formData.social?.facebook || ''}
                onChange={(e) => handleSocialChange('facebook', e.target.value)}
                placeholder="https://facebook.com/..."
              />
            </div>

            <div>
              <label className="field-label">Instagram Profile</label>
              <input
                className="field"
                value={formData.social?.instagram || ''}
                onChange={(e) => handleSocialChange('instagram', e.target.value)}
                placeholder="https://instagram.com/..."
              />
            </div>

            <div>
              <label className="field-label">Yelp Profile</label>
              <input
                className="field"
                value={formData.social?.yelp || ''}
                onChange={(e) => handleSocialChange('yelp', e.target.value)}
                placeholder="https://yelp.com/biz/..."
              />
            </div>
          </div>
        </div>

        {/* Section 4: Homepage Copy & Headings */}
        <div className="card p-6 sm:p-8">
          <h2 className="font-display text-2xl uppercase tracking-wide text-ink">
            Homepage Copy &amp; <span className="text-brand">Headlines</span>
          </h2>

          <div className="mt-6 space-y-5">
            <div className="grid gap-5 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="field-label">Hero Main H1 Headline</label>
                <input
                  className="field"
                  value={formData.heroHeadline || ''}
                  onChange={(e) => handleChange('heroHeadline', e.target.value)}
                />
              </div>

              <div>
                <label className="field-label">Word to Color Red</label>
                <input
                  className="field"
                  value={formData.heroAccent || ''}
                  onChange={(e) => handleChange('heroAccent', e.target.value)}
                  placeholder="showroom"
                />
              </div>
            </div>

            <div>
              <label className="field-label">Hero Top Eyebrow Label</label>
              <input
                className="field"
                value={formData.heroLabel || ''}
                onChange={(e) => handleChange('heroLabel', e.target.value)}
              />
            </div>

            <div>
              <label className="field-label">Hero Subtitle Paragraph</label>
              <textarea
                className="field"
                rows={2}
                value={formData.heroSub || ''}
                onChange={(e) => handleChange('heroSub', e.target.value)}
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="field-label">About Us Mission Statement</label>
                <button
                  type="button"
                  onClick={() => handleChange('mission', MISSION_TEXT)}
                  className="text-[11px] font-semibold text-brand hover:underline"
                >
                  Reset to Original Verbatim Copy
                </button>
              </div>
              <textarea
                className="field"
                rows={5}
                value={formData.mission || ''}
                onChange={(e) => handleChange('mission', e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="sticky bottom-4 z-20 flex flex-wrap items-center justify-between gap-4 rounded border border-ink bg-ink p-4 text-white shadow-2xl">
          <div>
            <span className="font-display text-lg tracking-wide">Ready to update?</span>
            <p className="text-[12px] text-white/60">Changes will reflect instantly on the public website.</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setResetConfirm(true)}
              className="btn-outline-light !py-2.5 !px-4 !text-[11px]"
            >
              Reset to Defaults
            </button>
            <button type="submit" className="btn-red !py-2.5 !px-7 !text-[12px]">
              Save All Business Info
            </button>
          </div>
        </div>
      </form>

      {/* Reset Confirmation Modal */}
      {resetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6 text-center">
            <Trash width={36} height={36} className="mx-auto text-brand" />
            <h3 className="mt-4 font-display text-2xl uppercase tracking-wide text-ink">
              Reset Entire Website?
            </h3>
            <p className="mt-2 text-[14px] text-muted">
              This will restore all packages, gallery photos, testimonials, and business info back to factory demo defaults.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                onClick={() => setResetConfirm(false)}
                className="btn-outline !py-2 !px-4 !text-[12px]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAll()
                  setFormData({ ...business })
                  setResetConfirm(false)
                  setSavedToast(true)
                  setTimeout(() => setSavedToast(false), 3000)
                }}
                className="btn-red !py-2 !px-5 !text-[12px]"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
