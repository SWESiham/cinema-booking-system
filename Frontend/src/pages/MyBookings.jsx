import React, { useEffect, useState } from "react";
import api from "./../services/api";
import "./MyBookings.css";
import Loader from "./../components/common/Loader";
import Button from "./../components/common/Button";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [showAlert, setShowAlert] = useState(location.state?.justBooked);
  const navigate = useNavigate();
  const handleCancel = async (bookingId) => {
    e.stopPropagation();
    try {
      await api.patch(`/bookings/${bookingId}/status`, { status: "cancelled" });

      setBooking(
        booking.map((item) =>
          item.id === bookingId ? { ...item, status: "cancelled" } : item,
        ),
      );
    } catch (err) {
      console.error("Failed to cancel booking", err);
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await api.get("/bookings/me");
        console.log("Booking from MyBookings", res.data.bookings);
        setBooking(res.data.bookings);
        setLoading(false);
      } catch (error) {
        console.error("Failed to load bookings", error);
        setError("Failed to load your bookings.");
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 4000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [showAlert]);
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
  return (
    <>
      <div className="container bookings-page">
        <h1 className="section-title">My Bookings</h1>

        {showAlert && (
          <div className="bookings-page__success">
            Your booking is confirmed! Check the details below.
          </div>
        )}

        {booking.length === 0 ? (
          <p>You haven't booked any tickets yet.</p>
        ) : (
          <div className="bookings-list">
            {booking.map((book) => {
              return (
                <div className="booking-card ticket-notch" key={book.id} onClick={() => navigate(`/movies/${book.movieId}`)}>
                  <img
                    src={book.movieImage}
                    alt={book.movieTitle}
                    className="booking-card__poster"
                    
                  />

                  <div className="booking-card__body">
                    <div className="booking-card__top">
                      <h3>{book.movieTitle}</h3>
                      <span
                        className={`booking-status booking-status--${book.status}`}
                      >
                        {book.status}
                      </span>
                    </div>

                    <p className="booking-card__meta">
                      {book.cinema} · {book.hall}
                    </p>
                    <p className="booking-card__meta">
                      {new Date(book.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      · {book.time}
                    </p>
                    <p className="booking-card__seats">
                      Seats: <strong>{book.seats.join(", ")}</strong>
                    </p>
                  </div>
                  <div className="booking-card__action">
                    <div className="booking-card__price">
                      {book.totalPrice} EGP
                    </div>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleCancel(book.id)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default MyBookings;
