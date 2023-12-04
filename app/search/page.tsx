'use client';

import { useRequest } from 'ahooks';
import { fetchDataSearch, fetchHotelsData } from '@/utils';
import HeaderVariants from '@/components/common/headerVariants';
import '../../app/globals.css';
import BurgerMenu from '@/components/common/burgermenu';
import BottomSection from '@/components/common/bottomSection';
import SearchSection from '@/components/common/searchSection';
import SearchCards from '@/components/searchPage/searchCards';
import MapContainer from '@/components/common/map/map';
import FilterOptions from '@/components/common/searchSection/filterOptions';
import { useAppCtx } from '@/contexts/app';
import { useSearchParams } from 'next/navigation';
import LogOrSign from '@/components/common/logOrSign';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const filter = searchParams.get('filter');

  const { data, loading, error } = useRequest(() => {
    return fetchHotelsData();
  });

  const searchData = useRequest(() => {
    return fetchDataSearch();
  });
  const { appState, dispatch } = useAppCtx();

  console.log(searchData);
  return (
    <main
      className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-auto`}
      id="container"
    >
      <HeaderVariants
        ver={'search'}
        hotelData={data ? data.data : []}
        placesData={searchData.data ? searchData.data.places : []}
        campsData={[]}
        cityData={searchData.data ? searchData.data.cities : []}
      />
      {appState.logOrSign !== '' ? <LogOrSign /> : ''}
      {appState.menu === 'open' ? <BurgerMenu /> : null}
      <BottomSection ver={'search'} />
      <div
        className={`${
          filter === 'webFilter'
            ? 'absolute left-[50%] top-[55px] z-[200] translate-x-[-50%]'
            : 'hidden'
        }`}
      >
        <FilterOptions />
      </div>
      <div
        className={`lg:hidden ${
          filter === 'mobile' ? 'flex flex-col gap-[24px]' : ''
        }`}
      >
        <SearchSection
          ver={'headerSearch'}
          hotelData={data ? data.data : []}
          placesData={searchData.data ? searchData.data.places : []}
          campsData={[]}
          cityData={searchData.data ? searchData.data.cities : []}
        />
        {filter === 'mobile' ? <FilterOptions /> : null}
      </div>
      {filter !== 'mobile' ? (
        <div
          className={`relative grid h-full w-full grid-cols-1 gap-[24px] lg:h-screen lg:grid-cols-6 lg:gap-[12px] lg:px-[50px] lg:pt-[60px] xl:grid-cols-5 2xl:grid-cols-6`}
        >
          <SearchCards data={data ? data.data : []} />
          <MapContainer
            data={data ? data.data : []}
            lat={searchData.data?.mapCenter.lat}
            lng={searchData.data?.mapCenter.lng}
          />
        </div>
      ) : null}
    </main>
  );
};

export default SearchPage;
