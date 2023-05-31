import React, { useState, useEffect } from "react";
import Select from "react-select";

const data = {
  result: [
    {
      hostelId: "319",
      blocks: [
        {
          blockId: "592",
          blockName: "A Block - Boys Hostel",
          floors: [
            {
              floorId: "1591",
              floorName: "1st Floor",
              roomCount: "3",
              roomAvailable: "3",
              roomOccupied: "0",
              rooms: [
                {
                  roomId: "2795396",
                  roomName: "3",
                  occupancy: "2",
                  occupancyStatus: "available",
                  availableCount: "2",
                  extraOccupied: "0",
                  occupiedCount: "0",
                },
              ],
            },
          ],
        },
        {
          blockId: "593",
          blockName: "B Block - Boys Hostel",
          floors: [],
        },
      ],
    },
    {
      hostelId: "104",
      blocks: [
        {
          blockId: "229",
          blockName: "Indranagar - South Boys Hostel",
          floors: [
            {
              floorId: "698",
              floorName: "1",
              roomCount: "5",
              roomAvailable: "5",
              roomOccupied: "0",
              rooms: [
                {
                  roomId: "2792142",
                  roomName: "101",
                  occupancy: "5",
                  occupancyStatus: "available",
                  availableCount: "5",
                  extraOccupied: "0",
                  occupiedCount: "0",
                },
                {
                  roomId: "2792141",
                  roomName: "102",
                  occupancy: "5",
                  occupancyStatus: "available",
                  availableCount: "5",
                  extraOccupied: "0",
                  occupiedCount: "0",
                },
              ],
            },
            {
              floorId: "983",
              floorName: "first",
              roomCount: "1",
              roomAvailable: "1",
              roomOccupied: "0",
              rooms: [
                {
                  roomId: "2784991",
                  roomName: "rety",
                  occupancy: "2",
                  occupancyStatus: "available",
                  availableCount: "2",
                  extraOccupied: "0",
                  occupiedCount: "0",
                },
              ],
            },
          ],
        },
        {
          blockId: "380",
          blockName: "Kalyan Nagar - South Boys Hostel",
          floors: [
            {
              floorId: "1413",
              floorName: "sds",
              roomCount: "2",
              roomAvailable: "1",
              roomOccupied: "1",
              rooms: [
                {
                  roomId: "2792183",
                  roomName: "tttt",
                  occupancy: "1",
                  occupancyStatus: "occupied",
                  availableCount: "0",
                  extraOccupied: "0",
                  occupiedCount: "1",
                },
              ],
            },
          ],
        },
        {
          blockId: "437",
          blockName: "Hebbal - South Boys Hostel",
          floors: [
            {
              floorId: "1350",
              floorName: "First floor",
              roomCount: "2",
              roomAvailable: "1",
              roomOccupied: "1",
              rooms: [
                {
                  roomId: "2791370",
                  roomName: "109",
                  occupancy: "1",
                  occupancyStatus: "available",
                  availableCount: "1",
                  extraOccupied: "0",
                  occupiedCount: "0",
                },
                {
                  roomId: "2791369",
                  roomName: "abc",
                  occupancy: "1",
                  occupancyStatus: "occupied",
                  availableCount: "0",
                  extraOccupied: "0",
                  occupiedCount: "1",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  status: "Success",
  statusCode: "S",
};
function FilterComponent() {
  const [hostels, setHostels] = useState([]);
  const [selectedHostel, setSelectedHostel] = useState([]);
  const [selectedBlock, setSelectedBlock] = useState([]);
  const [selectedFloor, setSelectedFloor] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState([]);
  useEffect(() => {
    setHostels(data.result);
  }, []);
  const handleHostelChange = (selectedOptions) => {
    const removedHostelIds = selectedHostel
      .filter((option) => !selectedOptions.includes(option))
      .map((option) => option.value);
    const newSelectedBlock = selectedBlock.filter(
      (option) =>
        !removedHostelIds.includes(
          hostels.find((hostel) =>
            hostel.blocks.some((block) => block.blockId === option.value)
          ).hostelId
        )
    );
    setSelectedHostel(selectedOptions);
    setSelectedBlock(newSelectedBlock);
    setSelectedFloor([]);
    setSelectedRoom([]);
  };
  const handleBlockChange = (selectedOptions) => {
    setSelectedBlock(selectedOptions);
    setSelectedFloor([]);
    setSelectedRoom([]);
  };
  const handleFloorChange = (selectedOptions) => {
    setSelectedFloor(selectedOptions);
    setSelectedRoom([]);
  };
  const handleRoomChange = (selectedOptions) => {
    setSelectedRoom(selectedOptions);
  };
  const getHostelOptions = () => {
    return hostels.map((hostel) => ({
      value: hostel.hostelId,
      label: hostel.hostelId,
    }));
  };
  const getBlockOptions = () => {
    const selectedHostelIds = selectedHostel.map((option) => option.value);
    const blocks = hostels
      .filter((hostel) => selectedHostelIds.includes(hostel.hostelId))
      .flatMap((hostel) => hostel.blocks);
    return blocks.map((block) => ({
      value: block.blockId,
      label: block.blockName,
    }));
  };
  const getFloorOptions = () => {
    const selectedBlockIds = selectedBlock.map((option) => option.value);
    const floors = hostels
      .flatMap((hostel) => hostel.blocks)
      .filter((block) => selectedBlockIds.includes(block.blockId))
      .flatMap((block) => block.floors);
    return floors.map((floor) => ({
      value: floor.floorId,
      label: floor.floorName,
    }));
  };
  const getRoomOptions = () => {
    const selectedFloorIds = selectedFloor.map((option) => option.value);
    const rooms = hostels
      .flatMap((hostel) => hostel.blocks)
      .flatMap((block) => block.floors)
      .filter((floor) => selectedFloorIds.includes(floor.floorId))
      .flatMap((floor) => floor.rooms);
    return rooms.map((room) => ({ value: room.roomId, label: room.roomName }));
  };
  return (
    <div>
      <Select
        isMulti
        value={selectedHostel}
        onChange={handleHostelChange}
        options={getHostelOptions()}
        placeholder="Select Hostel"
      />
      <Select
        isMulti
        value={selectedBlock}
        onChange={handleBlockChange}
        options={getBlockOptions()}
        placeholder="Select Block"
      />
      <Select
        isMulti
        value={selectedFloor}
        onChange={handleFloorChange}
        options={getFloorOptions()}
        placeholder="Select Floor"
      />
      <Select
        isMulti
        value={selectedRoom}
        onChange={handleRoomChange}
        options={getRoomOptions()}
        placeholder="Select Room"
      />
    </div>
  );
}
export default FilterComponent;
