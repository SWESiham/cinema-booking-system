import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Button from "../components/common/Button";
import Loader from "../components/common/Loader";
import "./Dashboard.css";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(null);
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editMovieId, setEditMovieId] = useState(null);

  const [newMovie, setNewMovie] = useState({
    title: "", genre: "", duration: "", price: "", description: "",
    language: "", director: "", status: "now_showing", ageRating: "", poster: "", backdrop: "", rating: "",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, moviesRes, usersRes, bookingsRes] = await Promise.all([
        api.get("/stats/admin"),
        api.get("/movies"),
        api.get("/users"),
        api.get("/bookings")
      ]);

      setStats(statsRes.data.stats);
      setMovies(moviesRes.data.movies || moviesRes.data);
      setUsers(usersRes.data.users || usersRes.data);
      setBookings(bookingsRes.data.bookings || bookingsRes.data);
    } catch (err) {
      console.error("Failed to load admin data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditMovieId(null);
    setNewMovie({
      title: "", genre: "", duration: "", price: "", description: "",
      language: "", director: "", status: "now_showing", ageRating: "", poster: "", backdrop: "", rating: "",
    });
    setShowModal(true);
  };

  const handleOpenEdit = (movie) => {
    setIsEditing(true);
    setEditMovieId(movie.id);
    setNewMovie({
      ...movie,
      genre: Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre,
    });
    setShowModal(true);
  };

  const handleSaveMovie = async (e) => {
    e.preventDefault();
    try {
      const formattedMovie = {
        ...newMovie,
        genre: typeof newMovie.genre === "string" ? newMovie.genre.split(",").map((g) => g.trim()) : newMovie.genre,
        duration: Number(newMovie.duration),
        price: Number(newMovie.price),
        rating: Number(newMovie.rating),
      };
      
      if (isEditing) {
        const res = await api.put(`/movies/${editMovieId}`, formattedMovie);
        setMovies(movies.map((m) => (m.id === editMovieId ? res.data.movie : m)));
      } else {
        const res = await api.post("/movies", formattedMovie);
        setMovies([...movies, res.data.movie]);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Failed to save movie", err.response?.data || err);
      alert(err.response?.data?.message || "Failed to save movie. Check Console.");
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm("Are you sure you want to delete this movie?")) return;
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter((m) => m.id !== id));
    } catch (err) {
      console.error("Failed to delete movie", err);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  const handleToggleSuspendUser = async (user) => {
    const newStatus = user.status === "Suspended" ? "Active" : "Suspended";
    try {
      await api.patch(`/users/${user.id}/status`, { status: newStatus });
      setUsers(users.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
    } catch (err) {
      console.error("Failed to suspend user", err);
      alert("Failed to update user status.");
    }
  };

  const handleBookingStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/bookings/${id}/status`, { status: newStatus });
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
    } catch (err) {
      console.error("Failed to change booking status", err);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: "100px", textAlign: "center" }}>
        <Loader />
      </div>
    );
  }

  return (
    <div className="container admin-dashboard-page">
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="admin-tabs">
          <button className={`tab-btn ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>Overview</button>
          <button className={`tab-btn ${activeTab === "movies" ? "active" : ""}`} onClick={() => setActiveTab("movies")}>Movies ({movies.length})</button>
          <button className={`tab-btn ${activeTab === "users" ? "active" : ""}`} onClick={() => setActiveTab("users")}>Users ({users.length})</button>
          <button className={`tab-btn ${activeTab === "bookings" ? "active" : ""}`} onClick={() => setActiveTab("bookings")}>Bookings ({bookings.length})</button>
        </div>
      </div>

      {activeTab === "overview" && stats && (
        <div className="stats-grid">
          <div className="stat-card"><h3>Total Movies</h3><p>{stats.totalMovies}</p></div>
          <div className="stat-card"><h3>Total Users</h3><p>{stats.totalUsers}</p></div>
          <div className="stat-card"><h3>Total Bookings</h3><p>{stats.totalBookings}</p></div>
          <div className="stat-card"><h3>Total Revenue</h3><p>{stats.totalRevenue} EGP</p></div>
        </div>
      )}

      {activeTab === "movies" && (
        <div className="admin-section">
          <div className="section-actions">
            <h2>Movie Management</h2>
            <Button onClick={handleOpenAdd}>+ Add New Movie</Button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Movie</th>
                  <th>Genre</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {movies.map((movie) => (
                  <tr key={movie.id}>
                    <td>
                      <Link 
                        to={`/movies/${movie.id}`} 
                        className="admin-movie-info" 
                        style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: 'inherit' }}
                      >
                        <img src={movie.poster} alt={movie.title} style={{ width: '50px', height: '75px', objectFit: 'cover', borderRadius: '4px' }} />
                        <div>
                          <div style={{ fontWeight: 'bold' }}>{movie.title}</div>
                          <div style={{ fontSize: '0.8rem', color: '#888' }}>{movie.language} · {movie.director}</div>
                        </div>
                      </Link>
                    </td>
                    <td>{Array.isArray(movie.genre) ? movie.genre.join(", ") : movie.genre}</td>
                    <td>{movie.duration} min</td>
                    <td>{movie.price} EGP</td>
                    <td>
                      <span className={`status-badge status-${movie.status}`}>
                        {movie.status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <Button variant="outline" size="sm" onClick={() => handleOpenEdit(movie)}>Edit</Button>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteMovie(movie.id)}>Delete</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {showModal && (
            <div className="modal-backdrop">
              <form className="modal-card" onSubmit={handleSaveMovie}>
                <h3>{isEditing ? "Edit Movie" : "Add New Movie"}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <input type="text" placeholder="Title" value={newMovie.title} onChange={(e) => setNewMovie({...newMovie, title: e.target.value})} required />
                  <input type="text" placeholder="Director" value={newMovie.director} onChange={(e) => setNewMovie({...newMovie, director: e.target.value})} required />
                  <input type="text" placeholder="Genre (comma separated)" value={newMovie.genre} onChange={(e) => setNewMovie({...newMovie, genre: e.target.value})} required />
                  <input type="text" placeholder="Language (e.g. English)" value={newMovie.language} onChange={(e) => setNewMovie({...newMovie, language: e.target.value})} required />
                  <input type="text" placeholder="Age Rating (e.g. PG-13)" value={newMovie.ageRating} onChange={(e) => setNewMovie({...newMovie, ageRating: e.target.value})} required />
                  <input type="number" step="0.1" placeholder="Rating (e.g. 8.5)" value={newMovie.rating} onChange={(e) => setNewMovie({...newMovie, rating: e.target.value})} required />
                  <input type="number" placeholder="Duration (mins)" value={newMovie.duration} onChange={(e) => setNewMovie({...newMovie, duration: e.target.value})} required />
                  <input type="number" placeholder="Price (EGP)" value={newMovie.price} onChange={(e) => setNewMovie({...newMovie, price: e.target.value})} required />
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <select value={newMovie.status} onChange={(e) => setNewMovie({...newMovie, status: e.target.value})} style={{ padding: "10px", background: "#1a1a1a", color: "#fff", border: "1px solid #444", borderRadius: "6px" }}>
                    <option value="now_showing">Now Showing</option>
                    <option value="coming_soon">Coming Soon</option>
                    <option value="ended">Ended</option>
                  </select>
                </div>
                
                <input type="url" placeholder="Poster Image URL" value={newMovie.poster} onChange={(e) => setNewMovie({...newMovie, poster: e.target.value})} required />
                <input type="url" placeholder="Backdrop Image URL" value={newMovie.backdrop} onChange={(e) => setNewMovie({...newMovie, backdrop: e.target.value})} required />
                <textarea placeholder="Description" value={newMovie.description} onChange={(e) => setNewMovie({...newMovie, description: e.target.value})} required />
                
                <div className="modal-buttons">
                  <Button type="button" variant="outline" onClick={() => setShowModal(false)}>Cancel</Button>
                  <Button type="submit">{isEditing ? "Update Movie" : "Save Movie"}</Button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {activeTab === "users" && (
        <div className="admin-section">
          <h2>User Management</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td><span className={`role-badge role-${u.role?.toLowerCase()}`}>{u.role}</span></td>
                    <td>
                       <span style={{ color: u.status === 'Suspended' ? '#e74c3c' : '#2ecc71', fontWeight: 'bold', fontSize: '0.8rem' }}>
                         {u.status || "Active"}
                       </span>
                    </td>
                    <td>
                      {u.role !== 'Admin' && (
                        <div style={{ display: "flex", gap: "8px" }}>
                          <Button variant="outline" size="sm" onClick={() => handleToggleSuspendUser(u)}>
                            {u.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                          </Button>
                          <Button variant="outline-danger" size="sm" onClick={() => handleDeleteUser(u.id)}>
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === "bookings" && (
        <div className="admin-section">
          <h2>All System Bookings</h2>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking ID</th>
                  <th>Movie</th>
                  <th>Seats</th>
                  <th>Total</th>
                  <th>Status (Change)</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id}>
                    <td style={{ fontFamily: "monospace", fontSize: "0.8rem" }}>{b.id}</td>
                    <td>{b.movieTitle}</td>
                    <td>{b.seats?.join(", ")}</td>
                    <td>{b.totalPrice} EGP</td>
                    <td>
                      <select 
                        value={b.status} 
                        onChange={(e) => handleBookingStatusChange(b.id, e.target.value)}
                        style={{ background: '#222', color: '#fff', border: '1px solid #444', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;