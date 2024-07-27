import React, { useContext, useEffect } from "react";
import { LoaderContext } from "../../App";

import Loader from "../../components/Loader/Loader";
import Header from "../../layout/Header/Header";
import Search from "../../components/Search/Search";
import Hero from "../../layout/Hero/Hero";
import Footer from "../../layout/Footer/Footer";

const Home = () => {
  const { isLoading } = useContext(LoaderContext);

  if (isLoading) {
    return <Loader cardCount={21} width="300px" />;
  }

  return (
    <>
      <Header />
      <Search />
      <Hero />
      <Footer />
    </>
  );
};

export default Home;