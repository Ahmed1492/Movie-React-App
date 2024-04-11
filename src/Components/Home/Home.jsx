import React, { useEffect, useState } from "react";
import "./Home.scss";
import axios from "axios";
import { Link } from "react-router-dom";
let firstTermGettingImage = "https://image.tmdb.org/t/p/original";

export const Home = () => {
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const formatNumber = (num) => {
    return num.toFixed(2);
  };
  const getMoviesFromApi = async () => {
    try {
      let myRespons = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week?api_key=8f73b322c038e47e7d9f838dd8c58334"
      );
      setMovies(myRespons.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  const getTvShowsFromApi = async () => {
    try {
      let myRespons = await axios.get(
        "https://api.themoviedb.org/3/trending/tv/week?api_key=8f73b322c038e47e7d9f838dd8c58334"
      );
      setTvShows(myRespons.data.results);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMoviesFromApi();
    getTvShowsFromApi();
  }, []);
  return movies.length !== 0 && tvShows.length !== 0 ? (
    <div className="container-fluid">
      <div className="row mt-5 ">
        <div className="col-lg-4 col-md-12 col-sm-12 d-flex  ">
          <div className="innerDiv d-flex ps-5 flex-column w-100  justify-content-center ">
            <div className="topLine mb-4 bg-secondary"></div>
            <h2>Trending</h2>
            <h2>Movies</h2>
            <h2>to Watch Now</h2>
            <p className="text-secondary mt-3">Most Watched Movies By days</p>
            <div className="bottomLine  bg-secondary"></div>
          </div>
        </div>
        {movies?.map((singleMovie, index) => (
          <Link
            to={`/home/movies/${singleMovie.id}`}
            key={index}
            className="mt-5 text-white position-relative ps-5 col-lg-2 col-md-6 col-sm-12"
          >
            <div to={`/home/movies/${singleMovie.id}`}>
              <img
                src={firstTermGettingImage + singleMovie.poster_path}
                alt="posterImage"
              />
            </div>
            <h4 className="mt-2">{singleMovie.title}</h4>
            <span className="bg-info voteAverage">
              {formatNumber(singleMovie.vote_average)}
            </span>
          </Link>
        ))}
      </div>
      <div className="row mt-5 align-item-center ">
        <div className="col-lg-4 col-md-12 col-sm-12 d-flex ">
          <div className="innerDiv d-flex ps-5 flex-column w-100 justify-content-center  ">
            <div className="topLine mb-4 bg-secondary"></div>
            <h2>Trending</h2>
            <h2> Shows Tv </h2>
            <h2>to Watch Now</h2>
            <p className="text-secondary mt-3">Most Watched TV Shows By days</p>
            <div className="bottomLine  bg-secondary"></div>
          </div>
        </div>
        {tvShows?.map((singleMovie, index) => (
          <Link
            to={`/home/tvShows/${singleMovie.id}`}
            key={index}
            className="mt-5 text-white position-relative ps-5 col-lg-2 col-md-6 col-sm-12"
          >
            <div className="innerDiv ">
              <img
                src={firstTermGettingImage + singleMovie.poster_path}
                alt="posterImage"
              />
            </div>
            <h4 className="mt-2">{singleMovie.name}</h4>
            <span className="bg-info voteAverage">
              {formatNumber(singleMovie.vote_average)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="spinner"></div>
  );
};
