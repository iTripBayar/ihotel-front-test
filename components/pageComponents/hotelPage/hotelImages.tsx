import Image from "next/image";
import { useAppCtx } from "@/contexts/app";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  FreeMode,
  Thumbs,
  Mousewheel,
  Pagination,
  Keyboard,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { useState } from "react";

interface Props {
  images: string[];
  image: string;
}

const HotelImages = ({ images, image }: Props) => {
  const { dispatch } = useAppCtx();
  const swiper = useSwiper();

  let aditionalImages = [
    "/images/imageSample.png",
    "/images/imageSample.png",
    "/images/imageSample.png",
    "/images/imageSample.png",
    "/images/imageSample.png",
    "/images/imageSample.png",
    "/images/imageSample.png",
    "/images/imageSample.png",
  ];
  if (images.length < 10) {
    aditionalImages = aditionalImages.slice(0, 10 - images.length);
  }

  const [thumbsSwiper, setThumbsSwiper] = useState<typeof swiper | null>(null);

  const allImages = [image, ...images];
  return (
    <div className="flex w-full flex-col gap-[4px] overflow-hidden rounded-b-[6px] rounded-t-[12px]">
      <Swiper
        loop
        spaceBetween={0}
        navigation={false}
        keyboard={true}
        grabCursor
        pagination={{ type: "progressbar" }}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[Thumbs, Pagination, Keyboard]}
        className="w-full h-[200px] 2xs:h-[250px] sm:h-[300px] md:h-[375px] lg:h-[400px] xl:h-[425px] 2xl:h-[500px]"
      >
        {allImages.map((index, i) => (
          <SwiperSlide
            key={i}
            onClick={() => {
              dispatch({
                type: "CHANGE_APP_STATE",
                payload: { biggerImage: [image, ...images], imageIndex: i },
              });
            }}
            className="relative h-[200px] w-full 2xs:h-[250px] sm:h-[300px] md:h-[375px] lg:h-[400px] xl:h-[425px] 2xl:h-[500px]"
          >
            <Image
              src={`${process.env.IMAGE_URL}${index}`}
              alt="/hotel"
              fill={true}
              quality={90}
              loading="lazy"
              sizes="50vw"
              placeholder="blur"
              blurDataURL={`"_next/image/?url=${index}"`}
              className="absolute h-auto w-auto select-none object-cover"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        loop={true}
        spaceBetween={4}
        slidesPerView={5}
        breakpoints={{
          640: {
            slidesPerView: 6,
          },
        }}
        freeMode={true}
        watchSlidesProgress={true}
        mousewheel={true}
        modules={[FreeMode, Thumbs, Mousewheel]}
        className="w-full h-[60px] 2xs:h-[75px] md:h-[100px]"
      >
        {allImages.map((index, i) => (
          <SwiperSlide
            key={i}
            className="relative h-[60px] w-[60px] min-w-[60px] cursor-pointer 2xs:h-[75px] 2xs:w-[75px] 2xs:min-w-[75px] md:h-[100px]  md:min-w-[100px] lg:max-w-[100px] "
          >
            <Image
              src={`${process.env.IMAGE_URL}${index}`}
              alt="/hotel"
              fill={true}
              loading="lazy"
              sizes="50vw"
              placeholder="blur"
              blurDataURL={`"_next/image/?url=${index}"`}
              className="absolute h-auto w-auto select-none object-fill"
              draggable={false}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HotelImages;
