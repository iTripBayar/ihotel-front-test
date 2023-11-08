'use client';
import HeaderVariants from '@/components/common/headerVariants';
import HotelImages from '@/components/hotelPage/hotelImages';
import { useRequest } from 'ahooks';
import { fetchData } from '@/utils';
import { fetchDataHotel } from '@/utils';

// const res = await fetch(
//   `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`,
//   { cache: 'no-store' },
//   // {next: {revalidate: 10}}
// );

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

  // console.log(data);
  // const users: any = await res.json();
  // const { data } = useRequest(() => {
  //   return fetchData();
  // });
  // console.log(searchParams);
  return (
    <>
      {/* <HeaderVariants
        ver={'hotel'}
        openMenu={() => console.log('')}
        hotelData={data ? data.hotels : []}
        placesData={data ? data.places : []}
        campsData={data ? data.camps : []}
        destData={data ? data.destCategories : []}
      />
      <div className="pt-[62px]">
        <h1>{searchParams.name}</h1>
        <HotelImages data={data ? data.hotels.images : []} />
      </div> */}
    </>
  );
};

export default HotelPage;
