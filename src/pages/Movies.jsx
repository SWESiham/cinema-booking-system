import { React, useMemo, useState } from "react";
import { mockMovies } from "../data/mockData";
import "./Movies.css";
import MovieGrid from "./../components/movies/MovieGrid";
const allGenres = ["All", ...new Set(mockMovies.flatMap((m) => m.genre))];
const Movies = () => {
  const [search, setSearch] = useState("");
  const [aGenre, setAGenre] = useState("All");
  const filterMovies = useMemo(() => {
    return mockMovies.filter((movie) => {
      const mSearch = movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const mGenre = aGenre === "All" || movie.genre.includes(aGenre);
      return mSearch && mGenre;
    });
  }, [search, aGenre]);

  return (
    <>
      <div className="container movies-page">
        <h1 className="section-title">All Movies</h1>
      <div className="movies-page__filters">
        <input
          type="text"
          className="movies-page__search"
          placeholder="Search movies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="movies-page__genres">
          {allGenres.map((genre) => (
            <button
              key={genre}
              className={`genre-chip ${aGenre === genre ? "genre-chip--active" : ""}`}
              onClick={() => setAGenre(genre)}
            >
              {genre}
            </button>
          ))}
        </div>
        </div>

        <MovieGrid
          movies={filterMovies}
          emptyMsg="No movies match your search."
        />
      </div>
    </>
  );
};

export default Movies;
