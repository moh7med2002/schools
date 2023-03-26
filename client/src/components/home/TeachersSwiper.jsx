import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


// import required modules
import { Pagination, Navigation } from "swiper";
import { Box, Typography } from "@mui/material";
import TeacherBox from "./TeacherBox";
import TeacherSkelton from "../skelton/TeacherSkelton";
import { useTeachersData } from "../../hooks/useFetchTeachers";

export default function TeachersSwiper() {
 
  const {isLoading , data} = useTeachersData();

  return (
    <Box sx={{marginTop:"100px" , marginBottom:"50px"}}>
        <Typography variant='h4' sx={{fontWeight:"bold" , fontSize:{md:"28px", xs:"22px"} , marginBottom:"15px"}}>المدرسون</Typography>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation]}
        breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 50,
            },
          }}
        className="mySwiper"
      >
        {
          isLoading
          ?
          <>
            <SwiperSlide>
              <TeacherSkelton/>
            </SwiperSlide>
            <SwiperSlide>
              <TeacherSkelton/>
            </SwiperSlide>
            <SwiperSlide>
              <TeacherSkelton/>
            </SwiperSlide>
            <SwiperSlide>
              <TeacherSkelton/>
            </SwiperSlide>
            <SwiperSlide>
              <TeacherSkelton/>
            </SwiperSlide>
            <SwiperSlide>
              <TeacherSkelton/>
            </SwiperSlide>
          </>
          :
          <>
            {
              data.teachers.map(teacher=>{
                return<SwiperSlide key={teacher.id+"ng"}>
                        <TeacherBox teacher={teacher}/>
                      </SwiperSlide>
              })
            }
          </>
        }
      </Swiper>
    </Box>
  );
}
