import { Box, Button, Chip, Icon, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";

type Props = { floor: any; selectRoom: any; roomSelection: any };

function FloorDisplay({ floor, selectRoom, roomSelection }: Props) {
  return (
    <Box ml={2}>
      <Typography ml={1}>{floor.floorName}</Typography>
      <Stack ml={2} spacing={2} direction="row">
        {floor.rooms.map((room) => {
          return (
            <Button
              onClick={() => selectRoom(room)}
              variant={roomSelection?.id == room.id ? "contained" : "outlined"}
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
              </Stack>
            </Button>
          );
        })}
      </Stack>
    </Box>
  );
}

export default FloorDisplay;
