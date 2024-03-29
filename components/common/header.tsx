import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';

interface Props{
  user: string
}

const Header = ({user}:Props) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const pathname = usePathname();
  const { appState, dispatch } = useAppCtx();

  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };
  
  return (
    <header
      className={`flex h-[52px] min-h-[52px] w-full items-center justify-between bg-primary-blue px-[16px] text-white 2xs:px-[24px] sm:px-[50px] lg:px-[150px] xl:px-[200px]`}
    >
      <Link href="/" className="relative h-[36.5px] w-[114px]">
        <Image
          src="/images/logo-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="absolute object-contain cursor-pointer"
        />
      </Link>
      <div className="flex items-center justify-end">
        <div className="hidden justify-end gap-[20px] text-[14px] font-medium leading-[14px] lg:flex xl:gap-[32px] xl:text-[15px] xl:leading-[15px]">
          {user === "" ? (
            <div
              className="group relative flex h-[32px] cursor-pointer items-center"
              onClick={() => {
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: {
                    logOrSign: appState.logOrSign !== "log" ? "log" : "",
                  },
                });
              }}
            >
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 ease border-white/50 group-hover:w-full"></span>
              {lang === "en" ? "Log In" : "Нэвтрэх"}
            </div>
          ) : null}
          {user === "" ? (
            <div
              className="group relative flex h-[32px] cursor-pointer items-center"
              onClick={() => {
                dispatch({
                  type: "CHANGE_APP_STATE",
                  payload: {
                    logOrSign: appState.logOrSign !== "sign" ? "sign" : "",
                  },
                });
              }}
            >
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 ease border-white/50 group-hover:w-full"></span>
              {lang === "en" ? "Sign Up" : "Бүртгүүлэх"}
            </div>
          ) : null}
          {user !== "" ? (
            <Link
              href="/profile"
              className="group relative flex h-[32px] cursor-pointer items-center"
            >
              <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 ease border-white/50 group-hover:w-full"></span>
              {user}
            </Link>
          ) : null}
          <div
            draggable={false}
            className="group relative flex h-[32px] cursor-pointer items-center gap-[8px]"
          >
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 ease border-white/50 group-hover:w-full"></span>
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
            <p className="leading-[16px]">{appState.phone}</p>
          </div>
          {/* add hotel */}
          <Link
            href={`${process.env.TEMPORARY_URL2}`}
            target="_blank"
            className="group relative flex h-[32px] cursor-pointer items-center gap-[8px]"
          >
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 ease border-white/50 group-hover:w-full"></span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="h-[22px] w-[22px] rounded-full bg-white/25"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            {lang === "en" ? "Add hotel" : "Буудал нэмэх"}
          </Link>
          {/* lang btn */}
          <div
            onClick={() => {
              const nextLang = lang === "en" ? "mn" : "en";
              router.push(`${pathname}?${createQueryString("lang", nextLang)}`);
            }}
            className="group relative flex h-[32px] cursor-pointer items-center gap-[8px]"
          >
            <span className="absolute bottom-0 right-0 w-0 h-0 transition-all duration-200 border-b-2 ease border-white/50 group-hover:w-full"></span>
            <Image
              src={
                lang === "en"
                  ? "/images/mongolian-flag.png"
                  : "/images/uk-flag.png"
              }
              alt="/lang"
              width={22}
              height={22}
              sizes="10vw"
              className="object-fit max-h-[22px] max-w-[22px] cursor-pointer"
            />
            {lang === "en" ? "MN" : "EN"}
          </div>
        </div>
        <button
          className="relative flex h-[16px] w-[24px] flex-col items-center lg:hidden"
          aria-label='animatedMenu'
          onClick={() => {
            dispatch({
              type: "CHANGE_APP_STATE",
              payload: { menu: "open" },
            });
          }}
        >
          <div className="absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] animate-burger-top rounded-full bg-white"></div>
          <div className="absolute top-0 h-[2px] w-[24px] animate-burger-top1  rounded-full bg-white"></div>
          <div className="absolute bottom-0 h-[2px] w-[24px] animate-burger-top2  rounded-full bg-white"></div>
        </button>
      </div>
    </header>
  );
};

export default Header;
