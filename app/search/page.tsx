'use client';
import { useRequest } from 'ahooks';
import { fetchDataSearch, fetchCheckHotel } from '@/utils';
import HeaderVariants from '@/components/common/headerVariants';
import BurgerMenu from '@/components/common/burgermenu';
import BottomSection from '@/components/common/bottomSection';
import SearchSection from '@/components/common/searchSection';
import SearchCards from '@/components/searchPage/searchCards';
import MapContainer from '@/components/common/map/map';
import FilterOptions from '@/components/common/searchSection/filter/filterOptions';
import { useAppCtx } from '@/contexts/app';
// import LogOrSign from '@/components/common/signIn/signIn';
import LogOrSign from '@/components/common/signIn/signIn';
import { useEffect } from 'react';
import { CircularProgress } from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';
import Header from '@/components/common/header';
import { Footer } from 'react-day-picker';

const SearchPage = () => {
  const { data, loading, error } = useRequest(() => {
    return fetchCheckHotel();
  });
  const searchData = useRequest(
    () => {
      return fetchDataSearch();
    },
    {
      manual: true,
      onSuccess: (res) => {
        console.log(res);
      },
    },
  );
  useEffect(() => {
    searchData.run();
  }, []);

  const { appState } = useAppCtx();
  if (!error)
    return (
      <main
        className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-auto`}
        id='container'
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
            appState.filter === 'webFilter'
              ? 'absolute left-[50%] top-[55px] z-[200] translate-x-[-50%]'
              : 'hidden'
          }`}
        >
          <FilterOptions
            categories={
              searchData.data?.categories ? searchData.data?.categories : []
            }
            services={
              searchData.data?.hotelServices
                ? searchData.data.hotelServices
                : []
            }
          />
        </div>
        <div
          className={`lg:hidden ${
            appState.filter === 'mobile' ? 'flex flex-col gap-[24px]' : ''
          }`}
        >
          <SearchSection
            ver={'headerSearch'}
            hotelData={data ? data.data : []}
            placesData={searchData.data ? searchData.data.places : []}
            campsData={[]}
            cityData={searchData.data ? searchData.data.cities : []}
          />
          {appState.filter === 'mobile' ? (
            <FilterOptions
              categories={
                searchData.data?.categories ? searchData.data?.categories : []
              }
              services={
                searchData.data?.hotelServices
                  ? searchData.data.hotelServices
                  : []
              }
            />
          ) : null}
        </div>

        {loading === true ? (
          <ChakraProvider>
            <div className='flex h-full w-full items-center justify-center pb-[100px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <>
            {appState.filter !== 'mobile' ? (
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
          </>
        )}
      </main>
    );
  return (
    <div className='flex h-screen w-full flex-col justify-between'>
      <Header />
      <div className='flex h-full w-full flex-col items-center justify-center text-[128px] font-medium leading-[128px] text-sub-text'>
        <h1>404</h1>
        <p className='text-[32px] font-normal leading-[32px]'>
          Cannot connect to server
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default SearchPage;
