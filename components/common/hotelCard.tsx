import React, { useState } from 'react';
import { useAppCtx } from '@/utils/app';
import Image from 'next/image';

type iProps = {
  data: any;
};

const HotelCard = ({ data }: iProps) => {
  //   console.log(data.isOffline);
  //   console.log(
  //     'online->' +
  //       data.isOnline +
  //       ' | offline->' +
  //       data.isOffline +
  //       ' | phone->' +
  //       data.phone,
  //   );
  //   const [stat, setStat] = useState('');
  const { appState } = useAppCtx();
  const [fav, setFav] = useState(false);

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

  // console.log(data);

  return (
    <div
      className={`flex w-full flex-col justify-between gap-[16px] overflow-hidden rounded-[20px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] xl:gap-[24px] ${
        stat === 'data' ? 'max-h-[350px]' : ''
      }`}
    >
      {/* image */}
      <div className="relative h-[200px] w-full overflow-hidden rounded-[16px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] xs:h-[225px] sm:h-[175px] md:h-[225px] lg:h-[225px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={fav === false ? 'rgb(255 255 255/50%)' : '#3C76FE'}
          viewBox="0 0 24 24"
          strokeWidth={2.2}
          stroke="currentColor"
          className="absolute right-[16px] top-[16px] z-50 h-[24px] w-[24px] text-primary-blue"
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
          // src={data.img}
          src={`https://sandbox.api.myhotel.mn/image?path=${data.image}`}
          // src={`https://ihotel.mn/${data.coverPhoto}`}
          alt="/hotel"
          fill={true}
          //   priority
          quality={75}
          loading="lazy"
          sizes="50vw"
          placeholder="blur"
          blurDataURL={`"_next/image/?url=${data.image}"`}
          className="h-auto w-full select-none object-cover duration-700 hover:scale-110"
          draggable={false}
        />
        {/* 
       
        // priority loading="lazy" placeholder="blur" blurDataURL=
        {`"_next/image/?url=${roomBigImg}"`} */}
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
            {appState.lang === 'mn' ? data.name : data.nameEn}
          </p>
          <p className="text-[12px] leading-[12px] text-sub-text/60 2xs:text-[14px] 2xs:leading-[14px]">
            {data.shortAdress
              ? data.shortAdress
              : data.address
              ? data.address.length > 30
                ? data.address.slice(0, 30) + '...'
                : data.address
              : 'Lorem ipsum dolor sit amet consectetur.'}
            {/* {data.address
              ? data.address.length > 60
                ? data.address.slice(0, 60) + '...'
                : data.address
              : 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci, eligendi.'} */}
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
          <div className="flex h-[31px] min-w-[40px] items-center justify-center gap-[4px] rounded-[8px] bg-primary-blue text-[12px] 2xs:min-w-[50px] 2xs:text-[14px]">
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
                  ? 'bg-main-online px-[16px] text-[14px]'
                  : stat === 'pending'
                  ? 'bg-main-pending px-[6px] text-[11px] leading-[11px] text-main-text 2xs:px-[8px] 2xs:text-[12px] 2xs:leading-[12px]'
                  : 'bg-main-offline px-[6px] text-[11px] leading-[11px] 2xs:px-[12px] 2xs:text-[12px] 2xs:leading-[12px]'
              }`}
            >
              {appState.lang === 'mn' ? (
                <p>
                  {stat === 'online'
                    ? 'Шууд баталгаажна'
                    : stat === 'pending'
                    ? 'Баталгаажих хугацаа'
                    : stat === 'offline'
                    ? 'Онлайн захиалга боломжгүй'
                    : ''}
                  {stat === 'pending' ? (
                    <span className="text-[14px] font-bold">1-3 цаг</span>
                  ) : null}
                </p>
              ) : (
                <p>
                  {stat === 'online'
                    ? 'Instant confirmation'
                    : stat === 'pending'
                    ? 'Confirmation delay:'
                    : stat === 'offline'
                    ? 'Booking unavailable'
                    : ''}
                  {stat === 'pending' ? (
                    <span className="text-[14px] font-bold">1-3 hours</span>
                  ) : null}
                </p>
              )}
            </div>
          ) : (
            <div className="self-end">
              <p className="text-[22px] font-bold text-main-text">
                {data.includedPrice ? data.includedPrice : 70000}{' '}
                {appState.lang === 'mn' ? '₮' : '$'}
                <span className="text-[14px] text-sub-text/75">
                  {' '}
                  / {appState.lang === 'mn' ? 'хоног' : 'day'}
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
            <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[20px] lg:text-[20px]">
              {/* {data.includedPrice ? data.includedPrice : 70000} */}
              {data.includedPrice
                ? data.includedPrice.toLocaleString()
                : (70000).toLocaleString()}
              {appState.lang === 'mn' ? ' ₮' : ' $'}
              <span className="text-[12px] text-sub-text/75 xs:text-[14px]">
                / {appState.lang === 'mn' ? 'хоног' : 'day'}
              </span>
            </p>
            <div
              className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[10px] text-[12px] font-medium text-white xs:text-[14px] lg:py-[8px] ${
                stat === 'offline'
                  ? 'px-[18px] 2xs:px-[24px] lg:px-[16px]'
                  : 'px-[12px] 2xs:px-[16px] lg:px-[12px]'
              }`}
            >
              {appState.lang === 'mn' ? (
                <p>{stat === 'offline' ? 'Харах' : 'Захиалах'}</p>
              ) : (
                <p>{stat === 'offline' ? 'View' : 'Order'}</p>
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
    </div>
  );
};

export default HotelCard;
