// import HotelImages from '@/components/hotelPage/hotelImages';
// import React from 'react';
// // interface User {
// //   id: number;
// //   name: string;
// // }

// const HotelPage = async ({
//   searchParams,
// }: {
//   searchParams: { name: string; type: string };
// }) => {
//   // let newDate = new Date();
//   // let date = newDate.getDate();
//   // let month = newDate.getMonth() + 1;
//   // let year = newDate.getFullYear();
//   // console.log(`${month}/${date}/${year}`);
//   // const res = await fetch(
//   //   `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${
//   //     searchParams.name
//   //   }?checkIn=${month}/${date}/${year}&checkOut=${month}/${date + 1}/${year}`,
//   //   { cache: 'no-store' },
//   //   // {next: {revalidate: 10}}
//   // );
//   // hotel/${searchParams.name}checkin=11/25/2023&checkout=12/25/2023
//   // const data = await res.json();

//   console.log(searchParams); // Logs "search"

//   return (
//     <>
//       {/* <h1>{searchParams.name}</h1> */}
//       <HotelImages />
//     </>
//   );
// };

// export default HotelPage;
import React from 'react';

interface User {
  id: number;
  name: string;
}

const HotelPage = async ({
  searchParams,
}: {
  searchParams: { name: string; type: string };
}) => {
  // const res = await fetch(
  //   'https://jsonplaceholder.typicode.com/users',
  //   { cache: 'no-store' },
  //   // {next: {revalidate: 10}}
  // );
  // const users: User[] = await res.json();
  console.log(searchParams);
  return (
    <>
      <h1>{searchParams.name}</h1>
    </>
  );
};

export default HotelPage;
