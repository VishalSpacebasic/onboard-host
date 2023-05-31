import { Chip, Divider, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Stack } from "@mui/system";

type Props = { roomData: any; mainRoomName: any; setMainRoomName: any };

function MainRoomTypeSelector({
  roomData,
  mainRoomName,
  setMainRoomName,
}: Props) {
  return (
    <Swiper
      //   spaceBetween={1}
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={0}
      slidesPerView={4}
      navigation
      //   pagination={{ clickable: true }}
      //   scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
    >
      {roomData?.map((room, index) => {
        return (
          <SwiperSlide key={room.roomTypeName}>
            <Chip
              size="small"
              sx={{
                minHeight: 60,
              }}
              clickable
              onClick={() => setMainRoomName(room?.roomTypeName)}
              color={room.roomTypeName === mainRoomName ? "primary" : "default"}
              label={
                <Stack padding={2}>
                  <Typography>{room?.roomTypeName}</Typography>
                  <Divider />
                  <Typography>
                    <Typography variant="h3" fontSize={12}>
                      Starts At
                    </Typography>
                    {room?.basePrice}
                  </Typography>
                </Stack>
              }
            />
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default MainRoomTypeSelector;
