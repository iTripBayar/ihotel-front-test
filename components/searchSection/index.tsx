import React from 'react';
import { useAppCtx } from '@/utils/app';
import SearchBox from './searchBox';
import OnlineToggle from './onlineToggle';

interface iProps {
  hotelData: any[];
  placesData: any[];
  campsData: any[];
  destData: any[];
  ver: string;
  map: string;
}

const SearchSection = ({
  hotelData,
  placesData,
  campsData,
  destData,
  ver,
  map,
}: iProps) => {
  const { appState } = useAppCtx();
  return (
    //
    <div
      className={`${
        ver === 'normal'
          ? 'px-[16px] 2xs:px-[24px] sm:px-[50px] lg:px-[150px] xl:px-[200px]'
          : ver === 'search'
          ? ' 2xl:px-[200px]] px-[16px] pt-[74px] sm:px-[42px] md:px-[72px] lg:px-[150px]'
          : ''
      }`}
    >
      <div
        className={`${
          ver === 'normal'
            ? '  flex w-full flex-col justify-between gap-[12px] rounded-[8px] bg-black/[.05] p-[10px] text-[12px] lg:flex-row lg:text-[14px]'
            : ver !== 'search'
            ? 'flex h-[200px] w-full flex-col gap-[16px] px-[16px] '
            : 'flex w-full flex-col gap-[16px] '
        }`}
      >
        {/* search */}
        <SearchBox
          hotelData={hotelData}
          placesData={placesData}
          campsData={campsData}
          destData={destData}
          ver={ver}
        />
        {/* online toggle */}
        <OnlineToggle ver={ver} />
        {/* search Btn */}
        <div
          className={`border-black/25px-[12px] flex h-[46px] w-full items-center justify-center gap-[0px] rounded-[8px] border bg-primary-blue text-white lg:w-[175px] xl:w-[225px] ${
            ver === 'search' ? 'max-w-[130px] self-center rounded-full' : ''
          } ${map === 'open' ? 'hidden' : ''}`}
        >
          <p className="text-[16px] font-normal uppercase">
            {appState.lang === 'mn' ? 'Хайх' : 'Search'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
