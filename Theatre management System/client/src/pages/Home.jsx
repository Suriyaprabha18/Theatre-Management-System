import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [showMenu, setShowMenu] = useState(false);
  const banners = [
  "https://img.freepik.com/free-photo/composition-cinema-elements-pink-background-with-copy-space_23-2148416788.jpg?semt=ais_incoming&w=740&q=80",
  "https://images.stockcake.com/public/4/8/d/48dabbed-544f-4305-8e5b-732bc654c084_large/movie-night-essentials-stockcake.jpg",
  "https://c4.wallpaperflare.com/wallpaper/693/739/819/love-image-hd-computer-desktop-wallpaper-preview.jpg"
];
const [currentBg, setCurrentBg] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentBg((prev) => (prev + 1) % banners.length);
  }, 3000);

  return () => clearInterval(interval);
}, []);
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark");
  const [location, setLocation] = useState("Coimbatore");

  const API_KEY = "b494e17ede5051ef5c6121e5f9a37d71";

  const getMovies = async () => {
    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&region=IN&language=ta-IN&page=${page}`
    );
    setMovies(res.data.results.slice(0, 60)); // 👉 6 rows * 10 columns
  };

  useEffect(() => {
  const delay = setTimeout(() => {
    getMovies();
  }, 500); // 0.5 sec delay

  return () => clearTimeout(delay);
}, [page, search]);

  const bg = theme === "dark" ? "#0f172a" : "#f1f5f9";
  const text = theme === "dark" ? "white" : "black";

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh" }}>

      {/* 🔥 HEADER */}
      <div style={{
        display: "flex",
        alignItems: "center",
        padding: "15px 20px",
        gap: "15px",
        background: theme === "dark" ? "#055c77" : "#e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>

        {/* TITLE */}
        <h2 style={{ fontWeight: "bold" }}>
          Cine<span style={{ color: "red" }}>mark</span>
        </h2>

        {/* LOCATION */}
           <select
  value={location}
  onChange={(e) =>{
     console.log("Selected:", e.target.value);
    localStorage.setItem("location", e.target.value);
    setLocation(e.target.value);
  }}
  style={{
    padding: "10px 15px",
    borderRadius: "10px",
    border: "none",                
    outline: "none",              
    background: "#f2f4f8",         
    color: "black",
    fontSize: "14px",
    cursor: "pointer",
    minWidth: "180px",
  
  }}
>
    <option>Chennai</option>
    <option>Bangalore</option>
    <option>Mumbai</option>
    <option>Delhi</option>
    <option>Hyderabad</option>
    <option>Kolkata</option>
    <option>Pune</option>
    <option>Ahmedabad</option>
    <option>Coimbatore</option>
    <option>Madurai</option>
    <option>Salem</option>
    <option>Tirunelveli</option>
    <option>Erode</option>
    <option>Trichy</option>
    <option>Vellore</option>
    <option>Thoothukudi</option>
    <option>Dindigul</option>
    <option>Kanchipuram</option>

</select>
        {/* SEARCH */}
        <input
  type="text"
  placeholder="Search movies..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    flex: 1,
    padding: "10px",
    borderRadius: "20px",
    border: "none"
  }}
/>

        {/* THEME BUTTON */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          style={{
            padding: "8px",
            borderRadius: "20px",
            border: "none",
            cursor: "pointer"
          }}
        >
          {theme === "dark" ? "🌙" : "☀️"}
        </button>
 {/*SIGN IN BUTTON */}
        {!user ? (
  <button
    onClick={() => navigate("/login")}
    style={{
      padding: "10px 10px",
      borderRadius: "10px",
      border: "none",
      outline: "none",
      background: "#f30909",
      color: "white",
      fontSize: "14px",
      cursor: "pointer",
      minWidth: "180px",
    }}
  >
    Sign In
  </button>
) : (
  <div style={{ position: "relative" }}>
    <img
      src="https://i.pinimg.com/236x/0d/54/86/0d5486b7cb2945bf0db29b86e9bec07b.jpg"
      width="35"
      onClick={() => setShowMenu(!showMenu)}
      style={{ cursor: "pointer" }}
    />

    {showMenu && (
  <div
    style={{
      position: "absolute",
      right: 0,
      top: "40px",
      background: "white",
      color: "black",
      padding: "10px",
      borderRadius: "8px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
    }}
  >
    <p 
      onClick={() => navigate("/my-bookings")} 
      style={{ cursor: "pointer", margin: "5px 0", fontWeight: "bold" }}
    >
      My Bookings
    </p>
        
        <p
          onClick={() => {
            localStorage.clear();
            navigate("/login");
          }}
          style={{ color: "red", cursor: "pointer" }}
        >
          Logout
        </p>
      </div>
    )}
  </div>
)}
</div>

      {/* 🎞 SLIDER */}
      {/* 🎬 BACKGROUND SLIDER */}
<div
  style={{
    position: "relative",
    width: "100%",
    height: "85vh",
    overflow: "hidden"
  }}
>
  {/* BG IMAGE */}
  <div
    style={{
      width: "100%",
      height: "100%",
      backgroundImage: `url(${banners[currentBg]})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      transition: "background-image 1s ease-in-out"
    }}
  />

  {/* DARK OVERLAY */}
  <div
    style={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background:
        "linear-gradient(to right, rgba(0,0,0,0.8), rgba(0,0,0,0.3))"
    }}
  />

  {/* 🔥 STATIC TEXT  */}
  <div
  style={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    width: "100%"
  }}
>
  <h1 style={{ fontSize: "68px", marginBottom: "10px" }}>
    Welcome to Cinemark
  </h1>
  <p style={{ fontSize: "18px" }}>
    Experience the magic of great performances! Whether you're a fan of drama, animation, romance, action, or sci-fi, we have something special for you. Join us for an unforgettable journey into the world of theater.
  </p>
</div>
</div>
      {/* 🎬 MOVIE GRID (6x10) */}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gap: "10px",
        padding: "20px"
      }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{
            borderRadius: "10px",
            overflow: "hidden"
          }} onClick={() => navigate(`/movie/${movie.id}`)}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover"
              }}
            />
          </div>
        ))}
      </div>

      {/* 📄 PAGINATION */}
     <div style={{ textAlign: "center", margin: "20px" }}>
  
  {/* ⬅️ PREVIOUS */}
  <button
    onClick={() => setPage(page - 1)}
    disabled={page === 1}
    style={{
      margin: "5px",
      padding: "10px 20px",
      background: page === 1 ? "#555" : "red",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: page === 1 ? "not-allowed" : "pointer"
      
    }}
  >
    ⬅ Prev
  </button>

  {/* PAGE NUMBER */}
  <span style={{ margin: "0 15px", fontWeight: "bold" }}>
     {page}
  </span>

  {/* ➡️ NEXT */}
  <button
    onClick={() => setPage(page + 1)}
    style={{
      margin: "5px",
      padding: "10px 20px",
      background: "red",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: "pointer"
    }}
  >
    Next ➡
  </button>

</div>

      {/* 🔻 FOOTER */}
      <div style={{
        textAlign: "center",
        padding: "15px",
        background: theme === "dark" ? "#020617" : "#e2e8f0"
      }}>
        © {new Date().getFullYear()} Cinemark
      </div>

    </div>
  );
  }



export default Home;