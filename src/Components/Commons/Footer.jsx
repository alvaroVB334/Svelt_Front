import "../../Stylesheets/Footer.css";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer-container">
        <div className="footer-item">
          <ul>
            <li>
              <a
                href="https://yessnt.com/politicas-de-privacidad/"
                target="__blank"
              >
                Política de privacidad
              </a>
            </li>
            <li>
              <a
                style={{ textDecoration: "underline", cursor: "pointer" }}
                onClick={() => navigate("/faqs")}
              >
                Preguntas frecuentes
              </a>
            </li>
            <li>
              <a
                href="https://yessnt.com/politicas-de-cookies/"
                target="__blank"
              >
                Política de cookies
              </a>
            </li>
          </ul>
        </div>
        <div className="footer-item">
          <ul className="social-icons">
            <li>
              <a href="https://es-es.facebook.com/" target="__blank">
                <BsFacebook size={30} />
              </a>
            </li>
            <li>
              <a href="https://twitter.com/dophbone" target="__blank">
                <AiFillTwitterCircle size={34} />
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/yessnt_official/"
                target="__blank"
              >
                <AiOutlineInstagram size={35} style={{ marginLeft: "-5px" }} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};
