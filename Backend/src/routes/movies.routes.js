import { Router } from "express";
import { db } from "../db.js";
import { requireAdmin } from "../middleware/auth.js";

const router = Router();
const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi", "Animation", "Fantasy", "Family", "Adventure"];
const STATUSES = ["now_showing", "coming_soon", "ended"];

function validateMoviePayload(body, { partial = false } = {}) {
  const errors = [];
  if (!partial || body.title !== undefined) {
    if (!body.title || typeof body.title !== "string" || body.title.trim().length < 2)
      errors.push("title is required (min 2 characters).");
  }
  if (!partial || body.description !== undefined) {
    if (!body.description || typeof body.description !== "string" || body.description.trim().length < 10)
      errors.push("description is required (min 10 characters).");
  }
  if (!partial || body.director !== undefined) {
    if (!body.director || typeof body.director !== "string" || body.director.trim().length < 2)
      errors.push("director is required (min 2 characters).");
  }

  // التعديل: السماح بأي عدد من التصنيفات وأي اسم بدون التقيد بقائمة محددة
  if (!partial || body.genre !== undefined) {
    if (body.genre) {
      if (!Array.isArray(body.genre) && typeof body.genre !== 'string') {
        errors.push("genre must be a string or an array of strings.");
      }
    }
  }

  if (body.price !== undefined && body.price !== "" && (Number.isNaN(Number(body.price)) || Number(body.price) < 0)) {
    errors.push("price must be a non-negative number.");
  }
  if (body.duration !== undefined && body.duration !== "" && (Number.isNaN(Number(body.duration)) || Number(body.duration) < 1)) {
    errors.push("duration must be a positive number (minutes).");
  }
  if (body.rating !== undefined && body.rating !== "" && (Number.isNaN(Number(body.rating)) || Number(body.rating) < 0 || Number(body.rating) > 10)) {
    errors.push("rating must be between 0 and 10.");
  }
  if (body.status && !STATUSES.includes(body.status))
    errors.push(`status must be one of: ${STATUSES.join(", ")}.`);
  return errors;
}

router.get("/", (req, res) => {
  const data = db.read();
  const q = String(req.query.q || "").toLowerCase().trim();
  const genre = req.query.genre || "all";
  const status = req.query.status || "all";

  const filtered = data.movies.filter((m) => {
    const matchesQuery =
      !q ||
      `${m.title} ${m.description} ${m.director} ${(m.cast || []).join(" ")}`.toLowerCase().includes(q);
    
    const matchesGenre = genre === "all" || (Array.isArray(m.genre) ? m.genre.includes(genre) : m.genre === genre);
    const matchesStatus = status === "all" || m.status === status;
    
    return matchesQuery && matchesGenre && matchesStatus;
  });

  res.json({ success: true, total: filtered.length, movies: filtered });
});

router.post("/", requireAdmin, (req, res) => {
  const errors = validateMoviePayload(req.body || {});
  if (errors.length)
    return res.status(400).json({ success: false, message: errors.join(" "), errors });

  const data = db.read();
  const now = new Date().toISOString();

  const m = {
    id: db.nextId("movies"),
    title: req.body.title.trim(),
    description: req.body.description.trim(),
    genre: req.body.genre || ["Drama"],
    director: req.body.director.trim(),
    cast: Array.isArray(req.body.cast) ? req.body.cast : [],
    duration: Number(req.body.duration) || 120,
    rating: Number(req.body.rating) || 0,
    price: req.body.price === "" || req.body.price === undefined ? 150 : Number(req.body.price),
    releaseDate: req.body.releaseDate || "",
    status: req.body.status || "coming_soon",
    poster: req.body.poster || "",
    backdrop: req.body.backdrop || "",
    ageRating: req.body.ageRating || "PG",
    language: req.body.language || "English",
    createdAt: now,
    updatedAt: now,
  };
  data.movies.push(m);
  db.write(data);
  res.status(201).json({ success: true, message: "Movie created.", movie: m });
});

router.get("/:id", (req, res) => {
  const data = db.read();
  const id = Number(req.params.id);
  const m = data.movies.find((item) => item.id === id);
  if (!m)
    return res.status(404).json({ success: false, message: `Movie '${req.params.id}' not found.` });
  res.json({ success: true, movie: m });
});

router.put("/:id", requireAdmin, (req, res) => {
  const data = db.read();
  const id = Number(req.params.id);
  const m = data.movies.find((item) => item.id === id);
  if (!m)
    return res.status(404).json({ success: false, message: `Movie '${req.params.id}' not found.` });

  const errors = validateMoviePayload(req.body || {}, { partial: true });
  if (errors.length)
    return res.status(400).json({ success: false, message: errors.join(" "), errors });

  const allowed = [
    "title",
    "description",
    "genre",
    "director",
    "cast",
    "duration",
    "rating",
    "price",
    "releaseDate",
    "status",
    "poster",
    "backdrop",
    "ageRating",
    "language",
  ];
  for (const key of allowed) {
    if (req.body[key] !== undefined) {
      if (key === "price" || key === "duration" || key === "rating") {
        m[key] = req.body[key] === "" ? 0 : Number(req.body[key]);
      } else {
        m[key] = req.body[key];
      }
    }
  }
  m.updatedAt = new Date().toISOString();
  db.write(data);
  res.json({ success: true, message: "Movie updated.", movie: m });
});

router.delete("/:id", requireAdmin, (req, res) => {
  const data = db.read();
  const id = Number(req.params.id);
  const index = data.movies.findIndex((item) => item.id === id);
  if (index === -1)
    return res.status(404).json({ success: false, message: `Movie '${req.params.id}' not found.` });

  const [removed] = data.movies.splice(index, 1);
  db.write(data);
  res.json({ success: true, message: `Movie '${removed.title}' deleted.` });
});

export default router;