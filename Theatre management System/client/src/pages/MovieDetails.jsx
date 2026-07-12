import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const API_KEY = "b494e17ede5051ef5c6121e5f9a37d71";

export default function MovieDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [id]);

  if (!movie) return <h2 style={{ color: "white" }}>Loading...</h2>;

  const backdrop = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : "https://via.placeholder.com/1920x1080";

  return (
    <>
      {/* ===== CSS INSIDE SAME FILE ===== */}
      <style>{`
        .movie-details {
          min-height: 100vh;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .overlay {
          min-height: 100vh;
          width: 100%;
          background: linear-gradient(
            to right,
            rgba(0,0,0,0.95),
            rgba(0,0,0,0.7)
          );
          display: flex;
          align-items: center;
          gap: 50px;
          padding: 60px;
          color: white;
        }

        .poster {
          width: 300px;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.6);
        }

        .content {
          max-width: 700px;
        }

        .content h1 {
          font-size: 42px;
          margin-bottom: 10px;
        }

        .overview {
          margin-top: 20px;
          line-height: 1.7;
          color: #ddd;
        }

        .book-btn {
          margin-top: 30px;
          padding: 14px 30px;
          font-size: 18px;
          border: none;
          background: #e50914;
          color: white;
          border-radius: 8px;
          cursor: pointer;
          transition: 0.3s;
        }

        .book-btn:hover {
          background: #b20710;
          transform: scale(1.05);
        }
      `}</style>

      {/* ===== UI ===== */}
      <div
        className="movie-details"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        <div className="overlay">
          
          {/* Poster */}
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          {/* Movie Info */}
          <div className="content">
            <h1>{movie.title}</h1>

            <p>⭐ Rating: {movie.vote_average}</p>
            <p>⏱ Runtime: {movie.runtime} mins</p>
            <p>📅 Release: {movie.release_date}</p>

            <p className="overview">{movie.overview}</p>

            {/* Book Button */}
            <button 
             onClick={() =>
    navigate("/theatres", {
      state: { movie }
    })
  }
            className="book-btn">
               Book Now
            </button>
          </div>

        </div>
      </div>
    </>
  );
}