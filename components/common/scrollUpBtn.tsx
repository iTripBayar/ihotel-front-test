'use client';
import React from 'react';

interface iProps {
  ver: string;
}

const ScrollUpBtn = ({ ver }: iProps) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use smooth scroll behavior
    });
  };
  return (
    <div
      className={`animate-fade fixed bottom-[4%] right-[4%] z-[999] flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white bg-primary-blue text-white md:h-[45px] md:w-[45px]
         ${ver !== 'fixed' ? 'hidden' : ''}`}
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
  );
};

export default ScrollUpBtn;
