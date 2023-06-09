import { Chip, Divider, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Stack } from "@mui/system";
import Scrollbars from "react-custom-scrollbars-2";

type Props = { roomData: any; mainRoomName: any; setMainRoomName: any };

function MainRoomTypeSelector({
  roomData,
  mainRoomName,
  setMainRoomName,
}: Props) {
  return (
    // <Swiper
    //   //   spaceBetween={1}
    //   modules={[Navigation, Pagination, Scrollbar, A11y]}
    //   spaceBetween={0}
    //   slidesPerView={4}
    //   navigation
    //   //   pagination={{ clickable: true }}
    //   //   scrollbar={{ draggable: true }}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   onSlideChange={() => console.log("slide change")}
    // >
    //   {roomData?.map((room, index) => {
    //     return (
    //       <SwiperSlide key={room.roomTypeName}>
    //       <Chip
    //         size="small"
    //         sx={{
    //           minHeight: 60,
    //         }}
    //         clickable
    //         onClick={() => setMainRoomName(room?.roomTypeName)}
    //         color={room.roomTypeName === mainRoomName ? "primary" : "default"}
    //         label={
    //           <Stack style={{ maxWidth: 200 }}>
    //             <Typography style={{ fontSize: 10 }}>{room?.roomTypeName}</Typography>
    //             <Divider />
    //             <Typography>
    //               <Typography variant="h3" style={{ fontSize: 12 }}>
    //                 Starts At
    //               </Typography>
    //               {room?.basePrice}
    //             </Typography>
    //           </Stack>
    //         }
    //       />
    //     </SwiperSlide>

    //     );
    //   })}
    // </Swiper>
    // <Box maxWidth="100%">
      <Scrollbars
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
        autoHeight
        autoHeightMax={120} // Set a maximum height for the scrollbar
        autoHide // Optionally hide the scrollbar when not scrolling
        autoHideTimeout={1000} // Specify the duration before hiding the scrollbar
        autoHideDuration={200} // Specify the duration of the scrollbar's fade animation
        // renderView={(props) => <div {...props} style={{ overflowX: "auto" }} />} // Render the view with horizontal scrolling
      >
        <Stack direction="row" spacing={1}>
          {roomData?.map((room, index) => (
            <Chip
              key={room.roomTypeName}
              size="small"
              sx={{
                minHeight: 60
              }}
              clickable
              onClick={() => setMainRoomName(room?.roomTypeName)}
              color={room.roomTypeName === mainRoomName ? "primary" : "default"}
              label={
                <Stack style={{ maxWidth: 300 }}>
                  <Typography fontWeight={"600"} style={{ fontSize: 13 }}>
                    {room?.roomTypeName}
                  </Typography>
                  {/* <Divider />
                  <Typography>
                    <Typography variant="h2" style={{ fontSize: 12 }}>
                      Starts At
                    </Typography>
                    {room?.basePrice}
                  </Typography> */}
                </Stack>
              }
            />
          ))}{" "}
       
        </Stack>
      </Scrollbars>
    // </Box>
  );
}

export default MainRoomTypeSelector;
