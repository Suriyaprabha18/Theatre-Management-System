import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function BookingSuccess() {
  const location = useLocation();
  const navigate = useNavigate();

  const { movieName, theatreName, seats, date, time } = location.state || {};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h2 style={styles.title}>🎉 Booking Confirmed</h2>

        <div style={styles.divider}></div>

        <div style={styles.detail}>
          <span>🎬 Movie:</span>
          <b>{movieName}</b>
        </div>

        <div style={styles.detail}>
          <span>🏢 Theatre:</span>
          <b>{theatreName}</b>
        </div>

        <div style={styles.detail}>
          <span>📅 Date:</span>
          <b>{date}</b>
        </div>

        <div style={styles.detail}>
          <span>⏰ Time:</span>
          <b>{time}</b>
        </div>

        <div style={styles.detail}>
          <span>🎟️ Seats:</span>
          <b>{seats?.map((s) => s.seat).join(", ")}</b>
        </div>

        <div style={styles.divider}></div>

        <button
          style={styles.button}
          onClick={() => navigate("/")}
        >
          Go Home
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e1e2f, #2c2c54)",
  },

  card: {
    background: "#fff",
    padding: "30px",
    borderRadius: "16px",
    width: "350px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    textAlign: "center",
  },

  title: {
    marginBottom: "10px",
    color: "#2c2c54",
  },

  divider: {
    height: "1px",
    background: "#ddd",
    margin: "15px 0",
  },

  detail: {
    display: "flex",
    justifyContent: "space-between",
    margin: "8px 0",
    fontSize: "15px",
  },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    background: "#2c2c54",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default BookingSuccess;