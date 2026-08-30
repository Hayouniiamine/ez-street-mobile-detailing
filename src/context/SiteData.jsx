import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'
import defaultData, { uid } from '../data/defaults'

const STORAGE_KEY = 'ezstreet.site.v2'

const SiteDataContext = createContext(null)

/** Merge stored data over the defaults so new fields survive an old localStorage blob. */
function hydrate(stored) {
  if (!stored || typeof stored !== 'object') return structuredClone(defaultData)
  const base = structuredClone(defaultData)
  return {
    ...base,
    ...stored,
    business: {
      ...base.business,
      ...(stored.business || {}),
      social: { ...base.business.social, ...((stored.business || {}).social || {}) },
      hours: Array.isArray(stored.business?.hours) ? stored.business.hours : base.business.hours,
    },
    stats: Array.isArray(stored.stats) ? stored.stats : base.stats,
    packages: Array.isArray(stored.packages) ? stored.packages : base.packages,
    ceramicIncludes: Array.isArray(stored.ceramicIncludes)
      ? stored.ceramicIncludes
      : base.ceramicIncludes,
    gallery: Array.isArray(stored.gallery) ? stored.gallery : base.gallery,
    testimonials: Array.isArray(stored.testimonials) ? stored.testimonials : base.testimonials,
    messages: Array.isArray(stored.messages) ? stored.messages : [],
  }
}

function readStorage() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return hydrate(raw ? JSON.parse(raw) : null)
  } catch {
    return structuredClone(defaultData)
  }
}

export function SiteDataProvider({ children }) {
  const [data, setData] = useState(readStorage)
  const [storageError, setStorageError] = useState('')
  const skipNextWrite = useRef(false)

  // Persist on every change.
  useEffect(() => {
    if (skipNextWrite.current) {
      skipNextWrite.current = false
      return
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
      setStorageError('')
    } catch {
      setStorageError(
        'Browser storage is full — try removing a few gallery photos or using image URLs instead of uploads.',
      )
    }
  }, [data])

  // Keep a second tab (e.g. admin open beside the public site) in sync.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key !== STORAGE_KEY) return
      skipNextWrite.current = true
      setData(hydrate(e.newValue ? JSON.parse(e.newValue) : null))
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const patch = useCallback((partial) => {
    setData((prev) => ({ ...prev, ...(typeof partial === 'function' ? partial(prev) : partial) }))
  }, [])

  const updateBusiness = useCallback((partial) => {
    setData((prev) => ({ ...prev, business: { ...prev.business, ...partial } }))
  }, [])

  const savePackage = useCallback((item) => {
    setData((prev) => {
      const exists = prev.packages.some((p) => p.id === item.id)
      const packages = exists
        ? prev.packages.map((p) => (p.id === item.id ? { ...p, ...item } : p))
        : [...prev.packages, item]
      // "Most popular" is exclusive inside its own group.
      const normalised = item.popular
        ? packages.map((p) =>
            p.group === item.group && p.id !== item.id ? { ...p, popular: false } : p,
          )
        : packages
      return { ...prev, packages: normalised }
    })
  }, [])

  const deletePackage = useCallback((id) => {
    setData((prev) => ({ ...prev, packages: prev.packages.filter((p) => p.id !== id) }))
  }, [])

  /** Reorder inside one group while leaving the other groups untouched. */
  const reorderPackages = useCallback((group, fromId, toId) => {
    setData((prev) => {
      const inGroup = prev.packages.filter((p) => p.group === group)
      const from = inGroup.findIndex((p) => p.id === fromId)
      const to = inGroup.findIndex((p) => p.id === toId)
      if (from < 0 || to < 0 || from === to) return prev
      const next = [...inGroup]
      const [moved] = next.splice(from, 1)
      next.splice(to, 0, moved)
      let i = 0
      return {
        ...prev,
        packages: prev.packages.map((p) => (p.group === group ? next[i++] : p)),
      }
    })
  }, [])

  const addMessage = useCallback((msg) => {
    const record = {
      id: uid('msg'),
      status: 'new',
      createdAt: new Date().toISOString(),
      ...msg,
    }
    setData((prev) => ({ ...prev, messages: [record, ...prev.messages] }))
    return record
  }, [])

  const setMessageStatus = useCallback((id, status) => {
    setData((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, status } : m)),
    }))
  }, [])

  const deleteMessage = useCallback((id) => {
    setData((prev) => ({ ...prev, messages: prev.messages.filter((m) => m.id !== id) }))
  }, [])

  const resetAll = useCallback(() => {
    setData(structuredClone(defaultData))
  }, [])

  const value = useMemo(
    () => ({
      data,
      business: data.business,
      patch,
      updateBusiness,
      savePackage,
      deletePackage,
      reorderPackages,
      addMessage,
      setMessageStatus,
      deleteMessage,
      resetAll,
      storageError,
      setGallery: (gallery) => patch({ gallery }),
      setTestimonials: (testimonials) => patch({ testimonials }),
      setStats: (stats) => patch({ stats }),
      setCeramicIncludes: (ceramicIncludes) => patch({ ceramicIncludes }),
    }),
    [
      data,
      patch,
      updateBusiness,
      savePackage,
      deletePackage,
      reorderPackages,
      addMessage,
      setMessageStatus,
      deleteMessage,
      resetAll,
      storageError,
    ],
  )

  return <SiteDataContext.Provider value={value}>{children}</SiteDataContext.Provider>
}

export function useSite() {
  const ctx = useContext(SiteDataContext)
  if (!ctx) throw new Error('useSite must be used inside <SiteDataProvider>')
  return ctx
}

/* ---------- derived helpers used across the public site ---------- */

export const groupOf = (data, group) => data.packages.filter((p) => p.group === group)

export const telHref = (business) => `tel:+${(business.phoneRaw || '').replace(/\D/g, '')}`
export const smsHref = (business) => `sms:+${(business.phoneRaw || '').replace(/\D/g, '')}`

/** BOOK NOW target: an external booking system if one is configured, otherwise the quote form. */
export function bookingTarget(business) {
  const url = (business.bookingUrl || '').trim()
  if (url) return { href: url, external: true }
  return { href: '#quote', external: false }
}
