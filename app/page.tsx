'use client';
import HeroCategory from '@/components/pageComponents/homePage/heroCategory';
import CommonLocation from '@/components/pageComponents/homePage/commonLocation';
import News from '@/components/pageComponents/homePage/news';
import Footer from '@/components/common/footer';
import { useState, useRef, useEffect } from 'react';
import { useRequest } from 'ahooks';
import HeaderVariants from '@/components/common/headerVariants';
import { fetchData } from '@/utils';
import SearchSection from '@/components/common/searchSection';
import Header from '@/components/common/header';
import BottomSection from '@/components/common/bottomSection';
import CardsContainer from '@/components/pageComponents/homePage/cardsContainer';
import { useAppCtx } from '@/contexts/app';
import LogIn from '@/components/common/signIn/logIn';
import SignUp from '@/components/common/signIn/signUp';
import { CircularProgress } from '@chakra-ui/react';
import dynamic from 'next/dynamic';
const ErrorComponent = dynamic(() => import('@/components/common/404'));
import { useSession } from 'next-auth/react';
import SideMenu from '@/components/common/sidemenu';

const Home = () => {
  const [headerVer, setHeaderVer] = useState('default');
  const searchBoxRef = useRef(null);
  const { data: session } = useSession({
    required: false,
  });

  const { data, loading, error } = useRequest(() => {
    return fetchData();
  });

  const { appState, dispatch } = useAppCtx();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0,
    };
    dispatch({
      type: "CHANGE_APP_STATE",
      payload: { map: "", logOrSign: '', menu: '' },
    });

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
      <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
        <Header
          user={
            session
              ? `${session.user?.name
                  ?.charAt(0)
                  .toUpperCase()}${session.user?.name?.slice(1)}`
              : ""
          }
        />
        {headerVer === "fixed" ? (
          <HeaderVariants
            ver={headerVer}
            placesData={data ? data.places : []}
            cityData={data ? data.cities : []}
          />
        ) : null}
        {appState.logOrSign === "log" ||
        appState.logOrSign === "forgotPassword" ? (
          <LogIn />
        ) : null}
        {appState.logOrSign === "sign" ? <SignUp /> : null}
        {appState.menu === "open" ? <SideMenu session={session} /> : null}

        <BottomSection ver={headerVer} handleScrollToTopVer={() => {}} />
        {loading ? (
          <div className="flex h-[111px] w-full items-center justify-center 2xs:h-[100px] sm:h-[130px] md:h-[160px] lg:h-[180px] xl:h-[225px] 2xl:h-[250px]">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : (
          <HeroCategory data={data ? data.propertyTypes : []} />
        )}
        <div ref={searchBoxRef}>
          <SearchSection
            ver={"normal"}
            placesData={data ? data.places : []}
            cityData={data ? data.cities : []}
          />
        </div>
        {loading ? (
          <div className="flex h-[500px] w-full items-center justify-center">
            <CircularProgress isIndeterminate={true} color="#3C76FE" />
          </div>
        ) : (
          <div className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px] ">
            <CommonLocation
              data={data ? data.destCategories : []}
              destinations={data ? data.topDestinations : []}
            />
            <CardsContainer
              title={"cheap"}
              data={data ? data.cheapHotels : []}
              dollarRate={data ? data.dollarRate : "1"}
            />
            <CardsContainer
              title={"hotels"}
              data={data ? data.hotels : []}
              dollarRate={data ? data.dollarRate : "1"}
            />
            <CardsContainer
              title={"camps"}
              data={data ? data.camps : []}
              dollarRate={data ? data.dollarRate : "1"}
            />
            <News data={data ? data.posts : []} />
          </div>
        )}
        <Footer />
      </main>
    );
  return <ErrorComponent />;
};
export default Home;
