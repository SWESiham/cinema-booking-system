import { Router } from "express";
import { db } from "../db.js";
import { requireAuth, requireAdmin } from "../middleware/auth.js";

const router = Router();
const STATUSES = ["pending", "confirmed", "cancelled", "refunded"];

router.post("/", requireAuth, (req, res) => {
  const { showtimeId, seats } = req.body || {};

  if (!showtimeId || !Array.isArray(seats) || seats.length === 0) {
    return res
      .status(400)
      .json({
        success: false,
        message: "showtimeId and seats array are required.",
      });
  }

  const data = db.read();
  const showtime = (data.showtimes || []).find((s) => s.id === showtimeId);
  if (!showtime)
    return res
      .status(404)
      .json({ success: false, message: "Showtime not found." });

  const movie = data.movies.find((m) => m.id === showtime.movieId);

  const existingBooked = data.bookings
    .filter((b) => b.showtimeId === showtimeId && b.status !== "cancelled")
    .flatMap((b) => b.seats);

  const conflict = seats.find((s) => existingBooked.includes(s));
  if (conflict) {
    return res
      .status(409)
      .json({
        success: false,
        message: `Seat ${conflict} is already booked for this show.`,
      });
  }

  const totalPrice = seats.length * showtime.price;

  const booking = {
    id: `b-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    userId: req.user.id,
    showtimeId: showtime.id,
    movieId: movie.id,
    movieTitle: movie.title,
    hall: showtime.hall,
    seats,
    pricePerSeat: showtime.price,
    totalPrice,
    status: "confirmed",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  data.bookings.push(booking);
  db.write(data);

  res
    .status(201)
    .json({
      success: true,
      message: `${seats.length} ticket(s) booked.`,
      booking,
    });
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
  const booking = data.bookings.find((b) => b.id === req.params.bookingId);
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
  const index = data.bookings.findIndex((b) => b.id === req.params.bookingId);
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
