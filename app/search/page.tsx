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
import { CircularProgress, ChakraProvider } from '@chakra-ui/react';
import LogIn from '@/components/common/signIn/logIn';
import SignUp from '@/components/common/signIn/signUp';
import { useSearchParams } from 'next/navigation';
import { addDays, format } from 'date-fns';
import ErrorComponent from '@/components/common/404';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue');
  const destination = searchParams.get('destination');
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const services = searchParams.get('services');

  const newDate = new Date();
  const nextDay = addDays(newDate, 1);
  const hotel =
    searchValue?.split('$')[1] === 'hotel' ? searchValue?.split('$')[2] : null;
  const city =
    searchValue?.split('$')[1] === 'city' ? searchValue?.split('$')[2] : null;
  const place =
    searchValue?.split('$')[1] === 'place' ? searchValue?.split('$')[2] : null;

  const { data, loading, error } = useRequest(
    () => {
      return fetchCheckHotel({
        hotel: hotel,
        place: place,
        city: city,
        checkin: encodeURIComponent(format(newDate, 'MM/dd/yyyy')),
        checkout: encodeURIComponent(format(nextDay, 'MM/dd/yyyy')),
        isClosed: null,
        page: page !== null ? page : '1',
        prices:
          min && max
            ? encodeURIComponent(`[${min !== '0' ? `${min},` : ''} ${max}]`)
            : null,
        filterstar: null,
        rating1: null,
        rating2: null,
        hotelServices: services ? `[${services}]` : null,
        roomServices: null,
        categories: `['${category}']`,
      });
    },
    { refreshDeps: [searchParams] },
  );

  const { data: searchData } = useRequest(() => {
    return fetchDataSearch();
  });

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
          placesData={searchData ? searchData.places : []}
          campsData={[]}
          cityData={searchData ? searchData.cities : []}
        />
        {appState.logOrSign === 'log' ? <LogIn /> : ''}
        {appState.logOrSign === 'sign' ? <SignUp /> : ''}
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
            categories={searchData?.categories ? searchData?.categories : []}
            services={searchData?.hotelServices ? searchData.hotelServices : []}
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
            placesData={searchData ? searchData.places : []}
            campsData={[]}
            cityData={searchData ? searchData.cities : []}
          />
          {appState.filter === 'mobile' ? (
            <FilterOptions
              categories={searchData?.categories ? searchData?.categories : []}
              services={
                searchData?.hotelServices ? searchData.hotelServices : []
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
        ) : appState.filter !== 'mobile' ? (
          <div
            className={`relative grid h-full w-full grid-cols-1 gap-[24px] lg:grid-cols-6 lg:gap-[12px] lg:px-[50px] lg:pt-[60px] xl:grid-cols-5 2xl:grid-cols-6`}
          >
            <SearchCards data={data ? data.data : []} />
            <MapContainer
              data={data ? data.data : []}
              lat={searchData?.mapCenter.lat}
              lng={searchData?.mapCenter.lng}
            />
          </div>
        ) : null}
      </main>
    );
  return <ErrorComponent />;
};

export default SearchPage;
