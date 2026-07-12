import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from  "./pages/Register";
import Admin from "./pages/Admin";
import MovieDetails from "./pages/MovieDetails";
import Theatres from "./pages/Theatres";
import SeatSelection from "./pages/SeatSelection"; 
import MyBookings from "./pages/myBooking";
import BookingSuccess from "./pages/BookingSuccess";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/theatres" element={<Theatres />} />
        <Route path="/seats" element={<SeatSelection />} /> 
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/booking-success" element={<BookingSuccess />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;