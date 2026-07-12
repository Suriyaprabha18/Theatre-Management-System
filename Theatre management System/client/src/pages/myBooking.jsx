import React, { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Dear User");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        // Get user
        const userRes = await axios.get("http://localhost:5000/api/auth/get-user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (userRes.data.success) {
          setUserName(userRes.data.data.name);
        }

        // Get bookings
        const res = await axios.get("http://localhost:5000/api/auth/my-bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setBookings(res.data.data);
        }
      } catch (err) {
        console.error(err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const requestCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/request-cancel",
        { bookingId: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      window.location.reload();
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  };

  if (loading) return <p style={styles.loading}>Loading your bookings...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.welcome}>Welcome, {userName} 👋</h1>

      {bookings.length === 0 ? (
        <p style={styles.noBookings}>No bookings found</p>
      ) : (
        <div style={styles.grid}>
          {bookings.map((b) => (
            <div key={b._id} style={styles.card}>
              <h3 style={styles.movie}>{b.movieName}</h3>

              <p><strong>Theatre:</strong> {b.theatreName}</p>
              <p><strong>Date:</strong> {b.date}</p>
              <p><strong>Time:</strong> {b.time}</p>
              <p><strong>Seats:</strong> {b.seats.map(s => s.seat).join(", ")}</p>

              <p style={getStatusStyle(b.status)}>
                {b.status.replace("_", " ").toUpperCase()}
              </p>

              {b.status === "booked" && (
                <button style={styles.button} onClick={() => requestCancel(b._id)}>
                  Request Cancel
                </button>
              )}

              {b.status === "cancel_requested" && (
                <p style={{ color: "orange", fontWeight: "bold" }}>
                  Cancel Requested sent
                </p>
              )}

              {b.status === "cancelled" && (
                <p style={{ color: "red", fontWeight: "bold" }}>
                  Cancelled
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    padding: "30px",
    background: "#f5f7fb",
    minHeight: "100vh",
    fontFamily: "Segoe UI, sans-serif",
  },
  welcome: {
    textAlign: "center",
    marginBottom: "30px",
    color: "#333",
  },
  loading: {
    textAlign: "center",
    marginTop: "50px",
    fontSize: "18px",
  },
  noBookings: {
    textAlign: "center",
    fontSize: "18px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "0.2s",
  },
  movie: {
    marginBottom: "10px",
    color: "#222",
  },
  button: {
    marginTop: "10px",
    padding: "8px 12px",
    border: "none",
    background: "#007bff",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

// 🔥 Dynamic status color
const getStatusStyle = (status) => {
  if (status === "booked") return { color: "green", fontWeight: "bold" };
  if (status === "cancel_requested") return { color: "orange", fontWeight: "bold" };
  if (status === "cancelled") return { color: "red", fontWeight: "bold" };
};

export default MyBookings;