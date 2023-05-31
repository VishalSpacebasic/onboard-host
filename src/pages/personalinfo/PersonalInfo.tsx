import { Container, Divider, Paper, Slide, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import PersonalInfoForm from "./components/PersonalInfoForm";

interface PersonalInfoProps {
  next: () => void;
}

function PersonalInfo({ next }: PersonalInfoProps): JSX.Element {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container maxWidth="lg">
      <Slide direction="left" in={mounted} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
          }}
        >
          <Typography variant="h5">Please fill the details</Typography>
          <Divider />
          <Box mt={10}>
            <PersonalInfoForm next={next} />
          </Box>
        </Paper>
      </Slide>
    </Container>
  );
}

export default PersonalInfo;
