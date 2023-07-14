import { Header } from "../Components/Commons/Header";
import "../Stylesheets/Login.css";
import { Snackbar, Alert } from "@mui/material";
import { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineTwitter } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { authLogin } from "../api/Auth";
export const Login = () => {
  const navigate = useNavigate();
  const [emailState, setEmailState] = useState("");
  const [passwordState, setPasswordState] = useState("");
  const [errorSnackBar, setErrorSnackBar] = useState(false);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleLoginClick();
    }
  };
  const handleLoginClick = () => {
    const userData = {
      email: emailState,
      password: passwordState,
    };
    const response = authLogin(userData);
    response
      .then((data) => {
        // console.log(data);
        if (data.result.error_id == "405" || data.result.error_id == "401") {
          setErrorSnackBar(true);
          setTimeout(() => {
            setErrorSnackBar(false);
          }, 3000);
          return;
        }

        if (data.result.error_id == "200") {
          //Aqui el usuario no está activo
          navigate("/activate-user", { state: { emailState } });
        }

        if (data.result.token.isActive == 1) {
          localStorage.setItem("token", data.result.token.Token);
          localStorage.setItem("userEmail", userData.email);
          navigate("/user-page");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  return (
    <>
      <Header />
      <MDBContainer
        fluid
        className="p-3 my-5 h-custom d-flex align-items-center justify-content-center"
      >
        <MDBRow>
          <MDBCol col="15" md="16">
            <div className="d-flex flex-row align-items-center justify-content-center">
              <p className="lead fw-normal mb-0 me-3">Inicia Sesión con</p>

              <MDBBtn
                noRipple={true}
                floating
                size="sm"
                tag="a"
                className="me-2"
                style={{
                  backgroundColor: "#EDF1D6",
                  border: "1px solid #609966",
                }}
              >
                <AiOutlineTwitter color="#00acee" size="20" />
              </MDBBtn>
              <MDBBtn
                noRipple={true}
                floating
                size="sm"
                tag="a"
                className="me-2"
                style={{
                  backgroundColor: "#EDF1D6",
                  border: "1px solid #609966",
                }}
              >
                <FcGoogle size="20" />
              </MDBBtn>
            </div>

            <div className="divider d-flex align-items-center my-4">
              <p className="text-center fw-bold mx-3 mb-0">O</p>
            </div>

            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              id="formControlLg"
              type="email"
              size="lg"
              onKeyDown={handleKeyDown}
              onChange={(e) => setEmailState(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Contraseña"
              id="formControlLg"
              type="password"
              size="lg"
              onKeyDown={handleKeyDown}
              onChange={(e) => setPasswordState(e.target.value)}
            />

            <div className="d-flex justify-content-between mb-2">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Recordarme"
                style={{ backgroundColor: "#9DC08B", cursor: "pointer" }}
              />
              <br />
            </div>

            <div className="text-center text-md-start mt-4 pt-2">
              <a href="!#" style={{ marginRight: "20px" }}>
                ¿Olvidaste la contraseña?
              </a>
              <MDBBtn
                noRipple={true}
                className="mb-0 px-5"
                id="login-button"
                outline
                color="green"
                onClick={handleLoginClick}
              >
                Login
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                ¿No tienes cuenta?{" "}
                <a
                  id="register-link"
                  style={{ color: "#609966", cursor: "pointer" }}
                  onClick={() => navigate("/register")}
                >
                  Registrate
                </a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Snackbar open={errorSnackBar}>
        <Alert severity="error" variant="filled">
          Correo o contraseña incorrectos
        </Alert>
      </Snackbar>
    </>
  );
};
