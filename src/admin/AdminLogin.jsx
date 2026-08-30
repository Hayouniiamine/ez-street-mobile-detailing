import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Lock, ArrowRight } from '../components/Icons'
import { useAdminAuth } from './AdminAuthContext'
import Logo from '../components/Logo'

export default function AdminLogin() {
  const { login, defaultPassword } = useAdminAuth()
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!password) {
      setError('Please enter the admin password.')
      return
    }

    setLoading(true)
    setTimeout(() => {
      const res = login(password)
      if (res.success) {
        navigate('/admin')
      } else {
        setError(res.error)
        setLoading(false)
      }
    }, 200)
  }

  const fillDemoPassword = () => {
    setPassword(defaultPassword)
    setError('')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-12 selection:bg-brand selection:text-white">
      <div className="w-full max-w-md">
        {/* Back Link */}
        <div className="mb-6 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em] text-muted transition-colors duration-200 hover:text-brand"
          >
            ← Back to Public Website
          </Link>
        </div>

        {/* Black Card */}
        <div className="border border-ink-line bg-ink p-8 text-white shadow-lift sm:p-10">
          <div className="text-center">
            <div className="inline-flex justify-center">
              <Logo tone="light" />
            </div>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand/20 text-brand">
                <Lock width={16} height={16} />
              </span>
              <h1 className="font-display text-2xl uppercase tracking-wider text-white">
                Admin <span className="text-brand">Portal</span>
              </h1>
            </div>
            <p className="mt-2 text-[13px] leading-relaxed text-white/55">
              Enter the manager password to customize services, pricing, gallery photos, and view quote requests.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={fillDemoPassword}
                  className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-brand transition-colors hover:text-white"
                >
                  Fill Demo: <span className="underline decoration-brand underline-offset-2">ezstreet</span>
                </button>
              </div>

              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError('')
                  }}
                  placeholder="Enter admin password..."
                  className="field-dark pr-12 font-sans tracking-wide"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-semibold uppercase tracking-wider text-white/40 hover:text-white"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>

              {error && (
                <div className="mt-3 flex items-center gap-2 border-l-2 border-brand bg-brand/10 p-2.5 text-[12px] font-medium text-brand">
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-red w-full !py-3.5 !text-[13px] tracking-[0.18em]"
            >
              {loading ? (
                <span>Verifying...</span>
              ) : (
                <>
                  Access Admin Dashboard <ArrowRight width={16} height={16} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 border-t border-ink-line pt-5 text-center">
            <p className="text-[11px] uppercase tracking-[0.15em] text-white/35">
              Default password: <span className="font-semibold text-white/70">ezstreet</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
