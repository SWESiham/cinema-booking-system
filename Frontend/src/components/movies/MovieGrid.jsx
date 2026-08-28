import React from "react";
import "./MovieGrid.css";
import MovieCard from "./MovieCard.jsx";
const MovieGrid = ({ movies, emptyMsg = "No Movies Found." }) => {
  if (!movies || movies.length === 0) {
    return <p className="movie-grid__empty">{emptyMsg}</p>;
  }
  return (
    <>
      <div className="movie-grid">
              {movies.map((movie) => (
            // key => da identifier byhadd ana bkalm men ??
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </>
  );
};

export default MovieGrid;
