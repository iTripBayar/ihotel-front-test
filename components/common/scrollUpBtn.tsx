'use client';
import React, { useRef } from 'react';
import Image from 'next/image';
import { useAppCtx } from '@/utils/app';
import { Lang } from '@/utils/app';

interface iProps {
  ver: string;
}

const ScrollUpBtn = ({ ver }: iProps) => {
  const { appState, dispatch } = useAppCtx();
  const btnRef = useRef<HTMLDivElement>(null);
  const handleScrollToTop = () => {
    btnRef.current?.classList.add('animate-bounce');
    setTimeout(() => {
      btnRef.current?.classList.remove('animate-bounce');
    }, 1000);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scroll behavior
    });
  };

  const handleDay = (type: Lang) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: {
        lang: type,
      },
    });
  };

  return (
    <div
      className={` animate-fade  fixed bottom-[5%] right-[4%] z-[899] flex flex-col items-stretch gap-[16px] text-white ${
        ver !== 'fixed' ? 'hidden' : ''
      }`}
    >
      <div
        className="flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue md:h-[45px] md:w-[45px]"
        onClick={() => {
          if (appState.lang === 'mn') {
            handleDay('en');
          } else {
            handleDay('mn');
          }
          console.log(appState);
        }}
      >
        <Image
          src={
            appState.lang === 'mn'
              ? '/images/uk-flag.png'
              : '/images/mongolian-flag.png'
          }
          alt="/lang"
          width={28}
          height={28}
          priority
          quality={100}
          sizes="20vw"
          className="object-fit max-h-[28px] max-w-[28px] cursor-pointer"
        />
      </div>
      <div
        className="relative flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue md:h-[45px] md:w-[45px]"
        onClick={handleScrollToTop}
        ref={btnRef}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.75}
          stroke="currentColor"
          className="mb-[1px] h-[28px] w-[28px] md:h-[30px] md:w-[30px]"
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

export default ScrollUpBtn;
