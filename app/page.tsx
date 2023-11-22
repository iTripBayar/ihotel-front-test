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
import { fetchData } from '@/utils';
import SearchSection from '@/components/common/searchSection';
import Header from '@/components/common/header';
import BottomSection from '@/components/common/bottomSection';
import CardsContainer from '@/components/homePage/cardsContainer';
import LogIn from '@/components/common/log&signUp/logIn';
import SignUp from '@/components/common/log&signUp/signUp';

export default function Home({
  searchParams,
}: {
  searchParams: {
    logInState: string | null;
    signUpState: string | null;
  };
}) {
  const [headerVer, setHeaderVer] = useState('default');
  const searchBoxRef = useRef(null);
  const { data } = useRequest(() => {
    return fetchData();
  });

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

  // console.log(data);

  return (
    <main className="relative flex flex-col gap-[24px] overflow-hidden md:gap-[32px] lg:gap-[48px] xl:gap-[64px]">
      {/* fixed components */}
      {headerVer === 'fixed' ? (
        <HeaderVariants
          ver={headerVer}
          hotelData={data ? data.hotels : []}
          placesData={data ? data.places : []}
          campsData={data ? data.camps : []}
          destData={data ? data.destCategories : []}
        />
      ) : null}
      {/* {searchParams.logInState ||
        (searchParams.signUpState ? <LogSign /> : null)} */}
      {searchParams.logInState ? <LogIn /> : null}
      {searchParams.signUpState ? <SignUp /> : null}
      <BurgerMenu phone={data ? data.phoneNumber : ''} ver={'normal'} />
      <BottomSection ver={headerVer} />
      {/* end of fixed components */}
      <Header phone={data ? data.phoneNumber : ''} />
      <HeroCategory data={data ? data.propertyTypes : []} />
      <div ref={searchBoxRef}>
        {headerVer !== 'fixed' ? (
          <SearchSection
            hotelData={data ? data.hotels : []}
            placesData={data ? data.places : []}
            campsData={data ? data.camps : []}
            destData={data ? data.destCategories : []}
            ver={'normal'}
          />
        ) : null}
      </div>
      <CommonLocation
        data={data ? data.destCategories : []}
        destinations={data ? data.topDestinations : []}
      />
      <CardsContainer
        title={'cheap'}
        data={data ? data.cheapHotels : []}
        ver={'home'}
        hotelData={[]}
        campsData={[]}
        map={''}
      />
      <CardsContainer
        title={'hotels'}
        data={data ? data.hotels : []}
        ver={'home'}
        hotelData={[]}
        campsData={[]}
        map={''}
      />
      <CardsContainer
        title={'camps'}
        data={data ? data.camps : []}
        ver={'home'}
        hotelData={[]}
        campsData={[]}
        map={''}
      />
      <News data={data ? data.posts : []} />
      <Footer />
    </main>
  );
}
