import React, { useEffect, useState } from "react";
import {
  getAvailableRooms,
  getRoomDataAfterPaymentForSelection,
  selectRoomAfterpayment,
} from "../../api/APIS/room-apis";
import { Box, Container, Stack } from "@mui/system";
import RoomSelectionComponent from "../room-preference-v2/components/RoomSelectionComponent";
import { Chip, Grid, Paper, Typography } from "@mui/material";
import RoomSelectionDisplay from "../room-preference-v2/components/RoomSelectionDisplay";
import emitter from "../../utils/EventEmiter";
import { toast } from "react-toastify";
import { getRoomAllocationStatus, roomSelectionMuj } from "../../api/APIS/wizard-api";
import { getPaymentInfo } from "../../api/APIS/payment-routes";
import { makeStyles } from "@mui/styles";

type Props = { next };

function RoomSelectionPage({ next }: Props) {
  const [avalRooms, setAvalRooms] = useState<any>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [roomPrefStat, setRoomPrefStat] = useState<any>({});
  const [roomInfo, setRoomInfo] = useState<any>();
  useEffect(() => {
    emitter.removeAllListeners("next-clicked");
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, [selectedRoom,roomPrefStat]);

  useEffect(() => {
    // setAvalRooms()
    setRoomSelection();
  }, []);
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: 2,
    },
    paper: {
      padding: 2,
      marginBottom: 2,
    },
    label: {
      fontWeight: "bold",
    },
  }));
  const classes = useStyles();
  const setRoomSelection = () => {
    getRoomAllocationStatus().then((data) => {
      setRoomPrefStat(data);
      if (data.allotmentStatus == 1) {
        getPaymentInfo().then(({ result }) => {
          setRoomInfo(result);
        });
      }
      getAvailableRooms().then(({ result }) => {
        console.log("API RESPONSEROOM", result);
        setAvalRooms(result.combinations);
        const rooms = result.combinations;
        getRoomDataAfterPaymentForSelection().then(({ result }) => {
          const selectedItem = rooms.forEach((item) => {
            item.subRoomTypes.forEach((subRoom) => {
              if (subRoom.id == result.room_preference1) {
                setAvalRooms(subRoom);
              }
            });
          });
        });
      });
    });
  };
  const handleNextClicked = () => {
    if(roomPrefStat.allotmentStatus==1){
      next();
      return;
    }
    selectRoomAfterpayment(selectedRoom.id).then((data) => {
      toast("Room selected successfully");
      next();
    });
   
  };
  return (
    <Container maxWidth="xl" mt={2}>
      {roomPrefStat.allotmentStatus == 1 ? (
        <Box>
          <Stack direction spacing={2} gap={1} alignItems="end">
            {" "}
            <Typography color="green" variant="h5">
              Your room has been allocated!
            </Typography>
          </Stack>
          <Paper sx={{ p: 2 }} elevation={4}>
            <Grid container rowGap={3}>
              <Grid item sm={6}>
                <Typography variant="subtitle1" className={classes.label}>
                  Room:
                </Typography>
                <Typography variant="h5">{roomInfo?.roomName}</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" className={classes.label}>
                  Hostel Name:
                </Typography>
                <Typography variant="h5">{roomInfo?.hostelName}</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" className={classes.label}>
                  Block Name:
                </Typography>
                <Typography variant="h5">{roomInfo?.blockName}</Typography>
              </Grid>
              <Grid item sm={6}>
                <Typography variant="subtitle1" className={classes.label}>
                  Floor Name:
                </Typography>
                <Typography variant="h5">{roomInfo?.floorName}</Typography>
              </Grid>

              {/* <div className="room-attributes"> */}
              <Grid item sm={12}>
                <Typography variant="body1" className={classes.label}>
                  Room Type:
                </Typography>
                <Typography variant="h5">{roomInfo?.roomType}</Typography>
              </Grid>
              {roomInfo?.attributes?.length ? (
                <Grid item sm={12}>
                  <Typography variant="body1" className={classes.label}>
                    Amenities :
                  </Typography>
                  <Typography variant="body1">
                    <Stack direction spacing={2} gap={2}>
                      {roomInfo?.attributes?.map((item) => {
                        return (
                          <Chip
                            variant="outlined"
                            color="primary"
                            label={item}
                          />
                        );
                      })}
                    </Stack>
                  </Typography>
                </Grid>
              ) : null}
            </Grid>
          </Paper>
        </Box>
      ) : (
        <Box>
          <Typography variant="h5">
            Your preference for {avalRooms?.roomTypeName} has been successfull
            please select the room.
          </Typography>
          <Grid container>
            <Grid item sm={9}>
              <RoomSelectionComponent
                selectRoom={setSelectedRoom}
                roomSelection={selectedRoom}
                // setRoomTypeForRooms={setRoomTypeForRooms}
                roomTypeForRooms={avalRooms}
              />
            </Grid>
            <Grid sm={3}>
              <RoomSelectionDisplay
                setSelectedRoom={setSelectedRoom}
                selectedRoom={selectedRoom}
                hidePrice={true}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Container>
  );
}

export default RoomSelectionPage;
