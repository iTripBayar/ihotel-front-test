'use client';

import HeroCategory from '@/components/homePage/heroCategory';
import '../app/globals.css';
import CommonLocation from '@/components/homePage/commonLocation';
import News from '@/components/homePage';
import Footer from '@/components/common/footer';
import BurgerMenu from '@/components/common/burgermenu';
import { useState, useRef, useEffect } from 'react';
import { useRequest } from 'ahooks';
import HeaderVariants from '@/components/common/headerVariants';
import { fetchData, fetchDataSearch } from '@/utils';
import SearchSection from '@/components/common/searchSection';
import Header from '@/components/common/header';
import BottomSection from '@/components/common/bottomSection';
import CardsContainer from '@/components/homePage/cardsContainer';
import { useAppCtx } from '@/contexts/app';
import LogIn from '@/components/common/signIn/logIn';
import SignUp from '@/components/common/signIn/signUp';
import { ChakraProvider, CircularProgress } from '@chakra-ui/react';
import ErrorComponent from '@/components/common/404';

const Home = () => {
  const [headerVer, setHeaderVer] = useState('default');
  const searchBoxRef = useRef(null);
  const { data, loading, error } = useRequest(() => {
    return fetchData();
  });

  const { data: searchData } = useRequest(() => {
    return fetchDataSearch();
  });

  const { appState, dispatch } = useAppCtx();

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'CHANGE_APP_STATE',
        payload: { phone: data.phoneNumber, dollarRate: data.dollarRate },
      });
      ``;
    }
  }, [loading === false]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          setHeaderVer('fixed');
        } else {
          setHeaderVer('default');
        }
      });
    }, options);

    if (searchBoxRef.current) {
      observer.observe(searchBoxRef.current);
    }

    return () => {
      if (searchBoxRef.current) {
        observer.unobserve(searchBoxRef.current);
      }
    };
  }, []);

  if (!error)
    return (
      <main className='relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]'>
        <Header />
        {headerVer === 'fixed' ? (
          <HeaderVariants
            ver={headerVer}
            hotelData={data ? data.hotels : []}
            campsData={data ? data.camps : []}
            placesData={searchData ? searchData.places : []}
            cityData={searchData ? searchData.cities : []}
          />
        ) : null}
        {appState.logOrSign === 'log' ? <LogIn /> : ''}
        {appState.logOrSign === 'sign' ? <SignUp /> : ''}
        {appState.menu === 'open' ? <BurgerMenu /> : null}
        <BottomSection ver={headerVer} />
        {loading ? (
          <ChakraProvider>
            <div className='flex h-[111px] w-full items-center justify-center 2xs:h-[100px] sm:h-[130px] md:h-[160px] lg:h-[180px] xl:h-[225px] 2xl:h-[250px]'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <HeroCategory data={data ? data.propertyTypes : []} />
        )}

        <div ref={searchBoxRef}>
          {headerVer !== 'fixed' ? (
            <SearchSection
              hotelData={data ? data.hotels : []}
              placesData={searchData ? searchData.places : []}
              campsData={data ? data.camps : []}
              cityData={searchData ? searchData.cities : []}
              ver={'normal'}
            />
          ) : null}
        </div>
        {loading ? (
          <ChakraProvider>
            <div className='flex h-[500px] w-full items-center justify-center'>
              <CircularProgress isIndeterminate={true} color='#3C76FE' />
            </div>
          </ChakraProvider>
        ) : (
          <CommonLocation
            data={data ? data.destCategories : []}
            destinations={data ? data.topDestinations : []}
          />
        )}
        {loading ? null : (
          <CardsContainer title={'cheap'} data={data ? data.cheapHotels : []} />
        )}
        {loading ? null : (
          <CardsContainer title={'hotels'} data={data ? data.hotels : []} />
        )}
        {loading ? null : (
          <CardsContainer title={'camps'} data={data ? data.camps : []} />
        )}
        {loading ? null : <News data={data ? data.posts : []} />}
        <Footer />
      </main>
    );
  return (
   <ErrorComponent />
  );
};
export default Home;
