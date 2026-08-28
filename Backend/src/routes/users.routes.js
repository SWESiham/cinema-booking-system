import { Router } from 'express'
import { db } from '../db.js'
import { publicUser, requireAdmin, requireAuth } from '../middleware/auth.js'

const router = Router()
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const ROLES = ['Admin', 'Staff', 'Customer']
const STATUSES = ['Active', 'Suspended']

router.patch('/me', requireAuth, (req, res) => {
  const { name, email, bio } = req.body || {}
  const data = db.read()
  const user = data.users.find((u) => u.id === req.user.id)

  if (email !== undefined) {
    if (!EMAIL_RE.test(String(email))) {
      return res.status(400).json({ success: false, message: 'A valid email is required.' })
    }
    const taken = data.users.some((u) => u.id !== user.id && u.email.toLowerCase() === String(email).toLowerCase())
    if (taken) return res.status(409).json({ success: false, message: 'That email is already in use.' })
    user.email = String(email).toLowerCase()
  }
  if (name !== undefined) {
    if (typeof name !== 'string' || name.trim().length < 2) {
      return res.status(400).json({ success: false, message: 'Name must be at least 2 characters.' })
    }
    user.name = name.trim()
  }
  if (bio !== undefined) user.bio = String(bio)

  db.write(data)
  res.json({ success: true, message: 'Profile updated.', user: publicUser(user) })
})

router.get('/', requireAdmin, (req, res) => {
  const data = db.read()
  const q = String(req.query.q || '').toLowerCase().trim()
  const status = req.query.status || 'all'
  const role = req.query.role || 'all'

  let users = data.users
  if (q) users = users.filter((u) => `${u.name} ${u.email}`.toLowerCase().includes(q))
  if (status !== 'all') users = users.filter((u) => u.status.toLowerCase() === String(status).toLowerCase())
  if (role !== 'all') users = users.filter((u) => u.role.toLowerCase() === String(role).toLowerCase())

  res.json({ success: true, total: users.length, users: users.map(safeUser) })
})

function safeUser(user) {
  return { id: user.id, name: user.name, email: user.email, role: user.role, status: user.status, joined: user.joined, bio: user.bio || '' }
}

router.post('/', requireAdmin, (req, res) => {
  const { name, email, role } = req.body || {}
  if (!name || name.trim().length < 2) return res.status(400).json({ success: false, message: 'Name is required (min 2 characters).' })
  if (!email || !EMAIL_RE.test(String(email))) return res.status(400).json({ success: false, message: 'A valid email is required.' })
  if (role && !ROLES.includes(role)) return res.status(400).json({ success: false, message: `role must be one of: ${ROLES.join(', ')}.` })

  const data = db.read()
  const emailNormalized = String(email).toLowerCase()
  if (data.users.some((u) => u.email.toLowerCase() === emailNormalized)) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' })
  }

  const user = {
    id: db.nextId('users'),
    name: name.trim(),
    email: emailNormalized,
    password: '',
    role: role || 'Customer',
    status: 'Active',
    joined: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
    bio: '',
  }
  data.users.push(user)
  db.write(data)
  res.status(201).json({ success: true, message: 'User created.', user: safeUser(user) })
})

router.patch('/:id/status', requireAdmin, (req, res) => {
  const data = db.read()
  const user = data.users.find((u) => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ success: false, message: `User #${req.params.id} not found.` })

  const requested = req.body?.status
  if (requested !== undefined && !STATUSES.includes(requested)) {
    return res.status(400).json({ success: false, message: `status must be one of: ${STATUSES.join(', ')}.` })
  }
  user.status = requested || (user.status === 'Active' ? 'Suspended' : 'Active')
  if (user.id === req.user.id && user.status === 'Suspended') {
    return res.status(400).json({ success: false, message: 'You cannot suspend your own account.' })
  }
  db.write(data)
  res.json({ success: true, message: `User is now ${user.status}.`, user: safeUser(user) })
})

router.patch('/:id/role', requireAdmin, (req, res) => {
  const role = req.body?.role
  if (!ROLES.includes(role)) return res.status(400).json({ success: false, message: `role must be one of: ${ROLES.join(', ')}.` })
  const data = db.read()
  const user = data.users.find((u) => u.id === Number(req.params.id))
  if (!user) return res.status(404).json({ success: false, message: `User #${req.params.id} not found.` })
  user.role = role
  db.write(data)
  res.json({ success: true, message: `Role set to ${role}.`, user: safeUser(user) })
})

router.delete('/:id', requireAdmin, (req, res) => {
  const data = db.read()
  const id = Number(req.params.id)
  const index = data.users.findIndex((u) => u.id === id)
  if (index === -1) return res.status(404).json({ success: false, message: `User #${req.params.id} not found.` })
  if (id === req.user.id) return res.status(400).json({ success: false, message: 'You cannot delete your own account.' })

  const [removed] = data.users.splice(index, 1)
  data.bookings = data.bookings.filter((b) => b.userId !== removed.id)
  db.write(data)
  res.json({ success: true, message: `User '${removed.name}' deleted.` })
})

export default router
