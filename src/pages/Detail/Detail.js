import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LoaderContext } from "../../App";
import {fetchAndSetData,dynamicDocTitle} from "../../components/Reusable/Reusable";
import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import MovieDetail from "../../components/ItemDetail/MovieDetail";
import TvDetail from "../../components/ItemDetail/TvDetail";
import Footer from "../../layout/Footer/Footer";
import Person from "../../components/Cards/Person";
import Video from "../../components/Videos/Video";
import Reviews from "../../components/Reviews/Reviews";
import { useLanguage } from '../../context/Context';
import "./Detail.css";

const Detail = () => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const { isLoading } = useContext(LoaderContext);
  const { id, mediaType } = useParams();
  const [itemDetails, setItemDetails] = useState(null);
  const [trailerVideos, setTrailerVideos] = useState([]);
  const [people, setPeople] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}`,
      setItemDetails
    );

    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}`,
      setTrailerVideos,
      "results"
    );

    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}`,
      setPeople,
      "cast"
    );

    fetchAndSetData(
      `https://api.themoviedb.org/3/${mediaType}/${id}/reviews?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}`,
      setReviews,
      "results"
    );

    setLanguageChanged(false)
  }, [id, mediaType, selectedLanguage, languageChanged]);

  if (isLoading || !itemDetails || !trailerVideos || !people || !reviews) {
    return <Loader cardCount={21} width={"300px"} />;
  }

  return (
    <>
      {itemDetails && trailerVideos && people && reviews && (
        <>
          <Header />

          {mediaType === "movie" ? (
            <MovieDetail movie={itemDetails} />
          ) : (
            <TvDetail tv={itemDetails} />
          )}

          <Person people={people} />
          <hr
            style={{
              width: "90%",
              color: "#e2e2e2",
              height: "3px",
              margin: "1rem auto",
            }}
          />
          <Video videos={trailerVideos} />
          <hr
            style={{
              width: "90%",
              color: "#e2e2e2",
              height: "3px",
              margin: "1rem auto",
            }}
          />
          <Reviews items={reviews} />
          <Footer />
        </>
      )}
    </>
  );
};

export default Detail;
