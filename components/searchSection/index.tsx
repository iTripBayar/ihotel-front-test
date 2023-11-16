import React from 'react';
import SearchBox from './searchBox';
import OnlineToggle from './onlineToggle';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface iProps {
  hotelData: any[];
  placesData: any[];
  campsData: any[];
  destData: any[];
  ver: string;
}

const SearchSection = ({
  hotelData,
  placesData,
  campsData,
  destData,
  ver,
}: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const toggle = searchParams.get('toggle');
  const searchValue = searchParams.get('searchValue');
  const type = searchParams.get('type');
  const filter = searchParams.get('filter');

  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  // console.log(`${month}/${date}/${year}`);

  return (
    <div
      className={`flex w-full items-center ${
        ver === 'normal'
          ? 'px-[16px] 2xs:px-[24px] sm:px-[50px] md:px-[55px] lg:px-[150px] xl:px-[200px]'
          : ver === 'headerSearch'
          ? '2xs-[24px] flex-col px-[16px] sm:px-[50px] md:px-[72px]'
          : ver === 'search'
          ? 'justify-center px-0'
          : ver === 'hotel'
          ? 'flex justify-center'
          : ''
      }`}
    >
      {ver !== 'hotel' ? (
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
          />
          <OnlineToggle ver={ver} />
          {filter !== 'mobile' ? (
            <Link
              href={{
                pathname: '/search',
                query: {
                  lang: lang,
                  searchValue: searchValue,
                  toggle: toggle,
                  type: type,
                  filter: filter,
                },
              }}
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
              <p>{lang === 'en' ? 'search' : 'хайх'}</p>
            </Link>
          ) : null}
        </div>
      ) : null}
      {ver === 'hotel' ? (
        <div className="flex gap-[24px]">
          <div className="hidden lg:flex">
            <SearchBox
              hotelData={hotelData}
              placesData={placesData}
              campsData={campsData}
              destData={destData}
              ver={ver}
            />
          </div>
          <div className="flex h-[36px] items-center justify-center gap-[12px] rounded-full bg-white px-[8px] text-[15px] font-medium leading-[1px] text-primary-blue 2xs:px-[16px] xl:min-w-[250px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
              />
            </svg>
            <p>
              {`${month}/${date}/${year}`} - {`${month}/${date + 1}/${year}`}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchSection;
