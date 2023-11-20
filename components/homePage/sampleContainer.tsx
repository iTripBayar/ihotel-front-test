import Image from 'next/image';
import { useState } from 'react';

interface iProps {
  cap: number;
  title: string;
}

const FeaturedSample = ({ cap, title }: iProps) => {
  const [fav, setFav] = useState(false);

  const hotels = [
    {
      key: 1,
      img: '/samples/hotel1.png',
      name: 'Lorem ipsum dolor sit amet. 1',
      location: 'Lorem 1',
      dist: 'Dorem',
      stat: 'online',
      review: 9.6,
      price: 70000,
    },
    {
      key: 2,
      img: '/samples/hotel2.png',
      name: 'Lorem ipsum dolor sit amet. 2',
      location: 'Lorem 2',
      stat: 'pending',
      review: 9.6,
      price: 70000,
    },
    {
      key: 3,
      img: '/samples/hotel3.png',
      name: 'Lorem ipsum dolor sit amet. 3',
      location: 'Lorem 3',
      stat: 'offline',
      review: 9.6,
      price: 70000,
    },
    {
      key: 4,
      img: '/samples/hotel4.png',
      name: 'Lorem ipsum dolor sit amet. 4',
      location: 'Lorem 4',
      stat: 'data',
      review: 9.6,
      price: 70000,
    },
    {
      key: 5,
      img: '/samples/hotel1.png',
      name: 'Lorem ipsum dolor sit amet. 1',
      location: 'Lorem 1',
      stat: 'online',
      review: 9.6,
      price: 70000,
    },
    {
      key: 6,
      img: '/samples/hotel2.png',
      name: 'Lorem ipsum dolor sit amet. 2',
      location: 'Lorem 2',
      stat: 'pending',
      review: 9.6,
      price: 70000,
    },
  ];
  const adjustedList = [];
  for (let i = 0; i < cap; i++) {
    adjustedList.push(hotels[i]);
  }
  return (
    <div className="w-full px-[16px] pt-[32px] sm:px-[42px] md:px-[72px] lg:px-[150px] lg:py-[0] 2xl:px-[200px]">
      <div className="flex w-full flex-col gap-[24px] border-t-2 border-dashed border-black/[.15] pt-[32px] lg:gap-[32px]">
        <h3 className="text-[20px] font-bold text-main-text">{title}</h3>
        {/* cardContainer */}
        <div
          className={`grid xs:grid-rows-${cap} gap-[32px] sm:grid-cols-2 sm:grid-rows-${
            cap / 2
          } xl:grid-cols-3 xl:grid-rows-${
            cap / 3
          } xl:gap-[24px] 2xl:gap-[48px]`}
        >
          {hotels.map((data, i: number) => (
            <div
              className={`flex w-full flex-col justify-between gap-[16px] overflow-hidden rounded-[20px] shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px] xl:gap-[24px] ${
                data.stat === 'data' ? 'max-h-[350px]' : ''
              }`}
              key={i}
            >
              {/* image */}
              <div className="relative h-[200px] w-full overflow-hidden rounded-[16px] shadow-[0_3px_10px_rgb(0,0,0,0.2)] xs:h-[225px] sm:h-[175px] md:h-[225px] lg:h-[250px] xl:h-[225px]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={fav === false ? 'rgb(255 255 255/50%)' : '#3C76FE'}
                  viewBox="0 0 24 24"
                  strokeWidth={2.2}
                  stroke="currentColor"
                  className={`absolute right-[16px] top-[16px] z-50 h-[24px] w-[24px] text-primary-blue ${
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
                  src={data.img}
                  // src={`https://ihotel.mn/${data.coverPhoto}`}
                  alt="/hotel"
                  fill={true}
                  //   priority
                  quality={75}
                  loading="lazy"
                  sizes="50vw"
                  placeholder="blur"
                  blurDataURL={data.img}
                  className="h-auto w-full select-none object-cover duration-700 hover:scale-110"
                  draggable={false}
                />
              </div>
              {/* bottom section */}
              <div
                className={`flex w-full flex-col gap-[12px] pl-[14px] ${
                  data.stat === 'data' ? 'opacity-50' : ''
                }`}
              >
                {/* name & location */}
                <div className="flex w-full flex-col gap-[12px] pr-[14px]">
                  <p
                    className={`text-[16px] font-medium leading-[16px] text-main-text 2xs:text-[18px] 2xs:leading-[18px] ${
                      data.name.length > 27 ? 'xl:text-[14px]' : ''
                    }`}
                  >
                    {data.name}
                  </p>
                  <p className="text-[12px] leading-[12px] text-sub-text/60 2xs:text-[14px] 2xs:leading-[14px]">
                    {data.dist}
                    ,&nbsp;
                    {data.location}
                  </p>
                </div>
                {/* review & stat */}
                <div
                  className={`relative flex w-full gap-[12px] pr-[8px] font-medium text-white sm:gap-[8px] ${
                    data.stat === 'data'
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
                    <p>{data.review}</p>
                  </div>
                  {/* stat */}
                  {data.stat !== 'data' ? (
                    <div
                      className={`flex h-[31px] items-center justify-center gap-[4px] rounded-[8px] text-center ${
                        data.stat === 'online'
                          ? 'bg-main-online px-[16px] text-[14px] sm:text-[11px] sm:leading-[12px] md:text-[14px] md:leading-[14px]'
                          : data.stat === 'pending'
                          ? 'bg-main-pending px-[6px] text-[11px] leading-[11px] text-main-text 2xs:px-[8px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[4px] sm:text-[10px] sm:leading-[10px] md:px-[8px] md:text-[14px] md:leading-[14px]'
                          : 'bg-main-offline px-[6px] text-[11px] leading-[11px] 2xs:px-[12px] 2xs:text-[12px] 2xs:leading-[12px] sm:px-[4px] sm:text-[10px] sm:leading-[10px] md:px-[4px] md:text-[14px] md:leading-[14px]'
                      }`}
                    >
                      <p>
                        {data.stat === 'online'
                          ? 'Шууд баталгаажна'
                          : data.stat === 'pending'
                          ? 'Баталгаажих хугацаа: '
                          : data.stat === 'offline'
                          ? 'Онлайн захиалга боломжгүй'
                          : ''}
                        {data.stat === 'pending' ? (
                          <span className="text-[14px] font-bold sm:text-[11px] md:text-[14px]">
                            1-3 цаг
                          </span>
                        ) : null}
                      </p>
                    </div>
                  ) : (
                    <div className="self-end">
                      <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                        {data.price
                          ? data.price.toLocaleString()
                          : (70000).toLocaleString()}
                        {'₮'}
                        <span className="text-[14px] text-sub-text/75">
                          {' '}
                          / {'хоног'}
                        </span>
                      </p>
                    </div>
                  )}
                </div>
                {/* price & orderBtn */}
                {data.stat !== 'data' ? (
                  <div
                    className={`flex items-center justify-between ${
                      data.stat === 'data' ? 'h-0' : ''
                    }`}
                  >
                    <p className="text-[16px] font-bold text-main-text xs:text-[18px] sm:text-[15px] md:text-[20px] lg:text-[20px]">
                      {/* {data.includedPrice ? data.includedPrice : 70000} */}
                      {data.price
                        ? data.price.toLocaleString()
                        : (70000).toLocaleString()}
                      {' ₮'}
                      <span className="text-[12px] text-sub-text/75 xs:text-[14px] sm:text-[11px] md:text-[14px]">
                        / {'хоног'}
                      </span>
                    </p>
                    <div
                      className={`m-0 flex items-center justify-center gap-[4px] self-end rounded-tl-[20px] bg-primary-blue py-[10px] text-[12px] font-medium text-white xs:text-[14px] sm:text-[13px] md:text-[14px] lg:py-[8px] ${
                        data.stat === 'offline'
                          ? 'px-[18px] 2xs:px-[24px] lg:px-[16px]'
                          : 'px-[12px] 2xs:px-[16px] sm:px-[10px] md:px-[20px]'
                      }`}
                    >
                      <p>{data.stat === 'offline' ? 'Харах' : 'Захиалах'}</p>
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
          ))}
        </div>
        {cap !== 3 ? (
          <div className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white">
            <p className="flex gap-[4px]">
              Цааш үзэх <span>(100+)</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default FeaturedSample;
