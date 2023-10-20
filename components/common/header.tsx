// import React from 'react';
import { useAppCtx } from '@/utils/app';
import Image from 'next/image';
import { Lang } from '@/utils/app';

interface iProps {
  ver: string;
  openMenu: () => void;
  logIn: (e: string) => void;
  phone: string;
}

const Header = ({ ver, openMenu, logIn, phone }: iProps) => {
  const { appState, dispatch } = useAppCtx();

  const handleDay = (type: Lang) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: {
        lang: type,
      },
    });
  };

  return (
    <header
      className={`flex h-[52px] w-full items-center justify-between bg-primary-blue px-[16px] text-white 2xs:px-[24px] sm:px-[50px] lg:px-[150px] xl:px-[200px]`}
    >
      {/* use ? : to only load one of the images */}
      <Image
        src="/images/logo-white.png"
        alt="/logo"
        width={128}
        height={36.5}
        priority
        quality={100}
        sizes="20vw"
        className="h-auto max-w-[114px] cursor-pointer object-cover"
        onClick={() => {
          window.location.reload();
        }}
      />

      <div className="flex items-center justify-end">
        <div className="hidden justify-end gap-[20px] text-[14px] font-medium leading-[14px] lg:flex xl:gap-[32px] xl:text-[15px] xl:leading-[15px]">
          {/* log in */}
          <div
            className="group relative flex h-[32px] cursor-pointer items-center"
            onClick={() => {
              logIn('logIn');
            }}
          >
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
            {appState.lang === 'mn' ? 'Нэвтрэх' : 'Log In'}
          </div>
          {/* sign in */}
          <div
            className="group relative flex h-[32px] cursor-pointer items-center"
            onClick={() => {
              logIn('signUp');
            }}
          >
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
            {appState.lang === 'mn' ? 'Бүртгүүлэх' : 'Sign Up'}
          </div>
          {/* phone number */}
          <a className="group relative flex h-[32px] cursor-pointer items-center gap-[8px]">
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              strokeWidth={0}
              stroke="currentColor"
              className="h-[18px] w-[18px]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
              />
            </svg>
            <p className="leading-[16px]">{phone ? phone : '7727 9090'}</p>
          </a>
          {/* add hotel */}
          <a className="group relative flex h-[32px] cursor-pointer items-center gap-[8px]">
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
            {appState.lang === 'mn' ? 'Буудал нэмэх' : 'Add hotel'}
          </a>
          {/* lang btn */}
          <div
            className="group relative flex h-[32px] cursor-pointer items-center gap-[8px]"
            // onClick={() => {
            //   handleDay(appState.lang === 'mn' ? 'en' : 'mn');
            //   console.log(appState);
            // }}
            onClick={() => {
              if (appState.lang === 'mn') {
                handleDay('en');
              } else {
                handleDay('mn');
              }
              console.log(appState);
            }}
          >
            <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
            <Image
              src={
                appState.lang === 'mn'
                  ? '/images/uk-flag.png'
                  : '/images/mongolian-flag.png'
              }
              alt="/lang"
              width={22}
              height={22}
              priority
              quality={100}
              sizes="20vw"
              className="object-fit max-h-[22px] max-w-[22px] cursor-pointer"
            />
            {appState.lang === 'mn' ? 'EN' : 'MN'}
          </div>
        </div>
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-[28px] w-[28px] lg:hidden"
          onClick={openMenu}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg> */}
        <div
          className="relative flex h-[16px] w-[24px] flex-col items-center lg:hidden"
          onClick={openMenu}
        >
          <div className="animate-burger-top absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] rounded-full bg-white"></div>
          <div className="animate-burger-top1 absolute top-0 h-[2px] w-[24px]  rounded-full bg-white"></div>
          <div className="animate-burger-top2 absolute bottom-0 h-[2px] w-[24px]  rounded-full bg-white"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
