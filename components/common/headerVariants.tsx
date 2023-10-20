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
      className={`fixed z-[500] flex h-[52px] w-full animate-slide-bottom items-center justify-between gap-[32px] bg-primary-blue px-[16px] text-white 2xs:px-[24px] sm:px-[50px] md:px-[72px]   ${
        ver === 'search'
          ? 'bg-black lg:gap-[4vw] lg:px-[62px] lg:pr-[50px] xl:gap-[5vw] 2xl:gap-[7vw]'
          : 'lg:px-[150px] xl:gap-[50px] xl:px-[200px]'
      }`}
    >
      {/* use ? : to only load one of the images */}
      {/* {ver !== 'default' ? (
       
      ) : (

       
      )} */}
      <div className="relative hidden h-[34px] w-[34px] lg:flex">
        <Image
          src="/favicon-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="object-fit hidden max-h-[34px] max-w-[34px] cursor-pointer lg:flex"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
      <div className="relative h-[34px] w-[114px] lg:hidden">
        <Image
          src="/images/logo-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="object-fit h-auto w-auto cursor-pointer lg:hidden"
          onClick={() => {
            window.location.reload();
          }}
        />
      </div>
      <div className="hidden w-full items-center justify-center gap-[12px] text-[16px] font-medium leading-[16px] lg:flex xl:gap-[24px]">
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
        <div className="absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] animate-burger-top rounded-full bg-white"></div>
        <div className="absolute top-0 h-[2px] w-[24px] animate-burger-top1  rounded-full bg-white"></div>
        <div className="absolute bottom-0 h-[2px] w-[24px] animate-burger-top2  rounded-full bg-white"></div>
      </div>
    </header>
  );
};

export default HeaderVariants;
