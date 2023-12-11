export async function fetchData(): Promise<HomeData.Home> {
  const response = await fetch('https://sandbox.api.myhotel.mn:9443/ihotel', {
    cache: 'force-cache',
  });
  const result = await response.json();

  return result;
}

export async function fetchDataSearch(): Promise<SearchData.Data> {
  const response = await fetch(
    'https://sandbox.api.myhotel.mn:9443/ihotel/search',
    { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function fetchUserData(e: {
  email: string | undefined;
  password: string | undefined;
}) {
  try {
    const response = await fetch(
      'https://sandbox.api.myhotel.mn:9443/api/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: e.email, password: e.password }),
      },
    );

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

export async function fetchCheckHotel(e: {
  hotel: string | null;
  city: string | null;
  category: string | null;
  place: string | null;
  destination: string | null;
  camp: string | null;
}): Promise<CheckHotels.Data> {
  let query = `?${e.hotel !== null ? `hotel=${e.hotel}` : ''}${
    e.city !== null ? `&city=${e.city}` : ''
  }${e.category !== null ? `&category=${e.category}` : ''}${
    e.place !== null ? `&place=${e.place}` : ''
  }${e.destination !== null ? `&destination=${e.destination}` : ''}${
    e.camp !== null ? `&camp=${e.camp}` : ''
  }`;
  const response = await fetch(
    `https://sandbox.api.myhotel.mn:9443/ihotel/checkhotels${query}`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}

export async function fetchDataHotel(slug: string): Promise<HotelData.full> {
  const response = await fetch(
    `https://sandbox.api.myhotel.mn:9443/ihotel/hotel/${slug}`,
    { cache: 'force-cache' },
  );
  const result: HotelData.full = await response.json();

  return result;
}