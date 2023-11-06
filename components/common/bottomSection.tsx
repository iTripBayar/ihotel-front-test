'use client';
import React, { useRef, useState } from 'react';
import Image from 'next/image';
// import { useAppCtx } from '@/utils/app';
// import { Lang } from '@/utils/app';
import { useAppState } from '@/contexts/appStateContext';

type iProps = {
  ver: string;
  map: string;
  openMap: (e: string) => void;
};

const BottomSection = ({ ver, map, openMap }: iProps) => {
  const { state, dispatch } = useAppState();
  const btnRef = useRef<HTMLDivElement>(null);
  const handleScrollToTop = () => {
    btnRef.current?.classList.add('animate-bounce');
    setTimeout(() => {
      btnRef.current?.classList.remove('animate-bounce');
    }, 1000);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const [delay, setDelay] = useState(false);

  setTimeout(() => {
    setDelay(true);
  }, 1500);

  const handleDay = () => {
    const newLanguage = state.language === 'mn' ? 'en' : 'mn';
    dispatch({ type: 'SET_LANGUAGE', payload: newLanguage });
  };

  return (
    <div
      className={` fixed  z-[899] flex animate-fade  items-stretch gap-[16px] text-white  ${
        ver === 'search'
          ? `bottom-[24px] right-[0%] w-full flex-row justify-between px-[16px] sm:px-[42px] sm:pl-[39px] md:px-[32px] lg:bottom-[12px] ${
              map !== '' ? 'lg:right-[50px]' : ' lg:right-[24px]'
            } lg:w-auto lg:px-0`
          : ver === 'fixed'
          ? 'bottom-[4%] right-[3.4%] flex-col'
          : 'hidden'
      }  `}
    >
      {/* map */}
      {ver === 'search' && map === '' ? (
        <div
          className={`relative flex h-[40px] animate-fade items-center  justify-center gap-[10px] self-end rounded-full border-2 border-white bg-primary-blue px-[8px] text-white duration-700 lg:hidden lg:h-[45px] ${
            delay == true ? 'w-[40px] lg:w-[45px] ' : 'w-[171px]'
          }`}
          onClick={() => openMap('open')}
        >
          <svg
            viewBox="0 0 24 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="max-h-[22px] min-h-[20px] min-w-[22px] max-w-[22px]"
          >
            <path
              d="M15 14H19L22 21H2L5 14H9M13 7C13 7.26522 12.8946 7.51957 12.7071 7.70711C12.5196 7.89464 12.2652 8 12 8C11.7348 8 11.4804 7.89464 11.2929 7.70711C11.1054 7.51957 11 7.26522 11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7ZM6 7C6 12 12 17 12 17C12 17 18 12 18 7C18 3.583 15.314 1 12 1C8.686 1 6 3.583 6 7Z"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
          {delay == false ? (
            <p>{state.language === 'mn' ? 'Газрын зураг' : 'Map'}</p>
          ) : null}
          {delay == true ? (
            <div
              className={`absolute left-[70%] top-0 flex w-[90px] animate-fade items-center justify-center rounded-full bg-primary-blue text-[11px] font-medium  ${
                state.language === 'en' ? 'w-[45px] duration-500' : ''
              }`}
            >
              {state.language === 'mn' ? 'Газрын зураг' : 'Map'}
            </div>
          ) : null}
        </div>
      ) : null}
      {/* right section*/}
      <div
        className={`flex flex-col gap-[16px] ${
          ver === 'search' && map === ''
            ? 'lg:items-end'
            : ver === 'search' && map === 'open'
            ? 'hidden '
            : ''
        }`}
      >
        {/* lang */}
        <div
          className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue"
          onClick={() => {
            handleDay();
            // console.log(state.language);
          }}
        >
          <Image
            src={
              state.language === 'mn'
                ? '/images/uk-flag.png'
                : '/images/mongolian-flag.png'
            }
            alt="/lang"
            width={28}
            height={28}
            priority
            quality={100}
            sizes="20vw"
            className="h-[30px] w-[30px] cursor-pointer object-cover"
          />
        </div>
        {/* map with arrow when closed */}
        {ver === 'search' && map === '' ? (
          <div
            className="hidden h-[40px] min-w-[40px] items-center justify-center gap-[4px] rounded-full border-2 border-white bg-primary-blue px-[12px] lg:flex"
            onClick={() => openMap('open')}
          >
            {/* arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-[16px] w-[16px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
            <svg
              viewBox="0 0 24 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-h-[22px] min-h-[20px] min-w-[22px] max-w-[22px]"
            >
              <path
                d="M15 14H19L22 21H2L5 14H9M13 7C13 7.26522 12.8946 7.51957 12.7071 7.70711C12.5196 7.89464 12.2652 8 12 8C11.7348 8 11.4804 7.89464 11.2929 7.70711C11.1054 7.51957 11 7.26522 11 7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7ZM6 7C6 12 12 17 12 17C12 17 18 12 18 7C18 3.583 15.314 1 12 1C8.686 1 6 3.583 6 7Z"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>
        ) : null}
        {/* scrollToTop btn */}
        {map !== 'open' ? (
          <div
            className={`relative flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue ${
              ver === 'search' ? 'lg:hidden' : ''
            }`}
            onClick={handleScrollToTop}
            ref={btnRef}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.75}
              stroke="currentColor"
              className="mb-[1px] h-[28px] w-[28px] "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 15.75l7.5-7.5 7.5 7.5"
              />
            </svg>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default BottomSection;
