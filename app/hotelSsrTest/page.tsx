import React from 'react';

interface User {
  id: number;
  name: string;
}

const HotelPageSsrTest = async () => {
  const res = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/search',
    { cache: 'no-store' },
    // {next: {revalidate: 10}}
  );
  const users = await res.json();
  return (
    <>
      <h1>Users</h1>
      <ul>
        {/* {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))} */}
      </ul>
    </>
  );
};

export default HotelPageSsrTest;
