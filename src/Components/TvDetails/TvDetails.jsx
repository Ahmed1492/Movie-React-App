import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const TvDetails = () => {
  let firstTermGettingImage = "https://image.tmdb.org/t/p/original";
  const getFixedNum = (num) => {
    return num?.toFixed(2);
  };
  const [tvShowDetails, setTvShowDetails] = useState([]);
  let tvId = useParams().id;
  const getTvShowsDetails = async () => {
    try {
      let myResponse = await axios.get(
        `https://api.themoviedb.org/3/tv/${tvId}?api_key=8f73b322c038e47e7d9f838dd8c58334&language=en-US`
      );
      setTvShowDetails(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTvShowsDetails();
  }, []);
  return tvShowDetails?.length !== 0 ? (
    <div className="container-fluid">
      <div className="row p-5 justify-content-center m-auto gap-2">
        <div className="col-xxl-4 col-xl-4 col-lg-5">
          <div className="movieImage ">
            <img
              src={firstTermGettingImage + tvShowDetails?.poster_path}
              alt="PosterLogeImage"
              className="w-100"
            />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="detailsOfMovie">
            <h1 className="mb-5">{tvShowDetails?.title}</h1>
            <div className="d-flex gap-4">
              {tvShowDetails?.genres?.map((type, index) => (
                <span key={index} className="movieCategory bg-info py-2 px-2">
                  {type.name}
                </span>
              ))}
            </div>
            <div className="movieDescription">
              <p>vote : {getFixedNum(tvShowDetails?.vote_average)}</p>
              <p>vote Count : {tvShowDetails?.vote_count}</p>
              <p>Release Date : {tvShowDetails?.release_date}</p>
              <p>Popularity : {tvShowDetails?.popularity}</p>
            </div>
            <p className="w-75 fs-5 mt-5 text-secondary">
              {tvShowDetails?.overview}
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="spinner"></div>
  );
};
