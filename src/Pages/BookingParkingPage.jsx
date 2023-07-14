import { useLocation } from "react-router-dom";
import Map from "../Components/Map";
import { useState, useEffect } from "react";
import { Header } from "../Components/Commons/Header";
import { Typography, Box, Modal } from "@mui/material";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Footer } from "../Components/Commons/Footer";
import { LoadingButton } from "@mui/lab";
import { putUser } from "../api/User";

export const BookingParkingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const parkingData = location?.state?.parkingData;
  const userData = location?.state?.userData;
  const [openModalWarning, setOpenModalWarning] = useState(false);
  const [closedParking, setClosedParking] = useState(false);
  const marker = [
    {
      calle: parkingData.calle,
      referencia: parkingData.Referencia,
      latitud: parkingData.latitud,
      longitud: parkingData.longitud,
    },
  ];
  const style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    borderRadius: "4px",
    p: 4,
  };

  useEffect(() => {
    console.log(parkingData);
    console.log(userData);
  });

  const onCloseModalWarning = () => {
    setOpenModalWarning(false);
  };
  const handleFinishParking = () => {
    setOpenModalWarning(true);
  };

  /**Logica de quitarle la plaza reservada al usuario al usuario */
  const handleConfirmFinishParking = () => {
    let user = { ...userData };
    user.usingParking = null;
    putUser(user)
      .then((data) => {
        setClosedParking(true);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <Header Login Questions />
      {parkingData && (
        <>
          <div className="config-section-back-arrow">
            <IoIosArrowBack
              size="35"
              style={{
                cursor: "pointer",
                color: "#9DC08B",
                marginLeft: "20%",
              }}
              onClick={() => navigate("/user-page")}
            />
          </div>
          <Typography
            variant="h3"
            textAlign={"center"}
            fontFamily={"Montserrat"}
          >
            {parkingData.calle}
          </Typography>
          <Typography
            variant="h6"
            textAlign={"center"}
            fontFamily={"Montserrat"}
          >
            <FaMapMarkerAlt size="20" style={{ marginBottom: "5px" }} /> (
            {parkingData.Referencia})
          </Typography>
          <div
            className="map-container-ParkingPage"
            style={{ marginLeft: "20%", marginTop: "2%" }}
          >
            <Map
              markerArray={marker}
              center={[marker[0].latitud, marker[0].longitud]}
              handleLocationNavigate={null}
              zoom={18}
            />
          </div>
          <LoadingButton
            loading={false}
            onClick={handleFinishParking}
            variant="outlined"
            color="error"
            sx={{ marginTop: "30px", marginLeft: "45%" }}
          >
            Terminar sesión
          </LoadingButton>
          <Footer />
          <Modal
            open={openModalWarning}
            onClose={onCloseModalWarning}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 600, height: 250 }}>
              {!closedParking ? (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h4"
                    component="h2"
                    sx={{ fontFamily: "Montserrat" }}
                  >
                    ¿Quieres finalizar la sesión?
                  </Typography>
                  <Typography
                    id="modal-modal-description"
                    variant="p"
                    component="p"
                    sx={{ fontFamily: "Montserrat", marginTop: "3%" }}
                  >
                    Tendrás 5 minutos para retirar el Vehiculo &#128663;
                  </Typography>
                  <LoadingButton
                    loading={false}
                    onClick={handleConfirmFinishParking}
                    variant="outlined"
                    color="error"
                    sx={{ marginTop: "5%" }}
                  >
                    Terminar sesión
                  </LoadingButton>
                </>
              ) : (
                <>
                  <Typography
                    id="modal-modal-description"
                    variant="h5"
                    component="h2"
                    sx={{ fontFamily: "Montserrat", marginTop: "3%" }}
                  >
                    Sesión terminada correctamente &#127359;&#65039;
                  </Typography>
                  <LoadingButton
                    loading={false}
                    onClick={() => navigate("/")}
                    variant="outlined"
                    color="success"
                    sx={{ marginTop: "5%" }}
                  >
                    Volver a la home
                  </LoadingButton>
                </>
              )}
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};
