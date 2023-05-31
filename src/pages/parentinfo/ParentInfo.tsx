import React from "react";
import Container from "@mui/material/Container";
import { Divider, Paper, Typography } from "@mui/material";
import ParentInfoForm from "./components/ParentInfoForm";

type Props = { next };

function ParentInfo({ next }: Props) {
  return (
    <Container maxWidth="lg">
      <Paper
        sx={{
          mt: 5,
          p: 2,
        }}
        elevation={5}
      >
        <Typography variant="h5" color="initial">
          Parent details
        </Typography>
        <Divider />
        <ParentInfoForm next={next} />
      </Paper>
    </Container>
  );
}

export default ParentInfo;
