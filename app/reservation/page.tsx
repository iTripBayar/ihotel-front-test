'use client'
import HeaderVariants from '@/components/common/headerVariants';
import GeneralInfo from '@/components/reservationPage/generalInfo';
import OrderInfo from '@/components/reservationPage/orderInfo';
import { fetchDataHotel, fetchDataSearch } from '@/utils';
import { useRequest } from 'ahooks';
import React from 'react';


const ReservationPage = ({
  searchParams,
}: {
  searchParams: { name: string; slug: string; lang: string };
}) => {
  //   const res = await fetch(
  //     `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`,
  //     { cache: 'no-store' },
  //     // {next: {revalidate: 10}}
  //   );
  //   const data = await res.json();
const { data } = useRequest(() => {
  return fetchDataHotel(searchParams.slug);
});

console.log(data)
// console.log(data)
  return (
    <div>
      <HeaderVariants
        ver={'hotel'}
        hotelData={[]}
        placesData={[]}
        campsData={[]}
        destData={[]}
      />
      <div className="flex w-full flex-col gap-[20px] px-[16px] pb-[32px] pt-[72px] sm:px-[50px] md:px-[72px] lg:gap-[48px] lg:px-[60px]  xl:px-[100px] 2xl:px-[150px]">
        <GeneralInfo
          name={data ? data.hotel.name : null}
          nameEn={data ? data.hotel.nameEn : null}
          image={data ? data.hotel.coverPhoto : null}
          address={data ? data.hotel.address : null}
          addressEn={data ? data.hotel.addressEn : null}
          phone={data ? data.hotel.phone : null}
          email={data ? data.hotel.email : null}
        />
        <OrderInfo rooms={data ? data.rooms : []} dollarRate={data ? data.rate : null}/>
      </div>
    </div>
  );
};

export default ReservationPage;
