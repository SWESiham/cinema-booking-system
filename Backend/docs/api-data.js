/* Endpoint catalog rendered by api-docs.html */
const ENDPOINTS = [
  // ---------------------------------------------------------------- Health
  {
    id: 'health', group: 'Health', tag: 'health',
    groupDesc: 'Server status and database counts.',
    method: 'GET', path: '/api/health',
    summary: 'Health check — server status, uptime, and JSON DB record counts.',
    responses: [
      { status: 200, description: 'Server is up.', example: { success: true, status: 'ok', uptimeSeconds: 12, storage: 'backend/data/db.json', counts: { movies: 18, users: 4, genres: 6, bookings: 1 } } },
    ],
  },

  // ---------------------------------------------------------------- Auth
  {
    id: 'auth-register', group: 'Auth', tag: 'auth',
    groupDesc: 'Register, login, and read the current user. Login/register return a Bearer token (HMAC-signed, 7-day expiry).',
    method: 'POST', path: '/api/auth/register',
    summary: 'Create a new Customer account.',
    bodyExample: { name: 'Emma Wilson', email: 'emma@example.com', password: 'password123' },
    responses: [
      { status: 201, description: 'Account created. Returns token + user.', example: { success: true, message: 'Account created.', token: '<header>.<payload>.<signature>', user: { id: 5, name: 'Emma Wilson', email: 'emma@example.com', role: 'Customer' } } },
      { status: 400, description: 'Validation failed (name/email/password rules).' },
      { status: 409, description: 'Email already registered.' },
    ],
  },
  {
    id: 'auth-login', group: 'Auth', tag: 'auth',
    method: 'POST', path: '/api/auth/login',
    summary: 'Log in and receive a Bearer token.',
    bodyExample: { email: 'admin@cinebook.com', password: 'password123' },
    responses: [
      { status: 200, description: 'Logged in. Returns token + user.', example: { success: true, message: 'Logged in.', token: '<header>.<payload>.<signature>', user: { id: 1, name: 'Admin User', email: 'admin@cinebook.com', role: 'Admin' } } },
      { status: 401, description: 'Invalid email or password.' },
      { status: 403, description: 'Account suspended.' },
    ],
  },
  {
    id: 'auth-me', group: 'Auth', tag: 'auth',
    method: 'GET', path: '/api/auth/me', auth: 'Bearer',
    summary: 'Get the currently authenticated user.',
    responses: [
      { status: 200, description: 'Current user profile.', example: { success: true, user: { id: 1, name: 'Admin User', email: 'admin@cinebook.com', role: 'Admin', status: 'Active', joined: 'Aug 12, 2026', bio: 'CineBook platform administrator.' } } },
      { status: 401, description: 'Missing/invalid token.' },
    ],
  },

  // ---------------------------------------------------------------- Movies
  {
    id: 'movies-list', group: 'Movies', tag: 'movies',
    groupDesc: 'Movie catalog CRUD. Reads are public; create/update/delete require an Admin token. Powers Home, NowShowing, and MovieDetails pages.',
    method: 'GET', path: '/api/movies',
    summary: 'List all movies with search, genre, and status filters.',
    params: [
      { name: 'q', type: 'string', required: false, in: 'query', description: 'Search title, description, director, cast.' },
      { name: 'genre', type: 'string', required: false, in: 'query', description: 'Action | Comedy | Drama | Horror | Sci-Fi | Animation | all' },
      { name: 'status', type: 'string', required: false, in: 'query', description: 'now_showing | coming_soon | ended | all' },
    ],
    responses: [
      { status: 200, description: 'Full filtered movie list.', example: { success: true, total: 18, movies: [{ id: 1, title: 'Thunderstrike', genre: 'Action', director: 'James Morton', duration: 128, rating: 7.8, ticketPrice: 14.99, status: 'now_showing' }] } },
    ],
  },
  {
    id: 'movies-get', group: 'Movies', tag: 'movies',
    method: 'GET', path: '/api/movies/{id}',
    summary: 'Get one movie by numeric id.',
    params: [{ name: 'id', type: 'integer', required: true, in: 'path', description: 'Movie id, e.g. 1' }],
    responses: [
      { status: 200, description: 'Full movie object.', example: '{ "success": true, "movie": { "id": 1, "title": "Thunderstrike", "genre": "Action", "director": "James Morton", "cast": ["Liam Carter", "Nadia Petrova"], "duration": 128, "rating": 7.8, "ticketPrice": 14.99 } }' },
      { status: 404, description: 'Movie not found.' },
    ],
  },
  {
    id: 'movies-create', group: 'Movies', tag: 'movies',
    method: 'POST', path: '/api/movies', auth: 'Admin',
    summary: 'Create a movie. Requires Admin role.',
    bodyExample: { title: 'New Movie', description: 'An exciting new film.', genre: 'Action', director: 'John Director', cast: ['Actor One', 'Actor Two'], duration: 120, ticketPrice: 14.99, releaseDate: '2026-10-01', status: 'coming_soon' },
    responses: [
      { status: 201, description: 'Created. Returns the new movie (auto-incremented numeric id).', example: { success: true, message: 'Movie created.', movie: { id: 19, title: 'New Movie', status: 'coming_soon' } } },
      { status: 400, description: 'Validation errors array returned.' },
      { status: 401, description: 'Not authenticated.' },
      { status: 403, description: 'Not an Admin.' },
    ],
  },
  {
    id: 'movies-update', group: 'Movies', tag: 'movies',
    method: 'PUT', path: '/api/movies/{id}', auth: 'Admin',
    summary: 'Update any subset of movie fields (partial update allowed).',
    params: [{ name: 'id', type: 'integer', required: true, in: 'path', description: 'Movie id.' }],
    bodyExample: { ticketPrice: 16.99, status: 'now_showing' },
    responses: [
      { status: 200, description: 'Updated movie returned.' },
      { status: 400, description: 'Validation errors.' },
      { status: 404, description: 'Movie not found.' },
    ],
  },
  {
    id: 'movies-delete', group: 'Movies', tag: 'movies',
    method: 'DELETE', path: '/api/movies/{id}', auth: 'Admin',
    summary: 'Delete a movie and cascade-remove its bookings.',
    params: [{ name: 'id', type: 'integer', required: true, in: 'path', description: 'Movie id.' }],
    responses: [
      { status: 200, description: 'Deleted.', example: { success: true, message: "Movie 'Thunderstrike' deleted." } },
      { status: 404, description: 'Movie not found.' },
    ],
  },

  // ---------------------------------------------------------------- Genres
  {
    id: 'genres-list', group: 'Genres', tag: 'genres',
    groupDesc: 'Genre cards shown on the Home page. Counts are computed live from the catalog.',
    method: 'GET', path: '/api/genres',
    summary: 'List genres with live movie counts.',
    responses: [
      { status: 200, description: 'Genre list.', example: { success: true, genres: [{ id: 'action', title: 'Action', count: 3, description: 'High-octane thrills, stunts, and edge-of-your-seat sequences.' }, { id: 'comedy', title: 'Comedy', count: 3, description: 'Laughs, lighthearted adventures, and feel-good stories.' }] } },
    ],
  },

  // ---------------------------------------------------------------- Bookings
  {
    id: 'bookings-screens', group: 'Bookings', tag: 'bookings',
    groupDesc: 'Ticket booking with seat selection. All booking endpoints require authentication. Powers Seat Selection, My Tickets, and Booking Confirmation.',
    method: 'GET', path: '/api/bookings/screens', auth: 'Bearer',
    summary: 'Get available screens and show times.',
    responses: [
      { status: 200, description: 'Screens and showtimes.', example: { success: true, screens: ['Screen 1', 'Screen 2', 'Screen 3', 'Screen 4', 'Screen 5', 'IMAX'], showTimes: ['10:00', '13:00', '16:00', '19:30', '22:00'] } },
    ],
  },
  {
    id: 'bookings-seats', group: 'Bookings', tag: 'bookings',
    method: 'GET', path: '/api/bookings/{movieId}/seats',
    summary: 'Get seat map for a specific movie, date, time, and screen.',
    params: [
      { name: 'movieId', type: 'integer', required: true, in: 'path', description: 'Movie id, e.g. 1' },
      { name: 'date', type: 'string', required: false, in: 'query', description: 'Show date (YYYY-MM-DD). Defaults to today.' },
      { name: 'time', type: 'string', required: false, in: 'query', description: 'Show time (HH:MM). Defaults to 19:30.' },
      { name: 'screen', type: 'string', required: false, in: 'query', description: 'Screen name. Defaults to Screen 3.' },
    ],
    responses: [
      { status: 200, description: 'Seat map with availability.', example: { success: true, movie: { id: 1, title: 'Thunderstrike', ticketPrice: 14.99 }, showDate: '2026-08-28', showTime: '19:30', screen: 'Screen 3', totalSeats: 96, availableSeats: 94, seats: [{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }] } },
      { status: 404, description: 'Movie not found.' },
    ],
  },
  {
    id: 'bookings-create', group: 'Bookings', tag: 'bookings',
    method: 'POST', path: '/api/bookings', auth: 'Bearer',
    summary: 'Book tickets for a movie showtime.',
    bodyExample: { movieId: 1, showDate: '2026-08-28', showTime: '19:30', screen: 'Screen 3', seats: ['F7', 'F8'] },
    responses: [
      { status: 201, description: 'Booking confirmed. Returns booking with computed totals.', example: { success: true, message: "2 ticket(s) booked for 'Thunderstrike'.", booking: { id: 'b-abc123-x9y2', movieId: 1, movieTitle: 'Thunderstrike', showDate: '2026-08-28', showTime: '19:30', screen: 'Screen 3', seats: ['F7', 'F8'], ticketPrice: 14.99, serviceFee: 2.00, totalPrice: 31.98, status: 'confirmed' } } },
      { status: 400, description: 'Validation errors (empty seats, too many seats).' },
      { status: 404, description: 'Movie not found.' },
      { status: 409, description: 'One or more seats already booked.' },
    ],
  },
  {
    id: 'bookings-mine', group: 'Bookings', tag: 'bookings',
    method: 'GET', path: '/api/bookings/me', auth: 'Bearer',
    summary: "List the signed-in user's bookings.",
    responses: [
      { status: 200, description: 'User bookings.', example: { success: true, total: 1, bookings: [{ id: 'b-1', movieTitle: 'Thunderstrike', showDate: '2026-08-28', showTime: '19:30', screen: 'Screen 3', seats: ['F7', 'F8'], totalPrice: 31.98, status: 'confirmed' }] } },
      { status: 401, description: 'Missing/invalid token.' },
    ],
  },
  {
    id: 'bookings-list', group: 'Bookings', tag: 'bookings',
    method: 'GET', path: '/api/bookings', auth: 'Admin',
    summary: 'Search/list all bookings (Admin only).',
    params: [
      { name: 'q', type: 'string', required: false, in: 'query', description: 'Matches booking id, movie title, or seat names.' },
      { name: 'status', type: 'string', required: false, in: 'query', description: 'pending | confirmed | cancelled | refunded | all' },
    ],
    responses: [
      { status: 200, description: 'Matching bookings.', example: { success: true, total: 1, bookings: [{ id: 'b-1', userId: 3, movieTitle: 'Thunderstrike', seats: ['F7', 'F8'], totalPrice: 31.98, status: 'confirmed' }] } },
      { status: 403, description: 'Admin role required.' },
    ],
  },
  {
    id: 'bookings-update-status', group: 'Bookings', tag: 'bookings',
    method: 'PATCH', path: '/api/bookings/{bookingId}/status', auth: 'Bearer',
    summary: "Update a booking's status. Customers can only cancel their own confirmed/pending bookings.",
    params: [{ name: 'bookingId', type: 'string', required: true, in: 'path', description: 'Booking id, e.g. b-1' }],
    bodyExample: { status: 'cancelled' },
    responses: [
      { status: 200, description: 'Status updated.' },
      { status: 400, description: 'Invalid status or booking cannot be cancelled.' },
      { status: 403, description: 'Customer trying to update another user\'s booking.' },
      { status: 404, description: 'Booking not found.' },
    ],
  },
  {
    id: 'bookings-delete', group: 'Bookings', tag: 'bookings',
    method: 'DELETE', path: '/api/bookings/{bookingId}', auth: 'Bearer',
    summary: 'Delete a booking. Customers can only delete their own bookings.',
    params: [{ name: 'bookingId', type: 'string', required: true, in: 'path', description: 'Booking id.' }],
    responses: [
      { status: 200, description: 'Deleted.' },
      { status: 403, description: 'Customer trying to delete another user\'s booking.' },
      { status: 404, description: 'Booking not found.' },
    ],
  },

  // ---------------------------------------------------------------- Users
  {
    id: 'users-update-me', group: 'Users', tag: 'users',
    groupDesc: 'Profile self-service plus admin user management.',
    method: 'PATCH', path: '/api/users/me', auth: 'Bearer',
    summary: 'Update my own profile (name / email / bio).',
    bodyExample: { name: 'Emma W.', email: 'emma@example.com', bio: 'Movie lover.' },
    responses: [
      { status: 200, description: 'Updated user returned (password never included).', example: { success: true, message: 'Profile updated.', user: { id: 3, name: 'Emma W.', email: 'emma@example.com' } } },
      { status: 400, description: 'Validation failed.' },
      { status: 409, description: 'Email already in use.' },
    ],
  },
  {
    id: 'users-list', group: 'Users', tag: 'users',
    method: 'GET', path: '/api/users', auth: 'Admin',
    summary: 'Search/list users.',
    params: [
      { name: 'q', type: 'string', required: false, in: 'query', description: 'Matches name or email (case-insensitive).' },
      { name: 'status', type: 'string', required: false, in: 'query', description: 'Active | Suspended | all' },
      { name: 'role', type: 'string', required: false, in: 'query', description: 'Admin | Staff | Customer | all' },
    ],
    responses: [
      { status: 200, description: 'Matching users (passwords stripped).', example: { success: true, total: 4, users: [{ id: 1, name: 'Admin User', email: 'admin@cinebook.com', role: 'Admin', status: 'Active', joined: 'Aug 12, 2026' }] } },
      { status: 403, description: 'Admin role required.' },
    ],
  },
  {
    id: 'users-create', group: 'Users', tag: 'users',
    method: 'POST', path: '/api/users', auth: 'Admin',
    summary: 'Create a user directly from admin panel (no password set).',
    bodyExample: { name: 'New Staff', email: 'newstaff@cinebook.com', role: 'Staff' },
    responses: [
      { status: 201, description: 'User created.' },
      { status: 409, description: 'Email already exists.' },
    ],
  },
  {
    id: 'users-toggle-status', group: 'Users', tag: 'users',
    method: 'PATCH', path: '/api/users/{id}/status', auth: 'Admin',
    summary: "Toggle Active/Suspended (or pass an explicit { status }).",
    params: [{ name: 'id', type: 'integer', required: true, in: 'path', description: 'User id, e.g. 4' }],
    bodyExample: {},
    responses: [
      { status: 200, description: 'Status flipped and returned.', example: { success: true, message: 'User is now Suspended.', user: { id: 4, name: 'James Park', status: 'Suspended' } } },
      { status: 400, description: 'Cannot suspend your own account.' },
      { status: 404, description: 'User not found.' },
    ],
  },
  {
    id: 'users-set-role', group: 'Users', tag: 'users',
    method: 'PATCH', path: '/api/users/{id}/role', auth: 'Admin',
    summary: 'Change a user role (Admin | Staff | Customer).',
    params: [{ name: 'id', type: 'integer', required: true, in: 'path', description: 'User id.' }],
    bodyExample: { role: 'Staff' },
    responses: [
      { status: 200, description: 'Role updated.' },
      { status: 400, description: 'Invalid role.' },
      { status: 404, description: 'User not found.' },
    ],
  },
  {
    id: 'users-delete', group: 'Users', tag: 'users',
    method: 'DELETE', path: '/api/users/{id}', auth: 'Admin',
    summary: 'Delete a user (cascade removes their bookings). Cannot delete yourself.',
    params: [{ name: 'id', type: 'integer', required: true, in: 'path', description: 'User id.' }],
    responses: [
      { status: 200, description: 'Deleted.' },
      { status: 400, description: 'Cannot delete your own account.' },
      { status: 404, description: 'User not found.' },
    ],
  },

  // ---------------------------------------------------------------- Stats
  {
    id: 'stats-me', group: 'Stats', tag: 'stats',
    groupDesc: 'Aggregates for Dashboard (customer) and Admin analytics screens.',
    method: 'GET', path: '/api/stats/me', auth: 'Bearer',
    summary: 'Customer dashboard KPIs for the signed-in user.',
    responses: [
      { status: 200, description: 'KPI values for StatCards.', example: { success: true, stats: { totalBookings: 3, totalSpent: 78.94, totalTickets: 6, upcomingShows: 2 } } },
      { status: 401, description: 'Authentication required.' },
    ],
  },
  {
    id: 'stats-admin', group: 'Stats', tag: 'stats',
    method: 'GET', path: '/api/stats/admin', auth: 'Admin',
    summary: 'Platform KPIs for the admin dashboard.',
    responses: [
      { status: 200, description: 'Platform totals.', example: { success: true, stats: { totalMovies: 18, nowShowing: 11, comingSoon: 5, totalUsers: 4, activeUsers: 3, totalBookings: 5, totalRevenue: 142.50, genrePerformance: [{ title: 'Action', count: 3 }] } } },
      { status: 403, description: 'Admin role required.' },
    ],
  },
];
