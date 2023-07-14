import React from "react";
import "../../Stylesheets/Header.css";
import LogoSvelt from "../../images/svelt-logo.png";
import { FiUser } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";
import { redirect, useNavigate } from "react-router-dom";
export const Header = ({ Login, Questions }) => {
  const navigate = useNavigate();
  return (
    <header>
      {Questions && (
        <div className="header-faq" onClick={() => navigate("/faqs")}>
          <FaQuestionCircle size="20" title="Preguntas Frecuentes" />
        </div>
      )}
      <div className="header-logo">
        <img
          src={LogoSvelt}
          height="80px"
          alt="Logo de Svelt"
          title="Volver a la pagina de inicio"
          onClick={() => navigate("/")}
        />
      </div>
      {Login && (
        <div
          className="header-login-button"
          onClick={() => navigate("/user-page")}
        >
          <FiUser size="35" className="login-button-logo" />
        </div>
      )}
    </header>
  );
};
