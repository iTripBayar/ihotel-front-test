'use client';
import { useRequest } from 'ahooks';
import { fetchDataSearch, fetchCheckHotel } from '@/utils';
import HeaderVariants from '@/components/common/headerVariants';
import BurgerMenu from '@/components/common/burgermenu';
import BottomSection from '@/components/common/bottomSection';
import SearchSection from '@/components/common/searchSection';
import SearchCards from '@/components/pageComponents/searchPage/searchCards';
import MapContainer from '@/components/common/map/map';
import FilterOptions from '@/components/common/searchSection/filter/filterOptions';
import { useAppCtx } from '@/contexts/app';
import { CircularProgress, ChakraProvider } from '@chakra-ui/react';
import LogIn from '@/components/common/signIn/logIn';
import SignUp from '@/components/common/signIn/signUp';
import { useSearchParams } from 'next/navigation';
import { addDays, format } from 'date-fns';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import useWindowSize from '@/hooks/windowSize';
const ErrorComponent = dynamic(() => import('@/components/common/404'));

const SearchPage = () => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get('searchValue');
  const category = searchParams.get('category');
  const page = searchParams.get('page');
  const min = searchParams.get('min');
  const max = searchParams.get('max');
  const services = searchParams.get('services');
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const { appState, dispatch } = useAppCtx();
  const size = useWindowSize();

  const newDate = new Date();
  const nextDay = addDays(newDate, 1);
  const hotel =
    searchValue?.split('$')[1] === 'hotel' ? searchValue?.split('$')[2] : '';
  const city =
    searchValue?.split('$')[1] === 'city' ? searchValue?.split('$')[2] : '';
  const place =
    searchValue?.split('$')[1] === 'place' ? searchValue?.split('$')[2] : '';

  const { data: searchData } = useRequest(() => {
    return fetchDataSearch();
  });
  useEffect(() => {
    if (size.width && size.width >= 1024) {
      dispatch({
        type: 'CHANGE_APP_STATE',
        payload: { map: 'open' },
      });
    } else {
      dispatch({
        type: 'CHANGE_APP_STATE',
        payload: { map: '' },
      });
    }
    return;
  }, [size.width]);
  const { data, loading, error } = useRequest(
    () => {
      return fetchCheckHotel({
        hotel: hotel,
        place: place,
        city: city,
        checkin: encodeURIComponent(format(newDate, 'MM/dd/yyyy')),
        checkout: encodeURIComponent(format(nextDay, 'MM/dd/yyyy')),
        isClosed: '',
        page: page !== null ? page : '1',
        prices:
          min && max
            ? encodeURIComponent(`["[${min}${max !== '0' ? `,${max}` : ''}]"]`)
            : '',
        filterstar: '',
        rating1: '',
        rating2: '',
        hotelServices: services ? encodeURIComponent(`[${services}]`) : '',
        // hotelServices: services ? encodeURI(`[${services}]`) : '',
        roomServices: '',
        categories: category ? encodeURIComponent(`["${category}"]`) : '',
      });
    },
    { refreshDeps: [searchParams] },
  );

  if (!error)
    return (
      <main
        className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-auto`}
        id='container'
      >
        <HeaderVariants ver={'search'} formattedDate={null}/>
        {appState.logOrSign === 'log' ||
        appState.logOrSign === 'forgotPassword' ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === 'sign' ? <SignUp /> : null}
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
          <SearchSection ver={'headerSearch'} formattedDate={null} />
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
            <SearchCards
              data={data ? data.data : []}
              dollarRate={searchData ? searchData.rate : '1'}
            />
            {appState.map === 'open' ? (
              <MapContainer
                data={data ? data.data : []}
                zoom={lat && lng ? 8 : 11}
                lat={lat ? parseInt(lat) : searchData?.mapCenter.lat}
                lng={lng ? parseInt(lng) : searchData?.mapCenter.lng}
                dollarRate={searchData ? searchData.rate : '1'}
              />
            ) : null}
          </div>
        ) : null}
      </main>
    );
  return <ErrorComponent />;
};

export default SearchPage;
