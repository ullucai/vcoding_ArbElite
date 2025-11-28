import express from 'express'
import axios from 'axios'
import { calculateArbitrage } from './oddsApi'

const router = express.Router()

// Health check
router.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'ArbElite API running' })
})

// Get arbitrage opportunities (demo data for now)
router.get('/opportunities', async (req, res) => {
  try {
    const opportunities = await calculateArbitrage()
    res.json(opportunities)
  } catch (error) {
    console.error('Opportunities error:', error)
    res.status(500).json({ error: 'Failed to fetch opportunities' })
  }
})

// Auth endpoint stub (Supabase handles real auth)
router.post('/auth/login', (req, res) => {
  res.json({ message: 'Use Supabase client for authentication' })
})

router.post('/auth/logout', (req, res) => {
  res.json({ message: 'Logged out' })
})

export default router

// Create user with admin privileges (bypass RLS)
router.post('/create-user', async (req, res) => {
  try {
    const { userId, email, username, tier } = req.body

    if (!userId || !email || !username) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create Supabase admin client with service role key
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

    if (!supabaseServiceKey) {
      console.error('[API] SUPABASE_SERVICE_ROLE_KEY not set')
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const admin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    // Insert user bypassing RLS
    const { data, error } = await admin
      .from('users')
      .insert({
        id: userId,
        email: email,
        username: username.toLowerCase(),
        tier: tier || 'free'
      })

    if (error) {
      console.error('[API] User creation error:', error)
      return res.status(400).json({ error: error.message })
    }

    res.json({ success: true, data })
  } catch (error) {
    console.error('[API] Create user error:', error)
    res.status(500).json({ error: 'Failed to create user' })
  }
})

