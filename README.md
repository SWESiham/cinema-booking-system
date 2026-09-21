# 🎬 CineBook — Cinema Ticket Booking Platform

> *"Your seat is waiting. Book in seconds."*

CineBook is a full-stack cinema ticket booking platform. Users can discover movies, pick a showtime, choose their seats on a live seat map, and check out, while administrators manage movies, showtimes, users, and bookings from a dedicated dashboard.

🔗 **Live demo:** [https://cinema-booking-system-n7zn-seven.vercel.app](https://cinema-booking-system-n7zn-seven.vercel.app)
📘 **API documentation:** [https://cinema-booking-system-five.vercel.app/docs](https://cinema-booking-system-five.vercel.app/docs)

---

## 📖 About the Project

### The problem
Traditional cinema ticket booking can be time-consuming. Users may need to visit the cinema or wait in queues, and finding movies, showtimes, and available seats can be inconvenient.

### The goal
- Provide a simple and fast online booking experience.
- Help users discover movies and reserve seats with ease.
- Centralize booking and cinema management in one platform.

---

## ✨ Features

### For moviegoers
- **Browse movies:** explore the full catalog of now-showing and coming-soon titles.
- **Filter by genre:** Sci-Fi, Action, Drama, Animation, and more.
- **Movie details:** rating, age rating, runtime, language, genre tags, and full synopsis.
- **Showtimes:** browse showtimes by date, with the cinema, hall, and ticket price for each slot.
- **Interactive seat map:** live Available / Selected / Booked states with an instant running total.
- **Checkout:** contact details and a mock payment flow, with an order summary before paying.
- **My Bookings:** view previous bookings, check their status (e.g. Confirmed), and review prices and reservation details.
- **Authentication:** sign up and log in to manage your own reservations.

### For administrators
- **Dashboard overview:** at-a-glance stats for total movies, users, bookings, and revenue.
- **Movie management:** add, edit, and delete movies with full metadata (title, director, genre, language, rating, duration, price, poster, and backdrop).
- **Showtime management:** add showtimes to any movie with date, time, cinema hall, and price per seat.
- **User management:** view and manage registered users.
- **Bookings management:** monitor bookings and update their status.

---

## 🛠️ Tech Stack

| Layer      | Technology                          |
| ---------- | ----------------------------------- |
| Frontend   | React, Vite                         |
| Backend    | Node.js, Express                    |
| Storage    | JSON file (`data/db.json`)          |
| Deployment | Vercel (frontend and backend)       |

---

## 📁 Project Structure

```
cinema-booking-system/
├── Backend/
│   ├── src/
│   │   ├── middleware/     # auth, CORS, error handling
│   │   ├── routes/         # auth, movies, genres, showtimes, bookings, users
│   │   ├── app.js
│   │   └── db.js
│   ├── data/db.json
│   └── docs/               # API documentation (OpenAPI)
└── Frontend/
    └── src/                # React app
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or later
- npm

### 1. Clone the repository
```bash
git clone https://github.com/SWESiham/cinema-booking-system.git
cd cinema-booking-system
```

### 2. Run the backend
```bash
cd Backend
npm install
npm run dev
```

Create `Backend/.env` if your setup needs it:
```env
CLIENT_URL=http://localhost:5173
```

### 3. Run the frontend
```bash
cd Frontend
npm install
npm run dev
```

Create `Frontend/.env`:
```env
VITE_API_URL=http://localhost:3000/api
```

The app runs at `http://localhost:5173`. Adjust the API port to match your backend.

---

## 🌐 Deployment

Both apps are deployed on Vercel as separate projects:

- **Frontend:** the `Frontend` directory, with `VITE_API_URL` pointing to the deployed backend's `/api`.
- **Backend:** the `Backend` directory, with `CLIENT_URL` set to the deployed frontend's URL so CORS allows it.

---

## 🔮 Future Enhancements

- Payment gateway integration
- Booking confirmation and reminder notifications
- User ratings and reviews
- Advanced movie discovery and recommendations

---

## 👩‍💻 Author

**Siham**
[GitHub](https://github.com/SWESiham) · [LinkedIn](https://linkedin.com/in/sihamsaid)

---

*CineBook brings the cinema experience closer to users, one booking at a time.*
