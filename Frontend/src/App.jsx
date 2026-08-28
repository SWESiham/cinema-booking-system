import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import { Navbar } from "./components/layout/Navbar";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/layout/Footer.jsx";
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Movies from './pages/Movies'
import MovieDetails from './pages/MovieDetails'
import MyBookings from './pages/MyBookings'
import Seats from './pages/Seats'
import Checkout from './pages/Checkout'

function App() {
  return (
    <>
      <Navbar />

      <main className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
          <Route path="/booking/:showtimeId/seats" element={<Seats />} />
          <Route path="/my-bookings" element={<MyBookings />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>

      <Footer/>
    </>
  );
}

export default App;
