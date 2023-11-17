import Image from 'next/image';
import SearchSection from '../searchSection';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

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
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams.values);
  // const lang = searchParams.get('lang');
  // const searchValue = searchParams.get('searchValue');
  // const toggle = searchParams.get('toggle');
  // const type = searchParams.get('type');
  // const filter = searchParams.get('filter');
  // const catVal = searchParams.get('catVal');
  // const minVal = searchParams.get('minVal');
  // const maxVal = searchParams.get('maxVal');
  // const additionalVal = searchParams.getAll('additionalVal');

  // lang: lang === 'en' ? 'mn' : 'en',
  //                 searchValue: searchValue,
  //                 toggle: toggle,
  //                 filter: filter,
  //                 type: type,
  //                 catVal: catVal,
  //                 minVal: minVal,
  //                 maxVal: maxVal,
  //                 additionalVal: additionalVal,
  return (
    <header
      className={`fixed z-[100] flex h-[52px] w-full items-center justify-between bg-primary-blue px-[16px] text-white sm:px-[50px] ${
        ver === 'fixed'
          ? ' animate-slide-bottom 2xs:px-[24px] md:px-[67px] lg:gap-[24px] lg:px-[150px] xl:gap-[65px] 2xl:gap-[100px] 2xl:px-[200px] '
          : ver === 'search'
          ? 'h-[60px] 2xs:px-[24px] md:px-[72px] md:pr-[82px] lg:gap-[64px] lg:px-[60px] xl:gap-[100px] '
          : ver === 'hotel'
          ? 'h-[60px] 2xs:px-[16px] md:px-[72px] md:pr-[82px] lg:gap-[64px] lg:px-[60px] xl:gap-[100px] xl:px-[100px] 2xl:px-[150px]'
          : ''
      }`}
    >
      {/* short logo */}
      <Link
        href="/"
        className={`relative ${
          ver === 'hotel' ? 'lg:hidden' : 'hidden'
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
        className={`relative h-[36.5px] w-[114px]  xl:flex ${
          ver === 'hotel' ? 'hidden lg:flex' : 'lg:hidden'
        }`}
      >
        <Image
          src="/images/logo-white.png"
          alt="/logo"
          // fill
          width={128}
          height={36.5}
          priority
          quality={100}
          sizes="20vw"
          className="absolute max-w-[114px] cursor-pointer object-cover"
        />
      </Link>
      <div
        className={`${
          ver === 'hotel' ? '' : 'hidden'
        } w-full items-center lg:flex`}
      >
        <SearchSection
          hotelData={hotelData}
          placesData={placesData}
          campsData={campsData}
          destData={destData}
          ver={ver}
        />
      </div>
      {/* burger menu (animated) */}
      <Link
        scroll={false}
        href={{
          pathname: `${pathname}`,
          // query: lang === 'en' ? { lang: 'mn' } : { lang: 'en' },
          query: {},
          // toggle == null
          //   ? { lang: lang === 'en' ? 'mn' : 'en' }
          //   : {
          //       lang: lang === 'en' ? 'mn' : 'en',
          //       searchValue: searchValue,
          //       toggle: toggle,
          //       filter: filter,
          //       type: type,
          //       catVal: catVal,
          //       minVal: minVal,
          //       maxVal: maxVal,
          //       additionalVal: additionalVal,
          //     },
        }}
        className="flex items-center justify-end"
      >
        <div
          className="relative flex h-[16px] w-[24px] flex-col items-center "
          onClick={openMenu}
        >
          <div className="absolute top-[50%] h-[2px] w-[24px] translate-y-[-50%] animate-burger-top rounded-full bg-white"></div>
          <div className="absolute top-0 h-[2px] w-[24px] animate-burger-top1  rounded-full bg-white"></div>
          <div className="absolute bottom-0 h-[2px] w-[24px] animate-burger-top2  rounded-full bg-white"></div>
        </div>
      </Link>
    </header>
  );
};

export default HeaderVariants;
