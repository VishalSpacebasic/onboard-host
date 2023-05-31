import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import BedroomChildIcon from "@mui/icons-material/BedroomChild";
import { Divider, Icon, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Container, Stack } from "@mui/system";
import { useEffect, useState } from "react";
import Select from "react-select";
import RoomDisplay from "./RoomDisplay";

type Props = {
  roomTypeForRooms: any;
  selectRoom: any;
  setRoomTypeForRooms: any;
  roomSelection: any;
};

function RoomSelectionComponent({
  roomTypeForRooms,
  selectRoom,
  setRoomTypeForRooms,
  roomSelection,
}: Props) {
  const [formatted, setFormatted] = useState<any>({});
  const [originalFormat, setOrigialFormat] = useState<any>({});
  const [hostels, setHostels] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [floors, setFloors] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  useEffect(() => {
    setFormatted(convertFormat(roomTypeForRooms));
    setHostels(convertFormat(roomTypeForRooms).hostels);
    setBlocks(convertFormat(roomTypeForRooms).blocks);
    setFloors(convertFormat(roomTypeForRooms).floors);
  }, []);
  function convertFormat(original) {
    const hostels = original.hostels.map((hostel) => {
      return { id: hostel.id, name: hostel.hostelName };
    });

    const blocks = original.hostels.flatMap((hostel) => {
      return hostel.blocks.map((block) => {
        return { id: block.id, name: block.blockName, hostelId: hostel.id };
      });
    });

    const floors = original.hostels.flatMap((hostel) => {
      return hostel.blocks.flatMap((block) => {
        return block.floors.map((floor) => {
          return { id: floor.id, name: floor.floorName, blockId: block.id };
        });
      });
    });

    const rooms = original.hostels.flatMap((hostel) => {
      return hostel.blocks.flatMap((block) => {
        return block.floors.flatMap((floor) => {
          return floor.rooms.map((room) => {
            return {
              id: room.id,
              roomName: room.roomName,
              totalOccupancy: room.totalOccupancy,
              availability: room.availability,
              roomTypeId: room.roomTypeId,
              roomType: room.roomType,
              hostelId: hostel.id,
              blockId: block.id,
              floorId: floor.id,
            };
          });
        });
      });
    });

    return { hostels, blocks, floors, rooms };
  }
  function convertData(originalData) {
    const hostels = originalData.hostels?.map((hostel) => {
      const blocks = originalData.blocks
        .filter((block) => block.hostelId === hostel.id)
        .map((block) => {
          const floors = originalData.floors
            .filter((floor) => floor.blockId === block.id)
            .map((floor) => {
              const rooms = originalData.rooms
                .filter((room) => room.floorId === floor.id)
                .map((room) => ({
                  id: room.id,
                  roomName: room.roomName,
                  totalOccupancy: room.totalOccupancy,
                  availability: room.availability,
                  roomTypeId: room.roomTypeId,
                  roomType: room.roomType,
                }));
              return {
                id: floor.id,
                floorName: floor.name,
                rooms: rooms,
              };
            });
          return {
            id: block.id,
            blockName: block.name,
            floors: floors,
          };
        });
      return {
        id: hostel.id,
        hostelName: hostel.name,
        blocks: blocks,
      };
    });
    return {
      hostels: hostels,
    };
  }
  function getHostelOptions() {
    return hostels?.map((hostel) => {
      return { value: hostel.id, label: hostel.name, ...hostel };
    });
  }
  function getBlockOptions() {
    return blocks?.map((block) => {
      return { value: block.id, label: block.name, ...block };
    });
  }
  function getFloorOptions() {
    return floors?.map((floor) => {
      return { value: floor.id, label: floor.name, ...floor };
    });
  }
  useEffect(() => {
    console.log(selectedHostel, blocks);
    const hostelIds = selectedHostel.map((hostel) => hostel.value);
    const filteredBlocks = formatted?.blocks?.filter((block) => {
      return hostelIds.includes(block.hostelId);
    });
    console.log("THIS IS AFTER FILTER", selectedBlock, filteredBlocks);
    const blockIds = filteredBlocks?.map((block) => block.id);
    setBlocks(filteredBlocks);
    setSelectedBlock(
      selectedBlock.filter((block) => blockIds.includes(block.id))
    );
  }, [selectedHostel]);
  useEffect(() => {
    const blockIds = selectedBlock.map((block) => block.id);
    const filteredFloor = formatted?.floors?.filter((floor) => {
      return blockIds.includes(floor.blockId);
    });
    // console.log("THIS IS AFTER FILTER", selectedBlock, filteredBlocks);
    const floorIds = filteredFloor?.map((floor) => floor.id);
    setFloors(filteredFloor);
    setSelectedFloor(
      selectedFloor.filter((floor) => floorIds.includes(floor.id))
    );
  }, [selectedBlock]);

  useEffect(() => {
    const data = {
      hostels: selectedHostel.length ? selectedHostel : formatted.hostels,
      blocks: selectedBlock.length ? selectedBlock : formatted.blocks,
      floors: selectedFloor.length ? selectedFloor : formatted.floors,
      rooms: formatted.rooms,
    };
    setOrigialFormat(convertData(data));
  }, [selectedBlock, selectedFloor, selectedHostel]);

  return (
    <Container maxWidth="lg">
      <IconButton onClick={() => setRoomTypeForRooms(null)}>
        <ArrowBackIcon />
      </IconButton>
      {/* {JSON.stringify(originalFormat, null, 2)} */}
      <Divider />
      {/* {JSON.stringify(selection)} */}
      <Stack direction="row" gap={3}>
        <Select
          isMulti
          value={selectedHostel}
          onChange={(event) => setSelectedHostel(event)}
          options={getHostelOptions()}
          placeholder="Select Hostel"
        />
        <Select
          isMulti
          value={selectedBlock}
          onChange={(event) => setSelectedBlock(event)}
          options={getBlockOptions()}
          placeholder="Select Block"
        />
        <Select
          isMulti
          value={selectedFloor}
          onChange={(event) => setSelectedFloor(event)}
          options={getFloorOptions()}
          placeholder="Select Floor"
        />
        {/* <Select
          isMulti
          value={selectedRoom}
          // onChange={handleRoomChange}
          options={getRoomOptions()}
          placeholder="Select Room"
        />
    */}
      </Stack>
      {/* <Box border={1} mt={3}> */}

      {/* </Box> */}
      <RoomDisplay
        roomSelection={roomSelection}
        roomData={originalFormat}
        selectRoom={selectRoom}
      />
    </Container>
  );
}

export default RoomSelectionComponent;
