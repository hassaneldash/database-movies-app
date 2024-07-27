import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorites, removeFromFavorites } from '../../store/actions/ToggleFav';
import "./Card.css";
import { useLanguage } from '../../context/Context';

const Card = ({ items, wishlist }) => {
  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);

  const handleCardClick = (mediaType, id) => {
    navigate(`/${mediaType}/${id}?language=${selectedLanguage}`);
  };

  const isMovieInFavorites = (item) => {
    return favorites.some((favMovie) => favMovie.id === item.id);
  };

  const handleToggleWishlist = (item) => {
    if (isMovieInFavorites(item)) {
      dispatch(removeFromFavorites(item.id));
    } else {
      dispatch(addToFavorites(item));
    }
  };

  return (
    <>
      {items &&
        items.map((item, index) => (
          <div
            key={item?.id || index}
            className="movie_card standard__card_bg standard__box_shadow"
            title={item.original_name || item.original_title}
            onClick={() => handleCardClick(item?.media_type, item?.id)}
          >

            <button
              className="star-button standard__badge badge "
              onClick={(e) => {
                e.stopPropagation();
                handleToggleWishlist(item);
              }}
            >
              {isMovieInFavorites(item) ? (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/754px-Star_full.svg.png"
                  alt="Filled Star"
                  height={24}
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/2048px-Empty_Star.svg.png"
                  alt="Empty Star"
                  height={24}
                />
              )}
            </button>

            {/* <span className="standard__badge badge">4K</span> */}
            <div className="card_img">
              <img
                src={
                  item.poster_path
                    ? `https://image.tmdb.org/t/p/w1280${item.poster_path}`
                    : "https://is1-ssl.mzstatic.com/image/thumb/Purple113/v4/c6/81/92/c6819287-9f6b-737c-8da9-cd67d0b211c7/App_Icon_-_Small-marketing.lsr/1200x630bb.png"
                }
                alt={item.original_name || item.original_title}
              />
            </div>

            <div className="movie_details p-2">
              <h6>
                {(item.original_name && item.original_name.length > 16
                  ? `${item.original_name.substring(0, 16)}...`
                  : item.original_name) ||
                  (item.original_title && item.original_title.length > 16
                    ? `${item.original_title.substring(0, 16)}...`
                    : item.original_title)}
              </h6>

              <div className="movie_description d-flex justify-content-between align-items-center">
                <p className="mb-0">
                  {(item.first_air_date && item.first_air_date.split("-")[0]) ||
                    (item.release_date && item.release_date.split("-")[0])}
                </p>
                <p className="mb-0">
                  {item.original_language
                    ? item.original_language.toUpperCase()
                    : "N/A"}
                </p>
                <p className="mb-0 bg-warning px-2 py-0 rounded-3">
                  {item.media_type ? item.media_type.toUpperCase() : "N/A"}
                </p>
              </div>

              <div className="imdb_ratings d-flex justify-content-between align-items-center mt-1">
                <img
                  src="https://m.media-amazon.com/images/G/01/IMDb/brand/guidelines/imdb/IMDb_Logo_Rectangle_Gold._CB443386186_.png"
                  alt="IMDB"
                  width="30px"
                />

                <p className="mb-0">
                  {item.vote_average && item.vote_count ? (
                    <>
                      <i
                        className="fa fa-star mx-1"
                        aria-hidden="true"
                        style={{ color: "#FFC107" }}
                      ></i>
                      <span className="not_badge">
                        {item.vote_average.toFixed(1)}
                      </span>
                      <span className="not_badge">({item.vote_count})</span>
                    </>
                  ) : (
                    <span className="not_badge">Sorry, Not Available</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default Card;
