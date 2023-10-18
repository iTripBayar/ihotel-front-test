import React, { useState, useRef, useEffect } from 'react';
import { useAppCtx } from '@/utils/app';

interface iProps {
  hotelData: any[];
  placesData: any[];
  campsData: any[];
  destData: any[];
  ver: string;
}

const SearchBox = ({
  hotelData,
  placesData,
  campsData,
  destData,
  ver,
}: iProps) => {
  const [query, setQuery] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  //   let currentIndex = 0;

  const { appState } = useAppCtx();
  const inputRef = useRef<HTMLInputElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);

  const suggestion = [
    {
      id: 'Тэрэлж',
      mn: 'Тэрэлж',
      en: 'Terelj',
    },
    {
      id: 'Улаанбаатар',
      mn: 'Улаанбаатар',
      en: 'Ulaanbaatar',
    },
    {
      id: 'Хөвсгөл',
      mn: 'Хөвсгөл',
      en: 'Khuvsgul',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestion.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const sample = [];

  for (let i = 0; i < hotelData.length; i++) {
    sample.push({
      key: hotelData[i].id,
      name: hotelData[i].name,
      nameEn: hotelData[i].nameEn ? hotelData[i].nameEn : '',
      type: 'hotel',
    });
  }

  for (let i = 0; i < placesData.length; i++) {
    sample.push({
      key: placesData[i].id,
      name: placesData[i].name,
      nameEn: placesData[i].nameEn ? placesData[i].nameEn : '',

      type: 'location',
    });
  }

  for (let i = 0; i < destData.length; i++) {
    sample.push({
      key: destData[i].id,
      name: destData[i].name,
      nameEn: destData[i].nameEn ? destData[i].nameEn : '',

      type: 'location',
    });
  }

  for (let i = 0; i < campsData.length; i++) {
    sample.push({
      key: campsData[i].id,
      name: campsData[i].name,
      nameEn: campsData[i].nameEn ? campsData[i].nameEn : '',
      type: 'smth',
    });
  }

  const filteredDataValue =
    query === ''
      ? sample
      : sample.filter((searchData) => {
          return searchData.name.toLowerCase().includes(query);
        });

  const uniqueData = filteredDataValue.filter(
    (obj, index, self) => index === self.findIndex((o) => o.key === obj.key),
  );

  return (
    <div className="relative flex w-full flex-col gap-[10px] overflow-visible">
      <div
        className={`flex h-[46px] w-full items-center justify-start gap-[2px] rounded-[8px] border border-black/20 bg-white px-[8px] 2xs:gap-[6px] 2xs:px-[12px] lg:min-w-[316px] xl:min-w-[356px] ${
          ver === 'round' ? 'max-h-[36px] overflow-hidden rounded-full' : ''
        }`}
        ref={searchRef}
        onClick={() => {
          inputRef.current?.focus();
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="mr-[4px] max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          className={`border-transparent px-0 text-[12px] text-sub-text/75 placeholder-sub-text/75 focus:border-transparent focus:ring-0 2xs:text-[13px] sm:text-[14px] ${
            query !== '' ? 'w-full' : 'sm::w-[144px] w-[124px] 2xs:w-[134px]'
          }`}
          type="text"
          placeholder={
            appState.lang === 'mn'
              ? 'Хайх газар оруулах'
              : 'Search destinations'
          }
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(false);
          }}
          value={query}
          ref={inputRef}
          onFocus={(e) => e.preventDefault()}
        />
        {query === '' ? (
          <p className="text-[12px] text-main-text 2xs:text-[13px] sm:text-[14px] ">
            &ldquo;
            {appState.lang === 'mn'
              ? suggestion[currentIndex].mn
              : suggestion[currentIndex].en}
            &rdquo;
          </p>
        ) : null}
      </div>
      {query !== '' && selected == false ? (
        <div
          className={` flex h-[150px] w-full flex-col justify-start gap-[12px] overflow-scroll overflow-y-scroll rounded-[8px] border border-black/20 bg-white px-[12px] text-main-text md:grid md:grid-cols-2 md:grid-rows-[auto] md:gap-[24px] md:px-[20px] lg:absolute lg:top-[50px] lg:h-[200px] lg:min-w-[400px] lg:grid-rows-[auto] lg:gap-[16px] lg:px-[10px] xl:gap-[24px] xl:px-[20px] lg:max-w-[${searchRef.current?.clientWidth}px] lg:z-50`}
        >
          {uniqueData.map((data) => (
            <div
              key={data.key}
              onClick={() => {
                setQuery(data.name);
                setSelected(true);
              }}
              className=" flex max-h-[50px]  min-h-[49px] cursor-pointer items-center justify-start gap-[24px] border-b-[1px] border-black/[.1] text-[12px] leading-[12px] sm:text-[14px] sm:leading-[14px] md:text-[12px] md:leading-[12px] lg:gap-[12px] xl:text-[13px] xl:leading-[13px]"
            >
              {data.type === 'location' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              ) : data.type === 'hotel' ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="max-h-[22px] min-h-[22px] min-w-[22px] max-w-[22px] text-primary-blue"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
              )}
              {appState.lang === 'mn' ? data.name : data.nameEn}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default SearchBox;
