import { Container, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HostelDisplayer from "./HostelDisplayer";

type Props = { roomData: any; selectRoom: any; roomSelection: any };

function RoomDisplay({ roomData, selectRoom, roomSelection }: Props) {
  return (
    <Box maxWidth={"100%"} overflow={"hidden"}>
      <Scrollbars
        style={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
        }}
        // autoHeight
      >
        <Box>
          <Box maxHeight="80vh" maxWidth="lg" display="flex" flexWrap="wrap">
            {roomData?.hostels?.map((hostel) => (
              <HostelDisplayer
                hostelName={hostel.hostelName}
                key={hostel.id}
                hostelData={hostel}
                selectRoom={selectRoom}
                roomSelection={roomSelection}
              />
            ))}
          </Box>
        </Box>
      </Scrollbars>
    </Box>
  );
}

export default RoomDisplay;
