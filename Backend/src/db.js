import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildSeedData } from './seed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, '..', 'data')
const DB_FILE = path.join(DATA_DIR, 'db.json')

let writeChain = Promise.resolve()

function ensureDbFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(buildSeedData(), null, 2))
    console.log(`[db] created seed database at ${DB_FILE}`)
  }
}

function readFile() {
  ensureDbFile()
  try {
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'))
  } catch {
    console.error('[db] db.json is corrupted, resetting to seed data')
    const seed = buildSeedData()
    fs.writeFileSync(DB_FILE, JSON.stringify(seed, null, 2))
    return seed
  }
}

function writeFile(data) {
  const tmp = `${DB_FILE}.tmp`
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2))
  fs.renameSync(tmp, DB_FILE)
}

export const db = {
  read() {
    return readFile()
  },
  write(data) {
    writeChain = writeChain.then(() => writeFile(data)).catch((err) => {
      console.error('[db] write failed:', err.message)
      throw err
    })
    return writeChain
  },
  nextId(collection) {
    const data = readFile()
    const items = data[collection] || []
    return items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1
  },
  filePath: DB_FILE,
}
