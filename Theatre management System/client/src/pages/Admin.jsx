import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    fetchBookings();
    fetchAdmin();
  }, []);

  const fetchAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/auth/get-user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data.success) {
        setAdminName(res.data.data.name);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchBookings = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        "http://localhost:5000/api/admin/bookings/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.data.success) setBookings(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId, action) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/auth/handle-cancel",
        { bookingId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div style={styles.container}>
      
      {/* 🔥 Sidebar */}
      <div style={styles.sidebar}>
        <h2 style={{ color: "#333" }}>Admin Panel</h2>

        <button style={styles.navBtn} onClick={() => setActiveTab("home")}>🏠 Home</button>
        <button style={styles.navBtn} onClick={() => setActiveTab("users")}>👤 Users</button>
        <button style={styles.navBtn} onClick={() => setActiveTab("movies")}>🎬 Add Movie</button>
        <button style={styles.navBtn} onClick={() => setActiveTab("logout")}>🚪 Logout</button>
      </div>

      {/* 🔥 Main Content */}
      <div style={styles.main}>
        <h1 style={styles.header}>Welcome, {adminName} 👋</h1>

        {/* 🏠 HOME */}
        {activeTab === "home" && (
          <>
            <h3>All Bookings</h3>

            {loading ? (
              <p>Loading...</p>
            ) : (
              <div style={styles.grid}>
                {bookings.map((b) => (
                  <div key={b._id} style={styles.card}>
                    <h3>{b.movieName}</h3>
                    <p><b>User:</b> {b.userId?.name}</p>
                    <p><b>Email:</b> {b.userId?.email}</p>
                    <p><b>Theatre:</b> {b.theatreName}</p>
                    <p><b>Date:</b> {b.date}</p>
                    <p><b>Time:</b> {b.time}</p>
                    <p><b>Seats:</b> {b.seats.map(s => s.seat).join(", ")}</p>

                    <p style={getStatusStyle(b.status)}>
                      {b.status.toUpperCase()}
                    </p>

                    {b.status === "cancel_requested" && (
                      <>
                        <button
                          style={styles.approve}
                          onClick={() => handleCancel(b._id, "approve")}
                        >
                          Approve
                        </button>

                        <button
                          style={styles.reject}
                          onClick={() => handleCancel(b._id, "reject")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* 👤 USERS */}
        {activeTab === "users" && (
          <div>
            <h3>User Booking Details</h3>
            {bookings.map((b) => (
              <div key={b._id} style={styles.card}>
                <p><b>{b.userId?.name}</b> booked <b>{b.movieName}</b></p>
              </div>
            ))}
          </div>
        )}

        {/* 🎬 ADD MOVIE */}
        {activeTab === "movies" && (
          <div>
            <h3>Add Movie (Dummy UI)</h3>
            <input placeholder="Movie Name" style={styles.input} />
            <input placeholder="Image URL" style={styles.input} />
            <button style={styles.button}>Add Movie</button>
          </div>
        )}

        {/* 🚪 LOGOUT */}
        {activeTab === "logout" && logout()}
      </div>
    </div>
  );
};

// 🎨 Styles
const styles = {
  container: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI",
    background: "#f5f7fb",
  },
  sidebar: {
    width: "220px",
    background: "#ffffff",
    padding: "20px",
    boxShadow: "2px 0 10px rgba(0,0,0,0.05)",
  },
  navBtn: {
    width: "100%",
    padding: "10px",
    marginTop: "10px",
    border: "none",
    background: "#e9ecef",
    cursor: "pointer",
    borderRadius: "6px",
    textAlign: "left",
  },
  main: {
    flex: 1,
    padding: "30px",
  },
  header: {
    marginBottom: "20px",
    color: "#333",
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
  },
  approve: {
    marginTop: "10px",
    marginRight: "10px",
    padding: "6px 10px",
    background: "green",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  reject: {
    marginTop: "10px",
    padding: "6px 10px",
    background: "red",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  input: {
    display: "block",
    marginBottom: "10px",
    padding: "8px",
    width: "250px",
  },
  button: {
    padding: "8px 12px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};

const getStatusStyle = (status) => {
  if (status === "booked") return { color: "green", fontWeight: "bold" };
  if (status === "cancel_requested") return { color: "orange", fontWeight: "bold" };
  if (status === "cancelled") return { color: "red", fontWeight: "bold" };
};

export default AdminDashboard;