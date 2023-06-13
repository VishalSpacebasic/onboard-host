import React, { useEffect, useState } from "react";
import Adder from "./components/Adder";
import { Divider, Grid, Typography } from "@mui/material";
import { Container } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import emitter from "../../utils/EventEmiter";
type Props = { next };

function HealthInfoPage({ next }: Props) {
  const [alergiers, setAllergies] = useState([""]);
  const [medConditions, setmedConditions] = useState([""]);
  useEffect(() => {
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, []);
  const handleNextClicked = () => {
    next();
  };
  return (
    <Container maxWidth="lg">
      <Typography mt={4} variant="h5">
        Please add any medical conditions or allergies. If none please skip this
        step.
      </Typography>
      <Grid mt={5} spacing={2} container>
        <Grid item sm={6}>
          <Typography variant="h4">Medical Conditions</Typography>
          <Divider></Divider>
          <Adder render={alergiers} setter={setAllergies}></Adder>
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h4">Food Allergies</Typography>
          <Divider></Divider>
          <Adder render={medConditions} setter={setmedConditions}></Adder>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HealthInfoPage;
