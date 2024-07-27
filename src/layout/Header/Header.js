import React, { useEffect, useRef, useState, useContext } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchAndSetData } from "../../components/Reusable/Reusable";
import { useLanguage } from "../../context/Context";
import "./Header.css";
import { ThemeContext } from "../../ThemeContext";
const Header = ({ handlePageClick }) => {
  const navigate = useNavigate();
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);
  const [entertainment, setEntertainment] = useState(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  // const favoritesCount = useSelector((state) => state.favorites.favoritesCount || 0);
  const { selectedLanguage, updateLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const listRef = useRef(null);

  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleMovieGenreSelection = (index) => {
    const id = movieGenres[index].id;
    const genre = movieGenres[index].name;

    navigate(`/genre/movie/${genre}/${id}?page=1`);
    setDropdownOpen(false);
  };

  const handleTvGenreSelection = (index) => {
    const id = tvGenres[index].id;
    const genre = tvGenres[index].name;

    navigate(`/genre/tv/${genre}/${id}?page=1`);
    setDropdownOpen(false);
  };

  const handleEntertainmentSelection = (title) => {
    setEntertainment(title);
    navigate(`/entertainment/${entertainment}`);
    setDropdownOpen(false);
  };

  const handleChangeLanguage = (newLanguage) => {
    updateLanguage(newLanguage);
    setLanguageChanged(true);
  };

  useEffect(() => {
    fetchAndSetData(
      `https://api.themoviedb.org/3/genre/movie/list?language=${selectedLanguage}`,
      setMovieGenres,
      "genres"
    );

    fetchAndSetData(
      `https://api.themoviedb.org/3/genre/tv/list?language=${selectedLanguage}`,
      setTvGenres,
      "genres"
    );
    setLanguageChanged(false);
  }, [selectedLanguage, languageChanged]);

  const DropdownMenu = ({ title, genres, handleSelection }) => (
    <div className="col-mega_menu">
      <h6 className="title">{title}</h6>
      <ul className="px-0 py-1">
        {genres.map((genre, index) => (
          <li
            key={index}
            className="dropdown-item m-1"
            onClick={() => handleSelection(index)}
          >
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className={`header ${theme}`}>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light standard__box_shadow">
        <div className="container-fluid">
          <Link
            className="navbar-brand logo_text"
            to="/"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <p
              className="gradient_text mb-0"
              style={{
                fontWeight: 1000,
              }}
            >
              ELDash Movies{" "}
            </p>
          </Link>
          <button
            className="navbar-toggler shadow-none px-2 py-1"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => setDropdownOpen(!isDropdownOpen)}
          >
            <p className="gradient_text mb-0" style={{ fontWeight: 700 }}>
              MENU
            </p>
          </button>
          <div
            className={`collapse navbar-collapse ${
              isDropdownOpen ? "show" : ""
            }`}
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav" ref={listRef}>
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>
              </li>

              <li className="nav-item" data-title="on_the_air">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/entertainment/on_the_air"
                  onClick={() => handleEntertainmentSelection("on_the_air")}
                >
                  Now Playing{" "}
                </Link>
              </li>

              <li className="nav-item" data-title="top_rated">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/entertainment/top_rated"
                  onClick={() => handleEntertainmentSelection("top_rated")}
                >
                  Top Rated
                </Link>
              </li>

              <li className="nav-item" data-title="popular">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to="/entertainment/popular"
                  onClick={() => handleEntertainmentSelection("popular")}
                >
                  Popular
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/movies?page=1`}
                  onClick={handlePageClick}
                >
                  Movies
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className="nav-link"
                  aria-current="page"
                  to={`/tv_shows?page=1`}
                  onClick={handlePageClick}
                >
                  TV Shows
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  data-bs-toggle="dropdown"
                >
                  Genres
                </Link>
                <div className="dropdown-menu mega_menu" role="menu">
                  <div className={`header ${theme}`}>
                    <div className="mega_menu_col">
                      <div className="col-6 col-12">
                        <DropdownMenu
                          title="Movies"
                          genres={movieGenres}
                          handleSelection={handleMovieGenreSelection}
                        />
                      </div>
                      <div className="col-6 col-12">
                        <DropdownMenu
                          title="TV Shows"
                          genres={tvGenres}
                          handleSelection={handleTvGenreSelection}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to=""
                  data-bs-toggle="dropdown"
                >
                  {`Language: ${selectedLanguage}`}
                </Link>
                <div className="dropdown-menu mega_menu" role="menu">
                  <div className="mega_menu_col">
                    <div className="col-6 col-12">
                      <button
                        className="btn"
                        onClick={() => handleChangeLanguage("en-US")}
                      >
                        {" "}
                        English{" "}
                      </button>
                      <button
                        className="btn"
                        onClick={() => handleChangeLanguage("ar-SA")}
                      >
                        {" "}
                        Arabic{" "}
                      </button>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/wishlist">
                  Wishlist
                </Link>
              </li>

              <li className="nav-item nav-link hov" onClick={toggleTheme}>
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
