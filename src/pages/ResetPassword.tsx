import { useState, useEffect } from 'react'
import { useLocation } from 'wouter'

export default function ResetPassword() {
  const [, setLocation] = useLocation()
  const [token, setToken] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    // Get token from URL
    const params = new URLSearchParams(window.location.search)
    const resetToken = params.get('token')
    if (resetToken) {
      setToken(resetToken)
    } else {
      setError('Invalid reset link. Please request a new one.')
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to reset password')
        return
      }

      setSuccess(true)
      setPassword('')
      setConfirmPassword('')
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0a0a] to-[#1a1a1a] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/5 via-transparent to-transparent" />
      
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 to-transparent blur-3xl" />
        
        <div className="relative bg-[#0f0f0f] border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <h2 className="text-3xl font-bold text-white mb-1">Set New Password</h2>
          <p className="text-neutral-400 text-sm mb-6">Enter your new password below</p>
          
          {success ? (
            <div className="space-y-4">
              <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                Password reset successfully! You can now sign in with your new password.
              </div>
              <button
                onClick={() => setLocation('/login')}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition"
                data-testid="button-to-login"
              >
                Go to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">New Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                  data-testid="input-new-password"
                />
              </div>

              <div>
                <label className="block text-sm text-neutral-400 mb-2">Confirm Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                  data-testid="input-confirm-password"
                />
              </div>
              
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading || !token}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
                data-testid="button-reset-password"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
              
              <button
                type="button"
                onClick={() => setLocation('/login')}
                className="w-full text-sm text-orange-400 hover:text-orange-300 transition"
                data-testid="button-to-login-2"
              >
                Back to Sign In
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
