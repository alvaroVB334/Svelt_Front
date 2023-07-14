import {
  Box,
  Tooltip,
  Typography,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import "../Stylesheets/ParkingCard.css";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import { deleteParkingByID } from "../api/ParkingPlaceApi";

export const ParkingCard = ({
  Calle,
  Referencia,
  Delete,
  idPlaza,
  handleDeleteParking,
  SuperUsuario = "Svelt",
}) => {
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
  const [deleteParkingModal, setDeleteParkingModal] = useState(false);

  const handleCompleteParkingDelete = () => {
    handleDeleteParking(idPlaza);
    setDeleteParkingModal(false);
  };

  return (
    <>
      <Box component="div" className="main-card" id={idPlaza}>
        <div className="item">
          <FaMapMarkerAlt
            size="20"
            style={{ marginRight: "8px", color: "#40513B" }}
          />
          <Typography variant="h6" fontFamily="Montserrat, sans-serif">
            {Calle} - {Referencia}
          </Typography>
        </div>
        <div className="super-user-name">
          <FiUser />
          {SuperUsuario}
        </div>
        {Delete && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: "-20px",
            }}
          >
            <Tooltip title="Eliminar Parking" arrow>
              <div>
                <RiDeleteBin6Fill
                  size={20}
                  color="#d9534f"
                  cursor={"pointer"}
                  onClick={() => {
                    setDeleteParkingModal(true);
                  }}
                />
              </div>
            </Tooltip>
          </Box>
        )}
      </Box>
      <Modal
        open={deleteParkingModal}
        onClose={() => setDeleteParkingModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            color="red"
            textAlign="center"
            fontFamily={"Montserrat"}
          >
            ¿Estás seguro?
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2 }}
            textAlign="center"
            fontFamily={"Montserrat"}
            fontWeight={"bold"}
          >
            ¡Si la eliminas no habrá vuelta atrás!
          </Typography>
          <LoadingButton
            loading={false}
            onClick={handleCompleteParkingDelete}
            variant="outlined"
            color="error"
            sx={{ marginTop: "30px" }}
          >
            Eliminar
          </LoadingButton>
          <span
            style={{
              fontSize: "0.85em",
              textAlign: "center",
              marginTop: "10px",
              color: "red",
            }}
          >
            *Un conductor se irá llorando hoy a la cama* &#128546;
          </span>
        </Box>
      </Modal>
    </>
  );
};
