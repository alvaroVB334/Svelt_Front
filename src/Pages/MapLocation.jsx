import { Box, Stack, Pagination, Modal, Typography } from "@mui/material";
import "../Stylesheets/MapLocation.css";
import { Header } from "../Components/Commons/Header";
import { FaSearch } from "react-icons/fa";
import Map from "../Components/Map";
import { ParkingCard } from "../Components/ParkingCard";
import { useEffect, useState } from "react";
import { LoadingButton } from "@mui/lab";
import { useLocation, useNavigate } from "react-router-dom";
import mapaEjemplo from "../images/mapaEjemplo.png";
import SveltLogo from "../images/svelt-logo.png";
import {
  getParkingPlaceByCity,
  getParkingPlaces,
} from "../api/ParkingPlaceApi";
export const MapLocation = () => {
  const [parkings, setParkings] = useState(null);
  const [markers, setMarkers] = useState(null);
  const [searchValue, setSearchValue] = useState(null);
  const [noVehicleModal, setNoVehicleModal] = useState(false);
  const [selectedParking, setSelectedParking] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const email = localStorage.getItem("userEmail");
  const Matricula = localStorage.getItem("Vehicle_registration");

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

  const handleNavigateLocation = (lat, long, calle, referencia, id) => {
    if (!email) {
      navigate("/login");
      return;
    }
    if (!Matricula) {
      setNoVehicleModal(true);
      return;
    }
    setSelectedParking(id);
    navigate(
      `/parking?location=${lat},${long}&ciudad=${calle}&referencia=${referencia}`
    );
  };
  const handleSearchClick = () => {
    navigate(`/map-location?search=${searchValue}`);
  };
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const searchValue = queryParams.get("search");
    const response = getParkingPlaceByCity(searchValue);
    response
      .then((data) => {
        setParkings(data);

        const dataMarkers = data.map((marker) => ({
          latitud: marker.latitud,
          longitud: marker.longitud,
          calle: marker.calle,
          referencia: marker.Referencia,
        }));
        setMarkers(dataMarkers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    console.log(parkings);
  }, [parkings]);

  if (!parkings) {
    return (
      <>
        <Header Login Questions />
        <Typography variant="h3" textAlign={"center"} sx={{ marginTop: "3%" }}>
          Oops!
        </Typography>
        <Box
          marginTop={"3%"}
          display={"flex"}
          alignContent={"center"}
          alignItems={"center"}
          justifyContent={"center"}
          flexDirection={"column"}
          flexWrap={"wrap"}
        >
          <Typography variant="p" fontWeight={"bold"}>
            Lo sentimos, aún no hemos llegado tan lejos
          </Typography>
          <Typography variant="p" color="#609966" marginTop={"10px"}>
            Trabajamos por expandirnos lo mas rapido que podemos, gracias por
            confiar en nosotros &#x1F697;
          </Typography>
        </Box>
        <Box display={"flex"} justifyContent={"center"} marginTop={"20px"}>
          <img
            src={mapaEjemplo}
            height={"200px"}
            style={{
              borderRadius: "3px",
              marginTop: "30px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              marginRight: "10px",
            }}
          />
          <img
            src={SveltLogo}
            height={"200px"}
            style={{
              borderRadius: "3px",
              marginTop: "30px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
              marginLeft: "10px",
            }}
          />
        </Box>
      </>
    );
  }
  return (
    <>
      <Header Login Questions />
      <section className="map-section">
        {parkings && markers && (
          <Map
            markerArray={markers}
            handleLocationNavigate={handleNavigateLocation}
            center={[parkings[0].latitud, parkings[0].longitud]}
          />
        )}
      </section>
      <br />
      <div className="separator"></div>
      <div className="main-search-container-mapLocation">
        <input
          className="main-search-container-input-mapLocation"
          type="text"
          placeholder="Buscar..."
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <div
          className="main-search-container-logo-mapLocation"
          onClick={handleSearchClick}
        >
          <FaSearch size="20" color="white" />
        </div>
      </div>
      {parkings && (
        <section className="parking-card-section">
          <Stack spacing={2}>
            {parkings.map((parking) => (
              <>
                <ParkingCard
                  key={parking.idparkingPlace}
                  Calle={parking.calle}
                  Referencia={parking.Referencia}
                />
              </>
            ))}
          </Stack>
        </section>
      )}
      <Stack
        className="main-card-stack"
        spacing={2}
        style={{
          position: "absolute",
          marginTop: "650px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      ></Stack>
      <Modal
        open={noVehicleModal}
        onClose={() => setNoVehicleModal(false)}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 600 }}>
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h3"
            sx={{ fontFamily: "Montserrat" }}
          >
            ¡Primero debes introducir un vehiculo!
          </Typography>
          <LoadingButton
            loading={false}
            variant="outlined"
            color="success"
            onClick={() => {
              navigate("/user-page");
            }}
            sx={{ marginTop: "20px" }}
          >
            Menú de Usuario
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
};
