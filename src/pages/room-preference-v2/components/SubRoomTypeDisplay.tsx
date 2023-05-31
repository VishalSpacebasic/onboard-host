import { useEffect, useState } from "react";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";

import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Swiper, SwiperSlide } from "swiper/react";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Chip, Divider } from "@mui/material";
import RoomPreference from "../../roompreference/RoomPreference";

type Props = {
  roomData: any;
  mainRoomName: any;
  subRoomId: any;
  setSubRoomId: any;
  addToPreference: any;
  preference: any;
  roomSelection: any;
  setRoomTypeForRooms: any;
};

function SubRoomTypeDisplay({
  mainRoomName,
  roomData,
  setSubRoomId,
  subRoomId,
  addToPreference,
  preference,
  roomSelection,
  setRoomTypeForRooms,
}: Props) {
  const [subRooms, setSubRooms] = useState<any>([]);
  useEffect(() => {
    const subRoomType = roomData.filter((item) => {
      return item.roomTypeName === mainRoomName;
    });
    console.log("SubRoomTypeDisplay", mainRoomName, subRoomType);
    setSubRooms(subRoomType[0]?.subRoomTypes);
  }, [mainRoomName, roomData]);
  const checkInPreference = (roomId) => {
    return preference.some((room) => {
      return room.id === roomId;
    });
  };
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      breakpoints={{
        600: {
          slidesPerView: 1,
        },
        940: {
          slidesPerView: 2,
        },
        960: {
          slidesPerView: 2,
        },
        1280: {
          slidesPerView: 3,
        },
      }}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      autoHeight
    >
      {subRooms?.map((subRoom) => {
        const isAddedToPref = checkInPreference(subRoom.id);
        return (
          <SwiperSlide key={subRoom.id}>
            <Card elevation={4} sx={{ maxWidth: 345, minHeight: "100%" }}>
              <CardMedia
                sx={{ height: 190 }}
                // alt="https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg"
                image={
                  subRoom.images ||
                  "https://www.thespruce.com/thmb/iMt63n8NGCojUETr6-T8oj-5-ns=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/PAinteriors-7-cafe9c2bd6be4823b9345e591e4f367f.jpg"
                }
                title="green iguana"
              />
              <CardContent>
                <Typography
                  minHeight={65}
                  gutterBottom
                  variant="h6"
                  component="div"
                >
                  {subRoom.roomTypeName}
                </Typography>
                {/* <Divider /> */}

                <Box
                  sx={{
                    display: "flex",
                    gap: 1,
                    rowGap: 1,
                    flexWrap: "wrap",
                    minHeight: 60,
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
                <Typography
                  variant="body2"
                  sx={{ minHeight: 60 }}
                  color="text.secondary"
                >
                  {subRoom.description}
                </Typography>
                <Box>
                  {" "}
                  <Chip
                    variant="outlined"
                    color="success"
                    label={`Starts at: ${subRoom.price} INR`}
                  />
                </Box>
              </CardContent>
              <CardActions>
                {/* <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
                 */}
                {!roomSelection ? (
                  <Button
                    onClick={() => addToPreference(subRoom)}
                    variant={isAddedToPref ? "contained" : "outlined"}
                    size="small"
                    startIcon={isAddedToPref ? <CloseIcon /> : <AddIcon />}
                    fullWidth
                  >
                    {isAddedToPref
                      ? "Remove From Preference"
                      : "Add to preference "}
                  </Button>
                ) : (
                  <Button
                    onClick={() => setRoomTypeForRooms(subRoom)}
                    variant="outlined"
                    size="small"
                    fullWidth
                  >
                    Select Room
                  </Button>
                )}
              </CardActions>
            </Card>
          </SwiperSlide>
        );
      })}
      <Box sx={{ mt: 4 }}>
        <div slot="pagination" className="swiper-pagination" />
        <div slot="scrollbar" className="swiper-scrollbar" />
      </Box>
    </Swiper>
  );
}

export default SubRoomTypeDisplay;
