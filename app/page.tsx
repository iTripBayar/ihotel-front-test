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
import { fetchData, fetchDataSearch, fetchUserData } from '@/utils';
import SearchSection from '@/components/common/searchSection';
import Header from '@/components/common/header';
import BottomSection from '@/components/common/bottomSection';
import CardsContainer from '@/components/homePage/cardsContainer';
import { useAppCtx } from '@/contexts/app';
import LogOrSign from '@/components/common/signIn/signIn';

const Home = () => {
  const [headerVer, setHeaderVer] = useState('default');
  const searchBoxRef = useRef(null);
  const { data, loading, error } = useRequest(() => {
    return fetchData();
  });

  const searchData = useRequest(() => {
    return fetchDataSearch();
  });

  // const userData = useRequest(()=>{
  //   return fetchUserData();
  // })
  // console.log(userData)

  const { appState, dispatch } = useAppCtx();

  useEffect(() => {
    if (data) {
      dispatch({
        type: 'CHANGE_APP_STATE',
        payload: { phone: data.phoneNumber, dollarRate: data.dollarRate },
      });
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
  // useEffect(() => {
  //   if (appState.logOrSign !== '') {
  //     dispatch({
  //       type: 'CHANGE_APP_STATE',
  //       payload: { menu: '', filter: '' },
  //     });
  //   }
  //   if (appState.menu !== '') {
  //     dispatch({
  //       type: 'CHANGE_APP_STATE',
  //       payload: { logOrSign: '', filter: '' },
  //     });
  //   }
  //   if (appState.filter !== '') {
  //     dispatch({
  //       type: 'CHANGE_APP_STATE',
  //       payload: { logOrSign: '', menu: '' },
  //     });
  //   }
  // }, [appState]);
  return (
    <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
      <Header phone={data ? data.phoneNumber : ''} />
      {headerVer === 'fixed' ? (
        <HeaderVariants
          ver={headerVer}
          hotelData={data ? data.hotels : []}
          campsData={data ? data.camps : []}
          placesData={data ? data.places : []}
          cityData={data ? data.cities : []}
        />
      ) : null}
      {appState.logOrSign !== '' ? <LogOrSign /> : ''}
      {appState.menu === 'open' ? <BurgerMenu /> : null}
      <BottomSection ver={headerVer} />
      <HeroCategory data={data ? data.propertyTypes : []} />
      <div ref={searchBoxRef}>
        {headerVer !== 'fixed' ? (
          <SearchSection
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            cityData={data ? data.cities : []}
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
};
export default Home;
