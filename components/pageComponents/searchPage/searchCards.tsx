import HotelCard from '../../common/hotelCard';
import { useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAppCtx } from '@/contexts/app';
import {
  Pagination,
} from '@nextui-org/react';
import { NextUIProvider } from '@nextui-org/react';

interface iProps {
  data: HotelData.Hotel[];
  dollarRate: string;
  totalLength: number;
}

const SearchCards = ({
  data,
  dollarRate,
  totalLength,
}: iProps) => {
  const searchParams = useSearchParams();
  const toggle = searchParams.get('toggle');
  const { appState } = useAppCtx();
  const router = useRouter();
  const page = searchParams.get('page');

  const divRef = useRef<HTMLDivElement>(null);

  if (toggle === 'true') {
    data = data.filter(
      (index) => index.isOnline === 1 && index.isOffline === 0,
    );
  }
  const createQueryString = (name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (value !== null) {
      params.set(name, value);
    } else {
      params.delete(name);
    }
    return params.toString();
  };
   divRef.current?.addEventListener('scroll', (e) => {
     e.preventDefault();
   });


  return (
    <div
      className={` flex h-auto w-full flex-col gap-[32px] overflow-x-visible lg:h-[calc(100vh-60px)] lg:overflow-y-scroll lg:px-[12px] lg:pb-[28px]  ${
        appState.map === 'open'
          ? 'hidden lg:col-span-4 lg:flex xl:col-span-3 2xl:col-span-4'
          : 'lg:col-span-6 xl:col-span-5 2xl:col-span-6'
      }`}
      ref={divRef}
    >
      <div
        className={`grid h-auto grid-cols-1 gap-[22px] px-[16px] pt-[16px] sm:grid-cols-2 sm:px-[42px] md:px-[72px] lg:px-0 ${
          appState.map === ''
            ? 'lg:grid-cols-3 2xl:grid-cols-4'
            : '2xl:grid-cols-3'
        }`}
      >
        {data.length > 0
          ? data.map((data, i: number) => (
              <HotelCard
                data={data}
                key={i}
                fromMap={false}
                ver='search'
                dollarRate={dollarRate}
              />
            ))
          : null}
      </div>
      <NextUIProvider>
        <Pagination
          isCompact
          showControls
          total={parseInt(`${totalLength / 20}`)}
          initialPage={page? parseInt(page) : 1}
          onChange={(e) => {
            console.log(e);
            router.replace(`/search?${createQueryString('page', `${e}`)}`, {
              scroll: false,
            });
          }}
          classNames={{
            base: 'flex justify-center py-0 px-[24px] m-0 w-full overflow-visible',
            cursor: 'bg-primary-blue rounded-full',
            wrapper: 'max-w-[324px] w-full p-0 bg-black/[.05] overflow-visible',
            item: 'bg-transparent',
            next: 'bg-transparent',
            prev: 'bg-transparent',
          }}
        />
      </NextUIProvider>
      <div className='w-full h-[200px] lg:hidden bg-none'></div>
    </div>
  );
};

export default SearchCards;
