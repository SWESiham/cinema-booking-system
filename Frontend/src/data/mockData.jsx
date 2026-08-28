// ==========================================
// 1. MOVIES (تمت إضافة أفلام جديدة متنوعة)
// ==========================================
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
  {
    id: "m7",
    title: "Shadow Protocol",
    genre: ["Action", "Thriller"],
    duration: 135,
    rating: 8.1,
    ageRating: "16+",
    poster: "https://picsum.photos/seed/shadow/400/600",
    backdrop: "https://picsum.photos/seed/shadow-wide/1200/500",
    description:
      "An elite operative is disavowed when an undercover mission in Berlin goes compromised.",
    language: "English",
  },
  {
    id: "m8",
    title: "Starlight Melody",
    genre: ["Animation", "Family", "Music"],
    duration: 102,
    rating: 7.8,
    ageRating: "G",
    poster: "https://picsum.photos/seed/starlight/400/600",
    backdrop: "https://picsum.photos/seed/starlight-wide/1200/500",
    description:
      "A young girl discovers that playing her grandmother's flute can paint constellations across the night sky.",
    language: "English",
  },
  {
    id: "m9",
    title: "Echoes of the Nile",
    genre: ["Historical", "Mystery"],
    duration: 145,
    rating: 8.7,
    ageRating: "13+",
    poster: "https://picsum.photos/seed/nile/400/600",
    backdrop: "https://picsum.photos/seed/nile-wide/1200/500",
    description:
      "Archaeologists in Luxor uncover a hidden tomb containing manuscripts that rewrite ancient history.",
    language: "Arabic",
  },
  {
    id: "m10",
    title: "Quantum Drift",
    genre: ["Sci-Fi", "Action"],
    duration: 120,
    rating: 7.5,
    ageRating: "PG-13",
    poster: "https://picsum.photos/seed/quantum/400/600",
    backdrop: "https://picsum.photos/seed/quantum-wide/1200/500",
    description:
      "A street racer accidentally equips his car with an experimental temporal engine.",
    language: "English",
  },
];

// ==========================================
// 2. SHOWTIMES (توزيع منتظم بين Hall 1 و Hall 2)
// Hall 1: Standard (Rows A-H x 10) | Hall 2: VIP (Rows A-F x 8)
// ==========================================
export const mockShowtimes = [
  // --- Nebula Horizon (m1) ---
  {
    id: "s1",
    movieId: "m1",
    cinema: "CineBook Downtown",
    hall: 1,
    date: "2026-08-25",
    time: "18:30",
    price: 160,
  },
  {
    id: "s2",
    movieId: "m1",
    cinema: "CineBook Nile View",
    hall: 2,
    date: "2026-08-25",
    time: "21:15",
    price: 240,
  },
  {
    id: "s3",
    movieId: "m1",
    cinema: "CineBook Mall of Arabia",
    hall: 1,
    date: "2026-08-26",
    time: "19:00",
    price: 170,
  },

  // --- Crimson Alley (m2) ---
  {
    id: "s4",
    movieId: "m2",
    cinema: "CineBook Downtown",
    hall: 2,
    date: "2026-08-25",
    time: "17:00",
    price: 220,
  },
  {
    id: "s5",
    movieId: "m2",
    cinema: "CineBook Nile View",
    hall: 1,
    date: "2026-08-26",
    time: "22:00",
    price: 150,
  },

  // --- The Last Orchard (m3) ---
  {
    id: "s6",
    movieId: "m3",
    cinema: "CineBook Nile View",
    hall: 1,
    date: "2026-08-25",
    time: "16:15",
    price: 140,
  },
  {
    id: "s7",
    movieId: "m3",
    cinema: "CineBook Downtown",
    hall: 2,
    date: "2026-08-26",
    time: "19:30",
    price: 210,
  },

  // --- Iron Circuit (m4) ---
  {
    id: "s8",
    movieId: "m4",
    cinema: "CineBook Mall of Arabia",
    hall: 1,
    date: "2026-08-25",
    time: "20:00",
    price: 180,
  },
  {
    id: "s9",
    movieId: "m4",
    cinema: "CineBook Downtown",
    hall: 2,
    date: "2026-08-26",
    time: "21:45",
    price: 250,
  },

  // --- Laughing Gas (m5) ---
  {
    id: "s10",
    movieId: "m5",
    cinema: "CineBook Downtown",
    hall: 1,
    date: "2026-08-25",
    time: "15:30",
    price: 130,
  },

  // --- Whispers of Cairo (m6) ---
  {
    id: "s11",
    movieId: "m6",
    cinema: "CineBook Nile View",
    hall: 2,
    date: "2026-08-25",
    time: "18:45",
    price: 230,
  },
  {
    id: "s12",
    movieId: "m6",
    cinema: "CineBook Downtown",
    hall: 1,
    date: "2026-08-26",
    time: "20:30",
    price: 150,
  },

  // --- Shadow Protocol (m7) ---
  {
    id: "s13",
    movieId: "m7",
    cinema: "CineBook Mall of Arabia",
    hall: 1,
    date: "2026-08-25",
    time: "22:15",
    price: 175,
  },
  {
    id: "s14",
    movieId: "m7",
    cinema: "CineBook Nile View",
    hall: 2,
    date: "2026-08-26",
    time: "19:15",
    price: 260,
  },

  // --- Starlight Melody (m8) ---
  {
    id: "s15",
    movieId: "m8",
    cinema: "CineBook Downtown",
    hall: 1,
    date: "2026-08-25",
    time: "14:00",
    price: 120,
  },
  {
    id: "s16",
    movieId: "m8",
    cinema: "CineBook Mall of Arabia",
    hall: 2,
    date: "2026-08-26",
    time: "16:30",
    price: 190,
  },

  // --- Echoes of the Nile (m9) ---
  {
    id: "s17",
    movieId: "m9",
    cinema: "CineBook Nile View",
    hall: 1,
    date: "2026-08-25",
    time: "17:30",
    price: 160,
  },
  {
    id: "s18",
    movieId: "m9",
    cinema: "CineBook Downtown",
    hall: 2,
    date: "2026-08-26",
    time: "20:00",
    price: 240,
  },

  // --- Quantum Drift (m10) ---
  {
    id: "s19",
    movieId: "m10",
    cinema: "CineBook Mall of Arabia",
    hall: 1,
    date: "2026-08-26",
    time: "18:00",
    price: 165,
  },
];

