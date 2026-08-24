export const mockMovies = [
  {
    id: "m1",
    title: "Nebula Horizon",
    genre: ["Sci-Fi", "Adventure"],
    duration: 138,
    rating: 8.4,
    ageRating: "PG-13",
    poster: "https://picsum.photos/seed/nebula/400/600",
    backdrop: "https://picsum.photos/seed/nebula-wide/1200/500",
    description:
      "A deep-space crew discovers a signal older than the universe itself — and must decide whether to answer it.",
    language: "English",
  },
  {
    id: "m2",
    title: "Crimson Alley",
    genre: ["Thriller", "Crime"],
    duration: 112,
    rating: 7.6,
    ageRating: "16+",
    poster: "https://picsum.photos/seed/crimson/400/600",
    backdrop: "https://picsum.photos/seed/crimson-wide/1200/500",
    description:
      "A detective with nothing left to lose hunts a killer who only strikes on rainy nights.",
    language: "English",
  },
  {
    id: "m3",
    title: "The Last Orchard",
    genre: ["Drama"],
    duration: 124,
    rating: 8.9,
    ageRating: "PG",
    poster: "https://picsum.photos/seed/orchard/400/600",
    backdrop: "https://picsum.photos/seed/orchard-wide/1200/500",
    description:
      "Three siblings return to their childhood farm one last summer before it is sold.",
    language: "Arabic",
  },
  {
    id: "m4",
    title: "Iron Circuit",
    genre: ["Action", "Sci-Fi"],
    duration: 129,
    rating: 7.9,
    ageRating: "PG-13",
    poster: "https://picsum.photos/seed/ironcircuit/400/600",
    backdrop: "https://picsum.photos/seed/ironcircuit-wide/1200/500",
    description:
      "An ex-soldier turned mercenary takes on one final job: steal the AI that started the war.",
    language: "English",
  },
  {
    id: "m5",
    title: "Laughing Gas",
    genre: ["Comedy"],
    duration: 98,
    rating: 6.8,
    ageRating: "PG-13",
    poster: "https://picsum.photos/seed/laughinggas/400/600",
    backdrop: "https://picsum.photos/seed/laughinggas-wide/1200/500",
    description:
      "Two rival dentists are forced into a road trip after a mix-up leaves them both broke.",
    language: "English",
  },
  {
    id: "m6",
    title: "Whispers of Cairo",
    genre: ["Drama", "Romance"],
    duration: 116,
    rating: 8.2,
    ageRating: "PG",
    poster: "https://picsum.photos/seed/cairo/400/600",
    backdrop: "https://picsum.photos/seed/cairo-wide/1200/500",
    description:
      "A love story spanning three decades of a changing city, told backwards from its final goodbye.",
    language: "Arabic",
  },
];

// Showtimes reference movieId. price is in EGP.
export const mockShowtimes = [
  {
    id: "s1",
    movieId: "m1",
    cinema: "CineBook Downtown",
    hall: "Hall 3 · IMAX",
    date: "2026-08-24",
    time: "18:30",
    price: 220,
  },
  {
    id: "s2",
    movieId: "m1",
    cinema: "CineBook Downtown",
    hall: "Hall 1",
    date: "2026-08-24",
    time: "21:15",
    price: 150,
  },
  {
    id: "s3",
    movieId: "m1",
    cinema: "CineBook Mall of Arabia",
    hall: "Hall 5",
    date: "2026-08-25",
    time: "19:00",
    price: 160,
  },
  {
    id: "s4",
    movieId: "m2",
    cinema: "CineBook Downtown",
    hall: "Hall 2",
    date: "2026-08-24",
    time: "17:00",
    price: 140,
  },
  {
    id: "s5",
    movieId: "m2",
    cinema: "CineBook Nile View",
    hall: "Hall 4 · VIP",
    date: "2026-08-25",
    time: "22:00",
    price: 260,
  },
  {
    id: "s6",
    movieId: "m3",
    cinema: "CineBook Nile View",
    hall: "Hall 1",
    date: "2026-08-24",
    time: "16:15",
    price: 130,
  },
  {
    id: "s7",
    movieId: "m4",
    cinema: "CineBook Mall of Arabia",
    hall: "Hall 2 · IMAX",
    date: "2026-08-24",
    time: "20:00",
    price: 230,
  },
  {
    id: "s8",
    movieId: "m5",
    cinema: "CineBook Downtown",
    hall: "Hall 6",
    date: "2026-08-26",
    time: "15:30",
    price: 120,
  },
  {
    id: "s9",
    movieId: "m6",
    cinema: "CineBook Nile View",
    hall: "Hall 3",
    date: "2026-08-25",
    time: "18:45",
    price: 150,
  },
];

// Seat layout: 8 rows (A-H) x 10 columns per showtime, some pre-booked.
export const mockBookedSeats = {
  s1: ["A3", "A4", "B5", "B6", "C7", "D2", "F8", "F9", "G1"],
  s2: ["A1", "A2", "C3", "C4", "C5", "E6"],
  s3: ["B2", "B3", "D5", "D6", "D7"],
  s4: ["A5", "A6", "A7", "B8", "H1", "H2"],
  s5: ["C1", "C2", "C3", "F4", "F5"],
  s6: ["A1", "B1", "B2"],
  s7: ["D4", "D5", "D6", "D7", "E4", "E5"],
  s8: [],
  s9: ["G8", "G9", "G10"],
};

// A user's past/upcoming bookings — used on the My Bookings page.
export const mockBookings = [
  {
    id: "b1",
    movieId: "m1",
    showtimeId: "s1",
    seats: ["E4", "E5"],
    total: 440,
    bookedAt: "2026-08-20T14:32:00",
    status: "confirmed",
  },
  {
    id: "b2",
    movieId: "m4",
    showtimeId: "s7",
    seats: ["B3"],
    total: 230,
    bookedAt: "2026-08-18T09:10:00",
    status: "confirmed",
  },
  {
    id: "b3",
    movieId: "m3",
    showtimeId: "s6",
    seats: ["C5", "C6", "C7"],
    total: 390,
    bookedAt: "2026-08-10T20:05:00",
    status: "cancelled",
  },
];

// ---- Helpers --------------------
export const getMovieById = (id) => mockMovies.find((m) => m.id === id);

export const getShowtimeById = (id) => mockShowtimes.find((s) => s.id === id);

export const getShowtimesByMovie = (movieId) =>
  mockShowtimes.filter((s) => s.movieId === movieId);

export const getBookedSeatsForShowtime = (showtimeId) =>
  mockBookedSeats[showtimeId] || [];
