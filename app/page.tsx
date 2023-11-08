'use client';
import HeroCategory from '@/components/heroCategory';
import '../app/globals.css';
import CommonLocation from '@/components/commonLocation';
import News from '@/components/news';
import Footer from '@/components/common/footer';
import LogIn from '@/components/common/logIn';
import BurgerMenu from '@/components/common/burgermenu';
import { useState, useRef, useEffect } from 'react';
import { useRequest } from 'ahooks';
import HeaderVariants from '@/components/common/headerVariants';
import { fetchData } from '@/utils';
import SearchSection from '@/components/searchSection';
import Header from '@/components/common/header';
import FeaturedSample from '@/components/cardContainer/sample';
import useWindowSize from '@/hooks/windowSize';
import BottomSection from '@/components/common/bottomSection';
import CardsContainer from '@/components/cardContainer';
import { useAppState } from '@/contexts/appStateContext';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [headerVer, setHeaderVer] = useState('default');
  const [sideMenu, setSideMenu] = useState(false);
  const [logIn, setLogIn] = useState('');
  const searchBoxRef = useRef(null);
  const size = useWindowSize();
  const { state, dispatch } = useAppState();
  const pathname = usePathname();
  const { data } = useRequest(() => {
    return fetchData();
  });

  useEffect(() => {
    dispatch({
      type: 'SET_SEARCHVALUE',
      payload: '',
    });
    dispatch({
      type: 'TOGGLE_ONLINETOGGLE',
      payload: false,
    });
  }, [pathname === '/']);

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

  function openMenu() {
    setSideMenu(true);
  }
  function closeMenu() {
    setSideMenu(false);
  }
  function openLogIn(e: string) {
    setLogIn(e);
  }

  return (
    <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
      {/* fixed components */}
      {headerVer === 'fixed' ? (
        <HeaderVariants
          ver={headerVer}
          openMenu={openMenu}
          hotelData={data ? data.hotels : []}
          placesData={data ? data.places : []}
          campsData={data ? data.camps : []}
          destData={data ? data.destCategories : []}
        />
      ) : null}
      {logIn !== '' ? <LogIn ver={logIn} changeVer={openLogIn} /> : null}
      <BurgerMenu
        open={sideMenu}
        close={closeMenu}
        logIn={openLogIn}
        phone={data ? data.phoneNumber : ''}
        ver={'normal'}
      />
      <BottomSection
        ver={headerVer}
        map={''}
        openMap={() => {
          ('');
        }}
      />
      {/* end of fixed components */}
      <Header
        openMenu={openMenu}
        logIn={openLogIn}
        phone={data ? data.phoneNumber : ''}
      />
      <HeroCategory data={data ? data.propertyTypes : []} />
      <div ref={searchBoxRef}>
        {headerVer !== 'fixed' ? (
          <SearchSection
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
            ver={'normal'}
            map=""
          />
        ) : null}
      </div>
      <CommonLocation
        data={data ? data.destCategories : []}
        destinations={data ? data.topDestinations : []}
      />
      <CardsContainer
        cap={size.width && size.width <= 1280 && size.width >= 576 ? 2 : 3}
        title={'cheap'}
        data={data ? data.cheapHotels : []}
        ver={'home'}
        hotelData={[]}
        campsData={[]}
        map={''}
      />
      <CardsContainer
        cap={6}
        title={'hotels'}
        data={data ? data.hotels : []}
        ver={'home'}
        hotelData={[]}
        campsData={[]}
        map={''}
      />
      <CardsContainer
        cap={6}
        title={'camps'}
        data={data ? data.camps : []}
        ver={'home'}
        hotelData={[]}
        campsData={[]}
        map={''}
      />
      <FeaturedSample cap={6} title={'sample'} />

      <News
        cap={size.width && size.width >= 1024 ? 6 : 4}
        data={data ? data.posts : []}
      />
      <Footer />
    </main>
  );
}
