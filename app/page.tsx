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
        <HeroCategory data={data ? data.propertyTypes : []} />
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
        <CommonLocation
          data={data ? data.destCategories : []}
          destinations={data ? data.topDestinations : []}
        />
        <CardsContainer title={'cheap'} data={data ? data.cheapHotels : []} />
        <CardsContainer title={'hotels'} data={data ? data.hotels : []} />
        <CardsContainer title={'camps'} data={data ? data.camps : []} />
        <News data={data ? data.posts : []} />
        <Footer />
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
export default Home;
