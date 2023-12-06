import Image from 'next/image';
import { useState } from 'react';
import { useSearchParams } from 'next/navigation';

const Footer = () => {
  const [open, setOpen] = useState('');
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  return (
    <div className="relative z-[999] flex w-full flex-col bg-footer px-[32px] pt-[32px] text-[14px] text-white sm:px-[42px] md:px-[50px] lg:px-[125px] xl:px-[150px] 2xl:px-[200px]">
      <div className=" md:flex md:flex-row-reverse md:justify-between md:gap-[32px]">
        <div className="md:grid md:w-[70%] md:grid-cols-2 md:justify-between md:pl-[32px]">
          {/* about */}
          <div
            className={`mb-[32px] flex w-full flex-col gap-[24px] overflow-hidden border-b-[1px] border-white/25 md:w-[94%] md:border-none ${
              open === 'about'
                ? 'animate-open md:animate-none'
                : 'h-[45px] animate-close md:h-auto md:animate-none'
            }`}
          >
            <div
              className="flex w-full items-center justify-between font-medium"
              onClick={() => {
                if (open !== 'about') {
                  setOpen('about');
                } else {
                  setOpen('');
                }
              }}
            >
              <h3 className="text-[18px]">
                {/* {state.language === 'mn' ? 'Тухай' : 'About'} */}
                {lang === 'en' ? 'About' : 'Тухай'}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="2 0 20 20"
                strokeWidth={3}
                stroke="currentColor"
                className={`h-[16px] w-[16px] md:hidden ${
                  open === 'about' ? 'rotate-180' : null
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div className="mb-[12px] flex flex-col justify-start gap-[16px] ">
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn' ? 'Бидний тухай' : 'About us'} */}
                {lang === 'en' ? 'About us' : 'Бидний тухай'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn' ? 'Түгээмэл асуулт хариулт' : 'Q&A'} */}
                {lang === 'en' ? 'Q&A' : 'Түгээмэл асуулт хариулт'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn'
                  ? 'Үйлчилгээний нөхцөл'
                  : 'Terms of service'} */}
                {lang === 'en' ? 'Terms of service' : 'Үйлчилгээний нөхцөл'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
            </div>
          </div>
          {/* info */}
          <div
            className={`mb-[32px] flex w-full flex-col gap-[24px] overflow-hidden border-b-[1px] border-white/25 md:w-[94%] md:justify-self-end md:border-none ${
              open === 'info'
                ? 'animate-open md:animate-none'
                : 'h-[45px] animate-close md:h-auto md:animate-none'
            }`}
          >
            <div
              className="flex w-full items-center justify-between font-medium"
              onClick={() => {
                if (open !== 'info') {
                  setOpen('info');
                } else {
                  setOpen('');
                }
              }}
            >
              <h3 className="text-[18px]">
                {/* {state.language === 'mn' ? 'Мэдээлэл' : 'News'} */}
                {lang === 'en' ? 'News' : 'Мэдээлэл'}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="2 0 20 20"
                strokeWidth={3}
                stroke="currentColor"
                className={`h-[16px] w-[16px] md:hidden ${
                  open === 'info' ? 'rotate-180' : null
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div className="mb-[12px] flex flex-col justify-start gap-[16px] ">
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn' ? 'Мэдээ мэдээлэл' : 'Articles'} */}
                {lang === 'en' ? 'Articles' : 'Мэдээ мэдээлэл'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn'
                  ? 'Буудалд зориулсан зөвлөмж'
                  : 'Tips for hotels'} */}
                {lang === 'en'
                  ? 'Tips for hotels'
                  : 'Буудалд зориулсан зөвлөмж'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn'
                  ? 'Аялагчдад зориулсан зөвлөмж'
                  : 'Tips for travelers'} */}
                {lang === 'en'
                  ? 'Tips for travelers'
                  : 'Аялагчдад зориулсан зөвлөмж'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn'
                  ? 'iHotel амжилтын түүх'
                  : "iHotel's success history"} */}
                {lang === 'en'
                  ? "iHotel's success history"
                  : 'iHotel амжилтын түүх'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
            </div>
          </div>
          {/* service */}
          <div
            className={`mb-[32px] flex w-full flex-col gap-[24px] overflow-hidden  border-b-[1px] border-white/25 md:border-none ${
              open === 'service'
                ? 'animate-open md:animate-none'
                : 'h-[45px] animate-close md:h-auto md:animate-none'
            }`}
          >
            <div
              className="flex w-full items-center justify-between font-medium"
              onClick={() => {
                if (open !== 'service') {
                  setOpen('service');
                } else {
                  setOpen('');
                }
              }}
            >
              <h3 className="text-[18px]">
                {/* {state.language === 'mn' ? 'Үйлчилгээ' : 'Services'} */}
                {lang === 'en' ? 'Services' : 'Үйлчилгээ'}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="2 0 20 20"
                strokeWidth={3}
                stroke="currentColor"
                className={`h-[16px] w-[16px] md:hidden ${
                  open === 'service' ? 'rotate-180' : null
                }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </div>
            <div className="mb-[12px] flex flex-col justify-start gap-[16px] ">
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn'
                  ? 'Өрөөний удирдлагын систем'
                  : 'Room management system'} */}
                {lang === 'en'
                  ? 'Room management system'
                  : 'Өрөөний удирдлагын систем'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn' ? 'Веб сайт бүтээх' : 'Web service'} */}
                {lang === 'en' ? 'Web service' : 'Веб сайт бүтээх'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
              <a href="/" className="underline-0 group relative text-white">
                {/* {state.language === 'mn' ? 'Тусламж' : 'Support'} */}
                {lang === 'en' ? 'Support' : 'Тусламж'}

                <span className="ease absolute bottom-0 left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-1/2"></span>
              </a>
            </div>
          </div>
        </div>
        {/* contact */}
        <div className="mb-[32px] flex w-full gap-[16px] md:w-[30%] md:flex-col md:items-start md:justify-start md:gap-[32px] md:border-r-[1px] md:border-white/25 md:pb-[16px] lg:justify-between lg:gap-[24px]">
          <div className="relative h-[97px] w-[88px] overflow-visible md:h-[125px] md:w-[125px] lg:h-[165px] lg:w-[165px]">
            <Image
              src="/favicon-white.png"
              alt="/logo"
              width={320}
              height={361}
              sizes="50vw"
              className="h-auto w-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-start gap-[16px] text-[13px] md:justify-self-start lg:justify-self-end lg:pl-[28px] lg:text-[14px] xl:text-[16px]">
            <p>(+976)-7727 9090</p>
            <p>reservations@ihotel.mn</p>
            <p>info@ihotel.mn</p>
            <div className="flex w-full justify-between gap-[8px]">
              {/* facebook */}
              <a
                href="https://www.facebook.com/ihotel.mn/"
                target="blank"
                className="group relative"
              >
                <svg
                  className="h-[16px] w-[16px]"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.66667 9.2H9.04762L10 6H6.66667V4.4C6.66667 3.576 6.66667 2.8 8.57143 2.8H10V0.112C9.68952 0.0776001 8.51714 0 7.27905 0C4.69333 0 2.85714 1.3256 2.85714 3.76V6H0V9.2H2.85714V16H6.66667V9.2Z"
                    fill="white"
                  />
                </svg>
                <span className="ease absolute bottom-[-8px] left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
              </a>
              {/* instagram */}
              <a
                href="https://www.instagram.com/ihotel.mn/?hl=en"
                target="blank"
                className="group relative"
              >
                <svg
                  className="h-[16px] w-[16px]"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1150_58905)">
                    <path
                      d="M7.99967 5.3335C7.29243 5.3335 6.61415 5.61445 6.11406 6.11454C5.61396 6.61464 5.33301 7.29292 5.33301 8.00016C5.33301 8.70741 5.61396
                       9.38568 6.11406 9.88578C6.61415 10.3859 7.29243 10.6668 7.99967 10.6668C8.70692 10.6668 9.3852 10.3859 9.88529 9.88578C10.3854 9.38568
                        10.6663 8.70741 10.6663 8.00016C10.6663 7.29292 10.3854 6.61464 9.88529 6.11454C9.3852 5.61445 8.70692 5.3335 7.99967 5.3335Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.8 0C3.52696 0 2.30606 0.505713 1.40589 1.40589C0.505713 2.30606 0 3.52696 0 4.8L0 11.2C0 12.473 0.505713 13.6939 1.40589
                       14.5941C2.30606 15.4943 3.52696 16 4.8 16H11.2C12.473 16 13.6939 15.4943 14.5941 14.5941C15.4943 13.6939 16 12.473 16 11.2V4.8C16
                        3.52696 15.4943 2.30606 14.5941 1.40589C13.6939 0.505713 12.473 0 11.2 0L4.8 0ZM4.26667 8C4.26667 7.00986 4.66 6.06027 5.36014
                         5.36014C6.06027 4.66 7.00986 4.26667 8 4.26667C8.99014 4.26667 9.93973 4.66 10.6399 5.36014C11.34 6.06027 11.7333 7.00986
                          11.7333 8C11.7333 8.99014 11.34 9.93973 10.6399 10.6399C9.93973 11.34 8.99014 11.7333 8 11.7333C7.00986 11.7333 6.06027
                           11.34 5.36014 10.6399C4.66 9.93973 4.26667 8.99014 4.26667 8ZM11.7333 4.26667H12.8V3.2H11.7333V4.26667Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1150_58905">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
                <span className="ease absolute bottom-[-8px] left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
              </a>
              {/* youtube */}
              <a
                href="https://www.youtube.com/channel/UCSCwq_vU3Xsj9h2e_qH1Pkg"
                target="blank"
                className="group relative"
              >
                <svg
                  className="h-[16px] w-[20px]"
                  viewBox="0 0 20 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 11.4286L13.19 8L8 4.57143V11.4286ZM19.56 2.48C19.69 3.01714 19.78 3.73714 19.84 4.65143C19.91 5.56571 19.94 6.35429 19.94 7.04L20 8C20 10.5029 19.84 12.3429 19.56 13.52C19.31 14.5486 18.73 15.2114 17.83 15.4971C17.36 15.6457 16.5 15.7486 15.18 15.8171C13.88 15.8971 12.69 15.9314 11.59 15.9314L10 16C5.81 16 3.2 15.8171 2.17 15.4971C1.27 15.2114 0.69 14.5486 0.44 13.52C0.31 12.9829 0.22 12.2629 0.16 11.3486C0.0900001 10.4343 0.0599999 9.64571 0.0599999 8.96L0 8C0 5.49714 0.16 3.65714 0.44 2.48C0.69 1.45143 1.27 0.788572 2.17 0.502857C2.64 0.354286 3.5 0.251428 4.82 0.182857C6.12 0.102857 7.31 0.0685714 8.41 0.0685714L10 0C14.19 0 16.8 0.182857 17.83 0.502857C18.73 0.788572 19.31 1.45143 19.56 2.48Z"
                    fill="white"
                  />
                </svg>
                <span className="ease absolute bottom-[-8px] left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
              </a>
              {/* linkedIn */}
              <a
                href="https://www.linkedin.com/company/ihotelmn/"
                target="blank"
                className="group relative"
              >
                <svg
                  className="h-[16px] w-[16px]"
                  viewBox="0 0 15 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.7 0C1.24913 0 0.81673 0.186085 0.497919 0.517318C0.179107 0.848551 0 1.2978 0 1.76623C0 2.23467 0.179107
                     2.68392 0.497919 3.01515C0.81673 3.34638 1.24913 3.53247 1.7 3.53247C2.15087 3.53247 2.58327 3.34638 2.90208
                      3.01515C3.22089 2.68392 3.4 2.23467 3.4 1.76623C3.4 1.2978 3.22089 0.848551 2.90208 0.517318C2.58327 0.186085
                       2.15087 0 1.7 0ZM0.1 4.98701C0.0734784 4.98701 0.0480429 4.99796 0.0292892 5.01744C0.0105356 5.03693 0 5.06335
                        0 5.09091V15.8961C0 15.9535 0.0448 16 0.1 16H3.3C3.32652 16 3.35196 15.9891 3.37071 15.9696C3.38946 15.9501 
                        3.4 15.9237 3.4 15.8961V5.09091C3.4 5.06335 3.38946 5.03693 3.37071 5.01744C3.35196 4.99796 3.32652 4.98701 
                        3.3 4.98701H0.1ZM5.3 4.98701C5.27348 4.98701 5.24804 4.99796 5.22929 5.01744C5.21054 5.03693 5.2 5.06335 5.2 
                        5.09091V15.8961C5.2 15.9535 5.2448 16 5.3 16H8.5C8.52652 16 8.55196 15.9891 8.57071 15.9696C8.58946 15.9501 
                        8.6 15.9237 8.6 15.8961V10.0779C8.6 9.6646 8.75804 9.2682 9.03934 8.97594C9.32064 8.68367 9.70218 8.51948 
                        10.1 8.51948C10.4978 8.51948 10.8794 8.68367 11.1607 8.97594C11.442 9.2682 11.6 9.6646 11.6 10.0779V15.8961C11.6 
                        15.9535 11.6448 16 11.7 16H14.9C14.9265 16 14.952 15.9891 14.9707 15.9696C14.9895 15.9501 15 15.9237 15 15.8961V8.73143C15 
                        6.71418 13.312 5.13662 11.38 5.31865C10.7822 5.37519 10.1967 5.52888 9.6448 5.77413L8.6 6.23958V5.09091C8.6 5.06335 8.58946 
                        5.03693 8.57071 5.01744C8.55196 4.99796 8.52652 4.98701 8.5 4.98701H5.3Z"
                    fill="white"
                  />
                </svg>
                <span className="ease absolute bottom-[-8px] left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
              </a>
              {/* medium */}
              <a
                href="https://medium.com/@ihotel.mn"
                target="blank"
                className="group relative"
              >
                <svg
                  className="h-[16px] w-[16px]"
                  viewBox="0 0 18 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.75 2.28571C17.75 2.28571 17 2.28571 17 3.14286V12.8571C17 12.8571 17 13.7143 17.75 13.7143H18V16H12V13.7143H13V3.08571H12.9L9.835 16H7.137L4.1 3.08571H4V13.7143H5V16H0V13.7143H0.25C0.25 13.7143 1 13.7143 1 12.8571V3.14286C1 3.14286 1 2.28571 0.25 2.28571H0V0H6.634L8.961 9.89714H9.038L11.386 0H18V2.28571H17.75Z"
                    fill="white"
                  />
                </svg>
                <span className="ease absolute bottom-[-8px] left-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* copyRight */}
      <div
        className="flex h-[45px] w-full items-center justify-center gap-[4px] text-[12px] 2xs:text-[14px]"
        style={{ borderTop: 'solid 1px rgb(255 255 255 /25%)' }}
      >
        <p className="flex items-center gap-[4px]">
          <svg
            className="h-[11px] w-[11px]"
            viewBox="0 0 11 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.4006 0C4.33247 0 3.28831 0.322569 2.40019 0.926917C1.51207 1.53126 0.819857 2.39025 0.411099 3.39524C0.00234001
               4.40023 -0.10461 5.5061 0.103773 6.57299C0.312157 7.63989 0.826514 8.6199 1.5818 9.38909C2.33709 10.1583 3.29938 
               10.6821 4.347 10.8943C5.39461 11.1065 6.48049 10.9976 7.46732 10.5813C8.45415 10.1651 9.29761 9.4601 9.89104 
               8.55563C10.4845 7.65116 10.8012 6.5878 10.8012 5.5C10.7996 4.0418 10.2301 2.6438 9.21765 1.6127C8.20519 0.581599 
               6.83244 0.00161752 5.4006 0ZM5.4006 9.77778C4.56983 9.77778 3.75771 9.52689 3.06695 9.05684C2.37619 8.58679 1.8378 
               7.91869 1.51988 7.13703C1.20195 6.35537 1.11877 5.49525 1.28085 4.66545C1.44292 3.83564 1.84298 3.07341 2.43042 
               2.47515C3.01787 1.8769 3.76632 1.46948 4.58113 1.30442C5.39594 1.13936 6.24052 1.22407 7.00805 1.54785C7.77559 
               1.87162 8.43161 2.41992 8.89316 3.12339C9.35472 3.82687 9.60107 4.65393 9.60107 5.5C9.59988 6.63416 9.15695 7.72153 
               8.36947 8.5235C7.58198 9.32548 6.51427 9.77656 5.4006 9.77778ZM7.48033 7.0894C7.15277 7.53385 6.69621 7.8621 6.17532 
               8.02765C5.65442 8.1932 5.09558 8.18767 4.57794 8.01185C4.0603 7.83602 3.61009 7.4988 3.29106 7.04795C2.97204 6.5971 
               2.80038 6.05546 2.80038 5.49974C2.80038 4.94403 2.97204 4.40239 3.29106 3.95154C3.61009 3.50069 4.0603 3.16347 4.57794 
               2.98764C5.09558 2.81181 5.65442 2.80628 6.17532 2.97184C6.69621 3.13739 7.15277 3.46564 7.48033 3.91009C7.5294 3.97409 
               7.56544 4.0474 7.58637 4.12574C7.6073 4.20408 7.61269 4.28588 7.60223 4.36637C7.59177 4.44686 7.56566 4.52441 7.52543 
               4.59451C7.48521 4.66461 7.43167 4.72584 7.36795 4.77463C7.30423 4.82342 7.2316 4.85879 7.15431 4.87867C7.07701 4.89855 
               6.9966 4.90255 6.91777 4.89043C6.83895 4.87831 6.76328 4.85032 6.69519 4.80808C6.62711 4.76584 6.56797 4.71022 6.52123 
               4.64444C6.34491 4.40502 6.09909 4.22817 5.81858 4.13893C5.53808 4.0497 5.23712 4.05261 4.95834 4.14725C4.67955 4.24189 
               4.43707 4.42346 4.26524 4.66625C4.09341 4.90903 4.00095 5.20072 4.00095 5.5C4.00095 5.79928 4.09341 6.09097 4.26524 
               6.33375C4.43707 6.57654 4.67955 6.75811 4.95834 6.85275C5.23712 6.94739 5.53808 6.9503 5.81858 6.86106C6.09909 6.77183 
               6.34491 6.59498 6.52123 6.35555C6.56757 6.28882 6.62658 6.23222 6.69477 6.18913C6.76297 6.14603 6.83896 6.1173 6.91825 
               6.10464C6.99754 6.09198 7.07852 6.09565 7.15639 6.11543C7.23427 6.13521 7.30745 6.1707 7.37162 6.2198C7.43579 6.26889 
               7.48963 6.3306 7.52997 6.40126C7.5703 6.47193 7.59631 6.55012 7.60644 6.6312C7.61658 6.71228 7.61064 6.79461 7.58898 
               6.87331C7.56732 6.95201 7.53038 7.02549 7.48033 7.0894Z"
              fill="white"
            />
          </svg>{' '}
          <span>2023</span>
        </p>
        <p>iHotel LLC. All rights reserved</p>
      </div>
    </div>
  );
};

export default Footer;
