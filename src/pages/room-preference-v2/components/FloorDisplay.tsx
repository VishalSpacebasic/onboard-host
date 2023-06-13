import { Box, Button, Chip, Icon, Tooltip, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import PersonIcon from '@mui/icons-material/Person';

type Props = { floor: any; selectRoom: any; roomSelection: any };

function FloorDisplay({ floor, selectRoom, roomSelection }: Props) {
  const [tooltipOpen, setTooltipOpen] = React.useState(false);

  const handleTooltipOpen = () => {
    setTooltipOpen(true);
  };

  const handleTooltipClose = () => {
    setTooltipOpen(false);
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
          {floor.rooms.map((room) => {
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
                  {/* {JSON.stringify(room)} */}
                  <Stack minHeight={10}>
                    {room?.residents?.map((resident) => {
                      return (
                        <Tooltip
                          title={
                            <div key={resident.id}>
                              <Typography>{resident.first_name}</Typography>
                              <Typography>City : {resident.city || 'Delhi'}</Typography>
                              <Typography>Course : {resident.course_name || 'N/A'}</Typography>
                              <Typography>Stream : {resident.stream_name || 'N/A'}</Typography>
                            </div>
                          }
                          open={tooltipOpen}
                          onOpen={handleTooltipOpen}
                          onClose={handleTooltipClose}
                        >
                          <Button variant="outline">
                          <PersonIcon/>   {resident?.first_name}
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
