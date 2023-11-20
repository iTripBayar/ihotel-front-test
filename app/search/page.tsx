'use client';
import { useRequest } from 'ahooks';
import { fetchData } from '@/utils';
import HeaderVariants from '@/components/common/headerVariants';
import '../../app/globals.css';
import BurgerMenu from '@/components/common/burgermenu';
import BottomSection from '@/components/common/bottomSection';
import SearchSection from '@/components/common/searchSection';
import SearchCards from '@/components/searchPage/searchCards';
import MapContainer from '@/components/common/map/map';
import Filter from '@/components/common/filter';
import SignUp from '@/components/common/log&signUp/signUp';
import LogIn from '@/components/common/log&signUp/logIn';

const SearchPage = ({
  searchParams,
}: {
  searchParams: {
    searchValue: string;
    toggle: boolean;
    type: string;
    filter: string;
    logInState: string | null;
    signUpState: string | null;
    map: string | null;
  };
}) => {
  const { data } = useRequest(() => {
    return fetchData();
  });

  return (
    <main
      className={`relative flex h-screen w-full flex-col gap-[20px] overflow-y-auto`}
      id="container"
    >
      <HeaderVariants
        ver={'search'}
        hotelData={data ? data.hotels : []}
        placesData={data ? data.places : []}
        campsData={data ? data.camps : []}
        destData={data ? data.destCategories : []}
      />
      {searchParams.logInState ? <LogIn /> : null}
      {searchParams.signUpState ? <SignUp /> : null}
      <BurgerMenu phone={data ? data.phoneNumber : ''} ver={'search'} />
      <BottomSection ver={'search'} />
      {/* {searchParams.filter === 'webFilter' ? (
        <div className="absolute left-[50%] top-[55px] z-[200] translate-x-[-50%]">
          <Filter />
        </div>
      ) : null} */}
      <div
        className={`${
          searchParams.filter === 'webFilter'
            ? 'absolute left-[50%] top-[55px] z-[200] translate-x-[-50%]'
            : 'hidden'
        }`}
      >
        <Filter />
      </div>
      {/* size?.width && size?.width < 1024 &&  */}

      <div
        className={`lg:hidden ${
          searchParams.filter === 'mobile' ? 'flex flex-col gap-[24px]' : ''
        }`}
      >
        <SearchSection
          ver={'headerSearch'}
          hotelData={data ? data.hotels : []}
          placesData={data ? data.places : []}
          campsData={data ? data.camps : []}
          destData={data ? data.destCategories : []}
        />
        {searchParams.filter === 'mobile' ? <Filter /> : null}
      </div>
      {searchParams.filter !== 'mobile' ? (
        <div
          className={`relative grid h-full w-full grid-cols-1 gap-[24px] lg:h-screen lg:grid-cols-6 lg:gap-[12px] lg:px-[50px] lg:pt-[60px] xl:grid-cols-5 2xl:grid-cols-6`}
        >
          <SearchCards
            hotelData={data ? data.hotels : []}
            campsData={data ? data.camps : []}
          />
          <MapContainer
            // changeMap={mapFunction}
            hotelData={data ? data.hotels : []}
            campsData={data ? data.camps : []}
          />
          {/* {map !== '' ? (
            <MapContainer
              changeMap={mapFunction}
              hotelData={data ? data.hotels : []}
              campsData={data ? data.camps : []}
            />
          ) : null} */}
        </div>
      ) : null}
    </main>
  );
};

export default SearchPage;
