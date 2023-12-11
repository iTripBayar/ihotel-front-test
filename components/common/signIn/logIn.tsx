import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';
import { signIn } from 'next-auth/react';
import { FormEvent } from 'react';
import { FacebookSignInButton, GoogleSignInButton } from './authButtons';

export default function LogIn() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const { dispatch } = useAppCtx();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
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
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const signInResponse = await signIn('credentials', {
      email: data.get('email'),
      password: data.get('password'),
      redirect: false,
    });

    if (signInResponse && !signInResponse.error) {
      router.push('/profile');
    } else {
      console.log('Error: ', signInResponse);
      setError('Your Email or Password is wrong!');
    }
  };
  return (
    <div
      className='fixed z-[999] flex h-screen w-full animate-fade items-center justify-center bg-black/[.35]'
      onClick={handleClick}
    >
      <div className='flex h-auto w-[95%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] 2xs:w-[85%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%]'>
        <div className='flex h-[56px] w-full items-center justify-between border-b-[1px] border-black/[.15] text-[18px] text-main-text'>
          <p className='font-medium'>{lang === 'en' ? 'Log In' : 'Нэвтрэх'}</p>
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
        <form
          className='flex w-full flex-col gap-[16px] pt-[8px]'
          onSubmit={handleSubmit}
        >
          <input
            type='email'
            name='email'
            // value={userInfo.email}
            // onChange={({ target }) =>
            //   setUserInfo({ ...userInfo, email: target.value })
            // }
            placeholder={lang === 'en' ? 'E-mail' : 'И-мэйл хаяг'}
            required
            className='h-[34px] w-full rounded-[4px] border-black/[.15]'
          />
          <input
            type='password'
            name='password'
            required
            // value={userInfo.password}
            // onChange={({ target }) =>
            //   setUserInfo({ ...userInfo, password: target.value })
            // }
            placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
            minLength={8}
            pattern='^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
            className='h-[34px] w-full rounded-[4px] border-black/[.15]'
          />
          <p className='text-[12px] font-bold text-primary-blue 2xs:text-[14px]'>
            {lang === 'en' ? 'Forgot password?' : 'Нууц үгээ мартсан?'}
          </p>
          {error ? (
            <p className='mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]'>
              {lang === 'en'
                ? '* Incorrect email or password! *'
                : '* И-мэйл эсвэл нууц үг буруу байна! *'}
            </p>
          ) : null}
          <div className='flex w-full items-center justify-between'>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
            <p className='text-[16px] font-medium uppercase text-black/[.25]'>
              {/* {state.language === 'mn' ? 'Эсвэл' : 'Or'} */}
              {lang === 'en' ? 'Or' : 'Эсвэл'}
            </p>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
          </div>
          {/* facebook & google logIn */}
          <div
            className='mb-[-10px] flex w-full items-center justify-center gap-[20px] text-[16px] text-white'
            onKeyDown={(e) => e.preventDefault()}
          >
            {/* facebook */}
            <FacebookSignInButton />
            <GoogleSignInButton />
          </div>
          <div className='mt-[16px] grid w-full grid-cols-3 items-center gap-[24px] text-[12px] font-medium 2xs:text-[14px]'>
            <div></div>
            <button
              type='submit'
              className={`flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
                lang === 'en' ? 'min-w-[100px] px-[14px]' : ''
              }`}
            >
              {lang === 'en' ? 'Log In' : 'Нэвтрэх'}
            </button>
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
        </form>
      </div>
    </div>
  );
}
