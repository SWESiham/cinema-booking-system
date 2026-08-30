import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../context/AuthContext";
const navLinks = [
  { to: "/", label: "Home", end: true },
  { to: "/movies", label: "Movies" },
  { to: "/my-bookings", label: "My Bookings" },
];

// const isLogin = localStorage.getItem("isLogin");
// const user = localStorage.getItem("user");
// const navAuthLinks = [
//   { to: "/login", label: "Log In" },
//   { to: "/register", label: "Sign Up" },
// ];
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
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
            {user?.role !== 'Admin' ? (
              <>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to={'/movies'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Movies
              </NavLink>
              <NavLink
                to={'/my-bookings'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                My Bookings
              </NavLink>
              </>
            ) : (
              <>

                <NavLink
                to={'/'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Home
              </NavLink>
                <NavLink
                to={'/admin'}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? "navbar__link--active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </NavLink>
              </>
                )
          }
            
            {!user ? (
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
            ) : (
              <div className="navbar__auth">

                <span className="navbar__user-name">{user?.fullName || user?.name || "User"}</span>
                 
                  <NavLink
                  to="/register"
                  className="navbar__auth-btn"
                    onClick={() => { setIsOpen(false);logout()}}
                >
                  {/* {link.label} */}
                  LogOut
                </NavLink>
                </div>
            )}
          </nav>
          <button
            className={`navbar__toggle ${isOpen ? "is-open" : ""}`}
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
