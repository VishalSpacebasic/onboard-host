import { Box, Breadcrumbs, Divider, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import FloorDisplay from "./FloorDisplay";

type Props = { hostelData; hostelName; selectRoom; roomSelection };

function HostelDisplayer({
  hostelData,
  hostelName,
  selectRoom,
  roomSelection,
}: Props) {
  return (
    <Box>
      {hostelData.blocks.map((block) => {
        return (
          <Stack spacing={1} key={block.id}>
            {/* {JSON.stringify(block)} */}
            <Breadcrumbs separator="›" aria-label="breadcrumb">
              <Typography>{hostelName}</Typography>
              <Typography> {block.blockName}</Typography>
            </Breadcrumbs>
            <Divider />
            {block.floors.map((floor) => {
              return (
                <FloorDisplay
                  roomSelection={roomSelection}
                  key={floor.id}
                  selectRoom={selectRoom}
                  floor={floor}
                />
              );
            })}
          </Stack>
        );
      })}
    </Box>
  );
}

export default HostelDisplayer;
