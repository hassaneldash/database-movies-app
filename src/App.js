import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeContext } from './ThemeContext';
import Home from "./pages/Home/Home";
import Movies from "./pages/Movies/Movies";
import TV from "./pages/TV/TV";
import Detail from "./pages/Detail/Detail";
import Entertainment from "./pages/Entertainment/Entertainment";
import Credit from "./pages/Credits/Credit";
import Results from "./pages/Results/Results";
import GenreList from "./pages/Genre/Genre";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import { Provider } from './context/Context';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Wishlist from "./pages/Wishlist/Wishlist";
import UserDetails from "./pages/UserDetails/UserDetails";

export const LoaderContext = React.createContext();

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);


  const LoaderContextValues = {
    isLoading,
    setIsLoading,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  

  return (
    <div className="App">
      <Provider>
      <LoaderContext.Provider value={LoaderContextValues}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/tv_shows" element={<TV />} />
            <Route path="/:mediaType/:id" element={<Detail />} />
            <Route path="/entertainment/:title" element={<Entertainment />} />
            <Route path="/credit/:person/:id" element={<Credit />} />
            <Route path="/search">
              <Route path="/search/:mediaType/:id" element={<Detail />} />
              <Route path="/search/results/*" element={<Results />} />
            </Route>
            <Route
              path="/genre/:mediaType/:genre/:id"
              element={<GenreList />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/user-details" component={<UserDetails />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </LoaderContext.Provider>
      </Provider>
    </div>
  );
}

export default App;
