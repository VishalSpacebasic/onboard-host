import CloseIcon from "@mui/icons-material/Close";
import { Box, Chip, IconButton, Slide, Stack } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { getRoomSaleItem } from "../../../api/APIS/paymentV2-api";
import React from "react";

type Props = {
  subRoom;
  checked;
  containerRef;
  addRoomTypeToPreference;
  saleItemId;
  setSaleItemId;
};

function PrefCardItem({
  subRoom,
  checked,
  containerRef,
  addRoomTypeToPreference,
  saleItemId,
  setSaleItemId,
}: Props) {
  const [fee, setFee] = React.useState<any>({});
  useEffect(() => {
    getRoomSaleItem(subRoom.id).then(({ result }) => {
      setFee(result);
      setSaleItemId(result.id);
    });
    return () => {
      console.log("unmounting");
      setSaleItemId(null);
    };
  }, []);

  return (
    <Slide
      direction="right"
      in={checked}
      key={subRoom.id}
      container={containerRef.current}
    >
      <Card elevation={2} sx={{ width: "100%", mb: 1 }}>
        <Stack direction="row" justifyContent="space-between">
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {subRoom.roomTypeName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {subRoom?.description}
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                rowGap: 1,
                flexWrap: "wrap",
                // minHeight: 60,
              }}
            >
              {subRoom.attributes.map((attr) => {
                return (
                  <Chip
                    key={attr}
                    label={attr}
                    size="small"
                    variant="outlined"
                    color="info"
                  />
                );
              })}
            </Box>
            <Box>
              <Typography variant="h6" gutterBottom>
                Price Details
              </Typography>
              <Typography>Basic Price: {fee?.basic}</Typography>
              <Typography>SGST: {fee?.sgst}</Typography>
              <Typography>CGST: {fee?.cgst}</Typography>
              <Typography variant="h6" gutterBottom>
                Total Price: {fee?.total_price}
              </Typography>
            </Box>
          </CardContent>
          <CardActions>
            <IconButton
              onClick={() => addRoomTypeToPreference(subRoom)}
              color="error"
            >
              <CloseIcon />
            </IconButton>
          </CardActions>
        </Stack>
      </Card>
    </Slide>
  );
}

export default PrefCardItem;