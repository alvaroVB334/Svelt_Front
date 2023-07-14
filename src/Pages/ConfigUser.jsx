import { Header } from "../Components/Commons/Header";
import { useLocation, useNavigate } from "react-router-dom";
import "../Stylesheets/ConfigUser.css";
import { IoIosArrowBack } from "react-icons/io";
import { HiPencilAlt } from "react-icons/hi";
import { TextField, Grid, Tooltip, Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import { putUser, md5Check } from "../api/User";
import LoadingButton from "@mui/lab/LoadingButton";

export const ConfigUser = () => {
  const location = useLocation();
  const userData = location?.state?.userData;
  const [name, setName] = useState(userData.name);
  const [lastName, setLastName] = useState(userData.lastName);
  const [dni, setDni] = useState(userData.dni);
  const [email, setEmail] = useState(userData.email);
  const [password, setPassword] = useState(userData.password);
  const [lastPassword, setLastPassword] = useState(userData.password);
  const [disabledInputs, setDisabledInputs] = useState(true);
  const [correctInfo, setCorrectInfo] = useState(false);
  const navigate = useNavigate();

  const handleConfirmation = () => {
    let passwordChange = 0;

    if (
      userData.password != lastPassword &&
      !md5Check(userData.password, lastPassword)
    ) {
      //La contraseña antigua no coincide
      // console.log(lastPassword);
      // console.log(userData.password);

      console.log("No coincide");
      return;
    }

    if (userData.password != password) {
      passwordChange = 1;
    }
    const modifiedUser = {
      user_code: userData.user_code,
      name: name,
      lastName: lastName,
      dni: dni,
      email: email,
      password: password,
      passwordChange: passwordChange,
      token: userData.token,
      Vehicle_registration: userData.Vehicle_registration,
      balance: userData.balance,
      SuperUser_idSuperUser: userData.SuperUser_idSuperUser,
      salt: userData.salt,
      activation_code: userData.activation_code,
      isActive: userData.isActive,
    };

    const response = putUser(modifiedUser);
    response
      .then((data) => {
        setCorrectInfo(true);
        setTimeout(() => {
          setCorrectInfo(false);
          navigate("/user-page");
        }, 2000);
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <>
      <Header />
      <section className="config-section-content">
        <div className="config-section-back-arrow">
          <IoIosArrowBack
            size="35"
            style={{ cursor: "pointer", color: "#9DC08B" }}
            onClick={() => navigate("/user-page")}
          />
        </div>
        <h2>Configuración del perfil</h2>
        <Tooltip title="Editar" arrow placement="bottom">
          <div>
            <HiPencilAlt
              size="20"
              style={{ color: "#9DC08B", cursor: "pointer", margin: "10px" }}
              onClick={() => setDisabledInputs(!disabledInputs)}
            />
          </div>
        </Tooltip>
        <Grid container spacing={2} style={{ padding: "20px" }}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Nombre"
              disabled={disabledInputs ? true : false}
              sx={{ width: "100%" }}
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Apellido"
              disabled={disabledInputs ? true : false}
              sx={{ width: "100%" }}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="DNI"
              disabled={disabledInputs ? true : false}
              sx={{ width: "100%" }}
              value={dni}
              onChange={(e) => {
                setDni(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="Email"
              disabled={disabledInputs ? true : false}
              sx={{ width: "100%" }}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="password"
              label="Contraseña Antigua"
              disabled={disabledInputs ? true : false}
              sx={{ width: "100%" }}
              onChange={(e) => {
                setLastPassword(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              type="password"
              label="Contraseña Nueva"
              disabled={disabledInputs ? true : false}
              sx={{ width: "100%" }}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Grid>
        </Grid>
        <LoadingButton
          loading={false}
          onClick={handleConfirmation}
          variant="outlined"
          color="success"
          sx={{ marginTop: "30px", backgroundColor: "#9DC08B" }}
        >
          Confirmar
        </LoadingButton>
      </section>
      <Snackbar open={correctInfo}>
        <Alert severity="success" variant="filled">
          Información Actualizada
        </Alert>
      </Snackbar>
    </>
  );
};
