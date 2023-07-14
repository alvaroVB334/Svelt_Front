import { Header } from "../Components/Commons/Header";
import { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Grid,
  Tooltip,
  Snackbar,
  Alert,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { obtenerLatitudLongitud } from "../api/OpenStreetMap";
import { postParkingPlace } from "../api/ParkingPlaceApi";
import { IoIosArrowBack } from "react-icons/io";

export const AddParkingsUser = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location?.state?.userData;
  const [ciudad, setCiudad] = useState();
  const [cp, setCp] = useState();
  const [nombreCalle, setNombreCalle] = useState();
  const [numeroCalle, setNumeroCalle] = useState();
  const [idVado, setIdVado] = useState();
  const [referencia, setReferencia] = useState();
  const [snackBarState, setSnackBarState] = useState(false);
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  // useEffect(() => {
  //   obtenerLatitudLongitud(
  //     "Plaza del polvorista 4, El Puerto de Santa María,11500"
  //   )
  //     .then((resultado) => {
  //       console.log("Latitud:", resultado.latitud);
  //       console.log("Longitud:", resultado.longitud);
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //     });
  // });

  const clickSubmitParking = () => {
    /**PROMISE DE LA LAT Y LONG */
    obtenerLatitudLongitud(`${ciudad} ${nombreCalle} ${cp}`)
      .then((coords) => {
        const parkingPlace = {
          ciudad: ciudad,
          calle: nombreCalle + " " + numeroCalle + " " + cp,
          isTemporally: 1,
          state: 1,
          SuperUser_idSuperUser: userData.SuperUser_idSuperUser,
          latitud: coords.latitud,
          longitud: coords.longitud,
          Referencia: referencia,
        };
        /**POST DEL PARKING */
        postParkingPlace(parkingPlace)
          .then((data) => {
            setSnackBarState(true);
            setTimeout(() => {
              navigate("/my-parkings", { state: { userData } });
            }, 2000);
          })
          .catch((e) => {
            console.error("No se pudo hacer el post " + e);
          });
      })
      .catch((e) => {
        setErrorSnackBar(true);
        setTimeout(() => {
          setErrorSnackBar(false);
        }, 2500);
        console.error("No se pudieron obtener las coordenadas" + e);
      });
  };
  return (
    <>
      <Header Login Questions />
      <section className="config-section-content">
        <div className="config-section-back-arrow">
          <IoIosArrowBack
            size="35"
            style={{ cursor: "pointer", color: "#9DC08B" }}
            onClick={() => navigate("/user-page")}
          />
        </div>
      </section>
      <Box
        sx={{
          width: "70%",
          heigth: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "column",
          marginTop: "3%",
          marginLeft: "15%",
        }}
      >
        <Typography variant="h3" sx={{ marginBottom: "4%" }}>
          Añade una plaza nueva
        </Typography>
        <Grid container spacing={2} style={{ padding: "20px" }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Ciudad"
              sx={{ width: "100%" }}
              value={ciudad}
              onChange={(e) => {
                setCiudad(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Codigo postal"
              sx={{ width: "100%" }}
              value={cp}
              onChange={(e) => {
                setCp(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={10} sm={4}>
            <TextField
              label="Nombre de la calle"
              sx={{ width: "100%" }}
              value={nombreCalle}
              onChange={(e) => {
                setNombreCalle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Número de calle"
              sx={{ width: "100%" }}
              value={numeroCalle}
              onChange={(e) => {
                setNumeroCalle(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="ID De Vado o plaza"
              sx={{ width: "100%" }}
              value={idVado}
              onChange={(e) => {
                setIdVado(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Referencia de plaza"
              sx={{ width: "100%" }}
              value={referencia}
              onChange={(e) => {
                setReferencia(e.target.value);
              }}
            />
            <Tooltip
              title={
                "Introduce una referencia de un local cercano, o indicaciones para encontrarla"
              }
              placement="bottom"
            >
              <Box>
                <IoMdInformationCircleOutline
                  size={20}
                  color={"#9DC08B"}
                  cursor="pointer"
                />
              </Box>
            </Tooltip>
          </Grid>
        </Grid>
        <LoadingButton
          loading={false}
          variant="outlined"
          color="success"
          onClick={clickSubmitParking}
          sx={{ marginTop: "30px", backgroundColor: "#9DC08B" }}
        >
          Confirmar
        </LoadingButton>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "100px",
          backgroundColor: "#EDF1D6",
          marginTop: "100px",
        }}
      ></Box>
      <Snackbar open={snackBarState}>
        <Alert severity="success" variant="filled">
          Plaza añadida correctamente
        </Alert>
      </Snackbar>
      <Snackbar open={errorSnackBar}>
        <Alert severity="warning" variant="filled">
          No se encontró la dirección
        </Alert>
      </Snackbar>
    </>
  );
};
