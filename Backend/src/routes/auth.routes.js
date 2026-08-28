import { Router } from 'express'
import { db } from '../db.js'
import { hashPassword, verifyPassword } from '../lib/passwords.js'
import { issueToken } from '../lib/tokens.js'
import { publicUser, requireAuth } from '../middleware/auth.js'

const router = Router()
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

router.post('/register', (req, res) => {
  const { name, email, password } = req.body || {}
  if (!name || typeof name !== 'string' || name.trim().length < 2) {
    return res.status(400).json({ success: false, message: 'Name is required (min 2 characters).' })
  }
  if (!email || !EMAIL_RE.test(String(email))) {
    return res.status(400).json({ success: false, message: 'A valid email is required.' })
  }
  if (!password || String(password).length < 6) {
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' })
  }

  const data = db.read()
  const emailNormalized = String(email).toLowerCase()
  if (data.users.some((u) => u.email.toLowerCase() === emailNormalized)) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
  }

  const user = {
    id: db.nextId('users'),
    name: name.trim(),
    email: emailNormalized,
    password: hashPassword(String(password)),
    role: 'Customer',
    status: 'Active',
    joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    bio: '',
  }
  data.users.push(user)
  db.write(data)

  res.status(201).json({
    success: true,
    message: 'Account created.',
    token: issueToken(user),
    user: publicUser(user),
  })
})

router.post('/login', (req, res) => {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' })
  }
  const data = db.read()
  const user = data.users.find((u) => u.email.toLowerCase() === String(email).toLowerCase())
  if (!user || !verifyPassword(String(password), user.password)) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' })
  }
  if (user.status !== 'Active') {
    return res.status(403).json({ success: false, message: 'This account is suspended. Contact an administrator.' })
  }
  res.json({ success: true, message: 'Logged in.', token: issueToken(user), user: publicUser(user) })
})

router.get('/me', requireAuth, (req, res) => {
  res.json({ success: true, user: req.user })
})

export default router
