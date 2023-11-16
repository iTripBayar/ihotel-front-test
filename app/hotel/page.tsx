'use client';
import HeaderVariants from '@/components/common/headerVariants';
import HotelImages from '@/components/hotelPage/hotelImages';
import { useRequest } from 'ahooks';
import { fetchData } from '@/utils';
import { fetchDataHotel } from '@/utils';
import { useState } from 'react';
import HotelInfo from '@/components/hotelPage/hotelInfo';
import Amenity from '@/components/hotelPage/amenity';
import Review from '@/components/hotelPage/review';
import HotelMap from '@/components/hotelPage/hotelMap';
import OrderCount from '@/components/hotelPage/orderCount';
import Services from '@/components/hotelPage/services';
import HotelRooms from '@/components/hotelPage/hotelRooms';
import BurgerMenu from '@/components/common/burgermenu';
import LogIn from '@/components/common/logIn';
const HotelPage = ({
  searchParams,
}: {
  searchParams: { name: string; slug: string; lang: string };
}) => {
  // let newDate = new Date();
  // let date = newDate.getDate();
  // let month = newDate.getMonth() + 1;
  // let year = newDate.getFullYear();
  // console.log(`${month}/${date}/${year}`);
  const { data } = useRequest(() => {
    return fetchDataHotel(searchParams.slug);
  });
  // const res = await fetch(
  //   `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`,
  //   { cache: 'no-store' },
  //   // {next: {revalidate: 10}}
  // );
  // const data = await res.json();
  const [sideMenu, setSideMenu] = useState(false);
  const [logIn, setLogIn] = useState('');

  const [viewPort, setViewPort] = useState({
    lng: 106.91744615540313,
    lat: 47.91768064540636,
    zoom: 12,
  });
  // console.log(data);

  function openMenu() {
    setSideMenu(true);
  }
  function closeMenu() {
    setSideMenu(false);
  }
  function openLogIn(e: string) {
    setLogIn(e);
  }

  console.log(data);
  let stat = '';
  if (data?.hotel.isOnline == 1 && data?.hotel.isOffline == 0) {
    stat = 'online';
  } else if (data?.hotel.isOnline == 0 && data?.hotel.isOffline == 0) {
    stat = 'pending';
  } else if (
    data?.hotel.isOnline == 0 &&
    data?.hotel.isOffline == 1 &&
    data?.hotel.phone != null
  ) {
    stat = 'offline';
  } else if (
    data?.hotel.isOnline == 0 &&
    data?.hotel.isOffline == 1 &&
    data?.hotel.phone == null
  ) {
    stat = 'data';
  }

  return (
    <main>
      <HeaderVariants
        ver={'hotel'}
        openMenu={openMenu}
        hotelData={[]}
        placesData={[]}
        campsData={[]}
        destData={[]}
      />
      {logIn !== '' ? <LogIn ver={logIn} changeVer={openLogIn} /> : null}
      <BurgerMenu
        open={sideMenu}
        close={closeMenu}
        logIn={openLogIn}
        phone={data ? data.phoneNumber : ''}
        ver={'search'}
      />
      <div className="flex flex-col gap-[24px] overflow-x-hidden px-[16px] pb-[100px] pt-[80px] sm:px-[50px] md:px-[72px] lg:px-[60px] xl:px-[100px] 2xl:px-[150px]">
        <div className="grid grid-cols-1 gap-[24px] lg:grid-cols-5 lg:gap-[20px]">
          <div className="flex w-full flex-col gap-[24px] lg:col-span-3 lg:gap-[20px] ">
            <div className="flex flex-col gap-[16px] 2xs:gap-[24px] lg:flex-col-reverse lg:gap-[16px]">
              <HotelImages
                images={data?.hotel?.images ? data?.hotel.images : []}
                image={data?.hotel?.image ? data?.hotel.image : []}
              />
              <HotelInfo data={data?.hotel ? data?.hotel : []} />
            </div>
            <Amenity data={data?.services ? data?.services : []} />
          </div>
          <div className="flex flex-col gap-[24px] lg:col-span-2">
            {/* contanct */}
            <div className=" hidden w-full gap-[14px] text-[14px] tracking-wide lg:flex lg:text-[12px] lg:tracking-wide xl:text-[14px] xl:tracking-wider">
              {/* phone */}
              <div className="flex items-center gap-[6px] text-sub-text xl:gap-[10px]">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="max-h-[17px] min-h-[17px] min-w-[17px] max-w-[17px]"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p>
                  {`${data?.hotel?.phone.slice(
                    0,
                    4,
                  )}-${data?.hotel?.phone.slice(4)}`}
                </p>
              </div>
              {/* mail */}
              <div className="flex items-center gap-[6px] text-sub-text xl:gap-[10px]">
                <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-primary-blue text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="max-h-[18px] min-h-[18px] min-w-[18px] max-w-[18px]"
                  >
                    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                  </svg>
                </div>
                <p>{data?.hotel.email}</p>
              </div>
            </div>
            <Review ver="" data={data?.reviews ? data?.reviews[0] : []} />
            {/* stat & price */}
            <div className="hidden flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] lg:flex">
              {stat !== 'data' ? (
                <div
                  className={`flex h-[36px] items-center justify-center gap-[4px] rounded-[8px] text-center font-medium ${
                    stat === 'online'
                      ? 'bg-main-online px-[20px] text-white 2xs:px-[24px]'
                      : stat === 'pending'
                      ? 'bg-main-pending px-[16px]  text-main-text '
                      : 'bg-main-offline px-[16px]'
                  }`}
                >
                  {searchParams.lang === 'en' ? (
                    <p>
                      {stat === 'online'
                        ? 'Instant confirmation'
                        : stat === 'pending'
                        ? 'Confirmation delay: '
                        : stat === 'offline'
                        ? 'Booking unavailable'
                        : ''}
                      {stat === 'pending' ? (
                        <span className=" font-bold">1-3 hours</span>
                      ) : null}
                    </p>
                  ) : (
                    <p>
                      {stat === 'online'
                        ? 'Шууд баталгаажна'
                        : stat === 'pending'
                        ? 'Баталгаажих хугацаа: '
                        : stat === 'offline'
                        ? 'Онлайн захиалга боломжгүй'
                        : ''}
                      {stat === 'pending' ? (
                        <span className=" font-bold ">1-3 цаг</span>
                      ) : null}
                    </p>
                  )}
                </div>
              ) : null}
              <div className="text-main-textflex flex items-center justify-between rounded-[16px] bg-black/[.07] px-[20px] py-[10px] text-[20px]">
                <p>
                  200,000 {searchParams.lang === 'en' ? '$' : '₮'}{' '}
                  <span className="text-[14px]">
                    {' '}
                    / {searchParams.lang === 'en' ? 'days' : 'хоног'}
                  </span>
                </p>
                <div className="flex items-center justify-center rounded-[16px] bg-main-online px-[16px] py-[6px] font-medium text-white">
                  {searchParams.lang === 'en' ? 'Order' : 'Захиалах'}
                </div>
              </div>
            </div>
            {/* map & orderCount */}
            <div className="flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px] lg:border-none lg:pt-0">
              <HotelMap lat={47.91823102891307} lng={106.92059918835042} />
              <OrderCount count={783} />
            </div>
          </div>
        </div>

        <Services
          services={data?.specialServices ? data?.specialServices : []}
        />
        <HotelRooms data={data?.rooms ? data?.rooms : []} />
      </div>
    </main>
  );
};

export default HotelPage;
