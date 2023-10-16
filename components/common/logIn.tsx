import { useAppCtx } from '@/utils/app';

interface iProps {
  ver: string;
  changeVer: (e: string) => void;
}

const LogIn = ({ ver, changeVer }: iProps) => {
  const { appState } = useAppCtx();

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
      <div className="flex h-auto w-[90%] flex-col justify-between gap-[16px] rounded-[12px] bg-white px-[16px] pb-[16px] sm:w-[80%] md:w-[60%] lg:w-[45%] xl:w-[35%] 2xl:w-[25%]">
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
        <div className="flex w-full flex-col gap-[12px] pt-[8px]">
          <div className="flex w-full flex-col gap-[16px]">
            <input
              type="email"
              placeholder={appState.lang === 'mn' ? 'И-мэйл хаяг' : 'E-mail'}
              className="h-[34px] w-full rounded-[4px] border-black/[.15]"
            />
            <input
              type="password"
              placeholder={appState.lang === 'mn' ? 'Нууц үг' : 'Password'}
              className="h-[34px] w-full rounded-[4px] border-black/[.15]"
            />
            {ver == 'signUp' ? (
              <input
                type="password"
                placeholder={
                  appState.lang === 'mn'
                    ? 'Нууц үг дахин оруулна уу'
                    : 'Confirm password'
                }
                className="h-[34px] w-full rounded-[4px] border-black/[.15]"
              />
            ) : null}
            <p className="text-[14px] font-bold text-primary-blue">
              {appState.lang === 'mn'
                ? 'Нууц үгээ мартсан?'
                : 'Forgot password?'}
            </p>
          </div>
        </div>
        <div className="flex w-full items-center justify-between">
          <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
          <p className="text-[16px] font-medium uppercase text-black/[.25]">
            Эсвэл
          </p>
          <div className="h-[1px] w-[33%] bg-black/[.15]"></div>
        </div>
        <div className="flex w-full items-center justify-between gap-[10px] text-[16px] text-white">
          <div className=" flex h-[35px] w-full items-center justify-center gap-[4px] rounded-[4px] bg-[#0078F9]">
            <svg
              className="h-[16px] w-[16px]"
              viewBox="0 0 8 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 0.108173V2.48798H6.5463C6.01543 2.48798 5.65741 2.59615 5.47222 2.8125C5.28704 3.02885 5.19444 3.35337 5.19444 3.78606V5.48978H7.90741L7.5463 8.15805H5.19444V15H2.36111V8.15805H0V5.48978H2.36111V3.52464C2.36111 2.40685 2.6821 1.53996 3.32407 0.923978C3.96605 0.307993 4.82099 0 5.88889 0C6.7963 0 7.5 0.0360577 8 0.108173Z"
                fill="white"
              />
            </svg>

            <p>Facebook</p>
          </div>
          <div className=" flex h-[35px] w-full items-center justify-center gap-[4px] rounded-[4px] bg-[#DE3549]">
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
          </div>
        </div>
        <div className="mt-[16px] grid w-full grid-cols-3 items-center  gap-[24px] font-medium">
          <div></div>
          <div className="flex h-[40px] w-auto items-center justify-center justify-self-center rounded-[4px] bg-primary-blue px-[20px] uppercase text-white">
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
            className="justify-self-end text-primary-blue"
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
