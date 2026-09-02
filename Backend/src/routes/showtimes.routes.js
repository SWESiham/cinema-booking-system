import { Router } from 'express'
import { db } from '../db.js'
import { requireAdmin } from './../middleware/auth.js';

const router = Router()

router.get('/', (req, res) => {
  const data = db.read()
  const { movieId } = req.query
  let list = data.showtimes || []
  
  if (movieId) {
    list = list.filter((s) => s.movieId === Number(movieId))
  }
  
  res.json({ success: true, showtimes: list })
})

router.get('/:id', (req, res) => {
  const data = db.read()
  const showtimeId = Number(req.params.id)
  
  const showtime = (data.showtimes || []).find((s) => s.id === showtimeId)
  
  if (!showtime) {
    return res.status(404).json({ success: false, message: 'Showtime not found' })
  }

  const movie = data.movies.find((m) => m.id === showtime.movieId)
  const hallConfig = data.halls[showtime.hall] || data.halls[1]

  const bookedSeats = (data.bookings || [])
    .filter((b) => b.showtimeId === showtime.id && b.status !== 'cancelled')
    .flatMap((b) => b.seats)

  res.json({
    success: true,
    showtime,
    movie,
    hallConfig,
    bookedSeats,
  })
})
router.post("/", requireAdmin, (req, res) => {
  const data = db.read();
  const newShowtime = {
    id: db.nextId("showtimes"),
    movieId: Number(req.body.movieId),
    date: req.body.date,
    time: req.body.time,
    hall: req.body.hall,
    price: Number(req.body.price) || 150,
    cinema: "CineBook Downtown"
  };
  
  data.showtimes.push(newShowtime);
  db.write(data);
  res.status(201).json({ success: true, showtime: newShowtime });
});
export default router