'use client';
import Image from 'next/image';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Navigation } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';
// import 'swiper/css/navigation';
import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import NextBtn from './nextBtn';
import PrevBtn from './prevBtn';
import { useAppCtx } from '@/utils/app';

interface iProps {
  data: any[];
  destinations: any[];
}

const CommonLocation = ({ data, destinations }: iProps) => {
  const { appState } = useAppCtx();

  // console.log(data);

  // console.log(data[0].coverPhoto);

  // console.log(data);

  const categories = [
    {
      key: 'ub',
      img: '/samples/ub_city.png',
      title: 'Хотод ойр',
      titleEn: 'Near Ub',
      desc: 'Улаанбаатар',
      descEn: 'Ulaanbaatar',
    },
    {
      key: 'lakes',
      img: '/samples/lakes.png',
      title: 'Нуурууд',
      titleEn: 'Lakes',
      desc: 'Үзэсгэлэнт нуурууд',
      descEn: 'Beautiful lakes',
    },
    {
      key: 'gobi',
      img: '/samples/gobi.png',
      title: 'Говь',
      titleEn: 'Gobi desert',
      desc: 'Говийн үзэсгэлэнт газрууд',
      descEn: 'Astonishing places in desert',
    },
    {
      key: 'talHangai',
      img: '/samples/tal_hangai.png',
      title: 'Тал, Хангай',
      titleEn: 'Steppe',
      desc: 'Тал, хангайн үзэсгэлэнт газрууд',
      descEn: 'Stunning places in steppe',
    },
    {
      key: 'rashaan',
      img: '/samples/rashaan.png',
      title: 'Рашаан, сувилал',
      titleEn: 'Spa resorts',
      desc: 'Рашаан сувлилууд',
      descEn: 'Rejuvenating spa resorts',
    },
  ];
  const locations = [
    {
      key: 'terelj',
      img: '/samples/slider1.png',
      title: 'Тэрэлж',
      desc: 'Байгалийн цогцолбор газар',
    },
    {
      key: 'jargalantiinAm',
      img: '/samples/slider2.png',
      title: 'Жаргалантын ам',
      desc: 'Богд уулын баруун ам',
    },
    {
      key: 'bogdkhanUul',
      img: '/samples/slider3.png',
      title: 'Богдхан уул',
      desc: 'Богд уулын баруун ам',
    },
    {
      key: 'sugnuguriinGol',
      img: '/samples/slider4.png',
      title: 'Сөгнөгөрийн гол',
      desc: 'Байгалийн цогцолбор газар',
    },
    // {
    //   key: 'khuvsgul nuur',
    //   img: '/samples/slider5.png',
    //   title: 'Хөвсгөл нуур',
    //   desc: 'Байгалийн цогцолбор газар',
    // },
    // {
    //   key: 'ugiinNuur',
    //   img: '/samples/slider6.png',
    //   title: 'Өгийн нуур',
    //   desc: 'Байгалийн цогцолбор газар',
    // },
    // {
    //   key: 'hyargasNuur',
    //   img: '/samples/slider7.png',
    //   title: 'Хяргас нуур',
    //   desc: 'Байгалийн цогцолбор газар',
    // },
  ];
  const sliderRef = React.useRef<Slider>(null);

  function SampleNextArrow(props: any) {
    const { onClick } = props;

    return <NextBtn onClick={onClick} />;
  }

  function SamplePrevArrow(props: any) {
    const { onClick } = props;
    return <PrevBtn onClick={onClick} />;
  }

  const [activeIndex, setActive] = useState<any>(0);

  const settings = {
    className: 'center relative',
    centerMode: true,
    infinite: true,
    centerPadding: '134px',
    slidesToShow: 1,
    speed: 500,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          centerPadding: '160px',
        },
      },
      {
        breakpoint: 1280,
        settings: {
          centerPadding: '106px',
        },
      },
      {
        breakpoint: 1024,
        settings: {
          centerPadding: '106px',
        },
      },
      {
        breakpoint: 768,
        settings: {
          centerPadding: '58px',
        },
      },
      {
        breakpoint: 576,
        settings: {
          centerPadding: '5%',
        },
      },
      {
        breakpoint: 320,
        settings: {
          centerPadding: '6%',
        },
      },
    ],
    afterChange: (current: number) => setActive({ current }),
  };

  sliderRef.current?.slickGoTo(0);

  // console.log(data);
  // console.log(activeIndex);
  // console.log(sliderRef);

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <h3 className="mb-[-10px] self-center text-[16px] font-medium md:text-[18px] lg:text-[22px]">
        {appState.lang === 'mn' ? 'Түгээмэл байршилууд' : 'Common destinations'}
      </h3>
      <Slider {...settings} ref={sliderRef}>
        {data.map((index) => (
          <div
            className="relative h-[150px] w-full overflow-hidden rounded-[10px] text-center text-white xs:h-[200px] md:h-[275px] lg:h-[350px] lg:rounded-[20px]"
            key={index.id}
          >
            <Image
              src={`https://ihotel.mn/${index.coverPhoto}`}
              alt="/commonLocs"
              fill={true}
              // priority
              quality={75}
              // sizes="100vw"
              loading="lazy"
              sizes="100vw"
              placeholder="blur"
              blurDataURL={`"_next/image/?url=${index.coverPhoto}"`}
              className="h-auto w-full object-cover"
            />
            <div className="absolute bottom-0 z-[1] flex h-[50px] w-full flex-col items-center justify-center gap-[2px] bg-black/50 md:h-[75px] md:gap-[4px]">
              <h3 className="text-[16px] font-medium leading-[14px] md:text-[18px] md:leading-[18px]">
                {/* {appState.lang === 'mn' ? data.title : data.titleEn} */}
                {appState.lang === 'mn' ? index.name : ''}
              </h3>
              <p className="text-[12px] md:text-[14px]">
                {/* {appState.lang === 'mn' ? data.desc : data.descEn} */}
                {appState.lang === 'mn' ? index.subtitle : ''}
              </p>
              {index.author !== null && index.author !== '' ? (
                <div className="z-100 absolute bottom-[4px] right-[8px] flex items-center justify-center gap-[4px] text-[8px] font-medium text-white sm:right-[24px] sm:text-[12px]">
                  <svg
                    className="h-[8px] w-[8px] sm:h-[12px] sm:w-[12px]"
                    viewBox="0 0 11 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.4006 0C4.33247 0 3.28831 0.322569 2.40019 0.926917C1.51207 1.53126 0.819857 2.39025 0.411099 3.39524C0.00234001 4.40023 -0.10461 5.5061 0.103773 6.57299C0.312157 7.63989 0.826514 8.6199 1.5818 9.38909C2.33709 10.1583 3.29938 10.6821 4.347 10.8943C5.39461 11.1065 6.48049 10.9976 7.46732 10.5813C8.45415 10.1651 9.29761 9.4601 9.89104 8.55563C10.4845 7.65116 10.8012 6.5878 10.8012 5.5C10.7996 4.0418 10.2301 2.6438 9.21765 1.6127C8.20519 0.581599 6.83244 0.00161752 5.4006 0ZM5.4006 9.77778C4.56983 9.77778 3.75771 9.52689 3.06695 9.05684C2.37619 8.58679 1.8378 7.91869 1.51988 7.13703C1.20195 6.35537 1.11877 5.49525 1.28085 4.66545C1.44292 3.83564 1.84298 3.07341 2.43042 2.47515C3.01787 1.8769 3.76632 1.46948 4.58113 1.30442C5.39594 1.13936 6.24052 1.22407 7.00805 1.54785C7.77559 1.87162 8.43161 2.41992 8.89316 3.12339C9.35472 3.82687 9.60107 4.65393 9.60107 5.5C9.59988 6.63416 9.15695 7.72153 8.36947 8.5235C7.58198 9.32548 6.51427 9.77656 5.4006 9.77778ZM7.48033 7.0894C7.15277 7.53385 6.69621 7.8621 6.17532 8.02765C5.65442 8.1932 5.09558 8.18767 4.57794 8.01185C4.0603 7.83602 3.61009 7.4988 3.29106 7.04795C2.97204 6.5971 2.80038 6.05546 2.80038 5.49974C2.80038 4.94403 2.97204 4.40239 3.29106 3.95154C3.61009 3.50069 4.0603 3.16347 4.57794 2.98764C5.09558 2.81181 5.65442 2.80628 6.17532 2.97184C6.69621 3.13739 7.15277 3.46564 7.48033 3.91009C7.5294 3.97409 7.56544 4.0474 7.58637 4.12574C7.6073 4.20408 7.61269 4.28588 7.60223 4.36637C7.59177 4.44686 7.56566 4.52441 7.52543 4.59451C7.48521 4.66461 7.43167 4.72584 7.36795 4.77463C7.30423 4.82342 7.2316 4.85879 7.15431 4.87867C7.07701 4.89855 6.9966 4.90255 6.91777 4.89043C6.83895 4.87831 6.76328 4.85032 6.69519 4.80808C6.62711 4.76584 6.56797 4.71022 6.52123 4.64444C6.34491 4.40502 6.09909 4.22817 5.81858 4.13893C5.53808 4.0497 5.23712 4.05261 4.95834 4.14725C4.67955 4.24189 4.43707 4.42346 4.26524 4.66625C4.09341 4.90903 4.00095 5.20072 4.00095 5.5C4.00095 5.79928 4.09341 6.09097 4.26524 6.33375C4.43707 6.57654 4.67955 6.75811 4.95834 6.85275C5.23712 6.94739 5.53808 6.9503 5.81858 6.86106C6.09909 6.77183 6.34491 6.59498 6.52123 6.35555C6.56757 6.28882 6.62658 6.23222 6.69477 6.18913C6.76297 6.14603 6.83896 6.1173 6.91825 6.10464C6.99754 6.09198 7.07852 6.09565 7.15639 6.11543C7.23427 6.13521 7.30745 6.1707 7.37162 6.2198C7.43579 6.26889 7.48963 6.3306 7.52997 6.40126C7.5703 6.47193 7.59631 6.55012 7.60644 6.6312C7.61658 6.71228 7.61064 6.79461 7.58898 6.87331C7.56732 6.95201 7.53038 7.02549 7.48033 7.0894Z"
                      fill="white"
                    />
                  </svg>
                  <p>{index.author}</p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </Slider>
      <div className=" grid w-full gap-[20px] px-[24px] text-white sm:px-[68px] md:px-[120px] lg:grid-cols-4 lg:px-[140px] xl:px-[150px] 2xl:px-[200px]">
        {/* {activeIndex == 0
          ? destinations.map((data) => (
              <div
                key={data.id}
                className="group relative h-[150px] w-full cursor-pointer overflow-hidden rounded-[10px]  md:h-[200px] md:rounded-[16px] lg:rounded-[16px]"
              >
                <Image
                  // src={data.img}
                  src={`https://ihotel.mn/${data.image}`}
                  alt="/commonLocs"
                  fill={true}
                  priority
                  quality={75}
                  sizes="50vw"
                  className="object-cover w-full h-auto duration-500 group-hover:scale-110"
                />
                <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-[4px] bg-gradient-to-t from-black/60 to-transparent px-[16px] py-[12px] lg:gap-[6px]">
                  <h3 className="text-[18px] font-medium leading-[18px] md:text-[20px] lg:text-[18px]">
                    {appState.lang === 'mn' ? data.name : data.nameEn}
                  </h3>
                  <p className="text-[14px] leading-[14px] md:text-[16px] lg:w-[80%] lg:text-[14px] lg:leading-[16px]">
                    {data.description}
                  </p>
                </div>
              </div>
            ))
          : null} */}
        {destinations.map((data) => (
          <div
            key={data.id}
            className="group relative h-[150px] w-full cursor-pointer overflow-hidden rounded-[10px]  md:h-[200px] md:rounded-[16px] lg:rounded-[16px]"
          >
            <Image
              // src={data.img}
              src={`https://ihotel.mn/${data.image}`}
              alt="/commonLocs"
              fill={true}
              priority
              quality={75}
              sizes="50vw"
              className="h-auto w-full object-cover duration-500 group-hover:scale-110"
            />
            <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-[4px] bg-gradient-to-t from-black/60 to-transparent px-[16px] py-[12px] lg:gap-[6px]">
              <h3 className="text-[18px] font-medium leading-[18px] md:text-[20px] lg:text-[18px]">
                {appState.lang === 'mn' ? data.name : data.nameEn}
              </h3>
              <p className="text-[14px] leading-[14px] md:text-[16px] lg:w-[80%] lg:text-[14px] lg:leading-[16px]">
                {data.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommonLocation;
