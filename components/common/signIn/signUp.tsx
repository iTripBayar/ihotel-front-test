import { useState, ChangeEvent } from 'react';
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
    passwordConfirmation: '',
  });
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible1, setPasswordVisible1] = useState(false);

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
    const data = new FormData(e.currentTarget);

    try {
      const registerResponse = await fetch(
        'https://sandbox.api.myhotel.mn:9443/api/register',

        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: data.get('email')?.toString(),
            password: data.get('password')?.toString(),
            passwordConfirmation: data.get('passwordConfirmation')?.toString(),
          }),
        },
      );
      
      if (!registerResponse.ok) {
        throw new Error(`HTTP error! Status: ${registerResponse.status}`);
      }
      const res = await registerResponse.json();
      console.log(res);
    }
     catch (error: any) {
      console.error('Error:', (error as Error));
    }
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
    setUserInfo({ ...userInfo, passwordConfirmation: value });
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
          <div className='relative'>
            <input
              type={passwordVisible !== true ? 'password' : 'text'}
              name='password'
              id='signInPassword'
              required
              value={userInfo.password}
              onChange={handlePasswordChange}
              placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
              minLength={8}
              // pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
              // pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,}$'
              pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[\w@$!%*?&#]{8,}$'
              className='h-[34px] w-full rounded-[4px] border-black/[.15]'
            />
            <button
              type='button'
              onClick={() => {
                setPasswordVisible(!passwordVisible);
              }}
              className='absolute right-0 top-0 h-[34px] cursor-pointer px-2'
            >
              {passwordVisible === false ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.9'
                  stroke='currentColor'
                  className='max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.9'
                  stroke='currentColor'
                  className='max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Confirm password */}
          <div className='relative'>
            <input
              type={passwordVisible1 !== true ? 'password' : 'text'}
              name='passwordConfirmation'
              required
              value={userInfo.passwordConfirmation}
              onChange={handlePasswordConfirmChange}
              placeholder={
                lang === 'en' ? 'Confirm Password' : 'Нууц үг дахин оруулна уу'
              }
              className='h-[34px] w-full rounded-[4px] border-black/[.15]'
              // pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$'
              // pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,}$'
              pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[\w@$!%*?&#]{8,}$'
            />
            <button
              type='button'
              onClick={() => {
                setPasswordVisible1(!passwordVisible1);
              }}
              className='absolute right-0 top-0 h-[34px] cursor-pointer px-2'
            >
              {passwordVisible1 === false ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.9'
                  stroke='currentColor'
                  className='max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.9'
                  stroke='currentColor'
                  className='max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                  />
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                  />
                </svg>
              )}
            </button>
          </div>
          {arePasswordsValid === false && (
            <p className='mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]'>
              {lang === 'en'
                ? '* Password must have an uppercase letter, a number, a symbol, and be at least 8 characters long *'
                : '* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *'}
            </p>
          )}
          {arePasswordsValid === true &&
            userInfo.password !== userInfo.passwordConfirmation && (
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
            <button
              className='justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]'
              onClick={() => {
                dispatch({
                  type: 'CHANGE_APP_STATE',
                  payload: { logOrSign: 'log' },
                });
              }}
            >
              {lang === 'en' ? 'Log in' : 'Нэвтрэх'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
