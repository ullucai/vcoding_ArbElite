import { useState } from 'react'
import { useLocation } from 'wouter'
import { supabase } from '../lib/supabase'

export default function Login() {
  const [, setLocation] = useLocation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
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
          .eq('username', username)
          .single()
        
        if (existingUser) {
          setError('Bu kullanıcı adı zaten alınmış')
          setLoading(false)
          return
        }

        // Sign up with Supabase
        const { data, error: err } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin + '/dashboard',
            data: {
              username: username,
              tier: 'free'
            }
          }
        })

        if (err) {
          setError(err.message)
        } else if (data.user) {
          // Insert user into users table
          const { error: insertErr } = await supabase
            .from('users')
            .insert({
              id: data.user.id,
              email: data.user.email,
              username: username,
              tier: 'free'
            })

          if (insertErr) {
            setError('Profil oluşturulurken hata: ' + insertErr.message)
          } else {
            // Auto-login by storing session
            localStorage.setItem('auth_user', JSON.stringify({
              id: data.user.id,
              email: data.user.email,
              username: username,
              tier: 'free'
            }))
            setLocation('/dashboard')
          }
        }
      } else {
        // Sign in
        const { data, error: err } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (err) {
          setError(err.message)
        } else if (data.user) {
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
      setError('Kimlik doğrulama başarısız')
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
          <h2 className="text-3xl font-bold text-white mb-1">{isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}</h2>
          <p className="text-neutral-400 text-sm mb-6">Arbitraj yolculuğunu başlat</p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
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

            {isSignUp && (
              <div>
                <label className="block text-sm text-neutral-400 mb-2">Kullanıcı Adı</label>
                <input
                  type="text"
                  placeholder="your_username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s+/g, '_'))}
                  required={isSignUp}
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 hover:border-white/20 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-orange-500/50 transition"
                  data-testid="input-username"
                />
                <p className="text-xs text-neutral-500 mt-1">İngilizce harf, rakam ve alt çizgi</p>
              </div>
            )}

            <div>
              <label className="block text-sm text-neutral-400 mb-2">Şifre</label>
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
              className="w-full py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg disabled:opacity-50 transition-all duration-200 hover:scale-105 active:scale-95"
              data-testid="button-submit"
            >
              {loading ? 'Yükleniyor...' : isSignUp ? 'Hesap Oluştur' : 'Giriş Yap'}
            </button>
            
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                setIsSignUp(!isSignUp)
                setError('')
                setUsername('')
              }}
              className="w-full text-sm text-orange-400 hover:text-orange-300 transition"
              data-testid="button-toggle-auth"
            >
              {isSignUp ? 'Zaten hesabın var mı? Giriş Yap' : 'Hesap oluştur'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
