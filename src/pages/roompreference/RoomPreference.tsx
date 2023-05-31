import { Typography, Box, Chip, Container, Grid } from "@mui/material";
import Looks3Icon from "@mui/icons-material/Looks3";
import LooksOneIcon from "@mui/icons-material/LooksOne";
import LooksTwoIcon from "@mui/icons-material/LooksTwo";
import { useState } from "react";
import { toast } from "react-toastify";

function RoomPreference() {
  const [selection, setSelection] = useState<any>([]);
  const roomTypes = [
    { id: 1, name: "Single Room (AC)", services: ["TV", "WiFi", "Minibar"] },
    { id: 2, name: "Double Room (AC)", services: ["TV", "WiFi", "Minibar"] },
    { id: 3, name: "Twin Room (AC)", services: ["TV", "WiFi", "Minibar"] },
    {
      id: 4,
      name: "Suite (AC)",
      services: ["TV", "WiFi", "Minibar", "Balcony"],
    },
    {
      id: 5,
      name: "Executive Room (AC)",
      services: ["TV", "WiFi", "Minibar", "Balcony", "Jacuzzi"],
    },
    { id: 6, name: "Standard Room (Non-AC)", services: ["TV", "WiFi"] },
    { id: 7, name: "Economy Room (Non-AC)", services: ["TV"] },
  ];

  const addToSelection = (item: any) => {
    const checkExists = selection.some(
      (selectionItem: any) => item.id == selectionItem.id
    );
    if (checkExists) {
      const removeItemArray = selection.filter(
        (selectionItem: any) => item.id != selectionItem.id
      );
      setSelection(removeItemArray);
      return 0;
    }
    if (selection.length >= 3) {
      toast("You can only select upto 3 preferences");
      return 0;
    }
    setSelection([...selection, item]);
  };

  const getNumberIcon = (number: number): JSX.Element => {
    return number === 0 ? (
      <LooksOneIcon />
    ) : number === 1 ? (
      <LooksTwoIcon />
    ) : number === 2 ? (
      <Looks3Icon />
    ) : (
      <></>
    );
  };

  return (
    <Container>
      <Grid mt={5} container spacing={8}>
        <Grid item md={5}>
          <Box>
            {roomTypes.map((item) => {
              const selected = selection.findIndex(
                (type: any) => type.id == item.id
              );
              return (
                <Chip
                  sx={{
                    m: "8px",
                  }}
                  key={item.id}
                  icon={getNumberIcon(selected)}
                  size="medium"
                  color={selected >= 0 ? "success" : "default"}
                  label={<Typography>{item.name}</Typography>}
                  onClick={() => addToSelection(item)}
                />
              );
            })}
          </Box>
        </Grid>
        <Grid item md={7}>
          {selection.map((item: any) => {
            return (
              <Box mt={2}>
                <Typography variant="h5">{item.name}</Typography>
                <Typography>Price :4200$</Typography>
              </Box>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
}

export default RoomPreference;
