import { Modal, Box, Typography } from "@mui/material";
import { MDBCheckbox, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { createSuperUser } from "../api/SuperUser";
import { putUser } from "../api/User";
import { Navigate, useNavigate } from "react-router-dom";
export const SuperUserInfoModal = ({
  superUserModal,
  handleSuperUserModal,
  style,
  userData,
}) => {
  const [checkedBox, setCheckedBox] = useState(false);
  const [notChecked, setNotCheckedBox] = useState();
  const [openChild, setOpenChild] = useState(false);
  const navigate = useNavigate();

  const handleOpenChild = () => {
    setOpenChild(true);
  };
  /**Control del checkbox de condiciones de uso */
  const handleCheckBox = () => {
    if (!checkedBox) {
      setNotCheckedBox(false);
    }
    setCheckedBox(!checkedBox);
  };

  /**Boton de comenzar */
  const handleStartButton = () => {
    const modifiedUserData = { ...userData };
    modifiedUserData.SuperUser_idSuperUser = userData.user_code;

    if (!checkedBox) {
      setNotCheckedBox(true);
      return;
    }
    // console.log(checkedBox);

    /**Creamos la id en la tabla */
    createSuperUser(userData.user_code)
      .then((data) => {
        /**Modificamos  la superUserId en la tabla usuario */
        putUser(modifiedUserData)
          .then((data) => {
            // console.log(data);
            handleOpenChild();
          })
          .catch((e) => {
            console.error(e);
          });
      })
      .catch((e) => {
        console.error(e);
      });
  };
  const onClose = () => {
    handleSuperUserModal(false);
  };

  const infoStyle = { ...style };
  infoStyle.height = 380;
  return (
    <>
      <Modal
        open={superUserModal}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={infoStyle}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{
              fontFamily: "Montserrat",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >
            ¡Conviértete en super usuario! &#128663;
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} variant="p">
            Como Superusuario Svelt podras publicar tus propias plazas{" "}
            <span style={{ textDecoration: "underline" }}>
              (Vados o plazas propias)
            </span>{" "}
            y <span style={{ fontWeight: "bold" }}>ganar una comisión </span>
            por cada uso que le den el resto de usuarios.
          </Typography>
          <Box marginTop="30px">
            <MDBCheckbox
              onChange={handleCheckBox}
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label={
                <span style={{ fontSize: "smaller" }}>
                  Acepto las condiciones de uso y la{" "}
                  <a href="https://yessnt.com/politicas-de-privacidad/">
                    política de privacidad
                  </a>
                </span>
              }
              style={{
                backgroundColor: "#9DC08B",
                cursor: "pointer",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              flexDirection: "column",
              marginTop: "40px",
            }}
          >
            <MDBBtn
              noRipple={true}
              className="mb-0 px-5"
              id="login-button"
              outline
              color="green"
              onClick={handleStartButton}
            >
              ¡Comencemos!
            </MDBBtn>
            {notChecked && (
              <p
                style={{ fontSize: "smaller", color: "red", marginTop: "7px" }}
              >
                *Acepta las condiciones de uso*
              </p>
            )}
          </Box>
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
                ¡Enhorabuena! Ya eres parte de nosotros
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="p"
                component="p"
                sx={{
                  fontFamily: "Montserrat",
                  textAlign: "center",
                  fontSize: "1.1em",
                  marginTop: "20px",
                }}
              >
                Gracias por ayudarnos a crecer{" "}
                <span style={{ color: "#9DC08B" }}>cada vez somos más</span>
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="p"
                component="p"
                sx={{
                  fontFamily: "Montserrat",
                  textAlign: "center",
                  fontSize: "1.2em",
                  marginTop: "15px",
                  fontWeight: "bold",
                }}
              >
                Empieza ya mismo a publicar tus plazas &#x1F17F;&#xFE0F;
              </Typography>
              <MDBBtn
                noRipple={true}
                className="mb-0 px-5"
                id="login-button"
                outline
                color="green"
                style={{ marginTop: "15px", marginLeft: "35%" }}
                onClick={() => navigate("/")}
              >
                ¡Allá Vamos!
              </MDBBtn>
            </Box>
          </Modal>
        </Box>
      </Modal>
    </>
  );
};
