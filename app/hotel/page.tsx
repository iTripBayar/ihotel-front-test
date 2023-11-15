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
const HotelPage = ({
  searchParams,
}: {
  searchParams: { name: string; slug: string };
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
  const [viewPort, setViewPort] = useState({
    lng: 106.91744615540313,
    lat: 47.91768064540636,
    zoom: 12,
  });
  // console.log(data);

  function openMenu() {
    setSideMenu(true);
  }

  console.log(data);

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
      <div className="flex flex-col gap-[24px] overflow-x-hidden px-[16px] pt-[76px]">
        <HotelImages
          images={data?.hotel?.images ? data?.hotel.images : []}
          image={data?.hotel?.image ? data?.hotel.image : []}
        />
        <HotelInfo data={data?.hotel ? data?.hotel : []} />
        <Amenity data={data?.services ? data?.services : []} />
        <Review ver="" data={data?.reviews ? data?.reviews[0] : []} />
        <div className="flex flex-col gap-[24px] border-t-[1px] border-t-black/[.15] pt-[24px]">
          <HotelMap lat={47.91823102891307} lng={106.92059918835042} />
          <OrderCount count={783} />
        </div>
        <Services
          services={data?.specialServices ? data?.specialServices : []}
        />
      </div>
    </main>
  );
};

export default HotelPage;
