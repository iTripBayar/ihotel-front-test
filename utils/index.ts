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
// ihotel/dest/search?query=ibis

export async function fetchSearchQuery(query: string): Promise<SearchQuery.Result> {
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/dest/search?query=${query}`,
    // { cache: 'force-cache' },
  );
  const result = await response.json();

  return result;
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

export async function fetchDataHotel(e: {
  slug: string;
  checkIn: string;
  checkOut: string;
}): Promise<HotelData.full> {
  const response = await fetch(
    `${process.env.WEB_URL}/ihotel/hotel/${e.slug}${
      e.checkIn !== '' ? `?checkin=${encodeURIComponent(e.checkIn)}` : ``
    }${e.checkOut !== '' ? `&checkout=${encodeURIComponent(e.checkOut)}` : ``}`,
    // { cache: 'force-cache' },
  );
  const result: HotelData.full = await response.json();

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
interface createOrder {
  orderId: number;
  paymentOption: string;
  token: string;
}
export async function fetchCreateOrder(e: {
  name: string;
  surname: string;
  country: string;
  phone_number: string;
  email_order: string;
  beneficiary_name: string;
  beneficiary_account_number: string;
  order_hotelid: string;
  payment_option: string;
  order_roomdata: {
    startdate: string;
    enddate: string;
    hotel_id: string;
    room_id: string;
    room_number: string;
    person_number: string;
    room_price: string;
    room_type: string;
    room_name: string;
    total_price: string;
    by_person: string;
  }[];
  order_startdate: string;
  order_enddate: string;
}): Promise<createOrder> {
  try {
    const response = await fetch(
      `${process.env.WEB_URL}/ihotel/order/card/create`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: e.name,
          surname: e.surname,
          country: e.country,
          phone_number: e.phone_number,
          email_order: e.email_order,
          beneficiary_name: e.beneficiary_name,
          beneficiary_account_number: e.beneficiary_account_number,
          order_hotelid: e.order_hotelid,
          payment_option: e.payment_option,
          order_roomdata: e.order_roomdata,
          order_startdate: e.order_startdate,
          order_enddate: e.order_enddate,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error: any) {
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('Network error while fetching user data:', error.message);
    } else {
      console.error('Error fetching data:', error.message);
    }
    throw error;
  }
}




