import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Header } from "../Components/Commons/Header";
import { getDataUserByToken } from "../api/Token";
import { GrConfigure } from "react-icons/gr";
import { FaParking } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { HiOutlineIdentification } from "react-icons/hi";
import { FaQuestionCircle } from "react-icons/fa";
import { MdOutlineColorLens } from "react-icons/md";
import { FaCat } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { BsCarFrontFill } from "react-icons/bs";
import { Modal, Box, Typography, Tooltip, TextField } from "@mui/material";
import { AiFillCheckCircle } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import "../Stylesheets/MainUserPage.css";
import { HiPencilAlt } from "react-icons/hi";
import { getVehicleByRegis } from "../api/Vehicles";
import { ModalChild } from "../Components/ModalChild";
import { SuperUserInfoModal } from "../Components/SuperUserInfoModal";
import { BookingParkingCard } from "../Components/BookingParkingCard";
import { IoMdAddCircleOutline } from "react-icons/io";
import { LoadingButton } from "@mui/lab";
import { deleteVehicle } from "../api/Vehicles";
import { deleteUserById, putUser } from "../api/User";

export const MainUserPage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(); //Sustituir userDarta por lo de paco, la foto, etc
  const [openRegisModal, setOpenRegisModal] = useState(false);
  const [carInfo, setCarInfo] = useState();
  const [openChild, setOpenChild] = useState(false);
  const [superUserModal, setSuperUserModal] = useState(false);
  const [deleteUserModal, setDeleteUserModal] = useState(false);
  const [secureMessage, setSecureMessage] = useState();
  const [loadingDeleteAccount, setLoadingDeleteAccount] = useState(false);
  const token = localStorage.getItem("token");

  const handleOpenChild = (value) => {
    setOpenChild(value);
    setOpenRegisModal(value);
  };

  const handleSuperUserModal = (value) => {
    setSuperUserModal(value);
  };
  /**Style del modal */
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 330,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    borderRadius: "5px",
  };

  /**Configuración */
  const handleConfigClick = () => {
    navigate("/user-config", { state: { userData } });
  };

  /**Mis matriculas */
  const handleOpenMyCars = () => {
    const response = getVehicleByRegis(userData.Vehicle_registration);

    response
      .then((data) => {
        setCarInfo(data);
      })
      .catch((e) => {
        console.log(e);
      });
    setOpenRegisModal(true);
  };

  /**Cierre de sesión */
  const handleSessionClose = () => {
    localStorage.clear();
    navigate("/");
  };

  /**ELIMINAR PERMANENTEMENTE USUARIO */
  const handleDeleteUserData = () => {
    setLoadingDeleteAccount(true);
    // console.log(secureMessage);
    if (secureMessage != "Estoy seguro Svelt") {
      setLoadingDeleteAccount(false);
      return;
    }

    const userToDelete = { ...userData };
    userToDelete.Vehicle_registration = null;

    setTimeout(() => {
      /**ACTUALIZAMOS EL VEHICULO A NULL */
      putUser(userToDelete).then((data) => {
        /**Eliminamos vehiculo */
        deleteVehicle(userData.Vehicle_registration)
          .then((data) => {
            // console.log(data);
            /**Luego usuario y token */
            deleteUserById(userData.user_code)
              .then((data) => {
                // console.log(data);
                setLoadingDeleteAccount(false);
                localStorage.clear();
                navigate("/");
              })
              .catch((e) => console.log(e));
          })
          .catch((e) => console.log(e));
      });
    }, 2000);
  };

  useEffect(() => {
    // console.log(token);
    if (!token) {
      navigate("/login");
    } else {
      const response = getDataUserByToken(token);
      response
        .then((data) => {
          setUserData(data);
          localStorage.setItem(
            "Vehicle_registration",
            data.Vehicle_registration
          );
          // console.log(data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [navigate, openChild, SuperUserInfoModal]);
  return (
    <>
      <Header Questions />
      <div className="main-user-page">
        <div className="content-main-user-page">
          {userData ? (
            <>
              <section className="top-main-user-page-section">
                <h1>¡Hola {userData.name}!</h1>
              </section>
              <section className="mid-main-user-page-section">
                <p onClick={handleConfigClick}>
                  <GrConfigure style={{ marginRight: "10px" }} /> Configuración
                </p>
                {userData.Vehicle_registration ? (
                  <p onClick={handleOpenMyCars}>
                    <BsCarFrontFill /> Mis Vehiculos
                  </p>
                ) : (
                  <p
                    onClick={() =>
                      navigate("/add-first-vehicle", { state: { userData } })
                    }
                  >
                    <IoMdAddCircleOutline
                      size="20"
                      // style={{ marginRight: "1%" }}
                    />{" "}
                    Añadir Vehiculo
                  </p>
                )}
                {userData.SuperUser_idSuperUser ? (
                  <p
                    onClick={() =>
                      navigate("/my-parkings", { state: { userData } })
                    }
                  >
                    <FaParking /> Ver mis plazas
                  </p>
                ) : (
                  <p onClick={() => handleSuperUserModal(true)}>
                    <FaParking /> Convertirme en Super Usuario
                  </p>
                )}

                <SuperUserInfoModal
                  superUserModal={superUserModal}
                  handleSuperUserModal={handleSuperUserModal}
                  style={style}
                  userData={userData}
                />
                <p>
                  <FaHistory /> Historial de compras
                </p>
                <p
                  onClick={() => {
                    navigate("/faqs");
                  }}
                >
                  <FaQuestionCircle /> Politicas de Empresa
                </p>
                <p
                  onClick={() =>
                    window.open("https://yessnt.com/scroll/", "__blank")
                  }
                >
                  <FaCat /> About Yessn't
                </p>
                <p onClick={handleSessionClose}>
                  <BiLogOut /> Cerrar Sesión
                </p>
                <p
                  style={{ color: "red" }}
                  onClick={() => {
                    setDeleteUserModal(true);
                  }}
                >
                  <MdDeleteForever /> Eliminar mi Cuenta
                </p>
              </section>

              {carInfo && (
                <Modal
                  open={openRegisModal}
                  onClose={() => setOpenRegisModal(false)}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h4"
                      component="h2"
                      sx={{ fontFamily: "Montserrat" }}
                    >
                      Vehiculo asociado:
                    </Typography>
                    <Tooltip title="Editar mi vehiculo" arrow>
                      <Box component={"span"}>
                        <HiPencilAlt
                          // onClick={() => console.log(carInfo)}
                          onClick={() => handleOpenChild(true)}
                          size="20"
                          style={{ color: "#40513B", cursor: "pointer" }}
                        />
                      </Box>
                    </Tooltip>
                    <br></br>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      variant="h6"
                    >
                      <HiOutlineIdentification />{" "}
                      {userData.Vehicle_registration}
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      variant="h6"
                    >
                      <MdOutlineColorLens />
                      <span
                        style={{
                          backgroundColor: `${carInfo.color}`,
                          color:
                            carInfo.color.toLowerCase() == "black"
                              ? "white"
                              : "black",
                          borderRadius: "5px",
                          padding: "3px",
                        }}
                      >
                        {carInfo.color}
                      </span>
                    </Typography>
                    <Typography
                      id="modal-modal-description"
                      sx={{ mt: 2 }}
                      variant="h6"
                    >
                      <BsCarFrontFill /> {carInfo.model}
                    </Typography>

                    {carInfo.ceroconsumo == 1 ? (
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        variant="h6"
                      >
                        <AiFillCheckCircle color="#9DC08B" />
                        Cero Consumo
                      </Typography>
                    ) : (
                      <Typography
                        id="modal-modal-description"
                        sx={{ mt: 2 }}
                        variant="h6"
                      >
                        <ImCancelCircle color="red" size={17} /> Cero Consumo
                      </Typography>
                    )}
                    <ModalChild
                      userData={userData}
                      carInfo={carInfo}
                      style={style}
                      openChild={openChild}
                      handleOpenChild={handleOpenChild}
                    />
                  </Box>
                </Modal>
              )}
              <Modal
                open={deleteUserModal}
                onClose={() => setDeleteUserModal(false)}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <Box sx={{ ...style, width: 600, height: 350 }}>
                  <Typography
                    id="modal-modal-title"
                    variant="h3"
                    component="h3"
                    sx={{ fontFamily: "Montserrat" }}
                    textAlign={"center"}
                  >
                    ¿Estás seguro?
                  </Typography>
                  <Typography
                    variant="h6"
                    color={"red"}
                    textAlign={"center"}
                    fontFamily={"Montserrat"}
                    marginTop={"2%"}
                  >
                    Se borraran todos tus datos permanentemente
                  </Typography>
                  <Typography
                    variant="p"
                    component={"div"}
                    fontSize={"smaller"}
                    fontFamily={"Montserrat"}
                    marginTop={"8%"}
                    marginLeft={"20%"}
                  >
                    Introduce: "Estoy seguro Svelt" para continuar...
                  </Typography>
                  <TextField
                    sx={{ marginLeft: "30%", marginTop: "3%" }}
                    size="small"
                    type="text"
                    label="¿Seguro?"
                    value={secureMessage}
                    onChange={(e) => {
                      setSecureMessage(e.target.value);
                    }}
                  ></TextField>
                  <Box sx={{ marginLeft: "38%", marginTop: "3%" }}>
                    <LoadingButton
                      loading={loadingDeleteAccount}
                      onClick={handleDeleteUserData}
                      variant="outlined"
                      color="error"
                    >
                      Borrar Todo
                    </LoadingButton>
                  </Box>
                </Box>
              </Modal>
            </>
          ) : (
            <p>Cargando...</p>
          )}
        </div>
      </div>
      {userData?.usingParking && <BookingParkingCard userData={userData} />}
    </>
  );
};
