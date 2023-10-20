'use client';
import React, { useState, useRef, useEffect } from 'react';
import useWindowSize from '@/hooks/windowSize';
import { useRequest } from 'ahooks';
import { AppCtxProvider } from '@/utils/app';
import { fetchData } from '@/utils';
import HeaderVariants from '@/components/common/headerVariants';
import '../app/globals.css';
import LogIn from '@/components/common/logIn';
import BurgerMenu from '@/components/common/burgermenu';
import BottomSection from '@/components/common/bottomSection';
import Footer from '@/components/common/footer';
import { useAppCtx } from '@/utils/app';
import SearchSection from '@/components/searchSection';
import CardsContainer from '@/components/cardContainer';
import SearchCards from '@/components/cardContainer/searchCards';
import MapContainer from '@/components/map/map';

const SearchPage = () => {
  const [headerVer, setHeaderVer] = useState('default');
  const { appState } = useAppCtx();
  const [sideMenu, setSideMenu] = useState(false);
  const [logIn, setLogIn] = useState('');
  const [map, setMap] = useState('');

  const searchBoxRef = useRef(null);
  const size = useWindowSize();

  useEffect(() => {
    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px', // No margin
      threshold: 0, // Trigger when any part of the element is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          // console.log('Over');
          setHeaderVer('fixed');
        } else {
          // console.log('not Over');
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

  const { data } = useRequest(() => {
    return fetchData();
  });

  function openMenu() {
    setSideMenu(true);
  }
  function closeMenu() {
    setSideMenu(false);
  }
  function openLogIn(e: string) {
    setLogIn(e);
  }

  function mapFunction(e: string) {
    setMap(e);
    console.log('click');
  }
  function closeMap() {
    setMap('');
  }

  useEffect(() => {
    if (size.width && size.width >= 1024) {
      setMap('open');
    } else setMap('');
    return;
  }, [size.width]);

  // console.log(data);
  console.log(map);
  return (
    <AppCtxProvider>
      <main
        className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-scroll `}
      >
        <HeaderVariants
          ver={'search'}
          openMenu={openMenu}
          logIn={openLogIn}
          phone={data ? data.phoneNumber : ''}
          hotelData={data ? data.hotels : []}
          placesData={data ? data.places : []}
          campsData={data ? data.camps : []}
          destData={data ? data.destCategories : []}
        />
        {logIn !== '' ? <LogIn ver={logIn} changeVer={openLogIn} /> : null}
        <BurgerMenu
          open={sideMenu}
          close={closeMenu}
          logIn={openLogIn}
          phone={data ? data.phoneNumber : ''}
          ver={'search'}
        />
        <BottomSection ver={'search'} map={map} openMap={mapFunction} />

        <div ref={searchBoxRef} className=" lg:hidden">
          <SearchSection
            ver={'search'}
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
            map={map}
          />
        </div>
        <div
          className={`relative grid  h-full w-full grid-cols-1 gap-[24px] lg:h-screen lg:grid-cols-6 lg:gap-[12px] lg:px-[50px] lg:pt-[70px] xl:grid-cols-5 2xl:grid-cols-6`}
        >
          <SearchCards
            hotelData={data ? data.hotels : []}
            campsData={data ? data.camps : []}
            map={map}
          />
          {map !== '' ? (
            <MapContainer
              closeMap={closeMap}
              changeMap={mapFunction}
              sizeHeight={size.height ? size.height : 0}
              sizeWidth={size.width ? size.width : 0}
              map={map}
            />
          ) : null}
        </div>
      </main>
    </AppCtxProvider>
  );
};

export default SearchPage;
