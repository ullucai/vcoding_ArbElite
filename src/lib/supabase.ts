import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface User {
  id: string
  email: string
  tier: 'free' | 'premium'
  created_at: string
}

export interface AuthResponse {
  user?: User
  error?: string
}

export const auth = {
  async login(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    
    if (error) return { error: error.message }
    if (data.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email || '',
          tier: 'free',
          created_at: data.user.created_at || new Date().toISOString(),
        },
      }
    }
    return { error: 'Login failed' }
  },

  async register(email: string, password: string): Promise<AuthResponse> {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })
    
    if (error) return { error: error.message }
    if (data.user) {
      return {
        user: {
          id: data.user.id,
          email: data.user.email || '',
          tier: 'free',
          created_at: data.user.created_at || new Date().toISOString(),
        },
      }
    }
    return { error: 'Registration failed' }
  },

  async logout() {
    await supabase.auth.signOut()
  },

  async getSession() {
    const { data } = await supabase.auth.getSession()
    return data.session
  }
}
