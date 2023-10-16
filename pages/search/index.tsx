'use client';
import '../../app/globals.css';
import { useEffect, useState, useRef } from 'react';
// import { useRequest } from 'ahooks';
import { AppCtxProvider } from '@/utils/app';
import HeaderVariants from '@/components/common/headerVariants';
import Footer from '@/components/common/footer';
import LogIn from '@/components/common/logIn';
import BurgerMenu from '@/components/common/burgermenu';
import ScrollUpBtn from '@/components/common/scrollUpBtn';
import SearchSection from './searchSection';
// import Featured from '@/components/featured';
import Featured from '@/components/featured';
import BottomSection from './bottomSection';
import FeaturedSample from '@/components/featured/sample';

export default function Search() {
  const [data, setData] = useState(null);
  const [openMenu, setOpenMenu] = useState(false);
  const [openLogIn, setOpenLogIn] = useState(false);
  const [openSignUp, setOpenSignUp] = useState(false);
  const [headerVer, setHeaderVer] = useState('default');
  const divRef = useRef(null);

  // const { data } = useRequest(() => {
  //   return fetchDataSearch();
  // });
  useEffect(() => {
    // Fetch data when the component mounts
    fetch('http://sandbox.api.myhotel.mn:8000/ihotel/search')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // console.log(data);

  // console.log(divRef);

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

    if (divRef.current) {
      observer.observe(divRef.current);
    }

    return () => {
      if (divRef.current) {
        observer.unobserve(divRef.current);
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
      <div className="relative flex min-h-screen w-screen flex-col gap-[32px] px-0 ">
        <div className="lg:hidden"></div>
        {/* <HeaderVariants
          menu={sideMenuFunction}
          ver={'fixed'}
          logIn={logInFunction}
          signUp={signUpFunction}
        /> */}

        <div className="lg:hidden">
          {/* <ScrollUpBtn ver={headerVer} /> */} <BottomSection />
        </div>

        <div className="mt-[64px] lg:hidden" ref={divRef}>
          <SearchSection />
        </div>
        <div className="lg:pt-[100px]">
          {/* <Featured cap={8} title={''} /> */}
          <FeaturedSample cap={6} title={'sample'} />
        </div>
        <Footer />
      </div>
    </AppCtxProvider>
  );
}
