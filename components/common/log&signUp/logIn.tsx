import { useCallback, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LogIn() {
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState('');

  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang');
  const logInState = searchParams.get('logInState');
  const signUpState = searchParams.get('signUpState');
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value !== null) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams],
  );

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  //   const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const clearBoth = () => {
    if (signUpState) {
      router.push(`/?${createQueryString('signUpState', null)}`);
    }
    if (logInState) {
      router.push(`/?${createQueryString('logInState', null)}`);
    }
  };

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('bg-black/[.35]')) {
      clearBoth();
    }
  };
  return (
    <div
      className="fixed z-[999] flex h-screen w-full animate-fade items-center justify-center bg-black/[.35]"
      onClick={handleClick}
    >
      <div className="flex h-auto w-[95%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] 2xs:w-[85%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%]">
        {/* title */}
        <div className="flex h-[56px] w-full items-center justify-between border-b-[1px] border-b-black/[.15] text-[18px] text-main-text">
          <p className="font-medium">
            {logInState === 'open'
              ? lang === 'en'
                ? 'Log In'
                : 'Нэвтрэх'
              : null}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-[22px] w-[22px]"
            onClick={() => clearBoth()}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="flex w-full flex-col gap-[20px]">
          {/* email input */}
          <div className="relative">
            <input
              type="email"
              placeholder={lang === 'en' ? 'E-mail' : 'И-тэйл хаяг'}
              className="h-[34px] w-full rounded-[4px] border-black/[.15]"
              required
              pattern="*@.*"
              ref={emailRef}
            />
            {emailRef.current?.validity.patternMismatch ? (
              <p className="absolute left-2 text-[11px] text-red-600 2xs:text-[12px]">
                {lang === 'en'
                  ? '* Invalid email address *'
                  : '* И-мэйл хаяг буруу байна *'}
              </p>
            ) : null}
          </div>
          {/* password input */}
          <div className="relative">
            <input
              type={show === false ? 'password' : 'text'}
              placeholder={lang === 'en' ? 'Password' : 'Нууц үг'}
              className="h-[34px] w-full rounded-[4px] border-black/[.15]"
              onChange={(event) => setPassword(event.target.value)}
              ref={passwordRef}
              minLength={8}
              required
              pattern={
                signUpState === 'open'
                  ? '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
                  : undefined
              }
            />
            {passwordRef.current?.validity.patternMismatch === true ? (
              <p
                className={`absolute left-2 text-[11px] text-red-600 2xs:text-[12px]`}
              >
                {lang === 'en'
                  ? '* Password incorrect *'
                  : '* Нууц үг буруу байна *'}
              </p>
            ) : null}
            {password !== '' ? (
              show === false ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute right-[8px] top-[50%] h-[16px] w-[16px] translate-x-[-50%] translate-y-[-50%] text-main-text"
                  onClick={() => {
                    setShow(true);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  onClick={() => {
                    setShow(false);
                  }}
                  className="absolute right-[8px] top-[50%] h-[16px] w-[16px] translate-x-[-50%] translate-y-[-50%] text-main-text"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )
            ) : null}
          </div>
          {/* forgot password */}
          <p className="text-[12px] font-bold text-primary-blue 2xs:text-[14px]">
            {lang === 'en' ? 'Forgot password?' : 'Нууц үгээ мартсан?'}
          </p>
        </div>
        {/* divider */}
        <div className="flex w-full items-center justify-between">
          <div className="h-[1px] w-[33%] bg-main-text/[.15]"></div>
          <p className="text-[16px] font-medium uppercase text-main-text/[.25]">
            {lang === 'en' ? 'Or' : 'Эсвэл'}
          </p>
          <div className="h-[1px] w-[33%] bg-main-text/[.15]"></div>
        </div>
        {/* Facebook & Google logIn */}
        <div className="mg-[-10px] flex w-full items-center justify-between gap-[20px] text-[16px] "></div>
      </div>
    </div>
  );
}
