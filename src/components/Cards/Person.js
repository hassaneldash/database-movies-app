import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from '../../context/Context';
import "./Person.css";

const Person = ({ people }) => {
  const { selectedLanguage } = useLanguage();
  const [languageChanged, setLanguageChanged] = useState(false);
  const navigate = useNavigate();
  const handlePersonClick = (person, id) => {
    navigate(`/credit/${person}/${id}?language=${selectedLanguage}`);
  };

  return (
    <>
      {people && people.length !== 0 ? (
        <div className="person_container__wrapper m-2 p-2">
          <h2 className="p-2">Credits - Actors and Crew members</h2>

          <div className="person_container d-flex justify-content-start align-items-center overflow-auto">
            {people.map((person) => (
              <div
                key={person.id}
                className="person__card standard__border_radius standard__box_shadow m-2 p-2 "
                type="button"
                onClick={() => handlePersonClick(person.name, person.id)}
              >
                <div className="person_img">
                  <img
                    className="standard__border_radius"
                    src={
                      person.profile_path !== null
                        ? `https://image.tmdb.org/t/p/w1280${person.profile_path}`
                        : "https://assets.dryicons.com/uploads/icon/svg/9872/ab3c0a16-6f14-4817-a30b-443273de911d.svg"
                    }
                    alt={person.name || person.original_name}
                  />
                </div>

                <div className="person_detail my-2">
                  <h6>{person.name || person.original_name}</h6>

                  <p className="mb-0 not_badge">
                    {person.character
                      ? `As ${person.character}`
                      : "Not Provided"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <h2 className="text-center mt-2 p-2">Sorry, No Credits found.</h2>
      )}
    </>
  );
};

export default Person;
