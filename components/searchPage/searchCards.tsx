import HotelCard from '../common/hotelCard';
import { useRef } from 'react';
import { useSearchParams } from 'next/navigation';

interface iProps {
  hotelData: any[];
  campsData: any[];
  dollarRate: string
}

const SearchCards = ({ hotelData, campsData, dollarRate }: iProps) => {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang');
  const map = searchParams.get('map');
  const searchValue = searchParams.get('searchValue')
  const toggle = searchParams.get('toggle')
  const type = searchParams.get('type')
  const topDestinations = searchParams.get('topDestinations')
  const title = searchParams.get('title')
  const filter = searchParams.get('filter')
  const catVal = searchParams.get('catVal');
  const minVal = searchParams.get('minVal');
  const maxVal = searchParams.get('maxVal');
  const additionalVal = searchParams.getAll('additionalVal');
  
  let data = [];
  data = [...hotelData, ...campsData];
  const totalLength = data.length
  const divRef = useRef<HTMLDivElement>(null);

  divRef.current?.addEventListener('scroll', (e) => {
    e.preventDefault();
  });
  if(searchValue){
    if(searchValue.split('$')[1] === 'name'){
  data = data.filter((index) => index.name === searchValue.split('$')[0]);
    }  else if(searchValue.split('$')[1] === 'district'){
  data = data.filter((index) => index.district.name === searchValue.split('$')[0]);
    }
  }
  if(toggle){
    data = data.filter((index)=>index.isOnline === 1 && index.isOffline === 0)
  }
  if(type){
    data = data.filter((index) => index.hotelType.id === parseInt(type));
  }

  // console.log(data)


  // let stat = '';
  // if (data.isOnline == 1 && data.isOffline == 0) {
  //   stat = 'online';
  // } else if (data.isOnline == 0 && data.isOffline == 0) {
  //   stat = 'pending';
  // } else if (data.isOnline == 0 && data.isOffline == 1 && data.phone != null) {
  //   stat = 'offline';
  // } else if (data.isOnline == 0 && data.isOffline == 1 && data.phone == null) {
  //   stat = 'data';
  // }

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
        {data.length > 0
          ? data.map((data, i: number) => (
              <HotelCard
                data={data}
                key={i}
                fromMap={false}
                dollarRate={dollarRate}
              />
            ))
          : null}
      </div>
      {data.length > 8 ? (
        <div className="flex max-w-[171px] cursor-pointer items-center  justify-center self-center rounded-full bg-primary-blue px-[16px] py-[8px] text-[16px] text-white">
          <p className="flex gap-[4px]">
            {/* {state.language === 'mn' ? 'Цааш үзэх' : 'More'} */}
            {lang === 'en' ? 'More' : 'Цааш үзэх'}
            <span>({totalLength - data.length}+)</span>
          </p>
        </div>
      ) : null}
    </div>
  );
};

export default SearchCards;
