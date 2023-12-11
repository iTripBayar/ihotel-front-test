import React, { useState, ChangeEvent } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';
import { FormEvent } from 'react';
import { FacebookSignInButton, GoogleSignInButton } from './authButtons';

export default function SignUp() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const { dispatch } = useAppCtx();
  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
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
  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserInfo({ ...userInfo, email: value });

    // Check if the email is not empty and is valid
    setIsEmailValid(value === '' || event.target.checkValidity());
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userInfo);
  };

  const [arePasswordsValid, setArePasswordsValid] = useState(false);

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setUserInfo({ ...userInfo, password: value });
    setArePasswordsValid(event.target.checkValidity());
  };

  const handlePasswordConfirmChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;
    setUserInfo({ ...userInfo, passwordConfirm: value });
  };

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
        <form
          className='flex w-full flex-col gap-[16px] pt-[8px]'
          onSubmit={handleSubmit}
        >
          {/* email */}
          <div className='relative'>
            <input
              type='email'
              name='email'
              value={userInfo.email}
              id='email'
              onChange={handleEmailChange}
              placeholder={lang === 'en' ? 'E-mail' : 'И-мэйл хаяг'}
              required
              pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
              className={`h-[34px] w-full rounded-[4px] border ${
                isEmailValid ? 'border-black/[.15]' : 'border-red-600'
              }`}
            />
            {!isEmailValid && (
              <p className='absolute left-2 text-[10px] text-red-600 2xs:text-[12px]'>
                {lang === 'en'
                  ? '* Invalid email address *'
                  : '* И-мэйл хаягаа зөв оруулна уу *'}
              </p>
            )}
          </div>
          {/* password */}
          <input
            type='password'
            name='password'
            id='signInPassword'
            required
            value={userInfo.password}
            onChange={handlePasswordChange}
            placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
            minLength={8}
            pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
            className='h-[34px] w-full rounded-[4px] border-black/[.15]'
          />

          {/* Confirm password */}
          <input
            type='password'
            name='passwordConfirm'
            required
            value={userInfo.passwordConfirm}
            onChange={handlePasswordConfirmChange}
            placeholder={
              lang === 'en' ? 'Confirm Password' : 'Нууц үг дахин оруулна уу'
            }
            className='h-[34px] w-full rounded-[4px] border-black/[.15]'
            pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
          />
          {arePasswordsValid === false && (
            <p className='mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]'>
              {lang === 'en'
                ? '* Password must have an uppercase letter, a number, a symbol, and be at least 8 characters long *'
                : '* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *'}
            </p>
          )}
          {arePasswordsValid === true &&
            userInfo.password !== userInfo.passwordConfirm && (
              <p className='mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]'>
                {lang === 'en'
                  ? '* Passwords does not match *'
                  : '* Нууц үг таарахгүй байна. *'}
              </p>
            )}
          <div className='flex w-full items-center justify-between'>
            <div className='h-[1px] w-[33%] bg-black/[.15]'></div>
            <p className='text-[16px] font-medium uppercase text-black/[.25]'>
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
              {lang === 'en' ? 'Sign Up' : 'Бүртгүүлэх'}
            </button>
            <p
              className='justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]'
              onClick={() => {
                dispatch({
                  type: 'CHANGE_APP_STATE',
                  payload: { logOrSign: 'log' },
                });
              }}
            >
              {lang === 'en' ? 'Log in' : 'Нэвтрэх'}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
