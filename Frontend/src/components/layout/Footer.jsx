import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { useAuth } from "../../context/AuthContext";
const Footer = () => {
  const { user } = useAuth();
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <div className="footer__logo">
            <span>CINE</span>
            <span className="footer__logo-accent">BOOK</span>
          </div>
          <p>Your seat is waiting. Book in seconds, arrive to the story.</p>
        </div>
        {user?.role !== 'Admin' ? (
          <>
            <div className="footer__col">
              <h4>Explore</h4>
          
            
              <Link to="/">Home</Link>
              <Link to="/movies">Movies</Link>
              <Link to="/my-bookings">My Bookings</Link>
            </div>
          </>
        ) : (
            <>
            <div className="footer__col">
              <h4>Explore</h4>
              <Link to="/">Home</Link>
              <Link to="/admin">Dashboard</Link>
            </div>
          </>
        )
      }
        <div className="footer__col">
          <h4>Account</h4>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
        <div className="footer__col">
          <h4>Cinemas</h4>
          <span>CineBook Downtown</span>
          <span>CineBook Mall of Arabia</span>
          <span>CineBook Nile View</span>
        </div>
      </div>

      <div className="container footer__bottom">
        <p>&copy; {new Date().getFullYear()} CineBook. All rights reserved.</p>
        <div className="footer__social">
          <span aria-label="Facebook">FB</span>
          <span aria-label="Instagram">IG</span>
          <span aria-label="X">X</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
