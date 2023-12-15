import { HTMLInputTypeAttribute, useState } from 'react';
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
  const [passwordVisible, setPasswordVisible] = useState(false);

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
    // console.log(data)
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
            placeholder={lang === 'en' ? 'E-mail' : 'И-мэйл хаяг'}
            required
            className='h-[34px] w-full rounded-[4px] border-black/[.15]'
          />
          <div className='relative text-sub-text'>
            <input
              // type='password'
              type={passwordVisible === true ? 'text' : 'password'}
              name='password'
              required
              placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
              minLength={8}
              pattern='^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[\w@$!%*?&]{8,}$'
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
              {lang === 'en' ? 'Log In' : 'Нэвтрэх'}
            </button>
            <button
              className='justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]'
              onClick={() => {
                dispatch({
                  type: 'CHANGE_APP_STATE',
                  payload: { logOrSign: 'sign' },
                });
              }}
            >
              {lang === 'en' ? 'Sign Up' : 'Бүртгүүлэх'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
