import { React, useMemo, useState,useEffect } from "react";
import "./Movies.css";
import api from "../services/api"
import MovieGrid from "./../components/movies/MovieGrid";
import Loader from './../components/common/Loader';
const Movies = () => {
  const [search, setSearch] = useState("");
  const [aGenre, setAGenre] = useState("All");

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  useEffect(() => {
    const fetchMovies = async() => {
      try {
        const res = await api.get('/movies');
        console.log(res.data);
        setMovies(res.data.movies);
        setLoading(false);
        
      } catch (error) {
        setError('Failed to fetch movies');
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);
  const allGenres = useMemo(() => {
    return ["All", ...new Set(movies.flatMap((m) => m.genre))];
  },[movies])

  const filterMovies = useMemo(() => {
    return movies.filter((movie) => {
      const mSearch = movie.title
        .toLowerCase()
        .includes(search.trim().toLowerCase());
      const mGenre = aGenre === "All" || movie.genre.includes(aGenre);
      return mSearch && mGenre;
    });
  }, [search, aGenre,movies]);

  if (loading) return <div className="container movies-page"><Loader/></div>;
  if (error) return <div className="container movies-page"><h2 style={{ color: 'red' }}>{error}</h2></div>;
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
