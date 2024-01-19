import { useRef, useState } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation, Pagination } from "swiper/modules";

function MovieCardsSwiper({ movies, title }) {
  return (
      <>
      <h1 className=" mt-10 ml-10 text-4xl font-semibold " >{title}</h1>
      <Swiper
        slidesPerView={"auto"}
        spaceBetween={5}
        centeredSlides={true}
        loop={true}
        pagination={{
          type: "bullets",
          clickable: true,
        }}
        cssMode={true}
        navigation={true}
        modules={[FreeMode, Navigation, Pagination]}
        className=" ml-10 select-none"
      >
        {movies?.map((movie, i) => (
          <SwiperSlide key={i} className="swiper-card ">
            <Card movie={movie} key={movie.id} />
          </SwiperSlide>
        ))}
      </Swiper>
      </>
  );
}

export default MovieCardsSwiper;
