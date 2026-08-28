import crypto from 'node:crypto'

const SECRET = process.env.TOKEN_SECRET || 'cinebook-dev-secret-change-me'
const DEFAULT_TTL_SECONDS = 60 * 60 * 24 * 7

function base64url(input) {
  return Buffer.from(input).toString('base64url')
}

function sign(payload) {
  return crypto.createHmac('sha256', SECRET).update(payload).digest('base64url')
}

export function issueToken(user, ttlSeconds = DEFAULT_TTL_SECONDS) {
  const header = base64url(JSON.stringify({ alg: 'HS256', typ: 'JWT-like' }))
  const body = base64url(
    JSON.stringify({
      sub: user.id,
      email: user.email,
      role: user.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + ttlSeconds,
    }),
  )
  return `${header}.${body}.${sign(`${header}.${body}`)}`
}

export function verifyToken(token) {
  if (typeof token !== 'string') return null
  const parts = token.split('.')
  if (parts.length !== 3) return null
  const [header, body, signature] = parts
  const expected = sign(`${header}.${body}`)
  const a = Buffer.from(signature)
  const b = Buffer.from(expected)
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null
  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8'))
    if (typeof payload.exp === 'number' && payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function newId() {
  return crypto.randomUUID()
}
