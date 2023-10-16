'use client';
import React, { useEffect, useState } from 'react';
import { useAppCtx } from '@/utils/app';

const BottomSection = () => {
  const { appState } = useAppCtx();
  const [delay, setDelay] = useState(false);

  setTimeout(() => {
    setDelay(true);
  }, 1500);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scroll behavior
    });
  };

  return (
    <div className="fixed bottom-[24px] z-[500] flex w-full justify-between px-[16px]">
      <div
        className={`animate-fade relative flex h-[40px] w-[171px] items-center justify-center gap-[10px] rounded-full border-2 border-white bg-primary-blue px-[8px] text-white duration-700 ${
          delay == true ? 'w-[40px]  ' : ''
        }`}
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
            stroke-width="2"
          />
        </svg>
        {delay == false ? (
          <p>{appState.lang === 'mn' ? 'Газрын зураг' : 'Map'}</p>
        ) : null}
        {delay == true ? (
          <div
            className={`animate-fade absolute left-[70%] top-0 flex w-[90px] items-center justify-center rounded-full bg-primary-blue text-[11px] font-medium  ${
              appState.lang === 'en' ? 'w-[45px] duration-500' : ''
            }`}
          >
            {appState.lang === 'mn' ? 'Газрын зураг' : 'Map'}
          </div>
        ) : null}
      </div>
      <div
        className={`animate-fade flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue text-white md:h-[45px] md:w-[45px]
         `}
        onClick={handleScrollToTop}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.75}
          stroke="currentColor"
          className="mb-[2px] h-[28px] w-[28px] md:h-[30px] md:w-[30px]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      </div>
    </div>
  );
};

export default BottomSection;
