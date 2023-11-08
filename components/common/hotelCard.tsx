import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type iProps = {
  data: any;
  fromMap: boolean;
};

const HotelCard = ({ data, fromMap }: iProps) => {
  const [fav, setFav] = useState(false);
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  let stat = '';
  if (data.isOnline == 1 && data.isOffline == 0) {
    stat = 'online';
  } else if (data.isOnline == 0 && data.isOffline == 0) {
    stat = 'pending';
  } else if (data.isOnline == 0 && data.isOffline == 1 && data.phone != null) {
    stat = 'offline';
  } else if (data.isOnline == 0 && data.isOffline == 1 && data.phone == null) {
    stat = 'data';
  }

  // const handleHotelSelect = (hotel: string) => {
  //   // const newLanguage = state.language === 'mn' ? 'en' : 'mn';
  //   dispatch({ type: 'SET_HOTEL', payload: hotel });
  //   // console.log(state);
  // };
  return (
    <Link
      href={{
        pathname: '/hotel',
        query: { name: data.name, slug: data.slug }, // the data
      }}
      target="blank"
      className={`flex  flex-col justify-between gap-[16px] overflow-hidden rounded-[20px] bg-white shadow-[0px_2px_12px_2px_rgb(0,0,0,0.20)] xl:gap-[20px] ${
        stat === 'data' ? 'max-h-[350px] pb-[10px]' : ''
      } ${fromMap === false ? 'w-full' : 'w-[110%]'} `}
    >
      {/* image */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-[16px] shadow-[0px_0px_12px_2px_rgb(0,0,0,0.15)] xs:h-[225px] sm:h-[175px] md:h-[225px] lg:h-[225px] xl:h-[225px] 2xl:h-[300px]">
        {/* favourites icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={fav === false ? 'rgb(255 255 255/50%)' : '#3C76FE'}
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className={`absolute right-[16px] top-[16px] z-10 h-[24px] w-[24px] text-primary-blue ${
            fav === true ? ' scale-125 duration-500' : ''
          }`}
          onClick={() => {
            setFav(!fav);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
          />
        </svg>
        <Image
          src={
            data.image !== null && data.image !== ''
              ? `https://sandbox.api.myhotel.mn/image?path=${data.image}`
              : '/samples/camp.png'
          }
          alt="/hotel"
          fill={true}
          //   priority
          quality={75}
          loading="lazy"
          sizes="50vw"
          placeholder="blur"
          blurDataURL={
            data.image !== null
              ? `"_next/image/?url=${data.image}"`
              : '/samples/camp.png'
          }
          className="absolute h-auto w-auto select-none object-cover duration-700 hover:scale-110"
          draggable={false}
        />
      </div>
      {/* bottom section */}
      <div
        className={`flex w-full flex-col gap-[12px] pl-[14px] ${
          stat === 'data' ? 'opacity-50' : ''
        }`}
      >
        {/* name & location */}
        <div className="flex w-full flex-col gap-[12px] pr-[14px]">
          <p
            className={`text-[16px] font-medium leading-[16px] text-main-text 2xs:text-[18px] 2xs:leading-[18px] ${
              data.name.length > 27 ? 'xl:text-[14px]' : ''
            }`}
          >
            {lang === 'en' ? data.nameEn : data.name}
          </p>
          <p className="text-[12px] leading-[12px] text-sub-text/60 2xs:text-[14px] 2xs:leading-[14px]">
            {lang === 'en'
              ? data?.district?.international
              : data?.district?.name}
            ,&nbsp;
            {lang === 'en'
              ? data?.province?.name
              : data?.province?.international}
          </p>
        </div>
        {/* review & stat */}
        <div
          className={`relative flex w-full gap-[12px] pr-[8px] font-medium text-white ${
            stat === 'data'
              ? 'justify-between pr-[24px] md:mb-[8px] md:pr-[32px]'
              : 'justify-start'
          }`}
        >
          {/* review */}
          <div className="flex h-[31px] min-w-[40px] items-center justify-center gap-[4px] rounded-[8px] bg-primary-blue text-[12px] 2xs:min-w-[50px] 2xs:text-[14px] sm:min-w-[38px] sm:gap-[2px] sm:text-[12px] md:min-w-[40px] md:text-[14px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 1 24 24"
              strokeWidth={1}
              stroke="white"
              className="h-[12px] w-[12px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
              />
            </svg>
            <p>{data.rating}</p>
          </div>
          {/* stat */}
          {stat !== 'data' ? (
            <div
              className={`flex h-[31px] items-center justify-center gap-[4px] rounded-[8px] text-center ${
                stat === 'online'
                  ? 'bg-main-online px-[16px] text-[14px] sm:text-[11px] sm:leading-[12px] md:text-[14px] md:leading-[14px]'
                  : stat === 'pending'
                  ? 'bg-main-pending px-[6px] text-[11px] leading-[11px] text-main-text 2xs:px-[8px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[2px] sm:text-[10px] sm:leading-[10px] md:px-[8px] md:text-[14px] md:leading-[14px]'
                  : 'bg-main-offline px-[6px] text-[11px] leading-[11px] 2xs:px-[12px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[2px] sm:text-[10px] sm:leading-[10px] md:px-[4px] md:text-[14px] md:leading-[14px]'
              }`}
            >
              {lang === 'en' ? (
                <p>
                  {stat === 'online'
                    ? 'Instant confirmation'
                    : stat === 'pending'
                    ? 'Confirmation delay: '
                    : stat === 'offline'
                    ? 'Booking unavailable'
                    : ''}
                  {stat === 'pending' ? (
                    <span className="text-[14px] font-bold sm:text-[11px] md:text-[14px]">
                      1-3 hours
                    </span>
                  ) : null}
                </p>
              ) : (
                <p>
                  {stat === 'online'
                    ? 'Шууд баталгаажна'
                    : stat === 'pending'
                    ? 'Баталгаажих хугацаа: '
                    : stat === 'offline'
                    ? 'Онлайн захиалга боломжгүй'
                    : ''}
                  {stat === 'pending' ? (
                    <span className="text-[14px] font-bold sm:text-[11px] md:text-[14px]">
                      1-3 цаг
                    </span>
                  ) : null}
                </p>
              )}
            </div>
          ) : (
            // price if stat === 'data'
            <div className="self-end">
              <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                {data.includedPrice
                  ? data.includedPrice.slice(0, 10).toLocaleString()
                  : (70000).toLocaleString()}
                {lang === 'en' ? '$' : '₮'}
                <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                  / {lang === 'en' ? 'day' : 'хоног'}
                </span>
              </p>
            </div>
          )}
        </div>
        {/* price & orderBtn */}
        {stat !== 'data' ? (
          <div
            className={`flex items-center justify-between ${
              stat === 'data' ? 'h-0' : ''
            }`}
          >
            <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
              {data.includedPrice
                ? data.includedPrice.slice(0, 10).toLocaleString()
                : (70000).toLocaleString()}
              {lang === 'en' ? '$' : '₮'}

              <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                / {lang === 'en' ? 'day' : 'хоног'}
              </span>
            </p>
            <div
              className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[10px] text-[12px] font-medium text-white xs:text-[14px] sm:text-[13px] md:text-[14px] lg:py-[8px] ${
                stat === 'offline'
                  ? 'px-[18px] 2xs:px-[24px] lg:px-[16px]'
                  : 'px-[12px] 2xs:px-[16px] sm:px-[10px] md:px-[20px]'
              }`}
            >
              {lang === 'en' ? (
                <p>{stat === 'offline' ? 'View' : 'Order'}</p>
              ) : (
                <p>{stat === 'offline' ? 'Харах' : 'Захиалах'}</p>
              )}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 2 20 20"
                strokeWidth={3}
                stroke="white"
                className="h-[12px] w-[12px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
};

export default HotelCard;
