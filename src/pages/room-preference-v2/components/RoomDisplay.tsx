import { Container, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Scrollbars from "react-custom-scrollbars-2";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import HostelDisplayer from "./HostelDisplayer";

type Props = { roomData: any; selectRoom: any; roomSelection: any };

function RoomDisplay({ roomData, selectRoom, roomSelection }: Props) {
  return (
    <Box>
      <Scrollbars
        style={{
          width: "100%",
          height: "60vh",
          display: "flex",
          flexDirection: "column",
        }}
        // autoHeight
      >
        <Box maxHeight="80vh" maxWidth="lg">
          {/* {JSON.stringify(roomData)} */}
          <Box border={0}>
            {roomData?.hostels?.map((hostel) => {
              return (
                <HostelDisplayer
                  hostelName={hostel.hostelName}
                  key={hostel.id}
                  hostelData={hostel}
                  selectRoom={selectRoom}
                  roomSelection={roomSelection}
                />
              );
            })}
          </Box>
        </Box>
      </Scrollbars>
    </Box>
  );
}

export default RoomDisplay;
