import Image from 'next/image';
import SearchSection from '../searchSection';

interface iProps {
  ver: string;
  openMenu: () => void;
  hotelData: any[];
  placesData: any[];
  campsData: any[];
  destData: any[];
}

const HeaderVariants = ({
  ver,
  openMenu,
  hotelData,
  placesData,
  campsData,
  destData,
}: iProps) => {
  return (
    <header
      className={`fixed z-[100] flex h-[52px] w-full items-center justify-between bg-primary-blue px-[16px] text-white 2xs:px-[24px] sm:px-[50px] ${
        ver === 'fixed'
          ? ' animate-slide-bottom md:px-[67px] lg:gap-[24px] lg:px-[150px] xl:gap-[65px] 2xl:gap-[100px] 2xl:px-[200px]'
          : ver === 'search'
          ? 'h-[60px] md:px-[72px] md:pr-[82px] lg:gap-[64px] lg:px-[60px] xl:gap-[100px] '
          : ''
      }`}
    >
      {/* short logo */}
      <div
        className="relative hidden h-[34px] w-[34px] min-w-[34px] cursor-pointer lg:flex xl:hidden"
        onClick={() => {
          window.location.reload();
        }}
      >
        <Image
          src="/favicon-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="object-fit max-h-[34px] max-w-[34px]"
        />
      </div>
      {/* original logo */}
      <div
        className="relative flex h-[34px]  w-[114px] min-w-[114px] cursor-pointer lg:hidden xl:flex"
        onClick={() => {
          window.location.reload();
        }}
      >
        <Image
          src="/images/logo-white.png"
          alt="/logo"
          fill
          priority
          quality={100}
          sizes="20vw"
          className="object-fit max-h-[34px] max-w-[114px]"
        />
      </div>
      <div className="hidden w-full items-center lg:flex">
        <SearchSection
          hotelData={hotelData}
          placesData={placesData}
          campsData={campsData}
          destData={destData}
          ver={ver}
          map=""
        />
      </div>
      {/* burger menu (animated) */}
      <div className="flex items-center justify-end">
        <div
          className="relative flex h-[16px] w-[24px] flex-col items-center "
          onClick={openMenu}
        >
          <div className="absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] animate-burger-top rounded-full bg-white"></div>
          <div className="absolute top-0 h-[2px] w-[24px] animate-burger-top1  rounded-full bg-white"></div>
          <div className="absolute bottom-0 h-[2px] w-[24px] animate-burger-top2  rounded-full bg-white"></div>
        </div>
      </div>
    </header>
  );
};

export default HeaderVariants;
