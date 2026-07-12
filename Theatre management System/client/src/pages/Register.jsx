import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

 const handleRegister = async () => {
  if (!name || !email || !password) {
    alert("Fill all fields");
    return;
  }

  try {
    const res = await axios.post(
      "http://localhost:5000/api/auth/register",
      {
        name,
        email,
        password
      }
    );

    if (res.data.success) {
      alert(res.data.message);
      navigate("/login"); // ✅ successனா மட்டும்
    } else {
      alert(res.data.message);
    }

  } catch (error) {
    console.log(error);
    alert("Something went wrong ❌");
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <div style={styles.card}>
          <h2 style={styles.title}>Join the Show 🍿</h2>

          <input
            style={styles.input}
            placeholder="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button style={styles.button} onClick={handleRegister}>
            Start Watching →
          </button>

          <p style={styles.text}>
            Already a member?{" "}
            <Link to="/login" style={styles.link}>
              Continue Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    backgroundImage:
      "url('https://wallpapercave.com/wp/wp11294972.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  overlay: {
    height: "100%",
    backgroundColor: "rgba(255,255,255,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "350px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)"
  },
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  input: {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  boxSizing: "border-box",   // 🔥 முக்கியம்
  fontSize: "14px"
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#ff4d4f",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
  },
  text: {
    marginTop: "20px",
    textAlign: "center"
  },
  link: {
    color: "#ff4d4f",
    textDecoration: "none"
  }
};

export default Register;