import React, { useState } from "react";
import "./Seats.css";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getBookedSeatsForShowtime, getShowtimeById } from "../data/mockData";
import { getMovieById } from "./../data/mockData";
import SeatMap from "../components/booking/SeatMap";
import Button from './../components/common/Button';
const Seats = () => {
  const { showtimeId } = useParams();
  const navigate = useNavigate();
  const swtime = getShowtimeById(showtimeId);
  const movie = swtime ? getMovieById(swtime.movieId) : null;
  const bSeats = getBookedSeatsForShowtime(showtimeId);

  const [sSeats, setSSeats] = useState([]);
  const [total, setTotal] = useState(0);
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
          maxSeats={swtime.hall === 1 ? 10 : 8}
          onSelChange={(seats, seatsTotal) => {
            setSSeats(seats);
            setTotal(seatsTotal);
          }}
        />

         <div className="seats-summary ticket-notch">
        <div className="seats-summary__seats">
          <span className="seats-summary__label">Selected Seats</span>
          <span className="seats-summary__value">
            {sSeats.length ? sSeats.join(', ') : '—'}
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
