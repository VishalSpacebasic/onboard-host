/* eslint-disable no-nested-ternary */
/* eslint-disable no-restricted-syntax */
import {
  Box,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Stack } from "@mui/system";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import roomTypes from "./RoomSampleData";
import MainRoomTypeSelector from "./components/MainRoomTypeSelector";
import RoomPreferenceDisplay from "./components/RoomPreferenceDisplay";
import SubRoomTypeDisplay from "./components/SubRoomTypeDisplay";
import RoomSelectionComponent from "./components/RoomSelectionComponent";
import emitter from "../../utils/EventEmiter";
import {
  getAvailableRooms,
  submitRoomSelection,
} from "../../api/APIS/room-apis";
import RoomSelectionDisplay from "./components/RoomSelectionDisplay";
import { getRoomAllocationStatus } from "../../api/APIS/wizard-api";
import { getPaymentInfo } from "../../api/APIS/payment-routes";

export type RoomType = {
  name: string;
  basePrice: number;
  numberOfSub: number;
  subType: {
    name: string;
    price: number;
    id: number;
    attributes: string[];
  }[];
};
function RoomPreferenceV2({ next }) {
  const [mainRoomName, setmainRoomName] = useState(null);
  const [roomSelection, setRoomSelection] = useState(false);
  const [subRoomId, setSubRoomId] = useState(null);
  const [roomData, setRoomData] = useState<any>([]);
  const [roomPreference, setRoomPreference] = useState<any>([]);
  const [selectedRoom, setSelectedRoom] = useState<any>();
  const [roomTypeForRooms, setRoomTypeForRooms] = useState(null);
  const [roomPrefStat, setRoomPrefStat] = useState<any>({});
  const [roomInfo, setRoomInfo] = useState<any>();
  const [roomSelected, setRoomSelected] = useState<any>(false);
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
  function handleNextClicked() {
    console.log("handleNextClicked");
    fireApi();
  }
  const fireApi = () => {
    console.log(roomPrefStat);
    if (roomPrefStat.allotmentStatus == 0) {
      if (roomSelection) {
        console.log("ROOMSELECTION API CALL HERE");
        console.log(selectedRoom);
        if (selectedRoom?.id) {
          const roomId = selectedRoom?.id;
          submitRoomSelection({ room: roomId }).then((data) => {
            setRoomSelected(!roomSelected);
            if (data.result == 1) {
            }
          });
          // next();
          // setRoomSelected(!roomSelected);
          setRoomPrefStat({ allotmentStatus: 2 });
        } else {
          toast("Please select a room to continue..");
        }
      } else {
        console.log("NOT ROOM SELECTIOn");
        if (!roomPreference[0]?.id) {
          toast("Please add atleast one room preference.");
          return;
        }
        const preferences = {
          roomPreference1: roomPreference[0]?.id,
          roomPreference2: roomPreference[1]?.id,
          roomPreference3: roomPreference[2]?.id,
        };
        submitRoomSelection(preferences).then((data) => {
          console.log(data);
          if (data.result == 1) {
            // next();
            // setRoomPrefStat({ allotmentStatus: 3 });
            setRoomSelected(!roomSelected);
            // setRoomSelected(!roomSelected);
          } else {
            toast("Opps Something went wrong", { type: "error" });
          }
        });

        console.log(roomPreference);
      }
    } else if (roomPrefStat.allotmentStatus == 1) {
      next();
    } else if (roomPrefStat.allotmentStatus == 2) {
      // next();
      toast("Please wait for approval from the hostel team");
    } else if (roomPrefStat.allotmentStatus == 3) {
      // toast("please wait till the room is assigned to you");
      next();
      
    }
  };
  useEffect(() => {
    getRoomAllocationStatus().then((data) => {
      setRoomPrefStat(data);
      if (data.allotmentStatus == 0) {
        getAvailableRooms().then(({ result }) => {
          console.log("API RESPONSEROOM", result);
          setRoomData(result.combinations);
          setRoomSelection(result.configurations.typeOfSelection != "room");
        });
      } else {
        getPaymentInfo().then(({ result }) => {
          setRoomInfo(result);
        });
      }
    });

    setRoomSelection(false);
  }, [roomSelected]);
  useEffect(() => {
    emitter.removeAllListeners("next-clicked");
    emitter.on("next-clicked", handleNextClicked);
    return () => {
      console.log("unMounted");
      emitter.off("next-clicked", handleNextClicked);
    };
  }, [selectedRoom, roomPreference, roomSelection, roomPrefStat, roomSelected]);
  useEffect(() => {}, [mainRoomName]);
  const addRoomTypeToPreference = (subRoom: any) => {
    console.log(subRoom);
    const alreadyExist = roomPreference.includes(subRoom);
    if (!alreadyExist && roomPreference.length < 3) {
      setRoomPreference([...roomPreference, subRoom]);
    } else if (!alreadyExist && roomPreference.length === 3) {
      toast("You cannot add more than three preferences", { type: "error" });
    } else {
      setRoomPreference(
        roomPreference.filter((item: any) => item.id !== subRoom.id)
      );
    }
    // setRoomPreference([...roomPreference, subRoom]);
  };
  function findRoomById(data, roomId) {
    const { hostels, attributes } = data;

    for (const hostel of hostels) {
      for (const block of hostel.blocks) {
        for (const floor of block.floors) {
          for (const room of floor.rooms) {
            if (room.id === roomId) {
              const { roomName, roomType, totalOccupancy, id } = room;

              const { hostelName, blockName } = {
                ...hostel,
                ...block,
                ...floor,
              };
              const { price } = data;

              return {
                roomName,
                hostelName,
                blockName,
                price,
                roomType,
                totalOccupancy,
                attributes,
                id,
                ...room,
              };
            }
          }
        }
      }
    }

    return null; // room with given ID not found
  }
  const selectRoom = (room) => {
    const formattedData = findRoomById(roomTypeForRooms, room.id);
    setSelectedRoom(formattedData);
  };
  return (
    <Container maxWidth="xl">
      {/* {JSON.stringify(roomPrefStat)} */}
      {/* <Switch
        checked={roomSelection}
        onClick={() => setRoomSelection(!roomSelection)}
      /> */}

      {roomPrefStat.allotmentStatus == 0 ? (
        <Grid container>
          {!roomTypeForRooms ? (
            <Grid border={0} item lg={8} padding={1}>
              <Box
                sx={{
                  mt: 1,
                  mb: 2,
                }}
              >
                <MainRoomTypeSelector
                  roomData={roomData}
                  mainRoomName={mainRoomName}
                  setMainRoomName={setmainRoomName}
                />
              </Box>
              <Paper elevation={0}>
                {/* {JSON.stringify(roomTypeForRooms)} */}
                <SubRoomTypeDisplay
                  mainRoomName={mainRoomName}
                  roomData={roomData}
                  setSubRoomId={setSubRoomId}
                  subRoomId={subRoomId}
                  addToPreference={addRoomTypeToPreference}
                  preference={roomPreference}
                  roomSelection={roomSelection}
                  setRoomTypeForRooms={setRoomTypeForRooms}
                />
              </Paper>
            </Grid>
          ) : (
            <Grid border={0} item lg={8} padding={1}>
              <RoomSelectionComponent
                selectRoom={selectRoom}
                roomSelection={selectedRoom}
                roomTypeForRooms={roomTypeForRooms}
                setRoomTypeForRooms={setRoomTypeForRooms}
              />
            </Grid>
          )}
          <Grid border={0} item lg={4} padding={1}>
            <Stack height="70vh" direction="row">
              <Divider
                sx={{
                  mr: 1,
                }}
                orientation="vertical"
              />
              <Box width="100%">
                {!roomSelection ? (
                  <RoomPreferenceDisplay
                    addRoomTypeToPreference={addRoomTypeToPreference}
                    preferences={roomPreference}
                  />
                ) : (
                  <RoomSelectionDisplay
                    setSelectedRoom={setSelectedRoom}
                    selectedRoom={selectedRoom}
                  />
                )}
              </Box>
            </Stack>
          </Grid>
        </Grid>
      ) : (
        <Box>
          {/* {JSON.stringify(roomInfo)} */}
          {
            roomPrefStat.allotmentStatus == 1
              ? null // <Typography>Room Has been alloted</Typography>
              : roomPrefStat?.allotmentStatus == 2
              ? null
              : roomPrefStat.allotmentStatus == 3
              ? null
              : null // <Typography>Preference captured awaiting allotment</Typography>
          }
          {roomInfo?.id ? (
            <Grid item sm={4}>
              <Typography variant="h5">
                {roomPrefStat.allotmentStatus == 1 ? (
                  <Stack direction spacing={2} gap={1} alignItems="end">
                    {" "}
                    <Typography color="green" variant="h5">
                      Your room has been allocated!
                    </Typography>
                    <Typography variant="h5">
                      Please proceed with the payment.
                    </Typography>
                  </Stack>
                ) : null}
                {roomPrefStat.allotmentStatus == 2 ? (
                  <Stack direction spacing={2} gap={2} alignItems="end">
                    {" "}
                    <Typography color="green" variant="h5">
                      Success!
                    </Typography>
                    <Typography variant="h5">
                      {" "}
                      Your room has been reserved and is awaiting approval from
                      the hostel team.
                    </Typography>
                  </Stack>
                ) : null}
                {roomPrefStat.allotmentStatus == 3
                  ? "Preference captured awaiting warden to assign a room"
                  : null}
              </Typography>
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
            </Grid>
          ) : (
            <Box
              height="80vh"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Typography variant="h3" textAlign="center" color="grey">
                Your preference has been captured please make the payment and await allotment.
              </Typography>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
}

export default RoomPreferenceV2;
