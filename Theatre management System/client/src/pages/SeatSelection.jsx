import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


const generateSeats = (rows = 9, cols = 14, bookedSeats = []) => {
  const seats = [];
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  for (let r = 0; r < rows; r++) {
    const row = [];

    for (let c = 1; c <= cols; c++) {
      let type = "silver";

      if (r < 2) type = "vip";
      else if (r < 4) type = "platinum";
      else if (r < 6) type = "gold";

      const id = `${letters[r]}${c}`;

      row.push({
        id,
        type,
        status: bookedSeats.includes(id) ? "booked" : "available",
      });
    }

    seats.push(row);
  }

  return seats;
};

export default function SeatSelection() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { movie, selected, date } = state || {};

  const user = JSON.parse(localStorage.getItem("user"));
  const locationName = localStorage.getItem("location");

  const [bookedSeats, setBookedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);

  const priceMap = {
    vip: 400,
    platinum: 300,
    gold: 220,
    silver: 150,
  };

  const colors = {
    vip: "#ff4d4f",
    platinum: "#6309f3",
    gold: "#1df109",
    silver: "#cf4ec9",
  };

  /* ---------------- LOAD RAZORPAY ---------------- */
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => setRazorpayLoaded(true);
    document.body.appendChild(script);
  }, []);

  /* ---------------- FETCH BOOKED SEATS ---------------- */
  useEffect(() => {
    fetchBookedSeats();
  }, []);

  const fetchBookedSeats = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings/get-booked-seats",
        {
          theatreName: selected.theatre,
          date,
          time: selected.time,
        }
      );

      const booked = res.data.data || [];
      setBookedSeats(booked);
      setSeats(generateSeats(9, 14, booked));
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------------- SELECT SEAT ---------------- */
  const toggleSeat = (rowIndex, seatIndex) => {
    const seat = seats[rowIndex][seatIndex];
    if (seat.status === "booked") return;

    const updated = [...seats];

    if (seat.status === "selected") {
      updated[rowIndex][seatIndex].status = "available";
      setSelectedSeats((prev) =>
        prev.filter((s) => s.id !== seat.id)
      );
    } else {
      updated[rowIndex][seatIndex].status = "selected";
      setSelectedSeats((prev) => [...prev, seat]);
    }

    setSeats(updated);
  };

  const totalPrice = selectedSeats.reduce(
    (sum, seat) => sum + priceMap[seat.type],
    0
  );

  /* ---------------- PAYMENT ---------------- */
 const handlePayment = async () => {
  if (loading) return; // 🚫 prevent multiple clicks
  setLoading(true);

  if (!razorpayLoaded) {
    alert("Payment loading...");
    setLoading(false);
    return;
  }

  if (!selectedSeats.length) {
    alert("Select seats da 😑");
    setLoading(false);
    return;
  }

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

console.log("FULL USER 👉", user);
console.log("REAL USER 👉", user);
console.log("USER ID 👉", user?._id);

  if (!userId) {
    alert("User not logged in da 😑");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      { amount: totalPrice }
    );

    const options = {
      key: "rzp_test_SXzvVrwZ2PpODd",
      amount: res.data.amount,
      currency: "INR",
      name: "Cinema App",
      description: "Ticket Booking",
      order_id: res.data.id,

      handler: async function (response) {
        if (!response.razorpay_payment_id) {
          alert("Payment not completed");
          return;
        }

        try {
          // ✅ FIXED seats structure
          const formattedSeats = selectedSeats.map((s) => ({
            seat: s.id,
            type: s.type,
          }));

          const bookingData = {
            userId: userId, // ✅ correct
            movieId: String(movie?.id || movie?._id), // ✅ safe
            movieName: movie?.title,
            theatreName: selected?.theatre,
            location: locationName,
            date,
            time: selected?.time,
            seats: formattedSeats, // ✅ correct structure
            totalAmount: totalPrice,
            paymentId: response.razorpay_payment_id,
          };

          console.log("SENDING 👉", bookingData);

          const bookingRes = await axios.post(
            "http://localhost:5000/api/bookings/book-ticket",
            bookingData,
             {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}` // 🔥 IMPORTANT
    }
  }
          );

          console.log("BOOKING SUCCESS 👉", bookingRes.data);

          alert("Booking Confirmed 🎉"); window.location.href = "/home";
        } catch (err) {
          console.log("BOOKING ERROR 👉", err.response?.data || err);
          alert("Payment success but booking failed 😭");
        }
      },
    };

    const rzp = new window.Razorpay(options);

    rzp.on("payment.failed", function (response) {
      console.log("Payment Failed:", response);
      alert("Payment failed da 😑");
    });

    rzp.open();

  } catch (err) {
    console.log("ORDER ERROR 👉", err.response?.data || err);
    alert("Payment initialization failed");
  }
};
  if (!movie || !selected) return <h2>No show selected</h2>;

  /* ---------------- UI ---------------- */

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>{movie.title}</h2>
        <p>{selected.theatre} • {selected.time}</p>
      </div>

      <div style={styles.seatArea}>
        {seats.map((row, rowIndex) => {
          const curveOffset = Math.abs(4 - rowIndex) * 8;

          return (
            <div
              key={rowIndex}
              style={{
                ...styles.row,
                marginLeft: curveOffset,
                marginRight: curveOffset,
              }}
            >
              <span style={styles.rowLabel}>
                {String.fromCharCode(65 + rowIndex)}
              </span>

              {row.map((seat, seatIndex) => {
                const isVIP = seat.type === "vip";

                return (
                  <div
                    key={seat.id}
                    onClick={() =>
                      toggleSeat(rowIndex, seatIndex)
                    }
                    style={{
                      ...styles.seat,
                      width: isVIP ? 38 : 26,
                      height: isVIP ? 34 : 26,
                      background:
                        seat.status === "booked"
                          ? "#ccc"
                          : seat.status === "selected"
                          ? colors[seat.type]
                          : "#fff",
                      border:
                        seat.status === "available"
                          ? `1px solid ${colors[seat.type]}`
                          : "none",
                    }}
                  >
                    {isVIP ? "🛋" : seatIndex + 1}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>

      <div style={styles.screenContainer}>
        <div style={styles.screen}></div>
      </div>

      <div style={styles.legend}>
  <span style={{ color: colors.vip }}>🛋 VIP ₹400</span>
  <span style={{ color: colors.platinum }}>■ Platinum ₹300</span>
  <span style={{ color: colors.gold }}>■ Gold ₹220</span>
  <span style={{ color: colors.silver }}>■ Silver ₹150</span>
</div>

      <div style={styles.bottomBar}>
        <div>
          <strong>{selectedSeats.length}</strong> Seats
        </div>
        <div>₹{totalPrice}</div>

        <button style={styles.bookBtn} onClick={handlePayment} disabled={loading}>
          Pay Now 💳
        </button>
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: { background: "#f5f5f5", minHeight: "100vh", paddingBottom: "80px" },
  header: { background: "#fff", padding: "15px", borderBottom: "1px solid #eee" },
  seatArea: { marginTop: "30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" },
  row: { display: "flex", gap: "6px", alignItems: "center" },
  rowLabel: { fontSize: "12px", width: "20px" },
  seat: { borderRadius: "4px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", cursor: "pointer" },
  screenContainer: { marginTop: "40px", textAlign: "center" },
  screen: { width: "60%", height: "30px", margin: "auto", background: "#dfe6e9", borderRadius: "6px", boxShadow: "0 6px 15px rgba(0,0,0,0.25)" },
  legend: { display: "flex", justifyContent: "center", gap: "25px", marginTop: "20px", fontSize: "13px" },
  bottomBar: { position: "fixed", bottom: 0, left: 0, right: 0, background: "#fff", padding: "10px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 -2px 10px rgba(0,0,0,0.1)" },
  bookBtn: { background: "#f84464", color: "#fff", border: "none", padding: "8px 20px", borderRadius: "6px", cursor: "pointer" },
};