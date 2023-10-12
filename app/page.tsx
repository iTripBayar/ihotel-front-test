'use client';
import Search from '@/components/common/search';
import Header from '@/components/common/header';
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

export default function Home() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [headerVer, setHeaderVer] = useState('default');
  const { appState } = useAppCtx();

  const searchBoxRef = useRef(null);

  const { data } = useRequest(() => {
    return fetchData();
  });

  console.log(data);

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

  function sideMenuFunction() {
    setOpenMenu(true);
  }
  function closeMenuFunction() {
    setOpenMenu(false);
  }
  function logInFunction() {
    setOpenLogIn(true);
  }
  function signUpFunction() {
    setOpenSignUp(true);
    setOpenLogIn(true);
  }
  function reverseSignUp() {
    setOpenSignUp(false);
    setOpenLogIn(true);
  }
  function closeSignUp() {
    setOpenLogIn(false);
    setOpenSignUp(false);
  }

  return (
    <AppCtxProvider>
      <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
        <Header
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
          <Search />
        </div>

        <CommonLocation />
        <Featured
          cap={3}
          title={
            appState.lang === 'mn'
              ? 'Тохилог & Хямд буудлууд'
              : 'Comfortable & Cheap hotels'
          }
        />
        <Featured
          cap={6}
          title={
            appState.lang === 'mn' ? 'Онцлох зочид буудлууд' : 'Featured hotels'
          }
        />
        <Featured
          cap={6}
          title={
            appState.lang === 'mn'
              ? 'Онцлох амралтын газрууд'
              : 'Featured camps'
          }
        />
        <News />
        <Footer />
      </main>
    </AppCtxProvider>
  );
}
