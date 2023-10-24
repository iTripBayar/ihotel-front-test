'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import { Lang, useAppCtx } from '@/utils/app';

interface iProps {
  open: boolean;
  close: () => void;
  logIn: (e: string) => void;
  phone: string;
  ver: string;
}

const BurgerMenu = ({ open, close, logIn, phone, ver }: iProps) => {
  const [closeAnimation, setCloseAnimation] = useState(false);
  const [open1, setOpen1] = useState('');

  const { dispatch, appState } = useAppCtx();

  const handleDay = (type: Lang) => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: {
        lang: type,
      },
    });
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement; // Cast event.target to HTMLElement
    // Check if the click target is not the white div
    if (target.classList.contains('bg-black/50')) {
      setCloseAnimation(true);
      setTimeout(() => {
        setCloseAnimation(false);
        close();
      }, 400);
    }
  };

  return (
    <div
      className={` fixed right-0 top-0 z-[999] flex h-full w-full justify-end bg-black/50 ${
        open === false ? 'hidden' : null
      }`}
      onClick={handleClick}
    >
      <div
        className={`relative flex h-full w-[210px] animate-slide-left flex-col justify-between bg-[#181818] px-[20px] pb-[32px] pt-[48px] text-[14px] font-medium text-white duration-500 lg:w-[250px] lg:px-[24px] ${
          closeAnimation == true ? ' animate-slide-right' : ''
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="absolute right-[18px] top-[18px] h-[28px] w-[28px]"
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

        {/* top section */}
        <div className="flex w-full flex-col justify-start gap-[24px]">
          {/* logIn */}
          <div
            className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
            onClick={() => {
              logIn('logIn');
              setCloseAnimation(true);

              setTimeout(() => {
                setCloseAnimation(false);

                close();
              }, 400);
            }}
          >
            {appState.lang === 'mn' ? 'Нэвтрэх' : 'Log In'}
          </div>
          {/* signUp */}
          <div
            className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]"
            onClick={() => {
              logIn('signUp');
              setCloseAnimation(true);
              setTimeout(() => {
                setCloseAnimation(false);
                close();
              }, 400);
            }}
          >
            {appState.lang === 'mn' ? 'Бүртгүүлэх' : 'Sign Up'}
          </div>
          {/* add hotel */}
          <div className="flex h-[43px] w-full items-center justify-start  border-b-[1px] border-white/[.15]">
            {appState.lang === 'mn' ? 'Буудал нэмэх' : 'Add hotel'}
          </div>
        </div>
        {/* bottom section */}
        <div className="flex w-full flex-col justify-end gap-[24px]">
          {/* footer */}
          {ver === 'search' ? (
            <div className="flex flex-col gap-[24px]">
              {' '}
              <div
                className={`mb-[32px] flex h-[33px] w-full cursor-pointer flex-col gap-[24px] overflow-hidden border-b-[1px] border-white/[.15] ${
                  open1 === 'about'
                    ? 'animate-openSearch '
                    : ' animate-closeSearch '
                }`}
              >
                <div
                  className="flex w-full flex-row-reverse items-center justify-between font-medium"
                  onClick={() => {
                    if (open1 !== 'about') {
                      setOpen1('about');
                    } else {
                      setOpen1('');
                    }
                  }}
                >
                  <h3 className="text-[14px]">
                    {appState.lang === 'mn' ? 'Тухай' : 'About'}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="2 0 20 20"
                    strokeWidth={3}
                    stroke="currentColor"
                    className={`h-[12px] w-[12px] ${
                      open1 === 'about' ? '' : 'rotate-180'
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <div className="mb-[12px] flex flex-col items-end justify-start gap-[16px] text-end ">
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn' ? 'Бидний тухай' : 'About us'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn' ? 'Түгээмэл асуулт хариулт' : 'Q&A'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn'
                      ? 'Үйлчилгээний нөхцөл'
                      : 'Terms of service'}
                  </a>
                </div>
              </div>
              {/* info */}
              <div
                className={`mb-[32px] flex  w-full cursor-pointer flex-col gap-[24px] overflow-hidden border-b-[1px] border-white/[.15] ${
                  open1 === 'info'
                    ? 'animate-openSearch '
                    : 'h-[33px] animate-closeSearch '
                }`}
              >
                <div
                  className="flex w-full flex-row-reverse items-center justify-between font-medium"
                  onClick={() => {
                    if (open1 !== 'info') {
                      setOpen1('info');
                    } else {
                      setOpen1('');
                    }
                  }}
                >
                  <h3 className="text-[14px]">
                    {appState.lang === 'mn' ? 'Мэдээлэл' : 'News'}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="2 0 20 20"
                    strokeWidth={3}
                    stroke="currentColor"
                    className={`h-[12px] w-[12px] ${
                      open1 === 'info' ? '' : 'rotate-180'
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <div className="justif-start mb-[12px] flex flex-col items-end gap-[16px] text-end ">
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn' ? 'Мэдээ мэдээлэл' : 'Articles'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn'
                      ? 'Буудалд зориулсан зөвлөмж'
                      : 'Tips for hotels'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn'
                      ? 'Аялагчдад зориулсан зөвлөмж'
                      : 'Tips for travelers'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn'
                      ? 'iHotel амжилтын түүх'
                      : "iHotel's success history"}
                  </a>
                </div>
              </div>
              {/* service */}
              <div
                className={`mb-[32px] flex w-full cursor-pointer flex-col gap-[24px]  overflow-hidden border-b-[1px] border-white/[.15] ${
                  open1 === 'service'
                    ? 'animate-openSearch '
                    : 'h-[33px] animate-closeSearch'
                }`}
              >
                <div
                  className="flex w-full flex-row-reverse items-center justify-between font-medium"
                  onClick={() => {
                    if (open1 !== 'service') {
                      setOpen1('service');
                    } else {
                      setOpen1('');
                    }
                  }}
                >
                  <h3 className="text-[14px]">
                    {appState.lang === 'mn' ? 'Үйлчилгээ' : 'Services'}
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="2 0 20 20"
                    strokeWidth={3}
                    stroke="currentColor"
                    className={`h-[12px] w-[12px] ${
                      open1 === 'service' ? '' : 'rotate-180'
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </div>
                <div className="mb-[12px] flex flex-col items-end justify-start gap-[16px] text-end ">
                  <a
                    href="/"
                    className="underline-0  relative font-medium text-white"
                  >
                    {appState.lang === 'mn'
                      ? 'Өрөөний удирдлагын систем'
                      : 'Room management system'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn' ? 'Веб сайт бүтээх' : 'Web service'}
                  </a>
                  <a href="/" className="underline-0  relative text-white">
                    {appState.lang === 'mn' ? 'Тусламж' : 'Support'}
                  </a>
                </div>
              </div>
            </div>
          ) : (
            ''
          )}
          {/* phone */}
          <div className="flex h-[43px] w-full items-center justify-end gap-[8px]  border-b-[1px] border-white/[.15]">
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
          </div>
          {/* lang */}
          <div
            className="flex h-[43px] w-full items-center justify-end gap-[8px]  border-b-[1px] border-white/[.15]"
            onClick={() => {
              if (appState.lang === 'mn') {
                handleDay('en');
              } else {
                handleDay('mn');
              }
            }}
          >
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
      </div>
    </div>
  );
};

export default BurgerMenu;
