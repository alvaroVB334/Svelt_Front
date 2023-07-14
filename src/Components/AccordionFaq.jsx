import {
  Accordion,
  Typography,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { useState } from "react";
import { MdOutlineExpandMore } from "react-icons/md";
export const AccordionFaq = ({ text, Title }) => {
  const [expanded, setExpanded] = useState(true);
  return (
    <Accordion
      sx={{ backgroundColor: "#9DC08B", width: "80%" }}
      expanded={expanded}
      onClick={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={<MdOutlineExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography
          variant="h6"
          sx={{ fontFamily: "Montserrat", color: "white" }}
        >
          {Title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "rgba(73, 105, 58, 0.8)",
          border: "1px solid #49693a",
          color: "white",
          boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography sx={{ fontFamily: "Montserrat" }}>{text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
