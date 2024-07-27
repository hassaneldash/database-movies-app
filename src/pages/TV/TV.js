import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  fetchAndSetDataForPagination,
  dynamicDocTitle,
} from "../../components/Reusable/Reusable";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Jumbotron from "../../components/Jumbotron/Jumbotron";
import Card from "../../components/Cards/Card";
import Pagination from "../../components/Pagination/Pagination";
import Sort from "../../components/Sort/Sort";
import Footer from "../../layout/Footer/Footer";
import { useLanguage } from '../../context/Context';

const TV = () => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageNum = parseInt(page);
  const [tvShows, setTvShows] = useState([]);
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    dynamicDocTitle("ELDash Movies. Explore now.");
  }, []);

  useEffect(() => {
    fetchAndSetDataForPagination(
      `https://api.themoviedb.org/3/trending/tv/day?language=${selectedLanguage}&api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`,
      setTvShows,
      (totalPages) => {
        setTotalPages(Math.min(totalPages, 500));
      },
      navigate
    );
    setLanguageChanged(false)
  }, [currentPage, selectedLanguage, languageChanged, navigate]);

  const handleTvShowsClick = () => {
    setCurrentPage(1);
    navigate(`/tv?page=1`);
  };

  const handlePageNumClick = (page) => {
    setCurrentPage(page);
    navigate(`/tv_shows?page=${page}`);
  };

  if (!tvShows) {
    return <Loader cardCount={21} width="300px" />;
  }

  return (
    <>
      {tvShows && (
        <>
          <Header handlePageClick={handleTvShowsClick} />

          <Jumbotron text="Tons of Content. Explore now." />

          <div className="items_container position-relative">
            <h6 className="text-center m-2 p-2">
              Showing page{" "}
              <span className="not_badge text-primary">'{currentPage}'</span> of{" "}
              {totalPages}
            </h6>

            <Pagination
              handlePageNumClick={handlePageNumClick}
              totalPages={totalPages}
              currentPage={currentPage}
            />

            <Sort
              items={tvShows}
              setSortedItems={setTvShows}
              mediaType="tv shows"
              currentPage={currentPage}
            />

            <div className="items_container__wrapper mt-2 mx-auto p-3">
              <Card items={tvShows} />
            </div>

            <h6 className="text-center m-2 p-2">
              Showing page{" "}
              <span className="not_badge text-primary">'{currentPage}'</span> of{" "}
              {totalPages}
            </h6>

            <Pagination
              handlePageNumClick={handlePageNumClick}
              totalPages={totalPages}
              currentPage={currentPage}
            />
          </div>

          <Footer />
        </>
      )}
    </>
  );
};

export default TV;
