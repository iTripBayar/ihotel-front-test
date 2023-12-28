import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import {
  WifiIcon,
  CarIcon,
  DailyIcon,
  FoodIcon,
  FridgeIcon,
  LangIcon,
  OtherIcon,
  ActivityIcon,
  InfoIcon,
  AdditionalIcon,
  EntertainmentIcon,
  BusinessIcon,
  ShopIcon,
} from './icons';

interface Props {
  data: HotelData.Facilities[];
  internet: number;
}
const Amenity = ({ data, internet }: Props) => {
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  const displayAmenities: HotelData.Facilities[] = [];
  if (internet !== 0) {
    displayAmenities.push({
      createdAt: null,
      facilityCategoryId: 0,
      icon: null,
      id: 22,
      image: null,
      isDefault: 0,
      isFilter: 0,
      isMost: 0,
      mobileIcon: null,
      name: 'Интернэт',
      nameEn: 'Internet',
      syncId: 0,
      updatedAt: null,
    });
  }
  for (let i = 0; i < data.length; i++) {
    displayAmenities.push(data[i]);
  }
  return (
    <div className='flex flex-col gap-[16px] border-t-[1px] border-t-black/[.1] pt-[24px] text-[16px] text-main-text lg:gap-[24px] lg:border-none lg:pt-0'>
      <p className=' text-[20px] font-medium leading-[20px]'>
        {lang === 'en' ? 'Amenities' : 'Уг газарт'}
      </p>
      <div
        className={`flex w-full flex-wrap gap-[12px] 2xs:gap-[8px] sm:gap-[12px] lg:gap-[16px] ${
          open === false
            ? ` overflow-hidden ${
                displayAmenities.length > 3 ? 'h-[180px]' : 'h-[84px]'
              } ${
                displayAmenities.length >= 8 ? 'md:h-[184px]' : 'md:h-[86px]'
              } ${
                displayAmenities.length >= 6
                  ? '2xs:h-[160px] sm:h-[172px] lg:h-[196px]'
                  : '2xs:h-[76px] sm:h-[80px] lg:h-[90px]'
              }`
            : 'h-auto'
        }`}
      >
        {displayAmenities.map((index, i) => (
          <div
            key={i}
            className='flex h-[84px] w-[84px] flex-col justify-between overflow-hidden rounded-[10px] border border-sub-text/[.35] bg-white p-[6px] text-main-text 2xs:h-[76px] 2xs:w-[76px] sm:h-[80px] sm:w-[80px] sm:p-[8px] md:h-[86px]  md:w-[86px] lg:h-[90px] lg:w-[90px]'
          >
            {index.facilityCategoryId === 0 ? (
              <WifiIcon />
            ) : index.facilityCategoryId === 2 ? (
              <ActivityIcon />
            ) : index.facilityCategoryId === 3 ? (
              <FoodIcon />
            ) : index.facilityCategoryId === 4 ? (
              <InfoIcon />
            ) : index.facilityCategoryId === 5 ? (
              <CarIcon />
            ) : index.facilityCategoryId === 7 ? (
              <AdditionalIcon />
            ) : index.facilityCategoryId === 8 ? (
              <EntertainmentIcon />
            ) : index.facilityCategoryId === 9 ? (
              <DailyIcon />
            ) : index.facilityCategoryId === 10 ? (
              <BusinessIcon />
            ) : index.facilityCategoryId === 11 ? (
              <ShopIcon />
            ) : (
              <OtherIcon />
            )}
            <p className='w-full text-[11px] leading-[12px] text-main-text lg:text-[12px] lg:leading-[13px] '>
              {lang === 'en'
                ? index.nameEn
                  ? index.nameEn
                  : index.name
                : index.name}
            </p>
          </div>
        ))}
      </div>
      {/* <div className='flex w-full flex-wrap gap-[12px] 2xs:gap-[8px] sm:gap-[12px] lg:gap-[16px]'>
        {data?.length > 3
          ? data
              .splice(0, open === false ? 4 : data.length)
              .map((index, i) => <div key={i}></div>)
          : sample
              .slice(
                0,
                open === false
                  ? size.width && size?.width < 360
                    ? 3
                    : size.width && size?.width < 450
                    ? 4
                    : size.width && size?.width < 640
                    ? 5
                    : size.width && size?.width < 800
                    ? 6
                    : size.width && size?.width < 850
                    ? 7
                    : size.width && size?.width < 1000
                    ? 8
                    : 10
                  : sample.length,
              )
              .map((index, i) => (
                <div
                  key={i}
                  className='md:w-[86px]lg:h-[90px] flex h-[84px] w-[84px] flex-col justify-between rounded-[10px] border border-sub-text/[.35] bg-white p-[6px] text-main-text 2xs:h-[76px] 2xs:w-[76px] sm:h-[80px] sm:w-[80px]  sm:p-[8px] md:h-[86px] lg:w-[90px]'
                >
                  {index.category === 'wifi' ? (
                    // wifi
                    <WifiIcon />
                  ) : index.category === 'fridge' ? (
                    // fridge
                    <FridgeIcon />
                  ) : index.category === 'food' ? (
                    // food
                    <FoodIcon />
                  ) : index.category === 'drive' ? (
                    // drive
                    <DriveIcon />
                  ) : index.category === 'daily' ? (
                    // daily
                   <DailyIcon />
                  ) : index.category === 'lang' ? (
                    // lang
                    <LangIcon />
                  ) : (
                    <></>
                  )}
                  <p className='text-[11px] leading-[12px] text-main-text lg:text-[12px] lg:leading-[13px]'>
                    {lang === 'en' ? index.nameEn : index.name}
                  </p>
                </div>
              ))}
      </div> */}
      <button
        className='flex items-center gap-[8px] text-[15px] font-medium leading-[15px] text-primary-blue lg:text-[16px] lg:leading-[17px]'
        onClick={() => setOpen(!open)}
      >
        <p>
          {open === false
            ? `${lang === 'en' ? 'More' : 'Дэлгэрэнгүй'}`
            : `${lang === 'en' ? 'Less' : 'Хураангуй'}`}
        </p>
        <svg
          viewBox='0 0 15 9'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className={`max-h-[14px] min-h-[14px] min-w-[14px] max-w-[14px] ${
            open === true && 'rotate-180'
          }`}
        >
          <path d='M1 1L7.5 8L1 1ZM7.5 8L14 1L7.5 8Z' fill='#3C76FE' />
          <path
            d='M1 1L7.5 8L14 1'
            stroke='#3C76FE'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </button>
    </div>
  );
};

export default Amenity;
