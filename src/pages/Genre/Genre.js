import React, { useContext, useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  fetchAndSetDataForPagination,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Pagination from "../../components/Pagination/Pagination";
import Card from "../../components/Cards/Card";
import Footer from "../../layout/Footer/Footer";
import { useLanguage } from '../../context/Context';

const GenreList = () => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const { id, genre, mediaType } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageNum = parseInt(page);

  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [items, setItems] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    dynamicDocTitle(
      `ELDash Movies - Explore ${genre.toLowerCase()} ${
        mediaType === "movie" ? "movies" : "tv shows"
      } in TMDB`
    );
  }, [genre, mediaType]);

  useEffect(() => {
    fetchAndSetDataForPagination(
      `https://api.themoviedb.org/3/discover/${mediaType}?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}&with_genres=${id}&page=${currentPage}`,
      setItems,
      (totalPages) => {
        setTotalPages(Math.min(totalPages, 500));
      },
      navigate
    );
    setLanguageChanged(false)
  }, [mediaType, id, genre, totalPages, currentPage, selectedLanguage, languageChanged, navigate]);

  useEffect(() => {
    setCurrentPage(pageNum || 1);
  }, [pageNum]);

  const handlePageNumClick = (page) => {
    setCurrentPage(page);
    navigate(`/genre/${mediaType}/${genre}/${id}?page=${page}`);
  };

  if (!items) {
    return <Loader cardCount={21} width={"300px"} />;
  }

  return (
    <>
      {items && (
        <>
          <Header />

          <Jumbotron
            text={`${
              mediaType === "movie" ? "Movies" : "TV Shows"
            } in '${genre}' Genre`}
          />

          {items.length > 0 && (
            <>
              <h6 className="text-center m-2 p-2">
                Showing page{" "}
                <span className="not_badge text-primary">'{currentPage}'</span>{" "}
                of {totalPages}
              </h6>

              <Pagination
                handlePageNumClick={handlePageNumClick}
                totalPages={totalPages}
                currentPage={currentPage}
              />

              <div className="items_container__wrapper mt-2 mx-auto p-3">
                {mediaType === "movie"
                  ? items.map((item) => (
                      <Card
                        items={[{ ...item, media_type: "movie" }]}
                        key={item.id}
                      />
                    ))
                  : items.map((item) => (
                      <Card
                        items={[{ ...item, media_type: "tv" }]}
                        key={item.id}
                      />
                    ))}
              </div>

              <h6 className="text-center m-2 p-2">
                Showing page{" "}
                <span className="not_badge text-primary">'{currentPage}'</span>{" "}
                of {totalPages}
              </h6>

              <Pagination
                handlePageNumClick={handlePageNumClick}
                totalPages={totalPages}
                currentPage={currentPage}
              />
            </>
          )}

          <Footer />
        </>
      )}
    </>
  );
};

export default GenreList;
