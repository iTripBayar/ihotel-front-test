import useWindowSize from '@/hooks/windowSize';
import HotelCard from '../common/hotelCard';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

interface iProps {
  title: string;
  data: any[];
  dollarRate: string | null
}

const CardsContainer = ({
  title,
  data,
  dollarRate
}: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const size = useWindowSize();
  const router = useRouter();
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


  return (
    <div
      className={`w-full px-[16px] pt-[32px] sm:px-[42px] md:px-[72px]  lg:px-[150px] lg:py-[0] 2xl:px-[200px] `}
    >
      <div
        className={`flex w-full flex-col gap-[24px] border-t-[1px]  border-black/[.15] pt-[32px] lg:gap-[32px]`}
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
          }  xl:grid-rows-${
            cap / 3
          } xl:grid-cols-3 xl:gap-[24px] 2xl:gap-[48px] `}
        >
          {data.map((data, i: number) => (
            <HotelCard
              data={data}
              key={i}
              fromMap={false}
              dollarRate={dollarRate}
            />
          ))}
        </div>
        {data.length > 0 ? (
          // <Link
          //   href={{
          //     pathname: '/search',
          //     query: {
          //       lang: lang,
          //       searchValue: searchValue,
          //       toggle: toggle,
          //       type: title,
          //     }, // the data
          //   }}
          //   className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white"
          // >
          //   <p className="flex gap-[4px]">
          //     {/* {state.language === 'mn' ? 'Цааш үзэх' : 'More'}{' '} */}
          //     {lang === 'en' ? 'More' : 'Цааш үзэх'}
          //     <span>({data.length}+)</span>
          //   </p>
          // </Link>
          <div
            onClick={() => {
              router.push(`/search/?${createQueryString('title', title)}`);
            }}
            className="flex max-w-[171px] cursor-pointer items-center justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white"
          >
            <p className="flex gap-[4px]">
              {/* {state.language === 'mn' ? 'Цааш үзэх' : 'More'}{' '} */}
              {lang === 'en' ? 'More' : 'Цааш үзэх'}
              <span>({data.length}+)</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default CardsContainer;
