import { AccordionFaq } from "../Components/AccordionFaq";
import { Header } from "../Components/Commons/Header";
import "../Stylesheets/FaqsPage.css";
import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { FaSearch } from "react-icons/fa";
import { MdOutlineExpandMore } from "react-icons/md";
import { GiClick } from "react-icons/gi";
import { TbClockHour9 } from "react-icons/tb";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { useState, useEffect } from "react";
import Enviroment1 from "../images/enviroment1.png";
import Enviroment2 from "../images/enviroment2.png";
import Enviroment3 from "../images/enviroment3.png";
import Enviroment4 from "../images/enviroment4.png";
import { BsFacebook } from "react-icons/bs";
import { AiFillTwitterCircle } from "react-icons/ai";
import { AiOutlineInstagram } from "react-icons/ai";

export const FaqsPage = () => {
  const texts = {
    sobreNosotros:
      "¡Bienvenido a Svelt, tu aplicación de alquiler de plazas de aparcamiento y compromiso con la sostenibilidad ambiental!\n\nEn Svelt, nos apasiona facilitar el acceso a plazas de aparcamiento de manera inteligente y amigable con el medio ambiente. Reconocemos la importancia de abordar los desafíos del creciente número de vehículos en nuestras ciudades, así como la necesidad de proteger y preservar nuestro entorno natural. Por eso, hemos creado una solución innovadora que combina la comodidad del alquiler de plazas de aparcamiento con la promoción activa de prácticas sostenibles.\n\nNuestro objetivo principal es optimizar el uso de las plazas de aparcamiento existentes, reduciendo la congestión y minimizando las emisiones de carbono asociadas con la búsqueda de espacios libres. Al proporcionar a los conductores acceso rápido y eficiente a plazas de aparcamiento disponibles, contribuimos a disminuir la circulación innecesaria de vehículos y, por ende, a reducir la contaminación atmosférica.",
  };
  const [expanded, setExpanded] = useState(false);
  const [expandedTwo, setExpandedTwo] = useState(false);
  const [expandedThree, setExpandedThree] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <Typography
        variant="h2"
        textAlign={"center"}
        sx={{ fontFamily: "Montserrat" }}
        color="#40513B"
      >
        Faqs
      </Typography>
      <section
        style={{
          width: "100%",
          height: "auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          marginTop: "2%",
        }}
      >
        <AccordionFaq text={texts.sobreNosotros} Title={"Sobre Nosotros"} />
        <Accordion
          sx={{ backgroundColor: "#9DC08B", width: "80%" }}
          expanded={expanded}
          onClick={() => setExpanded(!expanded)}
        >
          <AccordionSummary
            expandIcon={<MdOutlineExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Montserrat",
                // fontWeight: "bold",
                color: "white",
              }}
            >
              Como usar los servicios
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "rgba(73, 105, 58, 0.8)",
              border: "1px solid #49693a",
              color: "white",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography component="div" sx={{ fontFamily: "Montserrat" }}>
              <p style={{ fontWeight: "bold" }}>
                Una vez te hayas registrado y logeado:
              </p>
              <ol style={{ listStyleType: "none" }}>
                <li>
                  <FaSearch size={20} style={{ marginRight: "10px" }} />
                  Busca la ciudad en la que quieres encontrar aparcamiento
                </li>
                <li>
                  <GiClick size={25} style={{ marginRight: "5px" }} />
                  Selecciona el aparcamiento que mejor se ajuste a tus
                  necesidades
                </li>
                <li>
                  <TbClockHour9 size={25} style={{ marginRight: "5px" }} />
                  Introduce la hora de entrada y de salida (O no introduzcas
                  hora de salida, en cuyo caso se cobrarán 24h del uso de la
                  plaza)
                </li>
                <li>
                  <BsFillPersonCheckFill
                    size={25}
                    style={{ marginRight: "5px" }}
                  />
                  Asegúrate de que todos los datos y la matrícula estén
                  correctos
                </li>
                <li>
                  <MdOutlinePayments size={25} style={{ marginRight: "5px" }} />
                  Paga y disfruta del servicio (Puedes cancelar en cualquier
                  momento en el menú de usuario)
                </li>
              </ol>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ backgroundColor: "#9DC08B", width: "80%" }}
          expanded={expandedTwo}
          onClick={() => setExpandedTwo(!expandedTwo)}
        >
          <AccordionSummary
            expandIcon={<MdOutlineExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "Montserrat", color: "white" }}
            >
              Nuestros certificados
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "rgba(73, 105, 58, 0.8)",
              border: "1px solid #49693a",
              color: "white",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography component="div" sx={{ fontFamily: "Montserrat" }}>
              Nuestros años de esfuerzo y trabajo nos han llevado a ser
              reconocidos por nuestras labores en el medio ambiente:
              <img
                src={Enviroment1}
                alt="Certificado de medio ambiente"
                height="200px"
                style={{ marginTop: "30px", marginLeft: "80px" }}
              />
              <img
                src={Enviroment2}
                alt="Certificado de medio ambiente"
                height="200px"
                style={{ marginTop: "30px", marginLeft: "80px" }}
              />
              <img
                src={Enviroment3}
                alt="Certificado de medio ambiente"
                height="200px"
                style={{ marginTop: "30px", marginLeft: "80px" }}
              />
              <img
                src={Enviroment4}
                alt="Certificado de medio ambiente"
                height="200px"
                style={{ marginTop: "30px", marginLeft: "80px" }}
              />
              <p style={{ marginTop: "20px" }}>
                Certificados otorgados por la UE en base a nuestra optima
                gestión de recursos y premiar la conducción electrica
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          sx={{ backgroundColor: "#9DC08B", width: "80%" }}
          expanded={expandedThree}
          onClick={() => setExpandedThree(!expandedThree)}
        >
          <AccordionSummary
            expandIcon={<MdOutlineExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography
              variant="h6"
              sx={{ fontFamily: "Montserrat", color: "white" }}
            >
              Nuestras redes
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              backgroundColor: "rgba(73, 105, 58, 0.8)",
              border: "1px solid #49693a",
              color: "white",
              boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
            }}
          >
            <Typography sx={{ fontFamily: "Montserrat" }}>
              ¡Estamos muy activos! a continuación te dejamos nuestras redes:
              <p style={{ marginTop: "20px" }}>
                <BsFacebook size={20} style={{ marginRight: "5px" }} /> @SveltFB
              </p>
              <p>
                <AiFillTwitterCircle size={25} /> @Svelt
              </p>
              <p>
                <AiOutlineInstagram size={25} /> @SveltOfficial
              </p>
              <p>
                Siguenos y estate muy atento a futuros{" "}
                <span style={{ fontWeight: "bold" }}>
                  ¡sorteos, ofertas y proyectos!
                </span>
              </p>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </section>
    </>
  );
};
