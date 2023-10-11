'use client';
import Image from 'next/image';
import { Switch } from '@headlessui/react';
import { useState, useRef } from 'react';
import searchData from '../../test/data';

interface iProps {
  menu: () => void;
  ver: string;
  logIn: () => void;
  signUp: () => void;
}

const Header = ({ menu, ver, logIn, signUp }: iProps) => {
  const [enabled, setEnabled] = useState(false);
  const [query, setQuery] = useState('');

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredDataValue =
    query === ''
      ? searchData
      : searchData.filter((searchData) => {
          return searchData.data.toLowerCase().includes(query.toLowerCase());
        });

  return (
    <header
      className={`fixed z-[500] flex h-[50px] w-full items-center justify-between bg-primary-blue px-[16px] text-[16px] text-white sm:px-[50px] md:px-[100px] lg:static xl:px-[150px] 2xl:px-[200px] ${
        ver == 'fixed' ? 'lg:fixed lg:animate-slide-bottom' : ''
      }`}
    >
      <Image
        src="/images/logo-white.png"
        alt="/logo"
        width={114}
        height={33}
        priority
        quality={100}
        sizes="20vw"
        className={`object-fit h-auto max-w-[114px] cursor-pointer ${
          ver === 'fixed' ? 'lg:hidden' : ''
        }`}
        onClick={() => {
          window.location.reload();
        }}
      />
      <Image
        src="/favicon-white.png"
        alt="/logo"
        width={33}
        height={33}
        priority
        quality={100}
        sizes="20vw"
        className={`object-fit hidden h-auto max-w-[33px] cursor-pointer ${
          ver === 'fixed' ? 'lg:block' : ''
        }`}
        onClick={() => {
          window.location.reload();
        }}
      />
      {/* otherBtns */}
      <div
        className={`hidden items-center gap-[24px] text-[14px] font-[500] lg:flex xl:gap-[32px] xl:text-[16px] ${
          ver === 'fixed' ? 'lg:hidden' : ''
        }`}
      >
        <div
          className="group relative flex h-[32px] cursor-pointer items-center"
          onClick={logIn}
        >
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          Нэвтрэх
        </div>
        <div
          className="group relative flex h-[36px] cursor-pointer items-center"
          onClick={signUp}
        >
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          Бүртгүүлэх
        </div>
        <div className="group relative flex h-[36px] cursor-pointer items-center gap-[4px]">
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 26 26"
            strokeWidth={0}
            stroke="currentColor"
            className="h-[22px] w-[22px]"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
            />
          </svg>
          77279090
        </div>
        <div className="group relative flex h-[36px] cursor-pointer items-center gap-[8px]">
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="h-[22px] w-[22px] rounded-full bg-white/25"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Буудал нэмэх
        </div>
        <div className="group relative flex h-[36px] cursor-pointer items-center gap-[8px]">
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          <Image
            src="/images/uk-flag.png"
            alt="/lang"
            width={22}
            height={22}
            quality={60}
            sizes="10vw"
            className="rounded-full object-cover"
            style={{ maxWidth: '22px', maxHeight: '22px' }}
          />
          EN
        </div>
      </div>
      {/* ver === 'fixed' searchSection */}
      <div
        className={`relative hidden ${
          ver === 'fixed'
            ? 'lg:flex lg:w-[90%] lg:gap-[32px]  lg:px-[50px] lg:text-[14px]'
            : 'hidden'
        }`}
      >
        {/* search */}
        <div
          className="relative flex h-[36px] w-[500px] items-center justify-start gap-[10px] rounded-full border border-black/20 bg-white px-[12px]"
          ref={searchRef}
          onClick={() => inputRef.current?.focus()}
        >
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
          <input
            className="h-[20px] w-full border-transparent text-[14px] text-sub-text/75 placeholder-sub-text/75 outline-none focus:border-transparent focus:ring-0 "
            placeholder="Хайх газар оруулах"
            type="text"
            // className={`h-[20px] w-[144px] border-transparent px-0 text-[14px] text-sub-text/75 placeholder-sub-text/75 outline-none focus:border-transparent focus:ring-0 ${
            //   query !== '' ? 'w-full' : null
            // }`}
            // placeholder="Хайх газар оруулах"
            // type="text"
            onChange={(event) => setQuery(event.target.value)}
            value={query}
            ref={inputRef}
          />
          {query !== '' ? (
            <div
              className={`flex h-[200px] w-full flex-col justify-start gap-[12px] overflow-scroll rounded-[8px] border border-black/20 bg-white px-[12px] text-[14px] text-main-text md:grid md:grid-cols-2 md:grid-rows-[auto] md:gap-[24px] md:px-[20px] lg:absolute lg:left-0 lg:top-[48px] lg:z-50 lg:grid-rows-[auto] lg:max-w-[${searchRef.current?.clientWidth}px]`}
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
        <div className="flex h-[36px] min-w-[320px] items-center justify-start gap-[10px] rounded-full border border-black/20 bg-white px-[12px]">
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
        {/* searchBtn */}
        <div className="border-black/25px-[12px] flex h-[36px] w-[150px] items-center justify-center gap-[0px] rounded-full border bg-white pl-[2px] pt-[2px] text-center text-primary-blue">
          <p className="text-[16px] font-normal uppercase leading-[14px]">
            Хайх
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
      {/* burgerMenu */}
      <div
        className={`block ${ver === 'fixed' ? 'lg:inline-block' : 'lg:hidden'}`}
        onClick={menu}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="h-[24px] w-[24px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
    </header>
  );
};

export default Header;
