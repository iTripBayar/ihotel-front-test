'use client';
import React, { useState, useRef, useEffect } from 'react';
import useWindowSize from '@/hooks/windowSize';
import { useRequest } from 'ahooks';
// import { AppCtxProvider } from '@/utils/app';
import { fetchData } from '@/utils';
import HeaderVariants from '@/components/common/headerVariants';
import '../app/globals.css';
import LogIn from '@/components/common/logIn';
import BurgerMenu from '@/components/common/burgermenu';
import BottomSection from '@/components/common/bottomSection';
import Footer from '@/components/common/footer';
import SearchSection from '@/components/searchSection';
import CardsContainer from '@/components/cardContainer';
import SearchCards from '@/components/cardContainer/searchCards';
import MapContainer from '@/components/map/map';
import Filter from '@/components/filter';
import { useAppState } from '@/contexts/appStateContext';

const SearchPage = () => {
  const [headerVer, setHeaderVer] = useState('search');
  const { state, dispatch } = useAppState();
  const [sideMenu, setSideMenu] = useState(false);
  const [logIn, setLogIn] = useState('');
  const [map, setMap] = useState('');

  const searchBoxRef = useRef(null);
  const size = useWindowSize();

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

  return (
    <main
      className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-auto`}
    >
      <HeaderVariants
        ver={'search'}
        openMenu={openMenu}
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

      {size?.width && size?.width < 1024 ? (
        <div
          ref={searchBoxRef}
          className={`lg:hidden ${
            state.showFilter === true ? 'flex flex-col gap-[24px]' : ''
          }`}
        >
          <SearchSection
            ver={'headerSearch'}
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
            map={map}
          />
          {state.showFilter === true ? <Filter /> : null}
        </div>
      ) : null}
      {state.showFilter === false ? (
        <div
          className={`relative grid h-full w-full grid-cols-1 gap-[24px] lg:h-screen lg:grid-cols-6 lg:gap-[12px] lg:px-[50px] lg:pt-[60px] xl:grid-cols-5 2xl:grid-cols-6`}
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
      ) : null}
    </main>
  );
};

export default SearchPage;
