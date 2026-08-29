import React, { useState } from "react";
import { useLocation, useNavigate, Navigate } from "react-router-dom";
import api from "./../services/api";
import Button from "./../components/common/Button";
import "./Checkout.css";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state || {};
  const showtimeId = state.showtimeId;
  const seats = state.sSeats;
  const totalAmount = state.total;

  const [isSubmitting, setIsSubmiting] = useState(false);
  const movie = state.movie;
  const swtime = state.swtime;
  console.log("movieee",movie , swtime);
  
  if (!seats || seats.length === 0) {
    return <Navigate to="/movies" replace />;
  }

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsSubmiting(true);
    try {
      await api.post("/bookings", {
        showtimeId,
        seats,
        totalAmount,
      });
      navigate("/my-bookings");
    } catch (error) {
      console.error(error);
      setIsSubmiting(false);
    }
  };

  return (
    <div className="container checkout-page">
      <h1 className="section-title">Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handlePayment}>
          <h3>Contact Details</h3>
          <div className="form-row">
            <label>
              Full Name
              <input
                type="text"
                name="fullName"
                required
                placeholder="Jane Doe"
              />
            </label>
            <label>
              Email
              <input
                type="email"
                name="email"
                required
                placeholder="jane@example.com"
              />
            </label>
          </div>

          <h3>Payment (Mock)</h3>
          <label>
            Card Number
            <input
              type="text"
              name="cardNumber"
              required
              maxLength={19}
              placeholder="4111 1111 1111 1111"
            />
          </label>
          <div className="form-row">
            <label>
              Expiry
              <input type="text" name="expiry" required placeholder="MM/YY" />
            </label>
            <label>
              CVC
              <input
                type="text"
                name="cvc"
                required
                maxLength={4}
                placeholder="123"
              />
            </label>
          </div>

          <p className="checkout-form__note">
            This is a mock payment form — no real transaction happens yet.
          </p>

          <Button
            type="submit"
            size="lg"
            fullWidth={true}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : `Pay ${totalAmount} EGP`}
          </Button>
        </form>

        <aside className="checkout-summary ticket-notch">
          <h3>Order Summary</h3>

          <div className="checkout-summary__movie">
            <img src={movie.poster} alt={movie.title} />
            <div>
              <h4>{movie.title}</h4>
              <p>{swtime.cinema}</p>
              <p>Hall: {swtime.hall}</p>
              <p>
                {new Date(swtime.date).toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}{" "}
                · {swtime.time}
              </p>
            </div>
          </div>

          <div className="checkout-summary__line">
            <span>Seats</span>
            <span>{seats.join(", ")}</span>
          </div>
          <div className="checkout-summary__line checkout-summary__line--total">
            <span>Total</span>
            <span>{totalAmount} EGP</span>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
