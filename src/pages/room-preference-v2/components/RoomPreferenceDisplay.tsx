import { Box } from "@mui/material";
import React from "react";
import PrefCardItem from "./PrefCardItem";

type Props = {
  preferences: any;
  addRoomTypeToPreference: any;
  saleItemId;
  setSaleItemId;
};

function RoomPreferenceDisplay({
  preferences,
  addRoomTypeToPreference,
  saleItemId,
  setSaleItemId,
}: Props) {
  const containerRef = React.useRef(null);
  const [checked, setChecked] = React.useState(true);

  return (
    <Box ref={containerRef}>
      {preferences.map((subRoom) => {
        return (
          <PrefCardItem
            key={subRoom.id}
            subRoom={subRoom}
            checked={checked}
            containerRef={containerRef}
            addRoomTypeToPreference={addRoomTypeToPreference}
            saleItemId={saleItemId}
            setSaleItemId={setSaleItemId}
          />
        );
      })}
    </Box>
  );
}

export default RoomPreferenceDisplay;
