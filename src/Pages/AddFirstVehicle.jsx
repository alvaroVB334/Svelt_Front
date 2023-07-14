import { Header } from "../Components/Commons/Header";
import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { postVehicle } from "../api/Vehicles";
import { putUser } from "../api/User";
import { IoIosArrowBack } from "react-icons/io";
export const AddFirstVehicle = () => {
  const [ceroConsumo, setCeroConsumo] = useState(false);
  const [modelo, setModelo] = useState();
  const [color, setColor] = useState();
  const [placa, setPlaca] = useState();
  const [successSnackBar, setSuccessSnackBar] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location?.state?.userData;

  const clickSubmitVehicle = () => {
    const vehicle = {
      registration: placa,
      color: color,
      model: modelo,
      ceroconsumo: ceroConsumo,
      token: userData.token,
    };

    let updatedUser = { ...userData };
    updatedUser.Vehicle_registration = vehicle.registration;

    // console.log(vehicle);
    // console.log(userData);

    /**Creamos el vehiculo */
    postVehicle(vehicle)
      .then((data) => {
        /**Actualizamos la matricula del usuario a esa */
        putUser(updatedUser)
          .then((data) => {
            localStorage.setItem("Vehicle_registration", vehicle.registration);
            setSuccessSnackBar(true);
            setTimeout(() => {
              setSuccessSnackBar(false);
              navigate("/");
            }, 2000);
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <Header />
      <div className="config-section-back-arrow">
        <IoIosArrowBack
          size="35"
          style={{ cursor: "pointer", color: "#9DC08B" }}
          onClick={() => navigate("/user-page")}
        />
      </div>
      <Typography
        variant="h3"
        sx={{ marginBottom: "4%", marginTop: "1.5%", fontFamily: "Montserrat" }}
        textAlign={"center"}
      >
        Añade tu primer vehiculo
      </Typography>
      <Grid container spacing={2} style={{ padding: "20px" }}>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Modelo"
            sx={{ width: "100%" }}
            value={modelo}
            onChange={(e) => {
              setModelo(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Color"
            sx={{ width: "100%" }}
            value={color}
            onChange={(e) => {
              setColor(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField
            label="Matricula"
            sx={{ width: "100%" }}
            value={placa}
            onChange={(e) => {
              setPlaca(e.target.value);
            }}
          />
          <Typography variant="p" color={"gray"} fontSize={"smaller"}>
            Ej: 1234AAA
          </Typography>
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControlLabel
            control={
              <Checkbox
                checked={ceroConsumo}
                onChange={(e) => {
                  setCeroConsumo(e.target.checked);
                }}
              />
            }
            label="¿Cero consumo?"
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          sx={{ display: "flex", justifyContent: "center", marginTop: "30px" }}
        >
          <LoadingButton
            loading={false}
            variant="outlined"
            color="success"
            onClick={clickSubmitVehicle}
            sx={{ backgroundColor: "#9DC08B" }}
          >
            Confirmar
          </LoadingButton>
        </Grid>
      </Grid>
      <Snackbar open={successSnackBar}>
        <Alert severity="success" variant="filled">
          Vehiculo registrado correctamente
        </Alert>
      </Snackbar>
    </>
  );
};
