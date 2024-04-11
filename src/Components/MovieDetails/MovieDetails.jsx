import React, { useEffect, useState } from "react";
import "./MovieDetails.scss";
import { useParams } from "react-router-dom";
import axios from "axios";
export const MovieDetails = () => {
  let param = useParams();
  let firstTermGettingImage = "https://image.tmdb.org/t/p/original";
  const [movieDetails, setMovieDetails] = useState([]);
  const getFixedNum = (num) => {
    return num.toFixed(2);
  };
  let getDetails = async () => {
    try {
      let myResponse = await axios.get(
        `https://api.themoviedb.org/3/movie/${param.id}?api_key=8f73b322c038e47e7d9f838dd8c58334&language=en-US`
      );
      setMovieDetails(myResponse?.data);
    } catch (error) {
      console.log(error);
    }
  };
  console.log(movieDetails);
  useEffect(() => {
    getDetails();
  }, []);
  return movieDetails?.length !== 0 ? (
    <div className="container-fluid">
      <div className="row p-5 justify-content-center m-auto gap-2">
        <div className="col-xxl-4 col-xl-4 col-lg-5">
          <div className="movieImage ">
            <img
              src={firstTermGettingImage + movieDetails?.poster_path}
              alt="PosterLogeImage"
              className="w-100"
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="detailsOfMovie">
            <h1 className="mb-5">{movieDetails?.title}</h1>
            <div className="d-flex gap-4">
              {movieDetails?.genres?.map((type, index) => (
                <span key={index} className="movieCategory bg-info py-2 px-2">
                  {type.name}
                </span>
              ))}
            </div>
            <div className="movieDescription">
              <p>vote : {getFixedNum(movieDetails?.vote_average)}</p>
              <p>vote Count : {movieDetails?.vote_count}</p>
              <p>Release Date : {movieDetails?.release_date}</p>
              <p>Popularity : {movieDetails?.popularity}</p>
            </div>
            <p className="w-75 fs-5 mt-5 text-secondary">
              {movieDetails?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner"></div>
  );
};
