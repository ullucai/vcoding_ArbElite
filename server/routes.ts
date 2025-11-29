import express from 'express'
import axios from 'axios'
import crypto from 'crypto'
import { calculateArbitrage } from './oddsApi'
import { createClient } from '@supabase/supabase-js'

const router = express.Router()

// In-memory token storage (for demo - use Redis in production)
const resetTokens: Record<string, { userId: string; email: string; expires: number }> = {}

// Sign up endpoint - works with or without service role key
router.post('/auth/signup', async (req, res) => {
  try {
    const { email, password, username } = req.body

    if (!email || !password || !username) {
      return res.status(400).json({ error: 'Email, password, and username are required' })
    }

    const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || ''

    let authData: any = null
    let authError: any = null

    if (supabaseServiceKey) {
      // WITH service role - bypass email verification
      console.log('[API] Using admin auth to bypass email verification')
      const admin = createClient(supabaseUrl, supabaseServiceKey, {
        auth: { persistSession: false }
      })

      const result = await admin.auth.admin.createUser({
        email,
        password,
        email_confirm: true,  // Bypass email verification
        user_metadata: {
          username: username.toLowerCase()
        }
      })
      authData = result.data
      authError = result.error
    } else {
      // WITHOUT service role - use regular signup (email verification required)
      console.log('[API] Using regular auth - email verification may be required')
      const client = createClient(supabaseUrl, supabaseAnonKey)
      
      const result = await client.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username.toLowerCase()
          }
        }
      })
      authData = result.data
      authError = result.error
    }

    if (authError) {
      console.error('[API] Auth user creation error:', authError)
      return res.status(400).json({ error: authError.message })
    }

    if (!authData?.user) {
      return res.status(400).json({ error: 'User creation failed' })
    }

    // Create user profile in users table (use service role if available)
    const profileClient = supabaseServiceKey 
      ? createClient(supabaseUrl, supabaseServiceKey, { auth: { persistSession: false } })
      : createClient(supabaseUrl, supabaseAnonKey)

    const { error: profileError } = await profileClient
      .from('users')
      .insert({
        id: authData.user.id,
        email: email,
        username: username.toLowerCase(),
        tier: 'free'
      })

    if (profileError) {
      console.warn('[API] Profile creation warning:', profileError)
      // Don't fail - auth user was created successfully
    }

    res.json({
      user: {
        id: authData.user.id,
        email: authData.user.email,
        username: username.toLowerCase()
      }
    })
  } catch (error) {
    console.error('[API] Signup error:', error)
    res.status(500).json({ error: 'Signup failed: ' + String(error).substring(0, 100) })
  }
})

// Create user with admin privileges (bypass RLS)
router.post('/create-user', async (req, res) => {
  try {
    const { userId, email, username, tier } = req.body

    if (!userId || !email || !username) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Create Supabase admin client with service role key
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

// Forgot password endpoint
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body

    if (!email) {
      return res.status(400).json({ error: 'Email is required' })
    }

    // Create Supabase admin client
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

    if (!supabaseServiceKey) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const admin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    // Check if user exists
    const { data: user, error: userError } = await admin
      .from('users')
      .select('id, email')
      .eq('email', email)
      .single()

    if (userError || !user) {
      // Don't reveal if email exists for security
      return res.json({ success: true, message: 'If email exists, reset link will be sent' })
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex')
    resetTokens[resetToken] = {
      userId: user.id,
      email: user.email,
      expires: Date.now() + 3600000 // 1 hour
    }

    // Build reset link
    const resetLink = `${process.env.FRONTEND_URL || 'http://localhost:5000'}/reset-password?token=${resetToken}`

    // Send email using Resend
    const resendApiKey = process.env.RESEND_API_KEY
    if (!resendApiKey) {
      console.warn('[API] RESEND_API_KEY not configured, skipping email')
      return res.json({ success: true, message: 'If email exists, reset link will be sent' })
    }

    const emailTemplate = `
      <html>
        <body style="font-family: Arial, sans-serif; background-color: #0a0a0a; color: #fff;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #0f0f0f; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 40px;">
            <h1 style="color: #fff; margin-bottom: 20px;">Reset Your Password</h1>
            <p style="color: #9ca3af; margin-bottom: 20px;">We received a request to reset your ArbElite password. Click the link below to set a new password:</p>
            
            <a href="${resetLink}" style="display: inline-block; background: linear-gradient(to right, #f97316, #ea580c); color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold; margin: 20px 0;">
              Reset Password
            </a>
            
            <p style="color: #9ca3af; margin-top: 30px; font-size: 14px;">Or paste this link in your browser:</p>
            <p style="color: #f97316; word-break: break-all; font-size: 12px;">${resetLink}</p>
            
            <p style="color: #6b7280; margin-top: 30px; font-size: 12px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 20px;">
              This link will expire in 1 hour. If you didn't request this, please ignore this email.
            </p>
            
            <p style="color: #6b7280; margin-top: 20px; font-size: 12px;">
              ArbElite Team<br/>
              info@arbelite.co
            </p>
          </div>
        </body>
      </html>
    `

    try {
      await axios.post(
        'https://api.resend.com/emails',
        {
          from: 'info@arbelite.co',
          to: user.email,
          subject: 'Reset Your ArbElite Password',
          html: emailTemplate
        },
        {
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            'Content-Type': 'application/json'
          }
        }
      )
    } catch (emailError) {
      console.warn('[API] Email sending failed, continuing anyway')
    }

    res.json({ success: true, message: 'If email exists, reset link will be sent' })
  } catch (error) {
    console.error('[API] Forgot password error:', error)
    res.status(500).json({ error: 'Failed to process reset request' })
  }
})

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
  try {
    const { token, password } = req.body

    if (!token || !password) {
      return res.status(400).json({ error: 'Token and password are required' })
    }

    // Validate token
    const tokenData = resetTokens[token]
    if (!tokenData) {
      return res.status(400).json({ error: 'Invalid or expired reset token' })
    }

    if (tokenData.expires < Date.now()) {
      delete resetTokens[token]
      return res.status(400).json({ error: 'Reset token has expired' })
    }

    // Create Supabase admin client
    const { createClient } = await import('@supabase/supabase-js')
    const supabaseUrl = process.env.VITE_SUPABASE_URL || ''
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

    if (!supabaseServiceKey) {
      return res.status(500).json({ error: 'Server configuration error' })
    }

    const admin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: { persistSession: false }
    })

    // Update user password using Supabase auth
    const { error } = await admin.auth.admin.updateUserById(tokenData.userId, {
      password: password
    })

    if (error) {
      console.error('[API] Password update error:', error)
      return res.status(400).json({ error: 'Failed to update password' })
    }

    // Delete used token
    delete resetTokens[token]

    res.json({ success: true, message: 'Password reset successfully' })
  } catch (error) {
    console.error('[API] Reset password error:', error)
    res.status(500).json({ error: 'Failed to reset password' })
  }
})

export default router
