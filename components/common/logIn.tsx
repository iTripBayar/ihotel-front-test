import { useAppCtx } from '@/utils/app';
import { useRef, useState } from 'react';
import Image from 'next/image';

interface iProps {
  ver: string;
  changeVer: (e: string) => void;
}

const LogIn = ({ ver, changeVer }: iProps) => {
  const { appState } = useAppCtx();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordConfirmRef = useRef<HTMLInputElement>(null);
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  // const [] = useState('')

  const handleClick = (event: React.MouseEvent) => {
    const target = event.target as HTMLElement; // Cast event.target to HTMLElement
    // Check if the click target is not the white div
    if (target.classList.contains('bg-black/[.35]')) {
      changeVer('');
    }
  };

  return (
    <div
      className={`animate-fade fixed z-[999] flex h-screen w-full items-center justify-center bg-black/[.35]`}
      onClick={handleClick}
    >
      <div className="flex h-auto w-[95%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] 2xs:w-[85%] sm:w-[55%] md:w-[40%] lg:w-[35%] xl:w-[30%] 2xl:w-[25%]">
        <div className="flex h-[56px] w-full items-center justify-between border-b-[1px] border-black/[.15] text-[18px] text-main-text">
          <p className="font-medium">
            {ver === 'logIn'
              ? appState.lang === 'mn'
                ? 'Нэвтрэх'
                : 'Log In'
              : null}
            {ver === 'signUp'
              ? appState.lang === 'mn'
                ? 'Бүртгүүлэх'
                : 'Sign Up'
              : null}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-[22px] w-[22px]"
            onClick={() => changeVer('')}
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
            <div className="relative">
              <input
                type="email"
                placeholder={appState.lang === 'mn' ? 'И-мэйл хаяг' : 'E-mail'}
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
                required
                pattern="*@.*"
                ref={emailRef}
              />
              {ver != '' && emailRef?.current?.validity.patternMismatch ? (
                <p className=" absolute left-2 text-[11px] text-red-600 2xs:text-[12px]">
                  {appState.lang === 'mn'
                    ? '* И-мэйл хаяг буруу байна *'
                    : '* Invalid email address *'}
                </p>
              ) : null}
            </div>
            <div className="relative">
              <input
                type={show === false ? 'password' : 'text'}
                placeholder={appState.lang === 'mn' ? 'Нууц үг' : 'Password'}
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
                onChange={(event) => setPassword(event.target.value)}
                ref={passwordRef}
                minLength={8}
                required
                pattern={
                  ver === 'signUp'
                    ? '^(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$'
                    : undefined
                }
              />
              {/* {ver === 'logIn' ? (
                <p className=" absolute left-2 text-[11px] text-red-600 2xs:text-[12px]">
                  {appState.lang === 'mn'
                    ? '* Нууц үг буруу *'
                    : '* Incorrect password *'}
                </p>
              ) : null} */}
              {ver === 'signUp' &&
              passwordRef?.current?.validity.patternMismatch == true ? (
                <p
                  className={`absolute left-2 text-[11px] text-red-600 2xs:text-[12px] ${
                    !passwordRef?.current?.validity.patternMismatch ?? 'hidden'
                  }`}
                >
                  {appState.lang === 'mn'
                    ? '* Чанаргүй нууц үг *'
                    : '* Week password *'}
                </p>
              ) : (
                <></>
              )}
              {password !== '' ? (
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
            {ver == 'signUp' ? (
              <div className="relative">
                <input
                  type={showConfirm === false ? 'password' : 'text'}
                  placeholder={
                    appState.lang === 'mn'
                      ? 'Нууц үг дахин оруулна уу'
                      : 'Confirm password'
                  }
                  className="h-[34px] w-full rounded-[4px] border-black/[.15]"
                  ref={passwordConfirmRef}
                  onChange={(event) => setPasswordConfirm(event.target.value)}
                  minLength={8}
                  required
                />
                {ver === 'signUp' &&
                passwordConfirmRef.current?.value.length &&
                passwordConfirmRef.current?.value.length > 0 &&
                passwordRef?.current?.value !==
                  passwordConfirmRef.current?.value ? (
                  <p className=" absolute left-2 text-[11px] text-red-600 2xs:text-[12px]">
                    {appState.lang === 'mn'
                      ? '* Нууц үг буруу *'
                      : '* Incorrect password *'}
                  </p>
                ) : null}
                {passwordConfirm !== '' ? (
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
            <p className="text-[12px] font-bold text-primary-blue 2xs:text-[14px]">
              {appState.lang === 'mn'
                ? 'Нууц үгээ мартсан?'
                : 'Forgot password?'}
            </p>
            {ver === 'signUp' &&
            passwordRef?.current?.validity.patternMismatch ? (
              <p className="mt-[-10px] pl-[10px] text-[11px] text-red-600 2xs:text-[12px]">
                {appState.lang === 'mn'
                  ? '* Нууц үг дор хаяж 1 том үсэг, 1 тоо, 1 тусгай тэмдэгт агуулсан хамгийн багадаа 8 тэмдэгт байх хэрэгтэй *'
                  : '* Password must have: an uppercase letter, a number, a symbol, and be at least 8 characters long *'}
              </p>
            ) : null}
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
          <p className="text-[16px] font-medium uppercase text-black/[.25]">
            {appState.lang === 'mn' ? 'Эсвэл' : 'Or'}
          </p>
          <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
        </div>
        <div className="mb-[-10px] flex w-full items-center justify-center gap-[20px] text-[16px] text-white">
          <div className="group relative flex h-[50px] w-[100px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]">
            {/* <svg
              className="h-[16px] w-[16px]"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0.108173V2.48798H6.5463C6.01543 2.48798 5.65741 2.59615 5.47222 2.8125C5.28704 3.02885 5.19444 3.35337 5.19444 3.78606V5.48978H7.90741L7.5463 8.15805H5.19444V15H2.36111V8.15805H0V5.48978H2.36111V3.52464C2.36111 2.40685 2.6821 1.53996 3.32407 0.923978C3.96605 0.307993 4.82099 0 5.88889 0C6.7963 0 7.5 0.0360577 8 0.108173Z"
                fill="white"
              />
            </svg> */}
            <Image
              // src={data.img}
              src="/images/facebookLogo.png"
              alt="/hotel"
              // fill={true}
              width={100}
              height={100}
              //   priority
              quality={75}
              loading="lazy"
              sizes="50vw"
              className="h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110"
              draggable={false}
            />
            {/* <p>Facebook</p> */}
          </div>
          <div className="group relative flex h-[50px] w-[100px] cursor-pointer items-center justify-center gap-[4px] rounded-[8px] bg-white shadow-[0_3px_10px_rgb(0,0,0,0.25)]">
            <Image
              // src={data.img}
              // src="/images/googleLogo.png"
              src="/images/googleLogo.png"
              alt="/hotel"
              // fill={true}
              width={100}
              height={100}
              //   priority
              quality={75}
              loading="lazy"
              sizes="50vw"
              className="h-[70%] w-auto select-none object-cover duration-500 group-hover:scale-110"
              draggable={false}
            />
          </div>

          {/* <div className="relative flex h-[35px] w-full items-center justify-center gap-[4px] rounded-[4px] bg-[#DE3549] ">
            <svg
              className="h-[16px] w-[16px]"
              viewBox="0 0 10 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.584 7.12875C6.584 5.89375 8.47843 5.78625 8.47843 3.37188C8.47843 1.62375 7.33056 0.78625 7.21311 0.710625H8.35685L9.5 0H5.79554C2.02616 0 1.42243 2.79312 1.42243 3.71875C1.42243 5.0975 2.44105 6.81125 4.49069 6.81125C4.67718 6.81125 4.87548 6.79875 5.08557 6.775C5.05016 6.8775 4.90262 7.22875 4.90262 7.54625C4.90262 8.21062 5.30393 8.6325 5.44262 8.88937C3.2 8.8675 0.5 9.8975 0.5 12.1894C0.5 13.0269 1.17987 15 4.37502 15C8.01987 15 9.12407 12.6169 9.12407 11.2812C9.12171 8.73062 6.584 8.30813 6.584 7.12875ZM5.34584 6.27688C4.07108 6.27688 2.99462 4.5775 2.99462 2.76125C2.99462 2.22188 3.23895 0.654375 4.64944 0.654375C6.46597 0.654375 6.90859 3.50563 6.90859 4.2825C6.90859 4.46313 7.02839 6.27688 5.34584 6.27688ZM5.25849 14.175C4.08938 14.175 2.0722 13.6475 2.0722 11.7725C2.0722 11.1225 2.42984 9.42625 5.53233 9.42625C5.69167 9.42625 5.82977 9.43375 5.94721 9.44563C6.59285 9.95625 7.93016 10.6931 7.93016 12.0506C7.93016 12.6663 7.58433 14.175 5.25849 14.175Z"
                fill="white"
              />
            </svg>
            <p>Google</p>
          </div> */}
        </div>
        <div className="mt-[16px] grid w-full grid-cols-3 items-center  gap-[24px] text-[12px]  font-medium 2xs:text-[14px]">
          <div></div>
          <div
            className={`flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[8px] bg-primary-blue px-[20px] uppercase text-white ${
              appState.lang === 'mn' ? '' : 'min-w-[100px] px-[14px]'
            }`}
          >
            {/* {open == true ? 'Нэвтрэх' : 'Бүртгүүлэх'} */}

            {/* {open == true && sign == false
              ? appState.lang === 'mn'
                ? 'Нэвтрэх'
                : 'Log In'
              : null}
            {sign == true
              ? appState.lang === 'mn'
                ? 'Бүртгүүлэх'
                : 'Sign Up'
              : null} */}
            {ver === 'logIn'
              ? appState.lang === 'mn'
                ? 'Нэвтрэх'
                : 'Log In'
              : null}
            {ver === 'signUp'
              ? appState.lang === 'mn'
                ? 'Бүртгүүлэх'
                : 'Sign Up'
              : null}
          </div>
          <p
            className="justify-self-end text-[13px] text-primary-blue 2xs:text-[14px]"
            onClick={() => {
              // if (sign == false) {
              //   signUp();
              // } else {
              //   log();
              // }
              ver === 'logIn' ? changeVer('signUp') : changeVer('logIn');
            }}
          >
            {ver === 'logIn'
              ? appState.lang === 'mn'
                ? 'Бүртгүүлэх'
                : 'Sign Up'
              : null}
            {ver === 'signUp'
              ? appState.lang === 'mn'
                ? 'Нэвтрэх'
                : 'Log In'
              : null}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LogIn;

// {
//   appState.lang === 'mn'
//     ? '* Багадаа 1 том үсэг, 1 тоо 1 тусгай тэмдэгт оруулна уу *'
//     : '* Password must have: an uppercase letter, a number, and a symbol *';
// }
