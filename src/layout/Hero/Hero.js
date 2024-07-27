import React, { useState, useEffect, useRef, useContext } from "react";
import { LoaderContext } from "../../App";
import { fetchAndSetData } from "../../components/Reusable/Reusable";
import { useLanguage } from '../../context/Context';
import Loader from "../../components/Loader/Loader";
import Card from "../../components/Cards/Card";

import "../../index.css";
import "./Hero.css";

const Hero = () => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const categories = ["all", "tv", "movie"];
  const { isLoading, setIsLoading } = useContext(LoaderContext);
  const titleRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeList, setActiveList] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetchAndSetData(
      `https://api.themoviedb.org/3/trending/${activeCategory}/day?language=${selectedLanguage}`,
      setActiveList,
      "results"
    );
    setIsLoading(false);
    // eslint-disable-next-line
  }, [activeCategory, selectedLanguage, languageChanged]);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  if (isLoading) {
    return <Loader cardCount={1} width="180px" />;
  }

  return (
    <>
      {!isLoading && (
        <>
          <h6 style={{ margin: "1.2rem" }} ref={titleRef}>
            {categories.map((category) => (
              <span
                key={category}
                className={`mx-1 ${
                  activeCategory === category ? "standard__badge" : ""
                }`}
                style={{
                  background: "transparent",
                }}
                title={category}
                onClick={() => handleCategoryClick(category)}
              >
                {category === "all"
                  ? "Trending"
                  : category === "tv"
                  ? "TV Shows"
                  : "Movies"}
              </span>
            ))}
          </h6>

          <div className="items_container__wrapper mt-2 mx-auto p-2">
            <Card items={activeList} />
          </div>
        </>
      )}
    </>
  );
};

export default Hero;
