import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getBySuperUserID } from "../api/ParkingPlaceApi";
import {
  Container,
  Box,
  Stack,
  Typography,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import { Header } from "../Components/Commons/Header";
import { Footer } from "../Components/Commons/Footer";
import { ParkingCard } from "../Components/ParkingCard";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { IoMdAddCircleOutline } from "react-icons/io";
import { deleteParkingByID } from "../api/ParkingPlaceApi";
export const ParkingsOfUserPage = () => {
  const location = useLocation();
  const userData = location?.state?.userData;
  const navigate = useNavigate();
  const [parkings, setParkings] = useState([]);
  const [deleteCorrect, setDeleteCorrect] = useState(false);

  useEffect(() => {
    getBySuperUserID(userData.SuperUser_idSuperUser)
      .then((data) => {
        // console.log(data);
        setParkings(data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  const handleNavigateAddParking = () => {
    navigate("/add-parking", { state: { userData } });
  };
  const handleDeleteParking = (idPlaza) => {
    deleteParkingByID(idPlaza)
      .then((data) => {
        if (data.status == "ok") {
          setDeleteCorrect(true);
          /**Refetch de data para actualizar lista */
          getBySuperUserID(userData.SuperUser_idSuperUser)
            .then((data) => {
              setParkings(data);
            })
            .catch((e) => console.error(e));
          setTimeout(() => {
            setDeleteCorrect(false);
          }, 3000);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  return (
    <>
      <Header Login Questions />
      <Typography
        variant="h3"
        textAlign="center"
        marginTop="20px"
        color={"#40513B"}
      >
        Tus plazas de Aparcamiento
      </Typography>
      <Box sx={{ display: "flex", width: "80%", justifyContent: "flex-end" }}>
        <Tooltip title="Añadir plaza" arrow>
          <div onClick={handleNavigateAddParking}>
            <IoMdAddCircleOutline color="#609966" size={40} cursor="pointer" />
          </div>
        </Tooltip>
      </Box>
      <Container maxWidth="xl" sx={{ marginTop: "60px" }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={3}
        >
          {parkings.length === 0 ? (
            <p>Loading...</p>
          ) : (
            <>
              {parkings.map((parking) => (
                // <li key={parking.idparkingPlace}>{parking.calle}</li>
                <ParkingCard
                  idPlaza={parking.idparkingPlace}
                  SuperUsuario={" " + userData.name}
                  Calle={parking.calle}
                  Referencia={parking.Referencia}
                  style={{ backgroundColor: "9DC08B" }}
                  handleDeleteParking={handleDeleteParking}
                  Delete
                />
              ))}
            </>
          )}
        </Stack>
      </Container>
      <Snackbar open={deleteCorrect}>
        <Alert severity="success" variant="filled">
          Plaza eliminada correctamente
        </Alert>
      </Snackbar>
    </>
  );
};
