import { useRef, useState } from 'react';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const LogSign = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = searchParams.get('lang');
  const signUpState = searchParams.get('signUpState');
  const logInState = searchParams.get('logInState');
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

  function clearBoth() {
    if (signUpState) {
      router.push(`/?${createQueryString('signUpState', null)}`);
    }
    if (logInState) {
      router.push(`/?${createQueryString('logInState', null)}`);
    }
  }

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.classList.contains('bg-black/[.35]')) {
      clearBoth();
    }
  };

  return (
    <div
      className={`fixed z-[999] flex h-screen w-full animate-fade items-center justify-center bg-black/[.35]`}
      // onClick={handleClick}
      onMouseDown={handleClick}
    >
      <div className="flex h-auto w-[95%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] 2xs:w-[85%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%]">
        {/* title */}
        <div className="flex h-[56px] w-full items-center justify-between border-b-[1px] border-black/[.15] text-[18px] text-main-text">
          <p className="font-medium">
            {logInState === "open"
              ? lang === "en"
                ? "Log In"
                : "Нэвтрэх"
              : null}
            {signUpState === "open"
              ? lang === "en"
                ? "Sign Up"
                : "Бүртгүүлэх"
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

        <div className="flex w-full flex-col gap-[16px] pt-[8px]">
          <div className="flex w-full flex-col gap-[20px]">
            {/* email input */}
            <div className="relative">
              <input
                type="email"
                placeholder={lang === "en" ? "E-mail" : "И-мэйл хая"}
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
                required
                pattern="*@.*"
                ref={emailRef}
              />
              {logInState != "" ||
              (signUpState !== "" &&
                emailRef?.current?.validity.patternMismatch) ? (
                <p className=" absolute left-2 text-[11px] text-red-600 2xs:text-[12px]">
                  {lang === "en"
                    ? "* Invalid email address *"
                    : "* И-мэйл хаяг буруу байна *"}
                </p>
              ) : null}
            </div>
            {/* password input */}
            <div className="relative">
              <input
                type={show === false ? "password" : "text"}
                placeholder={lang === "en" ? "Password" : "Нууц үг"}
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
                onChange={(event) => setPassword(event.target.value)}
                ref={passwordRef}
                minLength={8}
                required
                pattern={
                  signUpState === "open"
                    ? "^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$"
                    : undefined
                }
              />
              {signUpState === "open" &&
              passwordRef?.current?.validity.patternMismatch == true ? (
                <p
                  className={`absolute left-2 text-[11px] text-red-600 2xs:text-[12px] ${
                    !passwordRef?.current?.validity.patternMismatch ?? "hidden"
                  }`}
                >
                  {/* {state.language === 'mn'
                    ? '* Чанаргүй нууц үг *'
                    : '* Week password *'} */}
                  {lang === "en" ? "* Week password *" : "* Чанаргүй нууц үг *"}
                </p>
              ) : (
                <></>
              )}
              {password !== "" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="absolute right-[8px] top-[50%] h-[16px] w-[16px] translate-x-[-50%] translate-y-[-50%] text-main-text"
                  onClick={() => {
                    setShow(!show);
                  }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                  />
                </svg>
              ) : null}
            </div>
            {/* password confirmation input for signUp */}
            {signUpState == "open" ? (
              <div className="relative">
                <input
                  type={showConfirm === false ? "password" : "text"}
                  placeholder={
                    lang === "end"
                      ? "Confirm password"
                      : "Нууц үг дахин оруулна уу"
                    // state.language === 'mn'
                    //   ? 'Нууц үг дахин оруулна уу'
                    //   : 'Confirm password'
                  }
                  className="h-[34px] w-full rounded-[4px] border-black/[.15]"
                  ref={passwordConfirmRef}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  minLength={8}
                  required
                />
                {signUpState === "open" &&
                passwordConfirmRef.current?.value.length &&
                passwordConfirmRef.current?.value.length > 0 &&
                passwordRef?.current?.value !==
                  passwordConfirmRef.current?.value ? (
                  <p className=" absolute left-2 text-[11px] text-red-600 2xs:text-[12px]">
                    {/* {state.language === 'mn'
                      ? '* Нууц үг буруу *'
                      : '* Incorrect password *'} */}
                    {lang === "en"
                      ? "* Incorrect password *"
                      : "* Нууц үг буруу *"}
                  </p>
                ) : null}
                {passwordConfirm !== "" ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="absolute right-[8px] top-[50%] h-[16px] w-[16px] translate-x-[-50%] translate-y-[-50%] text-main-text"
                    onClick={() => {
                      setShowConfirm(!showConfirm);
                    }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                ) : null}
              </div>
            ) : null}
            {/* forgot password */}
            <p className="text-[12px] font-bold text-primary-blue 2xs:text-[14px]">
              {/* {state.language === 'mn'
                ? 'Нууц үгээ мартсан?'
                : 'Forgot password?'} */}
              {lang === "en" ? "Forgot password?" : "Нууц үгээ мартсан?"}
            </p>
            {/* warning message */}
            {signUpState === "open" &&
            passwordRef?.current?.validity.patternMismatch ? (
              <p className="mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]">
                {/* {state.language === 'mn'
                  ? '* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *'
                  : '* Password must have: an uppercase letter, a number, a symbol, and be at least 8 characters long *'} */}
                {lang === "en"
                  ? "* Password must haveL an uppercase letter, a number, a symbol, and be at least 8 characters long *"
                  : "* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *"}
              </p>
            ) : null}
          </div>
        </div>
        {/* divider */}
        <div className="flex w-full items-center justify-between">
          <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
          <p className="text-[16px] font-medium uppercase text-black/[.25]">
            {/* {state.language === 'mn' ? 'Эсвэл' : 'Or'} */}
            {lang === "en" ? "Or" : "Эсвэл"}
          </p>
          <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
        </div>
        {/* facebook & google logIn */}
        <div className="mb-[-10px] flex w-full items-center justify-center gap-[20px] text-[16px] text-white">
          {/* facebook */}
          <div className="group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]">
            <Image
              src="/images/facebookLogo.png"
              alt="/hotel"
              width={100}
              height={100}
              quality={75}
              loading="lazy"
              sizes="50vw"
              className="h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110"
              draggable={false}
            />
          </div>
          {/* google */}
          <div className="group relative flex h-[50px] w-[125px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]">
            <Image
              src="/images/googleLogo.png"
              alt="/hotel"
              width={100}
              height={100}
              quality={75}
              loading="lazy"
              sizes="50vw"
              className="h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110"
              draggable={false}
            />
          </div>
        </div>
        {/* bottom section */}
        <div className="mt-[16px] grid w-full grid-cols-3 items-center  gap-[24px] text-[12px]  font-medium 2xs:text-[14px]">
          <div></div>
          <div
            className={`flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
              lang === "en" ? "min-w-[100px] px-[14px]" : ""
            }`}
          >
            {logInState === "open"
              ? lang === "en"
                ? "Log In"
                : "Нэвтрэх"
              : null}
            {signUpState === "open"
              ? lang === "en"
                ? "Sign Up"
                : "Бүртгүүлэх"
              : null}
          </div>
          <p
            className="justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]"
            onClick={() => {
              if (logInState === "open") {
                router.push(`/?${createQueryString("signUpState", "open")}`);
                router.push(`/?${createQueryString("logInState", null)}`);
              } else {
                router.push(`/?${createQueryString("signUpState", null)}`);
                router.push(`/?${createQueryString("logInState", "open")}`);
              }
              // logIn === 'open' ? changeVer('signUp') : changeVer('logIn');
            }}
          >
            {logInState === "open"
              ? lang === "en"
                ? "Sign Up"
                : "Бүртгүүлэх"
              : null}
            {signUpState === "open"
              ? lang === "en"
                ? "Log In"
                : "Нэвтрэх"
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogSign;
