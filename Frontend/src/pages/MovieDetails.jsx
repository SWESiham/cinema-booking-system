import React, { useState, useMemo, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "./../components/common/Loader";
import { useAuth } from './../context/AuthContext';
import Button from "../components/common/Button";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [allShowtimes, setAllShwTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useAuth();
  const isAdmin = user?.role === "Admin";
  // const movie = getMovieById(id);
  // geb el swtime b id bt3 el movies lma el id bs yt4er
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [newShowtime, setNewShowtime] = useState({
    date: "",
    time: "",
    hall: "Hall 1",
    price: 150
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [movieRes, shwtimeRes] = await Promise.all([
          api.get(`/movies/${id}`),
          api.get(`/showtimes?movieId=${id}`),
        ]);
        setMovie(movieRes.data.movie);
        setAllShwTimes(shwtimeRes.data.showtimes);
        setLoading(false);
      } catch (error) {
        setError("Failed to load details");
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const dates = useMemo(
    () => [...new Set(allShowtimes.map((s) => s.date))].sort(),
    [allShowtimes],
  );

  const [aDate, setADate] = useState(dates[0]);

  useEffect(() => {
    if (dates.length > 0 && !aDate) {
      setADate(dates[0]);
    }
  }, [dates, aDate]);

  const handleAddShowtime = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/showtimes", { movieId: movie.id, ...newShowtime });
      
      const addedShowtime = res.data.showtime || res.data;
      setAllShwTimes([...allShowtimes, addedShowtime]);
      
      alert("Showtime added successfully!");
      setShowTimeModal(false);
      setNewShowtime({ date: "", time: "", hall: "Hall 1", price: 150 });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading)
    return <div className="container" style={{ padding: "100px" }}><Loader /></div>;

  if (error)
    return <div className="container" style={{ padding: "100px", color: "red" }}><h2>{error}</h2></div>;

  if (!movie) {
    return <Navigate to="/movies" replace />;
  }

  const swtimefrDate = allShowtimes.filter((s) => s.date === aDate);

  return (
    <div className="movie-details">
      <div className="movie-details__hero" style={{ backgroundImage: `url(${movie.backdrop})` }}>
        <div className="movie-details__scrim"></div>
      </div>

      <div className="container movie-details__content">
        <img src={movie.poster} alt={movie.title} className="movie-details__poster" />
        <div className="movie-details__info">
          <h1>{movie.title}</h1>
          <div className="hero__meta">
            <span className="badge">★ {movie.rating}</span>
            <span className="badge">{movie.ageRating}</span>
            <span className="badge">{movie.duration} min</span>
            <span className="badge">{movie.language}</span>
          </div>
          <p className="movie-details__genres">{movie.genre.join(" . ")}</p>
          <p className="movie-details__desc">{movie.description}</p>
        </div>
      </div>

      <div className="container movie-details__booking">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 className="section-title" style={{ margin: 0 }}>Select Showtime</h2>
          {isAdmin && (
            <Button onClick={() => setShowTimeModal(true)}>+ Add Showtime</Button>
          )}
        </div>

        {dates.length === 0 ? (
          <p>No showtimes scheduled for this movie yet.</p>
        ) : (
          <>
            <div className="movie-details__dates">
              {dates.map((d) => (
                <button
                  key={d}
                  className={`date-chip ${aDate === d ? "date-chip--active" : ""}`}
                  onClick={() => setADate(d)}
                >
                  {new Date(d).toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                  })}
                </button>
              ))}
            </div>

            <div className="movie-details__showtimes">
              {swtimefrDate.map((s) => (
                <button
                  key={s.id}
                  className="showtime-card ticket-notch"
                  onClick={() => navigate(`/booking/${s.id}/seats`)}
                >
                  <span className="showtime-card__time">{s.time}</span>
                  <span className="showtime-card__cinema">{s.cinema || "CineBook"}</span>
                  <span className="showtime-card__hall">{s.hall}</span>
                  <span className="showtime-card__price">{s.price} EGP</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {showTimeModal && (
        <div className="modal-backdrop">
          <form className="modal-card" onSubmit={handleAddShowtime}>
            <h3>Add New Showtime</h3>
            <input
              type="date"
              required
              value={newShowtime.date}
              onChange={(e) => setNewShowtime({ ...newShowtime, date: e.target.value })}
            />
            <input
              type="time"
              required
              value={newShowtime.time}
              onChange={(e) => setNewShowtime({ ...newShowtime, time: e.target.value })}
            />
            <select
              value={newShowtime.hall}
              onChange={(e) => setNewShowtime({ ...newShowtime, hall: e.target.value })}
            >
              <option value="Hall 1">Hall 1</option>
              <option value="Hall 2">Hall 2</option>
              <option value="VIP">VIP</option>
            </select>
            <input
              type="number"
              placeholder="Price (EGP)"
              required
              value={newShowtime.price}
              onChange={(e) => setNewShowtime({ ...newShowtime, price: Number(e.target.value) })}
            />
            <div className="modal-buttons">
              <Button type="button" variant="outline" onClick={() => setShowTimeModal(false)}>
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;