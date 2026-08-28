import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";
const MovieCard = ({ movie }) => {
  const { id, title, poster, genre, duration, rating, ageRating } = movie;
  return (
    <>
      <Link to={`/movies/${id}`} className="movie-card">
        <div className="movie-card__poster">
          <img src={poster} alt={title} loading="lazy" />
          <span className="movie-card__rating">★ {rating}</span>
          <span className="movie-card__age">{ageRating}</span>
        <div className="movie-card__overlay">
          <span className="movie-card__cta">View Showtimes →</span>
        </div>
        </div>
       

        <div className="movie-card__body">
          <h3 className="movie-card__title">{title}</h3>
          <div className="movie-card__meta">
            <span>{genre.join("/")}</span>
            <span className="movie-card__dot">•</span>
            <span>{duration} min</span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default MovieCard;
