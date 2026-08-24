import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies" },
  { to: "/my-bookings", label: "My Bookings" },
];
// const navAuthLinks = [
//   { to: "/login", label: "Log In" },
//   { to: "/register", label: "Sign Up" },
// ];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="navbar">
        <div className="container navbar__inner">
          <NavLink 
            to="/"
            className="navbar__logo"
            onClick={() => setIsOpen(false)}
          >
            <span className="navbar__logo-mark">CINE</span>
            <span className="navbar__logo-accent">BOOK</span>
          </NavLink>

          <nav className={`navbar__links  ${isOpen ? "is-open" : ""}`}>
            {/* <NavLink 
              to="/"
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
              onClick={() => setIsOpen(false)}
            >
              Home
            </NavLink> */}

            {navLinks.map((link) => (
              <NavLink
                to={link.to}
                key={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ''}`
                }
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <div className="navbar__auth">
              {/* {navAuthLinks.map((link) => ( */}
              <NavLink
                to="/login"
                className="navbar__auth-link"
                onClick={() => setIsOpen(false)}
              >
                {/* {link.label} */}
                Log In
              </NavLink>
              <NavLink
                to="/register"
                className="navbar__auth-btn"
                onClick={() => setIsOpen(false)}
              >
                {/* {link.label} */}
                Sign Up
              </NavLink>
              {/* ))} */}
            </div>
          </nav>
          <button
            className={`navbar__toggle ${isOpen ? "is-open" : ''}`}
            aria-label="Toggle menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>
    </>
  );
};
