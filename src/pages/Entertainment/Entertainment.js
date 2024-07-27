import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchAndSetData,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Header from "../../layout/Header/Header";
import Card from "../../components/Cards/Card";
import Footer from "../../layout/Footer/Footer";
import { useLanguage } from '../../context/Context';

const Entertainment = () => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const { title } = useParams();
  const [movies, setMovies] = useState([]);
  const [tvShows, setTvShows] = useState([]);

  useEffect(() => {
    dynamicDocTitle(
      `ELDash Movies - ${
        title === "on_the_air"
          ? "On the air"
          : title === "top_rated"
          ? "Top rated"
          : "Popular"
      } TV Shows and Movies to discover. Explore now.`
    );
  }, [title]);

  useEffect(() => {
    fetchAndSetData(
      `https://api.themoviedb.org/3/tv/${title}?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}`,
      setTvShows,
      "results"
    );

    fetchAndSetData(
      `https://api.themoviedb.org/3/movie/${
        title === "on_the_air" ? "now_playing" : title
      }?api_key=${process.env.REACT_APP_API_KEY}`,
      setMovies,
      "results"
    );
    setLanguageChanged(false)
  }, [title, selectedLanguage, languageChanged]);

  if (!tvShows || !movies) {
    return <Loader cardCount={21} width="300px" />;
  }

  return (
    <>
      {tvShows && movies && (
        <>
          <Header />
          <Jumbotron
            text={`${
              title === "on_the_air"
                ? "On the Air"
                : title === "top_rated"
                ? "Top Rated"
                : "Popular"
            } TV Shows`}
          />

          <div className="items_container__wrapper mt-2 mx-auto p-3">
            {tvShows.map((tv) => (
              <Card items={[{ ...tv, media_type: "tv" }]} key={tv.id} />
            ))}
          </div>

          <hr
            style={{
              width: "90%",
              color: "#e2e2e2",
              height: "3px",
              margin: "1rem auto",
            }}
          />
          
          <Jumbotron
            text={`${
              title === "on_the_air"
                ? "On the Air"
                : title === "top_rated"
                ? "Top Rated"
                : "Popular"
            } Movies`}
          />

          <div className="items_container__wrapper mt-2 mx-auto p-3">
            {movies.map((movie) => (
              <Card
                items={[{ ...movie, media_type: "movie" }]}
                key={movie.id}
              />
            ))}
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default Entertainment;
