import React, { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';
import Image from 'next/image';
import { fetchUserData } from '@/utils';
import { useRequest } from 'ahooks';

export default function LogOrSign() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const { appState, dispatch } = useAppCtx();
  const [show, setShow] = useState(false);
  const [errorState, setErrorState] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const close = () => {
    dispatch({
      type: 'CHANGE_APP_STATE',
      payload: { logOrSign: '' },
    });
  };
  const handleClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('bg-black/[.35]')) {
      close();
    }
  };

  const { run } = useRequest(
    (e: { email: string; password: string }) => {
      return fetchUserData(e);
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
      },
      onError: (e) => {
        console.log(e);
      },
    },
  );

  const checkUser = () => {
    run({ email: 'orgil@ihotel.mn', password: 'Wave920110@' });
  };

  if (appState.logOrSign === 'log')
    return (
      <div
        className='fixed z-[999] flex h-screen w-full animate-fade items-center justify-center bg-black/[.35]'
        onClick={handleClick}
      >
        <div className='flex h-auto w-[95%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] 2xs:w-[85%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%]'>
          <div className='flex h-[56px] w-full items-center justify-between border-b-[1px] border-black/[.15] text-[18px] text-main-text'>
            <p className='font-medium'>
              {lang === 'en' ? 'Log In' : 'Нэвтрэх'}
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-[22px] w-[22px]'
              onClick={() => close()}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          {/* inputs */}
          <button onClick={() => checkUser()}> test </button>
          <div className='flex w-full flex-col gap-[16px] pt-[8px]'>
            <div className='flex w-full flex-col gap-[20px]'>
              <div className='flex w-full flex-col gap-[20px]'>
                {/* email input */}
                <div className='relative'>
                  <input
                    type='email'
                    name='emailLog'
                    id='emailLog'
                    placeholder={lang === 'en' ? 'E-mail' : 'И-мэйл хаяг'}
                    className='h-[34px] w-full rounded-[4px] border-black/[.15]'
                    required
                    pattern='*@.*'
                    ref={emailRef}
                  />
                </div>
                {/* password input */}
                <div className='relative'>
                  <input
                    type={show === true ? 'text' : 'password'}
                    name='passwordLog'
                    id='passwordLog'
                    placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
                    className='h-[34px] w-full rounded-[4px] border-black/[.15]'
                    minLength={8}
                    required
                  />
                </div>
              </div>
              {/* forgot password */}
              <p className='text-[12px] font-bold text-primary-blue 2xs:text-[14px]'>
                {lang === 'en' ? 'Forgot password?' : 'Нууц үгээ мартсан?'}
              </p>
              {errorState && errorState !== '' ? (
                <p className='mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]'>
                  {lang === 'en'
                    ? '* Incorrect username or password *'
                    : '* Нэвтрэх нэр эсвэл нууц үг буруу байна *'}
                </p>
              ) : null}
            </div>
          </div>
          {/* divider */}
          <div className='flex w-full items-center justify-between'>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
            <p className='text-[16px] font-medium uppercase text-black/[.25]'>
              {/* {state.language === 'mn' ? 'Эсвэл' : 'Or'} */}
              {lang === 'en' ? 'Or' : 'Эсвэл'}
            </p>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
          </div>
          {/* facebook & google logIn */}
          <div className='mb-[-10px] flex w-full items-center justify-center gap-[20px] text-[16px] text-white'>
            {/* facebook */}
            <div className='group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]'>
              <Image
                src='/images/facebookLogo.png'
                alt='/hotel'
                width={100}
                height={100}
                loading='lazy'
                sizes='50vw'
                className='h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110'
                draggable={false}
              />
            </div>
            {/* google */}
            <div className='group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]'>
              <Image
                src='/images/googleLogo.png'
                alt='/hotel'
                width={100}
                height={100}
                loading='lazy'
                sizes='50vw'
                className='h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110'
                draggable={false}
              />
            </div>
          </div>
          {/* bottom section */}
          <div className='mt-[16px] grid w-full grid-cols-3 items-center gap-[24px] text-[12px] font-medium 2xs:text-[14px]'>
            <div></div>
            <div
              className={`flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
                lang === 'en' ? 'min-w-[100px] px-[14px]' : ''
              }`}
            >
              {lang === 'en' ? 'Log In' : 'Нэвтрэх'}
            </div>
            <p
              className='justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]'
              onClick={() => {
                dispatch({
                  type: 'CHANGE_APP_STATE',
                  payload: { logOrSign: 'sign' },
                });
              }}
            >
              {lang === 'en' ? 'Sign Up' : 'Бүртгүүлэх'}
            </p>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div
        className='fixed z-[999] flex h-screen w-full animate-fade items-center justify-center bg-black/[.35]'
        onClick={handleClick}
      >
        <div className='flex h-auto w-[95%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] 2xs:w-[85%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%]'>
          {/* title */}
          <div className='flex h-[56px] w-full items-center justify-between border-b-[1px] border-black/[.15] text-[18px] text-main-text'>
            <p className='font-medium'>
              {lang === 'en' ? 'Sign Up' : 'Бүртгүүлэх'}
            </p>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={2}
              stroke='currentColor'
              className='h-[22px] w-[22px]'
              onClick={() => close()}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </div>
          {/* inputs */}
          <div className='flex w-full flex-col gap-[16px] pt-[8px]'>
            <div className='flex w-full flex-col gap-[20px]'>
              <div className='flex w-full flex-col gap-[20px]'>
                {/* email input */}
                <div className='relative'>
                  <input
                    type='email'
                    name='emailSign'
                    id='emailSign'
                    placeholder={lang === 'en' ? 'E-mail' : 'И-мэйл хаяг'}
                    className='h-[34px] w-full rounded-[4px] border-black/[.15]'
                    required
                    pattern='*@.*'
                  />
                  <p className='absolute left-2 text-[10px] text-red-600 2xs:text-[12px]'>
                    {lang === 'en'
                      ? '* Invalid email address *'
                      : '* И-мэйл хаягаа зөв оруулна уу *'}
                  </p>
                </div>
                {/* password input */}
                <div className='relative'>
                  <input
                    type={show === true ? 'text' : 'password'}
                    name='passwordSign'
                    id='passwordSign'
                    placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
                    className='h-[34px] w-full rounded-[4px] border-black/[.15]'
                    minLength={8}
                    required
                    pattern='^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
                  />
                  <p
                    className={`absolute left-2 text-[11px] text-red-600 2xs:text-[12px]`}
                  >
                    {lang === 'en'
                      ? '* Week password *'
                      : '* Чанаргүй нууц үг *'}
                  </p>
                </div>
                {/* confirm password input */}
                <div className='relative'>
                  <input
                    type={show === true ? 'text' : 'password'}
                    name='confirmPasswordSign'
                    id='passwordSign'
                    placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
                    className='h-[34px] w-full rounded-[4px] border-black/[.15]'
                    minLength={8}
                    required
                  />
                  <p
                    className={`absolute left-2 text-[11px] text-red-600 2xs:text-[12px]`}
                  >
                    {lang === 'en'
                      ? '* Passwords does not match *'
                      : '* Нууц үг таарахгүй байна *'}
                  </p>
                </div>
              </div>
              {/* forgot password */}
              <p className='text-[12px] font-bold text-primary-blue 2xs:text-[14px]'>
                {lang === 'en' ? 'Forgot password?' : 'Нууц үгээ мартсан?'}
              </p>
              {appState.logOrSign === 'sign' ? (
                <p className='mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]'>
                  {lang === 'en'
                    ? '* Password must haveL an uppercase letter, a number, a symbol, and be at least 8 characters long *'
                    : '* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *'}
                </p>
              ) : null}
            </div>
          </div>
          {/* divider */}
          <div className='flex w-full items-center justify-between'>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
            <p className='text-[16px] font-medium uppercase text-black/[.25]'>
              {/* {state.language === 'mn' ? 'Эсвэл' : 'Or'} */}
              {lang === 'en' ? 'Or' : 'Эсвэл'}
            </p>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
          </div>
          {/* facebook & google logIn */}
          <div className='mb-[-10px] flex w-full items-center justify-center gap-[20px] text-[16px] text-white'>
            {/* facebook */}
            <div className='group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]'>
              <Image
                src='/images/facebookLogo.png'
                alt='/hotel'
                width={100}
                height={100}
                loading='lazy'
                sizes='50vw'
                className='h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110'
                draggable={false}
              />
            </div>
            {/* google */}
            <div className='group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]'>
              <Image
                src='/images/googleLogo.png'
                alt='/hotel'
                width={100}
                height={100}
                loading='lazy'
                sizes='50vw'
                className='h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110'
                draggable={false}
              />
            </div>
          </div>
          {/* bottom section */}
          <div className='mt-[16px] grid w-full grid-cols-3 items-center gap-[24px] text-[12px] font-medium 2xs:text-[14px]'>
            <div></div>
            <div
              className={`flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
                lang === 'en' ? 'min-w-[100px] px-[14px]' : ''
              }`}
            >
              {lang === 'en' ? 'Sign Up' : 'Бүртгүүлэх'}
            </div>
            <p
              className='justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]'
              onClick={() => {
                dispatch({
                  type: 'CHANGE_APP_STATE',
                  payload: { logOrSign: 'log' },
                });
              }}
            >
              {lang === 'en' ? 'Log In' : 'Нэвтрэх'}
            </p>
          </div>
        </div>
      </div>
    );
}
