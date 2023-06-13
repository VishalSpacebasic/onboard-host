import { Box, Container, Stack } from "@mui/system";
import React from "react";
import Typography from "@mui/material/Typography";
import { Breadcrumbs, Button, Chip, Divider, Paper } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import DeleteIcon from "@mui/icons-material/Delete";

type Props = { roomItem; roomData; selectedRoom; setSelectedRoom; hidePrice };

function RoomSelectionDisplay({
  roomData,
  roomItem,
  setSelectedRoom,
  selectedRoom,
  hidePrice,
}: Props) {
  function clearSelection() {
    setSelectedRoom(null);
  }
  return (
    <Container maxWidth="lg">
      {/* {JSON.stringify(selectedRoom)} */}
      {selectedRoom ? (
        <Paper sx={{ padding: 3 }}>
          {/* {JSON.stringify(selectedRoom)} */}
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 2 }}>
            <Typography variant="body2" fontSize={12} sx={{ marginRight: 1 }}>
              {selectedRoom?.hostelName}
            </Typography>
            <NavigateNextIcon fontSize="small" />
            <Typography variant="body2" fontSize={12} sx={{ marginRight: 1 }}>
              {selectedRoom?.blockName}
            </Typography>
            <NavigateNextIcon fontSize="small" />
            <Typography variant="body2" fontSize={12}>
              {selectedRoom?.roomName}
            </Typography>
          </Box>
          <Box sx={{ marginBottom: 3 }}>
            <Typography variant="body1" gutterBottom>
              Room Number
            </Typography>
            <Typography variant="h4" gutterBottom>
              {selectedRoom?.roomName}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Room Type
            </Typography>
            <Typography variant="h4" gutterBottom>
              {selectedRoom?.roomType}
            </Typography>
            <Typography variant="body1" gutterBottom>
              Attributes
            </Typography>
            <Box sx={{ marginTop: 2 }}>
              {selectedRoom?.attributes?.map((atrib) => (
                <Chip
                  variant="outlined"
                  color="info"
                  key={atrib}
                  size="medium"
                  sx={{ marginRight: 1, marginBottom: 1 }}
                  label={
                    <Typography p={2} variant="h6">
                      {atrib}
                    </Typography>
                  }
                />
              ))}
            </Box>
            <Stack direction justifyContent="space-between">
              <Box>
                <Typography variant="body1" gutterBottom>
                  Room Occupancy
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {selectedRoom?.totalOccupancy}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" gutterBottom>
                  Availability
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {selectedRoom?.availability}
                </Typography>
              </Box>
            </Stack>
            {!hidePrice ? (
              <>
                {" "}
                <Typography variant="body1" gutterBottom>
                  Price
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {selectedRoom?.price} INR
                </Typography>
              </>
            ) : null}
          </Box>
          <Stack>
            <Button
              startIcon={<DeleteIcon />}
              fullWidth
              onClick={() => clearSelection()}
              color="error"
            >
              Clear Selection
            </Button>
          </Stack>
        </Paper>
      ) : (
        <Box
          sx={{
            height: "80vh",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography
            align="center"
            sx={{
              opacity: 0.5,
            }}
            variant="h3"
            color="gray"
          >
            Please Select A Room To Continue
          </Typography>
        </Box>
      )}
    </Container>
  );
}

export default RoomSelectionDisplay;
