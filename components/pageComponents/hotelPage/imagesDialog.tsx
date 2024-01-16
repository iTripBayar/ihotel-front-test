import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/mousewheel";
import "swiper/css/keyboard";
import { Pagination, Navigation, Mousewheel, Keyboard } from "swiper/modules";
import { useAppCtx } from "@/contexts/app";
import { useState } from "react";
import useWindowSize from "@/hooks/windowSize";

export function SlideNextButton() {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => {
        swiper.slideNext();
      }}
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue pl-[2px] text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 4.5l7.5 7.5-7.5 7.5"
        />
      </svg>
    </button>
  );
}
export function SlidePrevtButton() {
  const swiper = useSwiper();
  return (
    <button
      onClick={() => {
        swiper.slidePrev();
      }}
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue pr-[2px] text-white"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2.5"
        stroke="currentColor"
        className="max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 19.5L8.25 12l7.5-7.5"
        />
      </svg>
    </button>
  );
}
export function SliderCloseButton() {
  const { dispatch } = useAppCtx();
  return (
    <button
      className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue text-white"
      onClick={() => {
        dispatch({
          type: "CHANGE_APP_STATE",
          payload: { biggerImage: [] },
        });
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </button>
  );
}
export default function ImagesDialog() {
  const { appState, dispatch } = useAppCtx();
  const swiper = useSwiper();
  const size = useWindowSize();
  const [swiperRef, setSwiper] = useState<typeof swiper | null>(null);
  if (appState.imageIndex !== 0) {
    swiperRef?.slideTo(appState.imageIndex);
  }
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("outside")) {
      dispatch({
        type: "CHANGE_APP_STATE",
        payload: { biggerImage: [] },
      });
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/[.8] backdrop-blur-[2px] pb-[100px] outside"
      onMouseDownCapture={
        size.width && size.width < 1024 ? () => {} : handleClick
      }
      onClick={size.width && size.width >= 1024 ? () => {} : handleClick}
      // onTouchEnd={handleTouch}
      tabIndex={100}
    >
      <div className="flex h-screen w-[calc(100%-32px)]  max-w-[500px] items-center justify-center sm:w-[calc(100%-100px)] md:w-[calc(100%-244px)] lg:max-w-[650px] outside">
        <Swiper
          onSwiper={setSwiper}
          slidesPerView={1}
          spaceBetween={0}
          mousewheel={true}
          keyboard={true}
          grabCursor
          rewind
          pagination={{ type: "fraction" }}
          modules={[Pagination, Navigation, Mousewheel, Keyboard]}
          className="flex items-start w-full h-[80%] text-white outside"
        >
          {appState.biggerImage.map((index, i) => (
            <SwiperSlide
              key={i}
              style={{
                width: "100%",
                maxHeight: "80%",
                display: "flex",
                alignItems: "center",
                alignSelf: "flex-start",
                justifyContent: "center",
                overflow: "hidden",
                // backgroundColor: 'rgb(0 0 0/50%)',
              }}
              className="outside"
            >
              <img
                // src={`${process.env.IMAGE_URL}${index}`}
                src={
                  index === "/samples/camp.png"
                    ? index
                    : `${process.env.IMAGE_URL}${index}`
                }
                alt="Hotel images"
                className={`w-full h-auto ${
                  index === "/samples/camp.png" ? "blur-[3px]" : ""
                }`}
                loading="lazy"
              />
            </SwiperSlide>
          ))}
          {appState.biggerImage.length > 1 ? (
            <div className="absolute bottom-0 flex w-full items-center justify-between px-[5%]">
              <SlidePrevtButton />
              <SlideNextButton />
            </div>
          ) : null}
          <div className="absolute bottom-0 z-[999] flex w-full items-center justify-between px-[5%]">
            <SlidePrevtButton />
            <SliderCloseButton />
            <SlideNextButton />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
