'use client';
import Image from 'next/image';
import React, { useState, useRef } from 'react';

interface iProps {
  open: boolean;
  close: () => void;
  logIn: () => void;
  signUp: () => void;
}

const BurgerMenu = ({ open, close, logIn, signUp }: iProps) => {
  const [closeAnimation, setCloseAnimation] = useState(false);

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement; // Cast event.target to HTMLElement
    // Check if the click target is not the white div
    if (!target.classList.contains('bg-[#181818]')) {
      setCloseAnimation(true);
      setTimeout(() => {
        setCloseAnimation(false);
        close();
      }, 400);
    }
  };

  return (
    <div
      className={` fixed right-0 top-0 z-[999] flex h-screen w-full justify-end bg-black/50 ${
        open === false ? 'hidden' : null
      }`}
      onClick={handleClick}
    >
      {/* <div className=" absolute left-0 top-[50%] h-[100px] w-[100px] bg-green-500">
        <div className="h-[50px] w-[50px] bg-white"></div>
      </div> */}
      <div
        className={`animate-slide-left relative flex h-full w-[210px] flex-col justify-between bg-[#181818] p-[20px] text-[16px] text-white ${
          closeAnimation == true ? 'animate-slide-right' : null
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={3}
          stroke="currentColor"
          className="absolute right-[20px] top-[20px] h-[24px] w-[24px]"
          onClick={() => {
            setCloseAnimation(true);
            setTimeout(() => {
              setCloseAnimation(false);
              close();
            }, 400);
          }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        <div className="flex w-full flex-col gap-[16px] pt-[32px]">
          <div
            className="flex h-[50px] w-full items-center justify-start border-b-2 border-dashed border-white/[.15]"
            onClick={logIn}
          >
            Нэвтрэх
          </div>
          <div
            className="flex h-[50px] w-full items-center justify-start border-b-2 border-dashed border-white/[.15]"
            onClick={signUp}
          >
            Бүртгүүлэх
          </div>
          <div className="flex h-[50px] w-full items-center justify-start border-b-2 border-dashed border-white/[.15]">
            Буудал нэмэх
          </div>
          {/* <div className="flex h-[50px] w-full items-center justify-start border-b-2 border-dashed border-white/[.15]"></div> */}
        </div>
        <div className="flex w-full flex-col gap-[16px]">
          <div className="flex h-[50px] w-full items-center justify-end gap-[8px] border-b-2 border-dashed border-white/[.15]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 2 26 26"
              strokeWidth={2}
              stroke="currentColor"
              className="h-[17px] w-[17px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <span>7727 9090</span>
          </div>
          <div className="flex h-[50px] w-full items-center justify-end gap-[8px] border-b-2 border-dashed border-white/[.15]">
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
      </div>
    </div>
  );
};

export default BurgerMenu;
