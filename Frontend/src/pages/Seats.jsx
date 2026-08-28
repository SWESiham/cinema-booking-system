import React, { useEffect, useState } from "react";
import "./Seats.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
// import { getBookedSeatsForShowtime, getShowtimeById } from "../data/mockData";
// import { getMovieById } from "./../data/mockData";
import SeatMap from "../components/booking/SeatMap";
import Button from "./../components/common/Button";
import api from "../services/api";
import Loader from "./../components/common/Loader";
const Seats = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const [swtime, setShwtime] = useState(null);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // const swtime = getShowtimeById(showtimeId);
  // const movie = swtime ? getMovieById(swtime.movieId) : null;
  // const bSeats = getBookedSeatsForShowtime(showtimeId);

  const [bSeats, setBSeats] = useState([]);
  const [sSeats, setSSeats] = useState([]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const shwtimeRes = await api.get(`/showtimes/${showtimeId}`);
        const fshwtime = shwtimeRes.data.showtime;
        setShwtime(fshwtime);
        const [moiveRes, bookedRes] = await Promise.all([
          api.get(`/movies/${fshwtime.movieId}`),
          api
            .get(`/showtimes/${showtimeId}/seats`)
            .catch(() => ({ data: { bookedSeats: [] } })),
        ]);

        // const bookedRes = await api.get(`/showtimes/${showtimeId}/seats`).catch(() => ({ data: { bookedSeats: [] } }));
        setMovie(moiveRes.data.movie);
        setBSeats(bookedRes.data.bookedSeats);
        console.log(moiveRes.data.movie);

        console.log(bookedRes.data);

        setLoading(false);
      } catch (error) {
        setError("Failed to load booking session.");
        setLoading(false);
      }
    };
    fetchData();
  }, [showtimeId]);

  if (loading) {
    return (
      <div
        className="container"
        style={{ padding: "100px", textAlign: "center" }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="container"
        style={{ padding: "100px", color: "red", textAlign: "center" }}
      >
        <h2>{error}</h2>
      </div>
    );
  }

  if (!swtime || !movie) {
    return <Navigate to="/movies" replace />;
  }
  const handleProceed = () => {
    navigate("/checkout", {
      state: {
        showtimeId,
        sSeats,
        total,
      },
    });
  };

  return (
    <>
      <div className="container seats-page">
        <div className="seats-page__header">
          <h1 className="section-title">Select Your Seats</h1>
          <p className="seats-page__subtitle">
            {movie.title} · {swtime.cinema} · {swtime.hall} ·{" "}
            {new Date(swtime.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
            })}{" "}
            · {swtime.time}
          </p>
        </div>

        {/* bSeats = [],
            price = 0,
            hallNum = 1,
            maxSeats = 8,
            onSelChange, */}
        <SeatMap
          bSeats={bSeats}
          price={swtime.price}
          hallNum={swtime.hall}
          maxSeats={swtime.hall % 2 === 1 ? 10 : 8}
          onSelChange={(seats, seatsTotal) => {
            setSSeats(seats);
            setTotal(seatsTotal);
          }}
        />

        <div className="seats-summary ticket-notch">
          <div className="seats-summary__seats">
            <span className="seats-summary__label">Selected Seats</span>
            <span className="seats-summary__value">
              {sSeats.length ? sSeats.join(", ") : "—"}
            </span>
          </div>
          <div className="seats-summary__total">
            <span className="seats-summary__label">Total</span>
            <span className="seats-summary__value seats-summary__value--price">
              {total} EGP
            </span>
          </div>
          <Button
            size="lg"
            disabled={sSeats.length === 0}
            onClick={handleProceed}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </>
  );
};

export default Seats;
