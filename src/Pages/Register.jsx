import { useState } from "react";
import { Header } from "../Components/Commons/Header";
import "../Stylesheets/Login.css";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { generateRandomCode } from "../api/User";
import { md5Crypt } from "../api/User";
import { postUser } from "../api/User";

export const Register = () => {
  const [name, setName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [dni, setDNI] = useState();
  const [correctPasswords, setCorrectPasswords] = useState(false);
  const [missingData, setMissingData] = useState(false);

  const navigate = useNavigate();

  const handleRegisterClick = (event) => {
    if (!name || !lastName || !email || !password || !confirmPassword || !dni) {
      setMissingData(true);
      setTimeout(() => {
        setMissingData(false);
      }, 2000);
      return;
    }
    event.preventDefault();
    if (password !== confirmPassword) {
      setCorrectPasswords(true);
      setTimeout(() => {
        setCorrectPasswords(false);
      }, 2000);
      return;
    }

    const activationCode = generateRandomCode();
    const cryptedPassword = md5Crypt(password);
    const user = {
      balance: 0,
      name: name,
      lastName: lastName,
      dni: dni,
      salt: "AAAAAA",
      activation_code: activationCode,
      isActive: 0,
      email: email,
      password: cryptedPassword,
    };

    postUser(user)
      .then((code) => {
        /**Movidas para mandar el correo con activation code */
        navigate("/activate-user", { state: { email } });
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
              <p className="lead fw-normal mb-0 me-3">Registro</p>
            </div>

            <div className="divider d-flex align-items-center my-4"></div>
            <div className="d-flex flex-row">
              <MDBInput
                wrapperClass="mb-2 mx-2"
                label="Nombre"
                type="text"
                size="lg"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-2 mx-2"
                label="Apellidos"
                type="text"
                size="lg"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: "50px",
                }}
              >
                &#128663;&#127359;&#65039; ¡Estas a un paso!
              </div>
            </div>
            <MDBInput
              wrapperClass="mb-4"
              label="Email"
              type="email"
              size="lg"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <div className="d-flex flex-column">
              <div className="d-flex flex-row">
                <MDBInput
                  wrapperClass="mb-2 mx-2"
                  label="DNI/NIE"
                  type="text"
                  size="lg"
                  value={dni}
                  onChange={(e) => {
                    setDNI(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4 me-2"
                  label="Contraseña"
                  type="password"
                  size="lg"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Repite la contraseña"
                  type="password"
                  size="lg"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </div>
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label={
                <>
                  Acepto las condiciones de uso y la{" "}
                  <a
                    href="https://yessnt.com/politicas-de-privacidad/"
                    target="_blank"
                  >
                    política de privacidad
                  </a>
                </>
              }
              style={{ backgroundColor: "#9DC08B", cursor: "pointer" }}
            />
            <div className="text-center text-md-start mt-4 pt-2">
              <MDBBtn
                noRipple={true}
                className="mb-0 px-5"
                id="login-button"
                outline
                color="green"
                onClick={
                  // e.preventDefault(); // Evitar la acción predeterminada del botón
                  handleRegisterClick
                }
                type="button"
              >
                Registrarme
              </MDBBtn>
              <p className="small fw-bold mt-2 pt-1 mb-2">
                ¿Ansioso por empezar? &nbsp;
                <a style={{ color: "#609966" }}>Nosotros también :)</a>
              </p>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <Snackbar open={correctPasswords}>
        <Alert severity="warning" variant="filled">
          ¡Las contraseñas deben coincidir!
        </Alert>
      </Snackbar>
      <Snackbar open={missingData}>
        <Alert severity="warning" variant="filled">
          Faltan datos por completar
        </Alert>
      </Snackbar>
    </>
  );
};
