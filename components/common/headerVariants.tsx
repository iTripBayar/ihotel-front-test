// import React from 'react';
import { useAppCtx } from '@/utils/app';
import Image from 'next/image';
import { Lang } from '@/utils/app';
import SearchBox from '../searchSection/searchBox';
import OnlineToggle from '../searchSection/onlineToggle';

interface iProps {
  ver: string;
  openMenu: () => void;
  logIn: (e: string) => void;
  phone: string;
  hotelData: any[];
  placesData: any[];
  campsData: any[];
  destData: any[];
}

const HeaderVariants = ({
  ver,
  openMenu,
  logIn,
  phone,
  hotelData,
  placesData,
  campsData,
  destData,
}: iProps) => {
  const { appState, dispatch } = useAppCtx();

  const handleDay = (type: Lang) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: {
        lang: type,
      },
    });
  };

  return (
    <header
      className={`fixed z-[500] flex h-[52px] w-full animate-slide-bottom items-center justify-between gap-[32px] bg-primary-blue px-[16px] text-white 2xs:px-[24px] sm:px-[50px] lg:px-[150px]`}
    >
      {/* use ? : to only load one of the images */}
      {/* {ver !== 'default' ? (
       
      ) : (

       
      )} */}
      <Image
        src="/favicon-white.png"
        alt="/logo"
        width={34}
        height={34}
        priority
        quality={100}
        sizes="20vw"
        className="object-fit hidden max-h-[34px] max-w-[34px] cursor-pointer lg:flex"
        onClick={() => {
          window.location.reload();
        }}
      />
      <Image
        src="/images/logo-white.png"
        alt="/logo"
        width={114}
        height={34}
        priority
        quality={100}
        sizes="20vw"
        className="object-fit max-h-[34px] max-w-[114px] cursor-pointer lg:hidden"
        onClick={() => {
          window.location.reload();
        }}
      />
      <div className="hidden items-center justify-center gap-[12px] text-[16px] font-medium leading-[16px] lg:flex xl:gap-[24px]">
        {/* search */}
        <SearchBox
          hotelData={hotelData}
          placesData={placesData}
          campsData={campsData}
          destData={destData}
          ver="round"
        />
        {/* online toggle */}
        <OnlineToggle ver="round" />
        {/* search Btn */}
        <div className="border-black/25px-[12px] flex h-[36px] w-full items-center justify-center gap-[0px] rounded-full border bg-white pl-[2px] text-primary-blue lg:w-[175px] xl:w-[225px]">
          <p className="text-[13px] font-medium uppercase leading-[13px] xl:text-[14px]">
            {appState.lang === 'mn' ? 'Хайх' : 'Search'}
          </p>
        </div>
      </div>
      {/* <div className="flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-[28px] w-[28px]"
          onClick={openMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div> */}
      <div
        className="relative flex h-[16px] w-[24px] flex-col items-center "
        onClick={openMenu}
      >
        <div className="animate-burger-top absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] rounded-full bg-white"></div>
        <div className="animate-burger-top1 absolute top-0 h-[2px] w-[24px]  rounded-full bg-white"></div>
        <div className="animate-burger-top2 absolute bottom-0 h-[2px] w-[24px]  rounded-full bg-white"></div>
      </div>
    </header>
  );
};

export default HeaderVariants;
