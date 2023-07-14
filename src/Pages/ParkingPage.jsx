import { Header } from "../Components/Commons/Header";
import Map from "../Components/Map";
import "../Stylesheets/ParkingPage.css";
import { BsArrowLeftRight } from "react-icons/bs";
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { BsArrowDownCircle } from "react-icons/bs";
import ScrollIntoView from "react-scroll-into-view";
import mapaEjemplo from "../images/mapaEjemplo.png";
import { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Tooltip,
  Box,
} from "@mui/material";
import { Footer } from "../Components/Commons/Footer";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillCheckCircle } from "react-icons/ai";
import { RiVisaLine } from "react-icons/ri";
import { BsQuestionCircle } from "react-icons/bs";
import StripeCheckout from "react-stripe-checkout";
import sveltImg from "../images/svelt-logo.png";
import { useNavigate } from "react-router-dom";
import { getPrice } from "../api/ParkingPlaceApi";
import { getUserByEmail } from "../api/User";
import { getVehicleByRegis } from "../api/Vehicles";
import { ImCancelCircle } from "react-icons/im";
import { useLocation } from "react-router-dom";
import { getIdByCalle } from "../api/ParkingPlaceApi";
import { putUser } from "../api/User";

export const ParkingPage = () => {
  const location = useLocation();
  const [checkHoraSalida, setCheckHoraSalida] = useState(false);
  const [parkingId, setParkingId] = useState();
  const [precio, setPrecio] = useState();
  const [userData, setUserData] = useState();
  const [vehicleData, setVehicleData] = useState();
  const [entryValue, setEntryValue] = useState(dayjs("2022-04-17T15:30"));
  const [exitValue, setExitValue] = useState(dayjs("2022-04-17T15:30"));
  const [marker, setMarker] = useState(null);
  const email = localStorage.getItem("userEmail");

  const navigate = useNavigate();

  const comprobarValoresSocio = () => {
    console.log(entryValue);
    console.log(exitValue);
  };

  /**SUBMIT DE STRIPE */
  const handleToken = (token) => {
    let user = { ...userData };
    user.usingParking = parkingId;
    putUser(user)
      .then((data) => {
        navigate("/correct-payment");
      })
      .catch((e) => {
        console.log(e);
      });
    // console.log(token);
  };

  /**
   * UseEffect Datepickers
   */
  useEffect(() => {
    const precio = getPrice(entryValue, checkHoraSalida ? null : exitValue);
    setPrecio(precio);
    // console.log(markers);
    // console.log("precio" + precio);
  }, [entryValue, exitValue, checkHoraSalida, vehicleData]);

  /**UseEffect primero */
  useEffect(() => {
    /**GET DEL USUARIO */
    getUserByEmail(email)
      .then((data) => {
        setUserData(data);
        /**
         * GET DEL VEHICULO
         */
        getVehicleByRegis(data.Vehicle_registration)
          .then((data) => {
            setVehicleData(data);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });

    const urlParams = new URLSearchParams(window.location.search);

    getIdByCalle(urlParams.get("ciudad"))
      .then((data) => {
        // console.log(data[0]["idparkingPlace"]);
        setParkingId(data[0]["idparkingPlace"]);
      })
      .catch((e) => {
        console.error(e);
      });
    const newMarker = [
      {
        calle: urlParams.get("ciudad"),
        latitud: urlParams.get("location").split(",")[0],
        longitud: urlParams.get("location").split(",")[1],
        referencia: urlParams.get("referencia"),
      },
    ];

    setMarker(newMarker);
  }, []);

  /**useEffect disable checkbox */
  useEffect(() => {
    if (checkHoraSalida) {
    }
  }, [checkHoraSalida]);
  if (marker === null) {
    return "cargando";
  }
  return (
    <>
      <Header Questions Login />
      <section className="top-section-ParkingPage">
        <div className="map-container-ParkingPage">
          <Map
            markerArray={marker}
            center={[marker[0].latitud, marker[0].longitud]}
            handleLocationNavigate={null}
            zoom={18}
          />
        </div>
        <div className="parking-container-ParkingPage">
          <h3>Svelt</h3>
          <BsArrowLeftRight size="30" />
          {userData && <h3>{userData.name}</h3>}
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["TimePicker", "TimePicker"]}>
              <TimePicker
                label="Hora de Entrada"
                defaultValue={dayjs("2022-04-17T15:30")}
                ampm={false}
                value={entryValue}
                onChange={(newValue) => {
                  setEntryValue(newValue);
                }}
              />
              <TimePicker
                label="Hora de Salida"
                defaultValue={dayjs("2022-04-17T15:30")}
                ampm={false}
                value={exitValue}
                onChange={(newValue) => {
                  setExitValue(newValue);
                }}
                disabled={checkHoraSalida}
              />
            </DemoContainer>
          </LocalizationProvider>
          <FormControlLabel
            label="Sin hora de salida"
            control={
              <Checkbox
                color="success"
                value={checkHoraSalida}
                onChange={() => setCheckHoraSalida(!checkHoraSalida)}
              />
            }
          />
          <ScrollIntoView
            selector="#payment"
            scrollOptions={{ behavior: "smooth", block: "center" }}
          >
            <div>
              <BsArrowDownCircle
                title="Información de Pago"
                className="down-arrow-container-ParkingPage"
                size="35"
                style={{ marginTop: "30px", cursor: "pointer" }}
              />
            </div>
          </ScrollIntoView>
        </div>
      </section>

      {userData && vehicleData && (
        <>
          <section className="payment-info-section-parkingPage" id="payment">
            <div className="main-payment-info-section">
              <div className="top-main-payment-info-section">
                <img src={mapaEjemplo} alt="Foto de mapa" height="100%" />
                <FaMapMarkerAlt
                  size="20"
                  style={{ color: "#40513B", marginBottom: "10px" }}
                />
                <p>{marker[0].calle}</p>
                <p style={{ fontSize: "0.7em", textDecoration: "underline" }}>
                  {marker[0].referencia}
                </p>
              </div>
              <div
                className="mid-main-payment-info-section"
                style={{ marginLeft: "20px", marginTop: "20px" }}
              >
                <p>
                  <span style={{ fontWeight: "bold" }}>Horas:</span>
                  {!checkHoraSalida ? (
                    <span>
                      {" "}
                      {`${entryValue.$H}:${entryValue.$m}`} -{" "}
                      {`${exitValue.$H}:${exitValue.$m}`}
                    </span>
                  ) : (
                    <span>
                      {" "}
                      24h {`desde las ${entryValue.$H}:${entryValue.$m}`}
                    </span>
                  )}
                </p>
                <p>
                  Matricula:{" "}
                  {userData && (
                    <span style={{ fontWeight: "bold" }}>
                      {userData.Vehicle_registration}
                    </span>
                  )}
                  <Tooltip title="Cambiar Matricula" arrow>
                    <Box component="span">
                      <BsQuestionCircle
                        size="15px"
                        color="#609966"
                        style={{
                          cursor: "pointer",
                          marginLeft: "5px",
                        }}
                        onClick={() => {
                          navigate("/user-page");
                        }}
                      />
                    </Box>
                  </Tooltip>
                </p>

                <p>
                  ¿Etiqueta Cero Consumo? :{" "}
                  {vehicleData.ceroconsumo == 1 ? (
                    <Tooltip
                      title="Gracias por contribuir al medio ambiente :)"
                      arrow
                    >
                      <Box component="span">
                        <AiFillCheckCircle
                          size="20px"
                          color="#9DC08B"
                          cursor="pointer"
                        />
                      </Box>
                    </Tooltip>
                  ) : (
                    <ImCancelCircle color="red" />
                  )}
                  {vehicleData.ceroconsumo == 1 && (
                    <Box
                      component="span"
                      fontSize="0.8em"
                      color="green"
                      marginLeft="1%"
                    >
                      50% dto.
                    </Box>
                  )}
                </p>

                <p>
                  Información pago: ...4242{" "}
                  <RiVisaLine size="30px" color="#609966" />
                  <Tooltip title="Información de pago" arrow>
                    <Box component="span">
                      <BsQuestionCircle
                        size="15px"
                        color="#609966"
                        style={{ cursor: "pointer", marginLeft: "5px" }}
                      />
                    </Box>
                  </Tooltip>
                </p>
                <p
                  style={{
                    marginLeft: "35%",
                    marginTop: "40px",
                    fontSize: "1.3em",
                  }}
                >
                  Total:{" "}
                  {precio && vehicleData && (
                    <span style={{ fontWeight: "bold" }}>
                      {vehicleData.ceroconsumo == 1 ? precio / 2 : precio}
                    </span>
                  )}
                  €
                </p>
              </div>
              {precio && vehicleData ? (
                <div className="bot-main-payment-info-section">
                  <StripeCheckout
                    name="Svelt"
                    description="Alquiler de Plaza de aparcamiento"
                    ComponentClass="div"
                    billingAddress
                    image={sveltImg}
                    panelLabel="Confirmar pago"
                    amount={
                      (vehicleData.ceroconsumo == 1 ? precio / 2 : precio) * 100
                    }
                    currency="EUR"
                    stripeKey="pk_test_51NGJYNGjxetrDJz559lPZ0GGQxNtNaPReLzbb8ZXhLUxsxTsk6o4eZN9gVJzJEqsL06RQHIXGyqDbpaB9It1BvAp00b56wl1c2"
                    locale="es"
                    email="sveltmailofficial@gmail.com"
                    token={handleToken} // submit callback
                  >
                    <Button variant="outlined" color="success">
                      Confirmar pago
                    </Button>
                  </StripeCheckout>
                </div>
              ) : (
                <p style={{ color: "red", textAlign: "center" }}>
                  *Establece unas horas validas*
                </p>
              )}
            </div>
          </section>
          <Footer />
        </>
      )}
    </>
  );
};
