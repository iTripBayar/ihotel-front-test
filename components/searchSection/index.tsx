'use client';
import React from 'react';
import SearchBox from './searchBox';
import OnlineToggle from './onlineToggle';
import { useAppState } from '@/contexts/appStateContext';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

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
  const { state } = useAppState();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');

  return (
    <div
      className={`flex w-full items-center ${
        ver === 'normal'
          ? 'px-[16px] 2xs:px-[24px] sm:px-[50px] md:px-[55px] lg:px-[150px] xl:px-[200px]'
          : ver === 'headerSearch'
          ? '2xs-[24px] flex-col px-[16px] sm:px-[50px] md:px-[72px]'
          : ver === 'search'
          ? 'justify-center px-0'
          : ''
      }`}
    >
      <div
        className={`flex w-full ${
          ver === 'normal'
            ? 'flex-col justify-between gap-[12px] rounded-[8px] bg-black/[.05] p-[10px] text-[12px] lg:flex-row lg:text-[14px]'
            : ver === 'fixed'
            ? 'flex-row gap-[12px] xl:gap-[24px]'
            : ver === 'headerSearch'
            ? 'mt-[74px] flex-col items-center gap-[16px] bg-white'
            : ver === 'search'
            ? 'flex-row justify-center gap-[24px] bg-none xl:gap-[32px]'
            : ''
        }`}
      >
        <SearchBox
          hotelData={hotelData}
          placesData={placesData}
          campsData={campsData}
          destData={destData}
          ver={ver}
          lang={lang === 'en' ? 'en' : 'mn'}
          // searchBoxValue={searchBoxValue}
        />
        <OnlineToggle
          ver={ver}
          // onlineToggleState={onlineToggleState}
        />
        {state.showFilter !== 'mobile' ? (
          <Link
            href={{
              pathname: '/search',
              query: {
                searchValue: state.searchValue,
                toggleState: state.onlineToggle,
                type: '',
              }, // the data
            }}
            // href="/search"
            // data-json={`searchValue: ${searchValue}, toggleState: ${toggleState}`}
            className={`flex cursor-pointer items-center justify-center pt-[2px] font-medium  uppercase lg:max-w-[130px] ${
              ver === 'normal'
                ? 'h-[46px] w-full rounded-[8px] bg-primary-blue text-[16px] leading-[16px] text-white'
                : ver === 'fixed'
                ? 'h-[36px] rounded-full bg-white text-primary-blue lg:min-w-[80px] lg:text-[14px]'
                : ver === 'headerSearch'
                ? 'h-[36px] min-w-[100px] max-w-[130px] rounded-full bg-primary-blue text-[15px] text-white '
                : ver === 'search'
                ? 'h-[36px] rounded-full bg-white text-primary-blue shadow-[0px_0px_12px_2px_rgb(0,0,0,0.25)] lg:min-w-[80px] lg:text-[14px]'
                : ''
            }`}
          >
            {/* <p>{state.language === 'mn' ? 'хайх' : 'search'}</p> */}
            <p>{lang === 'en' ? 'search' : 'хайх'}</p>
          </Link>
        ) : // href={{
        //         pathname: '/hotel',
        //         query: { name: data.name, slug: data.slug }, // the data
        //       }}
        // let toggleState = false;
        // let searchValue = '';
        null}
      </div>
    </div>
  );
};

export default SearchSection;
