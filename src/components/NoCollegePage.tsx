import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";

type Props = {};

function NoCollegePage({}: Props) {
  const navigate = useNavigate();
  return (
    <Box>
      <Button onClick={() => navigate("sbc")}>SBC</Button>
      <Button onClick={() => navigate("testenv")}>SBC</Button>
    </Box>
  );
}

export default NoCollegePage;
