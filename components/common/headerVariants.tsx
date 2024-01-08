import Image from 'next/image';
import SearchSection from './searchSection';
import Link from 'next/link';
import { useAppCtx } from '@/contexts/app';

interface iProps {
  ver: string;
  placesData: SearchData.Places[];
  cityData: SearchData.Cities[];
}


const HeaderVariants = ({
  ver,
  placesData,
  cityData,
}: iProps) => {
  const { dispatch } = useAppCtx();
  return (
    <header
      className={`fixed z-[500] flex h-[52px] w-full items-center justify-between bg-primary-blue px-[16px] text-white sm:px-[50px] ${
        ver === "fixed"
          ? " animate-slide-bottom 2xs:px-[24px] md:px-[67px] lg:gap-[24px] lg:px-[150px] xl:gap-[65px] 2xl:gap-[100px] 2xl:px-[200px] "
          : ver === "search"
          ? "h-[60px] 2xs:px-[24px] md:px-[72px] md:pr-[82px] lg:gap-[64px] lg:px-[60px] xl:gap-[100px] "
          : ver === "hotel" || ver === "reservation"
          ? "h-[60px] 2xs:px-[16px] md:px-[72px] md:pr-[82px] lg:gap-[64px] lg:px-[60px] xl:gap-[100px] xl:px-[100px] 2xl:px-[150px]"
          : ""
      }`}
    >
      {/* short logo */}
      <Link
        href="/"
        className={`relative ${
          ver === "hotel" || ver === "reservation" ? "lg:hidden" : "hidden"
        } h-[34px] w-[34px] min-w-[34px] cursor-pointer lg:flex xl:hidden`}
      >
        <Image
          src="/favicon-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="max-h-[34px] max-w-[34px] object-contain"
        />
      </Link>
      {/* original logo */}
      <Link
        href="/"
        className={`relative h-[36.5px] min-h-[36.5px] w-[114px] min-w-[114px]  xl:flex ${
          ver === "hotel" || ver === "reservation"
            ? "hidden lg:flex"
            : "lg:hidden"
        }`}
      >
        <Image
          src="/images/logo-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="absolute cursor-pointer object-contain"
        />
      </Link>
      {/* {ver === 'hotel' || ver === 'reservation' ? : null} */}
      <div
        className={`${
          ver === "hotel" || ver === "reservation" ? "" : "hidden"
        } w-full items-center lg:flex`}
      >
        <SearchSection
          ver={ver}
          placesData={placesData ? placesData : []}
          cityData={cityData ? cityData : []}
        />
      </div>

      <div className="flex items-center justify-end">
        {/* lang btn for reservationPage */}
        {ver === "reservation" ? (
          <div className="hidden lg:flex">Lang</div>
        ) : null}
        {/* burger menu (animated) */}
        <button
          onClick={() => {
            dispatch({
              type: "CHANGE_APP_STATE",
              payload: {
                menu: "open",
                filter: "",
                logOrSign: "",
                calendar: "",
              },
            });
          }}
          className="relative flex h-[16px] w-[24px] flex-col items-center "
        >
          <div className="absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] animate-burger-top rounded-full bg-white"></div>
          <div className="absolute top-0 h-[2px] w-[24px] animate-burger-top1  rounded-full bg-white"></div>
          <div className="absolute bottom-0 h-[2px] w-[24px] animate-burger-top2  rounded-full bg-white"></div>
        </button>
      </div>
    </header>
  );
};

export default HeaderVariants;
