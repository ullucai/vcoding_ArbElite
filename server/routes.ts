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
