import { Router } from 'express'
import { db } from '../db.js'

const router = Router()

router.get('/', (_req, res) => {
  const data = db.read()
  const genres = data.genres.map((genre) => ({
    ...genre,
    count: data.movies.filter((m) => m.genre.includes(genre.title)).length,
  }))
  res.json({ success: true, genres })
})

export default router