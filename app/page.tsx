'use client';
import SearchComponent from '@/components/common/search';
import HeroCategory from '@/components/heroCategory';
import CommonLocation from '@/components/commonLocation';
import Featured from '@/components/featured';
import News from '@/components/news';
import Footer from '@/components/common/footer';
import LogIn from '@/components/common/logIn';
import BurgerMenu from '@/components/common/burgermenu';
import { useState, useRef, useEffect } from 'react';
import { useRequest } from 'ahooks';
import HeaderVariants from '@/components/common/headerVariants';
import ScrollUpBtn from '@/components/common/scrollUpBtn';
import { fetchData } from '@/utils';
import { useAppCtx } from '@/utils/app';
import { AppCtxProvider } from '@/utils/app';
import HeaderTest from '@/components/test/header';
import SearchSection from '@/components/test/searchSection';
import Header from '@/components/test/header';
import FeaturedSample from '@/components/featured/sample';

export default function Home() {
  // const [openMenu, setOpenMenu] = useState(false);
  // const [openLogIn, setOpenLogIn] = useState(false);
  // const [openSignUp, setOpenSignUp] = useState(false);
  const [headerVer, setHeaderVer] = useState('default');

  const [sideMenu, setSideMenu] = useState(false);
  const [logIn, setLogIn] = useState('');
  const searchBoxRef = useRef(null);

  const { data } = useRequest(() => {
    return fetchData();
  });

  // console.log(data);

  // console.log(data);

  // console.log(data);

  // const test = data.hotels;
  // const test1 = [];
  // for (let i = 0; i < test.length; i++) {
  //   test1.push(test[i].id);
  // }

  // console.log(test1);

  // {id: 256, name: 'sunrise',},
  // {id: 257, name: 'Elegance Hotel',},
  // {id: 260, name: 'Наадаан ресорт',},
  // {id: 261, name: 'Хан Хужирт',},
  // {id: 263, name: 'Жуулчны бааз',},
  // {id: 264, name: 'Буян',},
  // {id: 265, name: 'УНДРАМ',},
  // {id: 266, name: 'Dariganga',},
  // {id: 11, name: 'Namdumandal',},
  // {id: 267, name: 'Болор зочид буудал',},
  // {id: 268, name: 'Бүрд зочид буудал',},
  // {id: 269, name: 'Бурамхан',},
  // {id: 14, name: 'Corporate hotel and Convention Center',},
  // {id: 270, name: 'Хан Хөхий',},
  // {id: 271, name: 'Амар зочид зочид буудал',},
  // {id: 272, name: 'Амралтын газар'},

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

  // function sideMenuFunction() {
  //   setOpenMenu(true);
  // }
  // function closeMenuFunction() {
  //   setOpenMenu(false);
  // }
  // function logInFunction() {
  //   setOpenLogIn(true);
  // }
  // function signUpFunction() {
  //   setOpenSignUp(true);
  //   setOpenLogIn(true);
  // }
  // function reverseSignUp() {
  //   setOpenSignUp(false);
  //   setOpenLogIn(true);
  // }
  // function closeSignUp() {
  //   setOpenLogIn(false);
  //   setOpenSignUp(false);
  // }

  function openMenu() {
    setSideMenu(true);
  }
  function closeMenu() {
    setSideMenu(false);
  }
  function openLogIn(e: string) {
    setLogIn(e);
  }

  // console.log(logIn);
  return (
    <AppCtxProvider>
      <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
        {/* fixed components */}
        {headerVer === 'fixed' ? (
          <HeaderVariants
            ver={headerVer}
            openMenu={openMenu}
            logIn={openLogIn}
            phone={data ? data.phoneNumber : ''}
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
        />
        <ScrollUpBtn ver={headerVer} />
        {/* end of fixed components */}
        {/* static */}
        <Header
          ver={headerVer}
          openMenu={openMenu}
          logIn={openLogIn}
          phone={data ? data.phoneNumber : ''}
        />
        <HeroCategory data={data ? data.propertyTypes : []} />
        <div ref={searchBoxRef}>
          <SearchSection
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
          />
        </div>
        <CommonLocation
          data={data ? data.destCategories : []}
          destinations={data ? data.topDestinations : []}
        />
        <Featured cap={3} title={'cheap'} data={data ? data.cheapHotels : []} />
        <Featured cap={6} title={'hotels'} data={data ? data.hotels : []} />
        <Featured cap={6} title={'camps'} data={data ? data.camps : []} />
        <FeaturedSample cap={6} title={'sample'} />
        <News data={data ? data.posts : []} />
        <Footer />
        {/* <Header
          menu={sideMenuFunction}
          logIn={logInFunction}
          signUp={signUpFunction}
        />
        {headerVer === 'fixed' ? (
          <HeaderVariants
            menu={sideMenuFunction}
            ver={headerVer}
            logIn={logInFunction}
            signUp={signUpFunction}
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
          />
        ) : null}
        <ScrollUpBtn ver={headerVer} />
        <LogIn
          open={openLogIn}
          close={closeSignUp}
          sign={openSignUp}
          log={reverseSignUp}
          signUp={signUpFunction}
        />
        <BurgerMenu
          open={openMenu}
          close={closeMenuFunction}
          logIn={logInFunction}
          signUp={signUpFunction}
        />
        <HeroCategory />
        <div ref={searchBoxRef}>
          <SearchComponent
            bg={true}
            data={data ? data : []}
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
          />
        </div>
        <CommonLocation data={data ? data.destCategories : []} />
        <Featured cap={3} title={'cheap'} />
        <Featured cap={6} title={'hotels'} />
        <Featured cap={6} title={'camps'} />
        <News data={data ? data.posts : []} />
        <Footer /> */}
      </main>
    </AppCtxProvider>
  );
}
