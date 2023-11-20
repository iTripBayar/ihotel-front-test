import useWindowSize from '@/hooks/windowSize';
import HotelCard from '../common/hotelCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface iProps {
  title: string;
  data: any[];
  ver: string;
  hotelData: any[];
  campsData: any[];
  map: string;
}

const CardsContainer = ({
  title,
  data,
  ver,
  hotelData,
  campsData,
  map,
}: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const toggle = searchParams.get('toggle');
  const searchValue = searchParams.get('searchValue');
  const size = useWindowSize();

  let cap = 6;

  if (title === 'cheap') {
    if (size.width && size.width <= 1280 && size.width >= 576) {
      cap = 2;
    } else {
      cap = 3;
    }
  }

  if (cap != 0) {
    data = data.slice(0, cap);
  }

  if (ver === 'search') {
    data = [...hotelData, ...campsData];
  }

  return (
    <div
      className={`w-full px-[16px] pt-[32px] sm:px-[42px] md:px-[72px] lg:px-[150px] lg:py-[0] 2xl:px-[200px] ${
        map === 'open'
          ? 'lg:px-0 lg:pl-[100px] lg:pt-[82px]'
          : 'pt-0 lg:px-[100px] lg:pt-[82px]'
      }`}
    >
      <div
        className={`flex w-full flex-col gap-[24px] border-t-[1px]  border-black/[.15] pt-[32px] lg:gap-[32px] ${
          ver === 'search' ? ' border-none pt-0' : ''
        }`}
      >
        {title !== '' ? (
          <h3 className="text-[20px] font-bold text-main-text">
            {title === 'cheap'
              ? lang === 'en'
                ? 'Comfortable & Cheap hotels'
                : 'Тохилог & Хямд буудлууд'
              : null}
            {title === 'hotels'
              ? lang === 'en'
                ? 'Featured hotels'
                : 'Онцлох зочид буудлууд'
              : null}
            {title === 'camps'
              ? lang === 'en'
                ? 'Featured camps'
                : 'Онцлох амралтын газрууд'
              : null}
          </h3>
        ) : null}
        <div
          className={`grid xs:grid-rows-${cap} gap-[32px] sm:grid-cols-2 sm:grid-rows-${
            cap / 2
          }  xl:grid-rows-${cap / 3} xl:gap-[24px] 2xl:gap-[48px] ${
            map !== 'open' ? 'xl:grid-cols-3' : 'lg:grid-cols-1 xl:grid-cols-2'
          }`}
        >
          {data.map((data, i: number) => (
            <HotelCard data={data} key={i} fromMap={false} />
          ))}
        </div>
        {data.length > 0 ? (
          <Link
            href={{
              pathname: '/search',
              query: {
                lang: lang,
                searchValue: searchValue,
                toggle: toggle,
                type: title,
              }, // the data
            }}
            className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white"
          >
            <p className="flex gap-[4px]">
              {/* {state.language === 'mn' ? 'Цааш үзэх' : 'More'}{' '} */}
              {lang === 'en' ? 'More' : 'Цааш үзэх'}
              <span>({data.length}+)</span>
            </p>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default CardsContainer;
