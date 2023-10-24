'use client';
import '../../app/globals.css';
import { useEffect, useState, useRef } from 'react';
// import { useRequest } from 'ahooks';
import { AppCtxProvider } from '@/utils/app';
import HeaderVariants from '@/components/common/headerVariants';
import Footer from '@/components/common/footer';
import LogIn from '@/components/common/logIn';
import BurgerMenu from '@/components/common/burgermenu';
import SearchSection from './searchSection';
// import Featured from '@/components/featured';
import Featured from '@/components/cardContainer';
import BottomSection from './bottomSection';
import FeaturedSample from '@/components/cardContainer/sample';
import useWindowSize from '@/hooks/windowSize';
import { useRequest } from 'ahooks';
// import { fetchData } from '@/utils';
// import { fetchData } from '@/utils';

async function fetchData() {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel');
  const result = await response.json();

  return result;
}
const { data } = useRequest(() => {
  return fetchData();
});

export default function Search() {
  // const [data, setData] = useState([]);
  const [openSignUp, setOpenSignUp] = useState(false);
  // const divRef = useRef(null);

  const [headerVer, setHeaderVer] = useState('default');

  const [sideMenu, setSideMenu] = useState(false);
  const [logIn, setLogIn] = useState('');
  // const searchBoxRef = useRef(null);
  const size = useWindowSize();

  // useEffect(() => {
  //   // Fetch data when the component mounts
  //   fetch('https://sandbox.api.myhotel.mn:9443/ihotel')
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       setData(data);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);

  // useEffect(() => {
  //   const options = {
  //     root: null, // Use the viewport as the root
  //     rootMargin: '0px', // No margin
  //     threshold: 0, // Trigger when any part of the element is visible
  //   };

  //   const observer = new IntersectionObserver((entries) => {
  //     entries.forEach((entry) => {
  //       if (!entry.isIntersecting) {
  //         setHeaderVer('fixed');
  //       } else {
  //         setHeaderVer('default');
  //       }
  //     });
  //   }, options);

  //   if (divRef.current) {
  //     observer.observe(divRef.current);
  //   }

  //   return () => {
  //     if (divRef.current) {
  //       observer.unobserve(divRef.current);
  //     }
  //   };
  // }, []);

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
    <AppCtxProvider>
      <div className="relative flex min-h-screen w-screen flex-col gap-[32px] px-0 ">
        <div className="lg:hidden"></div>
        {/* <HeaderVariants
          menu={sideMenuFunction}
          ver={'fixed'}
          logIn={logInFunction}
          signUp={signUpFunction}
        /> */}
        {/* <HeaderVariants
          ver={headerVer}
          openMenu={openMenu}
          logIn={openLogIn}
          phone={data ? data.phoneNumber : ''}
          hotelData={data ? data.hotels : []}
          placesData={data ? data.places : []}
          campsData={data ? data.camps : []}
          destData={data ? data.destCategories : []}
        /> */}

        <div className="lg:hidden">
          {/* <ScrollUpBtn ver={headerVer} /> */} <BottomSection />
        </div>

        {/* <div className="mt-[64px] lg:hidden" ref={divRef}></div> */}
        <SearchSection />

        <div className="lg:pt-[100px]">
          {/* <Featured cap={8} title={''} /> */}
          <FeaturedSample cap={6} title={'sample'} />
        </div>
        <Footer />
      </div>
    </AppCtxProvider>
  );
}
