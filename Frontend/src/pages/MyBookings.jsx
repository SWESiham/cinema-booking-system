import React, { useEffect, useState } from "react";
import api from "./../services/api";
import "./MyBookings.css";
import Loader from './../components/common/Loader';
const MyBookings = () => {
  const [booking, setBooking] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
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
  if (loading) {
    return (
      <div className="container" style={{ padding: "100px", textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container" style={{ padding: "100px", color: "red", textAlign: "center" }}>
        <h2>{error}</h2>
      </div>
    );
  }
  return (<>
  <div className="container bookings-page">
      <h1 className="section-title">My Bookings</h1>

      {booking.length>0 && (
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
              <div className="booking-card ticket-notch" key={book.id}>
                <img src={book.movieImage} alt={book.movieTitle} className="booking-card__poster" />

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
                    {new Date(book.date).toLocaleDateString('en-US', {
                      weekday: 'short',
                      month: 'short',
                      day: 'numeric',
                    })}{' '}
                    · {book.time}
                  </p>
                  <p className="booking-card__seats">
                    Seats: <strong>{book.seats.join(', ')}</strong>
                  </p>
                </div>

                <div className="booking-card__price">{book.totalPrice} EGP</div>

              </div>
            )
          })}
        </div>
      )}
    </div>
    
  </>
  )
};

export default MyBookings;
