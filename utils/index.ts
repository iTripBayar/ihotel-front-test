export async function fetchData(): Promise<HomeData.Home> {
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel`,
    // { cache: 'force-cache',}
  );
  const result = await response.json();

  return result;
}

export async function fetchDataSearch(): Promise<SearchData.Data> {
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/search`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
}



export async function fetchUserData(e: {
  email: string | undefined;
  password: string | undefined;
}) {
  try {
    const response = await fetch(`${process.env.WEB_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: e.email, password: e.password }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error while fetching user data:', error.message);
    } else {
      console.error('Error fetching user data:', error.message);
    }
    throw error;
  }
}

// https://sandbox.api.myhotel.mn:9443/password/email
export async function forgotPassword(e: {
  email: string | undefined;
}) {
  try {
    const response = await fetch(`${process.env.WEB_URL}/password/email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.email,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function registerUser(e: {
  email: string | undefined;
  password: string | undefined;
  passwordConfirmation: string | undefined;
}) {
  try {
    const response = await fetch(`${process.env.WEB_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: e.email,
        password: e.password,
        passwordConfirmation: e.passwordConfirmation,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
}

export async function fetchCheckHotel(e: {
  hotel: string;
  place: string;
  city: string;
  checkin: string;
  checkout: string;
  isClosed: string;
  page: string;
  prices: string;
  filterstar: string;
  rating1: string;
  rating2: string;
  hotelServices: string;
  roomServices: string;
  categories: string;
}): Promise<CheckHotels.Data> {
const params = `?hotel=${e.hotel}&place=${e.place}&city=${e.city}&checkin=${e.checkin}&checkout=${e.checkout}&isClosed=${e.isClosed}&page=${e.page}&prices=${e.prices}&filterstar=${e.filterstar}&rating1=${e.rating1}&rating2=${e.rating2}&hotelServices=${e.hotelServices}&roomServices=${e.roomServices}&categories=${e.categories}`;
const response = await fetch(
  `${process.env.WEB_URL}/ihotel/checkhotels${params}`,
  // { cache: 'force-cache' },
);
const result = await response.json();

return result;
}

export async function fetchDataHotel(slug: string): Promise<HotelData.full> {
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/hotel/${slug}`,
    // { cache: 'force-cache' },
  );
  const result: HotelData.full = await response.json();

  return result;
}
