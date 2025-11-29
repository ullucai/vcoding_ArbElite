import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://0ec90b57d6e95fcbda19832f.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJib2x0IiwicmVmIjoiMGVjOTBiNTdkNmU5NWZjYmRhMTk4MzJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg4ODE1NzQsImV4cCI6MTc1ODg4MTU3NH0.9I8-U0x86Ak8t2DGaIk0HfvTSLsAyzdnz-Nw00mMkKw'

console.log('Supabase initialized:', { url: supabaseUrl, hasKey: !!supabaseAnonKey })

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
