import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Stylesheets/Home.css";
import { Header } from "../Components/Commons/Header";
import Video from "../images/VideoFondo.mp4";
import { FaSearch } from "react-icons/fa";
import { BsArrowDownCircle } from "react-icons/bs";
import ScrollIntoView from "react-scroll-into-view";
import mapOverlay from "../images/mapOverlay.png";
import { Footer } from "../Components/Commons/Footer";
import Enviroment1 from "../images/enviroment1.png";
import Enviroment2 from "../images/enviroment2.png";
import Enviroment3 from "../images/enviroment3.png";
import Enviroment4 from "../images/enviroment4.png";
import { getUserByEmail } from "../api/User";
export const Home = () => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSearchClick = () => {
    navigate(`/map-location?search=${searchValue}`);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearchClick();
    }
  };
  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
  };
  return (
    <>
      <Header Login Questions />
      {/*HEADER/ */}
      {/*Video-Input/ */}
      <section className="video-container">
        <video autoPlay muted loop>
          <source src={Video}></source>
        </video>
        <h1>¡Busca tu plaza Svelt mas cercana!</h1>
        <div className="main-search-container">
          <input
            list="cities"
            className="main-search-container-input"
            type="text"
            placeholder="Buscar..."
            onKeyDown={handleKeyDown}
            onChange={handleInputChange}
          />
          <datalist id="cities">
            <option value="El Puerto de Santa María"></option>
            <option value="Cádiz"></option>
            <option value="Chiclana"></option>
            <option value="Jerez de la frontera"></option>
            <option value="Puerto real"></option>
            <option value="San fernando"></option>
          </datalist>
          <div
            className="main-search-container-logo"
            onClick={handleSearchClick}
          >
            <FaSearch size="20" color="white" />
          </div>
        </div>
        <ScrollIntoView
          selector="#info"
          scrollOptions={{ behavior: "smooth", block: "start" }}
        >
          <div className="down-arrow-container" id="info">
            <BsArrowDownCircle size="45" />
          </div>
        </ScrollIntoView>
      </section>
      {/* FIN Video-Input/ */}
      {/* Información de marca */}
      <section className="section-info">
        <h1>¡Donde quieras encontrarnos!</h1>
        <p>
          ¡Expandimos fronteras! <strong>Svelt</strong> se encuentra disponible
          ya en mas de 100 ciudades
        </p>
        <p>
          &#128663; Contamos con mas de 2000 plazas svelt, buscando siempre la
          maxima satisfacción al volante
        </p>
      </section>
      <div className="section-info-overlay">
        <img src={mapOverlay}></img>
      </div>
      {/*  FIN Información de marca */}
      <section className="section-enviroment">
        <div>
          <a href="https://www.linkedin.com/pulse/choose-tomorrow-today-new-glass-hallmark-communicate-aujouannet/">
            <img src={Enviroment1} width="200px"></img>
          </a>
        </div>
        <div>
          <a href="https://www.aenor.com/certificacion/medio-ambiente">
            <img src={Enviroment2} width="80px"></img>
          </a>
        </div>
        <div>
          <a href="https://www.aenor.com/certificacion/medio-ambiente">
            <img src={Enviroment3} width="75px"></img>
          </a>
        </div>
        <div>
          <a href="https://agriculture.ec.europa.eu/farming/organic-farming/organic-logo_es">
            <img src={Enviroment4} width="150px"></img>
          </a>
        </div>
      </section>
      <section className="pre-footer"></section>
      <Footer />
    </>
  );
};
