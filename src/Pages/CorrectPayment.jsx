import { Header } from "../Components/Commons/Header";
import "../Stylesheets/CorrectPayment.css";
import { Container, Box, Stack, Typography } from "@mui/material";
import coche1 from "../images/coche1.png";
import coche2 from "../images/coche2.png";
import moto from "../images/moto.png";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { LoadingButton } from "@mui/lab";
import { useNavigate } from "react-router-dom";
export const CorrectPayment = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header Login Questions />
      <Container maxWidth={"sm"} sx={{ marginTop: "2em" }}>
        <Box
          sx={{
            width: "100%",
            height: "70vh",
            backgroundColor: "#EDF1D6",
            borderRadius: "3px",
            // padding: "1em",
            boxShadow: "0 0 5px rgba(0,0,0,0.3)",
            border: "1px solid #EDF1D6",
          }}
        >
          <Stack spacing={2} direction={"column"}>
            <Typography
              textAlign={"center"}
              variant="h3"
              sx={{ fontFamily: "Montserrat", padding: "0.3em" }}
            >
              ¡Gracias por confiar en nosotros!
            </Typography>
            <Typography
              textAlign={"center"}
              variant="p"
              sx={{ fontFamily: "Montserrat" }}
            >
              Porque estamos,{" "}
              <span style={{ fontWeight: "bold" }}>
                donde quieras encontrarnos
              </span>
              ...
            </Typography>
            <Typography
              textAlign={"center"}
              variant="p"
              fontSize={25}
              color="green"
              fontWeight={"bold"}
              sx={{
                fontFamily: "Montserrat",
                textShadow: "1px 1px 1px rgba(0, 0, 0, 0.5)",
              }}
            >
              <BsFillCheckCircleFill
                size={20}
                color="green"
                style={{ marginRight: "10px" }}
              />
              Pago aceptado
            </Typography>

            <LoadingButton
              loading={false}
              onClick={() => navigate("/user-page")}
              variant="outlined"
              color="success"
              sx={{ top: "50px" }}
            >
              Ir a mi Perfil
            </LoadingButton>

            <Box
              sx={{
                position: "relative",
                height: "100px",
                overflow: "hidden",
                top: "149px",
              }}
            >
              <img src={coche1} height={"100px"} className="car-image-two" />
            </Box>
            <Box
              sx={{
                position: "relative",
                height: "100px",
                overflow: "hidden",
                top: "31px",
              }}
            >
              <img src={coche2} height={"100px"} className="car-image-one" />
            </Box>
            <Box
              sx={{
                position: "relative",
                height: "100px",
                overflow: "hidden",
                top: "-60px",
              }}
            >
              <img
                src={moto}
                style={{ height: "50px" }}
                className="car-image-one"
              />
            </Box>
          </Stack>
        </Box>
      </Container>
    </>
  );
};
