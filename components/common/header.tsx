'use client';
import Image from 'next/image';
import { useRef } from 'react';
import { Lang, useAppCtx } from '@/utils/app';

interface iProps {
  menu: () => void;
  logIn: () => void;
  signUp: () => void;
}

const Header = ({ menu, logIn, signUp }: iProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const { dispatch, appState } = useAppCtx();
  // const [language, setLanguage] = useState<appState.Lang | undefined>('mn');

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
      id="targetElement"
      ref={headerRef}
      className={`fixed z-[500] flex h-[50px] w-full items-center justify-between bg-primary-blue px-[16px] text-[16px] text-white sm:px-[50px] md:px-[100px] lg:static xl:px-[150px] 2xl:px-[200px]`}
    >
      <Image
        src="/images/logo-white.png"
        alt="/logo"
        width={114}
        height={33}
        priority
        quality={100}
        sizes="20vw"
        className={`object-fit h-auto max-w-[114px] cursor-pointer`}
        onClick={() => {
          window.location.reload();
        }}
      />
      {/* otherBtns */}
      <div
        className={`hidden items-center gap-[24px] text-[14px] font-[500] lg:flex xl:gap-[32px] xl:text-[16px]`}
      >
        <div
          className="group relative flex h-[32px] cursor-pointer items-center"
          onClick={logIn}
        >
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          {appState.lang === 'mn' ? 'Нэвтрэх' : 'Log In'}
        </div>
        <div
          className="group relative flex h-[36px] cursor-pointer items-center"
          onClick={signUp}
        >
          <span className="ease absolute bottom-0 right-0 h-0 w-0 border-b-2 border-white/50 transition-all duration-200 group-hover:w-full"></span>
          {appState.lang === 'mn' ? 'Бүртгүүлэх' : 'Sign Up'}
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
          {appState.lang === 'mn' ? 'Буудал нэмэх' : 'Add hotel'}
        </div>
        <div
          className="group relative flex h-[36px] cursor-pointer items-center gap-[8px]"
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
            quality={60}
            sizes="10vw"
            className="rounded-full object-cover"
            style={{ maxWidth: '22px', maxHeight: '22px' }}
          />
          {appState.lang === 'mn' ? 'EN' : 'MN'}
        </div>
      </div>
      {/* burgerMenu */}
      <div className={`block lg:hidden`} onClick={menu}>
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
