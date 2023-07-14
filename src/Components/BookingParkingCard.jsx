import "../Stylesheets/BookingParkingCard.css";
import { getParkingPlaceByID } from "../api/ParkingPlaceApi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
export const BookingParkingCard = ({ userData }) => {
  const [parkingData, setParkingData] = useState();
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const handleTextClick = () => {
    navigate("/booked-map-page", { state: { parkingData, userData } });
  };

  useEffect(() => {
    getParkingPlaceByID(userData.usingParking)
      .then((data) => {
        setParkingData(data);
        console.log(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      {parkingData && (
        <div
          style={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            textAlign: "center",
            padding: "10px",
            overflow: "hidden",
            backgroundColor: "#f5f5f5",
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            style={{
              display: "inline-block",
              whiteSpace: "nowrap",
            }}
          >
            <Tooltip title="Ver en el Mapa" arrow>
              <span
                style={{
                  display: "inline-block",
                  padding: "0 10px",
                  transition: "transform .5s",
                  transform: hovered ? "translateX(0)" : null,
                  animation: hovered
                    ? "none"
                    : "slide-in-out 15s linear infinite",
                  cursor: "pointer",
                  textDecoration: hovered ? "underline" : null,
                }}
                onClick={handleTextClick}
              >
                <span style={{ fontWeight: "bold" }}>Reserva actual: </span>
                {parkingData.calle} - {parkingData.Referencia}{" "}
                <FaMapMarkerAlt size={15} style={{ marginBottom: "3px" }} />
              </span>
            </Tooltip>
          </div>
        </div>
      )}
    </>
  );
};
