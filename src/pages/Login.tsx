import { useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '../lib/supabase'
import { Link } from 'wouter'

export default function Login() {
  const [, setLocation] = useLocation()
  const [emailOrUsername, setEmailOrUsername] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (isSignUp) {
        // Check if username already exists
        const { data: existingUser } = await supabase
          .from('users')
          .select('username')
          .eq('username', username.toLowerCase())
          .single()
        
        if (existingUser) {
          setError('This username is already taken')
          setLoading(false)
          return
        }

        // Sign up via backend endpoint (email verification bypass for testing)
        const signupRes = await fetch('/api/auth/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            password,
            username: username.toLowerCase()
          })
        })

        if (!signupRes.ok) {
          const errData = await signupRes.json()
          setError(errData.error || 'Signup failed')
          setLoading(false)
          return
        }

        const { user } = await signupRes.json()

        if (user) {
          // Auto-login by storing session
          localStorage.setItem('auth_user', JSON.stringify({
            id: user.id,
            email: user.email,
            username: user.username,
            tier: 'free'
          }))
          setLocation('/dashboard')
        }
      } else {
        // Sign in with email or username
        let signInEmail = emailOrUsername
        
        // If input doesn't contain @, treat as username and look up email
        if (!emailOrUsername.includes('@')) {
          const { data: userRecord } = await supabase
            .from('users')
            .select('email')
            .eq('username', emailOrUsername.toLowerCase())
            .single()
          
          if (!userRecord) {
            setError('Username or email not found')
            setLoading(false)
            return
          }
          signInEmail = userRecord.email
        }

        const { data, error: err } = await supabase.auth.signInWithPassword({
          email: signInEmail,
          password,
        })

        if (err) {
          setError(err.message)
          setLoading(false)
          return
        }

        if (data.user) {
          // Get user profile
          const { data: userProfile } = await supabase
            .from('users')
            .select('username, tier')
            .eq('id', data.user.id)
            .single()

          localStorage.setItem('auth_user', JSON.stringify({
            id: data.user.id,
            email: data.user.email,
            username: userProfile?.username || 'user',
            tier: userProfile?.tier || 'free'
          }))
          setLocation('/dashboard')
        }
      }
    } catch (err) {
      setError('Authentication failed: ' + String(err))
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
          <h2 className="text-3xl font-bold text-white mb-1">{isSignUp ? 'Create Account' : 'Sign In'}</h2>
          <p className="text-neutral-400 text-sm mb-6">Start your arbitrage journey</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp ? (
              <>
                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label className="block text-sm text-neutral-400 mb-2">Username</label>
                  <input
                    type="text"
                    placeholder="your_username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                    required
                    className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                    data-testid="input-username"
                  />
                  <p className="text-xs text-neutral-500 mt-1">Letters, numbers and underscore only</p>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Email or Username</label>
                <input
                  type="text"
                  placeholder="your@email.com or username"
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                  data-testid="input-email-or-username"
                />
              </div>
            )}

            <div>
              <label className="block text-sm text-neutral-400 mb-2">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                data-testid="input-password"
              />
            </div>
            
            {error && (
              <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg disabled:opacity-50 transition-all duration-200"
              data-testid="button-submit"
            >
              {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </button>

            {!isSignUp && (
              <Link href="/forgot-password">
                <button
                  type="button"
                  className="w-full text-sm text-orange-400 hover:text-orange-300 transition"
                  data-testid="button-forgot-password"
                >
                  Forgot password?
                </button>
              </Link>
            )}
            
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setIsSignUp(!isSignUp)
                setError('')
                setUsername('')
                setEmail('')
                setEmailOrUsername('')
              }}
              className="w-full text-sm text-orange-400 hover:text-orange-300 transition"
              data-testid="button-toggle-auth"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
