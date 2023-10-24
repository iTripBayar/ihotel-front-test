import HotelCard from '../common/hotelCard';
import { useAppCtx } from '@/utils/app';
import { useRef } from 'react';

interface iProps {
  hotelData: any[];
  campsData: any[];
  map: string;
}

const SearchCards = ({ hotelData, campsData, map }: iProps) => {
  const { appState } = useAppCtx();

  let data = [];
  data = [...hotelData, ...campsData];

  const divRef = useRef<HTMLDivElement>(null);

  divRef.current?.addEventListener('scroll', (e) => {
    e.preventDefault();
  });

  console.log('test');

  return (
    <div
      className={` flex h-auto w-full flex-col gap-[48px] overflow-x-visible pb-[32px] lg:h-[calc(100vh-60px)] lg:overflow-y-scroll lg:px-[12px] lg:pb-[24px]  ${
        map === 'open'
          ? 'hidden lg:col-span-4 lg:flex xl:col-span-3 2xl:col-span-4'
          : 'lg:col-span-6 xl:col-span-5 2xl:col-span-6'
      }`}
      ref={divRef}
    >
      <div
        className={`grid grid-cols-1 gap-[22px] px-[16px] pt-[16px] sm:grid-cols-2 sm:px-[42px] md:px-[72px] lg:px-0 ${
          map === '' ? 'lg:grid-cols-3 2xl:grid-cols-4' : '2xl:grid-cols-3'
        }`}
      >
        {data.map((data, i: number) => (
          <HotelCard data={data} key={i} />
        ))}
      </div>
      {data.length > 0 ? (
        <div className="flex max-w-[171px] cursor-pointer items-center  justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white">
          <p className="flex gap-[4px]">
            {appState.lang === 'mn' ? 'Цааш үзэх' : 'More'}
            <span>({data.length}+)</span>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchCards;
