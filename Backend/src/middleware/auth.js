import { verifyToken } from '../lib/tokens.js'

function readToken(req) {
  const header = req.headers.authorization || ''
  if (header.startsWith('Bearer ')) return header.slice(7).trim()
  return null
}

export function attachUser(req, _res, next) {
  const token = readToken(req)
  const payload = token ? verifyToken(token) : null
  if (payload) {
    req.auth = payload
    const user = req.app.get('db').read().users.find((u) => u.id === payload.sub || u.id === Number(payload.sub))
    req.user = user && user.status === 'Active' ? publicUser(user) : null
  }
  next()
}

export function requireAuth(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required. Send a valid Bearer token.' })
  }
  next()
}

export function requireAdmin(req, res, next) {
  if (!req.user) {
    return res.status(401).json({ success: false, message: 'Authentication required. Send a valid Bearer token.' })
  }
  if (req.user.role !== 'Admin') {
    return res.status(403).json({ success: false, message: 'Admin role required.' })
  }
  next()
}

export function publicUser(user) {
  if (!user) return null
  const { password, ...rest } = user
  return rest
}
