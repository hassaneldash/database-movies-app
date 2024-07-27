import React, { useEffect, useState } from "react";
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
import { useLanguage } from "../../context/Context";
import { useSelector } from "react-redux";

const Wishlist = () => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const page = searchParams.get("page");
  const pageNum = parseInt(page);
  const favorites = useSelector((state) => state.favorites);
  const [currentPage, setCurrentPage] = useState(pageNum || 1);
  const [wishlist, setWishlist] = useState([]);
  const [totalPages, setTotalPages] = useState(null);

  useEffect(() => {
    dynamicDocTitle("ELDash Wishlist. Explore your favorites.");
  }, []);

  useEffect(() => {
    const getWishlistMovies = () => {
      return favorites.slice((currentPage - 1) * 20, currentPage * 20);
    };

    setWishlist(getWishlistMovies());
    setTotalPages(Math.ceil(favorites.length / 20));

    setLanguageChanged(false);
  }, [currentPage, favorites, languageChanged]);

  const handleWishlistClick = () => {
    setCurrentPage(1);
    navigate(`/wishlist?page=1`);
  };

  const handlePageNumClick = (page) => {
    setCurrentPage(page);
    navigate(`/wishlist?page=${page}`);
  };

  if (!wishlist) {
    return <Loader cardCount={21} width="300px" />;
  }

  return (
    <>
      {wishlist && (
        <>
          <Header handlePageClick={handleWishlistClick} />

          <Jumbotron text="Your Favorite Movies. Explore now." />

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
              items={wishlist}
              setSortedItems={setWishlist}
              mediaType="wishlist"
              currentPage={currentPage}
            />

            <div className="items_container__wrapper mt-2 mx-auto p-3">
              <Card items={wishlist} />
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

export default Wishlist;
