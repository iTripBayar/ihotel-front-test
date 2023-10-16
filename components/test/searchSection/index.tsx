import React from 'react';
import { useAppCtx } from '@/utils/app';
import SearchBox from './searchBox';
import OnlineToggle from './onlineToggle';

interface iProps {
  hotelData: any[];
  placesData: any[];
  campsData: any[];
  destData: any[];
}

const SearchSection = ({
  hotelData,
  placesData,
  campsData,
  destData,
}: iProps) => {
  const { appState } = useAppCtx();
  return (
    <div className="  px-[16px] 2xs:px-[24px] sm:px-[50px] md:px-[100px] lg:px-[150px] xl:px-[200px]">
      <div className="  flex w-full flex-col justify-between gap-[12px] rounded-[8px] bg-black/[.05] p-[10px] text-[12px] lg:flex-row lg:text-[14px]">
        {/* search */}
        <SearchBox
          hotelData={hotelData}
          placesData={placesData}
          campsData={campsData}
          destData={destData}
          ver={'normal'}
        />
        {/* online toggle */}
        <OnlineToggle ver={'normal'} />
        {/* search Btn */}
        <div className="border-black/25px-[12px] flex h-[46px] w-full items-center justify-center gap-[0px] rounded-[8px] border bg-primary-blue text-white lg:w-[175px] xl:w-[225px]">
          <p className="text-[16px] font-normal uppercase">
            {appState.lang === 'mn' ? 'Хайх' : 'Search'}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 1 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="h-[14px] w-[14px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
