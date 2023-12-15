import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import { CardMedia, Box } from '@mui/material';
import { useSwiper } from 'swiper/react';
import { useAppCtx } from '@/contexts/app';

export function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slideNext()}
      className='w-[36px] h-[36px] pl-[2px] bg-primary-blue rounded-full flex justify-center items-center text-white'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='currentColor'
        className='min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M8.25 4.5l7.5 7.5-7.5 7.5'
        />
      </svg>
    </button>
  );
}
export function SlidePrevtButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => swiper.slidePrev()}
      className='flex h-[36px] w-[36px] pr-[2px] items-center justify-center rounded-full bg-primary-blue text-white'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='2.5'
        stroke='currentColor'
        className='max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M15.75 19.5L8.25 12l7.5-7.5'
        />
      </svg>
    </button>
  );
}
export function SliderCloseButton(){
  const { appState, dispatch } = useAppCtx();
    return (
      <button
        className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue text-white'
        onClick={() => {
          dispatch({
            type: 'CHANGE_APP_STATE',
            payload: { biggerImage: false },
          });
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='2'
          stroke='currentColor'
          className='max-h-[24px] min-h-[24px] min-w-[24px] max-w-[24px]'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      </button>
    );
}

export type ImageProps = {
  data: string[];
  grid?: boolean;
  isFull?: boolean;
};
export default function ImagesDialog( props: ImageProps) {
  const { appState, dispatch } = useAppCtx();

    const images =
      props.data && props.data.length > 0
        ? props.data.map((index) => {
            return {
              original: `https://sandbox.api.myhotel.mn/image?path=$${index}`,
            };
          })
        : [
            {
              original: `/samples/camp.png`,
            },
          ];
  const renderItem = (item: { original: string }) => {
    return (
      <CardMedia
        {...props}
        component='img'
        sx={{
          width: '100%',
          height: 'auto',
          borderRadius: 2,
        }}
        image={item.original}
        alt='green iguana'
        onDragStart={(event: any) => event.preventDefault()}
      />
    );
  };

  return (
    <div className='absolute left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/75 backdrop-blur-[1px]'>
      <div className='flex h-screen w-[90%] items-center justify-center'>
      {/* <div className='flex h-[1000px] w-[500px] items-center justify-center'> */}
        <Swiper
          modules={[Pagination, Autoplay, Navigation]}
          pagination={{ type: 'fraction' }}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            height: '80%',
            color: 'white',
          }}
        >
          {/* {images.map((index, i) => (
            <SwiperSlide
              key={i}
              style={{
                width: '100%',
                maxHeight: '88%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                overflow: 'hidden',
                borderRadius: 8,
              }}
            >
              <img
                src={
                  i === 0
                    ? `https://sandbox.api.myhotel.mn:9443/${index.original}`
                    : `https://sandbox.api.myhotel.mn/image?path=${index.original}`
                }
                alt='Hotel images'
                className='h-auto w-full'
              />
            </SwiperSlide>
          ))} */}
          {props.data.map((index, i) => (
            <SwiperSlide
              key={i}
              style={{
                width: '100%',
                maxHeight: '88%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                overflow: 'hidden',
              }}
            >
              {/* {renderItem(index)} */}
              <img
                // src='/samples/longImage.png'
                src={
                  i === 0
                    ? `https://sandbox.api.myhotel.mn:9443/${index}`
                    : `https://sandbox.api.myhotel.mn/image?path=${index}`
                }
                alt='Hotel images'
                className='h-auto w-full'
              />
            </SwiperSlide>
          ))}
          {/* {images.map((item, ind) => (
            <SwiperSlide
              key={ind}
              style={{
                width: '100%',
                maxHeight: '88%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                overflow: 'hidden',
                borderRadius: 8,
              }}
            >
              {renderItem(item)}
            </SwiperSlide>
          ))} */}
          {images.length > 1 ? (
            <div className='absolute bottom-0 flex w-full items-center justify-between px-[5%]'>
              <SlidePrevtButton />
              <SlideNextButton />
            </div>
          ) : null}
          <div className='absolute bottom-0 flex w-full items-center justify-between px-[5%]'>
            <SlidePrevtButton />
            <SliderCloseButton />
           
            <SlideNextButton />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
