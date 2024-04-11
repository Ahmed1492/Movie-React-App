import { Route, Routes } from "react-router-dom";
import { NavBar } from "./Components/NavBar/NavBar";
import { Home } from "./Components/Home/Home";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Register/Register";
import { NotFoundComponent } from "./Components/NotFoundComponent/NotFoundComponent";
import { Movies } from "./Components/Movies.jsx/Movies";
import { TvShow } from "./Components/tvShows/TvShow";
import { MovieDetails } from "./Components/MovieDetails/MovieDetails";
import { TvDetails } from "./Components/TvDetails/TvDetails";
import { jwtDecode } from "jwt-decode";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function App() {
  const [logedInUser, setLogedInUser] = useState(localStorage.getItem('userToke'));
  const getUserToken = () => {
    const userToken = localStorage.getItem('userToke');
    let decodedToken = jwtDecode(userToken);
    setLogedInUser(decodedToken);
  };
  const ProtectedRoute = ({ children }) => {
    return logedInUser !== null ? children : <Navigate to="/login" replace={true} />;
  };
  return (
    <>
      <NavBar logedInUser={logedInUser} setLogedInUser={setLogedInUser} />
      <Routes >
        <Route path="/" element={<ProtectedRoute> <Home /></ProtectedRoute>} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login logedInUser={logedInUser} getUserToken={getUserToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home/movies" element={<ProtectedRoute> <Movies /></ProtectedRoute>} />
        <Route path="/home/tvShows" element={<ProtectedRoute><TvShow /> </ProtectedRoute>} />
        <Route path="/home/movies/:id" element={<ProtectedRoute><MovieDetails /></ProtectedRoute>} />
        <Route path="/home/tvShows/:id" element={<ProtectedRoute><TvDetails /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundComponent />} />
      </Routes>
    </>
  );
}

export default App;
