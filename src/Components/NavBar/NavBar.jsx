import React from "react";
import "./NavBar.scss";
import { Link } from "react-router-dom";
export const NavBar = ({ logedInUser, setLogedInUser }) => {
  const handlLogOut = () => {
    setLogedInUser(null);
    localStorage.removeItem("userToke");
  };
  return (
    <div className="myNav">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            NOXE
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {logedInUser !== null && (
                <>
                  <li className="nav-item">
                    <Link
                      to="/home"
                      className="nav-link active"
                      aria-current="page"
                    >
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/home/movies" className="nav-link">
                      Movies
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/home/tvShows" className="nav-link">
                      TvShows
                    </Link>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav align-items-center  ms-auto mb-2 mb-lg-0">
              {logedInUser == null ? (
                <>
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link to="/register" className="nav-link">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item fs-4 d-flex gap-3 me-4 ">
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-spotify"></i>
                    <i className="fa-brands fa-instagram"></i>
                    <i className="fa-brands fa-youtube"></i>
                  </li>
                  <li className="nav-item">
                    <Link
                      onClick={handlLogOut}
                      className="nav-link text-danger fs-5 "
                    >
                      LogOut
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
