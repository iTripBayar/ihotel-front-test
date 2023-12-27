import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { useSwiper } from 'swiper/react';
import { useAppCtx } from '@/contexts/app';

export function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button
      onClick={() => {
        swiper.slideNext();
      }}
      className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue pl-[2px] text-white'
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
      onClick={() => {
        swiper.slidePrev();
      }}
      className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue pr-[2px] text-white'
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
export function SliderCloseButton() {
  const { dispatch } = useAppCtx();
  return (
    <button
      className='flex h-[36px] w-[36px] items-center justify-center rounded-full bg-primary-blue text-white'
      onClick={() => {
        dispatch({
          type: 'CHANGE_APP_STATE',
          payload: { biggerImage: [] },
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
export default function ImagesDialog() {
  const { appState } = useAppCtx();
console.log(appState.biggerImage);

  return (
    <div className='fixed left-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-black/[.8] backdrop-blur-[2px]'>
      <div className='flex h-screen w-[calc(100%-32px)]  max-w-[500px] items-center justify-center sm:w-[calc(100%-100px)] md:w-[calc(100%-244px)]'>
        <Swiper
          modules={[Pagination, Navigation]}
          pagination={{ type: 'fraction' }}
          spaceBetween={20}
          slidesPerView={1}
          loop={true}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            width: '100%',
            height: '80%',
            color: 'white',
          }}
        >
          {appState.biggerImage.map((index, i) => (
            <SwiperSlide
              key={i}
              style={{
                width: '100%',
                maxHeight: '80%',
                display: 'flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                justifyContent: 'center',
                overflow: 'hidden',
                // backgroundColor: 'rgb(0 0 0/50%)',
              }}
            >
              <img
                src={
                  `${process.env.IMAGE_URL}${index}`
                }
                alt='Hotel images'
                className='w-full h-auto'
              />
            </SwiperSlide>
          ))}
          {appState.biggerImage.length > 1 ? (
            <div className='absolute bottom-0 flex w-full items-center justify-between px-[5%]'>
              <SlidePrevtButton />
              <SlideNextButton />
            </div>
          ) : null}
          <div className='absolute bottom-0 z-[999] flex w-full items-center justify-between px-[5%]'>
            <SlidePrevtButton />
            <SliderCloseButton />
            <SlideNextButton />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
