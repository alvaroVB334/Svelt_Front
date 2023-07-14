import ReactCodeInput from "react-code-input";
import { Header } from "../Components/Commons/Header";
import { MDBBtn } from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserByEmail, putUser } from "../api/User";
import { Snackbar, Alert } from "@mui/material";
import emailjs from "@emailjs/browser";

export const ActivateUser = () => {
  const [userData, setUserData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const [inputState, setInputState] = useState(""); /**Value del codeinput */

  const emailState = location?.state?.emailState;
  const email = location?.state?.email;
  const emailToSend = emailState ? emailState : email;

  const [errorCode, setErrorCode] = useState(false);
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    /**Pillamos el usuario por su Email */
    // console.log(emailToSend);
    getUserByEmail(emailToSend)
      .then((data) => {
        setUserData(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [emailState]);

  useEffect(() => {
    sendEmail();
  }, userData);

  const sendEmail = () => {
    if (!userData) {
      return;
    }
    emailjs
      .send(
        "service_ylxy4dy",
        "template_doz60qc",
        {
          to_name: userData?.name,
          user_code: userData?.activation_code,
          email: emailToSend,
        },
        "2U87ajEfj-8nceuai"
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
        },
        (err) => {
          console.log("FAILED...", err);
        }
      );
  };
  /**Cambia el valor del code input */
  const handleInputChange = (input) => {
    setInputState(input);
  };

  const handleConfirmCode = () => {
    // console.log(inputState);
    // console.log(userData);
    if (userData.activation_code !== inputState) {
      setErrorCode(true);
      setTimeout(() => {
        setErrorCode(false);
      }, 2000);
      return;
    }

    userData.isActive = 1;

    putUser(userData)
      .then((data) => {
        setAllCorrect(true);
        setTimeout(() => {
          setAllCorrect(false);
          navigate("/");
        }, 2000);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  return (
    <>
      <Header />
      <div
        style={{
          height: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          flexDirection: "column",
        }}
      >
        <h4>Introduce el codigo que te hemos enviado al correo</h4>
        <ReactCodeInput
          type="text"
          fields={6}
          value={inputState}
          onChange={handleInputChange}
        />
        <p style={{ fontSize: "smaller", marginTop: "20px" }}>
          ¡Estas a un paso de Convertirte en un Svelter! &#128663;
        </p>
        <MDBBtn
          noRipple={true}
          className="mb-0 px-5"
          id="login-button"
          outline
          color="#609966"
          onClick={handleConfirmCode}
        >
          Confirmar
        </MDBBtn>
      </div>
      <Snackbar open={errorCode}>
        <Alert severity="error" variant="filled">
          Codigo Incorrecto
        </Alert>
      </Snackbar>
      <Snackbar open={allCorrect}>
        <Alert severity="success" variant="filled">
          Codigo Correcto &#128663;
        </Alert>
      </Snackbar>
    </>
  );
};
