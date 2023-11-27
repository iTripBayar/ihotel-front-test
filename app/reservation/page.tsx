'use client'
import HeaderVariants from '@/components/common/headerVariants';
import { fetchDataSearch } from '@/utils';
import { useRequest } from 'ahooks';
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const ReservationPage = ({
  searchParams,
}: {
  searchParams: { name: string; slug: string; lang: string };
}) => {
  //   const res = await fetch(
  //     `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`,
  //     { cache: 'no-store' },
  //     // {next: {revalidate: 10}}
  //   );
  //   const data = await res.json();
const { data } = useRequest(() => {
  return fetchDataSearch();
});

  const sliderRef = React.useRef<Slider>(null);
  const settings = {
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 3000,

    cssEase: 'fade',
  };


  const test = [
    {
      id: 'Тэрэлж',
      mn: 'Тэрэлж',
      en: 'Terelj',
      delay: 0,
    },
    {
      id: 'Улаанбаатар',
      mn: 'Улаанбаатар',
      en: 'Ulaanbaatar',
      delay: 3000,
    },
    {
      id: 'Хөвсгөл',
      mn: 'Хөвсгөл',
      en: 'Khuvsgul',
      delay: 6000,
    },
  ];

// console.log(data)
  return (
    <div>
      {/* <HeaderVariants
        ver={'reservation'}
        hotelData={[]}
        placesData={[]}
        campsData={[]}
        destData={[]}
      /> */}
      a
      <div className='mb-[200px] max-w-[120px] h-[200px]'>
        <Slider {...settings} ref={sliderRef}>
          {test.map((index, i) => (
            <p
              key={i}
              className={` text-[12px] w-full leading-[12px] 2xs:text-[13px] 2xs:leading-[13px] sm:text-[14px] sm:leading-[14px] lg:text-[12px] lg:leading-[12px] xl:text-[14px] xl:leading-[14px]`}
            >
              &ldquo;
              {searchParams.lang === 'en' ? index.en : index.mn}
              &rdquo;
            </p>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default ReservationPage;
