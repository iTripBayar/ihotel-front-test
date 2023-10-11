'use client';
import { useEffect, useState, useRef } from 'react';
import { Switch } from '@headlessui/react';
import { Combobox } from '@headlessui/react';
import searchData from '../../test/data';

const Search = () => {
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
  const [enabled, setEnabled] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [query, setQuery] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredDataValue =
    query === ''
      ? searchData
      : searchData.filter((searchData) => {
          return searchData.data.toLowerCase().includes(query.toLowerCase());
        });
  // const inputRef = useRef(null);

  // const handleInputChange = (e: any) => {
  //   const inputValue = e.target.value;
  //   setSearchValue(inputValue);
  // };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % suggestion.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="  px-[16px] sm:px-[50px] md:px-[100px] lg:my-[32px] xl:px-[150px] 2xl:px-[200px]">
      <div className="flex w-full flex-col gap-[10px] rounded-[8px] bg-main-gray p-[10px] text-[12px] lg:flex-row lg:text-[14px]">
        {/* search */}
        <div
          className={`relative grid w-full grid-rows-1 `}
          onClick={() => inputRef.current?.focus()}
        >
          <div className="relative flex h-[46px] w-full items-center justify-start gap-[10px] rounded-[8px] border border-black/20 bg-white px-[12px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-[22px] w-[22px] text-primary-blue"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <div
              className="relative flex w-full items-center justify-start gap-[4px]"
              ref={searchRef}
            >
              <input
                className={`h-[20px] w-[144px] border-transparent px-0 text-[14px] text-sub-text/75 placeholder-sub-text/75 outline-none focus:border-transparent focus:ring-0 ${
                  query !== '' ? 'w-full' : null
                }`}
                placeholder="Хайх газар оруулах"
                type="text"
                onChange={(event) => setQuery(event.target.value)}
                value={query}
                ref={inputRef}
              />
              {query === '' ? (
                <p className="text-[14px] text-main-text">
                  "{suggestion[currentIndex].mn}"
                </p>
              ) : null}
            </div>
          </div>
          {/* search Options (ComboBox)*/}
          {query !== '' ? (
            <div
              className={`flex h-[150px] w-full flex-col justify-start gap-[12px] overflow-scroll rounded-[8px] border border-black/20 bg-white px-[12px] text-[14px] text-main-text md:grid md:grid-cols-2 md:grid-rows-[auto] md:gap-[24px] md:px-[20px] lg:absolute lg:top-[60px] lg:z-50 lg:grid-rows-[auto] lg:max-w-[${searchRef.current?.clientWidth}px]`}
            >
              {filteredDataValue.map((data) => (
                <div
                  key={data.data}
                  onClick={() => setQuery(data.data)}
                  className="flex max-h-[50px]  min-h-[49px] cursor-pointer items-center justify-start gap-[24px] border-b-2 border-dashed border-black/[.15]"
                >
                  {data.type === 'location' ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-[22px] w-[22px] text-primary-blue"
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
                      className="h-[22px] w-[22px] text-primary-blue"
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
                      className="h-[22px] w-[22px] text-primary-blue"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                      />
                    </svg>
                  )}
                  {data.data}
                </div>
              ))}
            </div>
          ) : null}
        </div>
        {/* online */}
        <div className="flex h-[46px] w-full items-center justify-start gap-[10px] rounded-[8px] border border-black/20 bg-white px-[12px] text-[14px] lg:w-[600px]">
          <svg
            fill="none"
            viewBox="0 0 24 24"
            className="h-[24px] w-[24px] text-main-online"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m12 0c-5.00156 0-9 3.99844-9 9 0 1.7297.51563 3.0656 1.41094 4.4203l6.64216 10.0781c.2016.3047.5485.5016.9469.5016s.75-.2016.9469-.5016l6.6422-10.0781c.8953-1.3547 1.4109-2.6906 1.4109-4.4203 0-5.00156-3.9984-9-9-9zm0 14.376c-2.76094 0-5.388-2.6197-5.388-5.38537 0-2.76563 2.62706-5.39063 5.388-5.39063 2.7609 0 5.388 2.625 5.388 5.39063 0 2.76567-2.6271 5.38537-5.388 5.38537z"
              fill="#0fbb50"
            />
            <path
              d="m14.5781 7.21875-3.4687 3.46875-1.7344-1.73437"
              stroke="#0fbb50"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
          <div className="flex w-full items-center justify-between">
            <p className="text-main-text">Шууд баталгаажих газрууд</p>
            <Switch
              checked={enabled}
              onChange={setEnabled}
              className={`${
                enabled ? 'bg-main-online' : ' bg-black/[.03]'
              } relative  inline-flex h-[24px] w-[44px] items-center rounded-full border border-black/10`}
            >
              {/* <span className="sr-only">Enable notifications</span> */}
              <div
                className={`${
                  enabled
                    ? 'absolute left-[6px] h-[10px] w-[10px] rounded-full border border-white bg-white/[0.1] shadow-[inset_0_-2px_2px_rgba(0,0,0,0.15)]'
                    : 'absolute right-[6px] h-[4px] w-[10px] rounded-full bg-white shadow-[inset_0_-2px_2px_rgba(0,0,0,0.15)]'
                }`}
              ></div>
              <span
                className={`${
                  enabled
                    ? 'translate-x-[22px] rotate-[-90deg]'
                    : 'translate-x-1 rotate-90 '
                } relative inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-[inset_0_-2px_6px_rgba(0,0,0,0.25)] transition`}
              />
            </Switch>
          </div>
        </div>
        {/* search btn */}
        <div className="border-black/25px-[12px] flex h-[46px] w-full items-center justify-center gap-[0px] rounded-[8px] border bg-primary-blue text-white lg:w-[250px]">
          <p className="text-[16px] font-normal uppercase">Хайх</p>
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

export default Search;
