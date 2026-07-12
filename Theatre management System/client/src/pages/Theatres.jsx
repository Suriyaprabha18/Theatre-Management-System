import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Theatres() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const movie = state?.movie;

  const user = JSON.parse(localStorage.getItem("user"));
  const location = localStorage.getItem("location");

  const [theatres, setTheatres] = useState([]);
  const [selected, setSelected] = useState({});
  const [date, setDate] = useState("");

  const defaultTime = ["10:00 AM", "2:00 PM", "6:00 PM", "9:45 PM"]; // Common time for theatres with no shows

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    if (!location) return;
    try {
      const res = await axios.get(
        `http://localhost:5000/api/theatres/get-theatres/${location}`
      );
      // Ensure every theatre has at least one show
      const updatedTheatres = (res.data.data || []).map((t) => ({
        ...t,
        shows: t.shows && t.shows.length > 0 ? t.shows : defaultTime.map((time) => ({ time })),
      }));
      setTheatres(updatedTheatres);
    } catch (err) {
      console.log("Error fetching theatres:", err);
      setTheatres([]);
    }
  };

  if (!movie) return <h2>No movie selected</h2>;

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.title}>{movie.title}</h1>
        <p style={styles.location}>📍 {location || "Unknown Location"}</p>
      </div>

      {/* DATE */}
      <div style={styles.dateBox}>
        <span>Select Date:</span>
        <input
          type="date"
          onChange={(e) => setDate(e.target.value)}
          style={styles.dateInput}
        />
      </div>

      {/* THEATRES LIST */}
      {theatres.map((t) => (
        <div key={t._id} style={styles.card}>
          <div style={styles.cardTop}>
            <h2 style={styles.theatreName}>{t.name}</h2>
            <span style={styles.tag}>Available</span>
          </div>

          {/* SHOW TIMES */}
          <div style={{ marginBottom: "5px", fontWeight: "500" }}>
            Show Times:
          </div>
          <div style={styles.showRowHorizontal}>
            {t.shows.map((s, i) => (
              <button
                key={i}
                onClick={() => setSelected({ theatre: t.name, time: s.time })}
                style={{
                  ...styles.timeBtn,
                  background:
                    selected.theatre === t.name && selected.time === s.time
                      ? "#ff4d4d"
                      : "#fff",
                  color:
                    selected.theatre === t.name && selected.time === s.time
                      ? "#fff"
                      : "#333",
                  border:
                    selected.theatre === t.name && selected.time === s.time
                      ? "none"
                      : "1px solid #ccc",
                }}
              >
                {s.time}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* BOOK BUTTON */}
      <button
        onClick={() => {
          if (!selected.theatre || !selected.time || !date) {
            return alert("Fill all fields da 😑");
          }
          navigate("/seats", {
            state: {
              movie,
              selected,
              date,
            },
          });
        }}
        style={styles.bookBtn}
      >
        Select Seats
      </button>
    </div>
  );
}

export default Theatres;

const styles = {
  container: {
    padding: "30px",
    background: "#f4f6f9",
    minHeight: "100vh",
    fontFamily: "sans-serif",
    maxWidth: "900px",
    margin: "auto",
  },
  header: { marginBottom: "20px" },
  title: { fontSize: "28px", fontWeight: "bold", color: "#222" },
  location: { color: "#777" },
  dateBox: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
  },
  dateInput: { padding: "8px", borderRadius: "6px", border: "1px solid #ccc" },
  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    transition: "0.3s",
  },
  cardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" },
  theatreName: { fontSize: "20px", fontWeight: "600" },
  tag: {
    background: "#e6f7ee",
    color: "#28a745",
    padding: "4px 10px",
    borderRadius: "20px",
    fontSize: "12px",
  },
  showRowHorizontal: {
    display: "flex",
    overflowX: "auto",
    gap: "10px",
    paddingBottom: "5px",
  },
  timeBtn: {
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  bookBtn: {
    width: "100%",
    marginTop: "20px",
    padding: "15px",
    background: "#28a745",
    border: "none",
    color: "white",
    fontSize: "18px",
    borderRadius: "10px",
    cursor: "pointer",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  },
};