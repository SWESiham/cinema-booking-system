import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import MovieCard from "../components/movies/MovieCard";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data.movies);
      } catch (error) {
        setError("Failed to fetch movies");
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) return <div className="container movies-page"><Loader /></div>;
  if (error) return <div className="container movies-page"><h2 style={{ color: "red" }}>{error}</h2></div>;

  const nowShowingMovies = movies.filter((m) => m.status === "now_showing");
  const comingSoonMovies = movies.filter((m) => m.status === "coming_soon");
  
  const mMovies = nowShowingMovies[0];

  return (
    <div className="home">
      {mMovies && (
        <section
          className="hero"
          style={{ backgroundImage: `url(${mMovies.backdrop})` }}
        >
          <div className="hero__scrim"></div>
          <div className="container hero__content">
            <span className="hero__eyebrow">Now Showing</span>
            <h1 className="hero__title">{mMovies.title}</h1>
            <p className="hero__desc">{mMovies.description}</p>
            <div className="hero__meta">
              <span className="badge">★ {mMovies.rating}</span>
              <span className="badge">{mMovies.ageRating}</span>
              <span className="badge">{mMovies.duration} min</span>
              <span className="badge">{mMovies.genre?.join(" / ")}</span>
            </div>

            <div className="hero__actions">
              <Button as={Link} to={`/movies/${mMovies.id}`} size="lg">
                Book Tickets
              </Button>
              <Button as={Link} to={`/movies`} size="lg" variant="outline">
                Browse All Movies
              </Button>
            </div>
          </div>
        </section>
      )}

      <section className="container home__section">
        <div className="home__section-head">
          <h2 className="section-title">Now Showing</h2>
          <Link to="/movies" className="home__see-all">
            See all →
          </Link>
        </div>
        <div className="movies-grid">
          {nowShowingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="container home__section">
        <div className="home__section-head">
          <h2 className="section-title">Coming Soon</h2>
        </div>
        <div className="movies-grid">
          {comingSoonMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="container home__perks">
        <div className="perk">
          <span className="perk__icon">🎟️</span>
          <h3>Instant Booking</h3>
          <p>Pick your seats and get your ticket in under a minute.</p>
        </div>
        <div className="perk">
          <span className="perk__icon">🍿</span>
          <h3>Premium Halls</h3>
          <p>IMAX, VIP recliners, and Dolby sound across our cinemas.</p>
        </div>
        <div className="perk">
          <span className="perk__icon">📍</span>
          <h3>Multiple Locations</h3>
          <p>Downtown, Mall of Arabia, and Nile View — always nearby.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;