import React, { createContext, useContext, useState } from 'react';

const Context = createContext();

export const Provider = ({ children }) => {
    const [selectedLanguage, setSelectedLanguage] = useState('en-US');
    const [loader, setLoader] = useState(true);
    const [header, setHeader] = useState("Trending");
    
    const updateLanguage  = (newLanguage) => {
        setSelectedLanguage(newLanguage);
    };

    const GetFavorite = () => {
        setLoader(false);
        setHeader("Favorite Movies");
    }

    return (
        <Context.Provider value={{ GetFavorite,  selectedLanguage, updateLanguage }}>
            {children}
        </Context.Provider>
    );
};

export const useLanguage = () => {
    return useContext(Context);
};