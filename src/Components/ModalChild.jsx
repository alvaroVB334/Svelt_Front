import {
  Modal,
  Box,
  TextField,
  Grid,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { putVehicle, postVehicle } from "../api/Vehicles";
import { putUser } from "../api/User";
import { LoadingButton } from "@mui/lab";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
export const ModalChild = ({
  openChild,
  handleOpenChild,
  style,
  carInfo,
  userData,
}) => {
  const [matricula, setMatricula] = useState(carInfo.registration);
  const [color, setColor] = useState(carInfo.color);
  const [modelo, setModelo] = useState(carInfo.model);
  const [ceroConsumo, setCeroConsumo] = useState(carInfo.ceroconsumo);
  const [correctVehicle, setCorrectVehicle] = useState(false);

  const onClose = () => {
    handleOpenChild(false);
  };
  const handleCarConfirmation = () => {
    const vehicle = {
      registration: matricula,
      color: color,
      model: modelo,
      ceroconsumo: ceroConsumo,
      token: userData.token, //Al hacer post el vehiculo debe llevar un token
    };

    if (matricula == carInfo.registration) {
      //Si coinciden significa que solo modifica otras cosas ergo hacemos un put
      putVehicle(vehicle)
        .then((data) => {
          setCorrectVehicle(true);
          setTimeout(() => {
            setCorrectVehicle(false);
          }, 3000);
        })
        .catch((e) => {
          console.error(e);
        });
    } else {
      //Si cambia la matricula hay que crear una nueva y asignarsela al usuario

      const user = { ...userData };
      user.Vehicle_registration = matricula;

      postVehicle(vehicle)
        .then(() => {
          putUser(user)
            .then((data) => {
              setCorrectVehicle(true);
              setTimeout(() => {
                setCorrectVehicle(false);
              }, 3000);
            })
            .catch((e) => {
              console.error(e);
            });
        })
        .catch((e) => {
          console.error(e);
        });
    }
  };
  return (
    <>
      <Modal
        open={openChild}
        onClose={onClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 800, height: 250 }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ fontFamily: "Montserrat" }}
          >
            Modificar Datos:
          </Typography>
          <Grid container spacing={2} style={{ padding: "20px" }}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Matricula"
                sx={{ width: "100%" }}
                value={matricula}
                onChange={(e) => {
                  setMatricula(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Color"
                sx={{ width: "100%" }}
                value={color}
                onChange={(e) => {
                  setColor(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Modelo"
                sx={{ width: "100%" }}
                value={modelo}
                onChange={(e) => {
                  setModelo(e.target.value);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
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
            <Grid item xs={12} sm={4}>
              <LoadingButton
                loading={false}
                onClick={handleCarConfirmation}
                variant="outlined"
                color="success"
                sx={{ backgroundColor: "#9DC08B" }}
              >
                Confirmar
              </LoadingButton>
            </Grid>
          </Grid>
          <Snackbar open={correctVehicle}>
            <Alert severity="success" variant="filled">
              Vehiculo actualizado correctamente
            </Alert>
          </Snackbar>
        </Box>
      </Modal>
    </>
  );
};
