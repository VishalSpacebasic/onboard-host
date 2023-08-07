import { Box, Button, Chip, Icon, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import PersonIcon from "@mui/icons-material/Person";

type Props = { floor: any; selectRoom: any; roomSelection: any };

function FloorDisplay({ floor, selectRoom, roomSelection }: Props) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);
  const [tooltipOpenArray, setTooltipOpenArray] = React.useState(
    new Array(floor.rooms.length).fill(false)
  );

  const handleTooltipOpen = (index) => {
    setTooltipOpenArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = true;
      return newArray;
    });
  };

  const handleTooltipClose = (index) => {
    setTooltipOpenArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[index] = false;
      return newArray;
    });
  };
  return (
    <>
      <Typography ml={1}>{floor.floorName}</Typography>
      <Box ml={2}>
        <Stack
          ml={2}
          flexWrap="wrap"
          spacing={3}
          gap={2}
          direction="row"
          sx={{
            "& > *:not(style) + *:not(style)": {
              margin: 0,
              marginLeft: "0px",
            },
          }}
        >
          {floor.rooms
            .sort((a, b) => a.roomName.localeCompare(b.roomName)) // Sort rooms by room name
            .map((room) => {
              return (
                <Button
                  onClick={() => selectRoom(room)}
                  variant={
                    roomSelection?.id == room.id ? "contained" : "outlined"
                  }
                  key={room.id}
                  size="medium"
                >
                  <Stack gap={1} alignItems="center" justifyContent="center">
                    <Typography>{room.roomName}</Typography>
                    <Stack direction>
                      <BedroomChildIcon />

                      <Typography>
                        {room.availability}/{room.totalOccupancy} Available
                      </Typography>
                    </Stack>
                    <Stack minHeight={10} key={room.id}>
                      {room?.residents?.map((resident, residentIndex) => {
                        return (
                          <Tooltip
                            key={resident.id}
                            title={
                              <div>
                                <Typography>{resident.first_name}</Typography>
                                <Typography>
                                  City : {resident.city || "N/A"}
                                </Typography>
                                <Typography>
                                  Course : {resident.course_name || "N/A"}
                                </Typography>
                                <Typography>
                                  Stream : {resident.stream_name || "N/A"}
                                </Typography>
                              </div>
                            }
                            open={tooltipOpenArray[residentIndex]}
                            onOpen={() => handleTooltipOpen(residentIndex)}
                            onClose={() => handleTooltipClose(residentIndex)}
                          >
                            <Button variant="outlined">
                              <PersonIcon /> {resident?.first_name}
                            </Button>
                          </Tooltip>
                        );
                      })}
                    </Stack>
                  </Stack>
                </Button>
              );
            })}
        </Stack>
      </Box>
    </>
  );
}

export default FloorDisplay;
