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
        <Typography variant="body1" color="GrayText">*The above information is prefilled. Should there be any changes, please connect with Hostel administration once you reach our campus.</Typography>
      <Slide direction="left" in={mounted} mountOnEnter unmountOnExit>
        <Paper
          elevation={3}
          sx={{
            padding: "20px",
          }}
        >
          <Typography variant="h5">Please fill the details</Typography>
          <Divider />
        
          <Box mt={6}>
            <PersonalInfoForm next={next} />
          </Box>
        </Paper>
      </Slide>
    </Container>
  );
}

export default PersonalInfo;
