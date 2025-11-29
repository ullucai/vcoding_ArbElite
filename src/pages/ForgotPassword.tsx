import { useState } from 'react'
import { useLocation } from 'wouter'

export default function ForgotPassword() {
  const [, setLocation] = useLocation()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to send reset email')
        return
      }

      setSuccess(true)
      setEmail('')
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
          <h2 className="text-3xl font-bold text-white mb-1">Reset Password</h2>
          <p className="text-neutral-400 text-sm mb-6">Enter your email to receive a password reset link</p>
          
          {success ? (
            <div className="space-y-4">
              <div className="text-sm text-green-400 bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
                Reset link sent to {email}. Check your inbox and click the link to set a new password.
              </div>
              <button
                onClick={() => setLocation('/login')}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition"
                data-testid="button-back-to-login"
              >
                Back to Sign In
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Email Address</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                  data-testid="input-reset-email"
                />
                <p className="text-xs text-neutral-500 mt-1">We'll send a reset link to this address</p>
              </div>
              
              {error && (
                <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg disabled:opacity-50 transition"
                data-testid="button-send-reset"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              
              <button
                type="button"
                onClick={() => setLocation('/login')}
                className="w-full text-sm text-orange-400 hover:text-orange-300 transition"
                data-testid="button-back-to-login-2"
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
