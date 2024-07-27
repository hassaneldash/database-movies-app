import React, { useEffect, useRef, useState,useContext  } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAndSetData } from "../Reusable/Reusable";

import Jumbotron from "../Jumbotron/Jumbotron";
import SearchListItem from "./SearchListItem";
import { ThemeContext } from '../../ThemeContext';
import "../../index.css";
import "./Search.css";

const Search = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const listRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);
  useEffect(() => {
    fetchAndSetData(
      `https://api.themoviedb.org/3/search/multi?query=${searchTerm}&api_key=${process.env.REACT_APP_API_KEY}`,
      (searchResults) => {
        setSearchResults(
          searchResults.filter((result) => result?.media_type !== "person")
        );
      },
      "results"
    );
  }, [searchTerm]);

  const handleSearchResultClick = () => {
    const queryParam = encodeURIComponent(searchTerm);
    navigate(`/search/results?q=${queryParam}`);
  };

  return (
    <>
      <div className="img__overlay_container default__margin_top">
        <img
          src="https://images.hdqwalls.com/download/spider-man-soars-in-darkness-0x-1920x1080.jpg"
          alt="Background Poster"
        />
      </div>

      <div className="search_container__wrapper">
        <div className="search_content__wrapper">
          <div className="search_bar standard__border_radius standard__box_shadow d-flex justify-content-center align-items-center flex-column">
            <Jumbotron text="Search Movies, TV Shows, and Generes" marginTop="0" />

            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ol className="standard__border_radius standard__bg standard__box_shadow d-flex justify-content-center align-items-center flex-column mx-auto p-0">
          {searchResults && searchResults.length >= 3 ? (
            searchResults
              .slice(0, 3)
              .map((item, index) => (
                <SearchListItem key={index} ref={listRef} items={[item]} />
              ))
          ) : searchTerm !== "" &&
            searchResults.map((item, index) => (
              <SearchListItem key={index} ref={listRef} items={[item]} />
            )) ? (
            <h6 style={{ padding: "2rem", width: "90%", textAlign: "center" }}>
              No match found for "{searchTerm}"
            </h6>
          ) : null}

          {searchResults && searchResults.length > 3 && (
            <button
              className="view_all_btn border-0 p-3 w-100 bg-warning"
              onClick={handleSearchResultClick}
            >
              View all results
              <i className="fa fa-arrow-right mx-2" aria-hidden="true"></i>
            </button>
          )}
        </ol>
      </div>
    </>
  );
};

export default Search;