// ==========================================
// 3. BOOKED SEATS (مضبوطة حسب أبعاد كل Hall)
// ==========================================
export const mockBookedSeats = {
  // Hall 1 (A-H x 10)
  s1: ["A3", "A4", "B5", "B6", "C7", "D2", "G1", "H9", "H10"],
  s3: ["B2", "B3", "D5", "D6", "D7", "G4"],
  s5: ["A1", "A2", "C3", "C4", "C5", "E6", "H4"],
  s6: ["A1", "B1", "B2", "D4"],
  s8: ["D4", "D5", "D6", "D7", "E4", "E5"],
  s10: ["C2", "C3", "D2"],
  s12: ["G8", "G9", "G10", "H1", "H2"],
  s13: ["A5", "A6", "F4", "F5"],
  s15: ["B3", "B4", "C3", "C4"],
  s17: ["D8", "D9", "E8", "E9"],
  s19: ["A1", "A2", "B1", "B2", "C1"],

  // Hall 2 (A-F x 8)
  s2: ["A1", "A2", "C3", "C4", "E5", "F6"],
  s4: ["A5", "A6", "B2", "B3", "E4"],
  s7: ["B4", "B5", "C4", "C5", "F1", "F2"],
  s9: ["C3", "C4", "D3", "D4"],
  s11: ["A2", "B2", "E7", "E8"],
  s14: ["C1", "C2", "D5", "D6"],
  s16: ["A3", "A4", "F5", "F6"],
  s18: ["B1", "B2", "E3", "E4"],
};

// ==========================================
// 4. USER BOOKINGS
// ==========================================
export const mockBookings = [
  {
    id: "b1",
    movieId: "m1",
    showtimeId: "s1",
    seats: ["E4", "E5"],
    total: 320,
    bookedAt: "2026-08-20T14:32:00",
    status: "confirmed",
  },
  {
    id: "b2",
    movieId: "m4",
    showtimeId: "s8",
    seats: ["B3"],
    total: 180,
    bookedAt: "2026-08-18T09:10:00",
    status: "confirmed",
  },
  {
    id: "b3",
    movieId: "m3",
    showtimeId: "s6",
    seats: ["C5", "C6", "C7"],
    total: 420,
    bookedAt: "2026-08-10T20:05:00",
    status: "cancelled",
  },
];

// ==========================================
// 5. HELPER FUNCTIONS
// ==========================================
export const getMovieById = (id) => mockMovies.find((m) => m.id === id);

export const getShowtimeById = (id) => mockShowtimes.find((s) => s.id === id);

export const getShowtimesByMovie = (movieId) =>
  mockShowtimes.filter((s) => s.movieId === movieId);

export const getBookedSeatsForShowtime = (showtimeId) =>
  mockBookedSeats[showtimeId] || [];