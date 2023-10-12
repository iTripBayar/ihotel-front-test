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

const CommonLocation = () => {
  const { appState } = useAppCtx();

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

  return (
    <div className="flex w-full flex-col gap-[20px]">
      <Slider {...settings} ref={sliderRef}>
        {categories.map((data) => (
          <div
            className="relative h-[150px] w-full overflow-hidden rounded-[10px] text-center text-white xs:h-[200px] md:h-[275px] lg:h-[350px] lg:rounded-[20px]"
            key={data.key}
          >
            <Image
              src={data.img}
              alt="/commonLocs"
              fill={true}
              priority
              quality={75}
              sizes="100vw"
              className=" h-auto w-full object-cover"
            />
            <div className="absolute bottom-0 z-[1] flex h-[50px] w-full flex-col items-center justify-center gap-[2px] bg-black/50 md:h-[75px] md:gap-[4px]">
              <h3 className="text-[16px] font-medium leading-[14px] md:text-[18px] md:leading-[18px]">
                {appState.lang === 'mn' ? data.title : data.titleEn}
              </h3>
              <p className="text-[12px] md:text-[14px]">
                {appState.lang === 'mn' ? data.desc : data.descEn}
              </p>
            </div>
          </div>
        ))}
      </Slider>
      <div className=" grid w-full gap-[20px] px-[24px] text-white sm:px-[68px] md:px-[120px] lg:grid-cols-4 lg:px-[140px] xl:px-[150px] 2xl:px-[200px]">
        {activeIndex == 0
          ? locations.map((data) => (
              <div
                key={data.key}
                className="group relative h-[150px] w-full cursor-pointer overflow-hidden rounded-[10px]  md:h-[200px] md:rounded-[16px] lg:rounded-[16px]"
              >
                <Image
                  src={data.img}
                  alt="/commonLocs"
                  fill={true}
                  priority
                  quality={75}
                  sizes="50vw"
                  className=" h-auto w-full object-cover duration-500 group-hover:scale-110"
                />
                <div className="absolute z-10 flex h-full w-full flex-col items-start justify-end gap-[4px] bg-gradient-to-t from-black/60 to-transparent px-[16px] py-[12px] lg:gap-[6px]">
                  <h3 className="text-[18px] font-medium leading-[18px] md:text-[20px] lg:text-[18px]">
                    {data.title}
                  </h3>
                  <p className="text-[14px] leading-[14px] md:text-[16px] lg:w-[80%] lg:text-[14px] lg:leading-[16px]">
                    {data.desc}
                  </p>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default CommonLocation;
