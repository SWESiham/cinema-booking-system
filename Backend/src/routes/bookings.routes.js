import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
const STATUSES = ["pending", "confirmed", "cancelled", "refunded"];

router.post('/', requireAuth, (req, res) => {
  const data = db.read();
  
  const showtimeId = Number(req.body.showtimeId || req.body.showtime);
  const movieId = Number(req.body.movieId || req.body.movie);
  const seats = req.body.seats || [];
  const totalPrice = Number(req.body.totalPrice || req.body.price || req.body.total || 0);

  if (!showtimeId || seats.length === 0) {
    return res.status(400).json({ success: false, message: 'Invalid booking data' });
  }

  const showtime = data.showtimes?.find(s => s.id === showtimeId) || {};
  const movie = data.movies?.find(m => m.id === (movieId || showtime.movieId)) || {};

  const newBooking = {
    id: db.nextId('bookings'),
    userId: req.user.id,
    showtimeId: showtimeId,
    movieId: movie.id || movieId,
    movieTitle: req.body.movieTitle || movie.title || 'Unknown Movie', // ✨ بياخد الاسم من الفرونت
    poster: req.body.poster || movie.poster || '',                     // ✨ بياخد الصورة من الفرونت
    date: showtime.date || '',
    time: showtime.time || '',
    cinema: showtime.cinema || 'CineBook Downtown',
    hall: showtime.hall || 'Hall 1',
    seats: seats,
    totalPrice: totalPrice,
    status: 'pending', 
    createdAt: new Date().toISOString()
  };

  if (!data.bookings) data.bookings = [];
  data.bookings.push(newBooking);
  db.write(data);

  res.status(201).json({ success: true, message: 'Booking pending admin approval!', booking: newBooking });
});

router.get("/me", requireAuth, (req, res) => {
  const data = db.read();
  const mine = data.bookings.filter((b) => b.userId === req.user.id);
  res.json({ success: true, total: mine.length, bookings: mine });
});

router.get("/", requireAdmin, (req, res) => {
  const data = db.read();
  const q = String(req.query.q || "")
    .toLowerCase()
    .trim();
  const status = req.query.status || "all";

  let bookings = data.bookings || [];
  if (q) {
    bookings = bookings.filter((b) =>
      `${b.id} ${b.movieTitle} ${b.seats.join(" ")}`.toLowerCase().includes(q),
    );
  }
  if (status !== "all") bookings = bookings.filter((b) => b.status === status);

  res.json({ success: true, total: bookings.length, bookings });
});

router.patch("/:bookingId/status", requireAuth, (req, res) => {
  const { status } = req.body || {};
  if (!STATUSES.includes(status)) {
    return res
      .status(400)
      .json({
        success: false,
        message: `status must be one of: ${STATUSES.join(", ")}.`,
      });
  }

  const data = db.read();
  
  // ✨ التعديل هنا: حولنا الاتنين لـ String عشان المطابقة تنجح دايماً
  const booking = data.bookings.find((b) => String(b.id) === String(req.params.bookingId));
  
  if (!booking)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found." });

  if (req.user.role === "Customer" && booking.userId !== req.user.id) {
    return res
      .status(403)
      .json({
        success: false,
        message: "You can only update your own bookings.",
      });
  }

  booking.status = status;
  booking.updatedAt = new Date().toISOString();
  db.write(data);
  res.json({
    success: true,
    message: `Booking status updated to '${status}'.`,
    booking,
  });
});

router.delete("/:bookingId", requireAuth, (req, res) => {
  const data = db.read();
  
  // ✨ التعديل هنا كمان في دالة الحذف
  const index = data.bookings.findIndex((b) => String(b.id) === String(req.params.bookingId));
  
  if (index === -1)
    return res
      .status(404)
      .json({ success: false, message: "Booking not found." });

  const booking = data.bookings[index];
  if (req.user.role === "Customer" && booking.userId !== req.user.id) {
    return res
      .status(403)
      .json({
        success: false,
        message: "You can only cancel your own bookings.",
      });
  }

  data.bookings.splice(index, 1);
  db.write(data);
  res.json({ success: true, message: `Booking deleted.` });
});

export default router;
