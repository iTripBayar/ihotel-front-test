export async function fetchData(): Promise<HomeData.Home> {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel',{cache: 'force-cache'});
  const result = await response.json();

  return result;
}

export async function fetchDataSearch():Promise<SearchData.Data> {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/search',
    { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function fetchUserData(e:{email: string, password: string}) {
  // const response = await fetch(
  //   'https://sandbox.api.myhotel.mn:9443/api/login',
  //   {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       // email: 'orgil@ihotel.mn',
  //       email: e.email,
  //       // password: 'Wave920110@',
  //       password: e.password,
  //     }),
  //   },
  // )
  // const result = await response.json();
  // return result;
  try {
    const response = await fetch('https://sandbox.api.myhotel.mn:9443/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: e.email, password: e.password }),
    });

    if (!response.ok) {
      // If the response status is not OK (e.g., 404 Not Found, 500 Internal Server Error), throw an error
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    // Filter out non-network errors
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error while fetching user data:', error.message);
    } else {
      console.error('Error fetching user data:', error.message);
    }

    // Rethrow the error for further handling if needed
    throw error;
  }
}

// fetch('/api/route-name', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(objectWithData),
// });

export async function fetchCheckHotel(): Promise<CheckHotels.Data> {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/checkhotels',
    { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function fetchDataHotel(slug: string): Promise<HotelData.full> {
  const response = await fetch(
    `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${slug}`,
    { cache: 'force-cache' },
  );
  const result : HotelData.full = await response.json();

  return result;
}

// `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${searchParams.slug}`;
