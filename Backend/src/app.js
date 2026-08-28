import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { db } from "./db.js";
import { attachUser } from "./middleware/auth.js";
import { cors, errorHandler, notFound } from "./middleware/common.js";
import authRoutes from "./routes/auth.routes.js";
import genresRoutes from "./routes/genres.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
import bookingsRoutes from "./routes/bookings.routes.js";
import usersRoutes from "./routes/users.routes.js";
import showtimesRoutes from "./routes/showtimes.routes.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.set("db", db);
app.disable("x-powered-by");

app.use(cors);
app.use(express.json({ limit: "1mb" }));
app.use(attachUser);

app.use((req, _res, next) => {
  if (req.path.startsWith("/api"))
    console.log(`${req.method} ${req.originalUrl}`);
  next();
});

app.get("/api/health", (_req, res) => {
  const data = db.read();
  res.json({
    success: true,
    status: "ok",
    uptimeSeconds: Math.round(process.uptime()),
    storage: db.filePath,
    counts: {
      movies: (data.movies || []).length,
      users: (data.users || []).length,
      genres: (data.genres || []).length,
      showtimes: (data.showtimes || []).length,
      bookings: (data.bookings || []).length,
    },
  });
});

app.get("/api/stats/me", (req, res) => {
  if (!req.user)
    return res
      .status(401)
      .json({ success: false, message: "Authentication required." });
  const data = db.read();
  const myBookings = data.bookings.filter((b) => b.userId === req.user.id);
  const totalSpent = myBookings.reduce((sum, b) => sum + b.totalPrice, 0);
  const totalTickets = myBookings.reduce((sum, b) => sum + b.seats.length, 0);
  res.json({
    success: true,
    stats: {
      totalBookings: myBookings.length,
      totalSpent: Math.round(totalSpent * 100) / 100,
      totalTickets,
      upcomingShows: myBookings.filter((b) => b.status === "confirmed").length,
    },
  });
});

app.get("/api/stats/admin", (req, res) => {
  if (!req.user || req.user.role !== "Admin") {
    return res
      .status(403)
      .json({ success: false, message: "Admin role required." });
  }
  const data = db.read();
  const totalRevenue = data.bookings.reduce((sum, b) => sum + b.totalPrice, 0);
  res.json({
    success: true,
    stats: {
      totalMovies: data.movies.length,
      nowShowing: data.movies.filter((m) => m.status === "now_showing").length,
      comingSoon: data.movies.filter((m) => m.status === "coming_soon").length,
      totalUsers: data.users.length,
      activeUsers: data.users.filter((u) => u.status === "Active").length,
      totalBookings: data.bookings.length,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
    },
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/genres", genresRoutes);
app.use("/api/showtimes", showtimesRoutes);
app.use("/api/bookings", bookingsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/movies", moviesRoutes);

app.get("/docs", (_req, res) =>
  res.sendFile(path.join(__dirname, "..", "docs", "api-docs.html")),
);
app.get("/docs/openapi.json", (_req, res) =>
  res.sendFile(path.join(__dirname, "..", "docs", "openapi.json")),
);
app.get("/", (_req, res) => res.redirect("/docs"));

app.use(notFound);
app.use(errorHandler);

export default app;
