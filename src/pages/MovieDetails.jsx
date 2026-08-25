import React, { useState, useMemo } from "react";
import "./MovieDetails.css";
import { getMovieById, getShowtimesByMovie } from "../data/mockData";
import { Navigate, useNavigate, useParams } from "react-router-dom";
const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movie = getMovieById(id);
  // geb el swtime b id bt3 el movies lma el id bs yt4er
  const allShowtimes = useMemo(() => getShowtimesByMovie(id), [id]);

  const dates = useMemo(
    () => [...new Set(allShowtimes.map((s) => s.date))].sort(),
    [allShowtimes],
  );

  const [aDate, setADate] = useState(dates[0]);
  if (!movie) {
    return <Navigate to="/movies" replace />;
  }

  const swtimefrDate = allShowtimes.filter((s) => s.date === aDate);

  return (
    <>
      <div className="movie-details">
        <div
          className="movie-details__hero"
          style={{ backgroundImage: `url(${movie.backdrop})` }}
        >
          <div className="movie-details__scrim"></div>
        </div>

        <div className="container movie-details__content">
          <img
            src={movie.poster}
            alt={movie.title}
            className="movie-details__poster"
          />
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
          <h2 className="section-title">Select Showtime</h2>
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
                    <span className="showtime-card__cinema">{s.cinema}</span>
                    <span className="showtime-card__hall">{s.hall}</span>
                    <span className="showtime-card__price">{s.price} EGP</span>
                  </button>
                ))}
          
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default MovieDetails;
